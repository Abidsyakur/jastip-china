"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api-client";
import { rupiah } from "@/lib/format";
import { SiteHeader, SiteFooter } from "@/components/layout/site";
import { BottomNav } from "@/components/layout/bottom-nav";
import { ProductCard } from "@/components/product-card";
import { QtyStepper } from "@/components/qty-stepper";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/badge";
import { toast } from "@/components/ui/toaster";
import type { ProdukDetail, ProdukListItem } from "@/lib/types";

export default function DetailProdukPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [p, setP] = useState<ProdukDetail | null>(null);
  const [terkait, setTerkait] = useState<ProdukListItem[]>([]);
  const [galat, setGalat] = useState<string | null>(null);
  const [varianId, setVarianId] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [gambarAktif, setGambarAktif] = useState(0);
  const [kirim, setKirim] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await api<{ produk: ProdukDetail }>(`/api/produk/${id}`);
        setP(res.produk);
        const t = await api<{ items: ProdukListItem[] }>(
          `/api/produk?kategoriId=${res.produk.kategoriId}&limit=6`
        );
        setTerkait(t.items.filter((x) => x.id !== id).slice(0, 5));
      } catch (err) {
        setGalat(err instanceof Error ? err.message : "Gagal memuat");
      }
    })();
  }, [id]);

  if (galat) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <main className="mx-auto max-w-3xl px-4 py-12 text-center">
          <h1 className="text-2xl font-bold">Produk nggak ketemu</h1>
          <p className="mt-1 text-sm text-ink-muda">Mungkin udah dihapus atau stoknya habis.</p>
          <Link href="/katalog" className="mt-4 inline-block">
            <Button>Kembali ke Katalog</Button>
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (!p) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <main className="mx-auto max-w-7xl px-4 py-6">
          <div className="aspect-square animate-pulse rounded-xl bg-krim md:hidden" />
          <div className="hidden gap-8 md:grid md:grid-cols-2">
            <div className="aspect-square animate-pulse rounded-xl bg-krim" />
            <div className="flex flex-col gap-3">
              <div className="h-8 w-3/4 animate-pulse rounded bg-krim" />
              <div className="h-6 w-1/3 animate-pulse rounded bg-krim" />
              <div className="h-12 w-full animate-pulse rounded bg-krim" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  const varianDipilih = p.varian.find((v) => v.id === varianId) ?? null;
  const stokMaks = varianDipilih ? varianDipilih.stok : p.stok;
  const hargaSatuan = Number(p.hargaJualIdr) + Number(varianDipilih?.hargaTambahan ?? 0);
  const habis = stokMaks <= 0;

  const tambahKeranjang = async (langsung: boolean) => {
    if (p.varian.length > 0 && !varianId) {
      toast("Pilih varian dulu ya", "error");
      return;
    }
    setKirim(true);
    try {
      await api("/api/keranjang", {
        method: "POST",
        body: { produkId: p.id, produkVarianId: varianId, jumlah: qty },
      });
      if (langsung) {
        router.push("/keranjang");
      } else {
        toast(`${p.namaProduk} masuk keranjang`, "sukses");
      }
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal", "error");
    } finally {
      setKirim(false);
    }
  };

  const gambar = p.gambar.length > 0 ? p.gambar : [];

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-6 pb-40 md:px-6 md:pb-12">
        <p className="mb-4 hidden text-sm text-ink-muda md:block">
          <Link href="/" className="hover:text-brand">Beranda</Link> /{" "}
          <Link href="/katalog" className="hover:text-brand">Katalog</Link> / {p.namaProduk}
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="aspect-square overflow-hidden rounded-xl bg-krim">
              {gambar[gambarAktif] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={gambar[gambarAktif].urlGambar} alt={p.namaProduk} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-6xl text-ink-muda/40">○</div>
              )}
            </div>
            {gambar.length > 1 && (
              <div className="mt-2 flex gap-2 overflow-x-auto">
                {gambar.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => setGambarAktif(i)}
                    className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-krim ${
                      i === gambarAktif ? "border-brand" : "border-garis"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={g.urlGambar} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-2xl font-bold md:text-3xl">{p.namaProduk}</h1>
            <p className="mt-1 font-display text-3xl font-bold text-gold">{rupiah(hargaSatuan)}</p>
            <div className="mt-2 flex items-center gap-2">
              {habis ? <Tag tone="netral">Stok Habis</Tag> : <Tag tone="gold">Ready Stock</Tag>}
              <span className="text-sm text-ink-muda">Stok: {stokMaks} biji</span>
            </div>

            {p.varian.length > 0 && (
              <div className="mt-4">
                <p className="mb-2 text-sm font-semibold">Varian</p>
                <div className="flex flex-col gap-2">
                  {p.varian.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => {
                        setVarianId(v.id);
                        setQty(1);
                      }}
                      className={`flex items-center justify-between rounded-lg border px-4 py-2 text-left text-sm ${
                        varianId === v.id ? "border-brand bg-brand/5 font-medium" : "border-garis"
                      }`}
                    >
                      <span>
                        {v.namaVarian}
                        {Number(v.hargaTambahan) > 0 && ` (+${rupiah(v.hargaTambahan)})`}
                      </span>
                      <span className="text-xs text-ink-muda">stok {v.stok}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4">
              <p className="mb-2 text-sm font-semibold">Jumlah</p>
              <QtyStepper nilai={qty} min={1} max={Math.max(1, stokMaks)} onUbah={setQty} />
            </div>

            <p className="mt-4 text-sm text-ink-muda">
              Subtotal: <span className="font-semibold text-ink">{rupiah(hargaSatuan * qty)}</span>
            </p>

            <div className="mt-4 hidden gap-2 md:flex">
              <Button varian="secondary" penuh memuat={kirim} disabled={habis} onClick={() => tambahKeranjang(false)}>
                Tambah ke Keranjang
              </Button>
              <Button penuh memuat={kirim} disabled={habis} onClick={() => tambahKeranjang(true)}>
                Beli Langsung
              </Button>
            </div>

            <div className="mt-4 rounded-xl border border-garis bg-white p-4 text-sm text-ink-muda">
              <p>Estimasi sampai: 7-14 hari setelah verifikasi</p>
              <p>Berat: {p.beratGram}g</p>
            </div>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="mb-3 text-xl font-bold">Deskripsi</h2>
          <p className="max-w-3xl whitespace-pre-line text-sm leading-relaxed text-ink">
            {p.deskripsi ?? "Belum ada deskripsi."}
          </p>
        </section>

        {terkait.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-3 text-xl font-bold">Produk Terkait</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {terkait.map((t) => (
                <div key={t.id} className="w-40 shrink-0 md:w-52">
                  <ProductCard
                    p={{
                      id: t.id,
                      nama: t.namaProduk,
                      harga: Number(t.hargaJualIdr),
                      gambar: t.gambar[0]?.urlGambar ?? null,
                      stok: t.stok,
                    }}
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-garis bg-white p-3 md:hidden">
        <Button varian="secondary" memuat={kirim} disabled={habis} onClick={() => tambahKeranjang(false)}>
          Keranjang
        </Button>
        <Button memuat={kirim} disabled={habis} onClick={() => tambahKeranjang(true)}>
          Beli Langsung
        </Button>
      </div>

      <div className="hidden md:block">
        <SiteFooter />
      </div>
      <BottomNav />
    </div>
  );
}
