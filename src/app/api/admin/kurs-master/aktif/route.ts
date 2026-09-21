// letak: src/app/api/admin/kurs-master/aktif/route.ts
import { NextRequest, NextResponse } from "next/server";
import { wajibAdmin } from "@/lib/auth";
import { tanganiErrorAuth, tanganiAppError } from "@/lib/http-error";
import { ambilKursAktif } from "@/lib/kurs-master";

export async function GET(req: NextRequest) {
  try {
    await wajibAdmin(req);
    const kurs = await ambilKursAktif();
    return NextResponse.json({ kurs });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    const resApp = tanganiAppError(err);
    if (resApp) return resApp;
    throw err;
  }
}