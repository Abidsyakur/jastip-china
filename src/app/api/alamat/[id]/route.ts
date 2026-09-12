// letak: src/app/api/alamat/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { parseBody, alamatUpdateSchema } from "@/lib/validasi";
import { wajibCustomer } from "@/lib/auth";
import { tanganiErrorAuth } from "@/lib/http-error";

interface Konteks {
  // Next.js 15: params jadi Promise, bukan objek langsung
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: Konteks) {
  try {
    const user = await wajibCustomer(req);
    const { id } = await params;

    const alamatAda = await prisma.alamat.findUnique({ where: { id } });
    // "Tidak ditemukan" untuk DUA kasus (tidak ada ATAU milik customer lain) —
    // endpoint ini tidak boleh bisa dipakai menebak-nebak ID alamat orang lain.
    if (!alamatAda || alamatAda.customerId !== user.sub) {
      return NextResponse.json({ error: "Alamat tidak ditemukan" }, { status: 404 });
    }

    const parsed = await parseBody(req, alamatUpdateSchema);
    if ("error" in parsed) return parsed.error;

    const alamat = await prisma.alamat.update({ where: { id }, data: parsed.data });
    return NextResponse.json({ message: "Alamat diperbarui", alamat });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}

export async function DELETE(req: NextRequest, { params }: Konteks) {
  try {
    const user = await wajibCustomer(req);
    const { id } = await params;

    const alamatAda = await prisma.alamat.findUnique({ where: { id } });
    if (!alamatAda || alamatAda.customerId !== user.sub) {
      return NextResponse.json({ error: "Alamat tidak ditemukan" }, { status: 404 });
    }

    await prisma.alamat.delete({ where: { id } });
    return NextResponse.json({ message: "Alamat dihapus" });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2003") {
      // Alamat.id direferensikan Pesanan (alamatId wajib, tanpa onDelete -> RESTRICT
      // di Postgres) — alamat yang sudah pernah dipakai checkout tidak bisa dihapus,
      // supaya riwayat pesanan lama tetap utuh.
      return NextResponse.json(
        { error: "Alamat ini sudah pernah dipakai di pesanan, tidak bisa dihapus" },
        { status: 409 }
      );
    }
    throw err;
  }
}