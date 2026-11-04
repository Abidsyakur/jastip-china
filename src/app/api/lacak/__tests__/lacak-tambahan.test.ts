// letak: src/app/api/lacak/__tests__/lacak-tambahan.test.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

const fakePrisma: any = {};
let GET: typeof import("../route").GET;

const fakeRateLimit = { diizinkan: true, identifierTerakhir: "" };

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-lacak-tambahan-minimal-32-karakter";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  mock.module("@/lib/auth/rate-limit", {
    namedExports: {
      cekRateLimitLacak: async (identifier: string) => {
        fakeRateLimit.identifierTerakhir = identifier;
        return { diizinkan: fakeRateLimit.diizinkan, sisaPercobaan: 0, resetPada: new Date() };
      },
    },
  });
  ({ GET } = await import("../route"));
});

beforeEach(() => {
  for (const key of Object.keys(fakePrisma)) delete fakePrisma[key];
  fakeRateLimit.diizinkan = true;
  fakeRateLimit.identifierTerakhir = "";
});

function reqLacak(query = "?invoice=INV-20240120-ABCD1234", headers: Record<string, string> = {}) {
  return new NextRequest(`http://localhost/api/lacak${query}`, { headers });
}

function pasangPesanan(hasil: unknown) {
  const rekam: { arg?: any } = {};
  fakePrisma.pesanan = {
    findUnique: async (arg: any) => {
      rekam.arg = arg;
      return hasil;
    },
  };
  return rekam;
}

test("GET lacak: batas percobaan terlampaui ditolak 429 dan database tidak disentuh", async () => {
  fakeRateLimit.diizinkan = false;
  // fakePrisma sengaja kosong: kalau route tetap query DB, test ini melempar TypeError

  const res = await GET(reqLacak());

  assert.equal(res.status, 429);
  const json = await res.json();
  assert.match(json.error, /terlalu banyak/i);
});

test("GET lacak: identifier rate limit memakai IP pertama dari x-forwarded-for", async () => {
  pasangPesanan(null);

  await GET(reqLacak(undefined, { "x-forwarded-for": " 203.0.113.5 , 10.0.0.1" }));

  assert.equal(fakeRateLimit.identifierTerakhir, "lacak:203.0.113.5");
});

test("GET lacak: tanpa header x-forwarded-for memakai 'unknown'", async () => {
  pasangPesanan(null);

  await GET(reqLacak());

  assert.equal(fakeRateLimit.identifierTerakhir, "lacak:unknown");
});

test("GET lacak: nomor invoice dinormalisasi jadi huruf besar sebelum dicari", async () => {
  const rekam = pasangPesanan(null);

  await GET(reqLacak("?invoice=inv-20240120-abcd1234"));

  assert.deepEqual(rekam.arg.where, { noInvoice: "INV-20240120-ABCD1234" });
});

test("GET lacak: field yang diambil dari DB dibatasi (tanpa nominal, alamat, identitas)", async () => {
  const rekam = pasangPesanan(null);

  await GET(reqLacak());

  // Mengunci "respons minimal": kalau ada yang menambah field sensitif ke select, test ini gagal
  assert.deepEqual(Object.keys(rekam.arg.select).sort(), [
    "noInvoice",
    "pengiriman",
    "statusLog",
    "statusPesanan",
    "tglPesan",
  ]);
  assert.deepEqual(rekam.arg.select.pengiriman, { select: { kurir: true, noResi: true } });
});