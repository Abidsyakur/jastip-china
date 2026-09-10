import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parseBody, resetPasswordSchema } from "@/lib/validasi";
import {
  hashPassword,
  verifikasiResetTokenCustomer,
  tandaiResetTokenTerpakai,
  cabutSemuaSesiCustomer,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  const parsed = await parseBody(req, resetPasswordSchema);
  if ("error" in parsed) return parsed.error;

  const { token, passwordBaru } = parsed.data;

  const resetToken = await verifikasiResetTokenCustomer(token);
  if (!resetToken || !resetToken.customerId) {
    return NextResponse.json({ error: "Token tidak valid atau sudah kedaluwarsa" }, { status: 400 });
  }

  // Tandai terpakai secara atomik SEBELUM update password — kalau ada dua
  // request bersamaan dengan token identik, yang kalah di sini langsung
  // berhenti (count === 0), tidak sampai dua-duanya ganti password.
  const hasil = await tandaiResetTokenTerpakai(resetToken.id);
  if (hasil.count === 0) {
    return NextResponse.json({ error: "Token sudah dipakai" }, { status: 400 });
  }

  const passwordHash = await hashPassword(passwordBaru);
  await prisma.customer.update({
    where: { id: resetToken.customerId },
    data: { passwordHash },
  });

  // Password baru saja diganti — cabut semua sesi lama (device lain, kalau ada)
  // supaya kalau alasan reset ini karena akun dicurigai bocor, sesi lama langsung mati.
  await cabutSemuaSesiCustomer(resetToken.customerId);

  return NextResponse.json({ message: "Password berhasil diubah, silakan login" });
}
