// letak: src/lib/pesanan.ts
import { Prisma, ProdukStatus, StatusPesanan, StatusPembayaran, SumberItem } from "@prisma/client";
import { prisma } from "@/lib/db";
import { kurangiStokAtomik } from "@/lib/stok";
import { buatNoInvoice } from "@/lib/no-invoice";
import { AppError } from "@/lib/http-error";
import type { CheckoutInput } from "@/lib/validasi";

const JAM_KEDALUWARSA_PEMBAYARAN = Number(process.env.PEMBAYARAN_KEDALUWARSA_JAM ?? 24);
const MAKS_PERCOBAAN_NO_INVOICE = 3;

/** Error checkout yang sudah tahu status HTTP-nya sendiri, supaya route handler tinggal pakai. */
export class CheckoutError extends AppError {
  constructor(message: string, status: number) {
    super(message, status);
    this.name = "CheckoutError";
  }
}

interface PesananItemBaru {
  sumberItem: SumberItem;
  produkId: string;
  produkVarianId: string | null;
  varianSnapshot: string | null;
  namaItemSnapshot: string;
  hargaSatuanSaatBeli: number;
  jumlah: number;
}

/**
 * Proses checkout lengkap: validasi kepemilikan alamat & item keranjang,
 * snapshot harga (namaItemSnapshot/hargaSatuanSaatBeli — TIDAK direferensikan
 * live ke Produk, prinsip README #2), guard stok atomik per item (prinsip
 * arsitektur: UPDATE ... WHERE stok >= jumlah, bukan baca-lalu-tulis), lalu
 * buat Pesanan + PesananItem + percobaan Pembayaran pertama dalam SATU
 * transaksi. Kalau item mana pun kurang stok, SELURUH transaksi batal —
 * tidak ada checkout "separuh berhasil".
 */
export async function prosesCheckout(customerId: string, input: CheckoutInput) {
  const { alamatId, keranjangItemIds, preferensiKurir, metode } = input;

  const alamat = await prisma.alamat.findUnique({ where: { id: alamatId } });
  if (!alamat || alamat.customerId !== customerId) {
    throw new CheckoutError("Alamat tidak ditemukan", 404);
  }

  const items = await prisma.keranjangItem.findMany({
    where: { id: { in: keranjangItemIds }, keranjang: { customerId } },
    include: { produk: true, produkVarian: true },
  });

  // Jumlah hasil harus PERSIS sama dengan yang diminta — kalau ada yang
  // hilang, berarti ada ID yang tidak ada ATAU bukan milik customer ini.
  // Diperlakukan sama (404 generik), tidak dibedakan, biar tidak bisa
  // dipakai menebak-nebak ID item milik orang lain.
  if (items.length !== keranjangItemIds.length) {
    throw new CheckoutError("Sebagian item keranjang tidak ditemukan atau bukan milik kamu", 404);
  }

  for (const item of items) {
    if (item.produk.status !== ProdukStatus.AKTIF) {
      throw new CheckoutError(`Produk "${item.produk.namaProduk}" sudah tidak tersedia`, 409);
    }
  }

  for (let percobaan = 0; percobaan < MAKS_PERCOBAAN_NO_INVOICE; percobaan++) {
    try {
      return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        let subtotalProduk = 0;
        const pesananItemData: PesananItemBaru[] = [];

        for (const item of items) {
          const hargaSatuan = Number(item.produk.hargaJualIdr) + Number(item.produkVarian?.hargaTambahan ?? 0);
          subtotalProduk += hargaSatuan * item.jumlah;

          const berhasil = await kurangiStokAtomik(tx, item.produkId, item.produkVarianId, item.jumlah);
          if (!berhasil) {
            const stokTersisa = item.produkVarian ? item.produkVarian.stok : item.produk.stok;
            throw new CheckoutError(
              `Stok "${item.produk.namaProduk}" tidak cukup — tersisa ${stokTersisa}`,
              409
            );
          }

          pesananItemData.push({
            sumberItem: SumberItem.KATALOG,
            produkId: item.produkId,
            produkVarianId: item.produkVarianId,
            varianSnapshot: item.produkVarian?.namaVarian ?? null,
            namaItemSnapshot: item.produk.namaProduk,
            hargaSatuanSaatBeli: hargaSatuan,
            jumlah: item.jumlah,
          });
        }

        // ongkir & jasa titip sengaja 0 di sini — keputusan produk: diisi
        // manual oleh admin belakangan (belum ada kalkulator tarif).
        const totalAkhir = subtotalProduk;

        const pesanan = await tx.pesanan.create({
          data: {
            customerId,
            alamatId,
            noInvoice: buatNoInvoice(),
            preferensiKurir,
            subtotalProduk,
            biayaJasaTitip: 0,
            ongkirChinaGudang: 0,
            ongkirDomestik: 0,
            totalAkhir,
            item: { create: pesananItemData },
            statusLog: { create: { status: StatusPesanan.MENUNGGU_PEMBAYARAN } },
          },
          include: { item: true },
        });

        const kedaluwarsaPada = new Date(Date.now() + JAM_KEDALUWARSA_PEMBAYARAN * 60 * 60 * 1000);
        const pembayaran = await tx.pembayaran.create({
          data: {
            pesananId: pesanan.id,
            metode,
            status: StatusPembayaran.MENUNGGU_BUKTI,
            jumlahBayar: totalAkhir,
            kedaluwarsaPada,
          },
        });

        // Item yang barusan jadi pesanan dihapus dari keranjang — checkout
        // cuma untuk item yang dipilih (bisa sebagian), sisanya tetap di keranjang.
        await tx.keranjangItem.deleteMany({ where: { id: { in: keranjangItemIds } } });

        return { pesanan, pembayaran };
      });
    } catch (err) {
      const bolehRetry =
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2002" &&
        percobaan < MAKS_PERCOBAAN_NO_INVOICE - 1;
      if (bolehRetry) continue; // no_invoice tabrakan (sangat jarang) -> coba lagi dengan invoice baru
      throw err;
    }
  }

  // Praktis tidak akan pernah sampai sini (peluang 3x tabrakan berturut-turut
  // hampir nol), tapi TypeScript perlu return path yang eksplisit.
  throw new CheckoutError("Gagal membuat pesanan, coba lagi", 500);
}