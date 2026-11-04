// letak: src/app/api/cron/sync-kurs/__tests__/sync-kurs.test.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, mock, before, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

const fakePrisma: any = {};
let GET: typeof import("../route").GET;
const secretAwal = process.env.CRON_SECRET;

before(async () => {
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  ({ GET } = await import("../route"));
});

beforeEach(() => {
  for (const key of Object.keys(fakePrisma)) delete fakePrisma[key];
  process.env.CRON_SECRET = "rahasia-cron-test";
});

afterEach(() => {
  mock.restoreAll();
  if (secretAwal === undefined) delete process.env.CRON_SECRET;
  else process.env.CRON_SECRET = secretAwal;
});

function req(auth?: string) {
  return new NextRequest("http://localhost/api/cron/sync-kurs", {
    headers: auth ? { authorization: auth } : {},
  });
}

function apiKurs(idr: unknown, status = 200) {
  mock.method(globalThis, "fetch", async () =>
    new Response(JSON.stringify({ rates: { IDR: idr } }), { status })
  );
}

function pasangDb(opsi: { aktif?: number | null; owner?: boolean } = {}) {
  const rekam: { create?: any } = {};
  fakePrisma.kursMaster = {
    findFirst: async () => (opsi.aktif == null ? null : { kursRmbIdr: opsi.aktif }),
    create: async (a: any) => {
      rekam.create = a;
      return { id: "kurs_baru", ...a.data };
    },
  };
  fakePrisma.admin = { findFirst: async () => (opsi.owner === false ? null : { id: "owner_1" }) };
  return rekam;
}

test("sync-kurs tanpa header otorisasi ditolak 401", async () => {
  apiKurs(2300);
  pasangDb();
  assert.equal((await GET(req())).status, 401);
});

test("sync-kurs dengan secret salah ditolak 401", async () => {
  apiKurs(2300);
  pasangDb();
  assert.equal((await GET(req("Bearer salah"))).status, 401);
});

test("sync-kurs: CRON_SECRET belum diisi, header 'Bearer undefined' TIDAK boleh lolos", async () => {
  delete process.env.CRON_SECRET;
  apiKurs(2300);
  const rekam = pasangDb();

  const res = await GET(req("Bearer undefined"));

  assert.equal(res.status, 401);
  assert.equal(rekam.create, undefined);
});

test("sync-kurs: API kurs membalas error -> 502, tidak mencatat apa pun", async () => {
  apiKurs(2300, 500);
  const rekam = pasangDb();

  const res = await GET(req("Bearer rahasia-cron-test"));

  assert.equal(res.status, 502);
  assert.equal(rekam.create, undefined);
});

test("sync-kurs: jaringan gagal -> 502", async () => {
  mock.method(globalThis, "fetch", async () => {
    throw new Error("jaringan putus");
  });
  pasangDb();

  assert.equal((await GET(req("Bearer rahasia-cron-test"))).status, 502);
});

test("sync-kurs: kurs tidak wajar (di luar 1000-10000) ditolak 502 dan tidak dicatat", async () => {
  const rekam = pasangDb();
  for (const nilai of [50, 99999, "bukan angka", null]) {
    mock.restoreAll();
    apiKurs(nilai);
    const res = await GET(req("Bearer rahasia-cron-test"));
    assert.equal(res.status, 502, `nilai ${String(nilai)} harus ditolak`);
  }
  assert.equal(rekam.create, undefined);
});

test("sync-kurs: kurs hampir sama dengan kurs aktif -> tidak ada baris baru", async () => {
  apiKurs(2300.4);
  const rekam = pasangDb({ aktif: 2300 });

  const res = await GET(req("Bearer rahasia-cron-test"));
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.equal(json.berubah, false);
  assert.equal(rekam.create, undefined);
});

test("sync-kurs: kurs berubah -> baris baru dicatat atas nama OWNER", async () => {
  apiKurs(2350);
  const rekam = pasangDb({ aktif: 2300 });

  const res = await GET(req("Bearer rahasia-cron-test"));
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.equal(json.berubah, true);
  assert.equal(json.kursRmbIdr, 2350);
  assert.equal(json.sebelumnya, 2300);
  assert.deepEqual(rekam.create, { data: { adminId: "owner_1", kursRmbIdr: 2350 } });
});

test("sync-kurs: belum ada kurs sama sekali -> tetap dicatat, sebelumnya null", async () => {
  apiKurs(2350);
  const rekam = pasangDb({ aktif: null });

  const json = await (await GET(req("Bearer rahasia-cron-test"))).json();

  assert.equal(json.sebelumnya, null);
  assert.ok(rekam.create);
});

test("sync-kurs: akun OWNER tidak ada -> 500 dan tidak dicatat", async () => {
  apiKurs(2350);
  const rekam = pasangDb({ aktif: 2300, owner: false });

  const res = await GET(req("Bearer rahasia-cron-test"));

  assert.equal(res.status, 500);
  assert.equal(rekam.create, undefined);
});