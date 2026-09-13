// letak: src/app/api/admin/pembayaran/route.ts
import { NextRequest, NextResponse } from "next/server";
import { StatusPembayaran } from "@prisma/client";
import { prisma } from "@/lib/db";
import { parseQuery, pembayaranAdminQuerySchema } from "@/lib/validasi";
import { wajibAdmin } from "@/lib/auth";
import { tanganiErrorAuth } from "@/lib/http-error";

export async function GET(req: NextRequest) {
  try {
    await wajibAdmin(req);

    const parsed = parseQuery(req.nextUrl.searchParams, pembayaranAdminQuerySchema);
    if ("error" in parsed) return parsed.error;
    const { page = 1, limit = 20, status } = parsed.data;

    // Default: tampilkan yang PERLU ditinjau admin, bukan semua status —
    // kalau admin mau lihat riwayat lengkap, filter status eksplisit di query.
    const where = { status: status ?? StatusPembayaran.MENUNGGU_VERIFIKASI };

    const [items, total] = await Promise.all([
      prisma.pembayaran.findMany({
        where,
        include: { pesanan: { select: { id: true, noInvoice: true, customerId: true, totalAkhir: true } } },
        orderBy: { id: "asc" }, // FIFO — yang nunggu paling lama diproses duluan
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.pembayaran.count({ where }),
    ]);

    return NextResponse.json({ items, total, page, limit });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}