import { z } from "zod";
import { cuidSchema } from "./common";

// POST /api/keranjang — tambah item ke keranjang (hanya barang katalog, bukan custom PO)
export const tambahKeranjangSchema = z.object({
  produkId: cuidSchema,
  produkVarianId: cuidSchema.optional(),
  jumlah: z.coerce.number().int().positive("Jumlah minimal 1").max(999),
});
export type TambahKeranjangInput = z.infer<typeof tambahKeranjangSchema>;

// PATCH /api/keranjang/[itemId] — ubah jumlah item
export const updateKeranjangItemSchema = z.object({
  jumlah: z.coerce.number().int().positive("Jumlah minimal 1").max(999),
});
export type UpdateKeranjangItemInput = z.infer<typeof updateKeranjangItemSchema>;
