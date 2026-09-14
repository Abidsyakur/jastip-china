// letak: src/app/api/admin/pesanan/[id]/status/route.ts
import { NextRequest, NextResponse } from "next/server";
import { parseBody, updateStatusPesananSchema } from "@/lib/validasi";
import { wajibAdmin } from "@/lib/auth";
import { tanganiErrorAuth, tanganiAppError } from "@/lib/http-error";
import { updateStatusPesanan } from "@/lib/pesanan";

interface Konteks {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: Konteks) {
  try {
    const admin = await wajibAdmin(req); // OWNER & STAFF sama-sama boleh ubah status
    const { id } = await params;

    const parsed = await parseBody(req, updateStatusPesananSchema);
    if ("error" in parsed) return parsed.error;

    await updateStatusPesanan(admin.sub, id, parsed.data);

    return NextResponse.json({ message: "Status pesanan diperbarui" });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    const resApp = tanganiAppError(err);
    if (resApp) return resApp;
    throw err;
  }
}