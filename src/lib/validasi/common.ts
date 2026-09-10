import { z } from "zod";

/**
 * Primitives yang dipakai berulang di banyak endpoint. Ditaruh di sini supaya
 * aturan validasi (misal: format no WA, minimal panjang password) konsisten
 * di semua tempat — tidak beda-beda tiap endpoint seperti sebelumnya.
 */

/** ID yang di-generate Prisma via @default(cuid()) */
export const cuidSchema = z.string().cuid("ID tidak valid");

/**
 * Nilai uang / kurs — di DB bertipe Decimal, tapi lewat JSON selalu diterima
 * sebagai number atau string angka ("50000"). z.coerce.number() menangani
 * keduanya. Dipisah non-negatif (boleh 0, mis. hargaTambahan varian) dan
 * positif (harus > 0, mis. hargaJualIdr, jumlahBayar).
 */
export const uangSchema = z.coerce.number().nonnegative().finite();
export const uangPositifSchema = z.coerce.number().positive().finite();

/** Nomor WA Indonesia: 08xxxxxxxxxx atau 628xxxxxxxxxx, 9-14 digit setelah prefix */
export const noWaSchema = z
  .string()
  .trim()
  .regex(/^(\+?62|0)8[0-9]{8,13}$/, "Format nomor WhatsApp tidak valid");

export const emailSchema = z.string().trim().toLowerCase().email("Format email tidak valid");

export const passwordSchema = z
  .string()
  .min(8, "Password minimal 8 karakter")
  .max(100, "Password maksimal 100 karakter");

/** Query pagination standar — dipakai di semua endpoint list (produk, riwayat, dll) */
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});
export type PaginationQuery = z.infer<typeof paginationSchema>;
