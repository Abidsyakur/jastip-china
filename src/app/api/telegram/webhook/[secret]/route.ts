// letak: src/app/api/telegram/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { StatusPembayaran, StatusKomplain } from "@prisma/client";
import { prisma } from "@/lib/db";

/**
 * Webhook dua arah Telegram — bot jadi asisten monitoring admin dari HP.
 * Telegram memanggil endpoint ini SETIAP user chat ke bot; bot balas
 * perintah sederhana: /status, /laporan, /stok, /help.
 *
 * Keamanan:
 * - Secret token di path: setWebhook dipasang dengan URL yang mengandung
 *   CRON_SECRET (https://.../api/telegram/webhook/<CRON_SECRET>) — Telegram
 *   tidak pernah ekspos URL penuh, cuma balik ke sumber yang dipasang.
 *   Permintaan tanpa secret yang cocok = 403.
 * - Hanya balas chat private (bukan group/channel) — chat_id admin juga
 *   dicocokkan dengan TELEGRAM_CHAT_ID supaya orang lain yang kebetulan
 *   tahu URL tidak bisa menarik data.
 *
 * Data yang dibalas minimal & operasional: TIDAK ada data sensitif
 * customer (alamat, noWa, email) — cuma statistik & status.
 */
const WIB_OFFSET_MS = 7 * 60 * 60 * 1000;

interface TelegramUpdate {
  message?: {
    chat: { id: number; type: string };
    text?: string;
  };
}

async function balas(chatId: number, text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return;
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ secret: string }> }) {
  const { secret } = await params;
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 403 });
  }

  const update: TelegramUpdate = await req.json().catch(() => ({}));
  const msg = update.message;
  if (!msg?.text) return NextResponse.json({ ok: true });

  // Hanya chat private, dan cuma chat_id yang terdaftar (admin).
  if (msg.chat.type !== "private" || String(msg.chat.id) !== process.env.TELEGRAM_CHAT_ID) {
    return NextResponse.json({ ok: true });
  }

  const perintah = msg.text.trim().toLowerCase().split(/\s+/)[0];

  if (perintah === "/help" || perintah === "/start") {
    await balas(
      msg.chat.id,
      "Perintah tersedia:\n" +
        "/status — kondisi app + DB + statistik live\n" +
        "/laporan — laporan hari ini (omzet, pembayaran, komplain)\n" +
        "/stok — produk stok kritis / habis\n" +
        "/help — daftar perintah ini"
    );
    return NextResponse.json({ ok: true });
  }

  if (perintah === "/status") {
    let dbUp = true;
    try {
      await prisma.$queryRaw`SELECT 1`;
    } catch {
      dbUp = false;
    }
    const [customerAktif, pesananAktif, pembayaranNunggu, komplainAktif] = await Promise.all([
      prisma.customer.count(),
      prisma.pesanan.count({ where: { statusPesanan: { notIn: ["MENUNGGU_PEMBAYARAN", "DIBATALKAN"] } } }),
      prisma.pembayaran.count({ where: { status: StatusPembayaran.MENUNGGU_VERIFIKASI } }),
      prisma.komplain.count({ where: { status: { not: StatusKomplain.SELESAI } } }),
    ]);
    await balas(
      msg.chat.id,
      `🟢 Status Jastip China\n\n` +
        `App: OK\nDB: ${dbUp ? "OK" : "DOWN ⚠️"}\n\n` +
        `Customer: ${customerAktif}\n` +
        `Pesanan aktif: ${pesananAktif}\n` +
        `Pembayaran nunggu verifikasi: ${pembayaranNunggu}\n` +
        `Komplain belum selesai: ${komplainAktif}`
    );
    return NextResponse.json({ ok: true });
  }

  if (perintah === "/laporan") {
    const sekarangWib = new Date(Date.now() + WIB_OFFSET_MS);
    const awal = new Date(
      Date.UTC(sekarangWib.getUTCFullYear(), sekarangWib.getUTCMonth(), sekarangWib.getUTCDate()) -
        WIB_OFFSET_MS
    );
    const [pesananBaru, omzet, pembayaranNunggu, komplainAktif] = await Promise.all([
      prisma.pesanan.count({ where: { tglPesan: { gte: awal } } }),
      prisma.pesanan.aggregate({
        _sum: { totalAkhir: true },
        where: {
          tglPesan: { gte: awal },
          statusPesanan: { notIn: ["MENUNGGU_PEMBAYARAN", "DIBATALKAN"] },
        },
      }),
      prisma.pembayaran.count({ where: { status: StatusPembayaran.MENUNGGU_VERIFIKASI } }),
      prisma.komplain.count({ where: { status: { not: StatusKomplain.SELESAI } } }),
    ]);
    const rupiahOmzet = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(Number(omzet._sum.totalAkhir ?? 0));
    await balas(
      msg.chat.id,
      `📊 Laporan Harian — ${sekarangWib.toISOString().slice(0, 10)}\n\n` +
        `Pesanan masuk: ${pesananBaru}\n` +
        `Omzet terkonfirmasi: ${rupiahOmzet}\n` +
        `Pembayaran nunggu verifikasi: ${pembayaranNunggu}\n` +
        `Komplain belum selesai: ${komplainAktif}`
    );
    return NextResponse.json({ ok: true });
  }

  if (perintah === "/stok") {
    const produk = await prisma.produk.findMany({
      where: { status: "AKTIF" },
      include: { varian: true },
    });
    const kritis: string[] = [];
    for (const p of produk) {
      if (p.varian.length > 0) {
        for (const v of p.varian) {
          if (v.stok <= 3) kritis.push(`${p.namaProduk} (${v.namaVarian}): ${v.stok}`);
        }
      } else if (p.stok <= 3) {
        kritis.push(`${p.namaProduk}: ${p.stok}`);
      }
    }
    await balas(
      msg.chat.id,
      kritis.length === 0
        ? "📦 Semua stok aman (> 3)."
        : `⚠️ Stok kritis / habis:\n${kritis.join("\n")}`
    );
    return NextResponse.json({ ok: true });
  }

  await balas(
    msg.chat.id,
    `Perintah tidak dikenal: ${msg.text}\nKirim /help untuk daftar perintah.`
  );
  return NextResponse.json({ ok: true });
}
