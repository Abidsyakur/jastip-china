// Bentuk rupiah Indonesia: 282000 -> "Rp 282.000". Terima number/Decimal-string.
export function rupiah(n: number | string): string {
  const angka = typeof n === "string" ? Number(n) : n;
  if (!Number.isFinite(angka)) return "Rp 0";
  return "Rp " + new Intl.NumberFormat("id-ID").format(Math.round(angka));
}

// "20 Jan 2024" — konsisten dengan copy mockup.
export function formatTanggal(d: Date | string): string {
  const t = typeof d === "string" ? new Date(d) : d;
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(t);
}

// "20 Jan 2024, 19:45 WIB"
export function formatTanggalWaktu(d: Date | string): string {
  const t = typeof d === "string" ? new Date(d) : d;
  return (
    new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(t) + " WIB"
  );
}

// Potong teks + ellipsis: potong("Tas Backpack Premium", 12) -> "Tas Backpack..."
export function potong(s: string, max: number): string {
  if (s.length <= max) return s;
  return s.slice(0, max).trimEnd() + "...";
}
