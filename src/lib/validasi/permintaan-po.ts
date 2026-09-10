import { z } from "zod";
import { uangPositifSchema } from "./common";

// POST /api/permintaan-po — customer ajukan barang custom di luar katalog
export const ajukanPoSchema = z.object({
  linkProdukReferensi: z.string().trim().url().optional(),
  deskripsiSpesifikasi: z
    .string()
    .trim()
    .min(10, "Deskripsi terlalu singkat, jelaskan spesifikasi barang yang diinginkan")
    .max(2000),
  fotoReferensiUrl: z.string().url().optional(),
  jumlahDiminta: z.coerce.number().int().positive("Jumlah minimal 1"),
});
export type AjukanPoInput = z.infer<typeof ajukanPoSchema>;

// PATCH /api/permintaan-po/[id]/respon — customer setuju/tolak penawaran harga admin.
// Kalau setuju, service layer yang mengonversi jadi Pesanan baru (skip keranjang).
export const responPenawaranSchema = z.object({
  setuju: z.boolean(),
});
export type ResponPenawaranInput = z.infer<typeof responPenawaranSchema>;

// PATCH /api/admin/permintaan-po/[id]/review — admin kasih harga atau tolak
export const reviewPoSchema = z
  .object({
    status: z.enum(["DIKONFIRMASI_HARGA", "DITOLAK"]),
    estimasiHarga: uangPositifSchema.optional(),
    estimasiOngkir: uangPositifSchema.optional(),
    catatanAdmin: z.string().trim().max(1000).optional(),
  })
  .refine(
    (data) =>
      data.status !== "DIKONFIRMASI_HARGA" ||
      (data.estimasiHarga !== undefined && data.estimasiOngkir !== undefined),
    {
      message: "estimasiHarga dan estimasiOngkir wajib diisi kalau mengonfirmasi harga",
      path: ["estimasiHarga"],
    }
  )
  .refine((data) => data.status !== "DITOLAK" || Boolean(data.catatanAdmin), {
    message: "Catatan wajib diisi kalau menolak permintaan PO",
    path: ["catatanAdmin"],
  });
export type ReviewPoInput = z.infer<typeof reviewPoSchema>;
