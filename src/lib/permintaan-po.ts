// letak: src/lib/permintaan-po.ts
import { Prisma, PermintaanPoStatus, StatusPesanan, StatusPembayaran, SumberItem } from "@prisma/client";
import { prisma } from "@/lib/db";
import { catatLogAktivitas } from "@/lib/log-aktivitas";
import { buatNotifikasi, kirimNotifikasiWa } from "@/lib/notifikasi";
import { buatNoInvoice } from "@/lib/no-invoice";
import { AppError } from "@/lib/http-error";
import type { AjukanPoInput, ReviewPoInput, ResponPenawaranInput } from "@/lib/validasi";

const JAM_KEDALUWARSA_PEMBAYARAN = Number(process.env.PEMBAYARAN_KEDALUWARSA_JAM ?? 24);

export class PermintaanPoError extends AppError {
  constructor(message: string, status: number) {
    super(message, status);
    this.name = "PermintaanPoError";
  }
}

export function ajukanPo(customerId: string, input: AjukanPoInput) {
  return prisma.permintaanPo.create({
    data: {
      customerId,
      linkProdukReferensi: input.linkProdukReferensi,
      deskripsiSpesifikasi: input.deskripsiSpesifikasi,
      fotoReferensiUrl: input.fotoReferensiUrl,
      jumlahDiminta: input.jumlahDiminta,
    },
  });
}

/**
 * Admin review: kasih harga (DIKONFIRMASI_HARGA) atau tolak (DITOLAK).
 * Guard atomik: syarat status LAMA (MENUNGGU_REVIEW) ditaruh di WHERE —
 * kalau PO ini sudah direview admin lain (atau customer lain kebetulan
 * ajukan ulang di ID yang sama, walau praktis mustahil), update 0 baris.
 */
export async function reviewPo(adminId: string, poId: string, input: ReviewPoInput) {
  const po = await prisma.permintaanPo.findUnique({
    where: { id: poId },
    include: { customer: { select: { noWa: true } } },
  });
  if (!po) throw new PermintaanPoError("Permintaan PO tidak ditemukan", 404);

  const dikonfirmasi = input.status === "DIKONFIRMASI_HARGA";
  const pesanNotif = dikonfirmasi
    ? `Permintaan PO-mu sudah direview: harga ${input.estimasiHarga}/unit + ongkir ${input.estimasiOngkir}. Cek & tanggapi di aplikasi.`
    : `Permintaan PO-mu ditolak: ${input.catatanAdmin}`;

  const hasil = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const hasilUpdate = await tx.permintaanPo.updateMany({
      where: { id: poId, status: PermintaanPoStatus.MENUNGGU_REVIEW },
      data: {
        status: input.status,
        estimasiHarga: input.status === "DIKONFIRMASI_HARGA" ? input.estimasiHarga : undefined,
        estimasiOngkir: input.status === "DIKONFIRMASI_HARGA" ? input.estimasiOngkir : undefined,
        catatanAdmin: input.catatanAdmin,
        adminReviewerId: adminId,
        tglRespon: new Date(),
      },
    });

    if (hasilUpdate.count === 0) {
      throw new PermintaanPoError("Permintaan PO ini sudah direview sebelumnya", 409);
    }

    await catatLogAktivitas(
      tx,
      adminId,
      "REVIEW_PO",
      poId,
      input.status === "DIKONFIRMASI_HARGA"
        ? `PO dikonfirmasi harga: ${input.estimasiHarga}/unit + ongkir ${input.estimasiOngkir}`
        : `PO ditolak: ${input.catatanAdmin}`
    );

    // PermintaanPo belum tentu punya Pesanan (baru dibuat kalau customer
    // setuju penawaran nanti) -- pesananId di notifikasi ini null.
    await buatNotifikasi(tx, po.customerId, null, pesanNotif, "PERMINTAAN_PO");

    return { berhasil: true };
  });

  await kirimNotifikasiWa(po.customer.noWa, pesanNotif);

  return hasil;
}

/**
 * Customer respon penawaran harga admin. Guard atomik: syarat status LAMA
 * (DIKONFIRMASI_HARGA) di WHERE. Kalau setuju: konversi LANGSUNG jadi
 * Pesanan + PesananItem (sumberItem CUSTOM_PO) + PesananStatusLog +
 * Pembayaran pertama, dalam transaksi yang SAMA dengan flip status PO —
 * "Begitu disetujui, otomatis dikonversi jadi PESANAN baru" (skip keranjang),
 * sesuai spesifikasi bisnis.
 *
 * Custom PO TIDAK melewati guard stok atomik (lib/stok.ts) — barang ini di
 * luar katalog, tidak ada baris stok Produk/ProdukVarian untuk dijaga.
 */
