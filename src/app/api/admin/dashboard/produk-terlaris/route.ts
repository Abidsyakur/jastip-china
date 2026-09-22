// letak: src/app/api/admin/dashboard/produk-terlaris/route.ts
import { NextRequest, NextResponse } from "next/server";
import { StatusPesanan } from "@prisma/client";
import { prisma } from "@/lib/db";
import { parseQuery, produkTerlarisQuerySchema } from "@/lib/validasi";
import { wajibAdmin } from "@/lib/auth";
import { tanganiErrorAuth } from "@/lib/http-error";

export async function GET(req: NextRequest) {
  try {
    await wajibAdmin(req);

    const parsed = parseQuery(req.nextUrl.searchParams, produkTerlarisQuerySchema);
    if ("error" in parsed) return parsed.error;

    // "Terjual" = item di pesanan yang pembayarannya sudah jalan (bukan yang
    // masih nunggu bayar / sudah batal) — definisi yang sama dengan `omzet`
    // di /api/admin/dashboard/statistik. Item CUSTOM_PO (produkId null)
    // tidak ikut karena bukan produk katalog.
    const agregat = await prisma.pesananItem.groupBy({
      by: ["produkId"],
      where: {
        produkId: { not: null },
        pesanan: {
          statusPesanan: { notIn: [StatusPesanan.MENUNGGU_PEMBAYARAN, StatusPesanan.DIBATALKAN] },
        },
      },
      _sum: { jumlah: true },
      orderBy: { _sum: { jumlah: "desc" } },
      take: parsed.data.limit,
    });

    const ids = agregat.map((a) => a.produkId as string);
    const produk = await prisma.produk.findMany({
      where: { id: { in: ids } },
      select: {
        id: true,
        namaProduk: true,
        hargaJualIdr: true,
        kategori: { select: { namaKategori: true } },
      },
    });
    const peta = new Map(produk.map((p) => [p.id, p]));

    return NextResponse.json({
      items: agregat.map((a) => {
        const p = peta.get(a.produkId as string);
        return {
          produkId: a.produkId,
          namaProduk: p?.namaProduk ?? "(produk sudah tidak ada)",
          kategori: p?.kategori.namaKategori ?? "-",
          hargaJualIdr: p ? Number(p.hargaJualIdr) : 0,
          totalTerjual: a._sum.jumlah ?? 0,
        };
      }),
    });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}
