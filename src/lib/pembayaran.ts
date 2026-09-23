// letak: src/lib/pembayaran.ts
import { Prisma, StatusPesanan, StatusPembayaran } from "@prisma/client";
import { prisma } from "@/lib/db";
import { kurangiStokAtomik, kembalikanStok } from "@/lib/stok";
import { catatLogAktivitas } from "@/lib/log-aktivitas";
import { buatNotifikasi, kirimNotifikasiWa } from "@/lib/notifikasi";
import { AppError } from "@/lib/http-error";
import type { UploadBuktiInput } from "@/lib/validasi";

/** Bentuk minimal yang dibutuhkan fungsi ini — sengaja tidak pakai
 * VerifikasiPembayaranInput langsung (union sempit TERVERIFIKASI|DITOLAK):
 * lewat generic parseBody, TypeScript kadang gagal mempertahankan hasil
 * narrowing dari Zod .refine() (soal inferensi tipe, bukan soal runtime —
 * Zod tetap menjamin cuma dua nilai ini yang bisa lolos validasi). */
interface InputVerifikasi {
  status: StatusPembayaran;
  catatanAdmin?: string;
}

const JAM_KEDALUWARSA_PEMBAYARAN = Number(process.env.PEMBAYARAN_KEDALUWARSA_JAM ?? 24);

export class PembayaranError extends AppError {
  constructor(message: string, status: number) {
    super(message, status);
    this.name = "PembayaranError";
  }
}

/**
 * Retry pembayaran: bikin percobaan Pembayaran BARU untuk Pesanan yang sama
 * (bukan update baris lama) — sesuai keputusan arsitektur "Pembayaran
 * satu-ke-banyak terhadap Pesanan". Stok yang sudah dilepas saat percobaan
 * sebelumnya kadaluarsa/ditolak, di sini di-guard ATOMIK ulang persis seperti
 * saat checkout — retry BISA gagal kalau stok sudah diambil orang lain
 * selama jendela kosong antara expired dan retry (bukan bug, ini memang
 * skenario yang sudah diantisipasi di tahap arsitektur).
 */
export async function buatPercobaanBayarBaru(customerId: string, pesananId: string, metode: string) {
  const pesanan = await prisma.pesanan.findUnique({
    where: { id: pesananId },
    include: { item: true, pembayaran: { orderBy: { id: "desc" }, take: 1 } },
  });

  if (!pesanan || pesanan.customerId !== customerId) {
    throw new PembayaranError("Pesanan tidak ditemukan", 404);
  }

  if (pesanan.statusPesanan !== StatusPesanan.MENUNGGU_PEMBAYARAN) {
    throw new PembayaranError("Pesanan ini sudah tidak dalam status menunggu pembayaran", 409);
  }

  const pembayaranTerakhir = pesanan.pembayaran[0];
  const adaPercobaanAktif =
    pembayaranTerakhir &&
    (pembayaranTerakhir.status === StatusPembayaran.MENUNGGU_BUKTI ||
      pembayaranTerakhir.status === StatusPembayaran.MENUNGGU_VERIFIKASI ||
      pembayaranTerakhir.status === StatusPembayaran.TERVERIFIKASI);

  if (adaPercobaanAktif) {
    throw new PembayaranError(
      "Masih ada percobaan pembayaran yang aktif untuk pesanan ini, tidak bisa bikin percobaan baru",
      409
    );
  }

  return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    for (const item of pesanan.item) {
      if (!item.produkId) continue; // item custom PO, tidak ada stok katalog untuk dijaga

      const berhasil = await kurangiStokAtomik(tx, item.produkId, item.produkVarianId, item.jumlah);
      if (!berhasil) {
        throw new PembayaranError(
          `Stok "${item.namaItemSnapshot}" sudah tidak cukup untuk retry pembayaran ini`,
          409
        );
      }
    }

    const kedaluwarsaPada = new Date(Date.now() + JAM_KEDALUWARSA_PEMBAYARAN * 60 * 60 * 1000);

    return tx.pembayaran.create({
      data: {
        pesananId,
        metode,
        status: StatusPembayaran.MENUNGGU_BUKTI,
        jumlahBayar: pesanan.totalAkhir,
        kedaluwarsaPada,
      },
    });
  });
}

/**
 * Customer upload bukti transfer untuk percobaan pembayaran TERAKHIR pada
 * pesanan ini. Guard atomik: syarat status MENUNGGU_BUKTI ditaruh di WHERE —
 * kalau ternyata sudah kadaluarsa (cron menang race di detik yang sama) atau
 * memang sudah pernah diupload, update ini 0 baris dan dilempar sebagai error.
 */
export async function uploadBuktiPembayaran(
  customerId: string,
  pesananId: string,
  input: UploadBuktiInput
) {
  const pesanan = await prisma.pesanan.findUnique({
    where: { id: pesananId },
    include: { pembayaran: { orderBy: { id: "desc" }, take: 1 } },
  });
  if (!pesanan || pesanan.customerId !== customerId) {
    throw new PembayaranError("Pesanan tidak ditemukan", 404);
  }

  const pembayaranTerakhir = pesanan.pembayaran[0];
  if (!pembayaranTerakhir) {
    throw new PembayaranError("Belum ada percobaan pembayaran untuk pesanan ini", 404);
  }

  const hasil = await prisma.pembayaran.updateMany({
    where: { id: pembayaranTerakhir.id, status: StatusPembayaran.MENUNGGU_BUKTI },
    data: {
      buktiUrl: input.buktiUrl,
      tglBayar: input.tglBayar,
      status: StatusPembayaran.MENUNGGU_VERIFIKASI,
    },
  });

  if (hasil.count === 0) {
    throw new PembayaranError(
      "Percobaan pembayaran ini sudah tidak bisa diupload buktinya (mungkin sudah kadaluarsa)",
      409
    );
  }

  return prisma.pembayaran.findUnique({ where: { id: pembayaranTerakhir.id } });
}

