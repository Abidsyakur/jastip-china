import { prisma } from "@/lib/db";
import { buatTokenAcak, hashToken } from "./token-hash";

const RESET_TOKEN_EXPIRES_MENIT = 60;

/** Satu-satunya pintu masuk untuk ResetPasswordToken customer (lihat modul auth § forgot-password). */
export async function buatResetTokenCustomer(customerId: string): Promise<string> {
  const tokenMentah = buatTokenAcak();
  const kedaluwarsaPada = new Date(Date.now() + RESET_TOKEN_EXPIRES_MENIT * 60 * 1000);

  await prisma.resetPasswordToken.create({
    data: { customerId, tokenHash: hashToken(tokenMentah), kedaluwarsaPada },
  });

  return tokenMentah;
}

export function verifikasiResetTokenCustomer(tokenMentah: string) {
  return prisma.resetPasswordToken.findFirst({
    where: {
      tokenHash: hashToken(tokenMentah),
      sudahDipakai: false,
      kedaluwarsaPada: { gt: new Date() },
    },
  });
}

/**
 * Tandai token sebagai terpakai secara ATOMIK: syarat `sudahDipakai: false`
 * ditaruh di WHERE, bukan dicek dulu baru diupdate terpisah. Kalau dua
 * request bersamaan pakai token yang sama persis, cuma satu yang menang
 * (count === 1); yang kedua dapat count === 0 dan harus ditolak di pemanggil
 * — pola yang sama seperti guard stok & verifikasi pembayaran di modul lain.
 */
export function tandaiResetTokenTerpakai(id: string) {
  return prisma.resetPasswordToken.updateMany({
    where: { id, sudahDipakai: false },
    data: { sudahDipakai: true },
  });
}