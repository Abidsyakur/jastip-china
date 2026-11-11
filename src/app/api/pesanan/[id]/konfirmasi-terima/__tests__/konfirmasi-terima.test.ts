// letak: src/app/api/pesanan/[id]/konfirmasi-terima/__tests__/konfirmasi-terima.test.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";

const fakePrisma: any = {};
let POST: typeof import("../route").POST;
let AppError: typeof import("@/lib/http-error").AppError;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-konfirmasi-minimal-32-karakter";
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  ({ POST } = await import("../route"));
  ({ AppError } = await import("@/lib/http-error"));
});

beforeEach(() => {
  for (const key of Object.keys(fakePrisma)) delete fakePrisma[key];
});

async function cookieCustomer(sub = "cust_1") {
  const { buatAccessToken } = await import("@/lib/auth/token");
  const { COOKIE_ACCESS_TOKEN } = await import("@/lib/auth/cookie");
  return `${COOKIE_ACCESS_TOKEN}=${await buatAccessToken({ sub, tipe: "customer" })}`;
}

async function cookieAdmin() {
  const { buatAccessToken } = await import("@/lib/auth/token");
  const { COOKIE_ACCESS_TOKEN } = await import("@/lib/auth/cookie");
  return `${COOKIE_ACCESS_TOKEN}=${await buatAccessToken({ sub: "admin_1", tipe: "admin", role: "OWNER" })}`;
}

const konteks = (id = "pesanan_1") => ({ params: Promise.resolve({ id }) });

function req(cookie?: string) {
  return new NextRequest("http://localhost/api/pesanan/pesanan_1/konfirmasi-terima", {
    method: "POST",
    headers: cookie ? { cookie } : {},
  });
}

/**
 * Pasang tiruan database. `hitungUpdate` menentukan hasil updateMany di setiap
 * panggilan (mis. [1, 0] = panggilan pertama menang, kedua kalah).
 */
function pasang(opsi: { pesanan?: any; hitungUpdate?: number[]; updateGalat?: Error } = {}) {
  const rekam = {
    cari: undefined as any,
    updateMany: [] as any[],
    log: [] as any[],
    transaksi: 0,
    urutan: [] as string[],
  };
  let panggilan = 0;
  const hitung = opsi.hitungUpdate ?? [1];

  const pesanan = {
    findUnique: async (a: any) => {
      rekam.cari = a;
      return opsi.pesanan === undefined ? { customerId: "cust_1", statusPesanan: "TIBA_KIRIM_LOKAL" } : opsi.pesanan;
    },
    updateMany: async (a: any) => {
      rekam.urutan.push("updateMany");
      rekam.updateMany.push(a);
      if (opsi.updateGalat) throw opsi.updateGalat;
      return { count: hitung[Math.min(panggilan++, hitung.length - 1)] };
    },
  };
  const pesananStatusLog = {
    create: async (a: any) => {
      rekam.urutan.push("log");
      rekam.log.push(a);
      return {};
    },
  };
  fakePrisma.pesanan = pesanan;
  fakePrisma.$transaction = async (fn: (tx: unknown) => unknown) => {
    rekam.transaksi++;
    return fn({ pesanan, pesananStatusLog });
  };
  return rekam;
}

test("tanpa login ditolak 401", async () => {
  assert.equal((await POST(req(), konteks())).status, 401);
});

test("token admin tidak boleh mengonfirmasi atas nama pelanggan (401/403)", async () => {
  const rekam = pasang();

  const res = await POST(req(await cookieAdmin()), konteks());

  assert.ok([401, 403].includes(res.status), `status ${res.status}`);
  assert.equal(rekam.cari, undefined);
});

test("pesanan tidak ada dan pesanan milik orang lain dijawab SAMA (404)", async () => {
  pasang({ pesanan: null });
  const a = await POST(req(await cookieCustomer()), konteks());

  pasang({ pesanan: { customerId: "cust_lain", statusPesanan: "TIBA_KIRIM_LOKAL" } });
  const b = await POST(req(await cookieCustomer("cust_1")), konteks());

  assert.equal(a.status, 404);
  assert.equal(b.status, 404);
  assert.deepEqual(await a.json(), await b.json());
});

test("status selain TIBA_KIRIM_LOKAL ditolak 409 dan tidak ada yang ditulis", async () => {
  for (const status of ["MENUNGGU_PEMBAYARAN", "DIPROSES_ADMIN", "DIKONSOLIDASI_KIRIM", "SELESAI", "DIBATALKAN"]) {
    const rekam = pasang({ pesanan: { customerId: "cust_1", statusPesanan: status } });

    const res = await POST(req(await cookieCustomer()), konteks());

    assert.equal(res.status, 409, `status ${status} harus ditolak`);
    assert.equal(rekam.transaksi, 0, `status ${status}: transaksi tidak boleh dimulai`);
    assert.equal(rekam.log.length, 0);
  }
});

test("berhasil: pembaruan memakai syarat status+pemilik di WHERE, lalu log SELESAI, dalam satu transaksi", async () => {
  const rekam = pasang();

  const res = await POST(req(await cookieCustomer("cust_1")), konteks("pesanan_9"));
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.equal(json.message, "Pesanan dikonfirmasi selesai");
  assert.deepEqual(rekam.cari.where, { id: "pesanan_9" });
  assert.deepEqual(rekam.cari.select, { customerId: true, statusPesanan: true });
  assert.equal(rekam.transaksi, 1);
  assert.deepEqual(rekam.updateMany[0], {
    where: { id: "pesanan_9", customerId: "cust_1", statusPesanan: "TIBA_KIRIM_LOKAL" },
    data: { statusPesanan: "SELESAI" },
  });
  assert.deepEqual(rekam.log, [{ data: { pesananId: "pesanan_9", status: "SELESAI" } }]);
  assert.deepEqual(rekam.urutan, ["updateMany", "log"]);
});

test("kalah balapan (updateMany count 0): 409 dan log TIDAK ditulis", async () => {
  const rekam = pasang({ hitungUpdate: [0] });

  const res = await POST(req(await cookieCustomer()), konteks());

  assert.equal(res.status, 409);
  assert.match((await res.json()).error, /sudah berubah/);
  assert.equal(rekam.log.length, 0);
});

test("dua permintaan beruntun: hanya satu yang menang, log SELESAI tertulis tepat sekali", async () => {
  const rekam = pasang({ hitungUpdate: [1, 0] });
  const cookie = await cookieCustomer();

  const pertama = await POST(req(cookie), konteks());
  const kedua = await POST(req(cookie), konteks());

  assert.equal(pertama.status, 200);
  assert.equal(kedua.status, 409);
  assert.equal(rekam.log.length, 1);
});

test("AppError saat memperbarui diubah jadi respons dengan statusnya", async () => {
  pasang({ updateGalat: new AppError("tidak bisa diubah", 409) });

  const res = await POST(req(await cookieCustomer()), konteks());

  assert.equal(res.status, 409);
  assert.deepEqual(await res.json(), { error: "tidak bisa diubah" });
});

test("error tak terduga dilempar ulang supaya tercatat 500", async () => {
  pasang({ updateGalat: new Error("db putus") });

  await assert.rejects(async () => POST(req(await cookieCustomer()), konteks()), /db putus/);
});