// letak: src/app/api/auth/profil/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { parseBody, profilSchema } from "@/lib/validasi";
import { wajibCustomer } from "@/lib/auth";
import { tanganiErrorAuth } from "@/lib/http-error";

export async function GET(req: NextRequest) {
  try {
    const user = await wajibCustomer(req);

    const customer = await prisma.customer.findUnique({
      where: { id: user.sub },
      select: { nama: true, noWa: true, email: true, tglRegistrasi: true },
    });
    if (!customer) {
      return NextResponse.json({ error: "Akun tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ customer });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await wajibCustomer(req);

    const parsed = await parseBody(req, profilSchema);
    if ("error" in parsed) return parsed.error;

    try {
      const customer = await prisma.customer.update({
        where: { id: user.sub },
        data: parsed.data,
        select: { nama: true, noWa: true, email: true, tglRegistrasi: true },
      });
      return NextResponse.json({ message: "Profil diperbarui", customer });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
        return NextResponse.json({ error: "Email sudah dipakai akun lain" }, { status: 409 });
      }
      throw err;
    }
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}
