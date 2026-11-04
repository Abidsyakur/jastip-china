// letak: src/lib/__tests__/keranjang-tambahan.test.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { Prisma } from "@prisma/client";

const fakePrisma: any = {};
let keranjang: typeof import("../keranjang");

before(async () => {
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  keranjang = await import("../keranjang");
});

beforeEach(() => {
  for (const key of Object.keys(fakePrisma)) delete fakePrisma[key];
});

function errorPrisma(code: string) {
  return new Prisma.PrismaClientKnownRequestError("Unique constraint failed", {
    code,
    clientVersion: "test",
  });
}

// --- getOrBuatKeranjang ---

test("getOrBuatKeranjang: keranjang sudah ada dikembalikan tanpa membuat baru", async () => {
  let createDipanggil = false;
  const ada = { id: "k1", customerId: "cust_1" };
  fakePrisma.keranjang = {
    findUnique: async () => ada,
    create: async () => {
      createDipanggil = true;
      return {};
    },
  };

  const hasil = await keranjang.getOrBuatKeranjang("cust_1");

  assert.equal(hasil, ada);
  assert.equal(createDipanggil, false);
});

test("getOrBuatKeranjang: belum ada -> dibuat untuk customer itu (lazy-create)", async () => {
  let argCreate: any;
  fakePrisma.keranjang = {
    findUnique: async () => null,
    create: async (a: any) => {
      argCreate = a;
      return { id: "k_baru", customerId: "cust_1" };
    },
  };

  const hasil = await keranjang.getOrBuatKeranjang("cust_1");

  assert.deepEqual(argCreate, { data: { customerId: "cust_1" } });
  assert.equal(hasil.id, "k_baru");
});

test("getOrBuatKeranjang: race (P2002) -> baca ulang milik request yang menang, bukan error", async () => {
  const punyaOrang = { id: "k_pemenang", customerId: "cust_1" };
  let panggilanFind = 0;
  fakePrisma.keranjang = {
    findUnique: async () => (++panggilanFind === 1 ? null : punyaOrang),
    create: async () => {
      throw errorPrisma("P2002");
    },
  };

  const hasil = await keranjang.getOrBuatKeranjang("cust_1");

  assert.equal(hasil, punyaOrang);
  assert.equal(panggilanFind, 2);
});

test("getOrBuatKeranjang: P2002 tetapi tetap tidak ditemukan -> error asli dilempar", async () => {
  const err = errorPrisma("P2002");
  fakePrisma.keranjang = {
    findUnique: async () => null,
    create: async () => {
      throw err;
    },
  };

  await assert.rejects(keranjang.getOrBuatKeranjang("cust_1"), (e) => e === err);
});

test("getOrBuatKeranjang: error Prisma kode lain dilempar ulang tanpa baca ulang", async () => {
  const err = errorPrisma("P2003");
  let panggilanFind = 0;
  fakePrisma.keranjang = {
    findUnique: async () => {
      panggilanFind++;
      return null;
    },
    create: async () => {
      throw err;
    },
  };

  await assert.rejects(keranjang.getOrBuatKeranjang("cust_1"), (e) => e === err);
  assert.equal(panggilanFind, 1);
});

test("getOrBuatKeranjang: error biasa dilempar ulang", async () => {
  fakePrisma.keranjang = {
    findUnique: async () => null,
    create: async () => {
      throw new Error("database putus");
    },
  };

  await assert.rejects(keranjang.getOrBuatKeranjang("cust_1"), /database putus/);
});

// --- hitungHargaItem ---

test("hitungHargaItem: harga satuan = harga jual + harga tambahan varian; subtotal dikali jumlah", () => {
  const hasil = keranjang.hitungHargaItem(new Prisma.Decimal("100000"), new Prisma.Decimal("5000"), 3);

  assert.deepEqual(hasil, { hargaSatuan: 105000, subtotal: 315000 });
});

test("hitungHargaItem: tanpa varian (null atau undefined) hanya harga jual", () => {
  assert.deepEqual(keranjang.hitungHargaItem(new Prisma.Decimal("100000"), null, 2), {
    hargaSatuan: 100000,
    subtotal: 200000,
  });
  assert.deepEqual(keranjang.hitungHargaItem(new Prisma.Decimal("100000"), undefined, 2), {
    hargaSatuan: 100000,
    subtotal: 200000,
  });
});

test("hitungHargaItem: harga desimal dan jumlah nol", () => {
  assert.deepEqual(keranjang.hitungHargaItem(new Prisma.Decimal("34500.50"), new Prisma.Decimal("0"), 2), {
    hargaSatuan: 34500.5,
    subtotal: 69001,
  });
  assert.equal(keranjang.hitungHargaItem(new Prisma.Decimal("100000"), null, 0).subtotal, 0);
});