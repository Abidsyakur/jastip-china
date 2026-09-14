// letak: src/app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { parseBody, requestUploadSchema } from "@/lib/validasi";
import { wajibLogin } from "@/lib/auth";
import { tanganiErrorAuth } from "@/lib/http-error";
import { buatPresignedUploadUrl, buatUrlPublik } from "@/lib/r2";

const EKSTENSI_DARI_TIPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function POST(req: NextRequest) {
  try {
    // wajibLogin (bukan wajibCustomer/wajibAdmin) -- dua-duanya butuh upload file
    // (customer: bukti transfer/foto komplain/referensi PO, admin: foto produk).
    const user = await wajibLogin(req);

    const parsed = await parseBody(req, requestUploadSchema);
    if ("error" in parsed) return parsed.error;
    const { tipeFile, tujuan } = parsed.data;

    const ekstensi = EKSTENSI_DARI_TIPE[tipeFile] ?? "bin";
    // Key mengandung tipe+id user yang upload -- kalau perlu audit "siapa upload
    // file ini", tidak perlu tabel tambahan, tinggal baca dari path-nya.
    const key = `${tujuan}/${user.tipe}-${user.sub}/${crypto.randomUUID()}.${ekstensi}`;

    const uploadUrl = await buatPresignedUploadUrl(key, tipeFile);
    const publicUrl = buatUrlPublik(key);

    return NextResponse.json({ uploadUrl, publicUrl });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}