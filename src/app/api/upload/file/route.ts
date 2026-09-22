// letak: src/app/api/upload/file/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { parseBody, requestUploadSchema } from "@/lib/validasi";
import { wajibLogin } from "@/lib/auth";
import { tanganiErrorAuth } from "@/lib/http-error";
import { unggahBufferKeR2 } from "@/lib/r2";

const MAKS_UKURAN_BYTES = 5 * 1024 * 1024; // 5MB — sama seperti presigned flow

// Upload VIA SERVER (multipart) — alternatif dari presigned PUT langsung.
// Kenapa dua jalur: browser di lapangan gagal TLS handshake ke
// *.r2.cloudflarestorage.com (ERR_SSL_VERSION_OR_CIPHER_MISMATCH, terbukti
// dari console customer + mesin dev), jadi PUT cross-origin ke R2 tidak bisa
// diandalkan. Jalur ini same-origin: browser cuma bicara ke domain kita,
// yang bicara ke R2 cuma server (jaringan datacenter, TLS normal).
// Frontend kompres gambar dulu (lib/upload.ts) supaya jauh di bawah batas
// body 4.5MB Vercel Hobby.
export async function POST(req: NextRequest) {
  try {
    const user = await wajibLogin(req);

    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "File wajib disertakan" }, { status: 400 });
    }

    // Validasi meta pakai skema yang SAMA dengan presigned flow — satu aturan.
    const parsed = await parseBody(
      new Request("http://localhost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          namaFile: file.name,
          tipeFile: file.type,
          ukuranBytes: file.size,
          tujuan: form.get("tujuan"),
        }),
      }),
      requestUploadSchema
    );
    if ("error" in parsed) return parsed.error;

    if (file.size > MAKS_UKURAN_BYTES) {
      return NextResponse.json({ error: "Ukuran file maksimal 5MB" }, { status: 400 });
    }

    const ekstensi = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
    const key = `${parsed.data.tujuan}/${user.tipe}-${user.sub}/${crypto.randomUUID()}.${ekstensi}`;

    await unggahBufferKeR2(key, Buffer.from(await file.arrayBuffer()), file.type);

    // URL same-origin (bukan R2 langsung) supaya <img> juga bebas masalah TLS.
    return NextResponse.json({ publicUrl: `/api/file/${key}` }, { status: 201 });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}
