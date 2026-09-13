// letak: src/lib/stok.ts
import type { Prisma } from "@prisma/client";

/**
 * Kurangi stok secara ATOMIK: syarat `stok >= jumlah` ditaruh di WHERE, bukan
 * dicek dulu baru diupdate terpisah. Ini pola yang sama yang dibahas di
 * tahap arsitektur untuk cegah overselling saat dua checkout bersamaan
 * berebut stok terakhir — Postgres mengunci baris ini selama transaksi,
 * request kedua akan lihat nilai stok yang sudah ter-update duluan.
 *
 * WAJIB dipanggil di dalam prisma.$transaction yang sama dengan penulisan
 * PesananItem terkait (pass `tx`, bukan `prisma` langsung).
 *
 * Return true kalau berhasil, false kalau stok tidak cukup (pemanggil harus
 * throw & batalkan seluruh transaksi checkout/retry).
 */
export async function kurangiStokAtomik(
  tx: Prisma.TransactionClient,
  produkId: string,
  produkVarianId: string | null,
  jumlah: number
): Promise<boolean> {
  if (produkVarianId) {
    const hasil = await tx.produkVarian.updateMany({
      where: { id: produkVarianId, stok: { gte: jumlah } },
      data: { stok: { decrement: jumlah } },
    });
    return hasil.count > 0;
  }

  const hasil = await tx.produk.updateMany({
    where: { id: produkId, stok: { gte: jumlah } },
    data: { stok: { decrement: jumlah } },
  });
  return hasil.count > 0;
}

/**
 * Kembalikan stok — dipanggil saat Pembayaran KADALUARSA atau DITOLAK
 * (lihat modul pembayaran bagian 2). Pakai `updateMany` (bukan `update`)
 * dengan `where: { id }` polos supaya TIDAK melempar error kalau produk/varian
 * itu kebetulan sudah tidak ada lagi (mis. varian sudah diganti admin lewat
 * PATCH produk yang me-replace semua varian) — release stok untuk item lain
 * di batch yang sama tidak boleh ikut gagal cuma gara-gara satu referensi
 * yang sudah usang.
 */
export async function kembalikanStok(
  tx: Prisma.TransactionClient,
  produkId: string,
  produkVarianId: string | null,
  jumlah: number
): Promise<void> {
  if (produkVarianId) {
    await tx.produkVarian.updateMany({
      where: { id: produkVarianId },
      data: { stok: { increment: jumlah } },
    });
    return;
  }

  await tx.produk.updateMany({
    where: { id: produkId },
    data: { stok: { increment: jumlah } },
  });
}