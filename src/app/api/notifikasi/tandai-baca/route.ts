// letak: src/app/api/notifikasi/tandai-baca/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parseBody, tandaiBacaSchema } from "@/lib/validasi";
import { wajibCustomer } from "@/lib/auth";
import { tanganiErrorAuth } from "@/lib/http-error";

export async function PATCH(req: NextRequest) {
  try {
    const user = await wajibCustomer(req);

    const parsed = await parseBody(req, tandaiBacaSchema);
    if ("error" in parsed) return parsed.error;
    const { notifikasiIds } = parsed.data;

    // where selalu di-scope ke customerId yang login DULU, baru optional
    // filter id — jadi customer TIDAK BISA menandai notifikasi milik orang
    // lain sebagai dibaca walau kebetulan tahu/nebak ID-nya.
    const hasil = await prisma.notifikasi.updateMany({
      where: {
        customerId: user.sub,
        ...(notifikasiIds && notifikasiIds.length > 0 ? { id: { in: notifikasiIds } } : {}),
      },
      data: { statusBaca: true },
    });

    return NextResponse.json({ message: "Notifikasi ditandai dibaca", jumlahDiupdate: hasil.count });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}