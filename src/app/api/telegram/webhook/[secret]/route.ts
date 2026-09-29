// letak: src/app/api/telegram/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions";
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
    // Anti-hang: Telegram down/lambat tidak boleh menggantung function.
    signal: AbortSignal.timeout(30_000),
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

  const perintah = msg.text.trim().toLowerCase().split(/\s+/)[0] ?? "";

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

  // Perintah slash = fast path (tanpa AI). Teks bebas = AI reply dengan
  // tool-calling (mini-agent, fungsi aman yang saya definisikan — AI TIDAK
  // bisa jalankan shell/aksi destruktif, cuma baca data via tools).
  if (perintah.startsWith("/")) {
    await balas(
      msg.chat.id,
      `Perintah tidak dikenal: ${msg.text}\nKirim /help untuk daftar perintah.`
    );
    return NextResponse.json({ ok: true });
  }

  // AI bisa lambat (60s+ di NIM) — Telegram butuh respons 200 CEPAT, kalau
  // tidak dia retry update yang sama (balasan duplikat). Pola yang benar:
  // balas 200 SEKARANG, proses AI via waitUntil — tetap jalan sampai selesai
  // setelah response, lalu balas ke Telegram.
  waitUntil(
    tanyaAi(msg.text.trim())
      .then((jawaban) => balas(msg.chat.id, jawaban))
      .catch(() => balas(msg.chat.id, "⚠️ Gagal memproses. Coba lagi."))
  );
  return NextResponse.json({ ok: true });
}

const AI_API_URL = "https://integrate.api.nvidia.com/v1/chat/completions";
const AI_MODEL = process.env.AI_MODEL ?? "z-ai/glm-5.3-flash";
const AI_MAKS_ITERASI = 3;

/** Definisi tools yang BOLEH dipanggil AI — semua read-only, tanpa aksi destruktif. */
const TOOLS = [
  {
    type: "function",
    function: {
      name: "cek_status",
      description: "Cek kondisi app + DB + statistik live (jumlah customer, pesanan aktif, pembayaran nunggu verifikasi, komplain belum selesai)",
      parameters: { type: "object", properties: {}, additionalProperties: false },
    },
  },
  {
    type: "function",
    function: {
      name: "cek_laporan_hari_ini",
      description: "Laporan transaksi hari ini (WIB): pesanan masuk, omzet terkonfirmasi, pembayaran nunggu, komplain aktif",
      parameters: { type: "object", properties: {}, additionalProperties: false },
    },
  },
  {
    type: "function",
    function: {
      name: "cek_stok",
      description: "Daftar produk dengan stok kritis atau habis (<= 3)",
      parameters: { type: "object", properties: {}, additionalProperties: false },
    },
  },
];

/** Eksekusi tools yang diminta AI — murni query DB read-only. */
async function jalankanTool(nama: string): Promise<string> {
  if (nama === "cek_status") {
    let dbUp = true;
    try {
      await prisma.$queryRaw`SELECT 1`;
    } catch {
      dbUp = false;
    }
    const [customer, pesananAktif, pembayaranNunggu, komplainAktif] = await Promise.all([
      prisma.customer.count(),
      prisma.pesanan.count({ where: { statusPesanan: { notIn: ["MENUNGGU_PEMBAYARAN", "DIBATALKAN"] } } }),
      prisma.pembayaran.count({ where: { status: StatusPembayaran.MENUNGGU_VERIFIKASI } }),
      prisma.komplain.count({ where: { status: { not: StatusKomplain.SELESAI } } }),
    ]);
    return JSON.stringify({ dbUp, customer, pesananAktif, pembayaranNunggu, komplainAktif });
  }
  if (nama === "cek_laporan_hari_ini") {
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
    return JSON.stringify({
      tanggal: sekarangWib.toISOString().slice(0, 10),
      pesananBaru,
      omzet: Number(omzet._sum.totalAkhir ?? 0),
      pembayaranNunggu,
      komplainAktif,
    });
  }
  if (nama === "cek_stok") {
    const produk = await prisma.produk.findMany({ where: { status: "AKTIF" }, include: { varian: true } });
    const kritis: { produk: string; varian?: string; stok: number }[] = [];
    for (const p of produk) {
      if (p.varian.length > 0) {
        for (const v of p.varian) {
          if (v.stok <= 3) kritis.push({ produk: p.namaProduk, varian: v.namaVarian, stok: v.stok });
        }
      } else if (p.stok <= 3) {
        kritis.push({ produk: p.namaProduk, stok: p.stok });
      }
    }
    return JSON.stringify(kritis);
  }
  return JSON.stringify({ error: `Tool tidak dikenal: ${nama}` });
}

