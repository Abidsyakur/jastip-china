// Telegram <-> OpenCode bridge — jalan 24/7 di VPS (Oracle Cloud).
// Zero dependencies: Node 18+ fetch native, tanpa npm install.
//
// Flow per pesan:
//   1. Long-polling getUpdates (Telegram) — pesan dari chat yang diizinkan saja
//   2. POST /api/session/{id}/prompt  — teruskan ke OpenCode (agent loop jalan)
//   3. Poll GET /api/session/{id}/message — tunggu balasan assistant baru
//   4. Kirim balasan ke Telegram (dipotong 4000 char, batas TG 4096)
//
// Keamanan:
//   - HANYA chat_id yang cocok TELEGRAM_CHAT_ID yang dilayani — orang lain
//     yang kebetulan nemu bot tidak bisa menarik apa pun (diam diabaikan).
//   - Session ID dipertahankan di state file — konteks percakapan lanjut,
//     tidak buat session baru tiap pesan.
//   - Prefix instruksi di tiap prompt: jawab ringkas, gaya Telegram.
//
// Env yang wajib: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, OPENCODE_SERVER_URL.
// Opsional: OPENCODE_DIR (folder project untuk session), BRIDGE_STATE_FILE.

import { readFileSync, writeFileSync, existsSync } from "node:fs";

const TELEGRAM_API = "https://api.telegram.org";
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID; // dari getUpdates (chat kamu)
const SERVER_URL = (process.env.OPENCODE_SERVER_URL ?? "http://127.0.0.1:4096").replace(/\/$/, "");
const PROJECT_DIR = process.env.OPENCODE_DIR ?? process.cwd();
const STATE_FILE = process.env.BRIDGE_STATE_FILE ?? "bridge-state.json";
const POLL_TIMEOUT_S = 25;
const BALASAN_TIMEOUT_MS = 180 * 1000; // 3 menit — AI kadang butuh lama untuk task berat
const POLL_BALASAN_MS = 2000;

if (!BOT_TOKEN || !CHAT_ID) {
  console.error("[bridge] TELEGRAM_BOT_TOKEN dan TELEGRAM_CHAT_ID wajib diisi");
  process.exit(1);
}

// ---------- state ----------

