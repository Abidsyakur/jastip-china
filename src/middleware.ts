import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { COOKIE_ACCESS_TOKEN } from "@/lib/auth/cookie";

// Middleware jalan di Edge Runtime — sengaja pakai `jose` (bukan lib/auth/token.ts
// langsung diimpor dari sini kalau isinya beda), supaya konsisten & tidak menyentuh
// Prisma sama sekali (Prisma butuh Node runtime, tidak jalan di Edge).
// Secret untuk access token (customer & admin pakai sama)
function getAccessSecret(): Uint8Array {
  const value = process.env.JWT_ACCESS_SECRET;
  if (!value) throw new Error("JWT_ACCESS_SECRET wajib diisi di .env");
  return new TextEncoder().encode(value);
}

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Admin path
  if (path.startsWith("/admin")) {
    if (path.startsWith("/admin/login")) return NextResponse.next();
    const token = req.cookies.get(COOKIE_ACCESS_TOKEN)?.value;
    if (!token) return NextResponse.redirect(new URL("/admin/login", req.url));
    try {
      const { payload } = await jwtVerify(token, getAccessSecret());
      if (payload.tipe !== "admin") return NextResponse.redirect(new URL("/admin/login", req.url));
    } catch {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    return NextResponse.next();
  }

  // Customer protected paths
  const token = req.cookies.get(COOKIE_ACCESS_TOKEN)?.value;
  if (!token) return NextResponse.redirect(new URL("/login", req.url));
  try {
    const { payload } = await jwtVerify(token, getAccessSecret());
    if (payload.tipe !== "customer") return NextResponse.redirect(new URL("/login", req.url));
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/pesanan/:path*", "/checkout", "/keranjang", "/akun", "/komplain", "/notifikasi", "/ajukan-po", "/po/:path*"],
};