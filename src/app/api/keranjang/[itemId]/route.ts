// letak: src/app/api/keranjang/[itemId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parseBody, updateKeranjangItemSchema } from "@/lib/validasi";
import { wajibCustomer } from "@/lib/auth";
import { tanganiErrorAuth } from "@/lib/http-error";

interface Konteks {
  // Next.js 15: params jadi Promise, bukan objek langsung
  params: Promise<{ itemId: string }>;
}

export async function PATCH(req: NextRequest, { params }: Konteks) {
  try {
    const user = await wajibCustomer(req);
    const { itemId } = await params;

    const parsed = await parseBody(req, updateKeranjangItemSchema);
    if ("error" in parsed) return parsed.error;
    const { jumlah } = parsed.data;

    const item = await prisma.keranjangItem.findUnique({
      where: { id: itemId },
      include: { keranjang: true, produk: true, produkVarian: true },
    });

    // "Tidak ditemukan" dipakai untuk DUA kasus (item beneran tidak ada, ATAU
    // item milik customer lain) — endpoint ini tidak boleh bisa dipakai
    // menebak-nebak ID item milik orang lain lewat beda kode status.
    if (!item || item.keranjang.customerId !== user.sub) {
      return NextResponse.json({ error: "Item keranjang tidak ditemukan" }, { status: 404 });
    }

    const stokTersedia = item.produkVarian ? item.produkVarian.stok : item.produk.stok;
    if (jumlah > stokTersedia) {
      return NextResponse.json({ error: `Stok tidak cukup — tersisa ${stokTersedia}` }, { status: 409 });
    }

    const diupdate = await prisma.keranjangItem.update({ where: { id: itemId }, data: { jumlah } });
    return NextResponse.json({ message: "Jumlah diperbarui", item: diupdate });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}

export async function DELETE(req: NextRequest, { params }: Konteks) {
  try {
    const user = await wajibCustomer(req);
    const { itemId } = await params;

    const item = await prisma.keranjangItem.findUnique({
      where: { id: itemId },
      include: { keranjang: true },
    });
    if (!item || item.keranjang.customerId !== user.sub) {
      return NextResponse.json({ error: "Item keranjang tidak ditemukan" }, { status: 404 });
    }

    await prisma.keranjangItem.delete({ where: { id: itemId } });
    return NextResponse.json({ message: "Item dihapus dari keranjang" });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}