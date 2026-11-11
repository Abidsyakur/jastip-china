// letak: src/lib/auth/rate-limit.ts
import { prisma } from "@/lib/db";

/**
 * Pembatas akses (rate limiting) berbasis PostgreSQL, pengganti Upstash Redis.
 * Strategi fixed window: satu pernyataan SQL atomik (INSERT ... ON CONFLICT
 * DO UPDATE), sehingga dua request bersamaan tidak bisa sama-sama "lolos"
 * karena pembacaan dan penambahan terjadi dalam satu langkah.
 *
 * identifier idealnya gabungan "tipe:akun-yang-dicoba" (mis. "customer:081234...",
 * "admin:owner@example.com") — BUKAN cuma IP. Ini supaya:
 * - brute-force ke satu akun dari banyak IP berbeda tetap kena limit (di-key oleh akun)
 * - satu IP mencoba banyak akun berbeda kena limit terpisah per akun, tidak saling ganggu
 */
interface Batas {
  prefix: string;
  maks: number;
  jendelaDetik: number;
  /**
   * true  : kalau database gagal, request tetap diizinkan (dicatat di log).
   * false : kalau database gagal, error dilempar (request ditolak).
   */
  gagalTerbuka: boolean;
}

const BATAS = {
  // 5 percobaan / 5 menit per identifier
  login: { prefix: "login", maks: 5, jendelaDetik: 5 * 60, gagalTerbuka: false },
  // Endpoint publik yang bisa dipakai enumerasi invoice (/api/lacak):
  // 20 / 1 menit per IP — user wajar tidak kena limit, scanner yang hammer
  // ratusan invoice per menit terhenti.
  lacak: { prefix: "lacak", maks: 20, jendelaDetik: 60, gagalTerbuka: true },
  // 3 akun / 1 jam
  register: { prefix: "register", maks: 3, jendelaDetik: 60 * 60, gagalTerbuka: false },
  // 50 upload / 24 jam
  upload: { prefix: "upload", maks: 50, jendelaDetik: 24 * 60 * 60, gagalTerbuka: true },
} satisfies Record<string, Batas>;

interface HasilRateLimit {
  diizinkan: boolean;
  sisaPercobaan: number;
  resetPada: Date;
}

const MAKS_PANJANG_KUNCI = 200;
const UMUR_BARIS_KADALUWARSA_MS = 24 * 60 * 60 * 1000;

/** Hapus baris lama sesekali (~1% panggilan), tanpa menunggu hasilnya dan tanpa mengganggu request. */
function bersihkanKadaluwarsa() {
  if (Math.random() >= 0.01) return;
  const batasWaktu = new Date(Date.now() - UMUR_BARIS_KADALUWARSA_MS);
  void prisma.rateLimit.deleteMany({ where: { resetPada: { lt: batasWaktu } } }).catch(() => {});
}

async function hitung(batas: Batas, identifier: string): Promise<HasilRateLimit> {
  const kunci = `${batas.prefix}:${identifier}`.slice(0, MAKS_PANJANG_KUNCI);
  try {
    const baris = await prisma.$queryRaw<{ jumlah: number; reset_pada: Date }[]>`
      INSERT INTO rate_limit (kunci, jumlah, reset_pada)
      VALUES (
        ${kunci}, 1,
        timezone('UTC', now()) + make_interval(secs => ${batas.jendelaDetik}::double precision)
      )
      ON CONFLICT (kunci) DO UPDATE SET
        jumlah = CASE
          WHEN rate_limit.reset_pada <= timezone('UTC', now()) THEN 1
          ELSE rate_limit.jumlah + 1
        END,
        reset_pada = CASE
          WHEN rate_limit.reset_pada <= timezone('UTC', now())
            THEN timezone('UTC', now()) + make_interval(secs => ${batas.jendelaDetik}::double precision)
          ELSE rate_limit.reset_pada
        END
      RETURNING jumlah, reset_pada`;

    const hasil = baris[0];
    if (!hasil) throw new Error("rate_limit: query tidak mengembalikan baris");
    const jumlah = Number(hasil.jumlah);

    bersihkanKadaluwarsa();

    return {
      diizinkan: jumlah <= batas.maks,
      sisaPercobaan: Math.max(0, batas.maks - jumlah),
      resetPada: new Date(hasil.reset_pada),
    };
  } catch (err) {
    console.error(`[rate-limit] gagal menghitung batas "${batas.prefix}":`, err);
    if (!batas.gagalTerbuka) throw err;
    return { diizinkan: true, sisaPercobaan: batas.maks, resetPada: new Date() };
  }
}

export function cekRateLimitLogin(identifier: string): Promise<HasilRateLimit> {
  return hitung(BATAS.login, identifier);
}

export function cekRateLimitLacak(identifier: string): Promise<HasilRateLimit> {
  return hitung(BATAS.lacak, identifier);
}

export function cekRateLimitRegister(identifier: string): Promise<HasilRateLimit> {
  return hitung(BATAS.register, identifier);
}

export function cekRateLimitUpload(identifier: string): Promise<HasilRateLimit> {
  return hitung(BATAS.upload, identifier);
}