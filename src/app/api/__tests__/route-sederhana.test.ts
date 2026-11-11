// letak: src/app/api/__tests__/route-sederhana.test.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { Prisma } from "@prisma/client";

const fakePrisma: any = {};
const fakeKurs: {
  list?: () => unknown;
  buat?: (...a: any[]) => unknown;
  aktif?: () => unknown;
} = {};

let kategori: typeof import("../admin/kategori/route");
let kategoriId: typeof import("../admin/kategori/[id]/route");
let komplainAdmin: typeof import("../admin/komplain/route");
let kursMaster: typeof import("../admin/kurs-master/route");
let kursAktif: typeof import("../admin/kurs-master/aktif/route");
let pembayaranAdmin: typeof import("../admin/pembayaran/route");
let poAdmin: typeof import("../admin/permintaan-po/route");
let pesananAdmin: typeof import("../admin/pesanan/route");
let pesananAdminId: typeof import("../admin/pesanan/[id]/route");
let health: typeof import("../health/route");
let kategoriPublik: typeof import("../kategori/route");
let poId: typeof import("../permintaan-po/[id]/route");
let produkId: typeof import("../produk/[id]/route");
let AppError: typeof import("@/lib/http-error").AppError;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-route-sederhana-minimal-32-karakter";
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  mock.module("@/lib/kurs-master", {
    namedExports: {
      listRiwayatKurs: async () => fakeKurs.list?.(),
      buatKursBaru: async (...a: never[]) => fakeKurs.buat?.(...a),
      ambilKursAktif: async () => fakeKurs.aktif?.(),
    },
  });

  kategori = await import("../admin/kategori/route");
  kategoriId = await import("../admin/kategori/[id]/route");
  komplainAdmin = await import("../admin/komplain/route");
  kursMaster = await import("../admin/kurs-master/route");
  kursAktif = await import("../admin/kurs-master/aktif/route");
  pembayaranAdmin = await import("../admin/pembayaran/route");
  poAdmin = await import("../admin/permintaan-po/route");
  pesananAdmin = await import("../admin/pesanan/route");
  pesananAdminId = await import("../admin/pesanan/[id]/route");
  health = await import("../health/route");
  kategoriPublik = await import("../kategori/route");
  poId = await import("../permintaan-po/[id]/route");
  produkId = await import("../produk/[id]/route");
  ({ AppError } = await import("@/lib/http-error"));
});

beforeEach(() => {
  for (const key of Object.keys(fakePrisma)) delete fakePrisma[key];
  delete fakeKurs.list;
  delete fakeKurs.buat;
  delete fakeKurs.aktif;
});

// ---------- helper ----------

async function cookieAdmin(role: "OWNER" | "STAFF" = "OWNER") {
  const { buatAccessToken } = await import("@/lib/auth/token");
  const { COOKIE_ACCESS_TOKEN } = await import("@/lib/auth/cookie");
  const token = await buatAccessToken({ sub: "admin_test_1", tipe: "admin", role });
  return `${COOKIE_ACCESS_TOKEN}=${token}`;
}

async function cookieCustomer(sub = "cust_1") {
  const { buatAccessToken } = await import("@/lib/auth/token");
  const { COOKIE_ACCESS_TOKEN } = await import("@/lib/auth/cookie");
  const token = await buatAccessToken({ sub, tipe: "customer" });
  return `${COOKIE_ACCESS_TOKEN}=${token}`;
}

const konteks = (id = "x1") => ({ params: Promise.resolve({ id }) });

function req(method: string, path: string, opsi: { body?: unknown; cookie?: string } = {}) {
  return new NextRequest(`http://localhost/api/${path}`, {
    method,
    headers: { "Content-Type": "application/json", ...(opsi.cookie ? { cookie: opsi.cookie } : {}) },
    ...(opsi.body !== undefined && {
      body: typeof opsi.body === "string" ? opsi.body : JSON.stringify(opsi.body),
    }),
  });
}

function errPrisma(code: string) {
  return new Prisma.PrismaClientKnownRequestError("galat prisma", { code, clientVersion: "test" });
}

