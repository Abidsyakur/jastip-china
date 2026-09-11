// letak: src/app/api/produk/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ProdukStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import { parseQuery, produkQuerySchema } from "@/lib/validasi";

export async function GET(req: NextRequest) {
  const parsed = parseQuery(req.nextUrl.searchParams, produkQuerySchema);
  if ("error" in parsed) return parsed.error;
  const { page = 1, limit = 20, kategoriId, cari, sort } = parsed.data;

  const where = {
    status: ProdukStatus.AKTIF, // publik cuma boleh lihat produk aktif, beda dari admin
    ...(kategoriId && { kategoriId }),
    ...(cari && { namaProduk: { contains: cari, mode: "insensitive" as const } }),
  };

  const orderBy =
    sort === "termurah"
      ? { hargaJualIdr: "asc" as const }
      : sort === "termahal"
        ? { hargaJualIdr: "desc" as const }
        : { dibuatPada: "desc" as const };

  const [items, total] = await Promise.all([
    prisma.produk.findMany({
      where,
      include: { gambar: { orderBy: { urutan: "asc" } }, varian: true, kategori: true },
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.produk.count({ where }),
  ]);

  return NextResponse.json({ items, total, page, limit });
}