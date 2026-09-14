// letak: src/app/api/admin/dashboard/statistik/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  StatusPembayaran,
  PermintaanPoStatus,
  StatusKomplain,
  ProdukStatus,
  StatusPesanan,
} from "@prisma/client";
import { prisma } from "@/lib/db";
import { wajibAdmin } from "@/lib/auth";
import { tanganiErrorAuth } from "@/lib/http-error";

export async function GET(req: NextRequest) {
  try {
    await wajibAdmin(req);

    const [pesananPerStatus, pembayaranMenungguVerifikasi, poMenungguReview, komplainBelumSelesai, produkAktif, omzet] =
      await Promise.all([
        prisma.pesanan.groupBy({ by: ["statusPesanan"], _count: true }),
        prisma.pembayaran.count({ where: { status: StatusPembayaran.MENUNGGU_VERIFIKASI } }),
        prisma.permintaanPo.count({ where: { status: PermintaanPoStatus.MENUNGGU_REVIEW } }),
        prisma.komplain.count({ where: { status: { not: StatusKomplain.SELESAI } } }),
        prisma.produk.count({ where: { status: ProdukStatus.AKTIF } }),
        // Omzet = total pesanan yang pembayarannya sudah confirmed jalan (bukan
        // yang masih nunggu bayar atau sudah batal) -- proxy sederhana, bukan
        // laporan keuangan resmi.
        prisma.pesanan.aggregate({
          _sum: { totalAkhir: true },
          where: {
            statusPesanan: { notIn: [StatusPesanan.MENUNGGU_PEMBAYARAN, StatusPesanan.DIBATALKAN] },
          },
        }),
      ]);

    return NextResponse.json({
      pesananPerStatus: pesananPerStatus.map(
        (p: { statusPesanan: StatusPesanan; _count: number }) => ({
          status: p.statusPesanan,
          jumlah: p._count,
        })
      ),
      perluPerhatian: {
        pembayaranMenungguVerifikasi,
        poMenungguReview,
        komplainBelumSelesai,
      },
      produkAktif,
      omzet: Number(omzet._sum.totalAkhir ?? 0),
    });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}