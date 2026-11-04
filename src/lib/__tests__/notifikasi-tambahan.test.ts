// letak: src/lib/__tests__/notifikasi-tambahan.test.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, mock, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { NOMOR_WA_ADMIN } from "@/lib/const";
import {
  buatNotifikasi,
  kirimNotifikasiWa,
  beritahuAdmin,
  kirimTelegram,
  beritahuAdminTelegram,
  beritahuAdminSemuaChannel,
} from "../notifikasi";

const KUNCI_ENV = ["FONNTE_API_TOKEN", "TELEGRAM_BOT_TOKEN", "TELEGRAM_CHAT_ID"] as const;
const envAwal: Record<string, string | undefined> = {};
for (const k of KUNCI_ENV) envAwal[k] = process.env[k];

beforeEach(() => {
  for (const k of KUNCI_ENV) delete process.env[k];
});

afterEach(() => {
  mock.restoreAll();
  for (const k of KUNCI_ENV) {
    if (envAwal[k] === undefined) delete process.env[k];
    else process.env[k] = envAwal[k];
  }
});

function fetchOk() {
  return mock.method(globalThis, "fetch", async () => new Response("ok"));
}
function panggilan(fm: ReturnType<typeof fetchOk>): [string, any][] {
  return fm.mock.calls.map((c) => c.arguments as unknown as [string, any]);
}

// --- buatNotifikasi ---

test("buatNotifikasi: menulis ke tabel notifikasi lewat tx yang diberikan", async () => {
  let arg: any;
  const tx: any = {
    notifikasi: {
      create: async (a: any) => {
        arg = a;
        return { id: "n1" };
      },
    },
  };

  const hasil = await buatNotifikasi(tx, "cust_1", "pesanan_1", "Pembayaran diterima", "PEMBAYARAN");

  assert.deepEqual(arg, {
    data: { customerId: "cust_1", pesananId: "pesanan_1", pesan: "Pembayaran diterima", tipe: "PEMBAYARAN" },
  });
  assert.deepEqual(hasil, { id: "n1" });
});

test("buatNotifikasi: pesananId boleh null", async () => {
  let arg: any;
  const tx: any = { notifikasi: { create: async (a: any) => (arg = a) } };

  await buatNotifikasi(tx, "cust_1", null, "Halo", "UMUM");

  assert.equal(arg.data.pesananId, null);
});

// --- WhatsApp (Fonnte) ---

test("kirimNotifikasiWa: tanpa token dilewati dengan peringatan, tidak ada request", async () => {
  const warn = mock.method(console, "warn", () => {});
  const fm = fetchOk();

  await kirimNotifikasiWa("0812", "halo");

  assert.equal(fm.mock.callCount(), 0);
  assert.equal(warn.mock.callCount(), 1);
});

test("kirimNotifikasiWa: dengan token mengirim POST ke Fonnte", async () => {
  process.env.FONNTE_API_TOKEN = "TOKEN-WA";
  const fm = fetchOk();

  await kirimNotifikasiWa("08123", "Pesanan diproses");

  const [url, init] = panggilan(fm)[0] as [string, any];
  assert.equal(url, "https://api.fonnte.com/send");
  assert.equal(init.method, "POST");
  assert.equal(init.headers.Authorization, "TOKEN-WA");
  assert.deepEqual(JSON.parse(init.body), { target: "08123", message: "Pesanan diproses" });
});

test("kirimNotifikasiWa: Fonnte membalas error -> di-log, tidak melempar", async () => {
  process.env.FONNTE_API_TOKEN = "TOKEN-WA";
  const konsol = mock.method(console, "error", () => {});
  mock.method(globalThis, "fetch", async () => new Response("server error", { status: 500 }));

  await assert.doesNotReject(kirimNotifikasiWa("08123", "x"));

  const pesan = String(konsol.mock.calls[0]?.arguments[0]);
  assert.ok(pesan.includes("500") && pesan.includes("server error"));
});

test("kirimNotifikasiWa: jaringan gagal -> di-log, tidak melempar", async () => {
  process.env.FONNTE_API_TOKEN = "TOKEN-WA";
  const konsol = mock.method(console, "error", () => {});
  mock.method(globalThis, "fetch", async () => {
    throw new Error("jaringan putus");
  });

  await assert.doesNotReject(kirimNotifikasiWa("08123", "x"));

  assert.equal(konsol.mock.calls[0]?.arguments[0], "[notifikasi] Gagal memanggil Fonnte:");
});

