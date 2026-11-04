// letak: src/lib/auth/__tests__/reset-token.test.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

const MENIT_MS = 60 * 1000;

const fakePrisma: any = {};
let resetToken: typeof import("../reset-token");
let hashToken: typeof import("../token-hash").hashToken;

before(async () => {
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  resetToken = await import("../reset-token");
  ({ hashToken } = await import("../token-hash"));
});

beforeEach(() => {
  for (const key of Object.keys(fakePrisma)) delete fakePrisma[key];
});

test("buatResetTokenCustomer: simpan HASH token, kembalikan token mentah", async () => {
  let arg: any;
  fakePrisma.resetPasswordToken = {
    create: async (a: any) => {
      arg = a;
      return {};
    },
  };

  const tokenMentah = await resetToken.buatResetTokenCustomer("cust_1");

  assert.ok(tokenMentah.length > 0);
  assert.equal(arg.data.customerId, "cust_1");
  assert.equal(arg.data.tokenHash, hashToken(tokenMentah));
  assert.notEqual(arg.data.tokenHash, tokenMentah);
});

test("buatResetTokenCustomer: kedaluwarsa 60 menit", async () => {
  let arg: any;
  fakePrisma.resetPasswordToken = {
    create: async (a: any) => {
      arg = a;
      return {};
    },
  };

  const sebelum = Date.now();
  await resetToken.buatResetTokenCustomer("cust_1");
  const sesudah = Date.now();

  const t = arg.data.kedaluwarsaPada.getTime();
  assert.ok(t >= sebelum + 60 * MENIT_MS && t <= sesudah + 60 * MENIT_MS);
});

test("buatResetTokenCustomer: token berbeda setiap kali diminta", async () => {
  fakePrisma.resetPasswordToken = { create: async () => ({}) };

  const a = await resetToken.buatResetTokenCustomer("cust_1");
  const b = await resetToken.buatResetTokenCustomer("cust_1");

  assert.notEqual(a, b);
});

test("verifikasiResetTokenCustomer: hanya token belum dipakai dan belum kedaluwarsa", async () => {
  let arg: any;
  const baris = { id: "rt_1", customerId: "cust_1" };
  fakePrisma.resetPasswordToken = {
    findFirst: async (a: any) => {
      arg = a;
      return baris;
    },
  };

  const sebelum = Date.now();
  const hasil = await resetToken.verifikasiResetTokenCustomer("token-mentah");

  assert.equal(hasil, baris);
  assert.equal(arg.where.tokenHash, hashToken("token-mentah"));
  assert.equal(arg.where.sudahDipakai, false);
  assert.ok(arg.where.kedaluwarsaPada.gt instanceof Date);
  assert.ok(arg.where.kedaluwarsaPada.gt.getTime() >= sebelum - 1000);
});

test("verifikasiResetTokenCustomer: token salah/kedaluwarsa/terpakai mengembalikan null", async () => {
  fakePrisma.resetPasswordToken = { findFirst: async () => null };
  assert.equal(await resetToken.verifikasiResetTokenCustomer("salah"), null);
});

test("tandaiResetTokenTerpakai: syarat sudahDipakai:false ada di WHERE (atomik)", async () => {
  let arg: any;
  fakePrisma.resetPasswordToken = {
    updateMany: async (a: any) => {
      arg = a;
      return { count: 1 };
    },
  };

  const hasil = await resetToken.tandaiResetTokenTerpakai("rt_1");

  assert.deepEqual(arg.where, { id: "rt_1", sudahDipakai: false });
  assert.deepEqual(arg.data, { sudahDipakai: true });
  assert.equal(hasil.count, 1);
});

test("tandaiResetTokenTerpakai: token yang sudah terpakai menghasilkan count 0", async () => {
  // Simulasi request kedua pada token yang sama: DB tidak menemukan baris yang cocok
  fakePrisma.resetPasswordToken = { updateMany: async () => ({ count: 0 }) };

  const hasil = await resetToken.tandaiResetTokenTerpakai("rt_1");

  assert.equal(hasil.count, 0);
});