// letak: src/app/api/pesanan/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parseBody, checkoutSchema } from "@/lib/validasi";
import { wajibCustomer } from "@/lib/auth";
import { tanganiErrorAuth, tanganiAppError } from "@/lib/http-error";
import { prosesCheckout } from "@/lib/pesanan";

export async function POST(req: NextRequest) {
  try {
    const user = await wajibCustomer(req);

    const parsed = await parseBody(req, checkoutSchema);
    if ("error" in parsed) return parsed.error;

    const { pesanan, pembayaran } = await prosesCheckout(user.sub, parsed.data);

    return NextResponse.json(
      { message: "Checkout berhasil", pesanan, pembayaran },
      { status: 201 }
    );
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

    const pesanan = await prisma.pesanan.findMany({
      where: { customerId: user.sub },
      include: { item: true, pembayaran: { orderBy: { id: "desc" }, take: 1 } },
      orderBy: { tglPesan: "desc" },
    });

    return NextResponse.json({ items: pesanan });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}