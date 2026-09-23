"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api-client";
import { formatTanggalWaktu } from "@/lib/format";
import { SiteHeader, SiteFooter } from "@/components/layout/site";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SkeletonBar, EmptyState } from "@/components/ui/feedback";
import { toast } from "@/components/ui/toaster";
import { useRequireCustomer } from "@/components/auth-guard";

interface Komplain {
  id: string;
  alasan: string;
  status: string;
  solusi: string | null;
  tglKomplain: string;
  pesananItem: {
    namaItemSnapshot: string;
    varianSnapshot: string | null;
    pesanan: { noInvoice: string };
  };
}

const LABEL_ALASAN: Record<string, string> = {
  BARANG_RUSAK: "Barang rusak",
  TIDAK_SESUAI_DESKRIPSI: "Tidak sesuai deskripsi",
  SALAH_KIRIM: "Salah kirim",
  LAINNYA: "Lainnya",
};

const LABEL_SOLUSI: Record<string, string> = {
  REFUND_PENUH: "Refund penuh",
  REFUND_SEBAGIAN: "Refund sebagian",
  KIRIM_ULANG: "Kirim ulang",
  TIDAK_ADA_SOLUSI: "Tidak ada solusi",
};

export default function RiwayatKomplainPage() {
  const { user, isLoading } = useRequireCustomer();
  const [daftar, setDaftar] = useState<Komplain[]>([]);
  const [memuat, setMemuat] = useState(true);

  useEffect(() => {
    if (isLoading || !user) return;
    api<{ items: Komplain[] }>("/api/komplain")
      .then((r) => setDaftar(r.items))
      .catch((err) => toast(err.message, "error"))
      .finally(() => setMemuat(false));
  }, [isLoading, user]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <main className="mx-auto max-w-3xl px-4 py-6">
          <SkeletonBar />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-6 pb-24 md:pb-12">
        <h1 className="text-2xl font-bold md:text-3xl">Riwayat Komplain</h1>

        {memuat ? (
          <div className="mt-4"><SkeletonBar /><div className="mt-2" /><SkeletonBar /></div>
        ) : daftar.length === 0 ? (
          <EmptyState
            judul="Belum ada komplain"
            deskripsi="Komplain muncul di sini setelah kamu ajukan."
          />
        ) : (
          <div className="mt-4 flex flex-col gap-3">
            {daftar.map((k) => (
              <Card key={k.id} className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{k.pesananItem.namaItemSnapshot}{k.pesananItem.varianSnapshot ? ` (${k.pesananItem.varianSnapshot})` : ""}</p>
                    <p className="text-xs text-ink-muda">Invoice: {k.pesananItem.pesanan.noInvoice}</p>
                  </div>
                  <Badge status={k.status} />
                </div>
                <p className="mt-2 text-sm text-ink-muda">Alasan: {LABEL_ALASAN[k.alasan] ?? k.alasan}</p>
                {k.solusi && (
                  <p className="mt-1 text-sm text-ink-muda">Solusi: {LABEL_SOLUSI[k.solusi] ?? k.solusi}</p>
                )}
                <div className="mt-2 flex items-center justify-between text-xs text-ink-muda">
                  <span>{formatTanggalWaktu(k.tglKomplain)}</span>
                  <Link href={`/komplain/${k.id}`} className="text-brand underline">
                    Lihat Detail
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
      <BottomNav />
    </div>
  );
}
