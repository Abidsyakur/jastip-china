import { prisma } from "@/lib/db";
import { buatTokenAcak, hashToken } from "./token-hash";

const REFRESH_TOKEN_EXPIRES_DAYS = Number(process.env.REFRESH_TOKEN_EXPIRES_DAYS ?? 30);

interface InfoPerangkat {
  deviceInfo?: string;
  ipAddress?: string;
}

/**
 * SATU-SATUNYA fungsi yang boleh memanggil prisma.sesiLogin.create().
 * Ini pintu masuk tunggal yang kita putuskan di tahap arsitektur — constraint
 * CHECK di database (lihat migration) adalah jaring pengaman terakhir kalau
 * ada bug, tapi tetap harus lewat sini supaya bentuk data benar sejak awal.
 */
async function buatSesi(pemilik: { customerId: string } | { adminId: string }, info: InfoPerangkat) {
  const tokenMentah = buatTokenAcak();
  const kedaluwarsaPada = new Date(Date.now() + REFRESH_TOKEN_EXPIRES_DAYS * 24 * 60 * 60 * 1000);

  const sesi = await prisma.sesiLogin.create({
    data: {
      ...("customerId" in pemilik ? { customerId: pemilik.customerId } : { adminId: pemilik.adminId }),
      refreshTokenHash: hashToken(tokenMentah),
      deviceInfo: info.deviceInfo,
      ipAddress: info.ipAddress,
      kedaluwarsaPada,
    },
  });

  return { sesiId: sesi.id, refreshTokenMentah: tokenMentah, kedaluwarsaPada };
}

export function buatSesiCustomer(customerId: string, info: InfoPerangkat = {}) {
  return buatSesi({ customerId }, info);
}

export function buatSesiAdmin(adminId: string, info: InfoPerangkat = {}) {
  return buatSesi({ adminId }, info);
}

/** "Aktif" = belum dicabut DAN belum lewat kedaluwarsaPada. */
export function cariSesiAktif(refreshTokenMentah: string) {
  return prisma.sesiLogin.findFirst({
    where: {
      refreshTokenHash: hashToken(refreshTokenMentah),
      dicabut: false,
      kedaluwarsaPada: { gt: new Date() },
    },
  });
}

/**
 * Rotasi refresh token: token lama diganti token baru PADA BARIS SESI YANG
 * SAMA (bukan bikin baris baru). kedaluwarsaPada sengaja TIDAK diperpanjang
 * di sini — total umur sesi tetap dibatasi REFRESH_TOKEN_EXPIRES_DAYS sejak
 * login pertama, bukan sliding window tanpa batas selama terus dipakai.
 */
export async function rotasiRefreshToken(sesiId: string): Promise<string> {
  const tokenBaru = buatTokenAcak();
  await prisma.sesiLogin.update({
    where: { id: sesiId },
    data: { refreshTokenHash: hashToken(tokenBaru) },
  });
  return tokenBaru;
}

/** Logout satu device — no-op senyap kalau token sudah tidak valid (tetap dianggap "berhasil"). */
export async function cabutSesi(refreshTokenMentah: string): Promise<void> {
  await prisma.sesiLogin.updateMany({
    where: { refreshTokenHash: hashToken(refreshTokenMentah) },
    data: { dicabut: true },
  });
}

/** Dipanggil setelah reset password berhasil — semua sesi lama langsung tidak berlaku. */
export async function cabutSemuaSesiCustomer(customerId: string): Promise<void> {
  await prisma.sesiLogin.updateMany({
    where: { customerId, dicabut: false },
    data: { dicabut: true },
  });
}