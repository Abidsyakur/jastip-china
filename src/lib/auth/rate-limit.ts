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