// letak: src/app/api/admin/dashboard/omzet-harian/__tests__/omzet-harian.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakePrisma: any = {};
let GET: typeof import("../route").GET;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-omzet-harian-minimal-32-karakter";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  ({ GET } = await import("../route"));
});

beforeEach(() => {
  for (const key of Object.keys(fakePrisma)) delete fakePrisma[key];
});

async function cookieAdmin() {
  const { buatAccessToken } = await import("@/lib/auth/token");
  const { COOKIE_ACCESS_TOKEN } = await import("@/lib/auth/cookie");
  const token = await buatAccessToken({ sub: "admin_1", tipe: "admin", role: "OWNER" });
  return `${COOKIE_ACCESS_TOKEN}=${token}`;
}

async function cookieCustomer(sub = "cust_1") {
  const { buatAccessToken } = await import("@/lib/auth/token");
  const { COOKIE_ACCESS_TOKEN } = await import("@/lib/auth/cookie");
  const token = await buatAccessToken({ sub, tipe: "customer" });
  return `${COOKIE_ACCESS_TOKEN}=${token}`;
}

// Kunci hari WIB — duplikasi rumus route (sengaja, supaya test tidak
// import fungsi internal route yang memang tidak diekspor).
function kunciWib(d: Date): string {
  return new Date(d.getTime() + 7 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

test("GET omzet-harian tanpa login ditolak 401", async () => {
  const req = new NextRequest("http://localhost/api/admin/dashboard/omzet-harian");
  const res = await GET(req);
  assert.equal(res.status, 401);
});

test("GET omzet-harian oleh customer ditolak 403", async () => {
  const req = new NextRequest("http://localhost/api/admin/dashboard/omzet-harian", {
    headers: { cookie: await cookieCustomer() },
  });
  const res = await GET(req);
  assert.equal(res.status, 403);
});

test("GET omzet-harian hari tidak valid ditolak 400", async () => {
  const req = new NextRequest("http://localhost/api/admin/dashboard/omzet-harian?hari=99", {
    headers: { cookie: await cookieAdmin() },
  });
  const res = await GET(req);
  assert.equal(res.status, 400);
});

test("GET omzet-harian deret kontinu 7 hari, jumlah benar, hari kosong nol", async () => {
  const sekarang = new Date();
  const kemarin = new Date(sekarang.getTime() - 24 * 60 * 60 * 1000);
  fakePrisma.pesanan = {
    findMany: async () => [
      { tglPesan: sekarang, totalAkhir: 100000 },
      { tglPesan: sekarang, totalAkhir: 50000 },
      { tglPesan: kemarin, totalAkhir: 200000 },
    ],
  };

  const req = new NextRequest("http://localhost/api/admin/dashboard/omzet-harian", {
    headers: { cookie: await cookieAdmin() },
  });
  const res = await GET(req);
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.equal(json.items.length, 7);
  const hariIni = json.items.find(
    (i: { tanggal: string }) => i.tanggal === kunciWib(sekarang)
  );
  const hariKemarin = json.items.find(
    (i: { tanggal: string }) => i.tanggal === kunciWib(kemarin)
  );
  assert.deepEqual(hariIni, { tanggal: kunciWib(sekarang), omzet: 150000, jumlahPesanan: 2 });
  assert.deepEqual(hariKemarin, { tanggal: kunciWib(kemarin), omzet: 200000, jumlahPesanan: 1 });
  // hari-hari lain nol semua
  for (const i of json.items) {
    if (i.tanggal !== kunciWib(sekarang) && i.tanggal !== kunciWib(kemarin)) {
      assert.deepEqual(i, { tanggal: i.tanggal, omzet: 0, jumlahPesanan: 0 });
    }
  }
});
