// letak: src/app/api/cron/laporan-harian/route.ts
import { NextRequest, NextResponse } from "next/server";
import { StatusPembayaran, StatusKomplain, StatusPesanan } from "@prisma/client";
import { prisma } from "@/lib/db";
import { rupiah } from "@/lib/format";

/**
 * Laporan harian untuk n8n (GET dengan Bearer CRON_SECRET, dipanggil
 * sekali sehari — mis. jam 21:00 WIB). Return JSON yang SUDAH berisi
 * `pesan` jadi kalimat siap kirim WA admin — n8n tinggal relayan,
 * tidak perlu format sendiri.
 *
 * Omzet = definisi SAMA dengan /api/admin/dashboard/statistik: total
 * pesanan yang sudah lewat MENUNGGU_PEMBAYARAN dan bukan DIBATALKAN.
 */
const WIB_OFFSET_MS = 7 * 60 * 60 * 1000;

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }

  // Jendela "hari ini" mengikuti hari WIB (UTC+7) — sama dengan yang
  // dirasakan pembaca laporan, bukan batas hari UTC.
  const sekarangWib = new Date(Date.now() + WIB_OFFSET_MS);
  const awalHariIniUtc = Date.UTC(
    sekarangWib.getUTCFullYear(),
    sekarangWib.getUTCMonth(),
    sekarangWib.getUTCDate()
  );
  const awal = new Date(awalHariIniUtc - WIB_OFFSET_MS);

  const [pesananBaru, omzetHariIni, pembayaranNunggu, komplainAktif, customerBaru] =
    await Promise.all([
      prisma.pesanan.count({ where: { tglPesan: { gte: awal } } }),
      prisma.pesanan.aggregate({
        _sum: { totalAkhir: true },
        where: {
          tglPesan: { gte: awal },
          statusPesanan: { notIn: [StatusPesanan.MENUNGGU_PEMBAYARAN, StatusPesanan.DIBATALKAN] },
        },
      }),
      prisma.pembayaran.count({ where: { status: StatusPembayaran.MENUNGGU_VERIFIKASI } }),
      prisma.komplain.count({ where: { status: { not: StatusKomplain.SELESAI } } }),
      // Customer baru hari ini — pakai tglRegistrasi (bukan createdAt,
      // field di schema memang begitu).
      prisma.customer.count({ where: { tglRegistrasi: { gte: awal } } }),
    ]);

  const tanggal = sekarangWib.toISOString().slice(0, 10);
  const omzet = Number(omzetHariIni._sum.totalAkhir ?? 0);

  const pesan =
    `📊 Laporan Harian Jastip China — ${tanggal}\n\n` +
    `Pesanan masuk: ${pesananBaru}\n` +
    `Omzet terkonfirmasi: ${rupiah(omzet)}\n` +
    `Pembayaran menunggu verifikasi: ${pembayaranNunggu}\n` +
    `Komplain belum selesai: ${komplainAktif}\n` +
    `Customer baru: ${customerBaru}\n\n` +
    (pembayaranNunggu > 0 || komplainAktif > 0
      ? "⚠️ Ada yang perlu ditindaklanjuti di dashboard."
      : "✅ Semua beres hari ini.");

  return NextResponse.json({
    tanggal,
    pesananBaru,
    omzet,
    pembayaranMenungguVerifikasi: pembayaranNunggu,
    komplainBelumSelesai: komplainAktif,
    customerBaru,
    pesan,
  });
}
