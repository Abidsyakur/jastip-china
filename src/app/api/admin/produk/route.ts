// letak: src/app/api/admin/produk/route.ts
import { NextRequest, NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { parseBody, parseQuery, produkCreateSchema, produkAdminQuerySchema } from "@/lib/validasi";
import { wajibAdmin } from "@/lib/auth";
import { tanganiErrorAuth, tanganiAppError } from "@/lib/http-error";
import { catatLogAktivitas } from "@/lib/log-aktivitas";
import { tentukanKurs, tentukanHargaJualIdr } from "@/lib/produk";

export async function POST(req: NextRequest) {
  try {
    const admin = await wajibAdmin(req); // OWNER & STAFF sama-sama boleh tambah produk

    const parsed = await parseBody(req, produkCreateSchema);
    if ("error" in parsed) return parsed.error;
    const data = parsed.data;

    const kurs = await tentukanKurs(data.kurs);
    const hargaJualIdr = tentukanHargaJualIdr(data.hargaAsalRmb, kurs, data.hargaJualIdr);

    // Create produk + gambar + varian dalam satu transaksi, sekalian catat
    // LogAktivitas — semua atomik, tidak ada yang lolos tanpa jejak.
    const produk = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const dibuat = await tx.produk.create({
        data: {
          kategoriId: data.kategoriId,
          adminId: admin.sub,
          namaProduk: data.namaProduk,
          deskripsi: data.deskripsi,
          hargaAsalRmb: data.hargaAsalRmb,
          kurs,
          hargaJualIdr,
          beratGram: data.beratGram,
          linkSumber: data.linkSumber,
          stok: data.stok,
          status: data.status,
          gambar: {
            create: data.gambarUrls.map((url, i) => ({ urlGambar: url, urutan: i })),
          },
          varian: {
            // "?? []" murni jaga-jaga tipe (Zod .default([]) di beberapa versi
            // ke-infer optional lewat TS) — runtime selalu array karena default Zod.
            create: (data.varian ?? []).map((v) => ({
              namaVarian: v.namaVarian,
              stok: v.stok,
              hargaTambahan: v.hargaTambahan,
            })),
          },
        },
        include: { gambar: true, varian: true },
      });

      await catatLogAktivitas(tx, admin.sub, "TAMBAH_PRODUK", dibuat.id, `Produk "${dibuat.namaProduk}" dibuat`);

      return dibuat;
    });

    return NextResponse.json({ message: "Produk berhasil dibuat", produk }, { status: 201 });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    const resApp = tanganiAppError(err);
    if (resApp) return resApp;
    throw err;
  }
}

export async function GET(req: NextRequest) {
  try {
    await wajibAdmin(req); // admin bisa lihat semua status, tidak cuma AKTIF

    const parsed = parseQuery(req.nextUrl.searchParams, produkAdminQuerySchema);
    if ("error" in parsed) return parsed.error;
    const { page = 1, limit = 20, kategoriId, cari, sort, status } = parsed.data;

    const where = {
      ...(kategoriId && { kategoriId }),
      ...(status && { status }),
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
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}