function pasangDaftar(model: string, items: unknown[] = [], total = 0) {
  const rekam: { findMany?: any; count?: any } = {};
  fakePrisma[model] = {
    findMany: async (a: any) => {
      rekam.findMany = a;
      return items;
    },
    count: async (a: any) => {
      rekam.count = a;
      return total;
    },
  };
  return rekam;
}

// ================= MATRIKS AKSES: semua route admin =================

const rutAdmin: { nama: string; panggil: (cookie?: string) => Promise<Response> }[] = [
  {
    nama: "POST admin/kategori",
    panggil: (c) => kategori.POST(req("POST", "admin/kategori", { body: { namaKategori: "Tas" }, cookie: c })),
  },
  {
    nama: "PATCH admin/kategori/[id]",
    panggil: (c) =>
      kategoriId.PATCH(req("PATCH", "admin/kategori/k1", { body: { namaKategori: "Tas" }, cookie: c }), konteks("k1")),
  },
  {
    nama: "DELETE admin/kategori/[id]",
    panggil: (c) => kategoriId.DELETE(req("DELETE", "admin/kategori/k1", { cookie: c }), konteks("k1")),
  },
  { nama: "GET admin/komplain", panggil: (c) => komplainAdmin.GET(req("GET", "admin/komplain", { cookie: c })) },
  { nama: "GET admin/kurs-master", panggil: (c) => kursMaster.GET(req("GET", "admin/kurs-master", { cookie: c })) },
  {
    nama: "POST admin/kurs-master",
    panggil: (c) => kursMaster.POST(req("POST", "admin/kurs-master", { body: { kursRmbIdr: 2300 }, cookie: c })),
  },
  {
    nama: "GET admin/kurs-master/aktif",
    panggil: (c) => kursAktif.GET(req("GET", "admin/kurs-master/aktif", { cookie: c })),
  },
  { nama: "GET admin/pembayaran", panggil: (c) => pembayaranAdmin.GET(req("GET", "admin/pembayaran", { cookie: c })) },
  { nama: "GET admin/permintaan-po", panggil: (c) => poAdmin.GET(req("GET", "admin/permintaan-po", { cookie: c })) },
  { nama: "GET admin/pesanan", panggil: (c) => pesananAdmin.GET(req("GET", "admin/pesanan", { cookie: c })) },
  {
    nama: "GET admin/pesanan/[id]",
    panggil: (c) => pesananAdminId.GET(req("GET", "admin/pesanan/p1", { cookie: c }), konteks("p1")),
  },
];

for (const r of rutAdmin) {
  test(`${r.nama}: tanpa login ditolak 401 dan database tidak disentuh`, async () => {
    // fakePrisma kosong: kalau route tetap query, test ini melempar TypeError
    const res = await r.panggil();
    assert.equal(res.status, 401);
  });

  test(`${r.nama}: token pelanggan tidak boleh mengakses area admin (401/403)`, async () => {
    const res = await r.panggil(await cookieCustomer());
    assert.ok([401, 403].includes(res.status), `status ${res.status}`);
  });
}

// ================= admin/kategori =================

test("POST admin/kategori: berhasil 201, data diteruskan ke database", async () => {
  let arg: any;
  fakePrisma.kategori = {
    create: async (a: any) => {
      arg = a;
      return { id: "k1", ...a.data };
    },
  };

  const res = await kategori.POST(req("POST", "admin/kategori", { body: { namaKategori: "Tas" }, cookie: await cookieAdmin() }));
  const json = await res.json();

  assert.equal(res.status, 201);
  assert.equal(arg.data.namaKategori, "Tas");
  assert.equal(json.kategori.id, "k1");
  assert.equal(json.message, "Kategori dibuat");
});

test("POST admin/kategori: STAFF juga boleh (tidak dibatasi role OWNER)", async () => {
  fakePrisma.kategori = { create: async (a: any) => ({ id: "k1", ...a.data }) };

  const res = await kategori.POST(req("POST", "admin/kategori", { body: { namaKategori: "Tas" }, cookie: await cookieAdmin("STAFF") }));

  assert.equal(res.status, 201);
});

