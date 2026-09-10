import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parseBody, loginSchema } from "@/lib/validasi";
import {
  verifyPassword,
  normalisasiNoWa,
  buatAccessToken,
  buatSesiCustomer,
  setAccessTokenCookie,
  setRefreshTokenCookie,
  cekRateLimitLogin,
} from "@/lib/auth";

const AKSES_TOKEN_UMUR_DETIK = 15 * 60;

export async function POST(req: NextRequest) {
  const parsed = await parseBody(req, loginSchema);
  if ("error" in parsed) return parsed.error;

  const { noWa, email, password } = parsed.data;

  // Rate limit di-key oleh akun yang dicoba, bukan cuma IP — lihat komentar di rate-limit.ts
  const limit = await cekRateLimitLogin(`customer:${noWa ?? email}`);
  if (!limit.diizinkan) {
    return NextResponse.json(
      { error: "Terlalu banyak percobaan login, coba lagi beberapa menit lagi" },
      { status: 429 }
    );
  }

  const customer = await prisma.customer.findFirst({
    where: noWa ? { noWa: normalisasiNoWa(noWa) } : { email },
  });

  // Pesan error SAMA baik untuk "akun tidak ada" maupun "password salah" —
  // supaya endpoint ini tidak bisa dipakai enumerasi nomor/email yang terdaftar.
  if (!customer || !(await verifyPassword(password, customer.passwordHash))) {
    return NextResponse.json({ error: "Nomor WA/email atau password salah" }, { status: 401 });
  }

  const accessToken = await buatAccessToken({ sub: customer.id, tipe: "customer" });
  const { refreshTokenMentah, kedaluwarsaPada } = await buatSesiCustomer(customer.id, {
    deviceInfo: req.headers.get("user-agent") ?? undefined,
    ipAddress: req.headers.get("x-forwarded-for") ?? undefined,
  });

  const res = NextResponse.json({
    message: "Login berhasil",
    customer: { id: customer.id, nama: customer.nama, email: customer.email },
  });
  setAccessTokenCookie(res, accessToken, AKSES_TOKEN_UMUR_DETIK);
  setRefreshTokenCookie(res, refreshTokenMentah, kedaluwarsaPada);
  return res;
}
