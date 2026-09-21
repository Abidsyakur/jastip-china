// letak: src/app/api/admin/produk/__tests__/produk-admin.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

// Objek prisma palsu yang PROPERTI-nya dibaca ulang tiap kali route handler
// memanggilnya (bukan di-snapshot sekali saat import) — jadi cukup di-mutasi
// per test, tidak perlu mock.module() ulang tiap test (yang ternyata rapuh
// dikombinasikan dengan caching modul ES, lihat catatan di bawah).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakePrisma: any = {};

let POST: typeof import("../route").POST;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-produk-admin-minimal-32-karakter";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  // Diimpor SEKALI saja di sini, bukan per test — karena fakePrisma di atas
  // memang didesain supaya cukup dimutasi, tidak perlu re-import route.ts.
  ({ POST } = await import("../route"));
});

beforeEach(() => {
  // Reset semua method mock sebelum tiap test, supaya test tidak saling bocor.
  for (const key of Object.keys(fakePrisma)) delete fakePrisma[key];
});

/** Bikin cookie header dari access token admin yang valid, untuk simulasi request ter-autentikasi. */
async function cookieAdmin(role: "OWNER" | "STAFF" = "OWNER") {
  const { buatAccessToken } = await import("@/lib/auth/token");
  const { COOKIE_ACCESS_TOKEN } = await import("@/lib/auth/cookie");
  const token = await buatAccessToken({ sub: "admin_test_1", tipe: "admin", role });
  return `${COOKIE_ACCESS_TOKEN}=${token}`;
}

test("POST /api/admin/produk tanpa login ditolak 401", async () => {
  const req = new NextRequest("http://localhost/api/admin/produk", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });

  const res = await POST(req);
  assert.equal(res.status, 401);
});

test("POST /api/admin/produk dengan data valid berhasil bikin produk + gambar + varian + log aktivitas", async () => {
  const logDibuat: unknown[] = [];
  const produkDibuat: unknown[] = [];

  fakePrisma.$transaction = async (fn: (tx: unknown) => unknown) =>
    fn({
      produk: {
        create: async (args: { data: Record<string, unknown> }) => {
          const hasil = {
            id: "produk_1",
            ...args.data,
            gambar: [{ urlGambar: "https://x/a.jpg" }],
            varian: [],
          };
          produkDibuat.push(hasil);
          return hasil;
        },
      },
      logAktivitas: {
        create: async (args: { data: Record<string, unknown> }) => {
          logDibuat.push(args.data);
          return { id: "log_1", ...args.data };
        },
      },
    });

  const body = {
    kategoriId: "ckategoriid000000000001",
    namaProduk: "Tas Import Premium",
    hargaAsalRmb: 100,
    kurs: 2200,
    hargaJualIdr: 250000,
    beratGram: 500,
    linkSumber: "https://taobao.com/item/123",
    gambarUrls: ["https://cdn.example.com/a.jpg"],
    varian: [],
  };

  const req = new NextRequest("http://localhost/api/admin/produk", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: await cookieAdmin() },
    body: JSON.stringify(body),
  });

  const res = await POST(req);
  const json = await res.json();

  assert.equal(res.status, 201);
  assert.equal(produkDibuat.length, 1, "produk.create harus dipanggil tepat sekali");
  assert.equal(logDibuat.length, 1, "logAktivitas.create harus dipanggil tepat sekali (prinsip README #3)");
  assert.equal((logDibuat[0] as { aksi: string }).aksi, "TAMBAH_PRODUK");
  assert.equal(json.produk.namaProduk, "Tas Import Premium");
});

test("POST /api/admin/produk TANPA hargaJualIdr: dihitung round(hargaAsalRmb x kurs) PERSIS, TANPA markup apapun (kasus bug yang dilaporkan)", async () => {
  let dataDikirim: Record<string, unknown> | undefined;
  fakePrisma.$transaction = async (fn: (tx: unknown) => unknown) =>
    fn({
      produk: {
        create: async (args: { data: Record<string, unknown> }) => {
          dataDikirim = args.data;
          return { id: "produk_1", ...args.data, gambar: [], varian: [] };
        },
      },
      logAktivitas: { create: async () => ({}) },
    });

  const body = {
    kategoriId: "ckategoriid000000000001",
    namaProduk: "Tas Import Premium",
    hargaAsalRmb: 15,
    kurs: 2300,
    // hargaJualIdr SENGAJA tidak dikirim
    beratGram: 500,
    linkSumber: "https://taobao.com/item/123",
    gambarUrls: ["https://cdn.example.com/a.jpg"],
    varian: [],
  };

  const req = new NextRequest("http://localhost/api/admin/produk", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: await cookieAdmin() },
    body: JSON.stringify(body),
  });
  const res = await POST(req);

  assert.equal(res.status, 201);
  // PERSIS 34500 -- bukan 46580 (yang mengandung markup 35% tersembunyi)
  assert.equal(dataDikirim?.hargaJualIdr, 34500);
  assert.equal(dataDikirim?.kurs, 2300);
});

