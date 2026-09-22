"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import { SiteHeader, SiteFooter } from "@/components/layout/site";
import { BottomNav } from "@/components/layout/bottom-nav";
import { ProductCard } from "@/components/product-card";
import { SkeletonCard, EmptyState } from "@/components/ui/feedback";
import { Button } from "@/components/ui/button";
import type { ProdukListItem } from "@/lib/types";

interface Kategori {
  id: string;
  namaKategori: string;
}

const SORT_OPSI = [
  { nilai: "terbaru", label: "Terbaru" },
  { nilai: "termurah", label: "Harga Terendah" },
  { nilai: "termahal", label: "Harga Tertinggi" },
];

function KatalogIsi() {
  const params = useSearchParams();
  const router = useRouter();
  const [produk, setProduk] = useState<ProdukListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [kategori, setKategori] = useState<Kategori[]>([]);
  const [memuat, setMemuat] = useState(true);
  const [cari, setCari] = useState(params.get("cari") ?? "");

  const kategoriId = params.get("kategoriId") ?? "";
  const sort = params.get("sort") ?? "terbaru";
  const page = Number(params.get("page") ?? 1);

  const ambil = useCallback(async () => {
    setMemuat(true);
    try {
      const q = new URLSearchParams({ limit: "12", page: String(page), sort });
      if (kategoriId) q.set("kategoriId", kategoriId);
      const c = params.get("cari");
      if (c) q.set("cari", c);
      const res = await api<{ items: ProdukListItem[]; total: number }>(`/api/produk?${q}`);
      setProduk(res.items);
      setTotal(res.total);
    } finally {
      setMemuat(false);
    }
  }, [kategoriId, sort, page, params]);

  useEffect(() => {
    api<{ items: Kategori[] }>("/api/kategori").then((k) => setKategori(k.items)).catch(() => {});
  }, []);

  useEffect(() => {
    void ambil();
  }, [ambil]);

  const keUrl = (patch: Record<string, string>) => {
    const q = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (v) q.set(k, v);
      else q.delete(k);
    }
    q.delete("page");
    router.push(`/katalog?${q}`);
  };

  const halamanTerakhir = Math.max(1, Math.ceil(total / 12));

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <aside className="w-full shrink-0 md:w-60">
        <div className="rounded-xl border border-garis bg-white p-4">
          <p className="mb-2 text-sm font-semibold">Kategori</p>
          <div className="flex flex-row gap-2 overflow-x-auto md:flex-col md:overflow-visible">
            <button
              onClick={() => keUrl({ kategoriId: "" })}
              className={`whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm ${
                !kategoriId ? "bg-brand/10 font-semibold text-brand" : "text-ink"
              }`}
            >
              Semua
            </button>
            {kategori.map((k) => (
              <button
                key={k.id}
                onClick={() => keUrl({ kategoriId: k.id })}
                className={`whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm ${
                  kategoriId === k.id ? "bg-brand/10 font-semibold text-brand" : "text-ink"
                }`}
              >
                {k.namaKategori}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <p className="mb-2 text-sm font-semibold">Urutkan</p>
            <select
              value={sort}
              onChange={(e) => keUrl({ sort: e.target.value })}
              className="w-full rounded-lg border border-garis bg-white px-3 py-2 text-sm"
            >
              {SORT_OPSI.map((o) => (
                <option key={o.nilai} value={o.nilai}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </aside>

      <div className="flex-1">
        <form
          className="mb-4 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            keUrl({ cari });
          }}
        >
          <input
            value={cari}
            onChange={(e) => setCari(e.target.value)}
            placeholder="Cari produk..."
            className="flex-1 rounded-lg border border-garis bg-white px-4 py-2 text-sm focus:border-brand focus:outline-none"
          />
          <Button type="submit" ukuran="sm">
            Cari
          </Button>
        </form>

        {!memuat && <p className="mb-3 text-sm text-ink-muda">{total} produk ditemukan</p>}

        {memuat ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : produk.length === 0 ? (
          <EmptyState
            judul="Nggak ketemu produknya"
            deskripsi="Coba kata kunci lain, atau cek kategori."
          />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {produk.map((p) => (
                <ProductCard
                  key={p.id}
                  p={{
                    id: p.id,
                    nama: p.namaProduk,
                    harga: Number(p.hargaJualIdr),
                    gambar: p.gambar[0]?.urlGambar ?? null,
                    stok: p.stok,
                    kategori: p.kategori.namaKategori,
                  }}
                />
              ))}
            </div>
            <div className="mt-6 flex items-center justify-center gap-2">
              <Button
                varian="secondary"
                ukuran="sm"
                disabled={page <= 1}
                onClick={() => {
                  const q = new URLSearchParams(params.toString());
                  q.set("page", String(page - 1));
                  router.push(`/katalog?${q}`);
                }}
              >
                Sebelumnya
              </Button>
              <span className="text-sm text-ink-muda">
                {page} / {halamanTerakhir}
              </span>
              <Button
                varian="secondary"
                ukuran="sm"
                disabled={page >= halamanTerakhir}
                onClick={() => {
                  const q = new URLSearchParams(params.toString());
                  q.set("page", String(page + 1));
                  router.push(`/katalog?${q}`);
                }}
              >
                Selanjutnya
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function KatalogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 pb-24 md:px-6 md:pb-12">
        <h1 className="mb-4 text-2xl font-bold md:text-3xl">Katalog</h1>
        <Suspense fallback={<p className="text-sm text-ink-muda">Memuat...</p>}>
          <KatalogIsi />
        </Suspense>
      </main>
      <SiteFooter />
      <BottomNav />
    </div>
  );
}
