// letak: src/app/api/pesanan/[id]/pembayaran/route.ts
import { NextRequest, NextResponse } from "next/server";
import { parseBody, buatPembayaranSchema } from "@/lib/validasi";
import { wajibCustomer } from "@/lib/auth";
import { tanganiErrorAuth, tanganiAppError } from "@/lib/http-error";
import { buatPercobaanBayarBaru } from "@/lib/pembayaran";

interface Konteks {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, { params }: Konteks) {
  try {
    const user = await wajibCustomer(req);
    const { id } = await params;

    const parsed = await parseBody(req, buatPembayaranSchema);
    if ("error" in parsed) return parsed.error;

    const pembayaran = await buatPercobaanBayarBaru(user.sub, id, parsed.data.metode);

    return NextResponse.json({ message: "Percobaan pembayaran baru dibuat", pembayaran }, { status: 201 });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    const resApp = tanganiAppError(err);
    if (resApp) return resApp;
    throw err;
  }
}