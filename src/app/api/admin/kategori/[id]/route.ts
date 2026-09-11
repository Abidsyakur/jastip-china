// letak: src/app/api/admin/kategori/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { parseBody, kategoriUpdateSchema } from "@/lib/validasi";
import { wajibAdmin } from "@/lib/auth";
import { tanganiErrorAuth } from "@/lib/http-error";

interface Konteks {
  // Next.js 15: params jadi Promise, bukan objek langsung — wajib di-await
  // di dalam handler, tidak bisa dipakai langsung dari destructuring.
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: Konteks) {
  try {
    await wajibAdmin(req);
    const { id } = await params;

    const parsed = await parseBody(req, kategoriUpdateSchema);
    if ("error" in parsed) return parsed.error;

    const kategori = await prisma.kategori.update({ where: { id }, data: parsed.data });
    return NextResponse.json({ message: "Kategori diperbarui", kategori });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      return NextResponse.json({ error: "Kategori tidak ditemukan" }, { status: 404 });
    }
    throw err;
  }
}

export async function DELETE(req: NextRequest, { params }: Konteks) {
  try {
    await wajibAdmin(req);
    const { id } = await params;

    await prisma.kategori.delete({ where: { id } });
    return NextResponse.json({ message: "Kategori dihapus" });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        return NextResponse.json({ error: "Kategori tidak ditemukan" }, { status: 404 });
      }
      if (err.code === "P2003") {
        // Kategori masih dipakai produk — Kategori.produk relation tanpa onDelete,
        // Postgres tolak dengan FK constraint. Pesan ini yang tampil ke admin.
        return NextResponse.json(
          { error: "Kategori masih dipakai produk lain, tidak bisa dihapus" },
          { status: 409 }
        );
      }
    }
    throw err;
  }
}