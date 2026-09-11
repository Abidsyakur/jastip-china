// letak: src/app/api/kategori/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const kategori = await prisma.kategori.findMany({
    orderBy: { namaKategori: "asc" },
  });
  return NextResponse.json({ items: kategori });
}