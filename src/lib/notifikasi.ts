// letak: src/lib/notifikasi.ts
import type { Prisma } from "@prisma/client";
import { NOMOR_WA_ADMIN } from "@/lib/const";

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

export async function beritahuAdmin(pesan: string): Promise<void> {
  await kirimNotifikasiWa(NOMOR_WA_ADMIN, pesan);
}

const TELEGRAM_API_URL = "https://api.telegram.org";

/**
 * Kirim pesan ke Telegram (Bot API) — channel monitoring untuk ADMIN,
 * paralel dengan WA yang fokusnya customer. Prinsip sama dengan
 * kirimNotifikasiWa: SELALU dipanggil DI LUAR prisma.$transaction, gagal
 * kirim TIDAK melempar error ke pemanggil (cukup di-log) — jangan sampai
 * request utama dianggap gagal cuma karena notifikasi tidak terkirim.
 *
 * Env: TELEGRAM_BOT_TOKEN (dari @BotFather) + TELEGRAM_CHAT_ID (dari
 * @userinfobot / getUpdates). Belum diisi = dilewati dengan warning,
 * bukan crash — supaya fitur ini bisa di-rollback aman.
 */
export async function kirimTelegram(pesan: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.warn("[notifikasi] TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID belum diisi, notifikasi Telegram dilewati");
    return;
  }

  try {
    const res = await fetch(`${TELEGRAM_API_URL}/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: pesan }),
    });

    if (!res.ok) {
      console.error(`[notifikasi] Telegram membalas ${res.status}: ${await res.text()}`);
    }
  } catch (err) {
    console.error("[notifikasi] Gagal memanggil Telegram:", err);
  }
}

/** Notifikasi Telegram ke admin — pemanggilan sama seperti beritahuAdmin. */
export async function beritahuAdminTelegram(pesan: string): Promise<void> {
  await kirimTelegram(pesan);
}

/** Kirim WA + Telegram SEKALIGUS (Promise.all, parallel — tidak saling menunggu). */
export async function beritahuAdminSemuaChannel(pesan: string): Promise<void> {
  await Promise.all([
    kirimNotifikasiWa(NOMOR_WA_ADMIN, pesan),
    kirimTelegram(pesan),
  ]);
}