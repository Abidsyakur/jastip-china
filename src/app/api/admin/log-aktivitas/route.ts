// letak: src/app/api/admin/log-aktivitas/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parseQuery, logAktivitasQuerySchema } from "@/lib/validasi";
import { wajibAdmin } from "@/lib/auth";
import { tanganiErrorAuth } from "@/lib/http-error";

export async function GET(req: NextRequest) {
  try {
    await wajibAdmin(req);

    const parsed = parseQuery(req.nextUrl.searchParams, logAktivitasQuerySchema);
    if ("error" in parsed) return parsed.error;
    const { page = 1, limit = 20, aksi, adminId } = parsed.data;

    const where = {
      ...(aksi && { aksi: { contains: aksi, mode: "insensitive" as const } }),
      ...(adminId && { adminId }),
    };

    const [items, total] = await Promise.all([
      prisma.logAktivitas.findMany({
        where,
        include: { admin: { select: { nama: true, email: true } } },
        orderBy: { waktu: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.logAktivitas.count({ where }),
    ]);

    return NextResponse.json({ items, total, page, limit });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}
