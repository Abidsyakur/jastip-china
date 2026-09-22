// letak: src/app/api/admin/komplain/route.ts
import { NextRequest, NextResponse } from "next/server";
import { StatusKomplain } from "@prisma/client";
import { prisma } from "@/lib/db";
import { parseQuery, komplainAdminQuerySchema } from "@/lib/validasi";
import { wajibAdmin } from "@/lib/auth";
import { tanganiErrorAuth } from "@/lib/http-error";

export async function GET(req: NextRequest) {
  try {
    await wajibAdmin(req);

    const parsed = parseQuery(req.nextUrl.searchParams, komplainAdminQuerySchema);
    if ("error" in parsed) return parsed.error;
    const { page = 1, limit = 20, status } = parsed.data;

    // Default: yang belum SELESAI (perlu perhatian admin), bukan semua status
    const where = status ? { status } : { status: { not: StatusKomplain.SELESAI } };

    const [items, total] = await Promise.all([
      prisma.komplain.findMany({
        where,
        // Panel tindak lanjut butuh: nama item + invoice + kontak customer +
        // riwayat log — diambil sekaligus supaya tidak request berlapis.
        include: {
          pesananItem: {
            include: {
              pesanan: {
                select: {
                  id: true,
                  noInvoice: true,
                  customer: { select: { nama: true, noWa: true } },
                },
              },
            },
          },
          log: { include: { admin: { select: { nama: true } } }, orderBy: { waktu: "asc" } },
        },
        orderBy: { id: "asc" }, // FIFO
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.komplain.count({ where }),
    ]);

    return NextResponse.json({ items, total, page, limit });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}