import type { NextRequest } from "next/server";
import type { AdminRole } from "@prisma/client";
import { COOKIE_ACCESS_TOKEN } from "./cookie";
import { verifikasiAccessToken, type AccessTokenPayload } from "./token";

export class TidakTerautentikasiError extends Error {
  constructor(pesan = "Sesi tidak valid atau kedaluwarsa, silakan login ulang") {
    super(pesan);
    this.name = "TidakTerautentikasiError";
  }
}

export class TidakDiizinkanError extends Error {
  constructor(pesan = "Tidak punya izin untuk aksi ini") {
    super(pesan);
    this.name = "TidakDiizinkanError";
  }
}

export async function ambilUserDariRequest(req: NextRequest): Promise<AccessTokenPayload | null> {
  const token = req.cookies.get(COOKIE_ACCESS_TOKEN)?.value;
  if (!token) return null;
  return verifikasiAccessToken(token);
}

/** Lempar TidakTerautentikasiError kalau tidak ada sesi valid — dipakai di awal route handler yang butuh login. */
export async function wajibLogin(req: NextRequest): Promise<AccessTokenPayload> {
  const user = await ambilUserDariRequest(req);
  if (!user) throw new TidakTerautentikasiError();
  return user;
}

/**
 * Lempar TidakDiizinkanError kalau bukan admin, atau role-nya tidak termasuk
 * yang diizinkan. Dipakai di semua endpoint /api/admin/* pada modul-modul berikutnya.
 *
 * Contoh: cuma OWNER yang boleh hapus produk →
 *   const admin = await wajibAdmin(req, ["OWNER"]);
 */
export async function wajibAdmin(
  req: NextRequest,
  roleDiizinkan?: AdminRole[]
): Promise<AccessTokenPayload> {
  const user = await wajibLogin(req);
  if (user.tipe !== "admin") throw new TidakDiizinkanError("Butuh akses admin");
  if (roleDiizinkan && (!user.role || !roleDiizinkan.includes(user.role))) {
    throw new TidakDiizinkanError("Role kamu tidak memiliki izin untuk aksi ini");
  }
  return user;
}