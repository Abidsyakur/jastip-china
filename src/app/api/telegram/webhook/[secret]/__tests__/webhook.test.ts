// letak: src/app/api/telegram/webhook/[secret]/__tests__/webhook.test.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, mock, before, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";

const SECRET = "rahasia-webhook-test";
const CHAT_ID = 12345;

const fakePrisma: any = {};
const tertunda: Promise<unknown>[] = [];
const panggilan: { url: string; body: any; headers: any }[] = [];
let aiHitung = 0;
const jsonRes = (obj: unknown, status = 200) => new Response(JSON.stringify(obj), { status });
let aiBalas: (n: number) => Response | Promise<Response> = () =>
  jsonRes({ choices: [{ message: { content: "ok" } }] });
let POST: typeof import("../route").POST;

before(async () => {
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  mock.module("@vercel/functions", {
    namedExports: {
      waitUntil: (p: Promise<unknown>) => {
        tertunda.push(p);
      },
    },
  });
  ({ POST } = await import("../route"));
});

beforeEach(() => {
  for (const key of Object.keys(fakePrisma)) delete fakePrisma[key];
  tertunda.length = 0;
  panggilan.length = 0;
  aiHitung = 0;
  aiBalas = () => jsonRes({ choices: [{ message: { content: "ok" } }] });
  process.env.TELEGRAM_WEBHOOK_SECRET = SECRET;
  process.env.CRON_SECRET = "rahasia-cron-berbeda";
  process.env.TELEGRAM_CHAT_ID = String(CHAT_ID);
  process.env.TELEGRAM_BOT_TOKEN = "BOT-TOKEN";
  process.env.NVIDIA_API_KEY = "NV-KEY";

  mock.method(globalThis, "fetch", async (url: any, init?: any) => {
    const u = String(url);
    panggilan.push({ url: u, body: init?.body ? JSON.parse(init.body) : undefined, headers: init?.headers });
    if (u.startsWith("https://api.telegram.org")) return new Response("{}");
    if (u.includes("nvidia")) {
      aiHitung++;
      return aiBalas(aiHitung);
    }
    throw new Error(`fetch tak terduga: ${u}`);
  });
});

afterEach(() => {
  mock.restoreAll();
});

// ---------- helper ----------

function update(text?: string, chat: { id: number; type: string } = { id: CHAT_ID, type: "private" }) {
  return { message: { chat, ...(text !== undefined && { text }) } };
}

