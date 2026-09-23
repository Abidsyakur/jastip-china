import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import type { AdminRole } from "@prisma/client";

export type TipeUser = "customer" | "admin";

export interface AccessTokenPayload extends JWTPayload {
  sub: string; // id Customer atau Admin
  tipe: TipeUser;
  role?: AdminRole; // cuma ada kalau tipe === "admin"
}

function getAccessSecret(): Uint8Array {
  const value = process.env.JWT_ACCESS_SECRET;
  if (!value) {
    throw new Error("JWT_ACCESS_SECRET wajib diisi di .env");
  }
  return new TextEncoder().encode(value);
}

function getExpiresIn(): string {
  return process.env.JWT_ACCESS_EXPIRES_IN ?? "2h";
}

export async function buatAccessToken(
  payload: Omit<AccessTokenPayload, "iat" | "exp">
): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(getExpiresIn())
    .sign(getAccessSecret());
}

/**
 * Verifikasi access token. Return null untuk SEMUA jenis kegagalan
 * (signature tidak cocok, expired, format rusak) — pemanggil cukup tahu
 * "valid" atau "tidak", tidak perlu bedakan alasannya untuk keputusan auth.
 */
export async function verifikasiAccessToken(
  token: string
): Promise<AccessTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getAccessSecret());
    return payload as AccessTokenPayload;
  } catch {
    return null;
  }
}