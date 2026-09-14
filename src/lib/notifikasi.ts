// letak: src/lib/notifikasi.ts
import type { Prisma } from "@prisma/client";

const FONNTE_API_URL = "https://api.fonnte.com/send";

/**
 * Simpan notifikasi in-app ke tabel Notifikasi. WAJIB dipanggil di DALAM
 * prisma.$transaction yang sama dengan aksi pemicunya (verifikasi
 * pembayaran, review PO, ubah status pesanan, tindak lanjut komplain) —
 * beda dari kirimNotifikasiWa yang justru WAJIB di luar/setelah transaksi.
 * Ini murni tulis DB, bukan panggilan eksternal, jadi aman ikut atomik.
 */
export function buatNotifikasi(
  tx: Prisma.TransactionClient,
  customerId: string,
  pesananId: string | null,
  pesan: string,
  tipe: string
) {
  return tx.notifikasi.create({ data: { customerId, pesananId, pesan, tipe } });
}


/**
 * Kirim pesan WA via Fonnte.
 *
 * PENTING (prinsip dari README): fungsi ini SELALU dipanggil DI LUAR
 * prisma.$transaction, dan SETELAH transaksi DB terkait sudah commit —
 * bukan di dalamnya. Kalau Fonnte down/lambat, itu tidak boleh membuat
 * transaksi DB ikut gagal atau nge-block.
 *
 * Gagal kirim WA TIDAK melempar error ke pemanggil — sengaja ditelan di
 * sini (cukup di-log) karena request utama pemanggil (reset password,
 * verifikasi pembayaran, dst) sudah berhasil dari sisi data; jangan sampai
 * itu dianggap gagal cuma karena notifikasi tidak terkirim.
 */
export async function kirimNotifikasiWa(noWaTujuan: string, pesan: string): Promise<void> {
  const token = process.env.FONNTE_API_TOKEN;
  if (!token) {
    console.warn("[notifikasi] FONNTE_API_TOKEN belum diisi, notifikasi WA dilewati");
    return;
  }

  try {
    const res = await fetch(FONNTE_API_URL, {
      method: "POST",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify({ target: noWaTujuan, message: pesan }),
    });

    if (!res.ok) {
      console.error(`[notifikasi] Fonnte membalas ${res.status}: ${await res.text()}`);
    }
  } catch (err) {
    console.error("[notifikasi] Gagal memanggil Fonnte:", err);
  }
}