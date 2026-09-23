import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parseBody, forgotPasswordSchema } from "@/lib/validasi";
import { normalisasiNoWa, buatResetTokenCustomer } from "@/lib/auth";
import { cekRateLimitLogin } from "@/lib/auth/rate-limit";
import { kirimNotifikasiWa } from "@/lib/notifikasi";

export async function POST(req: NextRequest) {
  const parsed = await parseBody(req, forgotPasswordSchema);
  if ("error" in parsed) return parsed.error;

  const noWaNormal = normalisasiNoWa(parsed.data.noWa);

  // Rate limit juga di sini — endpoint ini bisa disalahgunakan untuk
  // spam WA ke satu nomor kalau tidak dibatasi.
  const limit = await cekRateLimitLogin(`forgot-password:${noWaNormal}`);
  if (!limit.diizinkan) {
    return NextResponse.json(
      { error: "Terlalu banyak percobaan, coba lagi beberapa menit lagi" },
      { status: 429 }
    );
  }

  const customer = await prisma.customer.findUnique({ where: { noWa: noWaNormal } });

  // Respons SAMA baik nomor terdaftar atau tidak — endpoint ini tidak boleh
  // bisa dipakai untuk mengecek nomor mana saja yang jadi customer terdaftar.
  if (customer) {
    const token = await buatResetTokenCustomer(customer.id);
    const link = `${process.env.APP_URL ?? ""}/reset-password?token=${token}`;

    // Kirim WA SETELAH token sudah ter-commit ke DB (prinsip README: panggilan
    // eksternal selalu di luar/setelah transaksi, bukan di dalamnya).
    await kirimNotifikasiWa(
      noWaNormal,
      `Halo ${customer.nama}, klik link berikut untuk reset password (berlaku 1 jam): ${link}`
    );
  }

  return NextResponse.json({
    message: "Kalau nomor terdaftar, link reset password sudah dikirim via WhatsApp",
  });
}
