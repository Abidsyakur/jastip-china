import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let limiter: Ratelimit | null = null;

function getLimiter(): Ratelimit {
  // Dibuat lazy (bukan top-level) supaya modul ini aman di-import di mana pun
  // tanpa langsung butuh UPSTASH_REDIS_REST_URL/TOKEN ter-set saat build.
  if (!limiter) {
    limiter = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, "5 m"), // 5 percobaan / 5 menit per identifier
      prefix: "ratelimit:login",
    });
  }
  return limiter;
}

// Endpoint publik yang bisa dipakai enumerasi data (mis. /api/lacak probing
// nomor invoice) — 20/1 menit per IP: user wajar tidak kena limit, scanner
// yang hammer ratusan invoice per menit terhenti.
const limiterLacak = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, "1 m"),
  prefix: "ratelimit:lacak",
});

export async function cekRateLimitLacak(identifier: string): Promise<HasilRateLimit> {
  const { success, remaining, reset } = await limiterLacak.limit(identifier);
  return { diizinkan: success, sisaPercobaan: remaining, resetPada: new Date(reset) };
}

interface HasilRateLimit {
  diizinkan: boolean;
  sisaPercobaan: number;
  resetPada: Date;
}

/**
 * identifier idealnya gabungan "tipe:akun-yang-dicoba" (mis. "customer:081234...",
 * "admin:owner@example.com") — BUKAN cuma IP. Ini supaya:
 * - brute-force ke satu akun dari banyak IP berbeda tetap kena limit (di-key oleh akun)
 * - satu IP mencoba banyak akun berbeda kena limit terpisah per akun, tidak saling ganggu
 */
export async function cekRateLimitLogin(identifier: string): Promise<HasilRateLimit> {
  const { success, remaining, reset } = await getLimiter().limit(identifier);
  return { diizinkan: success, sisaPercobaan: remaining, resetPada: new Date(reset) };
}

const limiterRegister = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 h"), // 3 akun / 1 jam
  prefix: "ratelimit:register",
});

const limiterUpload = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(50, "24 h"), // 50 upload / 24 jam
  prefix: "ratelimit:upload",
});

export async function cekRateLimitRegister(identifier: string) {
  const { success } = await limiterRegister.limit(identifier);
  return { diizinkan: success };
}

export async function cekRateLimitUpload(identifier: string) {
  const { success } = await limiterUpload.limit(identifier);
  return { diizinkan: success };
}