import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parseBody, adminLoginSchema } from "@/lib/validasi";
import {
  verifyPassword,
  buatAccessToken,
  buatSesiAdmin,
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from "@/lib/auth";
import { cekRateLimitLogin } from "@/lib/auth/rate-limit";

const AKSES_TOKEN_UMUR_DETIK = 15 * 60;

export async function POST(req: NextRequest) {
  const parsed = await parseBody(req, adminLoginSchema);
  if ("error" in parsed) return parsed.error;

  const { email, password } = parsed.data;

  const limit = await cekRateLimitLogin(`admin:${email}`);
  if (!limit.diizinkan) {
    return NextResponse.json(
      { error: "Terlalu banyak percobaan login, coba lagi beberapa menit lagi" },
      { status: 429 }
    );
  }

  const admin = await prisma.admin.findUnique({ where: { email } });

  if (!admin || !(await verifyPassword(password, admin.passwordHash))) {
    return NextResponse.json({ error: "Email atau password salah" }, { status: 401 });
  }

  const accessToken = await buatAccessToken({ sub: admin.id, tipe: "admin", role: admin.role });
  const { refreshTokenMentah, kedaluwarsaPada } = await buatSesiAdmin(admin.id, {
    deviceInfo: req.headers.get("user-agent") ?? undefined,
    ipAddress: req.headers.get("x-forwarded-for") ?? undefined,
  });

  const res = NextResponse.json({
    message: "Login berhasil",
    admin: { id: admin.id, nama: admin.nama, role: admin.role },
  });
  setAccessTokenCookie(res, accessToken, AKSES_TOKEN_UMUR_DETIK);
  setRefreshTokenCookie(res, refreshTokenMentah, kedaluwarsaPada);
  return res;
}