/**
 * Admin verifikasi (terima/tolak). Guard atomik: syarat status LAMA
 * (MENUNGGU_VERIFIKASI) ditaruh di WHERE — kalau pembayaran ini kebetulan
 * sudah kadaluarsa duluan (cron menang race), update ini 0 baris dan
 * dilempar sebagai error, BUKAN dipaksa lanjut.
 */
export async function verifikasiPembayaran(
  adminId: string,
  pembayaranId: string,
  input: InputVerifikasi
) {
  const pembayaran = await prisma.pembayaran.findUnique({
    where: { id: pembayaranId },
    include: {
      pesanan: { include: { item: true, customer: { select: { noWa: true, nama: true } } } },
    },
  });
  if (!pembayaran) {
    throw new PembayaranError("Pembayaran tidak ditemukan", 404);
  }

  const diterima = input.status === StatusPembayaran.TERVERIFIKASI;
  const pesanNotif = diterima
    ? `Halo ${pembayaran.pesanan.customer.nama}, Pembayaran pesanan ${pembayaran.pesanan.noInvoice} sebesar ${pembayaran.jumlahBayar} sudah kami terima dan sedang diproses. Terima kasih telah berbelanja di Jastip China!`
    : `Pembayaran untuk pesanan ${pembayaran.pesanan.noInvoice} ditolak: ${input.catatanAdmin}. Silakan ajukan pembayaran ulang.`;

  const hasil = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const hasilUpdate = await tx.pembayaran.updateMany({
      where: { id: pembayaranId, status: StatusPembayaran.MENUNGGU_VERIFIKASI },
      data: {
        status: input.status,
        verifiedByAdminId: adminId,
        catatanAdmin: input.catatanAdmin,
        tglVerifikasi: new Date(),
      },
    });

    if (hasilUpdate.count === 0) {
      throw new PembayaranError(
        "Pembayaran ini sudah diproses sebelumnya (atau kadaluarsa duluan), tidak bisa diverifikasi lagi",
        409
      );
    }

    if (input.status === StatusPembayaran.DITOLAK) {
      for (const item of pembayaran.pesanan.item) {
        if (item.produkId) {
          await kembalikanStok(tx, item.produkId, item.produkVarianId, item.jumlah);
        }
      }
    } else {
      await tx.pesanan.update({
        where: { id: pembayaran.pesananId },
        data: { statusPesanan: StatusPesanan.DIPROSES_ADMIN },
      });
      await tx.pesananStatusLog.create({
        data: { pesananId: pembayaran.pesananId, status: StatusPesanan.DIPROSES_ADMIN },
      });
    }

    await catatLogAktivitas(
      tx,
      adminId,
      input.status === StatusPembayaran.TERVERIFIKASI ? "VERIFIKASI_PEMBAYARAN" : "TOLAK_PEMBAYARAN",
      pembayaranId,
      input.catatanAdmin ?? `Pembayaran untuk pesanan ${pembayaran.pesanan.noInvoice}`
    );

    await buatNotifikasi(tx, pembayaran.pesanan.customerId, pembayaran.pesananId, pesanNotif, "PEMBAYARAN");

    return { berhasil: true };
  });

  // WA di LUAR/SETELAH transaksi (prinsip README) — kalau gagal kirim, tidak
  // boleh menggagalkan verifikasi yang secara data sudah berhasil.
  await kirimNotifikasiWa(pembayaran.pesanan.customer.noWa, pesanNotif);

  return hasil;
}

/**
 * Dipanggil cron (lihat /api/cron/cek-kedaluwarsa). Untuk tiap kandidat,
 * guard atomik per baris: WHERE status = <status saat di-fetch> — kalau
 * admin sempat verifikasi tepat di detik yang sama, salah satu "kalah" dan
 * TIDAK dobel diproses (baris ini persis pembahasan "race cron vs admin"
 * di tahap arsitektur).
 */
export async function prosesKedaluwarsaPembayaran(): Promise<{ diprosesCount: number }> {
  const kandidat = await prisma.pembayaran.findMany({
    where: {
      status: { in: [StatusPembayaran.MENUNGGU_BUKTI, StatusPembayaran.MENUNGGU_VERIFIKASI] },
      kedaluwarsaPada: { lt: new Date() },
    },
    include: { pesanan: { include: { item: true } } },
  });

  let diprosesCount = 0;

  for (const pembayaran of kandidat) {
    const diproses = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const hasil = await tx.pembayaran.updateMany({
        where: { id: pembayaran.id, status: pembayaran.status },
        data: { status: StatusPembayaran.KADALUARSA },
      });

      if (hasil.count === 0) return false; // sudah diproses admin duluan di antara fetch & sekarang

      for (const item of pembayaran.pesanan.item) {
        if (item.produkId) {
          await kembalikanStok(tx, item.produkId, item.produkVarianId, item.jumlah);
        }
      }

      return true;
    });

    if (diproses) diprosesCount++;
  }

  return { diprosesCount };
}