test("POST /api/admin/produk TANPA kurs: otomatis ambil dari KursMaster aktif (baris terbaru)", async () => {
  let dataDikirim: Record<string, unknown> | undefined;
  fakePrisma.kursMaster = {
    findFirst: async () => ({ id: "kurs_1", kursRmbIdr: 2350, dibuatPada: new Date() }),
  };
  fakePrisma.$transaction = async (fn: (tx: unknown) => unknown) =>
    fn({
      produk: {
        create: async (args: { data: Record<string, unknown> }) => {
          dataDikirim = args.data;
          return { id: "produk_1", ...args.data, gambar: [], varian: [] };
        },
      },
      logAktivitas: { create: async () => ({}) },
    });

  const body = {
    kategoriId: "ckategoriid000000000001",
    namaProduk: "Tas Tanpa Kurs Eksplisit",
    hargaAsalRmb: 10,
    // kurs SENGAJA tidak dikirim
    beratGram: 500,
    linkSumber: "https://taobao.com/item/123",
    gambarUrls: ["https://cdn.example.com/a.jpg"],
    varian: [],
  };

  const req = new NextRequest("http://localhost/api/admin/produk", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: await cookieAdmin() },
    body: JSON.stringify(body),
  });
  const res = await POST(req);

  assert.equal(res.status, 201);
  assert.equal(dataDikirim?.kurs, 2350); // dari KursMaster
  assert.equal(dataDikirim?.hargaJualIdr, 23500); // 10 x 2350
});

test("POST /api/admin/produk TANPA kurs DAN KursMaster belum pernah diisi -> 400, bukan crash", async () => {
  fakePrisma.kursMaster = { findFirst: async () => null };

  const body = {
    kategoriId: "ckategoriid000000000001",
    namaProduk: "Tas Tanpa Kurs Master",
    hargaAsalRmb: 10,
    beratGram: 500,
    linkSumber: "https://taobao.com/item/123",
    gambarUrls: ["https://cdn.example.com/a.jpg"],
    varian: [],
  };

  const req = new NextRequest("http://localhost/api/admin/produk", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: await cookieAdmin() },
    body: JSON.stringify(body),
  });
  const res = await POST(req);
  assert.equal(res.status, 400);
});

test("POST /api/admin/produk DENGAN hargaJualIdr eksplisit: dipakai apa adanya, TIDAK dihitung ulang", async () => {
  let dataDikirim: Record<string, unknown> | undefined;
  fakePrisma.$transaction = async (fn: (tx: unknown) => unknown) =>
    fn({
      produk: {
        create: async (args: { data: Record<string, unknown> }) => {
          dataDikirim = args.data;
          return { id: "produk_1", ...args.data, gambar: [], varian: [] };
        },
      },
      logAktivitas: { create: async () => ({}) },
    });

  const body = {
    kategoriId: "ckategoriid000000000001",
    namaProduk: "Tas Harga Manual",
    hargaAsalRmb: 15,
    kurs: 2300,
    hargaJualIdr: 99000, // eksplisit, jauh beda dari 15x2300=34500
    beratGram: 500,
    linkSumber: "https://taobao.com/item/123",
    gambarUrls: ["https://cdn.example.com/a.jpg"],
    varian: [],
  };

  const req = new NextRequest("http://localhost/api/admin/produk", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: await cookieAdmin() },
    body: JSON.stringify(body),
  });
  const res = await POST(req);

  assert.equal(res.status, 201);
  assert.equal(dataDikirim?.hargaJualIdr, 99000); // apa adanya, bukan 34500
});

test("POST /api/admin/produk dengan body tidak valid (nama kosong) ditolak 400, tidak sampai panggil DB", async () => {
  let dbDipanggil = false;
  fakePrisma.$transaction = async () => {
    dbDipanggil = true;
  };

  const req = new NextRequest("http://localhost/api/admin/produk", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: await cookieAdmin() },
    body: JSON.stringify({ namaProduk: "" }), // sengaja tidak lengkap & nama kosong
  });

  const res = await POST(req);
  assert.equal(res.status, 400);
  assert.equal(dbDipanggil, false, "validasi Zod harus gagal SEBELUM query DB apa pun dijalankan");
});