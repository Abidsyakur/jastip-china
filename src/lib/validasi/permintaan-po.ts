// letak: src/lib/validasi/permintaan-po.ts
import { z } from "zod";
import { PermintaanPoStatus } from "@prisma/client";
import { cuidSchema, paginationSchema, uangPositifSchema } from "./common";

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
// Kalau setuju, otomatis dikonversi jadi Pesanan baru (skip keranjang) — makanya
// alamatId/preferensiKurir/metode WAJIB diisi kalau setuju:true (sama seperti
// checkout katalog biasa, karena inilah yang dipakai bikin Pesanan+Pembayaran).
export const responPenawaranSchema = z
  .object({
    setuju: z.boolean(),
    alamatId: cuidSchema.optional(),
    preferensiKurir: z.string().trim().min(1).max(50).optional(),
    metode: z.string().trim().min(1).max(50).optional(),
  })
  .refine(
    (data) => !data.setuju || (data.alamatId && data.preferensiKurir && data.metode),
    {
      message: "alamatId, preferensiKurir, dan metode wajib diisi kalau menyetujui penawaran",
      path: ["alamatId"],
    }
  );
export type ResponPenawaranInput = z.infer<typeof responPenawaranSchema>;

// PATCH /api/admin/permintaan-po/[id]/review — admin kasih harga atau tolak.
// estimasiHarga dianggap harga PER UNIT (konsisten dengan Produk.hargaJualIdr),
// bukan total — dikalikan jumlahDiminta saat dikonversi jadi Pesanan nanti.
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

// GET /api/admin/permintaan-po — list untuk panel admin
export const permintaanPoAdminQuerySchema = paginationSchema.extend({
  status: z.nativeEnum(PermintaanPoStatus).optional(),
});
export type PermintaanPoAdminQuery = z.infer<typeof permintaanPoAdminQuerySchema>;