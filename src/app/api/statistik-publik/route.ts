// letak: src/app/api/statistik-publik/route.ts
import { NextResponse } from "next/server";
import { StatusPesanan } from "@prisma/client";
import { prisma } from "@/lib/db";

// Publik (tanpa login) — angka agregat untuk halaman Tentang Kami.
// Sengaja TIDAK pakai /api/admin/dashboard/statistik: itu butuh login admin
// dan isinya data operasional sensitif (omzet, antrean verifikasi).
// Rating kepuasan TIDAK ada di sini — belum ada sumber datanya di DB
// (tidak ada tabel ulasan), jadi frontend tampilkan placeholder/TODO.
export async function GET() {
  const [pesananTerkirim, grupCustomer] = await Promise.all([
    prisma.pesanan.count({ where: { statusPesanan: StatusPesanan.SUDAH_SAMPAI } }),
    prisma.pesanan.groupBy({
      by: ["customerId"],
      where: { statusPesanan: { not: StatusPesanan.DIBATALKAN } },
    }),
  ]);

  return NextResponse.json({
    pesananTerkirim,
    customerAktif: grupCustomer.length,
  });
}
