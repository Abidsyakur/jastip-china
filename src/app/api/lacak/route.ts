// letak: src/app/api/lacak/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parseQuery, lacakQuerySchema } from "@/lib/validasi";
import { cekRateLimitLacak } from "@/lib/auth/rate-limit";

// Lacak publik — tanpa login (dibaca halaman /lacak +deep-link WA).
// Respons minimal: TANPA nominal, alamat, identitas customer.
// Rate limit 20/menit per IP: endpoint ini satu-satunya pintu membaca
// data pesanan tanpa login, tanpa limit bisa dipakai enumerasi invoice
// (scanner probing ratusan nomor untuk memetakan aktivitas toko).
export async function GET(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const limit = await cekRateLimitLacak(`lacak:${ip}`);
  if (!limit.diizinkan) {
    return NextResponse.json(
      { error: "Terlalu banyak percobaan, coba lagi sebentar." },
      { status: 429 }
    );
  }

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
