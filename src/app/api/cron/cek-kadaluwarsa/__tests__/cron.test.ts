// letak: src/app/api/cron/cek-kedaluwarsa/__tests__/cron.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakePrisma: any = {};
let GET: typeof import("../route").GET;

before(async () => {
  process.env.CRON_SECRET = "rahasia-cron-testing";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  ({ GET } = await import("../route"));
});

beforeEach(() => {
  for (const key of Object.keys(fakePrisma)) delete fakePrisma[key];
});

function req(secret?: string) {
  return new NextRequest("http://localhost/api/cron/cek-kedaluwarsa", {
    headers: secret ? { authorization: `Bearer ${secret}` } : {},
  });
}

test("GET tanpa Authorization header ditolak 401", async () => {
  const res = await GET(req());
  assert.equal(res.status, 401);
});

test("GET dengan secret salah ditolak 401", async () => {
  const res = await GET(req("secret-yang-salah"));
  assert.equal(res.status, 401);
});

test("GET dengan secret benar: kandidat yang menang race di-expire + stok dikembalikan, yang kalah race di-skip", async () => {
  const stokDikembalikan: string[] = [];

  fakePrisma.pembayaran = {
    findMany: async () => [
      {
        id: "bayar_MENANG",
        status: "MENUNGGU_BUKTI",
        pesanan: { item: [{ produkId: "produk_A", produkVarianId: null, jumlah: 1 }] },
      },
      {
        id: "bayar_KALAH", // ceritanya admin sudah verifikasi tepat sebelum cron sampai baris ini
        status: "MENUNGGU_VERIFIKASI",
        pesanan: { item: [{ produkId: "produk_B", produkVarianId: null, jumlah: 1 }] },
      },
    ],
  };

  // Counter di scope LUAR $transaction (bukan di dalam), supaya dua panggilan
  // $transaction TERPISAH (satu per kandidat, sesuai lib/pembayaran.ts) tetap
  // berbagi "state dunia nyata" yang sama — persis simulasi race sungguhan:
  // baris pertama yang diproses "menang" (count 1), baris kedua yang
  // ceritanya sudah diproses admin duluan "kalah" (count 0).
  let panggilanKe = 0;
  fakePrisma.$transaction = async (fn: (tx: unknown) => unknown) => {
    panggilanKe++;
    const menang = panggilanKe === 1;
    return fn({
      pembayaran: {
        updateMany: async () => ({ count: menang ? 1 : 0 }),
      },
      produk: {
        updateMany: async (args: { where: { id: string } }) => {
          stokDikembalikan.push(args.where.id);
          return { count: 1 };
        },
      },
    });
  };

  const res = await GET(req("rahasia-cron-testing"));
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.equal(json.diprosesCount, 1, "cuma 1 dari 2 kandidat yang benar-benar diproses (menang race)");
  assert.deepEqual(
    stokDikembalikan,
    ["produk_A"],
    "stok cuma dikembalikan untuk kandidat yang MENANG race, bukan yang sudah diproses admin duluan"
  );
});