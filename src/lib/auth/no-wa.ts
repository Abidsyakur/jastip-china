/**
 * Normalisasi ke format 62xxxxxxxxxx (tanpa tanda +) — supaya "081234567890",
 * "6281234567890", dan "+62 812-3456-7890" semuanya dianggap nomor yang sama
 * baik saat registrasi (cek duplikat) maupun saat login (lookup).
 */
export function normalisasiNoWa(noWa: string): string {
  const bersih = noWa.trim().replace(/[\s-]/g, "");

  if (bersih.startsWith("+62")) return bersih.slice(1);
  if (bersih.startsWith("62")) return bersih;
  if (bersih.startsWith("0")) return `62${bersih.slice(1)}`;
  return bersih;
}