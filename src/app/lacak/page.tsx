"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api-client";
import { formatTanggalWaktu } from "@/lib/format";
import { SiteHeader, SiteFooter } from "@/components/layout/site";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Field, Input } from "@/components/ui/input";
import { SkeletonBar, EmptyState } from "@/components/ui/feedback";
import { StatusPipeline } from "@/components/status-pipeline";
import { labelKurir } from "@/lib/kurir";

interface HasilLacak {
  noInvoice: string;
  statusPesanan: string;
  tglPesan: string;
  statusLog: { status: string; waktu: string }[];
  pengiriman: { kurir: string | null; noResi: string | null } | null;
}

const TAHAP = ["Bayar", "Proses", "Konsol", "Lokal", "Selesai"];
const INDEKS: Record<string, number> = {
  MENUNGGU_PEMBAYARAN: 0,
  DIPROSES_ADMIN: 1,
  DIKONSOLIDASI_KIRIM: 2,
  TIBA_KIRIM_LOKAL: 3,
  SELESAI: 4,
};

function LacakIsi({ awal }: { awal: string }) {
  const [invoice, setInvoice] = useState(awal);
  const [hasil, setHasil] = useState<HasilLacak | null>(null);
  const [tidakKetemu, setTidakKetemu] = useState(false);
  const [memuat, setMemuat] = useState(false);

  const cari = async (inv: string) => {
    if (!inv.trim()) return;
    setMemuat(true);
    setTidakKetemu(false);
    setHasil(null);
    try {
      const res = await api<{ pesanan: HasilLacak }>(`/api/lacak?invoice=${encodeURIComponent(inv.trim())}`);
      setHasil(res.pesanan);
    } catch {
      setTidakKetemu(true);
    } finally {
      setMemuat(false);
    }
  };

  return (
    <div>
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          void cari(invoice);
        }}
      >
        <div className="flex-1">
          <Field label="Nomor Invoice">
            <Input value={invoice} onChange={(e) => setInvoice(e.target.value)} placeholder="INV-20240120-XXXXXXX" className="font-mono" />
          </Field>
        </div>
        <div className="flex items-end">
          <Button type="submit" memuat={memuat}>Lacak</Button>
        </div>
      </form>

      {tidakKetemu && (
        <EmptyState judul="Pesanan nggak ketemu" deskripsi="Cek lagi nomor invoice kamu." />
      )}

      {hasil && (
        <Card className="mt-4 p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="font-mono text-sm font-semibold">{hasil.noInvoice}</p>
            <Badge status={hasil.statusPesanan} />
          </div>
          <p className="text-xs text-ink-muda">{formatTanggalWaktu(hasil.tglPesan)}</p>
          <div className="mt-3">
            <StatusPipeline
              tahap={TAHAP.map((label, i) => {
                const kode = Object.keys(INDEKS).find((k) => INDEKS[k] === i);
                const log = hasil.statusLog.find((l) => l.status === kode);
                return { label, waktu: log ? formatTanggalWaktu(log.waktu) : null };
              })}
              indeksAktif={INDEKS[hasil.statusPesanan] ?? 0}
              gagal={hasil.statusPesanan === "DIBATALKAN"}
            />
          </div>
          <div className="mt-3 border-t border-garis pt-3 text-sm">
            <p>Kurir: {labelKurir(hasil.pengiriman?.kurir)}</p>
            <p>No. Resi: {hasil.pengiriman?.noResi ?? "-"}</p>
          </div>
        </Card>
      )}
    </div>
  );
}

export default function LacakPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-6 pb-24 md:pb-12">
        <h1 className="mb-4 text-2xl font-bold md:text-3xl">Lacak Pesanan</h1>
        <Suspense fallback={<SkeletonBar />}>
          <LacakBoot />
        </Suspense>
      </main>
      <SiteFooter />
      <BottomNav />
    </div>
  );
}

function LacakBoot() {
  const params = useSearchParams();
  return <LacakIsi awal={params.get("inv") ?? ""} />;
}
