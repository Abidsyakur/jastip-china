// letak: src/app/api/admin/produk/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Prisma, ProdukStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import { parseBody, produkUpdateSchema } from "@/lib/validasi";
import { wajibAdmin } from "@/lib/auth";
import { tanganiErrorAuth } from "@/lib/http-error";
import { catatLogAktivitas } from "@/lib/log-aktivitas";

interface Konteks {
  // Next.js 15: params jadi Promise, bukan objek langsung — wajib di-await
  // di dalam handler, tidak bisa dipakai langsung dari destructuring.
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: Konteks) {
  try {
    await wajibAdmin(req);
    const { id } = await params;

    const produk = await prisma.produk.findUnique({
      where: { id },
      include: { gambar: { orderBy: { urutan: "asc" } }, varian: true, kategori: true },
    });
    if (!produk) {
      return NextResponse.json({ error: "Produk tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ produk });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}

export async function PATCH(req: NextRequest, { params }: Konteks) {
  try {
    const admin = await wajibAdmin(req); // OWNER & STAFF sama-sama boleh edit produk
    const { id } = await params;

    const parsed = await parseBody(req, produkUpdateSchema);
    if ("error" in parsed) return parsed.error;
    const data = parsed.data;

    const produk = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const diupdate = await tx.produk.update({
        where: { id },
        data: {
          ...(data.kategoriId !== undefined && { kategoriId: data.kategoriId }),
          ...(data.namaProduk !== undefined && { namaProduk: data.namaProduk }),
          ...(data.deskripsi !== undefined && { deskripsi: data.deskripsi }),
          ...(data.hargaAsalRmb !== undefined && { hargaAsalRmb: data.hargaAsalRmb }),
          ...(data.kurs !== undefined && { kurs: data.kurs }),
          ...(data.hargaJualIdr !== undefined && { hargaJualIdr: data.hargaJualIdr }),
          ...(data.beratGram !== undefined && { beratGram: data.beratGram }),
          ...(data.linkSumber !== undefined && { linkSumber: data.linkSumber }),
          ...(data.stok !== undefined && { stok: data.stok }),
          ...(data.status !== undefined && { status: data.status }),
        },
      });

      // gambarUrls/varian kalau dikirim berarti REPLACE total, bukan patch per-item.
      // Trade-off yang diterima untuk MVP: kalau ada KeranjangItem yang refer
      // salah satu varian lama, produkVarianId-nya otomatis jadi NULL
      // (onDelete: SetNull di schema) — bukan error, tapi customer perlu pilih
      // ulang variannya saat checkout.
      if (data.gambarUrls) {
        await tx.produkGambar.deleteMany({ where: { produkId: id } });
        await tx.produkGambar.createMany({
          data: data.gambarUrls.map((url, i) => ({ produkId: id, urlGambar: url, urutan: i })),
        });
      }

      if (data.varian) {
        await tx.produkVarian.deleteMany({ where: { produkId: id } });
        await tx.produkVarian.createMany({
          data: (data.varian ?? []).map((v) => ({
            produkId: id,
            namaVarian: v.namaVarian,
            stok: v.stok,
            hargaTambahan: v.hargaTambahan,
          })),
        });
      }

      await catatLogAktivitas(
        tx,
        admin.sub,
        "UBAH_PRODUK",
        id,
        `Produk "${diupdate.namaProduk}" diperbarui`
      );

      return diupdate;
    });

    return NextResponse.json({ message: "Produk berhasil diperbarui", produk });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      return NextResponse.json({ error: "Produk tidak ditemukan" }, { status: 404 });
    }
    throw err;
  }
}

/**
 * Soft delete — set status NONAKTIF, BUKAN prisma.produk.delete() beneran.
 * Alasan (keputusan di tahap modul ini): produk yang sudah pernah dipesan
 * harus tetap ada untuk riwayat invoice (PesananItem sudah snapshot harga,
 * tapi tetap referensi produkId). Hard delete juga akan ditolak Postgres
 * lewat FK constraint begitu produk punya riwayat pesanan.
 */
export async function DELETE(req: NextRequest, { params }: Konteks) {
  try {
    const admin = await wajibAdmin(req); // OWNER & STAFF sama-sama boleh nonaktifkan produk
    const { id } = await params;

    const produk = await prisma.produk.findUnique({ where: { id } });
    if (!produk) {
      return NextResponse.json({ error: "Produk tidak ditemukan" }, { status: 404 });
    }

    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      await tx.produk.update({ where: { id }, data: { status: ProdukStatus.NONAKTIF } });
      await catatLogAktivitas(
        tx,
        admin.sub,
        "NONAKTIFKAN_PRODUK",
        id,
        `Produk "${produk.namaProduk}" dinonaktifkan`
      );
    });

    return NextResponse.json({ message: "Produk dinonaktifkan" });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}