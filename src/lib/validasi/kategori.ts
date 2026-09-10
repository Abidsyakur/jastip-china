import { z } from "zod";

// POST /api/admin/kategori
export const kategoriCreateSchema = z.object({
  namaKategori: z.string().trim().min(2, "Nama kategori minimal 2 karakter").max(100),
});
export type KategoriCreateInput = z.infer<typeof kategoriCreateSchema>;

// PATCH /api/admin/kategori/[id]
export const kategoriUpdateSchema = kategoriCreateSchema;
export type KategoriUpdateInput = z.infer<typeof kategoriUpdateSchema>;
