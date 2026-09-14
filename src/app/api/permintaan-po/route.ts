// letak: src/app/api/permintaan-po/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parseBody, ajukanPoSchema } from "@/lib/validasi";
import { wajibCustomer } from "@/lib/auth";
import { tanganiErrorAuth } from "@/lib/http-error";
import { ajukanPo } from "@/lib/permintaan-po";

export async function POST(req: NextRequest) {
  try {
    const user = await wajibCustomer(req);

    const parsed = await parseBody(req, ajukanPoSchema);
    if ("error" in parsed) return parsed.error;

    const po = await ajukanPo(user.sub, parsed.data);

    return NextResponse.json({ message: "Permintaan PO diajukan, menunggu review admin", po }, { status: 201 });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = await wajibCustomer(req);

    const items = await prisma.permintaanPo.findMany({
      where: { customerId: user.sub },
      orderBy: { tglSubmit: "desc" },
    });

    return NextResponse.json({ items });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}