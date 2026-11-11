// letak: src/app/api/cron/reminder-pembayaran/__tests__/reminder.test.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";

const SECRET = "rahasia-cron-test";
const JAM = 3600_000;

const fakePrisma: any = {};
const wa: { tujuan: string; pesan: string }[] = [];
const urutan: string[] = [];
const waGagal = new Set<string>(); // nomor tujuan yang pengirimannya gagal
let GET: typeof import("../route").GET;

before(async () => {
  process.env.CRON_SECRET = SECRET;
  process.env.PEMBAYARAN_KEDALUWARSA_JAM = "24"; // dibaca saat modul diimpor
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  mock.module("@/lib/notifikasi", {
    namedExports: {
      kirimNotifikasiWa: async (tujuan: string, pesan: string): Promise<boolean> => {
        urutan.push("wa");
        if (waGagal.has(tujuan)) return false;
        wa.push({ tujuan, pesan });
        return true;
      },
    },
  });
  ({ GET } = await import("../route"));
});

beforeEach(() => {
  for (const key of Object.keys(fakePrisma)) delete fakePrisma[key];
  wa.length = 0;
  urutan.length = 0;
  waGagal.clear();
});

function req(auth: string | null = `Bearer ${SECRET}`) {
  return new NextRequest("http://localhost/api/cron/reminder-pembayaran", {
    headers: auth ? { authorization: auth } : {},
  });
}

/** Pesanan yang sisa waktu bayarnya tinggal `sisaJam` jam (batas 24 jam sejak tglPesan). */
function pesananSisa(id: string, sisaJam: number) {
  return {
    id,
    noInvoice: `INV-${id}`,
    totalAkhir: 250000,
    tglPesan: new Date(Date.now() - (24 - sisaJam) * JAM),
    customer: { id: `cust_${id}`, noWa: `0812${id}`, nama: `Nama ${id}` },
  };
}

function pasangDb(
  daftar: any[],
  opsi: { sudah?: { pesananId: string; tipe: string }[]; gagalBuat?: string[] } = {}
) {
  const rekam = { cari: undefined as any, sudahQuery: undefined as any, buat: [] as any[], sudahDipanggil: false };
  fakePrisma.pesanan = {
    findMany: async (a: any) => {
      rekam.cari = a;
      return daftar;
    },
  };
  fakePrisma.notifikasi = {
    findMany: async (a: any) => {
      rekam.sudahDipanggil = true;
      rekam.sudahQuery = a;
      return opsi.sudah ?? [];
    },
    create: async (a: any) => {
      urutan.push("notifikasi");
      if (opsi.gagalBuat?.includes(a.data.pesananId)) throw new Error("db error");
      rekam.buat.push(a.data);
      return {};
    },
  };
  return rekam;
}

test("tanpa header atau secret salah ditolak 401, database tidak disentuh", async () => {
  // fakePrisma kosong: kalau route tetap query, test ini melempar error
  assert.equal((await GET(req(null))).status, 401);
  assert.equal((await GET(req("Bearer salah"))).status, 401);
});

test("hanya pesanan MENUNGGU_PEMBAYARAN yang dicek", async () => {
  const rekam = pasangDb([]);

  await GET(req());

  assert.deepEqual(rekam.cari.where, { statusPesanan: "MENUNGGU_PEMBAYARAN" });
});

