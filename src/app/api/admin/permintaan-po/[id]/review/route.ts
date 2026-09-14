// letak: src/app/api/admin/permintaan-po/[id]/review/route.ts
import { NextRequest, NextResponse } from "next/server";
import { parseBody, reviewPoSchema } from "@/lib/validasi";
import { wajibAdmin } from "@/lib/auth";
import { tanganiErrorAuth, tanganiAppError } from "@/lib/http-error";
import { reviewPo } from "@/lib/permintaan-po";

interface Konteks {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: Konteks) {
  try {
    const admin = await wajibAdmin(req); // OWNER & STAFF sama-sama boleh review PO
    const { id } = await params;

    const parsed = await parseBody(req, reviewPoSchema);
    if ("error" in parsed) return parsed.error;

    await reviewPo(admin.sub, id, parsed.data);

    return NextResponse.json({ message: "Review PO berhasil disimpan" });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    const resApp = tanganiAppError(err);
    if (resApp) return resApp;
    throw err;
  }
}