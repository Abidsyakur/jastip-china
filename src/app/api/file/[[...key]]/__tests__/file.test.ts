// letak: src/app/api/file/[[...key]]/__tests__/file.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakeR2: { ambil?: (...a: any[]) => Promise<{ isi: Buffer; tipeKonten: string } | null> } = {};
let GET: typeof import("../route").GET;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-file-proxy-minimal-32-karakter";
  mockPrismaClientModule();
  mock.module("@/lib/r2", {
    namedExports: {
      ambilDariR2: async (...a: never[]) => fakeR2.ambil?.(...a) ?? null,
    },
  });
  ({ GET } = await import("../route"));
});

beforeEach(() => {
  delete fakeR2.ambil;
});

function konteks(key: string[]) {
  return { params: Promise.resolve({ key }) };
}

test("GET file bisa diakses tanpa login, cache lama", async () => {
  fakeR2.ambil = async () => ({ isi: Buffer.from("data-gambar"), tipeKonten: "image/png" });

  const req = new NextRequest("http://localhost/api/file/produk/a/b.png");
  const res = await GET(req, konteks(["produk", "a", "b.png"]));

  assert.equal(res.status, 200);
  assert.equal(res.headers.get("Content-Type"), "image/png");
  assert.match(res.headers.get("Cache-Control") ?? "", /immutable/);
});

test("GET file prefix tidak dikenal ditolak 404", async () => {
  const req = new NextRequest("http://localhost/api/file/rahasia/x.png");
  const res = await GET(req, konteks(["rahasia", "x.png"]));
  assert.equal(res.status, 404);
});

test("GET file yang tidak ada di R2 ditolak 404", async () => {
  fakeR2.ambil = async () => null;

  const req = new NextRequest("http://localhost/api/file/produk/hilang.png");
  const res = await GET(req, konteks(["produk", "hilang.png"]));
  assert.equal(res.status, 404);
});
