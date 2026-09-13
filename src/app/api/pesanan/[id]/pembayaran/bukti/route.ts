// letak: src/app/api/pesanan/[id]/pembayaran/bukti/route.ts
import { NextRequest, NextResponse } from "next/server";
import { parseBody, uploadBuktiSchema } from "@/lib/validasi";
import { wajibCustomer } from "@/lib/auth";
import { tanganiErrorAuth, tanganiAppError } from "@/lib/http-error";
import { uploadBuktiPembayaran } from "@/lib/pembayaran";

interface Konteks {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: Konteks) {
  try {
    const user = await wajibCustomer(req);
    const { id } = await params;

    const parsed = await parseBody(req, uploadBuktiSchema);
    if ("error" in parsed) return parsed.error;

    const pembayaran = await uploadBuktiPembayaran(user.sub, id, parsed.data);

    return NextResponse.json({ message: "Bukti transfer diupload, menunggu verifikasi admin", pembayaran });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    const resApp = tanganiAppError(err);
    if (resApp) return resApp;
    throw err;
  }
}