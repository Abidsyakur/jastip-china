// letak: src/lib/validasi/pesanan.ts
import { z } from "zod";
import { StatusPesanan } from "@prisma/client";
import { cuidSchema, paginationSchema, uangSchema } from "./common";

// POST /api/pesanan — checkout, item dipilih sebagian dari keranjang.
// Langsung bikin percobaan pembayaran pertama sekalian (lihat lib/stok.ts +
// route handler) — makanya metode pembayaran wajib diisi di sini.
export const checkoutSchema = z.object({
  alamatId: cuidSchema,
  keranjangItemIds: z.array(cuidSchema).min(1, "Pilih minimal 1 item untuk checkout"),
  // Dibatasi ketat (bukan bebas teks lagi) -- dipakai langsung sebagai kunci
  // tarif di lib/tarif.ts § hitungOngkirDomestik, tidak ada kurir lain yang
  // didukung untuk sekarang.
  preferensiKurir: z.enum(["jnt", "shopee_express"], {
    errorMap: () => ({ message: "Kurir cuma bisa jnt atau shopee_express untuk sekarang" }),
  }),
  metode: z.string().trim().min(1, "Metode pembayaran wajib diisi").max(50),
});
export type CheckoutInput = z.infer<typeof checkoutSchema>;

// PATCH /api/admin/pesanan/[id]/status — ubah status pesanan.
// Setiap kali dipanggil, service layer WAJIB juga insert baris baru
// di PesananStatusLog (itu sumber kebenaran untuk halaman "Lacak status"),
// jangan cuma update kolom statusPesanan di tabel Pesanan.
export const updateStatusPesananSchema = z.object({
  status: z.nativeEnum(StatusPesanan),
  catatan: z.string().trim().max(500).optional(),
});
export type UpdateStatusPesananInput = z.infer<typeof updateStatusPesananSchema>;

// PATCH /api/admin/pesanan/[id]/biaya — admin isi biaya yang di-set 0 saat
// checkout (belum ada kalkulator tarif, lihat modul Pesanan & Pembayaran).
// totalAkhir dihitung ULANG server-side dari sini, tidak diterima dari client.
// PATCH /api/admin/pesanan/[id]/biaya — biayaJasaTitip & ongkirDomestik sekarang
// sudah dihitung OTOMATIS saat checkout (lib/tarif.ts), field ini di sini jadi
// override manual (kalau admin perlu koreksi kasus khusus). ongkirChinaGudang
// TETAP cuma bisa diisi manual di sini -- belum ada kalkulatornya.
// PATCH /api/admin/pesanan/[id]/biaya — biayaJasaTitip & ongkirDomestik sudah
// FINAL & OTOMATIS sejak checkout (lib/tarif.ts), TIDAK BOLEH diubah lewat
// endpoint ini sama sekali. Cuma ongkirChinaGudang yang masih manual admin
// (belum ada kalkulatornya).
export const updateBiayaSchema = z.object({
  ongkirChinaGudang: uangSchema,
});
export type UpdateBiayaInput = z.infer<typeof updateBiayaSchema>;

// PATCH /api/admin/pesanan/[id]/pengiriman — realisasi pengiriman (beda dari
// preferensiKurir yang cuma preferensi customer saat checkout)
export const updatePengirimanSchema = z.object({
  kurir: z.string().trim().max(50).optional(),
  noResi: z.string().trim().max(100).optional(),
  statusKirim: z.string().trim().min(1).max(50).optional(),
  estimasiTiba: z.coerce.date().optional(),
});
export type UpdatePengirimanInput = z.infer<typeof updatePengirimanSchema>;

// GET /api/admin/pesanan — list untuk panel admin
export const pesananAdminQuerySchema = paginationSchema.extend({
  status: z.nativeEnum(StatusPesanan).optional(),
});
export type PesananAdminQuery = z.infer<typeof pesananAdminQuerySchema>;

// GET /api/lacak — lacak publik by nomor invoice (tanpa login). Respons
// SENGAJA minimal (tanpa nominal, alamat, identitas customer) — invoice
// cukup sebagai kapasitas akses karena 8 hex acak tidak bisa ditebak.
export const lacakQuerySchema = z.object({
  invoice: z.string().trim().min(1, "Nomor invoice wajib diisi").max(30),
});
export type LacakQuery = z.infer<typeof lacakQuerySchema>;