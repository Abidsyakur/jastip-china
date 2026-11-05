// letak: src/lib/auth/cron.ts
import { timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Bandingkan rahasia yang diberikan dengan rahasia server.
 * - Rahasia server kosong/belum diisi -> SELALU ditolak (bukan lolos).
 *   Tanpa ini, `Bearer ${undefined}` = "Bearer undefined" bisa lolos.
 * - Perbandingan waktu-konstan supaya panjang/isi rahasia tidak bisa ditebak dari waktu respons.
 */
export function sesuaiRahasia(
  diberikan: string | null | undefined,
  rahasia: string | undefined
): boolean {
  if (!rahasia || !diberikan) return false;
  const a = Buffer.from(diberikan);
  const b = Buffer.from(rahasia);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Return NextResponse 401 kalau tidak sah, atau null kalau boleh lanjut. */
export function wajibCron(req: NextRequest): NextResponse | null {
  const header = req.headers.get("authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
  if (!sesuaiRahasia(token, process.env.CRON_SECRET)) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }
  return null;
}