test("POST admin/kategori: body tidak valid ditolak 400 sebelum menyentuh database", async () => {
  let dipanggil = false;
  fakePrisma.kategori = {
    create: async () => {
      dipanggil = true;
      return {};
    },
  };

  const res = await kategori.POST(req("POST", "admin/kategori", { body: "bukan json", cookie: await cookieAdmin() }));

  assert.equal(res.status, 400);
  assert.equal(dipanggil, false);
});

test("POST admin/kategori: error tak terduga dilempar ulang", async () => {
  fakePrisma.kategori = {
    create: async () => {
      throw new Error("db putus");
    },
  };

  await assert.rejects(
    async () => kategori.POST(req("POST", "admin/kategori", { body: { namaKategori: "Tas" }, cookie: await cookieAdmin() })),
    /db putus/
  );
});

// ================= admin/kategori/[id] =================

test("PATCH admin/kategori/[id]: berhasil, id dari URL dan data diteruskan", async () => {
  let arg: any;
  fakePrisma.kategori = {
    update: async (a: any) => {
      arg = a;
      return { id: "k9", ...a.data };
    },
  };

  const res = await kategoriId.PATCH(
    req("PATCH", "admin/kategori/k9", { body: { namaKategori: "Sepatu" }, cookie: await cookieAdmin() }),
    konteks("k9")
  );
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.deepEqual(arg.where, { id: "k9" });
  assert.equal(arg.data.namaKategori, "Sepatu");
  assert.equal(json.message, "Kategori diperbarui");
});

test("PATCH admin/kategori/[id]: body tidak valid ditolak 400", async () => {
  let dipanggil = false;
  fakePrisma.kategori = {
    update: async () => {
      dipanggil = true;
      return {};
    },
  };

  const res = await kategoriId.PATCH(
    req("PATCH", "admin/kategori/k9", { body: "bukan json", cookie: await cookieAdmin() }),
    konteks("k9")
  );

  assert.equal(res.status, 400);
  assert.equal(dipanggil, false);
});

test("PATCH admin/kategori/[id]: kategori tidak ada (P2025) -> 404", async () => {
  fakePrisma.kategori = {
    update: async () => {
      throw errPrisma("P2025");
    },
  };

  const res = await kategoriId.PATCH(
    req("PATCH", "admin/kategori/hilang", { body: { namaKategori: "Kategori Hilang" }, cookie: await cookieAdmin() }),
    konteks("hilang")
  );

  assert.equal(res.status, 404);
  assert.deepEqual(await res.json(), { error: "Kategori tidak ditemukan" });
});

test("PATCH admin/kategori/[id]: error lain dilempar ulang", async () => {
  fakePrisma.kategori = {
    update: async () => {
      throw new Error("db putus");
    },
  };

  await assert.rejects(
    async () =>
      kategoriId.PATCH(
        req("PATCH", "admin/kategori/k1", { body: { namaKategori: "Kategori Baru" }, cookie: await cookieAdmin() }),
        konteks("k1")
      ),
    /db putus/
  );
});

test("DELETE admin/kategori/[id]: berhasil menghapus", async () => {
  let arg: any;
  fakePrisma.kategori = {
    delete: async (a: any) => {
      arg = a;
      return {};
    },
  };

  const res = await kategoriId.DELETE(req("DELETE", "admin/kategori/k9", { cookie: await cookieAdmin() }), konteks("k9"));

  assert.equal(res.status, 200);
  assert.deepEqual(arg, { where: { id: "k9" } });
  assert.deepEqual(await res.json(), { message: "Kategori dihapus" });
});

test("DELETE admin/kategori/[id]: tidak ada (P2025) -> 404", async () => {
  fakePrisma.kategori = {
    delete: async () => {
      throw errPrisma("P2025");
    },
  };

  const res = await kategoriId.DELETE(req("DELETE", "admin/kategori/x", { cookie: await cookieAdmin() }), konteks("x"));

  assert.equal(res.status, 404);
});

test("DELETE admin/kategori/[id]: masih dipakai produk (P2003) -> 409 dengan pesan jelas", async () => {
  fakePrisma.kategori = {
    delete: async () => {
      throw errPrisma("P2003");
    },
  };

  const res = await kategoriId.DELETE(req("DELETE", "admin/kategori/x", { cookie: await cookieAdmin() }), konteks("x"));

  assert.equal(res.status, 409);
  assert.match((await res.json()).error, /masih dipakai produk/);
});

