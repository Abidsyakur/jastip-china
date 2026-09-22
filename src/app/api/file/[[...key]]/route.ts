// letak: src/app/api/file/[...key]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ambilDariR2 } from "@/lib/r2";

// Proxy baca file R2 via domain sendiri (publik, tanpa login — gambar produk
// memang publik). Alasan: sebagian browser gagal TLS ke
// *.r2.cloudflarestorage.com, jadi <img> langsung ke R2 bisa blank.
// Prefix di-whitelist supaya endpoint ini tidak jadi proxy terbuka.
const PREFIX_DIIZINKAN = ["produk/", "bukti-transfer/", "referensi-po/", "bukti-komplain/", "diag/"];

interface Konteks {
  params: Promise<{ key?: string[] }>;
}

export async function GET(_req: NextRequest, { params }: Konteks) {
  const { key } = await params;
  const path = (key ?? []).join("/");

  if (!PREFIX_DIIZINKAN.some((p) => path.startsWith(p)) || path.includes("..")) {
    return NextResponse.json({ error: "File tidak ditemukan" }, { status: 404 });
  }

  const file = await ambilDariR2(path);
  if (!file) {
    return NextResponse.json({ error: "File tidak ditemukan" }, { status: 404 });
  }

  return new NextResponse(new Uint8Array(file.isi), {
    headers: {
      "Content-Type": file.tipeKonten,
      // Key mengandung UUID acak = immutable, cache lama aman.
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
