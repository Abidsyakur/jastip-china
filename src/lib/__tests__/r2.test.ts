// letak: src/lib/__tests__/r2.test.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";

// Perekam untuk S3Client palsu: tidak ada request jaringan sungguhan
const fake = {
  send: async (_cmd: any): Promise<any> => undefined,
  konstruksi: [] as any[],
  presign: [] as any[],
};

class FakeS3Client {
  constructor(config: any) {
    fake.konstruksi.push(config);
  }
  send(cmd: any) {
    return fake.send(cmd);
  }
}
class FakePutObjectCommand {
  input: any;
  constructor(input: any) {
    this.input = input;
  }
}
class FakeGetObjectCommand {
  input: any;
  constructor(input: any) {
    this.input = input;
  }
}

let r2: typeof import("../r2");

before(async () => {
  process.env.R2_ACCOUNT_ID = "acc123";
  process.env.R2_ACCESS_KEY_ID = "kunci-akses";
  process.env.R2_SECRET_ACCESS_KEY = "kunci-rahasia";
  process.env.R2_BUCKET_NAME = "bucket-test";
  process.env.R2_PUBLIC_URL = "https://cdn.example.com";

  mock.module("@aws-sdk/client-s3", {
    namedExports: {
      S3Client: FakeS3Client,
      PutObjectCommand: FakePutObjectCommand,
      GetObjectCommand: FakeGetObjectCommand,
    },
  });
  mock.module("@aws-sdk/s3-request-presigner", {
    namedExports: {
      getSignedUrl: async (client: any, command: any, opts: any) => {
        fake.presign.push({ client, command, opts });
        return "https://signed.example/url";
      },
    },
  });

  r2 = await import("../r2");
});

beforeEach(() => {
  fake.send = async () => undefined;
  fake.presign.length = 0;
});

test("buatPresignedUploadUrl: URL bertanda tangan, berlaku 5 menit, memuat bucket/key/contentType", async () => {
  const url = await r2.buatPresignedUploadUrl("bukti/a.png", "image/png");

  assert.equal(url, "https://signed.example/url");
  const { command, opts } = fake.presign[0];
  assert.deepEqual(command.input, {
    Bucket: "bucket-test",
    Key: "bukti/a.png",
    ContentType: "image/png",
  });
  assert.equal(opts.expiresIn, 300);
});

test("client R2: endpoint dari account id, region auto, kredensial dari env", async () => {
  await r2.buatPresignedUploadUrl("x.png", "image/png");

  const config = fake.konstruksi[0];
  assert.equal(config.region, "auto");
  assert.equal(config.endpoint, "https://acc123.r2.cloudflarestorage.com");
  assert.deepEqual(config.credentials, {
    accessKeyId: "kunci-akses",
    secretAccessKey: "kunci-rahasia",
  });
});

test("client R2 dibuat sekali saja (lazy singleton), tidak dibuat ulang tiap panggilan", async () => {
  await r2.buatPresignedUploadUrl("a.png", "image/png");
  const sebelum = fake.konstruksi.length;

  await r2.buatPresignedUploadUrl("b.png", "image/png");
  await r2.unggahBufferKeR2("c.png", Buffer.from("x"), "image/png");

  assert.equal(fake.konstruksi.length, sebelum);
});

test("buatUrlPublik: gabungan R2_PUBLIC_URL dan key", () => {
  assert.equal(r2.buatUrlPublik("bukti/a.png"), "https://cdn.example.com/bukti/a.png");
});

test("buatUrlPublik: tanpa R2_PUBLIC_URL menghasilkan path relatif", () => {
  const awal = process.env.R2_PUBLIC_URL;
  delete process.env.R2_PUBLIC_URL;
  try {
    assert.equal(r2.buatUrlPublik("a.png"), "/a.png");
  } finally {
    process.env.R2_PUBLIC_URL = awal;
  }
});

test("unggahBufferKeR2: kirim PutObject dengan isi, key, dan tipe konten", async () => {
  let terkirim: any;
  fake.send = async (cmd) => {
    terkirim = cmd;
  };
  const isi = Buffer.from("isi-gambar");

  await r2.unggahBufferKeR2("bukti/a.png", isi, "image/png");

  assert.ok(terkirim instanceof FakePutObjectCommand);
  assert.deepEqual(terkirim.input, {
    Bucket: "bucket-test",
    Key: "bukti/a.png",
    Body: isi,
    ContentType: "image/png",
  });
});

test("ambilDariR2: berhasil mengembalikan isi (Buffer) dan tipe konten", async () => {
  let terkirim: any;
  fake.send = async (cmd) => {
    terkirim = cmd;
    return {
      Body: { transformToByteArray: async () => new Uint8Array([1, 2, 3]) },
      ContentType: "image/png",
    };
  };

  const hasil = await r2.ambilDariR2("bukti/a.png");

  assert.ok(terkirim instanceof FakeGetObjectCommand);
  assert.deepEqual(terkirim.input, { Bucket: "bucket-test", Key: "bukti/a.png" });
  assert.ok(hasil);
  assert.deepEqual([...hasil.isi], [1, 2, 3]);
  assert.equal(hasil.tipeKonten, "image/png");
});

test("ambilDariR2: tanpa ContentType jatuh ke application/octet-stream", async () => {
  fake.send = async () => ({
    Body: { transformToByteArray: async () => new Uint8Array([9]) },
  });

  const hasil = await r2.ambilDariR2("x");

  assert.equal(hasil?.tipeKonten, "application/octet-stream");
});

test("ambilDariR2: respons tanpa Body mengembalikan null", async () => {
  fake.send = async () => ({ ContentType: "image/png" });

  assert.equal(await r2.ambilDariR2("x"), null);
});

test("ambilDariR2: R2 melempar error (mis. key tidak ada) -> null, tidak crash", async () => {
  fake.send = async () => {
    throw new Error("NoSuchKey");
  };

  assert.equal(await r2.ambilDariR2("tidak-ada"), null);
});