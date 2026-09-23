// letak: src/lib/http-error.ts
import { NextResponse } from "next/server";
import { TidakTerautentikasiError, TidakDiizinkanError } from "@/lib/auth/current-user";

/**
 * Return NextResponse kalau err adalah error auth yang dikenal, atau null
 * kalau bukan (pemanggil harus re-throw supaya Next.js catat sebagai 500).
 *
 * Contoh pakai di route handler:
 *
 *   try {
 *     const admin = await wajibAdmin(req, ["OWNER"]);
 *     ...
 *   } catch (err) {
 *     const res = tanganiErrorAuth(err);
 *     if (res) return res;
 *     throw err;
 *   }
 */
export function tanganiErrorAuth(err: unknown): NextResponse | null {
  if (err instanceof TidakTerautentikasiError) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
  if (err instanceof TidakDiizinkanError) {
    return NextResponse.json({ error: err.message }, { status: 403 });
  }
  return null;
}

/**
 * Error domain generik yang sudah tahu status HTTP-nya sendiri. Dipakai
 * sebagai base class untuk error spesifik-modul (CheckoutError, PembayaranError,
 * dst) supaya route handler cukup satu jenis catch untuk semuanya, bukan
 * daftar `instanceof` yang makin panjang tiap nambah modul baru.
 */
export class AppError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "AppError";
    this.status = status;
  }
}

export function tanganiAppError(err: unknown): NextResponse | null {
  if (err instanceof AppError) {
    return NextResponse.json({ error: err.message }, { status: err.status });
  }
  return null;
}

/** Sama seperti tanganiErrorAuth, tapi untuk AppError (dan semua turunannya). */
export function catatLogError(err: unknown) {
  console.error("[SERVER_ERROR]", err);
}