test("DELETE admin/kategori/[id]: kode Prisma lain dan error biasa dilempar ulang", async () => {
  fakePrisma.kategori = {
    delete: async () => {
      throw errPrisma("P2002");
    },
  };
  await assert.rejects(
    async () => kategoriId.DELETE(req("DELETE", "admin/kategori/x", { cookie: await cookieAdmin() }), konteks("x")),
    /galat prisma/
  );

  fakePrisma.kategori = {
    delete: async () => {
      throw new Error("db putus");
    },
  };
  await assert.rejects(
    async () => kategoriId.DELETE(req("DELETE", "admin/kategori/x", { cookie: await cookieAdmin() }), konteks("x")),
    /db putus/
  );
});

// ================= admin/komplain =================

test("GET admin/komplain: default hanya yang BELUM selesai, halaman 1 (20 data), urut FIFO", async () => {
  const items = [{ id: "kp1" }];
  const rekam = pasangDaftar("komplain", items, 1);

  const res = await komplainAdmin.GET(req("GET", "admin/komplain", { cookie: await cookieAdmin() }));
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.deepEqual(json, { items, total: 1, page: 1, limit: 20 });
  assert.deepEqual(rekam.findMany.where, { status: { not: "SELESAI" } });
  assert.equal(rekam.findMany.skip, 0);
  assert.equal(rekam.findMany.take, 20);
  assert.deepEqual(rekam.findMany.orderBy, { id: "asc" });
  assert.deepEqual(rekam.count.where, rekam.findMany.where);
});

test("GET admin/komplain: filter status eksplisit dan paginasi", async () => {
  const rekam = pasangDaftar("komplain");

  await komplainAdmin.GET(req("GET", "admin/komplain?status=DIPROSES&page=3&limit=5", { cookie: await cookieAdmin() }));

  assert.deepEqual(rekam.findMany.where, { status: "DIPROSES" });
  assert.equal(rekam.findMany.skip, 10);
  assert.equal(rekam.findMany.take, 5);
});

test("GET admin/komplain: yang dimuat hanya kontak minimal pelanggan (tanpa email/alamat), log terurut", async () => {
  const rekam = pasangDaftar("komplain");

  await komplainAdmin.GET(req("GET", "admin/komplain", { cookie: await cookieAdmin() }));

  const pesanan = rekam.findMany.include.pesananItem.include.pesanan;
  assert.deepEqual(pesanan.select.customer, { select: { nama: true, noWa: true } });
  assert.deepEqual(rekam.findMany.include.log.orderBy, { waktu: "asc" });
  assert.deepEqual(rekam.findMany.include.log.include.admin, { select: { nama: true } });
});

test("GET admin/komplain: status tidak dikenal ditolak 400", async () => {
  pasangDaftar("komplain");

  const res = await komplainAdmin.GET(req("GET", "admin/komplain?status=BUKAN_STATUS", { cookie: await cookieAdmin() }));

  assert.equal(res.status, 400);
});

// ================= admin/kurs-master =================

test("GET admin/kurs-master: riwayat kurs dikembalikan", async () => {
  const items = [{ id: "k2", kursRmbIdr: 2350 }, { id: "k1", kursRmbIdr: 2300 }];
  fakeKurs.list = () => items;

  const res = await kursMaster.GET(req("GET", "admin/kurs-master", { cookie: await cookieAdmin() }));

  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { items });
});

test("POST admin/kurs-master: berhasil 201, dicatat atas nama admin yang login (append-only)", async () => {
  let args: any[] = [];
  fakeKurs.buat = (...a) => {
    args = a;
    return { id: "k3", kursRmbIdr: a[1] };
  };

  const res = await kursMaster.POST(req("POST", "admin/kurs-master", { body: { kursRmbIdr: 2400 }, cookie: await cookieAdmin() }));
  const json = await res.json();

  assert.equal(res.status, 201);
  assert.deepEqual(args, ["admin_test_1", 2400]);
  assert.equal(json.kurs.id, "k3");
  assert.equal(json.message, "Kurs baru dicatat");
});

