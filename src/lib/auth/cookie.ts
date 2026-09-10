import type { NextResponse } from "next/server";

export const COOKIE_ACCESS_TOKEN = "jastip_access_token";
export const COOKIE_REFRESH_TOKEN = "jastip_refresh_token";

const opsiDasar = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export function setAccessTokenCookie(res: NextResponse, token: string, umurDetik: number): void {
  res.cookies.set(COOKIE_ACCESS_TOKEN, token, { ...opsiDasar, maxAge: umurDetik });
}

export function setRefreshTokenCookie(res: NextResponse, token: string, kedaluwarsaPada: Date): void {
  res.cookies.set(COOKIE_REFRESH_TOKEN, token, { ...opsiDasar, expires: kedaluwarsaPada });
}

export function hapusCookieAuth(res: NextResponse): void {
  res.cookies.delete(COOKIE_ACCESS_TOKEN);
  res.cookies.delete(COOKIE_REFRESH_TOKEN);
}