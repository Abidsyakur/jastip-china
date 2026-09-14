// letak: src/app/api/notifikasi/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { wajibCustomer } from "@/lib/auth";
import { tanganiErrorAuth } from "@/lib/http-error";

export async function GET(req: NextRequest) {
  try {
    const user = await wajibCustomer(req);

    const [items, jumlahBelumDibaca] = await Promise.all([
      prisma.notifikasi.findMany({
        where: { customerId: user.sub },
        orderBy: { tglKirim: "desc" },
        take: 50,
      }),
      prisma.notifikasi.count({ where: { customerId: user.sub, statusBaca: false } }),
    ]);

    return NextResponse.json({ items, jumlahBelumDibaca });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}