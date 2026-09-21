// letak: src/app/api/pesanan/__tests__/pesanan.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakePrisma: any = {};
let POST: typeof import("../route").POST;
let GET: typeof import("../route").GET;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-pesanan-minimal-32-karakter";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  ({ POST, GET } = await import("../route"));
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

const bodyValid = {
  alamatId: "calamat0000000000000001",
  keranjangItemIds: ["citem000000000000000001"],
  preferensiKurir: "jnt",
  metode: "transfer_bca",
};

/** Item keranjang produk tanpa varian, stok cukup, harga 100000, jumlah 2. */
function itemKeranjangDasar(override: Record<string, unknown> = {}) {
  return {
    id: "citem000000000000000001",
    produkId: "cproduk00000000000000001",
    produkVarianId: null,
    jumlah: 2,
    produk: {
      id: "cproduk00000000000000001",
      namaProduk: "Tas Import",
      status: "AKTIF",
      stok: 10,
      hargaJualIdr: 100000,
      beratGram: 500,
    },
    produkVarian: null,
    ...override,
  };
}

test("POST /api/pesanan tanpa login ditolak 401", async () => {
  const req = new NextRequest("http://localhost/api/pesanan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyValid),
  });
  const res = await POST(req);
  assert.equal(res.status, 401);
});

test("POST /api/pesanan alamat bukan milik customer ditolak 404", async () => {
  fakePrisma.alamat = { findUnique: async () => ({ id: "calamat0000000000000001", customerId: "cust_LAIN" }) };

  const req = new NextRequest("http://localhost/api/pesanan", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer("cust_1") },
    body: JSON.stringify(bodyValid),
  });
  const res = await POST(req);
  assert.equal(res.status, 404);
});

test("POST /api/pesanan item keranjang tidak lengkap (ada yang hilang/bukan milik) ditolak 404", async () => {
  fakePrisma.alamat = { findUnique: async () => ({ id: "calamat0000000000000001", customerId: "cust_1", provinsi: "DKI Jakarta" }) };
  fakePrisma.keranjangItem = { findMany: async () => [] }; // kosong, padahal 1 diminta

  const req = new NextRequest("http://localhost/api/pesanan", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer("cust_1") },
    body: JSON.stringify(bodyValid),
  });
  const res = await POST(req);
  assert.equal(res.status, 404);
});

test("POST /api/pesanan produk NONAKTIF ditolak 409, transaksi tidak sampai dibuka", async () => {
  let transaksiDibuka = false;
  fakePrisma.alamat = { findUnique: async () => ({ id: "calamat0000000000000001", customerId: "cust_1", provinsi: "DKI Jakarta" }) };
  fakePrisma.keranjangItem = {
    findMany: async () => [itemKeranjangDasar({ produk: { ...itemKeranjangDasar().produk, status: "NONAKTIF" } })],
  };
  fakePrisma.$transaction = async () => {
    transaksiDibuka = true;
  };

  const req = new NextRequest("http://localhost/api/pesanan", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer("cust_1") },
    body: JSON.stringify(bodyValid),
  });
  const res = await POST(req);

  assert.equal(res.status, 409);
  assert.equal(transaksiDibuka, false);
});

test("POST /api/pesanan stok tidak cukup ditolak 409, SELURUH transaksi batal (pesanan.create tidak dipanggil)", async () => {
  let pesananDibuat = false;
  fakePrisma.alamat = { findUnique: async () => ({ id: "calamat0000000000000001", customerId: "cust_1", provinsi: "DKI Jakarta" }) };
  fakePrisma.keranjangItem = { findMany: async () => [itemKeranjangDasar({ jumlah: 999 })] };
  fakePrisma.$transaction = async (fn: (tx: unknown) => unknown) =>
    fn({
      produk: {
        updateMany: async () => ({ count: 0 }), // stok gagal dikurangi -> tidak cukup
      },
      pesanan: {
        create: async () => {
          pesananDibuat = true;
          return {};
        },
      },
    });

  const req = new NextRequest("http://localhost/api/pesanan", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer("cust_1") },
    body: JSON.stringify(bodyValid),
  });
  const res = await POST(req);
  const json = await res.json();

  assert.equal(res.status, 409);
  assert.match(json.error, /stok/i);
  assert.equal(pesananDibuat, false, "pesanan tidak boleh dibuat kalau stok item mana pun gagal dikurangi");
});