async function kirim(body: unknown, secret = SECRET) {
  const req = new NextRequest(`http://localhost/api/telegram/webhook/${secret}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
  const res = await POST(req, { params: Promise.resolve({ secret }) });
  await Promise.all(tertunda); // tunggu pekerjaan latar (waitUntil) selesai
  return res;
}

const balasan = (): any[] =>
  panggilan.filter((p) => p.url.startsWith("https://api.telegram.org")).map((p) => p.body);
const panggilanAi = () => panggilan.filter((p) => p.url.includes("nvidia"));

function awalHariWib() {
  const w = new Date(Date.now() + 7 * 3600_000);
  return Date.UTC(w.getUTCFullYear(), w.getUTCMonth(), w.getUTCDate()) - 7 * 3600_000;
}

function pasangDb(
  o: {
    customer?: number;
    pesananAktif?: number;
    pesananBaru?: number;
    pembayaran?: number;
    komplain?: number;
    omzet?: number | null;
    dbDown?: boolean;
    produk?: any[];
  } = {}
) {
  const arg: Record<string, any> = {};
  fakePrisma.$queryRaw = async () => {
    if (o.dbDown) throw new Error("db down");
    return [{ ok: 1 }];
  };
  fakePrisma.customer = { count: async () => o.customer ?? 0 };
  fakePrisma.pesanan = {
    count: async (a: any) => {
      arg.pesananCount = a;
      return a?.where?.tglPesan ? (o.pesananBaru ?? 0) : (o.pesananAktif ?? 0);
    },
    aggregate: async (a: any) => {
      arg.aggregate = a;
      return { _sum: { totalAkhir: o.omzet === undefined ? 0 : o.omzet } };
    },
  };
  fakePrisma.pembayaran = {
    count: async (a: any) => {
      arg.pembayaran = a;
      return o.pembayaran ?? 0;
    },
  };
  fakePrisma.komplain = {
    count: async (a: any) => {
      arg.komplain = a;
      return o.komplain ?? 0;
    },
  };
  fakePrisma.produk = {
    findMany: async (a: any) => {
      arg.produk = a;
      return o.produk ?? [];
    },
  };
  return arg;
}

// ================= KEAMANAN =================

test("secret di URL salah ditolak 403 dan tidak ada panggilan keluar", async () => {
  const res = await kirim(update("/help"), "salah");

  assert.equal(res.status, 403);
  assert.equal(panggilan.length, 0);
});

test("TELEGRAM_WEBHOOK_SECRET belum diisi: semua permintaan ditolak 403 (termasuk secret 'undefined')", async () => {
  delete process.env.TELEGRAM_WEBHOOK_SECRET;

  const res = await kirim(update("/help"), "undefined");

  assert.equal(res.status, 403);
  assert.equal(panggilan.length, 0);
});

test("CRON_SECRET TIDAK berlaku sebagai rahasia webhook (rahasia terpisah)", async () => {
  const res = await kirim(update("/help"), "rahasia-cron-berbeda");

  assert.equal(res.status, 403);
  assert.equal(panggilan.length, 0);
});

test("body bukan JSON atau tanpa teks: dijawab 200 tanpa membalas apa pun", async () => {
  assert.equal((await kirim("bukan json")).status, 200);
  assert.equal((await kirim(update())).status, 200);
  assert.equal(panggilan.length, 0);
});

test("chat grup dan chat_id yang bukan admin diabaikan", async () => {
  assert.equal((await kirim(update("/help", { id: CHAT_ID, type: "group" }))).status, 200);
  assert.equal((await kirim(update("/help", { id: 999, type: "private" }))).status, 200);
  assert.equal(panggilan.length, 0);
});

test("TELEGRAM_CHAT_ID belum diisi: semua chat diabaikan", async () => {
  delete process.env.TELEGRAM_CHAT_ID;

  await kirim(update("/help"));

  assert.equal(panggilan.length, 0);
});

test("TELEGRAM_BOT_TOKEN kosong: tidak ada balasan dikirim, tetap 200", async () => {
  delete process.env.TELEGRAM_BOT_TOKEN;

  const res = await kirim(update("/help"));

  assert.equal(res.status, 200);
  assert.equal(panggilan.length, 0);
});

// ================= PERINTAH CEPAT =================

test("/help dan /start membalas daftar perintah ke chat admin", async () => {
  await kirim(update("/help"));
  await kirim(update("/start"));

  const semua = balasan();
  assert.equal(semua.length, 2);
  assert.equal(panggilan[0]?.url, "https://api.telegram.org/botBOT-TOKEN/sendMessage");
  for (const b of semua) {
    assert.equal(b.chat_id, CHAT_ID);
    assert.match(b.text, /\/status/);
    assert.match(b.text, /\/laporan/);
    assert.match(b.text, /\/stok/);
  }
});

test("perintah tidak peka huruf besar/kecil dan argumen tambahan diabaikan", async () => {
  pasangDb({ customer: 7 });

  await kirim(update("/STATUS sekarang"));

  assert.match(balasan()[0]?.text, /Customer: 7/);
});

test("/status: ringkasan dan DB OK", async () => {
  const arg = pasangDb({ customer: 10, pesananAktif: 4, pembayaran: 2, komplain: 1 });

  const res = await kirim(update("/status"));

  assert.equal(res.status, 200);
  const teks: string = balasan()[0]?.text;
  assert.match(teks, /DB: OK/);
  assert.match(teks, /Customer: 10/);
  assert.match(teks, /Pesanan aktif: 4/);
  assert.match(teks, /Pembayaran nunggu verifikasi: 2/);
  assert.match(teks, /Komplain belum selesai: 1/);
  assert.deepEqual(arg.pembayaran.where, { status: "MENUNGGU_VERIFIKASI" });
  assert.deepEqual(arg.komplain.where, { status: { not: "SELESAI" } });
  assert.deepEqual(arg.pesananCount.where, { statusPesanan: { notIn: ["MENUNGGU_PEMBAYARAN", "DIBATALKAN"] } });
});

test("/status: database mati dilaporkan DOWN, bukan crash", async () => {
  pasangDb({ dbDown: true });

  const res = await kirim(update("/status"));

  assert.equal(res.status, 200);
  assert.match(balasan()[0]?.text, /DB: DOWN/);
});

test("/laporan: jendela hari WIB, omzet tidak termasuk pesanan belum bayar/batal", async () => {
  const arg = pasangDb({ pesananBaru: 3, omzet: 1500000, pembayaran: 2, komplain: 1 });

  await kirim(update("/laporan"));

  const teks: string = balasan()[0]?.text;
  assert.match(teks, /Laporan Harian — \d{4}-\d{2}-\d{2}/);
  assert.match(teks, /Pesanan masuk: 3/);
  assert.match(teks, /Rp\s?1\.500\.000/);
  assert.equal(arg.pesananCount.where.tglPesan.gte.getTime(), awalHariWib());
  assert.deepEqual(arg.aggregate.where.statusPesanan, { notIn: ["MENUNGGU_PEMBAYARAN", "DIBATALKAN"] });
});

test("/laporan: omzet kosong (null) tampil Rp 0", async () => {
  pasangDb({ omzet: null });

  await kirim(update("/laporan"));

  assert.match(balasan()[0]?.text, /Rp\s?0/);
});

test("/stok: hanya stok <= 3, varian ditampilkan terpisah, hanya produk AKTIF", async () => {
  const arg = pasangDb({
    produk: [
      { namaProduk: "Tas A", stok: 2, varian: [] },
      { namaProduk: "Sepatu B", stok: 99, varian: [{ namaVarian: "40", stok: 3 }, { namaVarian: "42", stok: 10 }] },
      { namaProduk: "Topi C", stok: 50, varian: [] },
    ],
  });

  await kirim(update("/stok"));

  const teks: string = balasan()[0]?.text;
  assert.match(teks, /Tas A: 2/);
  assert.match(teks, /Sepatu B \(40\): 3/);
  assert.ok(!teks.includes("Topi C"));
  assert.ok(!teks.includes("(42)"));
  assert.deepEqual(arg.produk.where, { status: "AKTIF" });
});

test("/stok: semua aman -> pesan stok aman", async () => {
  pasangDb({ produk: [{ namaProduk: "Tas A", stok: 20, varian: [] }] });

  await kirim(update("/stok"));

  assert.match(balasan()[0]?.text, /Semua stok aman/);
});

test("perintah slash tidak dikenal dijawab tanpa memanggil AI", async () => {
  await kirim(update("/hapusdata"));

  assert.match(balasan()[0]?.text, /Perintah tidak dikenal: \/hapusdata/);
  assert.equal(panggilanAi().length, 0);
});

// ================= AI (teks bebas) =================

test("teks bebas tanpa NVIDIA_API_KEY: balasan 'belum dikonfigurasi', AI tidak dipanggil", async () => {
  delete process.env.NVIDIA_API_KEY;

  const res = await kirim(update("berapa pesanan hari ini?"));

  assert.equal(res.status, 200, "Telegram harus dijawab 200 segera");
  assert.match(balasan()[0]?.text, /NVIDIA_API_KEY kosong/);
  assert.equal(panggilanAi().length, 0);
});

test("teks bebas: pertanyaan dikirim ke AI dengan 3 alat baca-saja, jawaban diteruskan ke Telegram", async () => {
  aiBalas = () => jsonRes({ choices: [{ message: { content: "Halo admin" } }] });

  await kirim(update("  halo  "));

  const ai = panggilanAi();
  assert.equal(ai.length, 1);
  assert.equal(ai[0]?.headers.Authorization, "Bearer NV-KEY");
  const body = ai[0]?.body;
  assert.equal(body.messages[0].role, "system");
  assert.deepEqual(body.messages[1], { role: "user", content: "halo" });
  assert.deepEqual(
    body.tools.map((t: any) => t.function.name),
    ["cek_status", "cek_laporan_hari_ini", "cek_stok"]
  );
  assert.equal(balasan()[0]?.text, "Halo admin");
});

test("AI memanggil alat: hasil query dikirim balik ke AI, jawaban akhir diteruskan", async () => {
  pasangDb({ customer: 10, pesananAktif: 4, pembayaran: 2, komplain: 1 });
  aiBalas = (n) =>
    n === 1
      ? jsonRes({
          choices: [{ message: { role: "assistant", content: null, tool_calls: [{ id: "c1", function: { name: "cek_status" } }] } }],
        })
      : jsonRes({ choices: [{ message: { content: "Ada 10 customer" } }] });

  await kirim(update("berapa customer?"));

  const ai = panggilanAi();
  assert.equal(ai.length, 2);
  const hasilTool = ai[1]?.body.messages.find((m: any) => m.role === "tool");
  assert.equal(hasilTool.tool_call_id, "c1");
  const isi = JSON.parse(hasilTool.content);
  assert.equal(isi.customer, 10);
  assert.equal(isi.dbUp, true);
  assert.equal(balasan()[0]?.text, "Ada 10 customer");
});

test("AI meminta alat yang tidak ada: ditolak dengan pesan error, tidak ada aksi lain", async () => {
  aiBalas = (n) =>
    n === 1
      ? jsonRes({ choices: [{ message: { content: null, tool_calls: [{ id: "c9", function: { name: "hapus_semua_data" } }] } }] })
      : jsonRes({ choices: [{ message: { content: "Maaf, tidak bisa" } }] });

  await kirim(update("hapus semua data"));

  const hasilTool = panggilanAi()[1]?.body.messages.find((m: any) => m.role === "tool");
  assert.match(JSON.parse(hasilTool.content).error, /Tool tidak dikenal: hapus_semua_data/);
  assert.equal(balasan()[0]?.text, "Maaf, tidak bisa");
});

test("alat gagal dieksekusi: error dikembalikan ke AI, bukan crash", async () => {
  pasangDb();
  fakePrisma.customer = {
    count: async () => {
      throw new Error("boom");
    },
  };
  aiBalas = (n) =>
    n === 1
      ? jsonRes({ choices: [{ message: { content: null, tool_calls: [{ id: "c1", function: { name: "cek_status" } }] } }] })
      : jsonRes({ choices: [{ message: { content: "Data gagal diambil" } }] });

  await kirim(update("status?"));

  const hasilTool = panggilanAi()[1]?.body.messages.find((m: any) => m.role === "tool");
  assert.equal(JSON.parse(hasilTool.content).error, "boom");
});

test("AI selalu meminta alat: dihentikan setelah 3 langkah", async () => {
  pasangDb({ produk: [] });
  aiBalas = () =>
    jsonRes({ choices: [{ message: { content: null, tool_calls: [{ id: "cx", function: { name: "cek_stok" } }] } }] });

  await kirim(update("cek terus"));

  assert.equal(panggilanAi().length, 3);
  assert.match(balasan()[0]?.text, /terlalu banyak langkah/);
});

test("AI membalas error HTTP, kosong, atau jaringan putus: pesan cadangan yang sopan", async () => {
  aiBalas = () => jsonRes({}, 500);
  await kirim(update("tanya 1"));
  assert.match(balasan().at(-1)?.text, /AI error \(500\)/);

  aiBalas = () => jsonRes({ choices: [] });
  await kirim(update("tanya 2"));
  assert.match(balasan().at(-1)?.text, /membalas kosong/);

  aiBalas = () => jsonRes({ choices: [{ message: { content: null } }] });
  await kirim(update("tanya 3"));
  assert.match(balasan().at(-1)?.text, /membalas kosong/);

  aiBalas = () => {
    throw new Error("jaringan putus");
  };
  await kirim(update("tanya 4"));
  assert.match(balasan().at(-1)?.text, /Gagal menghubungi AI/);
});
test("AI memanggil cek_laporan_hari_ini: hasil query laporan dikirim balik ke AI", async () => {
  pasangDb({ pesananBaru: 3, omzet: 1500000, pembayaran: 2, komplain: 1 });
  aiBalas = (n) =>
    n === 1
      ? jsonRes({ choices: [{ message: { content: null, tool_calls: [{ id: "c2", function: { name: "cek_laporan_hari_ini" } }] } }] })
      : jsonRes({ choices: [{ message: { content: "Omzet hari ini 1,5 juta" } }] });

  await kirim(update("omzet hari ini?"));

  const hasilTool = panggilanAi()[1]?.body.messages.find((m: any) => m.role === "tool");
  const isi = JSON.parse(hasilTool.content);
  assert.match(isi.tanggal, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(isi.pesananBaru, 3);
  assert.equal(isi.omzet, 1500000);
  assert.equal(isi.pembayaranNunggu, 2);
  assert.equal(isi.komplainAktif, 1);
  assert.equal(balasan()[0]?.text, "Omzet hari ini 1,5 juta");
});

test("AI memanggil cek_stok: hanya stok <= 3 yang dikembalikan, varian terpisah", async () => {
  pasangDb({
    produk: [
      { namaProduk: "Tas A", stok: 2, varian: [] },
      { namaProduk: "Sepatu B", stok: 99, varian: [{ namaVarian: "40", stok: 3 }, { namaVarian: "42", stok: 10 }] },
      { namaProduk: "Topi C", stok: 50, varian: [] },
    ],
  });
  aiBalas = (n) =>
    n === 1
      ? jsonRes({ choices: [{ message: { content: null, tool_calls: [{ id: "c3", function: { name: "cek_stok" } }] } }] })
      : jsonRes({ choices: [{ message: { content: "Ada 2 stok kritis" } }] });

  await kirim(update("stok apa yang menipis?"));

  const hasilTool = panggilanAi()[1]?.body.messages.find((m: any) => m.role === "tool");
  assert.deepEqual(JSON.parse(hasilTool.content), [
    { produk: "Tas A", stok: 2 },
    { produk: "Sepatu B", varian: "40", stok: 3 },
  ]);
});