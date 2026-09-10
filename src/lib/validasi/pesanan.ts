import { z } from "zod";
import { StatusPesanan } from "@prisma/client";
import { cuidSchema } from "./common";

// POST /api/pesanan — checkout, item dipilih sebagian dari keranjang
export const checkoutSchema = z.object({
  alamatId: cuidSchema,
  keranjangItemIds: z.array(cuidSchema).min(1, "Pilih minimal 1 item untuk checkout"),
  preferensiKurir: z.string().trim().min(1, "Preferensi kurir wajib diisi").max(50),
});
export type CheckoutInput = z.infer<typeof checkoutSchema>;

// PATCH /api/admin/pesanan/[id]/status — ubah status pesanan.
// Setiap kali dipanggil, service layer WAJIB juga insert baris baru
// di PesananStatusLog (itu sumber kebenaran untuk halaman "Lacak status"),
// jangan cuma update kolom statusPesanan di tabel Pesanan.
export const updateStatusPesananSchema = z.object({
  status: z.nativeEnum(StatusPesanan),
  catatan: z.string().trim().max(500).optional(),
});
export type UpdateStatusPesananInput = z.infer<typeof updateStatusPesananSchema>;
