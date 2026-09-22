// letak: src/lib/validasi/dashboard.ts
import { z } from "zod";
import { cuidSchema, paginationSchema } from "./common";

// GET /api/admin/dashboard/produk-terlaris — ?limit (default 5, max 20).
// Kecil saja karena dipakai panel dashboard, bukan laporan penuh.
export const produkTerlarisQuerySchema = z.object({
  limit: z.coerce.number().int().positive().max(20).default(5),
});
export type ProdukTerlarisQuery = z.infer<typeof produkTerlarisQuerySchema>;

// GET /api/admin/log-aktivitas — pagination standar + filter opsional.
// `aksi` pakai contains (case-insensitive) karena nilainya string bebas
// ("VERIFIKASI_PEMBAYARAN", "UBAH_STATUS_PESANAN", ...), bukan enum.
export const logAktivitasQuerySchema = paginationSchema.extend({
  aksi: z.string().trim().max(50).optional(),
  adminId: cuidSchema.optional(),
});
export type LogAktivitasQuery = z.infer<typeof logAktivitasQuerySchema>;

// GET /api/admin/dashboard/omzet-harian — deret omzet per hari untuk chart
// dashboard. Default 7 hari terakhir, max 30 (dashboard, bukan laporan).
export const omzetHarianQuerySchema = z.object({
  hari: z.coerce.number().int().positive().max(30).default(7),
});
export type OmzetHarianQuery = z.infer<typeof omzetHarianQuerySchema>;
