// letak: src/app/api/admin/rekening/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parseBody, updateRekeningSchema } from "@/lib/validasi";
import { wajibAdmin } from "@/lib/auth";
import { tanganiErrorAuth } from "@/lib/http-error";

interface Konteks {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: Konteks) {
  try {
    await wajibAdmin(req);
    const { id } = await params;

    const parsed = await parseBody(req, updateRekeningSchema);
    if ("error" in parsed) return parsed.error;

    // updateMany (bukan update) supaya id yang tidak ada = 404 yang jelas,
    // bukan 500 dari Prisma P2025 — pola ini dipakai juga di modul stok.
    const hasil = await prisma.rekeningBank.updateMany({ where: { id }, data: parsed.data });
    if (hasil.count === 0) {
      return NextResponse.json({ error: "Rekening tidak ditemukan" }, { status: 404 });
    }

    const rekening = await prisma.rekeningBank.findUnique({ where: { id } });
    return NextResponse.json({ message: "Rekening diperbarui", rekening });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}

export async function DELETE(req: NextRequest, { params }: Konteks) {
  try {
    await wajibAdmin(req);
    const { id } = await params;

    // Hard delete aman: tidak ada tabel lain yang mereferensikan rekening
    // (Pembayaran.metode cuma string bebas — lihat catatan di schema.prisma).
    // Riwayat pembayaran lama tidak rusak karena tidak menyimpan FK ke sini.
    const hasil = await prisma.rekeningBank.deleteMany({ where: { id } });
    if (hasil.count === 0) {
      return NextResponse.json({ error: "Rekening tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ message: "Rekening dihapus" });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}
