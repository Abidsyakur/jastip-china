// letak: src/app/api/admin/rekening/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parseBody, buatRekeningSchema } from "@/lib/validasi";
import { wajibAdmin } from "@/lib/auth";
import { tanganiErrorAuth } from "@/lib/http-error";

export async function GET(req: NextRequest) {
  try {
    await wajibAdmin(req);

    // Versi admin: SEMUA rekening termasuk yang nonaktif (yang disembunyikan
    // dari customer), supaya bisa dikelola/dinyalakan lagi.
    const items = await prisma.rekeningBank.findMany({ orderBy: { dibuatPada: "asc" } });

    return NextResponse.json({ items });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}

export async function POST(req: NextRequest) {
  try {
    await wajibAdmin(req);

    const parsed = await parseBody(req, buatRekeningSchema);
    if ("error" in parsed) return parsed.error;

    const rekening = await prisma.rekeningBank.create({ data: parsed.data });

    return NextResponse.json({ message: "Rekening ditambahkan", rekening }, { status: 201 });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}
