// letak: src/lib/auth/__tests__/cookie.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { NextResponse } from "next/server";
import {
  COOKIE_ACCESS_TOKEN,
  AKSES_TOKEN_UMUR_DETIK,
  COOKIE_REFRESH_TOKEN,
  setAccessTokenCookie,
  setRefreshTokenCookie,
  hapusCookieAuth,
} from "../cookie";


test("umur access token 24 jam, sama untuk semua route", () => {
  assert.equal(AKSES_TOKEN_UMUR_DETIK, 86400);
});

/** Ambil satu-satunya header Set-Cookie dari response (gagal jelas kalau jumlahnya bukan 1). */
function cookieTunggal(res: NextResponse): string {
  const semua = res.headers.getSetCookie();
  assert.equal(semua.length, 1, "harus ada tepat satu header Set-Cookie");
  return semua[0] as string;
}

/** Cari Set-Cookie yang diawali nama tertentu (gagal jelas kalau tidak ada). */
function cariCookie(semua: string[], awalan: string): string {
  const ditemukan = semua.find((c) => c.startsWith(awalan));
  assert.ok(ditemukan, `Set-Cookie dengan awalan "${awalan}" harus ada`);
  return ditemukan;
}

test("nama cookie sesuai konvensi project", () => {
  assert.equal(COOKIE_ACCESS_TOKEN, "jastip_access_token");
  assert.equal(COOKIE_REFRESH_TOKEN, "jastip_refresh_token");
});

test("setAccessTokenCookie: httpOnly, sameSite lax, path /, maxAge sesuai", () => {
  const res = NextResponse.json({});
  setAccessTokenCookie(res, "token-abc", 900);

  const cookie = cookieTunggal(res);
  assert.match(cookie, /^jastip_access_token=token-abc;/);
  assert.match(cookie, /HttpOnly/i);
  assert.match(cookie, /SameSite=lax/i);
  assert.match(cookie, /Path=\//);
  assert.match(cookie, /Max-Age=900/);
});

test("setRefreshTokenCookie: httpOnly, sameSite lax, expires = kedaluwarsaPada", () => {
  const res = NextResponse.json({});
  const kedaluwarsa = new Date("2030-01-01T00:00:00.000Z");
  setRefreshTokenCookie(res, "refresh-xyz", kedaluwarsa);

  const cookie = cookieTunggal(res);
  assert.match(cookie, /^jastip_refresh_token=refresh-xyz;/);
  assert.match(cookie, /HttpOnly/i);
  assert.match(cookie, /SameSite=lax/i);
  assert.match(cookie, /Path=\//);
  assert.ok(cookie.includes(`Expires=${kedaluwarsa.toUTCString()}`));
});

test("hapusCookieAuth: kedua cookie dikosongkan dan dikedaluwarsakan", () => {
  const res = NextResponse.json({});
  hapusCookieAuth(res);

  const semua = res.headers.getSetCookie();
  assert.equal(semua.length, 2);

  const akses = cariCookie(semua, "jastip_access_token=");
  const refresh = cariCookie(semua, "jastip_refresh_token=");
  // Nilai kosong + tanggal kedaluwarsa di masa lalu = browser menghapusnya
  assert.match(akses, /^jastip_access_token=;/);
  assert.match(refresh, /^jastip_refresh_token=;/);
  assert.match(akses, /1970/);
  assert.match(refresh, /1970/);
});