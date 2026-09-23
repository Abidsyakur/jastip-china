// letak: src/lib/validasi/komplain.ts
import { z } from "zod";
import { AlasanKomplain, SolusiKomplain, StatusKomplain } from "@prisma/client";
import { cuidSchema, paginationSchema, fileUrlSchema } from "./common";

// POST /api/komplain — customer ajukan komplain atas satu item pesanan
export const ajukanKomplainSchema = z.object({
  pesananItemId: cuidSchema,
  alasan: z.nativeEnum(AlasanKomplain),
  buktiFoto: fileUrlSchema("Bukti foto wajib diunggah"), // wajib sesuai spesifikasi
  deskripsi: z.string().trim().max(1000).optional(),
});
export type AjukanKomplainInput = z.infer<typeof ajukanKomplainSchema>;

// PATCH /api/admin/komplain/[id] — admin tindak lanjut (tiap update juga
// sebaiknya bikin baris baru di KomplainLog, terpisah dari solusi akhir)
export const tindakLanjutKomplainSchema = z
  .object({
    status: z.nativeEnum(StatusKomplain),
    catatan: z.string().trim().min(1, "Catatan tindak lanjut wajib diisi").max(1000),
    solusi: z.nativeEnum(SolusiKomplain).optional(),
  })
  .refine((data) => data.status !== "SELESAI" || Boolean(data.solusi), {
    message: "Solusi wajib diisi kalau komplain ditutup (status SELESAI)",
    path: ["solusi"],
  });
export type TindakLanjutKomplainInput = z.infer<typeof tindakLanjutKomplainSchema>;

// GET /api/admin/komplain — list untuk panel admin, default tampilkan yang
// belum SELESAI kalau status tidak difilter eksplisit
export const komplainAdminQuerySchema = paginationSchema.extend({
  status: z.nativeEnum(StatusKomplain).optional(),
});
export type KomplainAdminQuery = z.infer<typeof komplainAdminQuerySchema>;