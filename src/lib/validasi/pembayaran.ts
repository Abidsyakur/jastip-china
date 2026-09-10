import { z } from "zod";
import { StatusPembayaran } from "@prisma/client";
import { uangPositifSchema } from "./common";

// POST /api/pesanan/[id]/pembayaran — bikin percobaan bayar baru (termasuk retry
// setelah kadaluarsa — Pembayaran satu-ke-banyak terhadap Pesanan, jadi ini
// aman dipanggil berkali-kali untuk pesanan yang sama)
export const buatPembayaranSchema = z.object({
  metode: z.string().trim().min(1, "Metode pembayaran wajib diisi").max(50),
  jumlahBayar: uangPositifSchema,
});
export type BuatPembayaranInput = z.infer<typeof buatPembayaranSchema>;

// PATCH /api/pembayaran/[id]/bukti — customer upload bukti transfer
export const uploadBuktiSchema = z.object({
  buktiUrl: z.string().url("URL bukti transfer tidak valid"),
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
