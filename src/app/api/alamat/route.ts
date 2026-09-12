// letak: src/app/api/alamat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parseBody, alamatSchema } from "@/lib/validasi";
import { wajibCustomer } from "@/lib/auth";
import { tanganiErrorAuth } from "@/lib/http-error";

export async function GET(req: NextRequest) {
  try {
    const user = await wajibCustomer(req);

    const alamat = await prisma.alamat.findMany({
      where: { customerId: user.sub },
      orderBy: { id: "desc" },
    });

    return NextResponse.json({ items: alamat });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await wajibCustomer(req);

    const parsed = await parseBody(req, alamatSchema);
    if ("error" in parsed) return parsed.error;

    const alamat = await prisma.alamat.create({
      data: { ...parsed.data, customerId: user.sub },
    });

    return NextResponse.json({ message: "Alamat ditambahkan", alamat }, { status: 201 });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}