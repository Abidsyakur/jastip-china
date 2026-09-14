// letak: src/app/api/admin/pesanan/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { wajibAdmin } from "@/lib/auth";
import { tanganiErrorAuth } from "@/lib/http-error";

interface Konteks {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: Konteks) {
  try {
    await wajibAdmin(req);
    const { id } = await params;

    const pesanan = await prisma.pesanan.findUnique({
      where: { id },
      include: {
        customer: { select: { id: true, nama: true, noWa: true, email: true } },
        item: true,
        pembayaran: { orderBy: { id: "desc" } },
        statusLog: { orderBy: { waktu: "asc" } },
        alamat: true,
        pengiriman: true,
      },
    });

    if (!pesanan) {
      return NextResponse.json({ error: "Pesanan tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ pesanan });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}