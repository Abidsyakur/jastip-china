// letak: src/lib/validasi/rekening.ts
import { z } from "zod";

// POST /api/admin/rekening — tambah rekening bank tujuan transfer.
// `aktif` opsional (default true di DB); kalau false, rekening langsung
// disembunyikan dari /api/rekening publik tanpa harus dihapus.
export const buatRekeningSchema = z.object({
  bank: z.string().trim().min(1, "Nama bank wajib diisi").max(30),
  noRekening: z.string().trim().min(1, "Nomor rekening wajib diisi").max(30),
  atasNama: z.string().trim().min(1, "Atas nama wajib diisi").max(100),
  aktif: z.boolean().optional(),
});
export type BuatRekeningInput = z.infer<typeof buatRekeningSchema>;

// PATCH /api/admin/rekening/[id] — semua field opsional (termasuk toggle aktif).
export const updateRekeningSchema = buatRekeningSchema.partial();
export type UpdateRekeningInput = z.infer<typeof updateRekeningSchema>;
