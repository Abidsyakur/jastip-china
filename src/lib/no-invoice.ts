// letak: src/lib/no-invoice.ts
import crypto from "node:crypto";

/**
 * Format: INV-YYYYMMDD-XXXXXXXX (8 hex acak). Peluang tabrakan di hari yang
 * sama sangat kecil (~1 banding 4 miliar), tapi tetap dilindungi @unique di
 * schema — pemanggil (checkout) sebaiknya retry sekali kalau kena P2002,
 * bukan mengasumsikan ini 100% unik tanpa jaring pengaman DB.
 */
export function buatNoInvoice(): string {
  const tanggal = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const acak = crypto.randomBytes(4).toString("hex").toUpperCase();
  return `INV-${tanggal}-${acak}`;
}