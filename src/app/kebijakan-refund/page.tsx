import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/layout/site";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function KebijakanRefundPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-6 pb-24 md:pb-12">
        <h1 className="text-2xl font-bold md:text-3xl">Kebijakan Refund</h1>
        <Card className="mt-4 flex flex-col gap-3 p-4 text-sm leading-relaxed">
          <p>
            1. Barang rusak, tidak sesuai, atau salah kirim bisa diajukan lewat halaman komplain
            maksimal 7 hari setelah paket tiba, wajib sertakan 1 foto bukti.
          </p>
          <p>
            2. Admin memutuskan solusi: kirim ulang, refund sebagian, refund penuh, atau ditolak —
            dan mengabari via notifikasi maksimal 2x24 jam hari kerja.
          </p>
          <p>
            3. Refund yang disetujui ditransfer ke rekening customer. Tidak ada refund otomatis
            tanpa pengajuan komplain.
          </p>
          <p>
            4. Pembayaran yang ditolak verifikasinya (bukti tidak valid) bukan refund — customer
            bisa bayar ulang selama stok tersedia, atau batalkan pesanan.
          </p>
        </Card>
        <Link href="/komplain" className="mt-4 inline-block">
          <Button varian="secondary">Ajukan Komplain</Button>
        </Link>
      </main>
      <SiteFooter />
      <BottomNav />
    </div>
  );
}