test("POST admin/kurs-master: body tidak valid ditolak 400 dan kurs tidak dicatat", async () => {
  let dipanggil = false;
  fakeKurs.buat = () => {
    dipanggil = true;
  };

  const res = await kursMaster.POST(req("POST", "admin/kurs-master", { body: "bukan json", cookie: await cookieAdmin() }));

  assert.equal(res.status, 400);
  assert.equal(dipanggil, false);
});

test("admin/kurs-master: error tak terduga dilempar ulang (GET dan POST)", async () => {
  fakeKurs.list = () => {
    throw new Error("db putus");
  };
  fakeKurs.buat = () => {
    throw new Error("db putus");
  };

  await assert.rejects(async () => kursMaster.GET(req("GET", "admin/kurs-master", { cookie: await cookieAdmin() })), /db putus/);
  await assert.rejects(
    async () => kursMaster.POST(req("POST", "admin/kurs-master", { body: { kursRmbIdr: 2400 }, cookie: await cookieAdmin() })),
    /db putus/
  );
});

// ================= admin/kurs-master/aktif =================

test("GET admin/kurs-master/aktif: kurs aktif dikembalikan", async () => {
  fakeKurs.aktif = () => ({ id: "k2", kursRmbIdr: 2350 });

  const res = await kursAktif.GET(req("GET", "admin/kurs-master/aktif", { cookie: await cookieAdmin() }));

  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { kurs: { id: "k2", kursRmbIdr: 2350 } });
});

test("GET admin/kurs-master/aktif: AppError (mis. belum ada kurs) diubah jadi respons dengan statusnya", async () => {
  fakeKurs.aktif = () => {
    throw new AppError("Kurs belum diatur", 404);
  };

  const res = await kursAktif.GET(req("GET", "admin/kurs-master/aktif", { cookie: await cookieAdmin() }));

  assert.equal(res.status, 404);
  assert.deepEqual(await res.json(), { error: "Kurs belum diatur" });
});

test("GET admin/kurs-master/aktif: error tak terduga dilempar ulang", async () => {
  fakeKurs.aktif = () => {
    throw new Error("db putus");
  };

  await assert.rejects(
    async () => kursAktif.GET(req("GET", "admin/kurs-master/aktif", { cookie: await cookieAdmin() })),
    /db putus/
  );
});

// ================= admin/pembayaran =================

test("GET admin/pembayaran: default hanya yang MENUNGGU_VERIFIKASI, urut FIFO", async () => {
  const items = [{ id: "pb1" }];
  const rekam = pasangDaftar("pembayaran", items, 1);

  const res = await pembayaranAdmin.GET(req("GET", "admin/pembayaran", { cookie: await cookieAdmin() }));
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.deepEqual(json, { items, total: 1, page: 1, limit: 20 });
  assert.deepEqual(rekam.findMany.where, { status: "MENUNGGU_VERIFIKASI" });
  assert.deepEqual(rekam.findMany.orderBy, { id: "asc" });
  assert.deepEqual(rekam.count.where, rekam.findMany.where);
});

test("GET admin/pembayaran: filter status eksplisit dan paginasi", async () => {
  const rekam = pasangDaftar("pembayaran");

  await pembayaranAdmin.GET(req("GET", "admin/pembayaran?status=TERVERIFIKASI&page=2&limit=10", { cookie: await cookieAdmin() }));

  assert.deepEqual(rekam.findMany.where, { status: "TERVERIFIKASI" });
  assert.equal(rekam.findMany.skip, 10);
  assert.equal(rekam.findMany.take, 10);
});

test("GET admin/pembayaran: data pesanan yang dimuat dibatasi (id, invoice, customerId, total)", async () => {
  const rekam = pasangDaftar("pembayaran");

  await pembayaranAdmin.GET(req("GET", "admin/pembayaran", { cookie: await cookieAdmin() }));

  assert.deepEqual(rekam.findMany.include.pesanan.select, {
    id: true,
    noInvoice: true,
    customerId: true,
    totalAkhir: true,
  });
});

