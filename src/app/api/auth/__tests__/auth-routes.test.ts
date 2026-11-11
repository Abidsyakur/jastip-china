// letak: src/app/api/auth/__tests__/auth-routes.test.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, mock, before, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";
import { COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN } from "@/lib/auth/cookie";
import { hashToken } from "@/lib/auth/token-hash";
import { normalisasiNoWa } from "@/lib/auth/no-wa";
import { hashPassword, verifyPassword } from "@/lib/auth/password";

const PASSWORD = "RahasiaKuat123";
const NO_WA = "081234567890";
const TOKEN_RESET = "abcdef0123456789".repeat(4);

const fakePrisma: any = {};
const fakeRl = { diizinkan: true, panggilan: [] as { fn: string; id: string }[] };
const kirimWa: { tujuan: string; pesan: string }[] = [];
const appUrlAwal = process.env.APP_URL;
let HASH = "";

let login: typeof import("../login/route");
let adminLogin: typeof import("../admin-login/route");
let register: typeof import("../register/route");
let refresh: typeof import("../refresh/route");
let logout: typeof import("../logout/route");
let forgot: typeof import("../forgot-password/route");
let reset: typeof import("../reset-password/route");

const hasilRl = () => ({ diizinkan: fakeRl.diizinkan, sisaPercobaan: 4, resetPada: new Date() });

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-auth-routes-minimal-32-karakter";
  process.env.APP_URL = "https://jastip.test";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  mock.module("@/lib/auth/rate-limit", {
    namedExports: {
      cekRateLimitLogin: async (id: string) => {
        fakeRl.panggilan.push({ fn: "login", id });
        return hasilRl();
      },
      cekRateLimitRegister: async (id: string) => {
        fakeRl.panggilan.push({ fn: "register", id });
        return hasilRl();
      },
    },
  });
  mock.module("@/lib/notifikasi", {
    namedExports: {
      kirimNotifikasiWa: async (tujuan: string, pesan: string) => {
        kirimWa.push({ tujuan, pesan });
      },
    },
  });

  HASH = await hashPassword(PASSWORD);

  login = await import("../login/route");
  adminLogin = await import("../admin-login/route");
  register = await import("../register/route");
  refresh = await import("../refresh/route");
  logout = await import("../logout/route");
  forgot = await import("../forgot-password/route");
  reset = await import("../reset-password/route");
});

after(() => {
  if (appUrlAwal === undefined) delete process.env.APP_URL;
  else process.env.APP_URL = appUrlAwal;
});

beforeEach(() => {
  for (const key of Object.keys(fakePrisma)) delete fakePrisma[key];
  fakeRl.diizinkan = true;
  fakeRl.panggilan = [];
  kirimWa.length = 0;
});

// ---------- helper ----------

