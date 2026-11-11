// letak: src/app/api/admin/produk/[id]/__tests__/produk-id.test.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { Prisma } from "@prisma/client";

const fakePrisma: any = {};
let GET: typeof import("../route").GET;
let PATCH: typeof import("../route").PATCH;
let DELETE: typeof import("../route").DELETE;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-produk-id-minimal-32-karakter";
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  ({ GET, PATCH, DELETE } = await import("../route"));
});

beforeEach(() => {
  for (const key of Object.keys(fakePrisma)) delete fakePrisma[key];
});

async function cookieAdmin(role: "OWNER" | "STAFF" = "OWNER") {
  const { buatAccessToken } = await import("@/lib/auth/token");
  const { COOKIE_ACCESS_TOKEN } = await import("@/lib/auth/cookie");
  const token = await buatAccessToken({ sub: "admin_test_1", tipe: "admin", role });
  return `${COOKIE_ACCESS_TOKEN}=${token}`;
}

const konteks = (id = "p1") => ({ params: Promise.resolve({ id }) });

function req(method: string, body?: unknown, cookie?: string) {
  return new NextRequest("http://localhost/api/admin/produk/p1", {
    method,
    headers: { "Content-Type": "application/json", ...(cookie ? { cookie } : {}) },
    ...(body !== undefined && { body: typeof body === "string" ? body : JSON.stringify(body) }),
  });
}

/** tx palsu yang merekam urutan dan argumen setiap operasi. */
function pasangTransaksi() {
  const rekam = {
    urutan: [] as string[],
    update: undefined as any,
    gambar: undefined as any,
    varian: undefined as any,
    log: undefined as any,
  };
  fakePrisma.$transaction = async (fn: (tx: unknown) => unknown) =>
    fn({
      produk: {
        update: async (a: any) => {
          rekam.urutan.push("produk.update");
          rekam.update = a;
          return { id: "p1", namaProduk: "Produk Lama", ...a.data };
        },
      },
      produkGambar: {
        deleteMany: async () => {
          rekam.urutan.push("gambar.hapus");
          return { count: 1 };
        },
        createMany: async (a: any) => {
          rekam.urutan.push("gambar.buat");
          rekam.gambar = a;
          return { count: a.data.length };
        },
      },
      produkVarian: {
        deleteMany: async () => {
          rekam.urutan.push("varian.hapus");
          return { count: 1 };
        },
        createMany: async (a: any) => {
          rekam.urutan.push("varian.buat");
          rekam.varian = a;
          return { count: a.data.length };
        },
      },
      logAktivitas: {
        create: async (a: any) => {
          rekam.urutan.push("log");
          rekam.log = a.data;
          return {};
        },
      },
    });
  return rekam;
}

// ================= GET =================

test("GET admin/produk/[id] tanpa login ditolak 401", async () => {
  const res = await GET(req("GET"), konteks());

  assert.equal(res.status, 401);
});

test("GET admin/produk/[id]: produk tidak ada -> 404", async () => {
  fakePrisma.produk = { findUnique: async () => null };

  const res = await GET(req("GET", undefined, await cookieAdmin()), konteks());

  assert.equal(res.status, 404);
});

test("GET admin/produk/[id]: produk dikembalikan beserta gambar (terurut), varian, kategori", async () => {
  let arg: any;
  fakePrisma.produk = {
    findUnique: async (a: any) => {
      arg = a;
      return { id: "p1", namaProduk: "Tas" };
    },
  };

  const res = await GET(req("GET", undefined, await cookieAdmin()), konteks("p1"));
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.equal(json.produk.namaProduk, "Tas");
  assert.deepEqual(arg.where, { id: "p1" });
  assert.deepEqual(arg.include, { gambar: { orderBy: { urutan: "asc" } }, varian: true, kategori: true });
});

test("GET admin/produk/[id]: error tak terduga dilempar ulang", async () => {
  fakePrisma.produk = {
    findUnique: async () => {
      throw new Error("db putus");
    },
  };

  await assert.rejects(async () => GET(req("GET", undefined, await cookieAdmin()), konteks()), /db putus/);
});

// ================= PATCH =================

