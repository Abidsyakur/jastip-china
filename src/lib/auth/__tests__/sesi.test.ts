// letak: src/lib/auth/__tests__/sesi.test.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

const HARI_MS = 24 * 60 * 60 * 1000;

const fakePrisma: any = {};
let sesi: typeof import("../sesi");
let hashToken: typeof import("../token-hash").hashToken;

before(async () => {
  // REFRESH_TOKEN_EXPIRES_DAYS dibaca saat modul di-import, jadi set SEBELUM import
  process.env.REFRESH_TOKEN_EXPIRES_DAYS = "30";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  sesi = await import("../sesi");
  ({ hashToken } = await import("../token-hash"));
});

beforeEach(() => {
  for (const key of Object.keys(fakePrisma)) delete fakePrisma[key];
});

test("buatSesiCustomer: simpan HASH token (bukan token mentah) dan kembalikan token mentah", async () => {
  let arg: any;
  fakePrisma.sesiLogin = {
    create: async (a: any) => {
      arg = a;
      return { id: "sesi_1" };
    },
  };

  const hasil = await sesi.buatSesiCustomer("cust_1", { deviceInfo: "Chrome", ipAddress: "1.2.3.4" });

  assert.equal(hasil.sesiId, "sesi_1");
  assert.ok(hasil.refreshTokenMentah.length > 0);
  assert.equal(arg.data.customerId, "cust_1");
  assert.ok(!("adminId" in arg.data), "sesi customer tidak boleh punya adminId");
  assert.equal(arg.data.deviceInfo, "Chrome");
  assert.equal(arg.data.ipAddress, "1.2.3.4");
  // Yang tersimpan di DB harus hash, bukan token mentah
  assert.equal(arg.data.refreshTokenHash, hashToken(hasil.refreshTokenMentah));
  assert.notEqual(arg.data.refreshTokenHash, hasil.refreshTokenMentah);
});

test("buatSesiAdmin: hanya adminId yang diisi", async () => {
  let arg: any;
  fakePrisma.sesiLogin = {
    create: async (a: any) => {
      arg = a;
      return { id: "sesi_2" };
    },
  };

  await sesi.buatSesiAdmin("admin_1");

  assert.equal(arg.data.adminId, "admin_1");
  assert.ok(!("customerId" in arg.data), "sesi admin tidak boleh punya customerId");
});

test("buatSesi: kedaluwarsa = 30 hari sejak dibuat", async () => {
  let arg: any;
  fakePrisma.sesiLogin = {
    create: async (a: any) => {
      arg = a;
      return { id: "sesi_3" };
    },
  };

  const sebelum = Date.now();
  const hasil = await sesi.buatSesiCustomer("cust_1");
  const sesudah = Date.now();

  const t = hasil.kedaluwarsaPada.getTime();
  assert.ok(t >= sebelum + 30 * HARI_MS && t <= sesudah + 30 * HARI_MS);
  assert.equal(arg.data.kedaluwarsaPada.getTime(), t);
});

test("buatSesi: token mentah berbeda di setiap login", async () => {
  fakePrisma.sesiLogin = { create: async () => ({ id: "x" }) };

  const a = await sesi.buatSesiCustomer("cust_1");
  const b = await sesi.buatSesiCustomer("cust_1");

  assert.notEqual(a.refreshTokenMentah, b.refreshTokenMentah);
});

test("cariSesiAktif: filter hash token, belum dicabut, belum kedaluwarsa", async () => {
  let arg: any;
  const baris = { id: "sesi_1" };
  fakePrisma.sesiLogin = {
    findFirst: async (a: any) => {
      arg = a;
      return baris;
    },
  };

  const sebelum = Date.now();
  const hasil = await sesi.cariSesiAktif("token-mentah");

  assert.equal(hasil, baris);
  assert.equal(arg.where.refreshTokenHash, hashToken("token-mentah"));
  assert.equal(arg.where.dicabut, false);
  assert.ok(arg.where.kedaluwarsaPada.gt instanceof Date);
  assert.ok(arg.where.kedaluwarsaPada.gt.getTime() >= sebelum - 1000);
});

test("cariSesiAktif: token tidak ditemukan mengembalikan null", async () => {
  fakePrisma.sesiLogin = { findFirst: async () => null };
  assert.equal(await sesi.cariSesiAktif("salah"), null);
});

test("rotasiRefreshToken: ganti hash di sesi yang sama, kedaluwarsa TIDAK diperpanjang", async () => {
  let arg: any;
  fakePrisma.sesiLogin = {
    update: async (a: any) => {
      arg = a;
      return {};
    },
  };

  const tokenBaru = await sesi.rotasiRefreshToken("sesi_1");

  assert.deepEqual(arg.where, { id: "sesi_1" });
  assert.equal(arg.data.refreshTokenHash, hashToken(tokenBaru));
  // Hanya hash yang berubah; umur sesi total tetap dibatasi sejak login pertama
  assert.deepEqual(Object.keys(arg.data), ["refreshTokenHash"]);
});

test("cabutSesi: tandai dicabut berdasarkan hash token", async () => {
  let arg: any;
  fakePrisma.sesiLogin = {
    updateMany: async (a: any) => {
      arg = a;
      return { count: 1 };
    },
  };

  await sesi.cabutSesi("token-mentah");

  assert.equal(arg.where.refreshTokenHash, hashToken("token-mentah"));
  assert.deepEqual(arg.data, { dicabut: true });
});

test("cabutSesi: token tidak dikenal tetap berhasil senyap (tidak melempar error)", async () => {
  fakePrisma.sesiLogin = { updateMany: async () => ({ count: 0 }) };
  await assert.doesNotReject(sesi.cabutSesi("token-tidak-ada"));
});

test("cabutSemuaSesiCustomer: hanya sesi milik customer itu yang masih aktif", async () => {
  let arg: any;
  fakePrisma.sesiLogin = {
    updateMany: async (a: any) => {
      arg = a;
      return { count: 3 };
    },
  };

  await sesi.cabutSemuaSesiCustomer("cust_1");

  assert.deepEqual(arg.where, { customerId: "cust_1", dicabut: false });
  assert.deepEqual(arg.data, { dicabut: true });
});