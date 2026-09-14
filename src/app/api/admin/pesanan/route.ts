// letak: src/app/api/admin/pesanan/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parseQuery, pesananAdminQuerySchema } from "@/lib/validasi";
import { wajibAdmin } from "@/lib/auth";
import { tanganiErrorAuth } from "@/lib/http-error";

export async function GET(req: NextRequest) {
  try {
    await wajibAdmin(req);

    const parsed = parseQuery(req.nextUrl.searchParams, pesananAdminQuerySchema);
    if ("error" in parsed) return parsed.error;
    const { page = 1, limit = 20, status } = parsed.data;

    const where = status ? { statusPesanan: status } : {};

    const [items, total] = await Promise.all([
      prisma.pesanan.findMany({
        where,
        include: { pembayaran: { orderBy: { id: "desc" }, take: 1 } },
        orderBy: { tglPesan: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.pesanan.count({ where }),
    ]);

    return NextResponse.json({ items, total, page, limit });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}