// letak: src/app/api/admin/kategori/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parseBody, kategoriCreateSchema } from "@/lib/validasi";
import { wajibAdmin } from "@/lib/auth";
import { tanganiErrorAuth } from "@/lib/http-error";

export async function POST(req: NextRequest) {
  try {
    await wajibAdmin(req); // tidak dibatasi role — OWNER & STAFF sama-sama boleh kelola kategori

    const parsed = await parseBody(req, kategoriCreateSchema);
    if ("error" in parsed) return parsed.error;

    const kategori = await prisma.kategori.create({ data: parsed.data });
    return NextResponse.json({ message: "Kategori dibuat", kategori }, { status: 201 });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}