test("PATCH tanpa login ditolak 401", async () => {
  const res = await PATCH(req("PATCH", { namaProduk: "Baru" }), konteks());

  assert.equal(res.status, 401);
});

test("PATCH dengan body tidak valid ditolak 400 sebelum menyentuh database", async () => {
  let dbDipanggil = false;
  fakePrisma.$transaction = async () => {
    dbDipanggil = true;
  };

  const res = await PATCH(req("PATCH", "bukan json", await cookieAdmin()), konteks());

  assert.equal(res.status, 400);
  assert.equal(dbDipanggil, false);
});

test("PATCH hanya nama: tidak memicu perhitungan harga/kurs, hanya field itu yang diubah, log dicatat", async () => {
  // fakePrisma.kursMaster sengaja tidak ada: kalau route menyentuhnya, test ini melempar error
  const rekam = pasangTransaksi();

  const res = await PATCH(req("PATCH", { namaProduk: "Nama Baru" }, await cookieAdmin()), konteks("p1"));
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.equal(json.produk.namaProduk, "Nama Baru");
  assert.deepEqual(rekam.update.where, { id: "p1" });
  assert.deepEqual(rekam.update.data, { namaProduk: "Nama Baru" });
  assert.deepEqual(rekam.urutan, ["produk.update", "log"]);
  assert.equal(rekam.log.aksi, "UBAH_PRODUK");
});

test("PATCH hargaAsalRmb saja: kurs aktif dari KursMaster dipakai, harga jual dihitung ulang", async () => {
  fakePrisma.kursMaster = { findFirst: async () => ({ id: "k1", kursRmbIdr: 2300 }) };
  const rekam = pasangTransaksi();

  const res = await PATCH(req("PATCH", { hargaAsalRmb: 10 }, await cookieAdmin()), konteks());

  assert.equal(res.status, 200);
  assert.equal(rekam.update.data.hargaAsalRmb, 10);
  assert.equal(rekam.update.data.kurs, 2300);
  assert.equal(rekam.update.data.hargaJualIdr, 23000); // 10 x 2300, tanpa markup
});

test("PATCH kurs saja: hargaAsalRmb diambil dari produk lama, harga dihitung ulang", async () => {
  fakePrisma.produk = { findUnique: async () => ({ hargaAsalRmb: 15 }) };
  const rekam = pasangTransaksi();

  const res = await PATCH(req("PATCH", { kurs: 2000 }, await cookieAdmin()), konteks());

  assert.equal(res.status, 200);
  assert.equal(rekam.update.data.kurs, 2000);
  assert.equal(rekam.update.data.hargaJualIdr, 30000); // 15 x 2000
  assert.ok(!("hargaAsalRmb" in rekam.update.data), "hargaAsalRmb tidak dikirim, jadi tidak diubah");
});

test("PATCH kurs saja untuk produk yang tidak ada -> 404", async () => {
  fakePrisma.produk = { findUnique: async () => null };
  pasangTransaksi();

  const res = await PATCH(req("PATCH", { kurs: 2000 }, await cookieAdmin()), konteks());

  assert.equal(res.status, 404);
});

test("PATCH hargaJualIdr eksplisit: dipakai apa adanya, produk lama tidak dibaca", async () => {
  fakePrisma.kursMaster = { findFirst: async () => ({ id: "k1", kursRmbIdr: 2300 }) };
  let produkDibaca = false;
  fakePrisma.produk = {
    findUnique: async () => {
      produkDibaca = true;
      return { hargaAsalRmb: 15 };
    },
  };
  const rekam = pasangTransaksi();

  const res = await PATCH(req("PATCH", { hargaJualIdr: 99000 }, await cookieAdmin()), konteks());

  assert.equal(res.status, 200);
  assert.equal(rekam.update.data.hargaJualIdr, 99000);
  assert.equal(produkDibaca, false);
});

test("PATCH harga tanpa kurs dan KursMaster kosong -> 400, bukan crash", async () => {
  fakePrisma.kursMaster = { findFirst: async () => null };
  pasangTransaksi();

  const res = await PATCH(req("PATCH", { hargaAsalRmb: 10 }, await cookieAdmin()), konteks());

  assert.equal(res.status, 400);
});

