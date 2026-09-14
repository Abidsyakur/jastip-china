// letak: src/app/api/admin/komplain/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { parseBody, tindakLanjutKomplainSchema } from "@/lib/validasi";
import { wajibAdmin } from "@/lib/auth";
import { tanganiErrorAuth, tanganiAppError } from "@/lib/http-error";
import { tindakLanjutKomplain } from "@/lib/komplain";

interface Konteks {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: Konteks) {
  try {
    const admin = await wajibAdmin(req); // OWNER & STAFF sama-sama boleh tindak lanjut komplain
    const { id } = await params;

    const parsed = await parseBody(req, tindakLanjutKomplainSchema);
    if ("error" in parsed) return parsed.error;

    await tindakLanjutKomplain(admin.sub, id, parsed.data);

    return NextResponse.json({ message: "Tindak lanjut komplain tersimpan" });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    const resApp = tanganiAppError(err);
    if (resApp) return resApp;
    throw err;
  }
}