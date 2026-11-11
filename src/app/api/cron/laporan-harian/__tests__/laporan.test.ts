// letak: src/app/api/cron/laporan-harian/__tests__/laporan.test.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";

const SECRET = "rahasia-cron-test";
const fakePrisma: any = {};
const terkirim: string[] = [];
let GET: typeof import("../route").GET;

before(async () => {
  process.env.CRON_SECRET = SECRET;
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  mock.module("@/lib/notifikasi", {
    namedExports: {
      kirimTelegram: async (pesan: string) => {
        terkirim.push(pesan);
      },
    },
  });
  ({ GET } = await import("../route"));
});

beforeEach(() => {
  for (const key of Object.keys(fakePrisma)) delete fakePrisma[key];
  terkirim.length = 0;
});

function req(auth: string | null = `Bearer ${SECRET}`) {
  return new NextRequest("http://localhost/api/cron/laporan-harian", {
    headers: auth ? { authorization: auth } : {},
  });
}

function awalHariWib() {
  const w = new Date(Date.now() + 7 * 3600_000);
  return Date.UTC(w.getUTCFullYear(), w.getUTCMonth(), w.getUTCDate()) - 7 * 3600_000;
}

function pasangDb(o: { pesananBaru?: number; omzet?: number | null; pembayaran?: number; komplain?: number; customerBaru?: number } = {}) {
  const arg: Record<string, any> = {};
  fakePrisma.pesanan = {
    count: async (a: any) => {
      arg.pesananCount = a;
      return o.pesananBaru ?? 0;
    },
    aggregate: async (a: any) => {
      arg.aggregate = a;
      return { _sum: { totalAkhir: o.omzet === undefined ? 0 : o.omzet } };
    },
  };
  fakePrisma.pembayaran = {
    count: async (a: any) => {
      arg.pembayaran = a;
      return o.pembayaran ?? 0;
    },
  };
  fakePrisma.komplain = {
    count: async (a: any) => {
      arg.komplain = a;
      return o.komplain ?? 0;
    },
  };
  fakePrisma.customer = {
    count: async (a: any) => {
      arg.customer = a;
      return o.customerBaru ?? 0;
    },
  };
  return arg;
}

test("tanpa header atau secret salah ditolak 401, tidak ada laporan terkirim", async () => {
  assert.equal((await GET(req(null))).status, 401);
  assert.equal((await GET(req("Bearer salah"))).status, 401);
  assert.equal(terkirim.length, 0);
});

test("laporan: angka dari database masuk ke JSON dan teks pesan", async () => {
  pasangDb({ pesananBaru: 5, omzet: 2500000, pembayaran: 0, komplain: 0, customerBaru: 3 });

  const res = await GET(req());
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.match(json.tanggal, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(json.pesananBaru, 5);
  assert.equal(json.omzet, 2500000);
  assert.equal(json.pembayaranMenungguVerifikasi, 0);
  assert.equal(json.komplainBelumSelesai, 0);
  assert.equal(json.customerBaru, 3);
  assert.match(json.pesan, /Pesanan masuk: 5/);
  assert.match(json.pesan, /Rp 2\.500\.000/);
  assert.match(json.pesan, /Customer baru: 3/);
});

test("pesan yang dikirim ke Telegram sama persis dengan yang ada di JSON", async () => {
  pasangDb({ pesananBaru: 1 });

  const json = await (await GET(req())).json();

  assert.equal(terkirim.length, 1);
  assert.equal(terkirim[0], json.pesan);
});

test("semua beres: tidak ada pembayaran menunggu dan komplain -> penutup centang", async () => {
  pasangDb();

  const json = await (await GET(req())).json();

  assert.match(json.pesan, /Semua beres hari ini/);
  assert.ok(!json.pesan.includes("perlu ditindaklanjuti"));
});

test("ada pembayaran menunggu verifikasi ATAU komplain aktif -> peringatan tindak lanjut", async () => {
  pasangDb({ pembayaran: 2 });
  assert.match((await (await GET(req())).json()).pesan, /perlu ditindaklanjuti/);

  pasangDb({ komplain: 1 });
  assert.match((await (await GET(req())).json()).pesan, /perlu ditindaklanjuti/);
});

test("omzet kosong (null) menjadi 0 dan Rp 0", async () => {
  pasangDb({ omzet: null });

  const json = await (await GET(req())).json();

  assert.equal(json.omzet, 0);
  assert.match(json.pesan, /Rp 0/);
});

test("jendela 'hari ini' mengikuti tengah malam WIB; omzet tidak termasuk belum bayar/batal", async () => {
  const arg = pasangDb();

  await GET(req());

  assert.equal(arg.pesananCount.where.tglPesan.gte.getTime(), awalHariWib());
  assert.equal(arg.aggregate.where.tglPesan.gte.getTime(), awalHariWib());
  assert.equal(arg.customer.where.tglRegistrasi.gte.getTime(), awalHariWib());
  assert.deepEqual(arg.aggregate.where.statusPesanan, { notIn: ["MENUNGGU_PEMBAYARAN", "DIBATALKAN"] });
  assert.deepEqual(arg.pembayaran.where, { status: "MENUNGGU_VERIFIKASI" });
  assert.deepEqual(arg.komplain.where, { status: { not: "SELESAI" } });
});