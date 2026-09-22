// letak: src/app/api/rekening/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Publik (tanpa login) — dibaca halaman pembayaran customer. Cuma yang
// aktif yang dikembalikan; tanpa info sensitif apa pun selain yang memang
// harus dilihat customer untuk transfer.
export async function GET() {
  const items = await prisma.rekeningBank.findMany({
    where: { aktif: true },
    orderBy: { dibuatPada: "asc" },
  });

  return NextResponse.json({ items });
}
