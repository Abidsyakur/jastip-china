// letak: src/app/api/pesanan/[id]/invoice/__tests__/invoice-route.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakePrisma: any = {};
let GET: typeof import("../route").GET;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-invoice-route-minimal-32-karakter";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  ({ GET } = await import("../route"));
});

beforeEach(() => {
  for (const key of Object.keys(fakePrisma)) delete fakePrisma[key];
});

async function cookieCustomer(sub = "cust_1") {
  const { buatAccessToken } = await import("@/lib/auth/token");
  const { COOKIE_ACCESS_TOKEN } = await import("@/lib/auth/cookie");
  const token = await buatAccessToken({ sub, tipe: "customer" });
  return `${COOKIE_ACCESS_TOKEN}=${token}`;
}

function konteks(id = "pesanan_1") {
  return { params: Promise.resolve({ id }) };
}

function pesananDasar(override: Record<string, unknown> = {}) {
  return {
    id: "pesanan_1",
    customerId: "cust_1",
    noInvoice: "INV-1",
    tglPesan: new Date("2024-01-20T19:45:00+07:00"),
    subtotalProduk: 352500,
    biayaJasaTitip: 35000,
    ongkirChinaGudang: 0,
    ongkirDomestik: 25000,
    biayaAdminPayment: 0,
    totalAkhir: 412500,
    item: [{ namaItemSnapshot: "Tas", varianSnapshot: null, jumlah: 1, hargaSatuanSaatBeli: 282000 }],
    alamat: { alamatLengkap: "Jl. Merdeka 123", kota: "Bandung", kodePos: "40123" },
    customer: { nama: "Budi", noWa: "081234567890", email: "budi@email.com" },
    ...override,
  };
}

test("GET invoice tanpa login ditolak 401", async () => {
  const req = new NextRequest("http://localhost/api/pesanan/pesanan_1/invoice");
  const res = await GET(req, konteks());
  assert.equal(res.status, 401);
});

test("GET invoice milik customer lain ditolak 404", async () => {
  fakePrisma.pesanan = { findUnique: async () => pesananDasar({ customerId: "cust_LAIN" }) };
  fakePrisma.rekeningBank = { findMany: async () => [] };

  const req = new NextRequest("http://localhost/api/pesanan/pesanan_1/invoice", {
    headers: { cookie: await cookieCustomer("cust_1") },
  });
  const res = await GET(req, konteks());
  assert.equal(res.status, 404);
});

test("GET invoice pemilik mengembalikan PDF dengan header benar", async () => {
  fakePrisma.pesanan = { findUnique: async () => pesananDasar() };
  fakePrisma.rekeningBank = {
    findMany: async () => [{ bank: "BCA", noRekening: "1234567890", atasNama: "PT Jastip China" }],
  };

  const req = new NextRequest("http://localhost/api/pesanan/pesanan_1/invoice", {
    headers: { cookie: await cookieCustomer("cust_1") },
  });
  const res = await GET(req, konteks());

  assert.equal(res.status, 200);
  assert.equal(res.headers.get("Content-Type"), "application/pdf");
  assert.match(res.headers.get("Content-Disposition") ?? "", /invoice-INV-1\.pdf/);
  const buf = Buffer.from(await res.arrayBuffer());
  assert.equal(buf.subarray(0, 4).toString(), "%PDF");
});
