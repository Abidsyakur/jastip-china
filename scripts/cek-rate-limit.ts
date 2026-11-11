// letak: scripts/cek-rate-limit.ts
// Jalankan: npx tsx --env-file=.env.local scripts/cek-rate-limit.ts
import { cekRateLimitLogin } from "../src/lib/auth/rate-limit";
import { prisma } from "../src/lib/db";

async function main() {
  const id = `uji:skrip-${Date.now()}`;
  for (let i = 1; i <= 7; i++) {
    const h = await cekRateLimitLogin(id);
    console.log(`percobaan ${i}: diizinkan=${h.diizinkan} sisa=${h.sisaPercobaan} reset=${h.resetPada.toISOString()}`);
  }
  // Harapan: percobaan 1-5 diizinkan=true (sisa 4,3,2,1,0), percobaan 6-7 diizinkan=false
  await prisma.rateLimit.deleteMany({ where: { kunci: `login:${id}` } });
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});