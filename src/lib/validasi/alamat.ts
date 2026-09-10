import { z } from "zod";
import { noWaSchema } from "./common";

// POST /api/alamat
export const alamatSchema = z.object({
  label: z.string().trim().min(2, "Label minimal 2 karakter").max(50), // mis. "Rumah", "Kantor"
  penerima: z.string().trim().min(2, "Nama penerima minimal 2 karakter").max(100),
  noTelp: noWaSchema,
  alamatLengkap: z.string().trim().min(10, "Alamat terlalu pendek, cek kembali").max(500),
  kota: z.string().trim().min(2).max(100),
  kodePos: z.string().trim().regex(/^\d{5}$/, "Kode pos harus 5 digit angka"),
});
export type AlamatInput = z.infer<typeof alamatSchema>;

// PATCH /api/alamat/[id]
export const alamatUpdateSchema = alamatSchema.partial();
export type AlamatUpdateInput = z.infer<typeof alamatUpdateSchema>;