function post(path: string, body: unknown, headers: Record<string, string> = {}) {
  return new NextRequest(`http://localhost/api/auth/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

function cariCookie(res: Response, nama: string): string {
  const c = res.headers.getSetCookie().find((x) => x.startsWith(`${nama}=`));
  assert.ok(c, `cookie ${nama} harus ada di Set-Cookie`);
  return c;
}

function nilaiCookie(cookie: string): string {
  return cookie.split(";")[0]?.split("=")[1] ?? "";
}

function payloadJwt(cookie: string): any {
  const bagian = nilaiCookie(cookie).split(".")[1] ?? "";
  return JSON.parse(Buffer.from(bagian, "base64url").toString());
}

function pastikanCookieDihapus(res: Response) {
  for (const nama of [COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN]) {
    const c = cariCookie(res, nama);
    assert.match(c, new RegExp(`^${nama}=;`));
    assert.match(c, /1970/);
  }
}

const pelanggan = () => ({
  id: "cust_1",
  nama: "Budi",
  noWa: normalisasiNoWa(NO_WA),
  email: "budi@example.com",
  passwordHash: HASH,
});

const admin = (role: "OWNER" | "STAFF" = "OWNER") => ({
  id: "admin_1",
  nama: "Owner",
  email: "admin@jastipchina.local",
  role,
  passwordHash: HASH,
});

// ================= LOGIN (pelanggan) =================

test("login: body tidak valid ditolak 400 sebelum rate limit dan DB", async () => {
  const res = await login.POST(post("login", {}));

  assert.equal(res.status, 400);
  assert.equal(fakeRl.panggilan.length, 0);
});

test("login: batas percobaan terlampaui ditolak 429 dan akun tidak dicari", async () => {
  fakeRl.diizinkan = false;
  let dicari = false;
  fakePrisma.customer = {
    findFirst: async () => {
      dicari = true;
      return null;
    },
  };

  const res = await login.POST(post("login", { noWa: NO_WA, password: PASSWORD }));

  assert.equal(res.status, 429);
  assert.equal(dicari, false);
  assert.equal(fakeRl.panggilan[0]?.fn, "login");
  assert.ok(fakeRl.panggilan[0]?.id.startsWith("customer:"));
});

test("login: akun tidak ada dan password salah menghasilkan respons IDENTIK (anti enumerasi)", async () => {
  fakePrisma.customer = { findFirst: async () => null };
  const a = await login.POST(post("login", { noWa: NO_WA, password: PASSWORD }));

  fakePrisma.customer = { findFirst: async () => pelanggan() };
  const b = await login.POST(post("login", { noWa: NO_WA, password: "SalahSalah123" }));

  assert.equal(a.status, 401);
  assert.equal(b.status, 401);
  assert.deepEqual(await a.json(), await b.json());
  assert.equal(a.headers.getSetCookie().length, 0, "tidak boleh ada cookie sesi");
  assert.equal(b.headers.getSetCookie().length, 0);
});

test("login berhasil dengan nomor WA: cookie httpOnly, sesi tercatat, tanpa passwordHash", async () => {
  let cari: any;
  let sesi: any;
  fakePrisma.customer = {
    findFirst: async (a: any) => {
      cari = a;
      return pelanggan();
    },
  };
  fakePrisma.sesiLogin = {
    create: async (a: any) => {
      sesi = a;
      return { id: "sesi_1" };
    },
  };

  const res = await login.POST(
    post("login", { noWa: NO_WA, password: PASSWORD }, { "user-agent": "UA-Test", "x-forwarded-for": "203.0.113.5" })
  );
  const teks = await res.text();

  assert.equal(res.status, 200);
  assert.deepEqual(cari, { where: { noWa: normalisasiNoWa(NO_WA) } });
  assert.deepEqual(JSON.parse(teks).customer, { id: "cust_1", nama: "Budi", email: "budi@example.com" });
  assert.ok(!teks.includes("passwordHash"), "respons tidak boleh memuat hash kata sandi");

  const akses = cariCookie(res, COOKIE_ACCESS_TOKEN);
  assert.match(akses, /HttpOnly/i);
  assert.match(akses, /Max-Age=86400/);
  assert.equal(payloadJwt(akses).sub, "cust_1");
  assert.equal(payloadJwt(akses).tipe, "customer");
  assert.match(cariCookie(res, COOKIE_REFRESH_TOKEN), /HttpOnly/i);

  assert.equal(sesi.data.customerId, "cust_1");
  assert.equal(sesi.data.deviceInfo, "UA-Test");
  assert.equal(sesi.data.ipAddress, "203.0.113.5");
});

test("login dengan email: akun dicari berdasarkan email", async () => {
  let cari: any;
  fakePrisma.customer = {
    findFirst: async (a: any) => {
      cari = a;
      return pelanggan();
    },
  };
  fakePrisma.sesiLogin = { create: async () => ({ id: "sesi_1" }) };

  const res = await login.POST(post("login", { email: "budi@example.com", password: PASSWORD }));

  assert.equal(res.status, 200);
  assert.deepEqual(cari, { where: { email: "budi@example.com" } });
});

// ================= LOGIN ADMIN =================

test("admin-login: body tidak valid 400, batas terlampaui 429", async () => {
  assert.equal((await adminLogin.POST(post("admin-login", {}))).status, 400);

  fakeRl.diizinkan = false;
  let dicari = false;
  fakePrisma.admin = {
    findUnique: async () => {
      dicari = true;
      return null;
    },
  };
  const res = await adminLogin.POST(
    post("admin-login", { email: "admin@jastipchina.local", password: PASSWORD })
  );

  assert.equal(res.status, 429);
  assert.equal(dicari, false);
  assert.ok(fakeRl.panggilan[0]?.id.startsWith("admin:"));
});

test("admin-login: email tidak ada dan password salah menghasilkan respons IDENTIK", async () => {
  fakePrisma.admin = { findUnique: async () => null };
  const a = await adminLogin.POST(post("admin-login", { email: "admin@jastipchina.local", password: PASSWORD }));

  fakePrisma.admin = { findUnique: async () => admin() };
  const b = await adminLogin.POST(
    post("admin-login", { email: "admin@jastipchina.local", password: "SalahSalah123" })
  );

  assert.equal(a.status, 401);
  assert.equal(b.status, 401);
  assert.deepEqual(await a.json(), await b.json());
});

test("admin-login berhasil: token memuat role, sesi atas nama admin, tanpa passwordHash", async () => {
  let sesi: any;
  fakePrisma.admin = { findUnique: async () => admin("STAFF") };
  fakePrisma.sesiLogin = {
    create: async (a: any) => {
      sesi = a;
      return { id: "sesi_a" };
    },
  };

  const res = await adminLogin.POST(post("admin-login", { email: "admin@jastipchina.local", password: PASSWORD }));
  const teks = await res.text();

  assert.equal(res.status, 200);
  assert.deepEqual(JSON.parse(teks).admin, { id: "admin_1", nama: "Owner", role: "STAFF" });
  assert.ok(!teks.includes("passwordHash"));
  const akses = cariCookie(res, COOKIE_ACCESS_TOKEN);
  assert.equal(payloadJwt(akses).tipe, "admin");
  assert.equal(payloadJwt(akses).role, "STAFF");
  assert.equal(sesi.data.adminId, "admin_1");
  assert.ok(!("customerId" in sesi.data));
});

// ================= REGISTER =================

const bodyDaftar = {
  nama: "Budi Santoso",
  noWa: NO_WA,
  email: "budi@example.com",
  password: PASSWORD,
};

test("register: batas terlampaui ditolak 429 (dicek sebelum validasi) dan DB tidak disentuh", async () => {
  fakeRl.diizinkan = false;
  let disentuh = false;
  fakePrisma.customer = {
    findUnique: async () => {
      disentuh = true;
      return null;
    },
  };

  const res = await register.POST(post("register", {}));

  assert.equal(res.status, 429);
  assert.equal(disentuh, false);
});

test("register: body tidak valid ditolak 400", async () => {
  const res = await register.POST(post("register", {}));

  assert.equal(res.status, 400);
});

test("register: nomor WA sudah terdaftar -> 409 dan akun tidak dibuat", async () => {
  let cari: any;
  let dibuat = false;
  fakePrisma.customer = {
    findUnique: async (a: any) => {
      cari = a;
      return pelanggan();
    },
    create: async () => {
      dibuat = true;
      return {};
    },
  };

  const res = await register.POST(post("register", bodyDaftar));

  assert.equal(res.status, 409);
  assert.equal(dibuat, false);
  assert.deepEqual(cari, { where: { noWa: normalisasiNoWa(NO_WA) } });
});

test("register berhasil: kata sandi disimpan sebagai hash, nomor dinormalisasi, respons tanpa hash", async () => {
  let data: any;
  fakePrisma.customer = {
    findUnique: async () => null,
    create: async (a: any) => {
      data = a.data;
      return { id: "cust_baru" };
    },
  };

  const res = await register.POST(post("register", bodyDaftar));
  const teks = await res.text();

  assert.equal(res.status, 201);
  assert.equal(JSON.parse(teks).customerId, "cust_baru");
  assert.ok(!teks.includes("passwordHash"));
  assert.equal(data.nama, "Budi Santoso");
  assert.equal(data.noWa, normalisasiNoWa(NO_WA));
  assert.equal(data.email, "budi@example.com");
  assert.notEqual(data.passwordHash, PASSWORD);
  assert.equal(await verifyPassword(PASSWORD, data.passwordHash), true);
});

test("register: identifier rate limit diambil dari x-forwarded-for, 'unknown' bila tidak ada", async () => {
  fakePrisma.customer = { findUnique: async () => null, create: async () => ({ id: "c" }) };

  await register.POST(post("register", bodyDaftar, { "x-forwarded-for": "203.0.113.5" }));
  await register.POST(post("register", bodyDaftar));

  assert.deepEqual(
    fakeRl.panggilan.map((p) => p.id),
    ["203.0.113.5", "unknown"]
  );
});

// ================= REFRESH =================

const refreshLama = "token-refresh-lama";
const cookieRefresh = { cookie: `${COOKIE_REFRESH_TOKEN}=${refreshLama}` };
const kedaluwarsa = new Date("2030-01-01T00:00:00.000Z");

test("refresh: tanpa cookie refresh ditolak 401", async () => {
  const res = await refresh.POST(post("refresh", {}));

  assert.equal(res.status, 401);
});

test("refresh: sesi tidak aktif -> 401 dan kedua cookie dihapus", async () => {
  let cari: any;
  fakePrisma.sesiLogin = {
    findFirst: async (a: any) => {
      cari = a;
      return null;
    },
  };

  const res = await refresh.POST(post("refresh", {}, cookieRefresh));

  assert.equal(res.status, 401);
  pastikanCookieDihapus(res);
  assert.equal(cari.where.refreshTokenHash, hashToken(refreshLama));
});

test("refresh customer: token dirotasi pada sesi yang sama, kedaluwarsa sesi TIDAK diperpanjang", async () => {
  let update: any;
  fakePrisma.sesiLogin = {
    findFirst: async () => ({ id: "sesi_1", customerId: "cust_1", adminId: null, kedaluwarsaPada: kedaluwarsa }),
    update: async (a: any) => {
      update = a;
      return {};
    },
  };

  const res = await refresh.POST(post("refresh", {}, cookieRefresh));

  assert.equal(res.status, 200);
  const refreshBaru = cariCookie(res, COOKIE_REFRESH_TOKEN);
  assert.notEqual(nilaiCookie(refreshBaru), refreshLama);
  assert.ok(refreshBaru.includes(`Expires=${kedaluwarsa.toUTCString()}`));
  assert.deepEqual(update.where, { id: "sesi_1" });
  assert.equal(update.data.refreshTokenHash, hashToken(nilaiCookie(refreshBaru)));
  const akses = cariCookie(res, COOKIE_ACCESS_TOKEN);
  assert.equal(payloadJwt(akses).sub, "cust_1");
  assert.equal(payloadJwt(akses).tipe, "customer");
});

test("refresh admin: role diambil TERBARU dari database", async () => {
  let cariAdmin: any;
  fakePrisma.sesiLogin = {
    findFirst: async () => ({ id: "sesi_2", customerId: null, adminId: "admin_1", kedaluwarsaPada: kedaluwarsa }),
    update: async () => ({}),
  };
  fakePrisma.admin = {
    findUnique: async (a: any) => {
      cariAdmin = a;
      return { role: "STAFF" };
    },
  };

  const res = await refresh.POST(post("refresh", {}, cookieRefresh));

  assert.equal(res.status, 200);
  assert.deepEqual(cariAdmin, { where: { id: "admin_1" }, select: { role: true } });
  const akses = cariCookie(res, COOKIE_ACCESS_TOKEN);
  assert.equal(payloadJwt(akses).tipe, "admin");
  assert.equal(payloadJwt(akses).role, "STAFF");
});

test("refresh admin: akun admin sudah tidak ada -> 401, cookie dihapus, token tidak dirotasi", async () => {
  let dirotasi = false;
  fakePrisma.sesiLogin = {
    findFirst: async () => ({ id: "sesi_2", customerId: null, adminId: "admin_hilang", kedaluwarsaPada: kedaluwarsa }),
    update: async () => {
      dirotasi = true;
      return {};
    },
  };
  fakePrisma.admin = { findUnique: async () => null };

  const res = await refresh.POST(post("refresh", {}, cookieRefresh));

  assert.equal(res.status, 401);
  pastikanCookieDihapus(res);
  assert.equal(dirotasi, false);
});

// ================= LOGOUT =================

test("logout dengan cookie: sesi dicabut berdasarkan hash token, cookie dihapus", async () => {
  let cabut: any;
  fakePrisma.sesiLogin = {
    updateMany: async (a: any) => {
      cabut = a;
      return { count: 1 };
    },
  };

  const res = await logout.POST(post("logout", {}, cookieRefresh));

  assert.equal(res.status, 200);
  assert.equal(cabut.where.refreshTokenHash, hashToken(refreshLama));
  assert.deepEqual(cabut.data, { dicabut: true });
  pastikanCookieDihapus(res);
});

test("logout tanpa cookie: tetap berhasil, tidak menyentuh database", async () => {
  let disentuh = false;
  fakePrisma.sesiLogin = {
    updateMany: async () => {
      disentuh = true;
      return { count: 0 };
    },
  };

  const res = await logout.POST(post("logout", {}));

  assert.equal(res.status, 200);
  assert.equal(disentuh, false);
  pastikanCookieDihapus(res);
});

// ================= FORGOT PASSWORD =================

test("forgot-password: body tidak valid ditolak 400", async () => {
  const res = await forgot.POST(post("forgot-password", {}));

  assert.equal(res.status, 400);
  assert.equal(fakeRl.panggilan.length, 0);
});

test("forgot-password: batas terlampaui -> 429, akun tidak dicari, WA tidak terkirim", async () => {
  fakeRl.diizinkan = false;
  let dicari = false;
  fakePrisma.customer = {
    findUnique: async () => {
      dicari = true;
      return null;
    },
  };

  const res = await forgot.POST(post("forgot-password", { noWa: NO_WA }));

  assert.equal(res.status, 429);
  assert.equal(dicari, false);
  assert.equal(kirimWa.length, 0);
  assert.equal(fakeRl.panggilan[0]?.id, `forgot-password:${normalisasiNoWa(NO_WA)}`);
});

test("forgot-password: nomor terdaftar -> token (hash) disimpan, WA berisi tautan reset", async () => {
  let token: any;
  fakePrisma.customer = { findUnique: async () => pelanggan() };
  fakePrisma.resetPasswordToken = {
    create: async (a: any) => {
      token = a;
      return {};
    },
  };

  const res = await forgot.POST(post("forgot-password", { noWa: NO_WA }));

  assert.equal(res.status, 200);
  assert.equal(kirimWa.length, 1);
  assert.equal(kirimWa[0]?.tujuan, normalisasiNoWa(NO_WA));
  const pesan = kirimWa[0]?.pesan ?? "";
  assert.ok(pesan.includes("Budi"));
  assert.ok(pesan.includes("https://jastip.test/reset-password?token="));
  const tokenMentah = /token=([^\s]+)/.exec(pesan)?.[1] ?? "";
  assert.ok(tokenMentah.length > 0);
  assert.equal(token.data.customerId, "cust_1");
  assert.equal(token.data.tokenHash, hashToken(tokenMentah));
});

test("forgot-password: nomor tidak terdaftar -> respons SAMA, tanpa token dan tanpa WA", async () => {
  let tokenDibuat = false;
  fakePrisma.customer = { findUnique: async () => null };
  fakePrisma.resetPasswordToken = {
    create: async () => {
      tokenDibuat = true;
      return {};
    },
  };
  const tidakAda = await forgot.POST(post("forgot-password", { noWa: NO_WA }));

  fakePrisma.customer = { findUnique: async () => pelanggan() };
  fakePrisma.resetPasswordToken = { create: async () => ({}) };
  const ada = await forgot.POST(post("forgot-password", { noWa: NO_WA }));

  assert.equal(tokenDibuat, false);
  assert.equal(kirimWa.length, 1, "WA hanya terkirim untuk nomor terdaftar");
  assert.equal(tidakAda.status, ada.status);
  assert.deepEqual(await tidakAda.json(), await ada.json());
});

// ================= RESET PASSWORD =================

const bodyReset = { token: TOKEN_RESET, passwordBaru: "PasswordBaru123" };

test("reset-password: body tidak valid ditolak 400", async () => {
  assert.equal((await reset.POST(post("reset-password", {}))).status, 400);
});

test("reset-password: token tidak valid/kedaluwarsa ditolak 400", async () => {
  let cari: any;
  fakePrisma.resetPasswordToken = {
    findFirst: async (a: any) => {
      cari = a;
      return null;
    },
  };

  const res = await reset.POST(post("reset-password", bodyReset));

  assert.equal(res.status, 400);
  assert.equal(cari.where.tokenHash, hashToken(TOKEN_RESET));
  assert.equal(cari.where.sudahDipakai, false);
});

test("reset-password: token milik admin (tanpa customerId) ditolak 400", async () => {
  fakePrisma.resetPasswordToken = { findFirst: async () => ({ id: "rt_1", customerId: null }) };

  assert.equal((await reset.POST(post("reset-password", bodyReset))).status, 400);
});

test("reset-password: token keburu dipakai request lain (count 0) -> 400, sandi tidak diganti", async () => {
  let sandiDiganti = false;
  let sesiDicabut = false;
  fakePrisma.resetPasswordToken = {
    findFirst: async () => ({ id: "rt_1", customerId: "cust_1" }),
    updateMany: async () => ({ count: 0 }),
  };
  fakePrisma.customer = {
    update: async () => {
      sandiDiganti = true;
      return {};
    },
  };
  fakePrisma.sesiLogin = {
    updateMany: async () => {
      sesiDicabut = true;
      return { count: 0 };
    },
  };

  const res = await reset.POST(post("reset-password", bodyReset));

  assert.equal(res.status, 400);
  assert.deepEqual(await res.json(), { error: "Token sudah dipakai" });
  assert.equal(sandiDiganti, false);
  assert.equal(sesiDicabut, false);
});

test("reset-password berhasil: urutan token dipakai, sandi diganti, semua sesi dicabut", async () => {
  const urutan: string[] = [];
  let dataCustomer: any;
  let cabut: any;
  fakePrisma.resetPasswordToken = {
    findFirst: async () => ({ id: "rt_1", customerId: "cust_1" }),
    updateMany: async () => {
      urutan.push("tandai-token");
      return { count: 1 };
    },
  };
  fakePrisma.customer = {
    update: async (a: any) => {
      urutan.push("ganti-sandi");
      dataCustomer = a;
      return {};
    },
  };
  fakePrisma.sesiLogin = {
    updateMany: async (a: any) => {
      urutan.push("cabut-sesi");
      cabut = a;
      return { count: 2 };
    },
  };

  const res = await reset.POST(post("reset-password", bodyReset));

  assert.equal(res.status, 200);
  assert.deepEqual(urutan, ["tandai-token", "ganti-sandi", "cabut-sesi"]);
  assert.deepEqual(dataCustomer.where, { id: "cust_1" });
  assert.notEqual(dataCustomer.data.passwordHash, bodyReset.passwordBaru);
  assert.equal(await verifyPassword(bodyReset.passwordBaru, dataCustomer.data.passwordHash), true);
  assert.deepEqual(cabut.where, { customerId: "cust_1", dicabut: false });
  assert.deepEqual(cabut.data, { dicabut: true });
});

// ================= PERBAIKAN: kunci pembatas dinormalisasi & email ganda =================

test("login: kunci rate limit dinormalisasi (nomor WA baku, email huruf kecil)", async () => {
  fakePrisma.customer = { findFirst: async () => null };

  await login.POST(post("login", { noWa: NO_WA, password: PASSWORD }));
  await login.POST(post("login", { email: "Budi@Example.COM", password: PASSWORD }));

  assert.deepEqual(
    fakeRl.panggilan.map((p) => p.id),
    [`customer:${normalisasiNoWa(NO_WA)}`, "customer:budi@example.com"]
  );
});

test("admin-login: kunci rate limit memakai email huruf kecil", async () => {
  fakePrisma.admin = { findUnique: async () => null };

  await adminLogin.POST(post("admin-login", { email: "Admin@JastipChina.local", password: PASSWORD }));

  assert.equal(fakeRl.panggilan[0]?.id, "admin:admin@jastipchina.local");
});

test("register: email/nomor bentrok saat simpan (P2002) -> 409, bukan 500", async () => {
  fakePrisma.customer = {
    findUnique: async () => null,
    create: async () => {
      throw Object.assign(new Error("Unique constraint failed"), { code: "P2002" });
    },
  };

  const res = await register.POST(post("register", bodyDaftar));

  assert.equal(res.status, 409);
});

test("register: error tak terduga saat simpan dilempar ulang (bukan ditelan sebagai 409)", async () => {
  fakePrisma.customer = {
    findUnique: async () => null,
    create: async () => {
      throw new Error("database putus");
    },
  };

  await assert.rejects(register.POST(post("register", bodyDaftar)), /database putus/);
});