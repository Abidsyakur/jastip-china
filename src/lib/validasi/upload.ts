import { z } from "zod";

const TIPE_FILE_DIIZINKAN = ["image/jpeg", "image/png", "image/webp"] as const;
const MAKS_UKURAN_BYTES = 5 * 1024 * 1024; // 5MB

// POST /api/upload — minta presigned URL sebelum upload langsung ke R2 dari client.
// Validasi tipe & ukuran di sini penting: ini satu-satunya gerbang sebelum
// client dapat URL yang bisa dipakai upload apa saja ke bucket.
export const requestUploadSchema = z.object({
  namaFile: z.string().trim().min(1).max(255),
  tipeFile: z.enum(TIPE_FILE_DIIZINKAN, {
    errorMap: () => ({ message: "Tipe file harus JPEG, PNG, atau WebP" }),
  }),
  ukuranBytes: z.coerce
    .number()
    .int()
    .positive()
    .max(MAKS_UKURAN_BYTES, "Ukuran file maksimal 5MB"),
  tujuan: z.enum(["produk", "bukti-transfer", "referensi-po", "bukti-komplain"]),
});
export type RequestUploadInput = z.infer<typeof requestUploadSchema>;
