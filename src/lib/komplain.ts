// letak: src/lib/komplain.ts
import { Prisma, StatusKomplain } from "@prisma/client";
import { prisma } from "@/lib/db";
import { catatLogAktivitas } from "@/lib/log-aktivitas";
import { AppError } from "@/lib/http-error";
import type { AjukanKomplainInput, TindakLanjutKomplainInput } from "@/lib/validasi";

export class KomplainError extends AppError {
  constructor(message: string, status: number) {
    super(message, status);
    this.name = "KomplainError";
  }
}

/**
 * Ajukan komplain atas satu PesananItem. Kepemilikan dicek lewat rantai
 * PesananItem -> Pesanan -> customerId (bukan field customerId langsung di
 * Komplain, karena skema memang tidak menyimpannya di situ).
 */
export async function ajukanKomplain(customerId: string, input: AjukanKomplainInput) {
  const pesananItem = await prisma.pesananItem.findUnique({
    where: { id: input.pesananItemId },
    include: { pesanan: true },
  });

  if (!pesananItem || pesananItem.pesanan.customerId !== customerId) {
    throw new KomplainError("Item pesanan tidak ditemukan", 404);
  }

  return prisma.komplain.create({
    data: {
      pesananItemId: input.pesananItemId,
      alasan: input.alasan,
      buktiFoto: input.buktiFoto,
      deskripsi: input.deskripsi,
    },
  });
}

/**
 * Admin tindak lanjut. Guard ringan: kalau komplain SUDAH SELESAI, tidak
 * boleh ditindaklanjuti lagi (harus ajukan komplain baru kalau memang ada
 * masalah susulan) — dijaga atomik lewat `status: { not: SELESAI }` di WHERE.
 * Tiap tindak lanjut SELALU nambah baris KomplainLog (riwayat bertahap),
 * terpisah dari `solusi` (keputusan akhir) di tabel Komplain sendiri.
 */
export async function tindakLanjutKomplain(
  adminId: string,
  komplainId: string,
  input: TindakLanjutKomplainInput
) {
  const komplain = await prisma.komplain.findUnique({ where: { id: komplainId } });
  if (!komplain) throw new KomplainError("Komplain tidak ditemukan", 404);

  return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const hasil = await tx.komplain.updateMany({
      where: { id: komplainId, status: { not: StatusKomplain.SELESAI } },
      data: { status: input.status, solusi: input.solusi },
    });

    if (hasil.count === 0) {
      throw new KomplainError("Komplain ini sudah SELESAI, tidak bisa ditindaklanjuti lagi", 409);
    }

    await tx.komplainLog.create({
      data: { komplainId, adminId, catatan: input.catatan },
    });

    await catatLogAktivitas(tx, adminId, "TINDAK_LANJUT_KOMPLAIN", komplainId, input.catatan);

    return { berhasil: true };
  });
}