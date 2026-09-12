// letak: src/lib/keranjang.ts
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";

/**
 * Cari Keranjang milik customer, buat kalau belum ada (lazy-create — Keranjang
 * 1-1 dengan Customer via customerId unique). Dipakai di semua endpoint
 * keranjang, bukan bikin Keranjang saat register, supaya modul auth yang
 * sudah jadi tidak perlu diubah.
 */
export async function getOrBuatKeranjang(customerId: string) {
  const ada = await prisma.keranjang.findUnique({ where: { customerId } });
  if (ada) return ada;

  // Race kecil: dua request nyaris bersamaan bisa dua-duanya coba create.
  // Keranjang.customerId unique di schema -> yang kalah kena P2002, ditangkap
  // balik jadi findUnique lagi (idempotent, bukan error ke customer).
  try {
    return await prisma.keranjang.create({ data: { customerId } });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      const punyaOrang = await prisma.keranjang.findUnique({ where: { customerId } });
      if (punyaOrang) return punyaOrang;
    }
    throw err;
  }
}

/** hargaJualIdr & hargaTambahan itu Decimal (dari Prisma) — Number() aman karena Decimal punya valueOf(). */
export function hitungHargaItem(
  hargaJualIdr: Prisma.Decimal,
  hargaTambahan: Prisma.Decimal | null | undefined,
  jumlah: number
): { hargaSatuan: number; subtotal: number } {
  const hargaSatuan = Number(hargaJualIdr) + Number(hargaTambahan ?? 0);
  return { hargaSatuan, subtotal: hargaSatuan * jumlah };
}