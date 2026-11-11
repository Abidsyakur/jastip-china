// letak: src/lib/auth/__tests__/rate-limit.test.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, mock, before, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";

const fakePrisma: any = {};
let rl: typeof import("../rate-limit");

const rekam = {
  panggilan: [] as { sql: string; nilai: unknown[] }[],
  baris: [{ jumlah: 1, reset_pada: new Date("2030-01-01T00:00:00.000Z") }] as any[],
  galat: null as Error | null,
  hapus: [] as any[],
  hapusGagal: false,
};

before(async () => {
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  rl = await import("../rate-limit");
});

beforeEach(() => {
  rekam.panggilan = [];
  rekam.hapus = [];
  rekam.galat = null;
  rekam.hapusGagal = false;
  rekam.baris = [{ jumlah: 1, reset_pada: new Date("2030-01-01T00:00:00.000Z") }];

  fakePrisma.$queryRaw = async (strings: TemplateStringsArray, ...nilai: unknown[]) => {
    rekam.panggilan.push({ sql: strings.join("?"), nilai });
    if (rekam.galat) throw rekam.galat;
    return rekam.baris;
  };
  fakePrisma.rateLimit = {
    deleteMany: (arg: any) => {
      rekam.hapus.push(arg);
      return rekam.hapusGagal ? Promise.reject(new Error("gagal hapus")) : Promise.resolve({ count: 0 });
    },
  };
  mock.method(Math, "random", () => 0.5); // default: tidak memicu pembersihan
  mock.method(console, "error", () => {});
});

afterEach(() => {
  mock.restoreAll();
});

function setJumlah(n: number) {
  rekam.baris = [{ jumlah: n, reset_pada: new Date("2030-01-01T00:00:00.000Z") }];
}

test("login: percobaan pertama diizinkan, sisa 4, resetPada dari database", async () => {
  const hasil = await rl.cekRateLimitLogin("customer:0812");

  assert.equal(hasil.diizinkan, true);
  assert.equal(hasil.sisaPercobaan, 4);
  assert.ok(hasil.resetPada instanceof Date);
  assert.equal(hasil.resetPada.toISOString(), "2030-01-01T00:00:00.000Z");
});

test("login: tepat di batas (5) masih diizinkan, percobaan ke-6 ditolak", async () => {
  setJumlah(5);
  const diBatas = await rl.cekRateLimitLogin("customer:0812");
  assert.equal(diBatas.diizinkan, true);
  assert.equal(diBatas.sisaPercobaan, 0);

  setJumlah(6);
  const lewat = await rl.cekRateLimitLogin("customer:0812");
  assert.equal(lewat.diizinkan, false);
  assert.equal(lewat.sisaPercobaan, 0, "sisa tidak boleh negatif");
});

test("batas tiap jenis: lacak 20, register 3, upload 50", async () => {
  const kasus = [
    { fn: rl.cekRateLimitLacak, maks: 20 },
    { fn: rl.cekRateLimitRegister, maks: 3 },
    { fn: rl.cekRateLimitUpload, maks: 50 },
  ];
  for (const { fn, maks } of kasus) {
    setJumlah(maks);
    assert.equal((await fn("x")).diizinkan, true, `jumlah ${maks} masih boleh`);
    setJumlah(maks + 1);
    assert.equal((await fn("x")).diizinkan, false, `jumlah ${maks + 1} harus ditolak`);
  }
});

test("kunci = jenis:identifier (jenis berbeda tidak saling bertabrakan)", async () => {
  await rl.cekRateLimitLogin("admin:owner@x.com");
  await rl.cekRateLimitLacak("203.0.113.5");
  await rl.cekRateLimitRegister("203.0.113.5");
  await rl.cekRateLimitUpload("customer:c1");

  assert.deepEqual(
    rekam.panggilan.map((p) => p.nilai[0]),
    ["login:admin:owner@x.com", "lacak:203.0.113.5", "register:203.0.113.5", "upload:customer:c1"]
  );
});

test("panjang jendela (detik): login 300, lacak 60, register 3600, upload 86400", async () => {
  await rl.cekRateLimitLogin("a");
  await rl.cekRateLimitLacak("a");
  await rl.cekRateLimitRegister("a");
  await rl.cekRateLimitUpload("a");

  assert.deepEqual(
    rekam.panggilan.map((p) => p.nilai[1]),
    [300, 60, 3600, 86400]
  );
});

test("satu pengecekan = satu pernyataan SQL atomik (INSERT ... ON CONFLICT)", async () => {
  await rl.cekRateLimitLogin("a");

  assert.equal(rekam.panggilan.length, 1);
  assert.match(rekam.panggilan[0]!.sql, /INSERT INTO rate_limit/);
  assert.match(rekam.panggilan[0]!.sql, /ON CONFLICT \(kunci\) DO UPDATE/);
});

test("database gagal: lacak dan upload gagal-terbuka (diizinkan, tercatat di log)", async () => {
  rekam.galat = new Error("database putus");

  const lacak = await rl.cekRateLimitLacak("1.2.3.4");
  const upload = await rl.cekRateLimitUpload("customer:c1");

  assert.equal(lacak.diizinkan, true);
  assert.equal(lacak.sisaPercobaan, 20);
  assert.equal(upload.diizinkan, true);
  assert.equal(upload.sisaPercobaan, 50);
});

test("database gagal: login dan register gagal-tertutup (error dilempar)", async () => {
  rekam.galat = new Error("database putus");

  await assert.rejects(rl.cekRateLimitLogin("customer:0812"), /database putus/);
  await assert.rejects(rl.cekRateLimitRegister("1.2.3.4"), /database putus/);
});

test("query tidak mengembalikan baris: diperlakukan sebagai kegagalan", async () => {
  rekam.baris = [];

  await assert.rejects(rl.cekRateLimitLogin("a"), /tidak mengembalikan baris/);
  assert.equal((await rl.cekRateLimitLacak("a")).diizinkan, true); // gagal-terbuka
});

test("pembersihan: sesekali menghapus baris yang sudah kedaluwarsa > 24 jam", async () => {
  mock.method(Math, "random", () => 0); // memicu pembersihan
  const sebelum = Date.now();

  await rl.cekRateLimitLogin("a");

  assert.equal(rekam.hapus.length, 1);
  const batas: Date = rekam.hapus[0].where.resetPada.lt;
  assert.ok(batas instanceof Date);
  const selisih = sebelum - batas.getTime();
  assert.ok(Math.abs(selisih - 24 * 60 * 60 * 1000) < 5000);
});

test("pembersihan tidak berjalan di kebanyakan panggilan", async () => {
  await rl.cekRateLimitLogin("a"); // random = 0.5
  assert.equal(rekam.hapus.length, 0);
});

test("pembersihan yang gagal diabaikan, hasil tetap dikembalikan", async () => {
  mock.method(Math, "random", () => 0);
  rekam.hapusGagal = true;

  const hasil = await rl.cekRateLimitLogin("a");

  assert.equal(hasil.diizinkan, true);
});