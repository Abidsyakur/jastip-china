import { NextRequest, NextResponse } from "next/server";
import { COOKIE_REFRESH_TOKEN, hapusCookieAuth, cabutSesi } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get(COOKIE_REFRESH_TOKEN)?.value;
  if (refreshToken) {
    await cabutSesi(refreshToken);
  }

  const res = NextResponse.json({ message: "Logout berhasil" });
  hapusCookieAuth(res);
  return res;
}
