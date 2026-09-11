// letak: src/lib/log-aktivitas.ts
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";

/**
 * Satu-satunya cara mencatat LogAktivitas. Selalu panggil ini di DALAM
 * prisma.$transaction yang sama dengan aksi yang dicatat (pass `tx`, bukan
 * `prisma` langsung) — supaya aksi & catatannya atomik: kalau salah satu
 * gagal, dua-duanya batal, tidak ada aksi admin penting yang lolos tanpa jejak.
 */
export function catatLogAktivitas(
  tx: Prisma.TransactionClient,
  adminId: string,
  aksi: string,
  entitasTerkait: string,
  keterangan?: string
) {
  return tx.logAktivitas.create({
    data: { adminId, aksi, entitasTerkait, keterangan },
  });
}