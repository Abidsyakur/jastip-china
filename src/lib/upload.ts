const TIPE_DIIZINKAN = ["image/jpeg", "image/png", "image/webp"];
const MAKS_BYTES = 5 * 1024 * 1024; // 5MB — sama dengan validasi backend
const MAKS_DIMENSI = 1920; // kompresi client menjaga file jauh di bawah batas body Vercel

export type TujuanUpload = "produk" | "bukti-transfer" | "referensi-po" | "bukti-komplain";

// Kecilkan gambar via canvas sebelum upload: aman untuk foto (bukti, produk,
// referensi, komplain), hasil selalu JPEG < 1MB. File kecil (<=1.5MB & sudah
// JPEG) dikirim apa adanya tanpa diproses ulang.
async function siapkanFile(file: File): Promise<{ blob: Blob; tipe: string }> {
  if (file.type === "image/jpeg" && file.size <= 1.5 * 1024 * 1024) {
    return { blob: file, tipe: file.type };
  }
  const bitmap = await createImageBitmap(file);
  const skala = Math.min(1, MAKS_DIMENSI / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * skala);
  canvas.height = Math.round(bitmap.height * skala);
  const ctx = canvas.getContext("2d");
  if (!ctx) return { blob: file, tipe: file.type };
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob: Blob | null = await new Promise((selesai) =>
    canvas.toBlob((b) => selesai(b), "image/jpeg", 0.85)
  );
  bitmap.close();
  if (!blob) return { blob: file, tipe: file.type };
  return { blob, tipe: "image/jpeg" };
}

// Upload 1 gambar VIA SERVER (POST /api/upload/file), bukan PUT langsung ke
// R2 — browser di lapangan gagal TLS ke *.r2.cloudflarestorage.com.
// Kembalikan publicUrl same-origin (/api/file/...) untuk disimpan ke backend.
export async function unggahGambar(file: File, tujuan: TujuanUpload): Promise<string> {
  if (!TIPE_DIIZINKAN.includes(file.type)) {
    throw new Error("File harus JPG, PNG, atau WebP");
  }
  if (file.size > MAKS_BYTES) {
    throw new Error("Ukuran file maksimal 5MB");
  }
  const { blob, tipe } = await siapkanFile(file);
  const form = new FormData();
  form.append("file", blob, file.name);
  form.append("tujuan", tujuan);

  const res = await fetch("/api/upload/file", {
    method: "POST",
    credentials: "include",
    body: form,
  });
  const data: unknown = await res.json().catch(() => ({}));
  if (!res.ok) {
    const pesan =
      typeof data === "object" && data !== null && "error" in data && typeof data.error === "string"
        ? data.error
        : "Gagal upload file, coba lagi";
    throw new Error(pesan);
  }
  const url =
    typeof data === "object" && data !== null && "publicUrl" in data ? String(data.publicUrl) : "";
  if (!url || !tipe) throw new Error("Gagal upload file, coba lagi");
  return url;
}
