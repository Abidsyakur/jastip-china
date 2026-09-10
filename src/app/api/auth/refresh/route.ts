import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import type { AdminRole } from "@prisma/client";
import {
  COOKIE_REFRESH_TOKEN,
  setAccessTokenCookie,
  setRefreshTokenCookie,
  hapusCookieAuth,
  cariSesiAktif,
  rotasiRefreshToken,
  buatAccessToken,
} from "@/lib/auth";

const AKSES_TOKEN_UMUR_DETIK = 15 * 60;

export async function POST(req: NextRequest) {
  const refreshTokenLama = req.cookies.get(COOKIE_REFRESH_TOKEN)?.value;
  if (!refreshTokenLama) {
    return NextResponse.json({ error: "Tidak ada sesi aktif" }, { status: 401 });
  }

  const sesi = await cariSesiAktif(refreshTokenLama);
  if (!sesi) {
    const res = NextResponse.json(
      { error: "Sesi tidak valid atau kedaluwarsa, silakan login ulang" },
      { status: 401 }
    );
    hapusCookieAuth(res);
    return res;
  }

  const tipe = sesi.customerId ? "customer" : "admin";
  const idUser = sesi.customerId ?? sesi.adminId!; // salah satu pasti terisi (dijamin CHECK constraint)

  // Kalau admin, ambil role TERBARU dari DB (bukan yang di-cache di SesiLogin)
  // — supaya kalau OWNER ubah role STAFF seseorang, efeknya langsung kepakai
  // di access token berikutnya, tidak perlu tunggu token lama benar-benar expired.
  let role: AdminRole | undefined;
  if (tipe === "admin") {
    const admin = await prisma.admin.findUnique({ where: { id: idUser }, select: { role: true } });
    if (!admin) {
      const res = NextResponse.json({ error: "Akun admin tidak ditemukan" }, { status: 401 });
      hapusCookieAuth(res);
      return res;
    }
    role = admin.role;
  }

  const accessTokenBaru = await buatAccessToken({ sub: idUser, tipe, role });
  const refreshTokenBaru = await rotasiRefreshToken(sesi.id);

  const res = NextResponse.json({ message: "Token diperbarui" });
  setAccessTokenCookie(res, accessTokenBaru, AKSES_TOKEN_UMUR_DETIK);
  setRefreshTokenCookie(res, refreshTokenBaru, sesi.kedaluwarsaPada);
  return res;
}
