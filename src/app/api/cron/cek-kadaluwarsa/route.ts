// letak: src/app/api/cron/cek-kedaluwarsa/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prosesKedaluwarsaPembayaran } from "@/lib/pembayaran";

/**
 * Vercel Cron memanggil endpoint ini via GET dengan header
 * `Authorization: Bearer $CRON_SECRET` otomatis (dikonfigurasi di
 * vercel.json). BUKAN endpoint publik — auth-nya beda dari
 * wajibCustomer/wajibAdmin karena ini dipanggil sistem, bukan user.
 */
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }

  const hasil = await prosesKedaluwarsaPembayaran();

  return NextResponse.json({ message: "Selesai", ...hasil });
}