test("GET admin/pembayaran: status tidak dikenal ditolak 400", async () => {
  pasangDaftar("pembayaran");

  const res = await pembayaranAdmin.GET(req("GET", "admin/pembayaran?status=BUKAN_STATUS", { cookie: await cookieAdmin() }));

  assert.equal(res.status, 400);
});

// ================= admin/permintaan-po =================

test("GET admin/permintaan-po: default hanya yang MENUNGGU_REVIEW, urut tanggal submit (FIFO)", async () => {
  const items = [{ id: "po1" }];
  const rekam = pasangDaftar("permintaanPo", items, 1);

  const res = await poAdmin.GET(req("GET", "admin/permintaan-po", { cookie: await cookieAdmin() }));
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.deepEqual(json, { items, total: 1, page: 1, limit: 20 });
  assert.deepEqual(rekam.findMany.where, { status: "MENUNGGU_REVIEW" });
  assert.deepEqual(rekam.findMany.orderBy, { tglSubmit: "asc" });
  assert.deepEqual(rekam.count.where, rekam.findMany.where);
});

test("GET admin/permintaan-po: filter status eksplisit dan paginasi", async () => {
  const rekam = pasangDaftar("permintaanPo");

  await poAdmin.GET(req("GET", "admin/permintaan-po?status=DITOLAK&page=2&limit=5", { cookie: await cookieAdmin() }));

  assert.deepEqual(rekam.findMany.where, { status: "DITOLAK" });
  assert.equal(rekam.findMany.skip, 5);
  assert.equal(rekam.findMany.take, 5);
});

test("GET admin/permintaan-po: kontak pelanggan yang dimuat hanya nama, noWa, email", async () => {
  const rekam = pasangDaftar("permintaanPo");

  await poAdmin.GET(req("GET", "admin/permintaan-po", { cookie: await cookieAdmin() }));

  assert.deepEqual(rekam.findMany.include.customer.select, { nama: true, noWa: true, email: true });
});

test("GET admin/permintaan-po: status tidak dikenal ditolak 400", async () => {
  pasangDaftar("permintaanPo");

  const res = await poAdmin.GET(req("GET", "admin/permintaan-po?status=BUKAN_STATUS", { cookie: await cookieAdmin() }));

  assert.equal(res.status, 400);
});

// ================= admin/pesanan =================

test("GET admin/pesanan: tanpa filter semua status, terbaru dulu, pembayaran terakhir ikut dimuat", async () => {
  const items = [{ id: "ps1" }];
  const rekam = pasangDaftar("pesanan", items, 1);

  const res = await pesananAdmin.GET(req("GET", "admin/pesanan", { cookie: await cookieAdmin() }));
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.deepEqual(json, { items, total: 1, page: 1, limit: 20 });
  assert.deepEqual(rekam.findMany.where, {});
  assert.deepEqual(rekam.findMany.orderBy, { tglPesan: "desc" });
  assert.deepEqual(rekam.findMany.include, { pembayaran: { orderBy: { id: "desc" }, take: 1 } });
  assert.deepEqual(rekam.count.where, {});
});

test("GET admin/pesanan: filter status dan paginasi", async () => {
  const rekam = pasangDaftar("pesanan");

  await pesananAdmin.GET(req("GET", "admin/pesanan?status=DIPROSES_ADMIN&page=4&limit=10", { cookie: await cookieAdmin() }));

  assert.deepEqual(rekam.findMany.where, { statusPesanan: "DIPROSES_ADMIN" });
  assert.equal(rekam.findMany.skip, 30);
  assert.equal(rekam.findMany.take, 10);
  assert.deepEqual(rekam.count.where, rekam.findMany.where);
});

test("GET admin/pesanan: status tidak dikenal ditolak 400", async () => {
  pasangDaftar("pesanan");

  const res = await pesananAdmin.GET(req("GET", "admin/pesanan?status=BUKAN_STATUS", { cookie: await cookieAdmin() }));

  assert.equal(res.status, 400);
});

// ================= admin/pesanan/[id] =================

test("GET admin/pesanan/[id]: tidak ada -> 404", async () => {
  fakePrisma.pesanan = { findUnique: async () => null };

  const res = await pesananAdminId.GET(req("GET", "admin/pesanan/p1", { cookie: await cookieAdmin() }), konteks("p1"));

  assert.equal(res.status, 404);
  assert.deepEqual(await res.json(), { error: "Pesanan tidak ditemukan" });
});