test("tidak ada pesanan menunggu: tidak ada kiriman dan tidak ada query anti-spam", async () => {
  const rekam = pasangDb([]);

  const res = await GET(req());
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.equal(json.dicek, 0);
  assert.equal(json.dikirim, 0);
  assert.deepEqual(json.gagal, []);
  assert.match(json.tanggal, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(rekam.sudahDipanggil, false);
});

test("sisa ~11,5 jam: pengingat REMINDER_12H dikirim ke WA pelanggan dan dicatat", async () => {
  const rekam = pasangDb([pesananSisa("a", 11.5)]);

  const res = await GET(req());
  const json = await res.json();

  assert.equal(json.dikirim, 1);
  assert.equal(rekam.buat.length, 1);
  assert.equal(rekam.buat[0].tipe, "REMINDER_12H");
  assert.equal(rekam.buat[0].customerId, "cust_a");
  assert.equal(rekam.buat[0].pesananId, "a");
  assert.equal(wa.length, 1);
  assert.equal(wa[0]?.tujuan, "0812a");
  const pesan = wa[0]?.pesan ?? "";
  assert.match(pesan, /Nama a/);
  assert.match(pesan, /INV-a/);
  assert.match(pesan, /Rp\s?250\.000/);
  assert.match(pesan, /Sisa waktu pembayaran 11 jam \d+ menit/);
  assert.equal(rekam.buat[0].pesan, pesan, "teks yang dicatat sama dengan yang dikirim");
});

test("sisa ~1,5 jam: pengingat REMINDER_2H", async () => {
  const rekam = pasangDb([pesananSisa("b", 1.5)]);

  await GET(req());

  assert.equal(rekam.buat[0].tipe, "REMINDER_2H");
  assert.match(wa[0]?.pesan ?? "", /Sisa waktu pembayaran 1 jam/);
});

test("di luar jendela pengingat (20 jam, 6 jam, 30 menit, 13 jam) tidak dikirimi apa pun", async () => {
  pasangDb([pesananSisa("c", 20), pesananSisa("d", 6), pesananSisa("e", 0.5), pesananSisa("f", 13)]);

  const res = await GET(req());
  const json = await res.json();

  assert.equal(json.dicek, 4);
  assert.equal(json.dikirim, 0);
  assert.equal(wa.length, 0);
});

test("anti-spam: pengingat yang sudah pernah dikirim pada titik yang sama dilewati", async () => {
  const rekam = pasangDb([pesananSisa("a", 11.5)], { sudah: [{ pesananId: "a", tipe: "REMINDER_12H" }] });

  const json = await (await GET(req())).json();

  assert.equal(json.dikirim, 0);
  assert.equal(wa.length, 0);
  assert.equal(rekam.buat.length, 0);
});

test("anti-spam: pengingat titik lain tidak menghalangi (sudah 2H bukan berarti 12H dilewati)", async () => {
  pasangDb([pesananSisa("a", 11.5)], { sudah: [{ pesananId: "a", tipe: "REMINDER_2H" }] });

  const json = await (await GET(req())).json();

  assert.equal(json.dikirim, 1);
});

test("query anti-spam: hanya untuk pesanan kandidat dan dua tipe pengingat", async () => {
  const rekam = pasangDb([pesananSisa("a", 11.5), pesananSisa("b", 1.5), pesananSisa("z", 20)]);

  await GET(req());

  assert.deepEqual(rekam.sudahQuery.where.pesananId, { in: ["a", "b"] });
  assert.deepEqual(rekam.sudahQuery.where.tipe, { in: ["REMINDER_12H", "REMINDER_2H"] });
});

test("beberapa pesanan sekaligus: tiap pelanggan dikirimi pesannya sendiri", async () => {
  pasangDb([pesananSisa("a", 11.5), pesananSisa("b", 1.5), pesananSisa("z", 20)]);

  const json = await (await GET(req())).json();

  assert.equal(json.dicek, 3);
  assert.equal(json.dikirim, 2);
  assert.deepEqual(wa.map((w) => w.tujuan).sort(), ["0812a", "0812b"]);
});

test("URUTAN: WhatsApp dikirim DULU, tanda dicatat SESUDAH berhasil", async () => {
  pasangDb([pesananSisa("a", 11.5)]);

  await GET(req());

  assert.deepEqual(urutan, ["wa", "notifikasi"]);
});

test("WA gagal terkirim: tanda TIDAK dicatat, masuk daftar gagal, pesanan lain tetap diproses", async () => {
  waGagal.add("0812a");
  const rekam = pasangDb([pesananSisa("a", 11.5), pesananSisa("b", 11.5)]);

  const json = await (await GET(req())).json();

  assert.deepEqual(json.gagal, ["INV-a"]);
  assert.equal(json.dikirim, 1);
  assert.deepEqual(rekam.buat.map((b) => b.pesananId), ["b"], "pesanan a tidak boleh punya tanda");
  assert.deepEqual(wa.map((w) => w.tujuan), ["0812b"]);
});

test("pengingat yang gagal DIULANG di putaran cron berikutnya, lalu tidak diulang lagi", async () => {
  waGagal.add("0812a");
  const rekam = pasangDb([pesananSisa("a", 11.5)]);

  const putaran1 = await (await GET(req())).json();
  assert.equal(putaran1.dikirim, 0);
  assert.deepEqual(putaran1.gagal, ["INV-a"]);

  waGagal.clear(); // layanan WA pulih
  const putaran2 = await (await GET(req())).json();
  assert.equal(putaran2.dikirim, 1);
  assert.deepEqual(putaran2.gagal, []);
  assert.equal(rekam.buat.length, 1, "tanda dicatat tepat satu kali, setelah berhasil");
  assert.deepEqual(wa.map((w) => w.tujuan), ["0812a"]);
});

test("WA terkirim tetapi penyimpanan tanda gagal: masuk daftar gagal (risiko kirim ulang diterima)", async () => {
  pasangDb([pesananSisa("a", 11.5), pesananSisa("b", 11.5)], { gagalBuat: ["a"] });

  const json = await (await GET(req())).json();

  assert.deepEqual(json.gagal, ["INV-a"]);
  assert.equal(json.dikirim, 1);
  assert.deepEqual(wa.map((w) => w.tujuan).sort(), ["0812a", "0812b"], "WA a sudah terkirim sebelum tanda gagal");
});