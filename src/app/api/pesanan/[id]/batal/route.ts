// letak: src/app/api/pesanan/[id]/batal/route.ts
import { NextRequest, NextResponse } from "next/server";
import { wajibCustomer } from "@/lib/auth";
import { tanganiErrorAuth, tanganiAppError } from "@/lib/http-error";
import { batalkanPesananCustomer } from "@/lib/pesanan";

interface Konteks {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, { params }: Konteks) {
  try {
    const user = await wajibCustomer(req);
    const { id } = await params;

    await batalkanPesananCustomer(user.sub, id);

    return NextResponse.json({ message: "Pesanan dibatalkan" });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    const resApp = tanganiAppError(err);
    if (resApp) return resApp;
    throw err;
  }
}