test("GET admin/pesanan/[id]: detail lengkap, kontak pelanggan tanpa hash sandi", async () => {
  let arg: any;
  fakePrisma.pesanan = {
    findUnique: async (a: any) => {
      arg = a;
      return { id: "p1", noInvoice: "INV-1" };
    },
  };

  const res = await pesananAdminId.GET(req("GET", "admin/pesanan/p1", { cookie: await cookieAdmin() }), konteks("p1"));
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.equal(json.pesanan.noInvoice, "INV-1");
  assert.deepEqual(arg.where, { id: "p1" });
  assert.deepEqual(arg.include.customer.select, { id: true, nama: true, noWa: true, email: true });
  assert.ok(!("passwordHash" in arg.include.customer.select));
  assert.deepEqual(arg.include.statusLog, { orderBy: { waktu: "asc" } });
  assert.deepEqual(arg.include.pembayaran, { orderBy: { id: "desc" } });
  for (const k of ["item", "alamat", "pengiriman"]) assert.equal(arg.include[k], true);
});

// ================= daftar admin: error tak terduga =================

for (const [nama, model, panggil] of [
  ["admin/komplain", "komplain", (c: string) => komplainAdmin.GET(req("GET", "admin/komplain", { cookie: c }))],
  ["admin/pembayaran", "pembayaran", (c: string) => pembayaranAdmin.GET(req("GET", "admin/pembayaran", { cookie: c }))],
  ["admin/permintaan-po", "permintaanPo", (c: string) => poAdmin.GET(req("GET", "admin/permintaan-po", { cookie: c }))],
  ["admin/pesanan", "pesanan", (c: string) => pesananAdmin.GET(req("GET", "admin/pesanan", { cookie: c }))],
] as const) {
  test(`GET ${nama}: error tak terduga dari database dilempar ulang`, async () => {
    fakePrisma[model] = {
      findMany: async () => {
        throw new Error("db putus");
      },
      count: async () => 0,
    };

    await assert.rejects(async () => panggil(await cookieAdmin()), /db putus/);
  });
}

test("GET admin/pesanan/[id]: error tak terduga dilempar ulang", async () => {
  fakePrisma.pesanan = {
    findUnique: async () => {
      throw new Error("db putus");
    },
  };

  await assert.rejects(
    async () => pesananAdminId.GET(req("GET", "admin/pesanan/p1", { cookie: await cookieAdmin() }), konteks("p1")),
    /db putus/
  );
});

// ================= health =================

test("GET health: database hidup -> 200 ok, tanpa data sensitif", async () => {
  fakePrisma.$queryRaw = async () => [{ "?column?": 1 }];

  const res = await health.GET();
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.equal(json.status, "ok");
  assert.equal(json.db, "up");
  assert.ok(!Number.isNaN(Date.parse(json.waktu)));
  assert.deepEqual(Object.keys(json).sort(), ["db", "status", "waktu"]);
});

test("GET health: database mati -> 503 degraded, tidak melempar error", async () => {
  fakePrisma.$queryRaw = async () => {
    throw new Error("koneksi putus");
  };

  const res = await health.GET();
  const json = await res.json();

  assert.equal(res.status, 503);
  assert.equal(json.status, "degraded");
  assert.equal(json.db, "down");
  assert.ok(!JSON.stringify(json).includes("koneksi putus"), "pesan error internal tidak boleh bocor");
});

// ================= kategori (publik) =================

test("GET kategori: bisa diakses tanpa login, urut nama A-Z", async () => {
  let arg: any;
  const daftar = [{ id: "k1", namaKategori: "Aksesori" }];
  fakePrisma.kategori = {
    findMany: async (a: any) => {
      arg = a;
      return daftar;
    },
  };

  const res = await kategoriPublik.GET();

  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { items: daftar });
  assert.deepEqual(arg, { orderBy: { namaKategori: "asc" } });
});

test("GET kategori: error tak terduga dilempar ulang", async () => {
  fakePrisma.kategori = {
    findMany: async () => {
      throw new Error("db putus");
    },
  };

  await assert.rejects(async () => kategoriPublik.GET(), /db putus/);
});

