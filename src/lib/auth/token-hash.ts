import crypto from "node:crypto";

/**
 * Token acak yang aman secara kriptografis, di-encode base64url supaya aman
 * dipakai langsung di URL atau cookie tanpa perlu escaping tambahan.
 */
export function buatTokenAcak(panjangByte = 32): string {
  return crypto.randomBytes(panjangByte).toString("base64url");
}

/**
 * Hash satu arah (SHA-256) untuk token yang disimpan di DB (refresh token,
 * reset password token). Kalau DB bocor, token mentah tidak bisa
 * direkonstruksi dari hash-nya — beda dari password yang butuh bcrypt
 * (lambat & bergaram), token acak ini sudah punya entropi tinggi sendiri
 * jadi SHA-256 polos sudah cukup dan jauh lebih cepat untuk lookup di DB.
 */
export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}