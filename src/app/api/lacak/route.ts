// letak: src/app/api/lacak/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parseQuery, lacakQuerySchema } from "@/lib/validasi";

// Lacak publik — tanpa login (dibaca halaman /lacak +deep-link WA).
// Respons minimal: TANPA nominal, alamat, identitas customer.
export async function GET(req: NextRequest) {
  const parsed = parseQuery(req.nextUrl.searchParams, lacakQuerySchema);
  if ("error" in parsed) return parsed.error;

  const pesanan = await prisma.pesanan.findUnique({
    where: { noInvoice: parsed.data.invoice.trim().toUpperCase() },
    select: {
      noInvoice: true,
      statusPesanan: true,
      tglPesan: true,
      statusLog: { select: { status: true, waktu: true }, orderBy: { waktu: "asc" } },
      pengiriman: { select: { kurir: true, noResi: true } },
    },
  });

  if (!pesanan) {
    return NextResponse.json({ error: "Pesanan tidak ditemukan, cek lagi nomor invoice kamu" }, { status: 404 });
  }

  return NextResponse.json({ pesanan });
}
