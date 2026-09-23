// letak: src/lib/pesanan.ts
import { Prisma, ProdukStatus, StatusPesanan, StatusPembayaran, SumberItem } from "@prisma/client";
import { prisma } from "@/lib/db";
import { kurangiStokAtomik, kembalikanStok } from "@/lib/stok";
import { buatNoInvoice } from "@/lib/no-invoice";
import { AppError } from "@/lib/http-error";
import { catatLogAktivitas } from "@/lib/log-aktivitas";
import { buatNotifikasi, kirimNotifikasiWa } from "@/lib/notifikasi";
import { hitungBiayaJasaTitip, hitungOngkirDomestik } from "@/lib/tarif";
import type { CheckoutInput, UpdateBiayaInput, UpdateStatusPesananInput, UpdatePengirimanInput } from "@/lib/validasi";

const JAM_KEDALUWARSA_PEMBAYARAN = Number(process.env.PEMBAYARAN_KEDALUWARSA_JAM ?? 24);
const MAKS_PERCOBAAN_NO_INVOICE = 3;

/** Error checkout yang sudah tahu status HTTP-nya sendiri, supaya route handler tinggal pakai. */
export class CheckoutError extends AppError {
  constructor(message: string, status: number) {
    super(message, status);
    this.name = "CheckoutError";
  }
}

interface PesananItemBaru {
  sumberItem: SumberItem;
  produkId: string;
  produkVarianId: string | null;
  varianSnapshot: string | null;
  namaItemSnapshot: string;
  hargaSatuanSaatBeli: number;
  jumlah: number;
}

/**
 * Proses checkout lengkap: validasi kepemilikan alamat & item keranjang,
 * snapshot harga (namaItemSnapshot/hargaSatuanSaatBeli — TIDAK direferensikan
 * live ke Produk, prinsip README #2), guard stok atomik per item (prinsip
 * arsitektur: UPDATE ... WHERE stok >= jumlah, bukan baca-lalu-tulis), lalu
 * buat Pesanan + PesananItem + percobaan Pembayaran pertama dalam SATU
 * transaksi. Kalau item mana pun kurang stok, SELURUH transaksi batal —
 * tidak ada checkout "separuh berhasil".
 */
