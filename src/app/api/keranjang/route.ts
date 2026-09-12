// letak: src/app/api/keranjang/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ProdukStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import { parseBody, tambahKeranjangSchema } from "@/lib/validasi";
import { wajibCustomer } from "@/lib/auth";
import { tanganiErrorAuth } from "@/lib/http-error";
import { getOrBuatKeranjang, hitungHargaItem } from "@/lib/keranjang";

export async function GET(req: NextRequest) {
  try {
    const user = await wajibCustomer(req);
    const keranjang = await getOrBuatKeranjang(user.sub);

    const items = await prisma.keranjangItem.findMany({
      where: { keranjangId: keranjang.id },
      include: {
        produk: { include: { gambar: { orderBy: { urutan: "asc" }, take: 1 } } },
        produkVarian: true,
      },
      orderBy: { id: "asc" },
    });

    // Harga dihitung di sini (bukan disimpan di KeranjangItem) — ini BUKAN
    // snapshot, sengaja selalu ambil harga TERBARU dari produk, supaya
    // customer lihat harga aktual sebelum checkout. Snapshot beneran baru
    // terjadi saat checkout (PesananItem), sesuai prinsip di README.
    const itemsDenganHarga = items.map((item: (typeof items)[number]) => {
      const { hargaSatuan, subtotal } = hitungHargaItem(
        item.produk.hargaJualIdr,
        item.produkVarian?.hargaTambahan,
        item.jumlah
      );
      return { ...item, hargaSatuan, subtotal };
    });

    const total = itemsDenganHarga.reduce(
      (sum: number, item: (typeof itemsDenganHarga)[number]) => sum + item.subtotal,
      0
    );

    return NextResponse.json({ items: itemsDenganHarga, total });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await wajibCustomer(req);

    const parsed = await parseBody(req, tambahKeranjangSchema);
    if ("error" in parsed) return parsed.error;
    const { produkId, produkVarianId, jumlah } = parsed.data;

    const produk = await prisma.produk.findUnique({
      where: { id: produkId },
      include: { varian: true },
    });
    if (!produk || produk.status !== ProdukStatus.AKTIF) {
      return NextResponse.json({ error: "Produk tidak ditemukan" }, { status: 404 });
    }

    // Kalau produk punya varian, WAJIB pilih salah satu — konsisten dengan
    // keputusan arsitektur "ProdukVarian.stok sumber kebenaran kalau ada varian".
    let varian = null;
    if (produkVarianId) {
      varian = produk.varian.find((v: (typeof produk.varian)[number]) => v.id === produkVarianId) ?? null;
      if (!varian) {
        return NextResponse.json({ error: "Varian tidak ditemukan untuk produk ini" }, { status: 404 });
      }
    } else if (produk.varian.length > 0) {
      return NextResponse.json({ error: "Produk ini punya varian, pilih salah satu dulu" }, { status: 400 });
    }

    const stokTersedia = varian ? varian.stok : produk.stok;

    const keranjang = await getOrBuatKeranjang(user.sub);

    // Kalau kombinasi produk+varian yang sama sudah ada di keranjang, jumlahnya
    // digabung (bukan bikin baris duplikat). Catatan: ini soft-check, bukan
    // atomik seperti guard stok di checkout — cukup untuk keranjang karena
    // belum ada komitmen uang/stok beneran di tahap ini; reservasi stok
    // sungguhan baru terjadi saat checkout/percobaan bayar (lihat modul pesanan).
    const itemAda = await prisma.keranjangItem.findFirst({
      where: { keranjangId: keranjang.id, produkId, produkVarianId: produkVarianId ?? null },
    });

    const totalJumlahBaru = (itemAda?.jumlah ?? 0) + jumlah;
    if (totalJumlahBaru > stokTersedia) {
      return NextResponse.json(
        {
          error: itemAda
            ? `Stok tidak cukup — tersisa ${stokTersedia}, sudah ada ${itemAda.jumlah} di keranjang`
            : `Stok tidak cukup — tersisa ${stokTersedia}`,
        },
        { status: 409 }
      );
    }

    const item = itemAda
      ? await prisma.keranjangItem.update({ where: { id: itemAda.id }, data: { jumlah: totalJumlahBaru } })
      : await prisma.keranjangItem.create({
          data: { keranjangId: keranjang.id, produkId, produkVarianId, jumlah },
        });

    return NextResponse.json(
      { message: itemAda ? "Jumlah item diperbarui" : "Item ditambahkan ke keranjang", item },
      { status: itemAda ? 200 : 201 }
    );
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}