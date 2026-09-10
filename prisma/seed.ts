import { PrismaClient, AdminRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";

const prisma = new PrismaClient();

async function main() {
  // --- Kategori awal ---
  const namaKategoriAwal = ["Tas", "Sepatu", "Aksesoris", "Elektronik", "Lainnya"];

  for (const nama of namaKategoriAwal) {
    await prisma.kategori.upsert({
      where: { id: `seed-${nama.toLowerCase()}` },
      update: {},
      create: { id: `seed-${nama.toLowerCase()}`, namaKategori: nama },
    });
  }
  console.log(`✓ ${namaKategoriAwal.length} kategori awal tersedia`);

  // --- Admin OWNER pertama ---
  const emailAdmin = "admin@jastipchina.local";
  const adminSudahAda = await prisma.admin.findUnique({ where: { email: emailAdmin } });

  if (adminSudahAda) {
    console.log("✓ Akun admin sudah ada, tidak dibuat ulang");
    return;
  }

  const passwordAcak = crypto.randomBytes(9).toString("base64url"); // 12 karakter acak
  const passwordHash = await bcrypt.hash(passwordAcak, 12);

  await prisma.admin.create({
    data: {
      nama: "Owner",
      noWa: "081200000000",
      email: emailAdmin,
      passwordHash,
      role: AdminRole.OWNER,
    },
  });

  console.log("✓ Akun admin OWNER pertama dibuat:");
  console.log(`  Email    : ${emailAdmin}`);
  console.log(`  Password : ${passwordAcak}`);
  console.log("  -> GANTI PASSWORD INI SEGERA setelah login pertama kali.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
