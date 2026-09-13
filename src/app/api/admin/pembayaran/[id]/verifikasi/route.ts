// letak: src/app/api/admin/pembayaran/[id]/verifikasi/route.ts
import { NextRequest, NextResponse } from "next/server";
import { parseBody, verifikasiPembayaranSchema } from "@/lib/validasi";
import { wajibAdmin } from "@/lib/auth";
import { tanganiErrorAuth, tanganiAppError } from "@/lib/http-error";
import { verifikasiPembayaran } from "@/lib/pembayaran";

interface Konteks {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: Konteks) {
  try {
    const admin = await wajibAdmin(req); // OWNER & STAFF sama-sama boleh verifikasi pembayaran
    const { id } = await params;

    const parsed = await parseBody(req, verifikasiPembayaranSchema);
    if ("error" in parsed) return parsed.error;

    await verifikasiPembayaran(admin.sub, id, parsed.data);

    return NextResponse.json({ message: "Verifikasi pembayaran berhasil diproses" });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    const resApp = tanganiAppError(err);
    if (resApp) return resApp;
    throw err;
  }
}