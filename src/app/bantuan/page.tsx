"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/layout/site";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const FAQ: { kategori: string; tanya: string; jawab: string }[] = [
  { kategori: "Umum", tanya: "Apa itu jastip?", jawab: "Jastip = jasa titip. Kami titipin belanja barang dari China, sampai depan pintu rumah kamu di Indonesia." },
  { kategori: "Umum", tanya: "Gimana cara order?", jawab: "Pilih produk di katalog, tambah ke keranjang, checkout, transfer, upload bukti, tunggu verifikasi, pesanan diproses dan dikirim." },
  { kategori: "Umum", tanya: "Berapa lama sampai?", jawab: "Estimasi 7-14 hari setelah pembayaran terverifikasi." },
  { kategori: "Pembayaran", tanya: "Metode bayar apa aja?", jawab: "Saat ini transfer bank (BCA + Mandiri). E-wallet menyusul." },
  { kategori: "Pembayaran", tanya: "Berapa lama verifikasi pembayaran?", jawab: "Maksimal 1x24 jam setelah kamu upload bukti transfer." },
  { kategori: "Pengiriman", tanya: "Kurir apa aja?", jawab: "J&T dan Shopee Express. Ongkir dihitung berdasarkan berat dan tujuan." },
  { kategori: "Pengiriman", tanya: "Lacak gimana?", jawab: "Buka halaman Lacak Pesanan, masukin nomor invoice kamu." },
  { kategori: "PO", tanya: "Apa itu custom PO?", jawab: "Kalau barang yang kamu mau nggak ada di katalog, ajukan link produk dari China, admin kasih estimasi harga." },
  { kategori: "PO", tanya: "Berapa lama respon PO?", jawab: "Admin review dalam 1-2 hari kerja." },
  { kategori: "Komplain", tanya: "Barang bermasalah gimana?", jawab: "Ajukan komplain maksimal 7 hari setelah paket tiba, sertakan 1 foto bukti. Admin respon maksimal 2x24 jam hari kerja." },
];

export default function BantuanPage() {
  const [cari, setCari] = useState("");
  const [buka, setBuka] = useState<Set<number>>(new Set());

  const hasil = FAQ.filter(
    (f) =>
      !cari ||
      f.tanya.toLowerCase().includes(cari.toLowerCase()) ||
      f.jawab.toLowerCase().includes(cari.toLowerCase())
  );

  const toggle = (i: number) =>
    setBuka((s) => {
      const n = new Set(s);
      if (n.has(i)) n.delete(i);
      else n.add(i);
      return n;
    });

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-6 pb-24 md:pb-12">
        <h1 className="mb-4 text-2xl font-bold md:text-3xl">Bantuan</h1>

        <form className="mb-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
          <input
            value={cari}
            onChange={(e) => setCari(e.target.value)}
            placeholder="Cari pertanyaan..."
            className="flex-1 rounded-lg border border-garis bg-white px-4 py-2 text-sm focus:border-brand focus:outline-none"
          />
        </form>

        <Card className="mb-4 border-l-4 border-l-jade p-4 text-sm">
          <p className="font-semibold">Butuh bantuan lain?</p>
          <p className="text-ink-muda">Chat admin via WhatsApp di 0878-9838-8993 (Senin-Sabtu 09.00-17.00).</p>
          <div className="mt-2">
            <Link href="/komplain"><Button ukuran="sm" varian="secondary">Ajukan Komplain</Button></Link>
          </div>
        </Card>

        {hasil.length === 0 ? (
          <Card className="p-6 text-center text-sm text-ink-muda">
            Nggak ketemu FAQ yang cocok. Coba kata kunci lain, atau chat admin via WA.
          </Card>
        ) : (
          <div className="divide-y divide-garis rounded-xl border border-garis bg-white">
            {hasil.map((f, i) => (
              <div key={i}>
                <button
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left"
                >
                  <span className="text-sm font-medium">{f.tanya}</span>
                  <span className="text-ink-muda">{buka.has(i) ? "-" : "+"}</span>
                </button>
                {buka.has(i) && <p className="px-4 pb-3 text-sm text-ink-muda">{f.jawab}</p>}
              </div>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
      <BottomNav />
    </div>
  );
}
