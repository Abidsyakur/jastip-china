import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parseBody, registerSchema } from "@/lib/validasi";
import { hashPassword, normalisasiNoWa } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const parsed = await parseBody(req, registerSchema);
  if ("error" in parsed) return parsed.error;

  const { nama, noWa, email, password } = parsed.data;
  const noWaNormal = normalisasiNoWa(noWa);

  const sudahAda = await prisma.customer.findUnique({ where: { noWa: noWaNormal } });
  if (sudahAda) {
    return NextResponse.json({ error: "Nomor WhatsApp sudah terdaftar" }, { status: 409 });
  }

  const passwordHash = await hashPassword(password);
  const customer = await prisma.customer.create({
    data: { nama, noWa: noWaNormal, email, passwordHash },
  });

  return NextResponse.json(
    { message: "Registrasi berhasil, silakan login", customerId: customer.id },
    { status: 201 }
  );
}