test("POST /api/pesanan berhasil: subtotal dihitung benar, stok dikurangi, item keranjang dihapus", async () => {
  let stokDikurangiDengan: unknown;
  let pesananDataDikirim: Record<string, unknown> | undefined;
  let keranjangDihapusDengan: unknown;

  fakePrisma.alamat = { findUnique: async () => ({ id: "calamat0000000000000001", customerId: "cust_1", provinsi: "DKI Jakarta" }) };
  fakePrisma.keranjangItem = { findMany: async () => [itemKeranjangDasar()] }; // jumlah 2, harga 100000
  fakePrisma.$transaction = async (fn: (tx: unknown) => unknown) =>
    fn({
      produk: {
        updateMany: async (args: unknown) => {
          stokDikurangiDengan = args;
          return { count: 1 };
        },
      },
      pesanan: {
        create: async (args: { data: Record<string, unknown> }) => {
          pesananDataDikirim = args.data;
          return { id: "pesanan_1", ...args.data };
        },
      },
      pembayaran: {
        create: async (args: { data: Record<string, unknown> }) => ({ id: "bayar_1", ...args.data }),
      },
      keranjangItem: {
        deleteMany: async (args: unknown) => {
          keranjangDihapusDengan = args;
          return { count: 1 };
        },
      },
    });

  const req = new NextRequest("http://localhost/api/pesanan", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer("cust_1") },
    body: JSON.stringify(bodyValid),
  });
  const res = await POST(req);
  const json = await res.json();

  assert.equal(res.status, 201);
  assert.equal(json.pesanan.subtotalProduk, 200000); // 100000 x 2
  assert.equal(json.pesanan.biayaJasaTitip, 70000); // 35% x 200000
  assert.equal(json.pesanan.ongkirChinaGudang, 0); // belum ada kalkulatornya, tetap 0
  assert.equal(json.pesanan.ongkirDomestik, 9000); // DKI Jakarta (zona jawa) + jnt + 1000gr = kgPertama saja
  assert.equal(json.pesanan.beratTotalGram, 1000); // 500gr x 2 -- snapshot permanen
  assert.equal(json.pesanan.totalAkhir, 279000); // 200000 + 70000 + 0 + 9000
  assert.deepEqual(stokDikurangiDengan, {
    where: { id: "cproduk00000000000000001", stok: { gte: 2 } },
    data: { stok: { decrement: 2 } },
  });
  assert.deepEqual(keranjangDihapusDengan, { where: { id: { in: ["citem000000000000000001"] } } });
  assert.equal((pesananDataDikirim?.item as { create: unknown[] }).create.length, 1);
});

test("GET /api/pesanan tanpa login ditolak 401", async () => {
  const req = new NextRequest("http://localhost/api/pesanan");
  const res = await GET(req);
  assert.equal(res.status, 401);
});

test("GET /api/pesanan cuma ambil pesanan milik customer yang login", async () => {
  let whereDipakai: Record<string, unknown> | undefined;
  fakePrisma.pesanan = {
    findMany: async (args: { where: Record<string, unknown> }) => {
      whereDipakai = args.where;
      return [];
    },
  };

  const req = new NextRequest("http://localhost/api/pesanan", {
    headers: { cookie: await cookieCustomer("cust_1") },
  });
  await GET(req);

  assert.equal(whereDipakai?.customerId, "cust_1");
});