"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api-client";
import { rupiah, formatTanggalWaktu } from "@/lib/format";
import { SiteHeader, SiteFooter } from "@/components/layout/site";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SkeletonBar } from "@/components/ui/feedback";
import { StatusPipeline } from "@/components/status-pipeline";
import { toast } from "@/components/ui/toaster";
import { useRequireCustomer } from "@/components/auth-guard";
import { labelKurir } from "@/lib/kurir";
import type { Pesanan } from "@/lib/types";

const TAHAP = ["Bayar", "Dikemas", "Tiba di Gudang Lokal", "Di Tangan Kurir", "Sudah Sampai"];
const STATUS_KE_INDEKS: Record<string, number> = {
  MENUNGGU_PEMBAYARAN: 0,
  DIPROSES_ADMIN: 1,
  DIKONSOLIDASI_KIRIM: 2,
  TIBA_KIRIM_LOKAL: 3,
  SELESAI: 4,
};

export default function DetailPesananPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user, isLoading } = useRequireCustomer();
  const [p, setP] = useState<Pesanan | null>(null);
  const [unduh, setUnduh] = useState(false);

  const ambil = useCallback(async () => {
    const res = await api<{ pesanan: Pesanan }>(`/api/pesanan/${id}`);
    setP(res.pesanan);
  }, [id]);

  useEffect(() => {
    if (!isLoading && user) ambil().catch((err) => toast(err.message, "error"));
  }, [isLoading, user, ambil]);

  if (isLoading || !user || !p) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <main className="mx-auto max-w-3xl px-4 py-6">
          <SkeletonBar /> <div className="mt-2" /> <SkeletonBar />
        </main>
      </div>
    );
  }

  // Countdown pembayaran (24h dari tglPesan)
  const sisaBayarMs =
    p.statusPesanan === "MENUNGGU_PEMBAYARAN"
      ? new Date(p.tglPesan).getTime() + 24 * 60 * 60 * 1000 - Date.now()
      : 0;

  const dibatalkan = p.statusPesanan === "DIBATALKAN";
  const indeks = dibatalkan ? 0 : (STATUS_KE_INDEKS[p.statusPesanan] ?? 0);
  const waktuPerTahap = TAHAP.map((_, i) => {
    const kode = Object.keys(STATUS_KE_INDEKS).find((k) => STATUS_KE_INDEKS[k] === i);
    const log = p.statusLog?.find((l) => l.status === kode);
    return log ? formatTanggalWaktu(log.waktu) : null;
  });

  const batalkan = async () => {
    if (!confirm("Yakin batalkan pesanan ini?")) return;
    try {
      await api(`/api/pesanan/${id}/batal`, { method: "POST" });
      toast("Pesanan dibatalkan", "sukses");
      await ambil();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal", "error");
    }
  };

  const konfirmasiTerima = async () => {
    if (!confirm("Yakin barang sudah diterima? Pesanan akan ditutup.")) return;
    try {
      await api(`/api/pesanan/${id}/konfirmasi-terima`, { method: "POST" });
      toast("Pesanan selesai, terima kasih!", "sukses");
      await ambil();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal", "error");
    }
  };

  const unduhInvoice = async () => {
    setUnduh(true);
    try {
      const res = await fetch(`/api/pesanan/${id}/invoice`, { credentials: "include" });
      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        const msg = errText.substring(0, 100) || res.statusText;
        throw new Error(`Gagal unduh invoice (${res.status}) — ${msg}`);
      }
      const blob = await res.blob();
      if (blob.size === 0) throw new Error("File kosong");
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice-${p.noInvoice}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal", "error");
    } finally {
      setUnduh(false);
    }
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-6 pb-24 md:pb-12">
        <p className="text-sm text-ink-muda">
          <Link href="/pesanan" className="hover:text-brand">Riwayat</Link> / {p.noInvoice}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <h1 className="text-xl font-bold md:text-2xl">{p.noInvoice}</h1>
          <Badge status={p.statusPesanan} />
        </div>
        <p className="text-sm text-ink-muda">{formatTanggalWaktu(p.tglPesan)}</p>

        {sisaBayarMs > 0 && (
          <Card className="mt-4 border-l-4 border-l-red-500 p-4">
            <p className="font-semibold text-red-600">
              Sisa waktu pembayaran: {Math.floor(sisaBayarMs / (1000 * 60 * 60))} jam{" "}
              {Math.floor((sisaBayarMs % (1000 * 60 * 60)) / (1000 * 60))} menit
            </p>
          </Card>
        )}

        <Card className="mt-4 p-4">
          <StatusPipeline
            tahap={TAHAP.map((label, i) => ({ label, waktu: waktuPerTahap[i] }))}
            indeksAktif={indeks}
            gagal={dibatalkan}
          />
        </Card>

        <Card className="mt-4 p-4">
          <p className="mb-2 font-display text-lg font-bold">Item Pesanan</p>
          <div className="flex flex-col gap-2 text-sm">
            {p.item.map((i) => (
              <div key={i.id} className="flex justify-between gap-2">
                <span>
                  {i.namaItemSnapshot}
                  {i.varianSnapshot ? ` (${i.varianSnapshot})` : ""} × {i.jumlah}
                </span>
                <span className="font-medium">{rupiah(Number(i.hargaSatuanSaatBeli) * i.jumlah)}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="mt-4 p-4 text-sm">
          <p className="mb-2 font-display text-lg font-bold">Info Pengiriman</p>
          {p.alamat && (
            <p className="text-ink-muda">
              {p.alamat.penerima}, {p.alamat.alamatLengkap}, {p.alamat.kota} {p.alamat.kodePos}
            </p>
          )}
          <p className="mt-1">Kurir: {labelKurir(p.pengiriman?.kurir)}</p>
          <p>
            No. Resi: {p.pengiriman?.noResi ?? "-"}
            {p.pengiriman?.noResi && (
              <button
                className="ml-2 text-brand underline"
                onClick={() => {
                  void navigator.clipboard.writeText(p.pengiriman!.noResi!);
                  toast("No. resi tersalin!", "sukses");
                }}
              >
                Salin
              </button>
            )}
          </p>
        </Card>

        <Card className="mt-4 p-4 text-sm">
          <p className="mb-2 font-display text-lg font-bold">Rincian Biaya</p>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between"><span>Subtotal Produk</span><span>{rupiah(p.subtotalProduk)}</span></div>
            <div className="flex justify-between"><span>Biaya Jasa Titip (35%)</span><span>{rupiah(p.biayaJasaTitip)}</span></div>
            <div className="flex justify-between"><span>Ongkir China ke Gudang</span><span>{rupiah(p.ongkirChinaGudang)}</span></div>
            <div className="flex justify-between"><span>Ongkir Domestik</span><span>{rupiah(p.ongkirDomestik)}</span></div>
            <div className="my-1 h-px bg-garis" />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-gold-tua">{rupiah(p.totalAkhir)}</span>
            </div>
          </div>
        </Card>

        <div className="mt-4 flex flex-wrap gap-2">
          {p.statusPesanan === "MENUNGGU_PEMBAYARAN" && (
            <>
              <Link href={`/pesanan/${id}/pembayaran`}><Button>Upload Bukti Pembayaran</Button></Link>
              <Button varian="danger" onClick={batalkan}>Batalkan Pesanan</Button>
            </>
          )}
          {p.statusPesanan === "TIBA_KIRIM_LOKAL" && (
            <Button onClick={konfirmasiTerima}>Konfirmasi Sudah Terima</Button>
          )}
          {p.statusPesanan === "SELESAI" && (
            <Link href={`/komplain?pesananId=${id}`}><Button varian="secondary">Ajukan Komplain</Button></Link>
          )}
          <Button varian="secondary" memuat={unduh} onClick={unduhInvoice}>
            Unduh Invoice PDF
          </Button>
        </div>
      </main>
      <SiteFooter />
      <BottomNav />
    </div>
  );
}
