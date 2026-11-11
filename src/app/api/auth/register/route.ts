import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parseBody, registerSchema } from "@/lib/validasi";
import { hashPassword, normalisasiNoWa } from "@/lib/auth";
import { cekRateLimitRegister } from "@/lib/auth/rate-limit";

/** Pelanggaran unique constraint Prisma (nomor WA atau email sudah dipakai, termasuk saat dua registrasi bersamaan). */
function adalahDuplikat(err: unknown): boolean {
  return typeof err === "object" && err !== null && (err as { code?: unknown }).code === "P2002";
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const limit = await cekRateLimitRegister(ip);
  if (!limit.diizinkan) {
    return NextResponse.json(
      { error: "Terlalu banyak percobaan registrasi dari IP ini, coba lagi nanti." },
      { status: 429 }
    );
  }

  const parsed = await parseBody(req, registerSchema);
  if ("error" in parsed) return parsed.error;

  const { nama, noWa, email, password } = parsed.data;
  const noWaNormal = normalisasiNoWa(noWa);

  const sudahAda = await prisma.customer.findUnique({ where: { noWa: noWaNormal } });
  if (sudahAda) {
    return NextResponse.json({ error: "Nomor WhatsApp sudah terdaftar" }, { status: 409 });
  }

  const passwordHash = await hashPassword(password);

  let customer;
  try {
    customer = await prisma.customer.create({
      data: { nama, noWa: noWaNormal, email, passwordHash },
    });
  } catch (err) {
    // Email juga unique (selain noWa), dan dua registrasi bersamaan bisa lolos
    // pengecekan di atas. Tanpa penanganan ini hasilnya 500, bukan 409.
    if (adalahDuplikat(err)) {
      return NextResponse.json({ error: "Nomor WhatsApp atau email sudah terdaftar" }, { status: 409 });
    }
    throw err;
  }

  return NextResponse.json(
    { message: "Registrasi berhasil, silakan login", customerId: customer.id },
    { status: 201 }
  );
}