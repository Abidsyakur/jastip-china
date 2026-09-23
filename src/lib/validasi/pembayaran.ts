// letak: src/lib/validasi/pembayaran.ts
import { z } from "zod";
import { StatusPembayaran } from "@prisma/client";
import { paginationSchema } from "./common";
import { fileUrlSchema } from "./common";

// POST /api/pesanan/[id]/pembayaran — bikin percobaan bayar baru (termasuk retry
// setelah kadaluarsa/ditolak — Pembayaran satu-ke-banyak terhadap Pesanan).
// SENGAJA tidak ada field jumlahBayar di sini — itu SELALU dihitung server
// dari pesanan.totalAkhir, tidak pernah dipercaya dari input client (supaya
// tidak ada yang bisa "checkout ulang" dengan nominal yang dimanipulasi).
export const buatPembayaranSchema = z.object({
  metode: z.string().trim().min(1, "Metode pembayaran wajib diisi").max(50),
});
export type BuatPembayaranInput = z.infer<typeof buatPembayaranSchema>;

// PATCH /api/pesanan/[id]/pembayaran/bukti — customer upload bukti transfer
export const uploadBuktiSchema = z.object({
  buktiUrl: fileUrlSchema("URL bukti transfer tidak valid"),
  tglBayar: z.coerce.date(),
});
export type UploadBuktiInput = z.infer<typeof uploadBuktiSchema>;

// PATCH /api/admin/pembayaran/[id]/verifikasi — admin terima/tolak.
// Catatan wajib diisi kalau menolak, supaya jejak audit di LogAktivitas jelas.
export const verifikasiPembayaranSchema = z
  .object({
    status: z.nativeEnum(StatusPembayaran).refine(
      (s) => s === "TERVERIFIKASI" || s === "DITOLAK",
      { message: "Status verifikasi hanya boleh TERVERIFIKASI atau DITOLAK" }
    ),
    catatanAdmin: z.string().trim().max(500).optional(),
  })
  .refine((data) => data.status !== "DITOLAK" || Boolean(data.catatanAdmin), {
    message: "Catatan wajib diisi kalau menolak pembayaran",
    path: ["catatanAdmin"],
  });
export type VerifikasiPembayaranInput = z.infer<typeof verifikasiPembayaranSchema>;

// GET /api/admin/pembayaran — list untuk panel admin, default tampilkan yang
// perlu ditinjau (MENUNGGU_VERIFIKASI) kalau status tidak difilter eksplisit
export const pembayaranAdminQuerySchema = paginationSchema.extend({
  status: z.nativeEnum(StatusPembayaran).optional(),
});
export type PembayaranAdminQuery = z.infer<typeof pembayaranAdminQuerySchema>;