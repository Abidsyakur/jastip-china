"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import { rupiah } from "@/lib/format";
import { hitungBiayaJasaTitip } from "@/lib/tarif";
import { SiteHeader, SiteFooter } from "@/components/layout/site";
import { BottomNav } from "@/components/layout/bottom-nav";
import { QtyStepper } from "@/components/qty-stepper";
import { Button } from "@/components/ui/button";
import { EmptyState, SkeletonBar } from "@/components/ui/feedback";
import { toast } from "@/components/ui/toaster";
import { useRequireCustomer } from "@/components/auth-guard";
import type { KeranjangItem } from "@/lib/types";

export default function KeranjangPage() {
  const { user, isLoading } = useRequireCustomer();
  const router = useRouter();
  const [items, setItems] = useState<KeranjangItem[]>([]);
  const [dipilih, setDipilih] = useState<Set<string>>(new Set());
  const [memuat, setMemuat] = useState(true);

  const ambil = useCallback(async () => {
    try {
      const res = await api<{ items: KeranjangItem[] }>("/api/keranjang");
      setItems(res.items);
      setDipilih(new Set(res.items.map((i) => i.id)));
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal memuat", "error");
    } finally {
      setMemuat(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && user) void ambil();
  }, [isLoading, user, ambil]);

  const ubahQty = async (id: string, jumlah: number) => {
    try {
      await api(`/api/keranjang/${id}`, { method: "PATCH", body: { jumlah } });
      setItems((items) => items.map((i) => (i.id === id ? { ...i, jumlah } : i)));
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal", "error");
    }
  };

  const hapus = async (id: string, nama: string) => {
    if (!confirm(`Hapus ${nama} dari keranjang?`)) return;
    try {
      await api(`/api/keranjang/${id}`, { method: "DELETE" });
      setItems((items) => items.filter((i) => i.id !== id));
      setDipilih((d) => {
        const n = new Set(d);
        n.delete(id);
        return n;
      });
      toast("Item dihapus dari keranjang", "sukses");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal", "error");
    }
  };

  const itemDipilih = items.filter((i) => dipilih.has(i.id));
  const subtotal = itemDipilih.reduce(
    (s, i) => s + (Number(i.hargaSatuan) as number) * i.jumlah,
    0
  );
  const jasa = itemDipilih.length > 0 ? hitungBiayaJasaTitip(subtotal) : 0;

  const keCheckout = () => {
    if (itemDipilih.length === 0) {
      toast("Pilih minimal 1 item dulu", "error");
      return;
    }
    router.push(`/checkout?ids=${itemDipilih.map((i) => i.id).join(",")}`);
  };

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 pb-24 md:px-6 md:pb-12">
          <SkeletonBar /> <div className="mt-2" /> <SkeletonBar /> <div className="mt-2" /> <SkeletonBar />
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 pb-24 md:px-6 md:pb-12">
        <h1 className="mb-4 text-2xl font-bold md:text-3xl">Keranjang Belanja</h1>

        {memuat ? (
          <div className="flex flex-col gap-2">
            <SkeletonBar /> <SkeletonBar /> <SkeletonBar />
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            judul="Keranjang masih kosong"
            deskripsi="Yuk lihat katalog, siapa tau ada yang menarik."
            aksi={
              <Link href="/katalog">
                <Button>Lihat Katalog</Button>
              </Link>
            }
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-5">
            <div className="flex flex-col gap-3 md:col-span-3">
              {items.map((i) => {
                const stok = i.produkVarian ? i.produkVarian.stok : i.produk.stok;
                return (
                  <div key={i.id} className="flex gap-3 rounded-xl border border-garis bg-white p-3">
                    <input
                      type="checkbox"
                      checked={dipilih.has(i.id)}
                      onChange={() =>
                        setDipilih((d) => {
                          const n = new Set(d);
                          if (n.has(i.id)) n.delete(i.id);
                          else n.add(i.id);
                          return n;
                        })
                      }
                      className="mt-1 h-5 w-5 accent-[#C8102E]"
                      aria-label="Pilih item"
                    />
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-krim">
                      {i.produk.gambar[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={i.produk.gambar[0].urlGambar} alt="" className="h-full w-full object-cover" />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{i.produk.namaProduk}</p>
                      {i.produkVarian && <p className="text-xs text-ink-muda">{i.produkVarian.namaVarian}</p>}
                      <p className="mt-1 font-semibold text-gold-tua">{rupiah(i.hargaSatuan)}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <QtyStepper nilai={i.jumlah} min={1} max={Math.max(1, stok)} onUbah={(v) => ubahQty(i.id, v)} />
                        <button
                          onClick={() => hapus(i.id, i.produk.namaProduk)}
                          className="text-sm text-merah-muda"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="md:col-span-2">
              <div className="rounded-xl border border-garis bg-white p-4 md:sticky md:top-20">
                <p className="font-display text-lg font-bold">Ringkasan</p>
                <div className="mt-3 flex flex-col gap-1 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal ({itemDipilih.length} dipilih)</span>
                    <span className="font-medium">{rupiah(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Jasa Titip (35%)</span>
                    <span className="font-medium">{rupiah(jasa)}</span>
                  </div>
                  <p className="text-xs text-ink-muda">Ongkir dihitung saat checkout</p>
                  <div className="my-2 h-px bg-garis" />
                  <div className="flex justify-between font-semibold">
                    <span>Total Estimasi</span>
                    <span className="text-gold-tua">{rupiah(subtotal + jasa)}</span>
                  </div>
                </div>
                <Button penuh className="mt-4" onClick={keCheckout}>
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
      <BottomNav />
    </div>
  );
}
