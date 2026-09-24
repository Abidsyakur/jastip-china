import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/layout/site";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Statistik dari /api/statistik-publik (server component, tanpa login).
async function ambilStatistik(): Promise<{ pesananTerkirim: number; customerAktif: number }> {
  try {
    const base = process.env.APP_URL ?? "http://localhost:3000";
    const res = await fetch(`${base}/api/statistik-publik`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return { pesananTerkirim: 0, customerAktif: 0 };
  }
}

const formatK = (n: number) =>
  n >= 1000 ? `${(n / 1000).toLocaleString("id-ID", { maximumFractionDigits: 1 })}rb+` : `${n}`;

export default async function TentangKamiPage() {
  const stat = await ambilStatistik();

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-6 pb-24 md:pb-12">
        <h1 className="text-2xl font-bold md:text-3xl">Tentang Kami</h1>
        <p className="mt-1 font-display text-xl text-brand">é²œè´§ç›´è¾¾</p>

        <Card className="mt-4 p-4 text-sm leading-relaxed">
          Jastip China bantu kamu beli barang langsung dari China tanpa ribet. Pilih dari katalog
          ready stock, atau ajukan Custom PO kalau barangnya nggak ada di katalog. Kami urus
          pembelian, konsolidasi, sampai pengiriman ke rumahmu.
        </Card>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <Card className="p-4 text-center">
            <p className="font-display text-2xl font-bold text-brand md:text-3xl">{formatK(stat.pesananTerkirim)}</p>
            <p className="text-xs text-ink-muda">Pesanan terkirim</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="font-display text-2xl font-bold text-brand md:text-3xl">{formatK(stat.customerAktif)}</p>
            <p className="text-xs text-ink-muda">Customer aktif</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="font-display text-2xl font-bold text-ink-muda md:text-3xl">-</p>
            <p className="text-xs text-ink-muda">Rating kepuasan</p>
          </Card>
        </div>

        <h2 className="mb-2 mt-8 text-xl font-bold">Kenapa Jastip China</h2>
        <Card className="divide-y divide-garis text-sm">
          <div className="p-4">
            <p className="font-semibold">Harga transparan</p>
            <p className="text-ink-muda">Harga produk + jasa titip + ongkir dirinci jelas sebelum kamu bayar.</p>
          </div>
          <div className="p-4">
            <p className="font-semibold">Update status otomatis</p>
            <p className="text-ink-muda">Tiap tahap pesanan muncul di halaman lacak + notifikasi.</p>
          </div>
          <div className="p-4">
            <p className="font-semibold">Custom PO</p>
            <p className="text-ink-muda">Barang nggak ada di katalog? Kirim link produk China, estimasi 1-2 hari kerja.</p>
          </div>
          <div className="p-4">
            <p className="font-semibold">Jalur komplain jelas</p>
            <p className="text-ink-muda">Barang rusak atau nggak sesuai? Ajukan komplain dari detail pesanan.</p>
          </div>
        </Card>

        <Card className="mt-4 p-4 text-sm">
          <p className="font-display text-lg font-bold">Hubungi kami</p>
          <p className="mt-1">WhatsApp: 0878-9838-8993</p>
          <p>Email: hello@jastipchina.id</p>
          <p className="text-ink-muda">Jam: Senin-Sabtu, 09.00-17.00 WIB</p>
          <Link href="/katalog" className="mt-3 inline-block">
            <Button>Mulai Belanja</Button>
          </Link>
        </Card>
      </main>
      <SiteFooter />
      <BottomNav />
    </div>
  );
}
