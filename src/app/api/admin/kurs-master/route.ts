// letak: src/app/api/admin/kurs-master/route.ts
import { NextRequest, NextResponse } from "next/server";
import { parseBody, buatKursMasterSchema } from "@/lib/validasi";
import { wajibAdmin } from "@/lib/auth";
import { tanganiErrorAuth } from "@/lib/http-error";
import { buatKursBaru, listRiwayatKurs } from "@/lib/kurs-master";

export async function GET(req: NextRequest) {
  try {
    await wajibAdmin(req);
    const items = await listRiwayatKurs();
    return NextResponse.json({ items });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await wajibAdmin(req); // OWNER & STAFF sama-sama boleh input kurs

    const parsed = await parseBody(req, buatKursMasterSchema);
    if ("error" in parsed) return parsed.error;

    // APPEND-ONLY -- ini selalu bikin baris BARU, bukan update baris lama.
    const kurs = await buatKursBaru(admin.sub, parsed.data.kursRmbIdr);

    return NextResponse.json({ message: "Kurs baru dicatat", kurs }, { status: 201 });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}