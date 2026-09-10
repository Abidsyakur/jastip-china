import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// TODO(modul-auth): cek access token JWT di cookie, redirect ke /admin/login
// kalau tidak valid/expired. Untuk sekarang cuma pass-through supaya build jalan.
export function middleware(_req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
