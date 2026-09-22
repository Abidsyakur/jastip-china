"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/api-client";
import { rupiah } from "@/lib/format";
import { hitungBiayaJasaTitip, hitungOngkirDomestik, PROVINSI_KE_ZONA, type KurirDomestik } from "@/lib/tarif";
import { SiteHeader, SiteFooter } from "@/components/layout/site";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SkeletonBar, EmptyState } from "@/components/ui/feedback";
import { toast } from "@/components/ui/toaster";
import { AddressForm } from "@/components/address-form";
import { useRequireCustomer } from "@/components/auth-guard";
import { labelKurir } from "@/lib/kurir";
import type { KeranjangItem, Alamat } from "@/lib/types";
import Link from "next/link";

const KURIR: KurirDomestik[] = ["jnt", "shopee_express"];

function CheckoutIsi() {
  const { user, isLoading } = useRequireCustomer();
  const router = useRouter();
  const params = useSearchParams();
  const ids = useMemo(() => (params.get("ids") ?? "").split(",").filter(Boolean), [params]);

  const [items, setItems] = useState<KeranjangItem[]>([]);
  const [alamat, setAlamat] = useState<Alamat[]>([]);
  const [alamatId, setAlamatId] = useState<string | null>(null);
  const [kurir, setKurir] = useState<KurirDomestik>("jnt");
  const [langkah, setLangkah] = useState(1);
  const [tambahAlamat, setTambahAlamat] = useState(false);
  const [memuat, setMemuat] = useState(true);
  const [kirim, setKirim] = useState(false);

  useEffect(() => {
    if (isLoading || !user) return;
    (async () => {
      try {
        const [k, a] = await Promise.all([
          api<{ items: KeranjangItem[] }>("/api/keranjang"),
          api<{ items: Alamat[] }>("/api/alamat"),
        ]);
        setItems(k.items.filter((i) => ids.includes(i.id)));
        setAlamat(a.items);
        if (a.items[0]) setAlamatId(a.items[0].id);
      } catch (err) {
        toast(err instanceof Error ? err.message : "Gagal memuat", "error");
      } finally {
        setMemuat(false);
      }
    })();
  }, [isLoading, user, ids]);

  const alamatDipilih = alamat.find((a) => a.id === alamatId) ?? null;
  const subtotal = items.reduce((s, i) => s + Number(i.hargaSatuan) * i.jumlah, 0);
  const jasa = items.length > 0 ? hitungBiayaJasaTitip(subtotal) : 0;
  const beratGram = items.reduce((s, i) => s + (i.produk.beratGram ?? 0) * i.jumlah, 0);
  const ongkir =
    alamatDipilih?.provinsi && items.length > 0
      ? hitungOngkirDomestik(alamatDipilih.provinsi, kurir, beratGram)
      : 0;
  const total = subtotal + jasa + ongkir;

  const bayar = async () => {
    if (!alamatId) {
      toast("Pilih alamat dulu", "error");
      return;
    }
    setKirim(true);
    try {
      const res = await api<{ pesanan: { id: string } }>("/api/pesanan", {
        method: "POST",
        body: {
          alamatId,
          keranjangItemIds: items.map((i) => i.id),
          preferensiKurir: kurir,
          metode: "transfer_bank",
        },
      });
      router.push(`/pesanan/${res.pesanan.id}/pembayaran`);
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal", "error");
      setKirim(false);
    }
  };

  if (isLoading || !user) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-6">
        <SkeletonBar /> <div className="mt-2" /> <SkeletonBar />
      </main>
    );
  }

  if (!memuat && items.length === 0) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-6">
        <EmptyState
          judul="Item checkout tidak ada"
          deskripsi="Mungkin sudah di-checkout atau dihapus dari keranjang."
          aksi={
            <Link href="/keranjang">
              <Button>Kembali ke Keranjang</Button>
            </Link>
          }
        />
      </main>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-5">
      <div className="md:col-span-3">
        <div className="mb-4 flex items-center gap-2 text-sm">
          {["Alamat", "Kurir", "Konfirmasi"].map((l, i) => (
            <div key={l} className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  langkah === i + 1 ? "bg-brand text-white" : langkah > i + 1 ? "bg-gold text-white" : "border border-garis text-ink-muda"
                }`}
              >
                {i + 1}
              </span>
              <span className={langkah === i + 1 ? "font-semibold" : "text-ink-muda"}>{l}</span>
              {i < 2 && <span className="mx-1 h-px w-6 bg-garis" />}
            </div>
          ))}
        </div>

        {langkah === 1 && (
          <Card className="p-4">
            <p className="mb-3 font-display text-lg font-bold">Alamat Pengiriman</p>
            {memuat ? (
              <SkeletonBar />
            ) : (
              <div className="flex flex-col gap-2">
                {alamat.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setAlamatId(a.id)}
                    className={`rounded-lg border p-3 text-left text-sm ${
                      alamatId === a.id ? "border-brand bg-brand/5" : "border-garis"
                    }`}
                  >
                    <p className="font-semibold">
                      {a.label} — {a.penerima}
                    </p>
                    <p className="text-ink-muda">
                      {a.alamatLengkap}, {a.kota} {a.kodePos}
                    </p>
                  </button>
                ))}
                <button
                  onClick={() => setTambahAlamat((v) => !v)}
                  className="rounded-lg border border-dashed border-garis p-3 text-sm text-brand"
                >
                  + Tambah Alamat Baru
                </button>
                {tambahAlamat && (
                  <AddressForm
                    onSimpan={(a) => {
                      setAlamat((l) => [a, ...l]);
                      setAlamatId(a.id);
                      setTambahAlamat(false);
                    }}
                    onBatal={() => setTambahAlamat(false)}
                  />
                )}
              </div>
            )}
            <Button penuh className="mt-4" disabled={!alamatId} onClick={() => setLangkah(2)}>
              Selanjutnya: Pilih Kurir
            </Button>
          </Card>
        )}

        {langkah === 2 && (
          <Card className="p-4">
            <p className="mb-3 font-display text-lg font-bold">Pilih Kurir</p>
            <div className="flex flex-col gap-2">
              {KURIR.map((k) => (
                <button
                  key={k}
                  onClick={() => setKurir(k)}
                  className={`flex items-center justify-between rounded-lg border p-3 text-left text-sm ${
                    kurir === k ? "border-brand bg-brand/5" : "border-garis"
                  }`}
                >
                  <span className="font-semibold">{labelKurir(k)}</span>
                  <span className="text-ink-muda">
                    {alamatDipilih?.provinsi
                      ? rupiah(hitungOngkirDomestik(alamatDipilih.provinsi, k, beratGram))
                      : "Pilih alamat dulu"}
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <Button varian="secondary" className="flex-1" onClick={() => setLangkah(1)}>
                Kembali
              </Button>
              <Button className="flex-1" onClick={() => setLangkah(3)}>
                Selanjutnya: Konfirmasi
              </Button>
            </div>
          </Card>
        )}

        {langkah === 3 && (
          <Card className="p-4">
            <p className="mb-3 font-display text-lg font-bold">Konfirmasi Pesanan</p>
            <div className="flex flex-col gap-2 text-sm">
              {items.map((i) => (
                <div key={i.id} className="flex justify-between">
                  <span>
                    {i.produk.namaProduk}
                    {i.produkVarian ? ` (${i.produkVarian.namaVarian})` : ""} × {i.jumlah}
                  </span>
                  <span className="font-medium">{rupiah(Number(i.hargaSatuan) * i.jumlah)}</span>
                </div>
              ))}
            </div>
            <div className="my-3 h-px bg-garis" />
            <p className="text-sm text-ink-muda">
              {alamatDipilih?.label} — {alamatDipilih?.alamatLengkap}, {alamatDipilih?.kota}. Kurir{" "}
              {labelKurir(kurir)}.
            </p>
            <div className="mt-4 flex gap-2">
              <Button varian="secondary" className="flex-1" onClick={() => setLangkah(2)}>
                Kembali
              </Button>
            </div>
          </Card>
        )}
      </div>

      <div className="md:col-span-2">
        <Card className="p-4 md:sticky md:top-20">
          <p className="font-display text-lg font-bold">Ringkasan Pesanan</p>
          {memuat ? (
            <div className="mt-3"><SkeletonBar /></div>
          ) : (
            <div className="mt-3 flex flex-col gap-1 text-sm">
              <div className="flex justify-between">
                <span>Subtotal ({items.length} item)</span>
                <span className="font-medium">{rupiah(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Jasa Titip (35%)</span>
                <span className="font-medium">{rupiah(jasa)}</span>
              </div>
              <div className="flex justify-between">
                <span>Ongkir Domestik</span>
                <span className="font-medium">{rupiah(ongkir)}</span>
              </div>
              <p className="text-xs text-ink-muda">Ongkir China ke gudang ditentukan admin kemudian</p>
              <div className="my-2 h-px bg-garis" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-gold-tua">{rupiah(total)}</span>
              </div>
              <p className="text-xs text-ink-muda">Metode bayar: Transfer Bank</p>
            </div>
          )}
          {langkah === 3 && (
            <Button penuh memuat={kirim} className="mt-4" onClick={bayar}>
              Bayar Sekarang
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-6 pb-24 md:px-6 md:pb-12">
        <h1 className="mb-4 text-2xl font-bold md:text-3xl">Checkout</h1>
        <Suspense fallback={<SkeletonBar />}>
          <CheckoutIsi />
        </Suspense>
      </main>
      <SiteFooter />
      <BottomNav />
    </div>
  );
}
