// Contoh: src/app/api/pesanan/route.ts
// Cara pasang skema Zod ke route handler yang sudah ada.

import { checkoutSchema, parseBody } from "@/lib/validasi";

export async function POST(req: Request) {
  // --- SEBELUM (validasi manual) ---
  // const body = await req.json();
  // if (!body.alamatId || typeof body.alamatId !== "string") {
  //   return NextResponse.json({ error: "alamatId wajib diisi" }, { status: 400 });
  // }
  // if (!Array.isArray(body.keranjangItemIds) || body.keranjangItemIds.length === 0) {
  //   return NextResponse.json({ error: "Pilih minimal 1 item" }, { status: 400 });
  // }
  // ...dst untuk setiap field, gampang ada yang kelewat

  // --- SESUDAH (Zod) ---
  const parsed = await parseBody(req, checkoutSchema);
  if ("error" in parsed) return parsed.error; // langsung 400 + detail per field, format seragam

  const { alamatId, keranjangItemIds, preferensiKurir } = parsed.data;
  // alamatId dijamin cuid valid, keranjangItemIds dijamin array cuid minimal 1,
  // preferensiKurir dijamin string tidak kosong — semua sudah typed otomatis
  // dari ReturnType Zod (CheckoutInput), tidak perlu declare interface terpisah.

  // ... lanjut proses checkout: cek stok, snapshot harga, insert Pesanan + PesananItem,
  // kirim notifikasi WA DI LUAR prisma.$transaction sesuai prinsip di README.

  return Response.json({ message: "Checkout berhasil (contoh)" });
}
