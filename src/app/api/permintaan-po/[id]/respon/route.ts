// letak: src/app/api/permintaan-po/[id]/respon/route.ts
import { NextRequest, NextResponse } from "next/server";
import { parseBody, responPenawaranSchema } from "@/lib/validasi";
import { wajibCustomer } from "@/lib/auth";
import { tanganiErrorAuth, tanganiAppError } from "@/lib/http-error";
import { responPenawaran } from "@/lib/permintaan-po";

interface Konteks {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: Konteks) {
  try {
    const user = await wajibCustomer(req);
    const { id } = await params;

    const parsed = await parseBody(req, responPenawaranSchema);
    if ("error" in parsed) return parsed.error;

    const hasil = await responPenawaran(user.sub, id, parsed.data);

    return NextResponse.json({
      message: hasil.dikonversiJadiPesanan
        ? "Penawaran disetujui, pesanan berhasil dibuat"
        : "Penawaran ditolak",
      ...hasil,
    });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    const resApp = tanganiAppError(err);
    if (resApp) return resApp;
    throw err;
  }
}