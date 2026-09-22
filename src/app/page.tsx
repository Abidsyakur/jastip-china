"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api-client";
import { SiteHeader, SiteFooter } from "@/components/layout/site";
import { BottomNav } from "@/components/layout/bottom-nav";
import { ProductCard, type KartuProduk } from "@/components/product-card";
import { SkeletonCard } from "@/components/ui/feedback";
import type { ProdukListItem } from "@/lib/types";

interface Kategori {
  id: string;
  namaKategori: string;
}

function keKartu(p: ProdukListItem): KartuProduk {
  return {
    id: p.id,
    nama: p.namaProduk,
    harga: Number(p.hargaJualIdr),
    gambar: p.gambar[0]?.urlGambar ?? null,
    stok: p.stok,
    kategori: p.kategori.namaKategori,
  };
}

export default function BerandaPage() {
  const [produk, setProduk] = useState<ProdukListItem[]>([]);
  const [kategori, setKategori] = useState<Kategori[]>([]);
  const [memuat, setMemuat] = useState(true);
  const [galat, setGalat] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [p, k] = await Promise.all([
          api<{ items: ProdukListItem[] }>("/api/produk?limit=8"),
          api<{ items: Kategori[] }>("/api/kategori"),
        ]);
        setProduk(p.items);
        setKategori(k.items);
      } catch (err) {
        setGalat(err instanceof Error ? err.message : "Gagal memuat");
      } finally {
        setMemuat(false);
      }
    })();
  }, []);

  const [unggulan, ...sisanya] = produk;

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 pb-24 md:px-6 md:pb-12">
        <section className="py-8 md:py-12">
          <p className="font-display text-3xl font-bold text-brand">鲜货直达</p>
          <p className="mt-1 text-ink-muda">Barang China, sampai pintu rumah</p>
        </section>

        {galat ? (
          <div className="rounded-xl border border-garis bg-white p-8 text-center">
            <p className="font-display text-xl font-semibold">Gagal memuat produk</p>
            <p className="mt-1 text-sm text-ink-muda">{galat}</p>
          </div>
        ) : memuat ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : produk.length === 0 ? (
          <div className="rounded-xl border border-garis bg-white p-8 text-center">
            <p className="font-display text-xl font-semibold">Katalog masih kosong</p>
            <p className="mt-1 text-sm text-ink-muda">Produk lagi disiapin. Coba cek lagi nanti ya.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
            {unggulan && (
              <div className="sm:col-span-2 sm:row-span-2">
                <ProductCard p={keKartu(unggulan)} unggulan />
              </div>
            )}
            {sisanya.map((p) => (
              <ProductCard key={p.id} p={keKartu(p)} />
            ))}
          </div>
        )}

        <div className="my-8 h-px bg-garis" />

        <section>
          <div className="flex flex-wrap justify-center gap-2">
            {kategori.map((k) => (
              <Link
                key={k.id}
                href={`/katalog?kategoriId=${k.id}`}
                className="rounded-full border border-garis bg-white px-4 py-2 text-sm hover:border-brand hover:text-brand"
              >
                {k.namaKategori}
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
      <BottomNav />
    </div>
  );
}
