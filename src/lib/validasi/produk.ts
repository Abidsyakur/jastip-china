import { z } from "zod";
import { ProdukStatus } from "@prisma/client";
import { cuidSchema, paginationSchema, uangPositifSchema, uangSchema } from "./common";

// GET /api/produk — query publik: filter kategori, cari, sort, pagination
export const produkQuerySchema = paginationSchema.extend({
  kategoriId: cuidSchema.optional(),
  cari: z.string().trim().max(100).optional(),
  sort: z.enum(["terbaru", "termurah", "termahal"]).default("terbaru"),
});
export type ProdukQuery = z.infer<typeof produkQuerySchema>;

// --- Admin: POST/PATCH /api/admin/produk ---

// 1 baris = 1 kombinasi varian lengkap (sesuai keputusan di spesifikasi, bukan atribut-nilai)
const varianInputSchema = z.object({
  namaVarian: z.string().trim().min(1, "Nama varian wajib diisi").max(100),
  stok: z.coerce.number().int().nonnegative(),
  hargaTambahan: uangSchema.default(0),
});
export type VarianInput = z.infer<typeof varianInputSchema>;

export const produkCreateSchema = z.object({
  kategoriId: cuidSchema,
  namaProduk: z.string().trim().min(3, "Nama produk minimal 3 karakter").max(200),
  deskripsi: z.string().trim().max(5000).optional(),
  hargaAsalRmb: uangPositifSchema,
  kurs: uangPositifSchema,
  hargaJualIdr: uangPositifSchema,
  beratGram: z.coerce.number().int().positive("Berat harus lebih dari 0 gram"),
  linkSumber: z.string().trim().url("Link sumber harus berupa URL valid"),
  stok: z.coerce.number().int().nonnegative().default(0),
  status: z.nativeEnum(ProdukStatus).default(ProdukStatus.AKTIF),
  gambarUrls: z
    .array(z.string().url())
    .min(1, "Minimal 1 foto produk")
    .max(10, "Maksimal 10 foto produk"),
  varian: z.array(varianInputSchema).max(50).default([]),
});
export type ProdukCreateInput = z.infer<typeof produkCreateSchema>;

// PATCH /api/admin/produk/[id] — semua field opsional (partial update)
export const produkUpdateSchema = produkCreateSchema.partial();
export type ProdukUpdateInput = z.infer<typeof produkUpdateSchema>;
