// letak: src/lib/validasi/notifikasi.ts
import { z } from "zod";
import { cuidSchema } from "./common";

// PATCH /api/notifikasi/tandai-baca
// notifikasiIds kosong/tidak diisi = tandai semua notifikasi milik customer sebagai dibaca
export const tandaiBacaSchema = z.object({
  notifikasiIds: z.array(cuidSchema).optional(),
});
export type TandaiBacaInput = z.infer<typeof tandaiBacaSchema>;