test("beritahuAdmin: dikirim ke nomor WA admin", async () => {
  process.env.FONNTE_API_TOKEN = "TOKEN-WA";
  const fm = fetchOk();

  await beritahuAdmin("Ada pesanan baru");

  const [, init] = panggilan(fm)[0] as [string, any];
  assert.equal(JSON.parse(init.body).target, NOMOR_WA_ADMIN);
});

// --- Telegram ---

test("kirimTelegram: env belum lengkap dilewati dengan peringatan", async () => {
  const warn = mock.method(console, "warn", () => {});
  const fm = fetchOk();

  await kirimTelegram("a"); // tanpa keduanya
  process.env.TELEGRAM_BOT_TOKEN = "TOK";
  await kirimTelegram("b"); // hanya token

  assert.equal(fm.mock.callCount(), 0);
  assert.equal(warn.mock.callCount(), 2);
});

test("kirimTelegram: env lengkap mengirim POST ke Bot API", async () => {
  process.env.TELEGRAM_BOT_TOKEN = "TOK";
  process.env.TELEGRAM_CHAT_ID = "CHAT";
  const fm = fetchOk();

  await kirimTelegram("Pesanan baru");

  const [url, init] = panggilan(fm)[0] as [string, any];
  assert.equal(url, "https://api.telegram.org/botTOK/sendMessage");
  assert.deepEqual(JSON.parse(init.body), { chat_id: "CHAT", text: "Pesanan baru" });
});

test("kirimTelegram: Telegram membalas error -> di-log, tidak melempar", async () => {
  process.env.TELEGRAM_BOT_TOKEN = "TOK";
  process.env.TELEGRAM_CHAT_ID = "CHAT";
  const konsol = mock.method(console, "error", () => {});
  mock.method(globalThis, "fetch", async () => new Response("bad token", { status: 401 }));

  await assert.doesNotReject(kirimTelegram("x"));

  const pesan = String(konsol.mock.calls[0]?.arguments[0]);
  assert.ok(pesan.includes("401") && pesan.includes("bad token"));
});

test("kirimTelegram: jaringan gagal -> di-log, tidak melempar", async () => {
  process.env.TELEGRAM_BOT_TOKEN = "TOK";
  process.env.TELEGRAM_CHAT_ID = "CHAT";
  const konsol = mock.method(console, "error", () => {});
  mock.method(globalThis, "fetch", async () => {
    throw new Error("jaringan putus");
  });

  await assert.doesNotReject(kirimTelegram("x"));

  assert.equal(konsol.mock.calls[0]?.arguments[0], "[notifikasi] Gagal memanggil Telegram:");
});

test("beritahuAdminTelegram: meneruskan pesan ke Telegram", async () => {
  process.env.TELEGRAM_BOT_TOKEN = "TOK";
  process.env.TELEGRAM_CHAT_ID = "CHAT";
  const fm = fetchOk();

  await beritahuAdminTelegram("halo admin");

  assert.equal(JSON.parse((panggilan(fm)[0] as [string, any])[1].body).text, "halo admin");
});

// --- Semua channel ---

test("beritahuAdminSemuaChannel: WA ke nomor admin dan Telegram sama-sama terkirim", async () => {
  process.env.FONNTE_API_TOKEN = "TOKEN-WA";
  process.env.TELEGRAM_BOT_TOKEN = "TOK";
  process.env.TELEGRAM_CHAT_ID = "CHAT";
  const fm = fetchOk();

  await beritahuAdminSemuaChannel("Pembayaran masuk");

  const semua = panggilan(fm);
  assert.equal(semua.length, 2);
  const wa = semua.find(([u]) => u.includes("fonnte")) as [string, any];
  const tg = semua.find(([u]) => u.includes("telegram")) as [string, any];
  assert.equal(JSON.parse(wa[1].body).target, NOMOR_WA_ADMIN);
  assert.equal(JSON.parse(tg[1].body).text, "Pembayaran masuk");
});

test("beritahuAdminSemuaChannel: kegagalan satu channel tidak menghentikan channel lain", async () => {
  process.env.FONNTE_API_TOKEN = "TOKEN-WA";
  process.env.TELEGRAM_BOT_TOKEN = "TOK";
  process.env.TELEGRAM_CHAT_ID = "CHAT";
  mock.method(console, "error", () => {});
  const urlDipanggil: string[] = [];
  mock.method(globalThis, "fetch", async (url: string) => {
    urlDipanggil.push(String(url));
    if (String(url).includes("fonnte")) throw new Error("Fonnte down");
    return new Response("ok");
  });

  await assert.doesNotReject(beritahuAdminSemuaChannel("x"));

  assert.ok(urlDipanggil.some((u) => u.includes("telegram")));
});