import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/layout/site";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const LANGKAH = [
  { judul: "Pilih produk", isi: "Cari di katalog ready stock, atau ajukan Custom PO kalau barangnya nggak ada di katalog.", aksi: { label: "Lihat Katalog", href: "/katalog" } },
  { judul: "Checkout", isi: "Masukin keranjang, pilih alamat pengiriman + kurir. Cek rincian biaya sebelum lanjut bayar.", aksi: { label: "Ke Keranjang", href: "/keranjang" } },
  { judul: "Transfer", isi: "Transfer total bayar ke rekening bank kami (BCA / Mandiri). Nominal harus pas sesuai invoice." },
  { judul: "Upload bukti", isi: "Upload foto bukti transfer di halaman pembayaran. Admin verifikasi maksimal 1x24 jam." },
  { judul: "Kami belikan", isi: "Setelah terverifikasi, tim kami belikan barang dari China, konsolidasi, terus kirim." },
  { judul: "Sampai di rumahmu", isi: "Kurir domestik antar ke alamatmu. Lacak status kapan aja pakai nomor invoice.", aksi: { label: "Lacak Pesanan", href: "/lacak" } },
];

export default function CaraOrderPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-6 pb-24 md:pb-12">
        <h1 className="text-2xl font-bold md:text-3xl">Cara Order</h1>
        <p className="mt-1 text-ink-muda">Belanja barang China dalam 6 langkah gampang</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {LANGKAH.map((l, i) => (
            <Card key={l.judul} className="p-4">
              <p className="flex h-10 w-10 items-center justify-center rounded-full bg-brand font-display text-lg font-bold text-white">
                {i + 1}
              </p>
              <p className="mt-2 font-display text-lg font-bold">{l.judul}</p>
              <p className="mt-1 text-sm text-ink-muda">{l.isi}</p>
              {l.aksi && (
                <Link href={l.aksi.href} className="mt-2 inline-block">
                  <Button ukuran="sm" varian="secondary">{l.aksi.label}</Button>
                </Link>
              )}
            </Card>
          ))}
        </div>
        <Card className="mt-4 border-l-4 border-l-jade p-4 text-sm">
          Masih bingung? Chat admin via WhatsApp di 0878-9838-8993.
        </Card>
      </main>
      <SiteFooter />
      <BottomNav />
    </div>
  );
}
