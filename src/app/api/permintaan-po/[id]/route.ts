// letak: src/app/api/permintaan-po/[id]/route.ts
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

    const po = await prisma.permintaanPo.findUnique({ where: { id } });

    // "Tidak ditemukan" untuk DUA kasus (tidak ada ATAU milik customer lain).
    if (!po || po.customerId !== user.sub) {
      return NextResponse.json({ error: "Permintaan PO tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ po });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}