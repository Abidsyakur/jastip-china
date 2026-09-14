// letak: src/test-utils/mock-prisma-client.ts
//
// @prisma/client ASLI baru berisi enum & tipe yang benar setelah `npx prisma
// generate` dijalankan (butuh koneksi ke binaries.prisma.sh). Helper ini
// menyediakan pengganti minimal untuk enum-nya saja (harus sinkron manual
// dengan prisma/schema.prisma tiap ada enum baru/berubah) supaya modul yang
// mengimpor "@prisma/client" tidak crash saat di-test di lingkungan yang
// prisma generate-nya belum/tidak bisa dijalankan.
//
// PrismaClient sendiri TIDAK di-mock di sini — untuk itu, mock "@/lib/db"
// secara terpisah di tiap test file (lihat contoh di
// src/app/api/admin/produk/__tests__/produk-admin.test.ts).
//
// POLA YANG BENAR (penting, sempat salah dan makan waktu debug):
//   1. mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } })
//      SEKALI SAJA di `before()`, dengan fakePrisma = objek mutable kosong.
//   2. Import route handler (POST/GET/dst) SEKALI SAJA di `before()` juga,
//      simpan ke variabel di scope file.
//   3. Di tiap `test()`, cukup ISI/GANTI properti fakePrisma (mis.
//      fakePrisma.$transaction = async (fn) => fn(fakeTx)) sebelum manggil
//      handler yang sudah diimpor tadi.
//   4. `beforeEach()` bersihkan properti fakePrisma (bukan mock.module ulang).
//
// KENAPA bukan mock.module() ulang tiap test / re-import route.ts tiap test:
// route.ts meng-import `{ prisma }` dari "@/lib/db" SEKALI saat modul
// pertama kali dievaluasi, dan Node meng-cache modul ES per URL persis —
// import ulang "../route" (bahkan dengan query string cache-buster) tetap
// bisa pegang binding `prisma` yang lama kalau ada bagian lain dari chain
// importnya masih ke-cache. Objek `fakePrisma` yang di-mutasi (bukan
// di-replace) sepenuhnya menghindari masalah ini karena property lookup
// (`prisma.$transaction(...)`) selalu dievaluasi saat DIPANGGIL, bukan saat
// modul di-import.
import { mock } from "node:test";

/**
 * Class error minimal yang meniru Prisma.PrismaClientKnownRequestError asli
 * (cukup punya `code` dan `instanceof` yang benar) — dipakai route handler
 * untuk membedakan P2025 (not found), P2002 (unique constraint), P2003 (FK
 * constraint), dll.
 *
 * PENTING — cara pakai yang BENAR di test:
 *   import { PrismaClientKnownRequestError } from "@/test-utils/mock-prisma-client";
 *   throw new PrismaClientKnownRequestError("pesan", "P2003");
 *
 * JANGAN `const { Prisma } = await import("@prisma/client")` di dalam test
 * untuk membuat error ini — walau "@prisma/client" sudah di-mock lewat
 * mockPrismaClientModule(), dynamic import() terpisah di dalam test ternyata
 * bisa resolve ke identitas modul yang BEDA dari static import di route.ts
 * (kemungkinan besar soal urutan/kondisi resolusi `exports` map Prisma,
 * beda perilaku antar versi Node) — akibatnya `instanceof` di route.ts gagal
 * cocok dan Prisma ASLI yang tertangkap, bukan mock-nya. Import LANGSUNG dari
 * sini menghindari ambiguitas itu sepenuhnya karena cuma ada SATU jalur resolusi.
 */
export class PrismaClientKnownRequestError extends Error {
  code: string;
  constructor(message: string, code = "P2025") {
    super(message);
    this.name = "PrismaClientKnownRequestError";
    this.code = code;
  }
}

export const ENUM_MOCK = {
  AdminRole: { OWNER: "OWNER", STAFF: "STAFF" },
  ProdukStatus: { AKTIF: "AKTIF", NONAKTIF: "NONAKTIF" },
  PermintaanPoStatus: {
    MENUNGGU_REVIEW: "MENUNGGU_REVIEW",
    DIKONFIRMASI_HARGA: "DIKONFIRMASI_HARGA",
    DITOLAK: "DITOLAK",
    SUDAH_JADI_PESANAN: "SUDAH_JADI_PESANAN",
  },
  StatuspreferensiKurir: {
    REGULER: "REGULER",
    
  },
  StatusPesanan: {
    MENUNGGU_PEMBAYARAN: "MENUNGGU_PEMBAYARAN",
    DIPROSES_ADMIN: "DIPROSES_ADMIN",
    DIKONSOLIDASI_KIRIM: "DIKONSOLIDASI_KIRIM",
    TIBA_KIRIM_LOKAL: "TIBA_KIRIM_LOKAL",
    SELESAI: "SELESAI",
    DIBATALKAN: "DIBATALKAN",
  },
  SumberItem: { KATALOG: "KATALOG", CUSTOM_PO: "CUSTOM_PO" },
  StatusPembayaran: {
    MENUNGGU_BUKTI: "MENUNGGU_BUKTI",
    MENUNGGU_VERIFIKASI: "MENUNGGU_VERIFIKASI",
    TERVERIFIKASI: "TERVERIFIKASI",
    DITOLAK: "DITOLAK",
    KADALUARSA: "KADALUARSA",
  },
  AlasanKomplain: {
    BARANG_RUSAK: "BARANG_RUSAK",
    TIDAK_SESUAI_DESKRIPSI: "TIDAK_SESUAI_DESKRIPSI",
    SALAH_KIRIM: "SALAH_KIRIM",
    LAINNYA: "LAINNYA",
  },
  StatusKomplain: { DIAJUKAN: "DIAJUKAN", DIPROSES: "DIPROSES", SELESAI: "SELESAI" },
  SolusiKomplain: {
    KIRIM_ULANG: "KIRIM_ULANG",
    REFUND_SEBAGIAN: "REFUND_SEBAGIAN",
    REFUND_PENUH: "REFUND_PENUH",
    DITOLAK: "DITOLAK",
  },
  // Bukan enum dari schema — ini namespace Prisma bawaan yang dipakai buat
  // deteksi error (P2025 not found, P2002 unique, P2003 FK constraint, dst).
  Prisma: {
    PrismaClientKnownRequestError: PrismaClientKnownRequestError,
  },
} as const;

/**
 * Panggil sekali di awal tiap test file yang (tidak langsung) mengimpor "@prisma/client".
 *
 * CATATAN KOMPATIBILITAS: mock.module() itu API eksperimental Node. Opsi
 * `namedExports` di-deprecate di versi Node yang lebih baru (diganti
 * `exports`), TAPI masih didukung penuh — cuma muncul DeprecationWarning
 * kosmetik, tidak mempengaruhi hasil test. SENGAJA dibiarkan pakai
 * `namedExports` saja (bukan `exports`, apalagi dua-duanya sekaligus):
 * - `exports` saja: gagal DIAM-DIAM (bukan error) di Node versi lama yang
 *   belum kenal opsi itu — mock jadi kosong tanpa pesan jelas.
 * - Dua-duanya sekaligus: Node yang SUDAH kenal `exports` malah menolak
 *   keras ("options.exports cannot be used with options.namedExports").
 * `namedExports` saja adalah satu-satunya opsi yang confirmed jalan di
 * kedua versi. Abaikan saja DeprecationWarning-nya sampai `namedExports`
 * benar-benar dihapus dari Node (belum, per catatan ini ditulis).
 */
export function mockPrismaClientModule(): void {
  mock.module("@prisma/client", { namedExports: ENUM_MOCK });
}