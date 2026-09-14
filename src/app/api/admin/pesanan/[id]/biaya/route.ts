// letak: src/app/api/admin/pesanan/[id]/biaya/route.ts
import { NextRequest, NextResponse } from "next/server";
import { parseBody, updateBiayaSchema } from "@/lib/validasi";
import { wajibAdmin } from "@/lib/auth";
import { tanganiErrorAuth, tanganiAppError } from "@/lib/http-error";
import { updateBiayaPesanan } from "@/lib/pesanan";

interface Konteks {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: Konteks) {
  try {
    await wajibAdmin(req); // OWNER & STAFF sama-sama boleh isi biaya
    const { id } = await params;

    const parsed = await parseBody(req, updateBiayaSchema);
    if ("error" in parsed) return parsed.error;

    const pesanan = await updateBiayaPesanan(id, parsed.data);

    return NextResponse.json({ message: "Biaya pesanan diperbarui", pesanan });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    const resApp = tanganiAppError(err);
    if (resApp) return resApp;
    throw err;
  }
}