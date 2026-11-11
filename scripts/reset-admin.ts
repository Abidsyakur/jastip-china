// letak: scripts/reset-admin.ts
//
// Pemakaian (jalankan dari folder project):
//   Daftar admin : npx tsx --env-file=.env.local scripts/reset-admin.ts
//   Reset sandi  : npx tsx --env-file=.env.local scripts/reset-admin.ts email@admin.com SandiBaruAnda123
//   DB non-lokal : tambahkan --yes di akhir perintah (hanya kalau yakin itu DB development)
//
// Hanya untuk pengembangan. Jangan dijalankan ke database production.
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/auth/password";

const prisma = new PrismaClient();

const MIN_PANJANG_SANDI = 8;

function infoDatabase() {
  try {
    const url = new URL(process.env.DATABASE_URL ?? "");
    return { host: url.hostname, nama: url.pathname.replace("/", ""), valid: true };
  } catch {
    return { host: "", nama: "", valid: false };
  }
}

async function main() {
  const args = process.argv.slice(2);
  const sudahYakin = args.includes("--yes");
  const [email, sandiBaru] = args.filter((a) => a !== "--yes");

  const db = infoDatabase();
  if (!db.valid) {
    throw new Error(
      "DATABASE_URL tidak terbaca. Pastikan file .env.local ada dan dipakai lewat --env-file=.env.local"
    );
  }
  console.log(`Database: ${db.host}/${db.nama}\n`);

  const lokal = db.host === "localhost" || db.host === "127.0.0.1";

  // Mode daftar: tanpa argumen, hanya membaca
  if (!email) {
    const daftar = await prisma.admin.findMany({
      select: { id: true, nama: true, email: true, role: true },
    });
    if (daftar.length === 0) {
      console.log("Tabel admins kosong. Coba jalankan: npm run db:seed:dev");
      return;
    }
    console.table(daftar);
    return;
  }

  // Mode reset
  if (!lokal && !sudahYakin) {
    throw new Error(
      `Database "${db.host}" bukan lokal. Kalau ini memang database development, ulangi dengan --yes di akhir perintah.`
    );
  }
  if (!sandiBaru || sandiBaru.length < MIN_PANJANG_SANDI) {
    throw new Error(`Kata sandi baru wajib diisi dan minimal ${MIN_PANJANG_SANDI} karakter`);
  }

  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) {
    throw new Error(`Admin dengan email "${email}" tidak ditemukan. Jalankan tanpa argumen untuk melihat daftar.`);
  }

  await prisma.admin.update({
    where: { id: admin.id },
    data: { passwordHash: await hashPassword(sandiBaru) },
  });

  // Semua sesi lama admin ini dicabut supaya login lama tidak tetap berlaku
  const sesi = await prisma.sesiLogin.updateMany({
    where: { adminId: admin.id, dicabut: false },
    data: { dicabut: true },
  });

  console.log(`Kata sandi admin "${admin.nama}" (${admin.email}) berhasil direset.`);
  console.log(`${sesi.count} sesi login lama dicabut.`);
  console.log("Setelah berhasil masuk, ganti kata sandi sementara ini lewat menu pengaturan dashboard.");
}

main()
  .catch((e: unknown) => {
    console.error(e instanceof Error ? e.message : e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());