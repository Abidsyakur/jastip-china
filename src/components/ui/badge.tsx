import React from "react";

// Label tampil kalimat alami; enum kode cuma di API. Warna tetap di palet.
const INFO_STATUS: Record<string, { label: string; kelas: string }> = {
  MENUNGGU_PEMBAYARAN: { label: "Menunggu Pembayaran", kelas: "bg-gold text-white" },
  DIPROSES_ADMIN: { label: "Diproses Admin", kelas: "bg-brand text-white" },
  DIKONSOLIDASI_KIRIM: { label: "Dikonsolidasi Kirim", kelas: "bg-ink text-white" },
  TIBA_KIRIM_LOKAL: { label: "Tiba di Gudang Lokal", kelas: "bg-jade text-white" },
  SELESAI: { label: "Sudah Sampai", kelas: "bg-jade text-white" },
  DIBATALKAN: { label: "Dibatalkan", kelas: "bg-merah-muda text-white" },
  MENUNGGU_BUKTI: { label: "Menunggu Bukti", kelas: "bg-gold text-white" },
  MENUNGGU_VERIFIKASI: { label: "Menunggu Verifikasi", kelas: "bg-gold text-white" },
  TERVERIFIKASI: { label: "Terverifikasi", kelas: "bg-jade text-white" },
  DITOLAK: { label: "Ditolak", kelas: "bg-merah-muda text-white" },
  KADALUARSA: { label: "Kadaluwarsa", kelas: "bg-ink-muda text-white" },
  MENUNGGU_REVIEW: { label: "Menunggu Review", kelas: "bg-gold text-white" },
  DIKONFIRMASI_HARGA: { label: "Dikonfirmasi Harga", kelas: "bg-jade text-white" },
  SUDAH_JADI_PESANAN: { label: "Sudah Jadi Pesanan", kelas: "bg-jade text-white" },
  DIAJUKAN: { label: "Diajukan", kelas: "bg-brand text-white" },
  DIPROSES: { label: "Diproses", kelas: "bg-gold text-white" },
  AKTIF: { label: "Aktif", kelas: "bg-jade text-white" },
  NONAKTIF: { label: "Nonaktif", kelas: "bg-ink-muda text-white" },
};

export function Badge({ status }: { status: string }) {
  const info = INFO_STATUS[status] ?? { label: status, kelas: "bg-ink-muda text-white" };
  return (
    <span className={`inline-block rounded-md px-3 py-1 text-xs font-medium ${info.kelas}`}>
      {info.label}
    </span>
  );
}

// Badge generik untuk label bebas (kategori, stok, dsb).
export function Tag({
  children,
  tone = "netral",
}: {
  children: React.ReactNode;
  tone?: "netral" | "gold" | "brand" | "jade" | "red";
}) {
  const kelas = {
    netral: "bg-krim text-ink-muda",
    gold: "bg-gold text-white",
    brand: "bg-brand text-white",
    jade: "bg-jade text-white",
    red: "bg-merah-muda text-white",
  }[tone];
  return (
    <span className={`inline-block rounded-md px-3 py-1 text-xs font-medium ${kelas}`}>
      {children}
    </span>
  );
}