export async function responPenawaran(customerId: string, poId: string, input: ResponPenawaranInput) {
  const po = await prisma.permintaanPo.findUnique({ where: { id: poId } });
  if (!po || po.customerId !== customerId) {
    throw new PermintaanPoError("Permintaan PO tidak ditemukan", 404);
  }

  if (!input.setuju) {
    const hasil = await prisma.permintaanPo.updateMany({
      where: { id: poId, status: PermintaanPoStatus.DIKONFIRMASI_HARGA },
      data: { status: PermintaanPoStatus.DITOLAK, tglRespon: new Date() },
    });
    if (hasil.count === 0) {
      throw new PermintaanPoError("Permintaan PO ini sudah tidak bisa direspon (status sudah berubah)", 409);
    }
    return { dikonversiJadiPesanan: false };
  }

  // input.setuju === true -> alamatId/preferensiKurir/metode dijamin ada oleh
  // Zod .refine() SAAT RUNTIME, tapi TypeScript tidak bisa narrow union dari
  // .refine() secara statis (bukan bug baru — sama seperti kasus
  // verifikasiPembayaranSchema di lib/pembayaran.ts). Guard ini menyelesaikan
  // dua-duanya sekaligus: narrowing tipe untuk TS, DAN jaring pengaman runtime
  // kalau skema Zod-nya berubah nanti tanpa disadari.
  const { alamatId, preferensiKurir, metode } = input;
  if (!alamatId || !preferensiKurir || !metode) {
    throw new PermintaanPoError("alamatId, preferensiKurir, dan metode wajib diisi", 400);
  }

  const alamat = await prisma.alamat.findUnique({ where: { id: alamatId } });
  if (!alamat || alamat.customerId !== customerId) {
    throw new PermintaanPoError("Alamat tidak ditemukan", 404);
  }

  if (po.estimasiHarga === null || po.estimasiOngkir === null) {
    // Harusnya mustahil kalau status memang DIKONFIRMASI_HARGA (reviewPo selalu
    // isi dua-duanya bareng), tapi tetap dijaga eksplisit alih-alih asumsi diam-diam.
    throw new PermintaanPoError("Data harga PO ini tidak lengkap, hubungi admin", 500);
  }

  const subtotalProduk = Number(po.estimasiHarga) * po.jumlahDiminta;
  const ongkirChinaGudang = Number(po.estimasiOngkir);
  const totalAkhir = subtotalProduk + ongkirChinaGudang;

  return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const hasil = await tx.permintaanPo.updateMany({
      where: { id: poId, status: PermintaanPoStatus.DIKONFIRMASI_HARGA },
      data: { status: PermintaanPoStatus.SUDAH_JADI_PESANAN, tglRespon: new Date() },
    });

    if (hasil.count === 0) {
      throw new PermintaanPoError("Permintaan PO ini sudah tidak bisa direspon (status sudah berubah)", 409);
    }

    const pesanan = await tx.pesanan.create({
      data: {
        customerId,
        alamatId,
        noInvoice: buatNoInvoice(),
        preferensiKurir,
        subtotalProduk,
        biayaJasaTitip: 0,
        ongkirChinaGudang,
        ongkirDomestik: 0, // sama seperti checkout katalog, diisi manual admin belakangan
        totalAkhir,
        item: {
          create: {
            sumberItem: SumberItem.CUSTOM_PO,
            permintaanPoId: poId,
            namaItemSnapshot: po.deskripsiSpesifikasi,
            hargaSatuanSaatBeli: Number(po.estimasiHarga),
            jumlah: po.jumlahDiminta,
          },
        },
        statusLog: { create: { status: StatusPesanan.MENUNGGU_PEMBAYARAN } },
      },
    });

    const kedaluwarsaPada = new Date(Date.now() + JAM_KEDALUWARSA_PEMBAYARAN * 60 * 60 * 1000);
    const pembayaran = await tx.pembayaran.create({
      data: {
        pesananId: pesanan.id,
        metode,
        status: StatusPembayaran.MENUNGGU_BUKTI,
        jumlahBayar: totalAkhir,
        kedaluwarsaPada,
      },
    });

    return { dikonversiJadiPesanan: true, pesanan, pembayaran };
  });
}