test("PATCH gambarUrls: gambar lama dihapus lalu diganti total dengan urutan = indeks", async () => {
  const rekam = pasangTransaksi();
  const urls = ["https://cdn.example.com/a.jpg", "https://cdn.example.com/b.jpg"];

  await PATCH(req("PATCH", { gambarUrls: urls }, await cookieAdmin()), konteks("p1"));

  assert.deepEqual(rekam.urutan, ["produk.update", "gambar.hapus", "gambar.buat", "log"]);
  assert.deepEqual(rekam.gambar.data, [
    { produkId: "p1", urlGambar: urls[0], urutan: 0 },
    { produkId: "p1", urlGambar: urls[1], urutan: 1 },
  ]);
});

test("PATCH varian: varian lama dihapus lalu diganti total; array kosong berarti hapus semua", async () => {
  const rekam = pasangTransaksi();
  const varian = [{ namaVarian: "Ukuran 40", stok: 5, hargaTambahan: 10000 }];

  await PATCH(req("PATCH", { varian }, await cookieAdmin()), konteks("p1"));

  assert.deepEqual(rekam.urutan, ["produk.update", "varian.hapus", "varian.buat", "log"]);
  assert.deepEqual(rekam.varian.data, [{ produkId: "p1", namaVarian: "Ukuran 40", stok: 5, hargaTambahan: 10000 }]);

  const rekam2 = pasangTransaksi();
  await PATCH(req("PATCH", { varian: [] }, await cookieAdmin()), konteks("p1"));
  assert.deepEqual(rekam2.varian.data, []);
});

test("PATCH produk yang tidak ada (P2025 dari database) -> 404", async () => {
  fakePrisma.$transaction = async () => {
    throw new Prisma.PrismaClientKnownRequestError("Record not found", { code: "P2025", clientVersion: "test" });
  };

  const res = await PATCH(req("PATCH", { namaProduk: "Baru" }, await cookieAdmin()), konteks());

  assert.equal(res.status, 404);
});

test("PATCH: error tak terduga dilempar ulang supaya tercatat 500", async () => {
  fakePrisma.$transaction = async () => {
    throw new Error("db putus");
  };

  await assert.rejects(
    async () => PATCH(req("PATCH", { namaProduk: "Baru" }, await cookieAdmin()), konteks()),
    /db putus/
  );
});

// ================= DELETE (soft delete) =================

test("DELETE tanpa login ditolak 401", async () => {
  const res = await DELETE(req("DELETE"), konteks());

  assert.equal(res.status, 401);
});

test("DELETE produk tidak ada -> 404, tidak ada yang diubah", async () => {
  fakePrisma.produk = { findUnique: async () => null };
  let transaksi = false;
  fakePrisma.$transaction = async () => {
    transaksi = true;
  };

  const res = await DELETE(req("DELETE", undefined, await cookieAdmin()), konteks());

  assert.equal(res.status, 404);
  assert.equal(transaksi, false);
});

test("DELETE = nonaktifkan (soft delete): status NONAKTIF, bukan dihapus, log dicatat", async () => {
  fakePrisma.produk = { findUnique: async () => ({ id: "p1", namaProduk: "Tas Lama" }) };
  const rekam = pasangTransaksi();

  const res = await DELETE(req("DELETE", undefined, await cookieAdmin()), konteks("p1"));

  assert.equal(res.status, 200);
  assert.deepEqual(rekam.update, { where: { id: "p1" }, data: { status: "NONAKTIF" } });
  assert.equal(rekam.log.aksi, "NONAKTIFKAN_PRODUK");
  assert.deepEqual(rekam.urutan, ["produk.update", "log"]);
});

test("DELETE: error tak terduga dilempar ulang", async () => {
  fakePrisma.produk = { findUnique: async () => ({ id: "p1", namaProduk: "Tas" }) };
  fakePrisma.$transaction = async () => {
    throw new Error("db putus");
  };

  await assert.rejects(async () => DELETE(req("DELETE", undefined, await cookieAdmin()), konteks()), /db putus/);
});