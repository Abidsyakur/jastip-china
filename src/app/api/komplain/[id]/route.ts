// letak: src/app/api/komplain/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { wajibCustomer } from "@/lib/auth";
import { tanganiErrorAuth } from "@/lib/http-error";

interface Konteks {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: Konteks) {
  try {
    const user = await wajibCustomer(req);
    const { id } = await params;

    const komplain = await prisma.komplain.findUnique({
      where: { id },
      include: {
        pesananItem: { include: { pesanan: { select: { customerId: true, noInvoice: true } } } },
        log: { orderBy: { waktu: "asc" } },
      },
    });

    // "Tidak ditemukan" untuk DUA kasus (tidak ada ATAU milik customer lain).
    if (!komplain || komplain.pesananItem.pesanan.customerId !== user.sub) {
      return NextResponse.json({ error: "Komplain tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ komplain });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}