/**
 * Tanya AI dengan tool-calling. Gagal (API down, key salah, timeout) = balas
 * pesan fallback yang sopan — jangan crash, jangan error ke Telegram.
 * Tanpa riwayat percakapan (serverless stateless) — tiap pesan berdiri sendiri,
 * AI tetap bisa jawab via tools.
 */
async function tanyaAi(pertanyaan: string): Promise<string> {
  const key = process.env.NVIDIA_API_KEY;
  if (!key) {
    return "⚠️ AI belum dikonfigurasi (NVIDIA_API_KEY kosong). Pakai /status, /laporan, /stok dulu.";
  }

  const pesan: { role: string; content: string; tool_calls?: unknown[]; tool_call_id?: string }[] = [
    {
      role: "system",
      content:
        "Kamu asisten monitoring web app jastip-china (jasa titip China-Indonesia). " +
        "Admin bertanya via Telegram dari HP. Jawab RINGKAS & padat, gaya chat Telegram, bahasa Indonesia. " +
        "Kalau pertanyaan butuh data live (stok, pesanan, pembayaran, komplain, kondisi app), " +
        "PANGGIL tool yang relevan dulu, baru jawab berdasarkan hasilnya. " +
        "Kamu TIDAK bisa mengubah data apapun — semua tool read-only; kalau diminta mengubah, " +
        "arahkan admin ke dashboard /admin.",
    },
    { role: "user", content: pertanyaan },
  ];

  try {
    for (let iterasi = 0; iterasi < AI_MAKS_ITERASI; iterasi++) {
      const res = await fetch(AI_API_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({ model: AI_MODEL, messages: pesan, tools: TOOLS, temperature: 0.3, max_tokens: 2000 }),
        // Anti-hang (penyebab 504 sebelumnya): NIM bisa lambat (terukur 60-117s
        // bahkan untuk prompt kecil) — putus di 240s, masih di bawah limit Vercel.
        signal: AbortSignal.timeout(240_000),
      });
      if (!res.ok) {
        return `⚠️ AI error (${res.status}). Coba lagi sebentar.`;
      }
      const data = await res.json();
      const pilihan = data.choices?.[0]?.message;
      if (!pilihan) return "⚠️ AI membalas kosong. Coba lagi.";

      if (pilihan.tool_calls && pilihan.tool_calls.length > 0) {
        pesan.push(pilihan);
        for (const call of pilihan.tool_calls) {
          const hasil = await jalankanTool(call.function?.name ?? "").catch(
            (e: unknown) => JSON.stringify({ error: e instanceof Error ? e.message : "gagal" })
          );
          pesan.push({
            role: "tool",
            tool_call_id: call.id,
            content: hasil,
          });
        }
        continue; // iterasi berikutnya: AI baca hasil tool
      }

      return pilihan.content ?? "⚠️ AI membalas kosong.";
    }
    return "⚠️ AI butuh terlalu banyak langkah. Coba tanya dengan kalimat lebih spesifik.";
  } catch {
    return "⚠️ Gagal menghubungi AI. Coba lagi sebentar, atau pakai /status.";
  }
}