export async function prosesCheckout(customerId: string, input: CheckoutInput) {
  const { alamatId, keranjangItemIds, preferensiKurir, metode } = input;

  const alamat = await prisma.alamat.findUnique({ where: { id: alamatId } });
  if (!alamat || alamat.customerId !== customerId) {
    throw new CheckoutError("Alamat tidak ditemukan", 404);
  }
  if (!alamat.provinsi) {
    // Alamat lama dari sebelum field provinsi ada (nullable di DB, lihat
    // schema.prisma) -- tidak bisa dipakai checkout sampai di-update dulu,
    // karena hitungOngkirDomestik butuh provinsi.
    throw new CheckoutError(
      "Alamat ini belum punya provinsi, silakan update alamatnya dulu sebelum checkout",
      400
    );
  }

  const items = await prisma.keranjangItem.findMany({
    where: { id: { in: keranjangItemIds }, keranjang: { customerId } },
    include: { produk: true, produkVarian: true },
  });

  // Jumlah hasil harus PERSIS sama dengan yang diminta — kalau ada yang
  // hilang, berarti ada ID yang tidak ada ATAU bukan milik customer ini.
  // Diperlakukan sama (404 generik), tidak dibedakan, biar tidak bisa
  // dipakai menebak-nebak ID item milik orang lain.
  if (items.length !== keranjangItemIds.length) {
    throw new CheckoutError("Sebagian item keranjang tidak ditemukan atau bukan milik kamu", 404);
  }

  for (const item of items) {
    if (item.produk.status !== ProdukStatus.AKTIF) {
      throw new CheckoutError(`Produk "${item.produk.namaProduk}" sudah tidak tersedia`, 409);
    }
  }

  for (let percobaan = 0; percobaan < MAKS_PERCOBAAN_NO_INVOICE; percobaan++) {
    try {
      return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        let subtotalProduk = 0;
        let beratTotalGram = 0;
        const pesananItemData: PesananItemBaru[] = [];

        for (const item of items) {
          const hargaSatuan = Number(item.produk.hargaJualIdr) + Number(item.produkVarian?.hargaTambahan ?? 0);
          subtotalProduk += hargaSatuan * item.jumlah;
          beratTotalGram += item.produk.beratGram * item.jumlah;

          const berhasil = await kurangiStokAtomik(tx, item.produkId, item.produkVarianId, item.jumlah);
          if (!berhasil) {
            const stokTersisa = item.produkVarian ? item.produkVarian.stok : item.produk.stok;
            throw new CheckoutError(
              `Stok "${item.produk.namaProduk}" tidak cukup — tersisa ${stokTersisa}`,
              409
            );
          }

          pesananItemData.push({
            sumberItem: SumberItem.KATALOG,
            produkId: item.produkId,
            produkVarianId: item.produkVarianId,
            varianSnapshot: item.produkVarian?.namaVarian ?? null,
            namaItemSnapshot: item.produk.namaProduk,
            hargaSatuanSaatBeli: hargaSatuan,
            jumlah: item.jumlah,
          });
        }

        // biayaJasaTitip & ongkirDomestik dihitung OTOMATIS & FINAL di sini
        // (lib/tarif.ts) -- customer tidak perlu tunggu admin. ongkirChinaGudang
        // tetap 0, diisi manual admin belakangan (belum ada kalkulatornya).
        const biayaJasaTitip = hitungBiayaJasaTitip(subtotalProduk);
        const ongkirChinaGudang = 0;
        const ongkirDomestik = hitungOngkirDomestik(alamat.provinsi!, preferensiKurir, beratTotalGram);
        const totalAkhir = subtotalProduk + biayaJasaTitip + ongkirChinaGudang + ongkirDomestik;

        const pesanan = await tx.pesanan.create({
          data: {
            customerId,
            alamatId,
            noInvoice: buatNoInvoice(),
            preferensiKurir,
            subtotalProduk,
            biayaJasaTitip,
            ongkirChinaGudang,
            ongkirDomestik,
            beratTotalGram,
            totalAkhir,
            item: { create: pesananItemData },
            statusLog: { create: { status: StatusPesanan.MENUNGGU_PEMBAYARAN } },
          },
          include: { item: true },
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

        // Item yang barusan jadi pesanan dihapus dari keranjang — checkout
        // cuma untuk item yang dipilih (bisa sebagian), sisanya tetap di keranjang.
        await tx.keranjangItem.deleteMany({ where: { id: { in: keranjangItemIds } } });

        return { pesanan, pembayaran };
      });
    } catch (err) {
      const bolehRetry =
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2002" &&
        percobaan < MAKS_PERCOBAAN_NO_INVOICE - 1;
      if (bolehRetry) continue; // no_invoice tabrakan (sangat jarang) -> coba lagi dengan invoice baru
      throw err;
    }
  }

  // Praktis tidak akan pernah sampai sini (peluang 3x tabrakan berturut-turut
  // hampir nol), tapi TypeScript perlu return path yang eksplisit.
  throw new CheckoutError("Gagal membuat pesanan, coba lagi", 500);
}

/** Error untuk operasi admin di modul pesanan (biaya, status, pengiriman) — terpisah dari CheckoutError secara semantik, sama-sama AppError. */
export class PesananError extends AppError {
  constructor(message: string, status: number) {
    super(message, status);
    this.name = "PesananError";
  }
}

const STATUS_TERMINAL = new Set<StatusPesanan>([StatusPesanan.SELESAI, StatusPesanan.DIBATALKAN]);