let state = { sessionId: null, lastMsgId: null, offset: 0 };
if (existsSync(STATE_FILE)) {
  try {
    state = { ...state, ...JSON.parse(readFileSync(STATE_FILE, "utf8")) };
  } catch {
    console.warn("[bridge] state file rusak, mulai dari nol");
  }
}
function simpanState() {
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

// ---------- helpers ----------

async function tg(method, body) {
  const res = await fetch(`${TELEGRAM_API}/bot${BOT_TOKEN}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body ?? {}),
  });
  return res.json();
}

async function tgTyping(chatId) {
  await tg("sendChatAction", { chat_id: chatId, action: "typing" }).catch(() => {});
}

async function opencode(path, options) {
  const res = await fetch(`${SERVER_URL}${path}`, options);
  if (!res.ok) {
    throw new Error(`OpenCode ${path} -> ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
  return res.json();
}

// ---------- OpenCode session ----------

async function buatSession() {
  const data = await opencode("/api/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "Telegram Bridge" }),
  });
  state.sessionId = data.id ?? data.sessionID ?? null;
  state.lastMsgId = null;
  simpanState();
  if (!state.sessionId) throw new Error("Gagal membuat session OpenCode");
  console.log(`[bridge] session baru: ${state.sessionId}`);
  return state.sessionId;
}

async function ambilAssistantTerbaru(sessionId) {
  const data = await opencode(`/api/session/${sessionId}/message`, {});
  const items = data.items ?? data.data ?? data ?? [];
  // Cari message assistant TERAKHIR (urutan timeline terjaga dari API).
  for (let i = items.length - 1; i >= 0; i--) {
    const m = items[i];
    const info = m.info ?? m;
    if ((info.role ?? m.role) === "assistant") return m;
  }
  return null;
}

/** Ambil teks balasan assistant dari bentuk message yang bisa bervariasi antar versi API. */
function teksBalasan(msg) {
  const info = msg.info ?? msg;
  const parts = info.parts ?? msg.parts ?? [];
  const teks = parts
    .filter((p) => (p.type ?? "") === "text")
    .map((p) => p.text ?? "")
    .join("\n")
    .trim();
  return teks;
}

async function tanyaOpenCode(pertanyaan) {
  let sessionId = state.sessionId ?? (await buatSession());

  // Session lama bisa hilang (VPS restart dengan state basi) — buat ulang.
  const kirimPrompt = async () => {
    await opencode(`/api/session/${sessionId}/prompt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text:
          `[Pesan dari admin via Telegram. Balas RINGKAS & padat, gaya chat — ` +
          `maksimal beberapa paragraf. Jangan jalankan aksi destruktif tanpa diminta eksplisit.]\n\n` +
          pertanyaan,
      }),
    });
  };

  try {
    await kirimPrompt();
  } catch (err) {
    console.warn(`[bridge] session lama gagal (${err.message}), buat session baru`);
    sessionId = await buatSession();
    await kirimPrompt();
  }

  // Tunggu balasan assistant BARU muncul.
  const mulai = Date.now();
  while (Date.now() - mulai < BALASAN_TIMEOUT_MS) {
    await new Promise((r) => setTimeout(r, POLL_BALASAN_MS));
    const msg = await ambilAssistantTerbaru(sessionId).catch(() => null);
    if (!msg) continue;
    const id = msg.info?.id ?? msg.id;
    const teks = teksBalasan(msg);
    // Message assistant yang sama dengan sebelumnya = agent belum selesai
    // menulis yang baru. Tunggu sampai ada id baru + teks tidak kosong.
    if (id !== state.lastMsgId && teks) {
      state.lastMsgId = id;
      simpanState();
      return teks;
    }
  }
  return "⏳ AI belum membalas dalam 3 menit (task mungkin berat). Coba tanya lagi sebentar.";
}

// ---------- main loop ----------

console.log(`[bridge] jalan — polling Telegram, OpenCode di ${SERVER_URL}, project ${PROJECT_DIR}`);

let mati = false;
process.on("SIGINT", () => {
  mati = true;
  process.exit(0);
});

while (!mati) {
  try {
    const res = await tg("getUpdates", {
      timeout: POLL_TIMEOUT_S,
      offset: state.offset,
      allowed_updates: ["message"],
    });
    if (!res.ok) {
      console.error(`[bridge] getUpdates gagal: ${res.description ?? "?"}`);
      await new Promise((r) => setTimeout(r, 5000));
      continue;
    }
    for (const update of res.result ?? []) {
      state.offset = update.update_id + 1;
      simpanState();

      const msg = update.message;
      if (!msg?.text) continue;
      // GUARD UTAMA: hanya chat_id terdaftar. Selain itu: diam, diabaikan.
      if (String(msg.chat.id) !== String(CHAT_ID)) {
        console.warn(`[bridge] chat asing diabaikan: ${msg.chat.id}`);
        continue;
      }

      console.log(`[bridge] pesan dari admin: ${msg.text.slice(0, 100)}`);
      await tgTyping(msg.chat.id);

      try {
        const balasan = await tanyaOpenCode(msg.text.trim());
        // Telegram batas 4096 char per pesan — potong 4000 + tanda.
        const teks = balasan.length > 4000 ? balasan.slice(0, 4000) + "\n\n…(dipotong)" : balasan;
        await tg("sendMessage", { chat_id: msg.chat.id, text: teks });
      } catch (err) {
        console.error("[bridge] gagal proses pesan:", err.message);
        await tg("sendMessage", {
          chat_id: msg.chat.id,
          text: `⚠️ Bridge error: ${err.message.slice(0, 200)}`,
        });
      }
    }
  } catch (err) {
    console.error("[bridge] loop error:", err.message);
    await new Promise((r) => setTimeout(r, 5000));
  }
}
