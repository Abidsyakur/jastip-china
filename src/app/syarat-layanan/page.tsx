import { SiteHeader, SiteFooter } from "@/components/layout/site";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Card } from "@/components/ui/card";

export default function SyaratLayananPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-6 pb-24 md:pb-12">
        <h1 className="text-2xl font-bold md:text-3xl">Syarat Layanan</h1>
        <Card className="mt-4 flex flex-col gap-3 p-4 text-sm leading-relaxed">
          <p>
            1. Pemesanan dilakukan lewat katalog atau Custom PO. Harga yang tampil sudah termasuk
            perhitungan jasa titip 35% (minimal Rp15.000) dan ongkir domestik.
          </p>
          <p>
            2. Pembayaran via transfer bank ke rekening resmi yang tampil di halaman pembayaran,
            lalu upload bukti transfer. Verifikasi maksimal 1x24 jam.
          </p>
          <p>
            3. Pesanan yang belum diproses admin bisa dibatalkan customer dari halaman detail
            pesanan. Pesanan yang sudah diproses tidak bisa dibatalkan sendiri.
          </p>
          <p>
            4. Estimasi tiba 7-14 hari setelah pembayaran terverifikasi. Keterlambatan akibat
            bea cukai atau force majeure akan dikabari via notifikasi.
          </p>
          <p>
            5. Akun dan password adalah tanggung jawab pemiliknya. Satu nomor WhatsApp untuk
            satu akun.
          </p>
        </Card>
      </main>
      <SiteFooter />
      <BottomNav />
    </div>
  );
}