/**
 * Admin isi biayaJasaTitip/ongkirDomestik (di-set 0 saat checkout, lihat
 * catatan di prosesCheckout). totalAkhir dihitung ULANG di sini dari
 * subtotalProduk + ongkirChinaGudang (tersimpan) + biaya baru — tidak pernah
 * dipercaya dari client.
 */
export async function updateBiayaPesanan(pesananId: string, input: UpdateBiayaInput) {
  const pesanan = await prisma.pesanan.findUnique({ where: { id: pesananId } });
  if (!pesanan) throw new PesananError("Pesanan tidak ditemukan", 404);

  // biayaJasaTitip & ongkirDomestik SELALU diambil dari nilai TERSIMPAN
  // (bukan dihitung ulang, bukan dari input) -- endpoint ini cuma boleh
  // mengubah ongkirChinaGudang. Dua field lain sudah final & otomatis
  // sejak checkout (lib/tarif.ts).
  const totalAkhir =
    Number(pesanan.subtotalProduk) +
    Number(pesanan.biayaJasaTitip) +
    input.ongkirChinaGudang +
    Number(pesanan.ongkirDomestik) +
    Number(pesanan.biayaAdminPayment);

  return prisma.pesanan.update({
    where: { id: pesananId },
    data: {
      ongkirChinaGudang: input.ongkirChinaGudang,
      totalAkhir,
    },
  });
}

/**
 * Admin ubah status pesanan (pipeline pengiriman). Guard ringan: pesanan yang
 * sudah di status TERMINAL (SELESAI/DIBATALKAN) tidak bisa diubah lagi lewat
 * endpoint ini. SETIAP perubahan WAJIB nambah baris PesananStatusLog (sumber
 * kebenaran untuk halaman "Lacak status" customer), bukan cuma update kolom.
 */
export async function updateStatusPesanan(adminId: string, pesananId: string, input: UpdateStatusPesananInput) {
  const pesanan = await prisma.pesanan.findUnique({
    where: { id: pesananId },
    include: { customer: { select: { noWa: true } } },
  });
  if (!pesanan) throw new PesananError("Pesanan tidak ditemukan", 404);

  if (STATUS_TERMINAL.has(pesanan.statusPesanan)) {
    throw new PesananError(
      `Pesanan sudah berstatus ${pesanan.statusPesanan}, tidak bisa diubah lagi`,
      409
    );
  }

  const pesanNotif = `Status pesanan ${pesanan.noInvoice} diperbarui jadi ${input.status}.`;

  const hasil = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    await tx.pesanan.update({ where: { id: pesananId }, data: { statusPesanan: input.status } });
    await tx.pesananStatusLog.create({ data: { pesananId, status: input.status } });
    await catatLogAktivitas(
      tx,
      adminId,
      "UBAH_STATUS_PESANAN",
      pesananId,
      input.catatan ?? `Status diubah jadi ${input.status}`
    );
    await buatNotifikasi(tx, pesanan.customerId, pesananId, pesanNotif, "STATUS_PESANAN");
    return { berhasil: true };
  });

  await kirimNotifikasiWa(pesanan.customer.noWa, pesanNotif);

  return hasil;
}

/** Lazy-create, 1-1 dengan Pesanan — pola sama seperti getOrBuatKeranjang di lib/keranjang.ts. */
async function getOrBuatPengiriman(pesananId: string) {
  const ada = await prisma.pengiriman.findUnique({ where: { pesananId } });
  if (ada) return ada;

  try {
    return await prisma.pengiriman.create({ data: { pesananId } });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      const punyaOrang = await prisma.pengiriman.findUnique({ where: { pesananId } });
      if (punyaOrang) return punyaOrang;
    }
    throw err;
  }
}

