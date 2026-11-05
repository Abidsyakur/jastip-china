// letak: src/app/api/cron/cek-kedaluwarsa/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prosesKedaluwarsaPembayaran } from "@/lib/pembayaran";
import { wajibCron } from "@/lib/auth/cron";

/**
 * Vercel Cron memanggil endpoint ini via GET dengan header
 * `Authorization: Bearer $CRON_SECRET` otomatis (dikonfigurasi di
 * vercel.json). BUKAN endpoint publik — auth-nya beda dari
 * wajibCustomer/wajibAdmin karena ini dipanggil sistem, bukan user.
 */
export async function GET(req: NextRequest) {
  const tolak = wajibCron(req);
  if (tolak) return tolak;

  const hasil = await prosesKedaluwarsaPembayaran();

  return NextResponse.json({ message: "Selesai", ...hasil });
}