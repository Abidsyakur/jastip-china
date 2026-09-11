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