export async function updatePengiriman(pesananId: string, input: UpdatePengirimanInput) {
  const pesanan = await prisma.pesanan.findUnique({ where: { id: pesananId } });
  if (!pesanan) throw new PesananError("Pesanan tidak ditemukan", 404);

  const pengiriman = await getOrBuatPengiriman(pesananId);

  return prisma.pengiriman.update({
    where: { id: pengiriman.id },
    data: {
      ...(input.kurir !== undefined && { kurir: input.kurir }),
      ...(input.noResi !== undefined && { noResi: input.noResi }),
      ...(input.statusKirim !== undefined && { statusKirim: input.statusKirim }),
      ...(input.estimasiTiba !== undefined && { estimasiTiba: input.estimasiTiba }),
    },
  });
}

/**
 * Customer batalkan pesanan SENDIRI. Beda dari pembatalan sistem/admin:
 * - Cuma boleh saat status masih MENUNGGU_PEMBAYARAN (belum diproses admin
 *   sama sekali — setelah TERVERIFIKASI, status sudah DIPROSES_ADMIN dan
 *   tombol batal di frontend tidak ditampilkan).
 * - Guard atomik `WHERE statusPesanan = MENUNGGU_PEMBAYARAN` (pola yang sama
 *   seperti verifikasi pembayaran): kalau admin kebetulan verifikasi di detik
 *   yang sama, salah satu kalah dan dilempar 409, tidak dobel diproses.
 * - Percobaan bayar yang masih aktif (MENUNGGU_BUKTI/MENUNGGU_VERIFIKASI)
 *   ikut ditandai KADALUARSA — tanpa ini, retry pembayaran masih bisa jalan
 *   padahal pesanannya sudah batal.
 * - Stok dikembalikan (kembalikanStok, toleran referensi usang — lihat lib/stok.ts).
 * - Selalu nambah PesananStatusLog DIBATALKAN (sumber kebenaran halaman lacak).
 * - Notifikasi in-app ke customer (dibuat DI DALAM transaksi). TIDAK kirim WA:
 *   yang bertindak customer itu sendiri, tidak ada pihak lain yang perlu diberi tahu.
 */
export async function batalkanPesananCustomer(customerId: string, pesananId: string) {
  const pesanan = await prisma.pesanan.findUnique({
    where: { id: pesananId },
    include: { item: true },
  });

  // 404 seragam untuk "tidak ada" maupun "bukan milik kamu" — pola yang sama
  // seperti GET /api/pesanan/[id].
  if (!pesanan || pesanan.customerId !== customerId) {
    throw new PesananError("Pesanan tidak ditemukan", 404);
  }

  if (pesanan.statusPesanan !== StatusPesanan.MENUNGGU_PEMBAYARAN) {
    throw new PesananError("Pesanan ini sudah diproses admin, tidak bisa dibatalkan sendiri", 409);
  }

  return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const hasil = await tx.pesanan.updateMany({
      where: { id: pesananId, statusPesanan: StatusPesanan.MENUNGGU_PEMBAYARAN },
      data: { statusPesanan: StatusPesanan.DIBATALKAN },
    });

    if (hasil.count === 0) {
      throw new PesananError(
        "Pesanan ini berubah status di tengah jalan (mungkin baru diverifikasi admin), tidak jadi dibatalkan",
        409
      );
    }

    await tx.pesananStatusLog.create({
      data: { pesananId, status: StatusPesanan.DIBATALKAN, catatan: "Dibatalkan customer" },
    });

    await tx.pembayaran.updateMany({
      where: {
        pesananId,
        status: { in: [StatusPembayaran.MENUNGGU_BUKTI, StatusPembayaran.MENUNGGU_VERIFIKASI] },
      },
      data: { status: StatusPembayaran.KADALUARSA },
    });

    for (const item of pesanan.item) {
      if (item.produkId) {
        await kembalikanStok(tx, item.produkId, item.produkVarianId, item.jumlah);
      }
    }

    await buatNotifikasi(
      tx,
      customerId,
      pesananId,
      `Pesanan ${pesanan.noInvoice} dibatalkan. Stok item dikembalikan.`,
      "PEMBATALAN_PESANAN"
    );

    return { berhasil: true };
  });
}