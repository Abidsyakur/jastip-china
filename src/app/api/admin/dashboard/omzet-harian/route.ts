// letak: src/app/api/admin/dashboard/omzet-harian/route.ts
import { NextRequest, NextResponse } from "next/server";
import { StatusPesanan } from "@prisma/client";
import { prisma } from "@/lib/db";
import { parseQuery, omzetHarianQuerySchema } from "@/lib/validasi";
import { wajibAdmin } from "@/lib/auth";
import { tanganiErrorAuth } from "@/lib/http-error";

// Bucket harian mengikuti hari WIB (UTC+7), bukan UTC — chart dashboard
// dibaca orang Indonesia, batas hari harus sama dengan yang mereka rasakan.
const WIB_OFFSET_MS = 7 * 60 * 60 * 1000;
const SEHARI_MS = 24 * 60 * 60 * 1000;

function kunciHariWib(d: Date): string {
  return new Date(d.getTime() + WIB_OFFSET_MS).toISOString().slice(0, 10);
}

export async function GET(req: NextRequest) {
  try {
    await wajibAdmin(req);

    const parsed = parseQuery(req.nextUrl.searchParams, omzetHarianQuerySchema);
    if ("error" in parsed) return parsed.error;
    const { hari = 7 } = parsed.data;

    // Awal hari ini (WIB) mundur `hari` hari. Agregasi di JS (bukan raw SQL)
    // supaya tetap portabel Prisma biasa — volume data dashboard kecil,
    // tidak perlu date_trunc di DB.
    const sekarangWib = new Date(Date.now() + WIB_OFFSET_MS);
    const awalHariIniUtc = Date.UTC(
      sekarangWib.getUTCFullYear(),
      sekarangWib.getUTCMonth(),
      sekarangWib.getUTCDate()
    );
    const awal = new Date(awalHariIniUtc - (hari - 1) * SEHARI_MS - WIB_OFFSET_MS);

    const pesanan = await prisma.pesanan.findMany({
      where: {
        tglPesan: { gte: awal },
        // Definisi "omzet" SAMA dengan /api/admin/dashboard/statistik:
        // bukan nunggu bayar, bukan batal.
        statusPesanan: { notIn: [StatusPesanan.MENUNGGU_PEMBAYARAN, StatusPesanan.DIBATALKAN] },
      },
      select: { tglPesan: true, totalAkhir: true },
    });

    // Inisialisasi semua hari dengan 0 supaya deret kontinu (chart tidak
    // bolong di hari tanpa transaksi) — frontend tinggal render apa adanya.
    const peta = new Map<string, { omzet: number; jumlahPesanan: number }>();
    for (let i = 0; i < hari; i++) {
      const kunci = new Date(awal.getTime() + WIB_OFFSET_MS + i * SEHARI_MS)
        .toISOString()
        .slice(0, 10);
      peta.set(kunci, { omzet: 0, jumlahPesanan: 0 });
    }
    for (const p of pesanan) {
      const baris = peta.get(kunciHariWib(p.tglPesan));
      if (!baris) continue; // geser zona waktu di tepi jendela — lewati
      baris.omzet += Number(p.totalAkhir);
      baris.jumlahPesanan += 1;
    }

    return NextResponse.json({
      items: [...peta.entries()].map(([tanggal, v]) => ({ tanggal, ...v })),
    });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}
