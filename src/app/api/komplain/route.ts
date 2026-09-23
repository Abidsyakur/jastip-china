// letak: src/app/api/komplain/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parseBody, ajukanKomplainSchema } from "@/lib/validasi";
import { wajibCustomer } from "@/lib/auth";
import { tanganiErrorAuth, tanganiAppError } from "@/lib/http-error";
import { ajukanKomplain } from "@/lib/komplain";

export async function POST(req: NextRequest) {
  try {
    const user = await wajibCustomer(req);

    const parsed = await parseBody(req, ajukanKomplainSchema);
    if ("error" in parsed) return parsed.error;

    const komplain = await ajukanKomplain(user.sub, parsed.data);

    return NextResponse.json({ message: "Komplain diajukan", komplain }, { status: 201 });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    const resApp = tanganiAppError(err);
    if (resApp) return resApp;
    throw err;
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = await wajibCustomer(req);

    const items = await prisma.komplain.findMany({
      where: { pesananItem: { pesanan: { customerId: user.sub } } },
      include: { 
        pesananItem: { 
          include: { 
            pesanan: { 
              select: { noInvoice: true } 
            } 
          } 
        } 
      },
      orderBy: { id: "desc" },
    });

    return NextResponse.json({ items });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}