// letak: src/lib/__tests__/stok-tambahan.test.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { test } from "node:test";
import assert from "node:assert/strict";
import { kurangiStokAtomik, kembalikanStok } from "../stok";

/** tx palsu: merekam argumen updateMany di produk dan produkVarian. */
function buatTx(countVarian = 1, countProduk = 1) {
  const panggilan: { varian: any[]; produk: any[] } = { varian: [], produk: [] };
  const tx: any = {
    produkVarian: {
      updateMany: async (a: any) => {
        panggilan.varian.push(a);
        return { count: countVarian };
      },
    },
    produk: {
      updateMany: async (a: any) => {
        panggilan.produk.push(a);
        return { count: countProduk };
      },
    },
  };
  return { tx, panggilan };
}

// --- kurangiStokAtomik ---

test("kurangiStokAtomik: produk tanpa varian, syarat stok >= jumlah ada di WHERE", async () => {
  const { tx, panggilan } = buatTx();

  const ok = await kurangiStokAtomik(tx, "produk_1", null, 3);

  assert.equal(ok, true);
  assert.equal(panggilan.varian.length, 0, "tabel varian tidak boleh disentuh");
  assert.equal(panggilan.produk.length, 1);
  assert.deepEqual(panggilan.produk[0], {
    where: { id: "produk_1", stok: { gte: 3 } },
    data: { stok: { decrement: 3 } },
  });
});

test("kurangiStokAtomik: produk dengan varian, yang dikurangi stok VARIAN saja", async () => {
  const { tx, panggilan } = buatTx();

  const ok = await kurangiStokAtomik(tx, "produk_1", "varian_9", 2);

  assert.equal(ok, true);
  assert.equal(panggilan.produk.length, 0, "stok induk tidak boleh ikut berkurang");
  assert.equal(panggilan.varian.length, 1);
  assert.deepEqual(panggilan.varian[0], {
    where: { id: "varian_9", stok: { gte: 2 } },
    data: { stok: { decrement: 2 } },
  });
});

test("kurangiStokAtomik: stok produk tidak cukup (count 0) -> false", async () => {
  const { tx } = buatTx(1, 0);

  assert.equal(await kurangiStokAtomik(tx, "produk_1", null, 99), false);
});

test("kurangiStokAtomik: stok varian tidak cukup (count 0) -> false", async () => {
  const { tx } = buatTx(0, 1);

  assert.equal(await kurangiStokAtomik(tx, "produk_1", "varian_9", 99), false);
});

// --- kembalikanStok ---

test("kembalikanStok: produk tanpa varian, stok produk ditambah", async () => {
  const { tx, panggilan } = buatTx();

  await kembalikanStok(tx, "produk_1", null, 4);

  assert.equal(panggilan.varian.length, 0);
  assert.deepEqual(panggilan.produk[0], {
    where: { id: "produk_1" },
    data: { stok: { increment: 4 } },
  });
});

test("kembalikanStok: dengan varian, stok varian ditambah (stok induk tidak)", async () => {
  const { tx, panggilan } = buatTx();

  await kembalikanStok(tx, "produk_1", "varian_9", 4);

  assert.equal(panggilan.produk.length, 0);
  assert.deepEqual(panggilan.varian[0], {
    where: { id: "varian_9" },
    data: { stok: { increment: 4 } },
  });
});

test("kembalikanStok: referensi sudah tidak ada (count 0) tidak melempar error", async () => {
  const { tx } = buatTx(0, 0);

  await assert.doesNotReject(kembalikanStok(tx, "produk_hilang", null, 1));
  await assert.doesNotReject(kembalikanStok(tx, "produk_1", "varian_hilang", 1));
});