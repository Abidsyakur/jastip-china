// letak: src/lib/kurs-master.ts
import { prisma } from "@/lib/db";
import { AppError } from "@/lib/http-error";

export class KursMasterError extends AppError {
  constructor(message: string, status: number) {
    super(message, status);
    this.name = "KursMasterError";
  }
}

/** "Kurs aktif" = baris KursMaster dengan dibuatPada paling baru. Throw kalau belum pernah diisi sama sekali. */
export async function ambilKursAktif() {
  const kurs = await prisma.kursMaster.findFirst({ orderBy: { dibuatPada: "desc" } });
  if (!kurs) throw new KursMasterError("Kurs belum diatur, isi KursMaster dulu", 400);
  return kurs;
}

/** Satu-satunya cara nambah kurs baru — APPEND-ONLY, bukan update baris lama (pola sama seperti LogAktivitas/PesananStatusLog). */
export function buatKursBaru(adminId: string, kursRmbIdr: number) {
  return prisma.kursMaster.create({ data: { adminId, kursRmbIdr } });
}

export function listRiwayatKurs() {
  return prisma.kursMaster.findMany({ orderBy: { dibuatPada: "desc" } });
}