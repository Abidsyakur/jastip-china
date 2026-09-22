// letak: src/lib/r2.ts
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const UMUR_PRESIGNED_URL_DETIK = 5 * 60; // 5 menit — cukup untuk upload langsung dari browser

let client: S3Client | null = null;

function getR2Client(): S3Client {
  // Lazy — supaya modul ini aman di-import di mana pun tanpa langsung butuh
  // R2_* env var ter-set saat build.
  if (!client) {
    client = new S3Client({
      region: "auto",
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID ?? "",
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? "",
      },
    });
  }
  return client;
}

/** Presigned URL PUT — client upload LANGSUNG ke R2 dari browser, tidak lewat server kita sama sekali. */
export async function buatPresignedUploadUrl(key: string, contentType: string): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });
  return getSignedUrl(getR2Client(), command, { expiresIn: UMUR_PRESIGNED_URL_DETIK });
}

/** URL publik untuk akses file setelah berhasil diupload (R2_PUBLIC_URL = custom domain/dev URL bucket). */
export function buatUrlPublik(key: string): string {
  return `${process.env.R2_PUBLIC_URL ?? ""}/${key}`;
}

/**
 * Upload buffer LANGSUNG dari server (dipakai POST /api/upload/file).
 * Alasan ada dua jalur upload (lihat catatan di route itu): browser di
 * lapangan gagal TLS handshake ke *.r2.cloudflarestorage.com
 * (ERR_SSL_VERSION_OR_CIPHER_MISMATCH), jadi PUT langsung dari browser
 * tidak bisa diandalkan untuk market Indonesia.
 */
export async function unggahBufferKeR2(key: string, isi: Buffer, tipeKonten: string): Promise<void> {
  await getR2Client().send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      Body: isi,
      ContentType: tipeKonten,
    })
  );
}

/** Ambil file untuk di-proxy lewat /api/file (same-origin, aman dari masalah TLS R2 di browser). */
export async function ambilDariR2(key: string): Promise<{ isi: Buffer; tipeKonten: string } | null> {
  try {
    const res = await getR2Client().send(
      new GetObjectCommand({ Bucket: process.env.R2_BUCKET_NAME, Key: key })
    );
    if (!res.Body) return null;
    const isi = Buffer.from(await res.Body.transformToByteArray());
    return { isi, tipeKonten: res.ContentType ?? "application/octet-stream" };
  } catch {
    return null;
  }
}