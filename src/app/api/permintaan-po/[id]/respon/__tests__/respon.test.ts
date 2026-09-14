// letak: src/app/api/permintaan-po/[id]/respon/__tests__/respon.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakePrisma: any = {};
let PATCH: typeof import("../route").PATCH;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-respon-po-minimal-32-karakter";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  ({ PATCH } = await import("../route"));
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

function konteks(id = "po_1") {
  return { params: Promise.resolve({ id }) };
}

function poDasar(override: Record<string, unknown> = {}) {
  return {
    id: "po_1",
    customerId: "cust_1",
    status: "DIKONFIRMASI_HARGA",
    deskripsiSpesifikasi: "Tas custom",
    jumlahDiminta: 3,
    estimasiHarga: 100000,
    estimasiOngkir: 20000,
    ...override,
  };
}

const bodyTolak = { setuju: false };
const bodySetuju = {
  setuju: true,
  alamatId: "calamat0000000000000001",
  preferensiKurir: "JNE",
  metode: "transfer_bca",
};

test("PATCH respon tanpa login ditolak 401", async () => {
  const req = new NextRequest("http://localhost/api/permintaan-po/po_1/respon", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyTolak),
  });
  const res = await PATCH(req, konteks());
  assert.equal(res.status, 401);
});

test("PATCH respon setuju:true TANPA alamatId/preferensiKurir/metode ditolak 400 (Zod)", async () => {
  const req = new NextRequest("http://localhost/api/permintaan-po/po_1/respon", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer() },
    body: JSON.stringify({ setuju: true }), // tidak lengkap
  });
  const res = await PATCH(req, konteks());
  assert.equal(res.status, 400);
});

test("PATCH respon PO milik customer lain ditolak 404", async () => {
  fakePrisma.permintaanPo = { findUnique: async () => poDasar({ customerId: "cust_LAIN" }) };

  const req = new NextRequest("http://localhost/api/permintaan-po/po_1/respon", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer("cust_1") },
    body: JSON.stringify(bodyTolak),
  });
  const res = await PATCH(req, konteks());
  assert.equal(res.status, 404);
});

test("PATCH respon tolak: status jadi DITOLAK, tidak ada Pesanan dibuat", async () => {
  let dataUpdate: Record<string, unknown> | undefined;
  let pesananDibuat = false;

  fakePrisma.permintaanPo = {
    findUnique: async () => poDasar(),
    updateMany: async (args: { data: Record<string, unknown> }) => {
      dataUpdate = args.data;
      return { count: 1 };
    },
  };
  fakePrisma.pesanan = {
    create: async () => {
      pesananDibuat = true;
      return {};
    },
  };

  const req = new NextRequest("http://localhost/api/permintaan-po/po_1/respon", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer("cust_1") },
    body: JSON.stringify(bodyTolak),
  });
  const res = await PATCH(req, konteks());
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.equal(dataUpdate?.status, "DITOLAK");
  assert.equal(pesananDibuat, false);
  assert.equal(json.dikonversiJadiPesanan, false);
});

test("PATCH respon tolak ditolak 409 kalau status PO sudah bukan DIKONFIRMASI_HARGA (guard atomik)", async () => {
  fakePrisma.permintaanPo = {
    findUnique: async () => poDasar(),
    updateMany: async () => ({ count: 0 }),
  };

  const req = new NextRequest("http://localhost/api/permintaan-po/po_1/respon", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer("cust_1") },
    body: JSON.stringify(bodyTolak),
  });
  const res = await PATCH(req, konteks());
  assert.equal(res.status, 409);
});

test("PATCH respon setuju dengan alamat bukan milik sendiri ditolak 404", async () => {
  fakePrisma.permintaanPo = { findUnique: async () => poDasar() };
  fakePrisma.alamat = { findUnique: async () => ({ id: "calamat0000000000000001", customerId: "cust_LAIN" }) };

  const req = new NextRequest("http://localhost/api/permintaan-po/po_1/respon", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer("cust_1") },
    body: JSON.stringify(bodySetuju),
  });
  const res = await PATCH(req, konteks());
  assert.equal(res.status, 404);
});

test("PATCH respon setuju berhasil: subtotal & totalAkhir dihitung benar dari estimasiHarga x jumlah + ongkir, Pembayaran ikut dibuat", async () => {
  let dataPesanan: Record<string, unknown> | undefined;
  let dataPembayaran: Record<string, unknown> | undefined;
  let dataUpdatePo: Record<string, unknown> | undefined;

  // estimasiHarga 100000 x jumlahDiminta 3 = 300000, + estimasiOngkir 20000 = 320000
  fakePrisma.permintaanPo = { findUnique: async () => poDasar() };
  fakePrisma.alamat = { findUnique: async () => ({ id: "calamat0000000000000001", customerId: "cust_1" }) };
  fakePrisma.$transaction = async (fn: (tx: unknown) => unknown) =>
    fn({
      permintaanPo: {
        updateMany: async (args: { data: Record<string, unknown> }) => {
          dataUpdatePo = args.data;
          return { count: 1 };
        },
      },
      pesanan: {
        create: async (args: { data: Record<string, unknown> }) => {
          dataPesanan = args.data;
          return { id: "pesanan_1", ...args.data };
        },
      },
      pembayaran: {
        create: async (args: { data: Record<string, unknown> }) => {
          dataPembayaran = args.data;
          return { id: "bayar_1", ...args.data };
        },
      },
    });

  const req = new NextRequest("http://localhost/api/permintaan-po/po_1/respon", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer("cust_1") },
    body: JSON.stringify(bodySetuju),
  });
  const res = await PATCH(req, konteks());
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.equal(json.dikonversiJadiPesanan, true);
  assert.equal(dataUpdatePo?.status, "SUDAH_JADI_PESANAN");
  assert.equal(dataPesanan?.subtotalProduk, 300000);
  assert.equal(dataPesanan?.ongkirChinaGudang, 20000);
  assert.equal(dataPesanan?.totalAkhir, 320000);
  assert.equal(dataPembayaran?.jumlahBayar, 320000);
  assert.equal(
    (dataPesanan?.item as { create: { sumberItem: string; permintaanPoId: string } }).create.sumberItem,
    "CUSTOM_PO"
  );
});