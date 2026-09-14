// letak: src/app/api/admin/pesanan/[id]/pengiriman/route.ts
import { NextRequest, NextResponse } from "next/server";
import { parseBody, updatePengirimanSchema } from "@/lib/validasi";
import { wajibAdmin } from "@/lib/auth";
import { tanganiErrorAuth, tanganiAppError } from "@/lib/http-error";
import { updatePengiriman } from "@/lib/pesanan";

interface Konteks {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: Konteks) {
  try {
    await wajibAdmin(req); // OWNER & STAFF sama-sama boleh isi info pengiriman
    const { id } = await params;

    const parsed = await parseBody(req, updatePengirimanSchema);
    if ("error" in parsed) return parsed.error;

    const pengiriman = await updatePengiriman(id, parsed.data);

    return NextResponse.json({ message: "Info pengiriman diperbarui", pengiriman });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    const resApp = tanganiAppError(err);
    if (resApp) return resApp;
    throw err;
  }
}