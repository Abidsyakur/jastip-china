// letak: src/app/api/pesanan/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { wajibCustomer } from "@/lib/auth";
import { tanganiErrorAuth } from "@/lib/http-error";

interface Konteks {
  // Next.js 15: params jadi Promise, bukan objek langsung
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: Konteks) {
  try {
    const user = await wajibCustomer(req);
    const { id } = await params;

    const pesanan = await prisma.pesanan.findUnique({
      where: { id },
      include: {
        item: true,
        pembayaran: { orderBy: { id: "desc" } },
        statusLog: { orderBy: { waktu: "asc" } },
        alamat: true,
        pengiriman: true,
      },
    });

    // "Tidak ditemukan" untuk DUA kasus (tidak ada ATAU milik customer lain) —
    // endpoint ini tidak boleh bisa dipakai menebak-nebak ID pesanan orang lain.
    if (!pesanan || pesanan.customerId !== user.sub) {
      return NextResponse.json({ error: "Pesanan tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ pesanan });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}