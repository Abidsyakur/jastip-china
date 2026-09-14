// letak: src/app/api/admin/permintaan-po/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PermintaanPoStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import { parseQuery, permintaanPoAdminQuerySchema } from "@/lib/validasi";
import { wajibAdmin } from "@/lib/auth";
import { tanganiErrorAuth } from "@/lib/http-error";

export async function GET(req: NextRequest) {
  try {
    await wajibAdmin(req);

    const parsed = parseQuery(req.nextUrl.searchParams, permintaanPoAdminQuerySchema);
    if ("error" in parsed) return parsed.error;
    const { page = 1, limit = 20, status } = parsed.data;

    // Default: yang PERLU direview, bukan semua status
    const where = { status: status ?? PermintaanPoStatus.MENUNGGU_REVIEW };

    const [items, total] = await Promise.all([
      prisma.permintaanPo.findMany({
        where,
        orderBy: { tglSubmit: "asc" }, // FIFO
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.permintaanPo.count({ where }),
    ]);

    return NextResponse.json({ items, total, page, limit });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}