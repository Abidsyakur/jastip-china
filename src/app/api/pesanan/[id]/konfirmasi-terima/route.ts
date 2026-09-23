// letak: src/app/api/pesanan/[id]/konfirmasi-terima/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { wajibCustomer } from "@/lib/auth";
import { tanganiErrorAuth, tanganiAppError } from "@/lib/http-error";
import { StatusPesanan } from "@prisma/client";

interface Konteks {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, { params }: Konteks) {
  try {
    const user = await wajibCustomer(req);
    const { id } = await params;

    // Cek ownership + status harus TIBA_KIRIM_LOKAL
    const pesanan = await prisma.pesanan.findUnique({
      where: { id },
      select: { customerId: true, statusPesanan: true },
    });

    if (!pesanan || pesanan.customerId !== user.sub) {
      return NextResponse.json({ error: "Pesanan tidak ditemukan" }, { status: 404 });
    }

    if (pesanan.statusPesanan !== StatusPesanan.TIBA_KIRIM_LOKAL) {
      return NextResponse.json(
        { error: "Konfirmasi hanya bisa dilakukan saat status 'Di Tangan Kurir'" },
        { status: 409 }
      );
    }

    // Update status ke SUDAH_SAMPAI + catat di log
    await prisma.pesanan.update({
      where: { id },
      data: {
        statusPesanan: StatusPesanan.SUDAH_SAMPAI,
        statusLog: {
          create: { status: StatusPesanan.SUDAH_SAMPAI },
        },
      },
    });

    return NextResponse.json({ message: "Pesanan dikonfirmasi selesai" });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    const resApp = tanganiAppError(err);
    if (resApp) return resApp;
    throw err;
  }
}