// ================= permintaan-po/[id] (pelanggan) =================

test("GET permintaan-po/[id]: tanpa login ditolak 401", async () => {
  const res = await poId.GET(req("GET", "permintaan-po/po1"), konteks("po1"));

  assert.equal(res.status, 401);
});

test("GET permintaan-po/[id]: token admin ditolak (401/403) dan database tidak disentuh", async () => {
  const res = await poId.GET(req("GET", "permintaan-po/po1", { cookie: await cookieAdmin() }), konteks("po1"));

  assert.ok([401, 403].includes(res.status), `status ${res.status}`);
});

test("GET permintaan-po/[id]: tidak ada dan milik pelanggan lain dijawab SAMA (404)", async () => {
  fakePrisma.permintaanPo = { findUnique: async () => null };
  const a = await poId.GET(req("GET", "permintaan-po/po1", { cookie: await cookieCustomer() }), konteks("po1"));

  fakePrisma.permintaanPo = { findUnique: async () => ({ id: "po1", customerId: "cust_lain" }) };
  const b = await poId.GET(req("GET", "permintaan-po/po1", { cookie: await cookieCustomer("cust_1") }), konteks("po1"));

  assert.equal(a.status, 404);
  assert.equal(b.status, 404);
  assert.deepEqual(await a.json(), await b.json());
});

test("GET permintaan-po/[id]: milik sendiri berhasil dikembalikan", async () => {
  let arg: any;
  fakePrisma.permintaanPo = {
    findUnique: async (a: any) => {
      arg = a;
      return { id: "po1", customerId: "cust_1", status: "MENUNGGU_REVIEW" };
    },
  };

  const res = await poId.GET(req("GET", "permintaan-po/po1", { cookie: await cookieCustomer("cust_1") }), konteks("po1"));
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.equal(json.po.id, "po1");
  assert.deepEqual(arg, { where: { id: "po1" } });
});

test("GET permintaan-po/[id]: error tak terduga dilempar ulang", async () => {
  fakePrisma.permintaanPo = {
    findUnique: async () => {
      throw new Error("db putus");
    },
  };

  await assert.rejects(
    async () => poId.GET(req("GET", "permintaan-po/po1", { cookie: await cookieCustomer() }), konteks("po1")),
    /db putus/
  );
});

// ================= produk/[id] (publik) =================

test("GET produk/[id]: produk AKTIF dikembalikan tanpa login, gambar terurut", async () => {
  let arg: any;
  fakePrisma.produk = {
    findUnique: async (a: any) => {
      arg = a;
      return { id: "p1", namaProduk: "Tas", status: "AKTIF" };
    },
  };

  const res = await produkId.GET(req("GET", "produk/p1"), konteks("p1"));
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.equal(json.produk.namaProduk, "Tas");
  assert.deepEqual(arg.where, { id: "p1" });
  assert.deepEqual(arg.include, { gambar: { orderBy: { urutan: "asc" } }, varian: true, kategori: true });
});

test("GET produk/[id]: produk tidak ada dan NONAKTIF dijawab SAMA (404), keberadaannya tidak bocor", async () => {
  fakePrisma.produk = { findUnique: async () => null };
  const a = await produkId.GET(req("GET", "produk/p1"), konteks("p1"));
  const teksA = await a.text();

  fakePrisma.produk = { findUnique: async () => ({ id: "p1", namaProduk: "Tas Lama", status: "NONAKTIF" }) };
  const b = await produkId.GET(req("GET", "produk/p1"), konteks("p1"));
  const teksB = await b.text();

  assert.equal(a.status, 404);
  assert.equal(b.status, 404);
  assert.equal(teksA, teksB);
  assert.ok(!teksB.includes("Tas Lama"), "nama produk nonaktif tidak boleh bocor");
});

test("GET produk/[id]: error tak terduga dilempar ulang", async () => {
  fakePrisma.produk = {
    findUnique: async () => {
      throw new Error("db putus");
    },
  };

  await assert.rejects(async () => produkId.GET(req("GET", "produk/p1"), konteks("p1")), /db putus/);
});