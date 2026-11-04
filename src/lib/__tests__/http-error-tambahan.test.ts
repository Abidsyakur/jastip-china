// letak: src/lib/__tests__/http-error-tambahan.test.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, mock, before, afterEach } from "node:test";
import assert from "node:assert/strict";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

let httpError: typeof import("@/lib/http-error");
let currentUser: typeof import("@/lib/auth/current-user");

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-http-error-minimal-32-karakter";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: {} } });
  httpError = await import("@/lib/http-error");
  currentUser = await import("@/lib/auth/current-user");
});

// Simpan & pulihkan env Telegram supaya test tidak saling bocor
const envAwal = {
  token: process.env.TELEGRAM_BOT_TOKEN,
  chat: process.env.TELEGRAM_CHAT_ID,
};

afterEach(() => {
  mock.restoreAll();
  if (envAwal.token === undefined) delete process.env.TELEGRAM_BOT_TOKEN;
  else process.env.TELEGRAM_BOT_TOKEN = envAwal.token;
  if (envAwal.chat === undefined) delete process.env.TELEGRAM_CHAT_ID;
  else process.env.TELEGRAM_CHAT_ID = envAwal.chat;
});

/** Buat instance error auth tanpa bergantung pada bentuk konstruktornya. */
function buat(Ctor: unknown, pesan: string): Error {
  return new (Ctor as new (pesan: string) => Error)(pesan);
}

/** Beri kesempatan IIFE async fire-and-forget menyelesaikan dirinya. */
const tunggu = () => new Promise<void>((r) => setImmediate(r));

// --- tanganiErrorAuth ---

test("tanganiErrorAuth: TidakTerautentikasiError -> 401 dengan pesan error", async () => {
  const err = buat(currentUser.TidakTerautentikasiError, "belum login");

  const res = httpError.tanganiErrorAuth(err);

  assert.ok(res);
  assert.equal(res.status, 401);
  assert.deepEqual(await res.json(), { error: err.message });
});

test("tanganiErrorAuth: TidakDiizinkanError -> 403 dengan pesan error", async () => {
  const err = buat(currentUser.TidakDiizinkanError, "bukan owner");

  const res = httpError.tanganiErrorAuth(err);

  assert.ok(res);
  assert.equal(res.status, 403);
  assert.deepEqual(await res.json(), { error: err.message });
});

test("tanganiErrorAuth: error lain mengembalikan null (pemanggil harus re-throw)", () => {
  assert.equal(httpError.tanganiErrorAuth(new Error("acak")), null);
  assert.equal(httpError.tanganiErrorAuth("string biasa"), null);
  assert.equal(httpError.tanganiErrorAuth(undefined), null);
  assert.equal(httpError.tanganiErrorAuth(new httpError.AppError("x", 400)), null);
});

// --- AppError & tanganiAppError ---

test("AppError: menyimpan status, nama, dan pesan; tetap instance Error", () => {
  const err = new httpError.AppError("stok habis", 409);

  assert.ok(err instanceof Error);
  assert.equal(err.name, "AppError");
  assert.equal(err.message, "stok habis");
  assert.equal(err.status, 409);
});

test("tanganiAppError: AppError -> response dengan status miliknya sendiri", async () => {
  const res404 = httpError.tanganiAppError(new httpError.AppError("tidak ada", 404));
  const res409 = httpError.tanganiAppError(new httpError.AppError("bentrok", 409));

  assert.ok(res404 && res409);
  assert.equal(res404.status, 404);
  assert.deepEqual(await res404.json(), { error: "tidak ada" });
  assert.equal(res409.status, 409);
});

test("tanganiAppError: turunan AppError ikut tertangani", async () => {
  class CheckoutError extends httpError.AppError {}

  const res = httpError.tanganiAppError(new CheckoutError("keranjang kosong", 400));

  assert.ok(res);
  assert.equal(res.status, 400);
  assert.deepEqual(await res.json(), { error: "keranjang kosong" });
});

test("tanganiAppError: error biasa mengembalikan null", () => {
  assert.equal(httpError.tanganiAppError(new Error("acak")), null);
  assert.equal(httpError.tanganiAppError(null), null);
});

// --- catatLogError ---

test("catatLogError: selalu log ke console.error; tanpa env Telegram tidak ada fetch", async () => {
  delete process.env.TELEGRAM_BOT_TOKEN;
  delete process.env.TELEGRAM_CHAT_ID;
  const konsol = mock.method(console, "error", () => {});
  const fetchMock = mock.method(globalThis, "fetch", async () => new Response("ok"));
  const err = new Error("db mati");

  httpError.catatLogError(err);
  await tunggu();

  assert.deepEqual(konsol.mock.calls.at(0)?.arguments, ["[SERVER_ERROR]", err]);
  assert.equal(fetchMock.mock.callCount(), 0);
});

test("catatLogError: hanya token tanpa chat id -> tidak kirim Telegram", async () => {
  process.env.TELEGRAM_BOT_TOKEN = "TOKEN123";
  delete process.env.TELEGRAM_CHAT_ID;
  mock.method(console, "error", () => {});
  const fetchMock = mock.method(globalThis, "fetch", async () => new Response("ok"));

  httpError.catatLogError(new Error("x"));
  await tunggu();

  assert.equal(fetchMock.mock.callCount(), 0);
});

test("catatLogError: env lengkap -> kirim pesan ke API Telegram", async () => {
  process.env.TELEGRAM_BOT_TOKEN = "TOKEN123";
  process.env.TELEGRAM_CHAT_ID = "CHAT456";
  mock.method(console, "error", () => {});
  const fetchMock = mock.method(globalThis, "fetch", async () => new Response("ok"));

  httpError.catatLogError(new Error("db mati"));
  await tunggu();

  assert.equal(fetchMock.mock.callCount(), 1);
  const [url, init] = fetchMock.mock.calls.at(0)?.arguments as [string, any];
  assert.equal(url, "https://api.telegram.org/botTOKEN123/sendMessage");
  assert.equal(init.method, "POST");
  const body = JSON.parse(init.body);
  assert.equal(body.chat_id, "CHAT456");
  assert.ok(body.text.includes("db mati"));
});

test("catatLogError: nilai bukan Error tetap dikirim sebagai teks", async () => {
  process.env.TELEGRAM_BOT_TOKEN = "TOKEN123";
  process.env.TELEGRAM_CHAT_ID = "CHAT456";
  mock.method(console, "error", () => {});
  const fetchMock = mock.method(globalThis, "fetch", async () => new Response("ok"));

  httpError.catatLogError("kesalahan berupa string");
  await tunggu();

  const [, init] = fetchMock.mock.calls.at(0)?.arguments as [string, any];
  assert.ok(JSON.parse(init.body).text.includes("kesalahan berupa string"));
});

test("catatLogError: gagal kirim Telegram ditelan, tidak melempar error", async () => {
  process.env.TELEGRAM_BOT_TOKEN = "TOKEN123";
  process.env.TELEGRAM_CHAT_ID = "CHAT456";
  mock.method(console, "error", () => {});
  mock.method(globalThis, "fetch", async () => {
    throw new Error("jaringan putus");
  });

  assert.doesNotThrow(() => httpError.catatLogError(new Error("x")));
  await tunggu(); // kalau rejection tidak ditelan, Node akan melaporkannya di sini
});