// letak: src/app/api/produk/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ProdukStatus } from "@prisma/client";
import { prisma } from "@/lib/db";

interface Konteks {
  // Next.js 15: params jadi Promise, bukan objek langsung
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: Konteks) {
  const { id } = await params;

  const produk = await prisma.produk.findUnique({
    where: { id },
    include: { gambar: { orderBy: { urutan: "asc" } }, varian: true, kategori: true },
  });

  // Produk NONAKTIF diperlakukan sama seperti tidak ada sama sekali dari sudut
  // pandang publik — tidak ada endpoint publik yang boleh mengonfirmasi
  // keberadaan produk yang sudah dinonaktifkan admin.
  if (!produk || produk.status !== ProdukStatus.AKTIF) {
    return NextResponse.json({ error: "Produk tidak ditemukan" }, { status: 404 });
  }

  return NextResponse.json({ produk });
}