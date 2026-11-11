// letak: src/app/api/pesanan/[id]/konfirmasi-terima/route.ts
import { NextRequest, NextResponse } from "next/server";
import { StatusPesanan, type Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { wajibCustomer } from "@/lib/auth";
import { tanganiErrorAuth, tanganiAppError } from "@/lib/http-error";

interface Konteks {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, { params }: Konteks) {
  try {
    const user = await wajibCustomer(req);
    const { id } = await params;

    // Cek ownership + status harus TIBA_KIRIM_LOKAL (untuk pesan 404/409 yang jelas)
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

    // Penulisan ATOMIK: syarat status ditaruh di WHERE, bukan hanya dicek di atas.
    // Dua klik/permintaan bersamaan: hanya satu yang menang (count 1); yang lain
    // mendapat count 0 dan ditolak, sehingga log SELESAI tidak tertulis ganda.
    const berhasil = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const hasil = await tx.pesanan.updateMany({
        where: { id, customerId: user.sub, statusPesanan: StatusPesanan.TIBA_KIRIM_LOKAL },
        data: { statusPesanan: StatusPesanan.SELESAI },
      });
      if (hasil.count === 0) return false;

      await tx.pesananStatusLog.create({
        data: { pesananId: id, status: StatusPesanan.SELESAI },
      });
      return true;
    });

    if (!berhasil) {
      return NextResponse.json(
        { error: "Status pesanan sudah berubah, muat ulang halaman lalu coba lagi" },
        { status: 409 }
      );
    }

    return NextResponse.json({ message: "Pesanan dikonfirmasi selesai" });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    const resApp = tanganiAppError(err);
    if (resApp) return resApp;
    throw err;
  }
}