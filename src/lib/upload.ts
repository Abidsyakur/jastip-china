import { api } from "./api-client";

const TIPE_DIIZINKAN = ["image/jpeg", "image/png", "image/webp"];
const MAKS_BYTES = 5 * 1024 * 1024; // 5MB — sama dengan validasi backend

export type TujuanUpload = "produk" | "bukti-transfer" | "referensi-po" | "bukti-komplain";

// Upload 1 gambar: validasi lokal -> minta presigned URL -> PUT ke R2.
// Kembalikan publicUrl untuk disimpan ke backend. PDF tidak didukung backend
// (cuma JPEG/PNG/WebP) — jangan tawarkan PDF di UI.
export async function unggahGambar(file: File, tujuan: TujuanUpload): Promise<string> {
  if (!TIPE_DIIZINKAN.includes(file.type)) {
    throw new Error("File harus JPG, PNG, atau WebP");
  }
  if (file.size > MAKS_BYTES) {
    throw new Error("Ukuran file maksimal 5MB");
  }
  const { uploadUrl, publicUrl } = await api<{ uploadUrl: string; publicUrl: string }>(
    "/api/upload",
    {
      method: "POST",
      body: { namaFile: file.name, tipeFile: file.type, ukuranBytes: file.size, tujuan },
    }
  );
  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });
  if (!res.ok) throw new Error("Gagal upload file, coba lagi");
  return publicUrl;
}
