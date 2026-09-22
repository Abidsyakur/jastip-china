"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api-client";
import { formatTanggalWaktu } from "@/lib/format";
import { SiteHeader, SiteFooter } from "@/components/layout/site";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Button } from "@/components/ui/button";
import { EmptyState, SkeletonBar } from "@/components/ui/feedback";
import { toast } from "@/components/ui/toaster";
import { useRequireCustomer } from "@/components/auth-guard";
import type { Notifikasi } from "@/lib/types";

const TAG_TIPE: Record<string, string> = {
  PESANAN: "Pesanan",
  STATUS_PESANAN: "Pesanan",
  PEMBAYARAN: "Pesanan",
  PEMBATALAN_PESANAN: "Pesanan",
  PO: "PO",
  KOMPLAIN: "Komplain",
};

export default function NotifikasiPage() {
  const { user, isLoading } = useRequireCustomer();
  const [items, setItems] = useState<Notifikasi[]>([]);
  const [memuat, setMemuat] = useState(true);

  const ambil = async () => {
    const res = await api<{ items: Notifikasi[] }>("/api/notifikasi");
    setItems(res.items);
  };

  useEffect(() => {
    if (!isLoading && user) {
      ambil()
        .catch((err) => toast(err.message, "error"))
        .finally(() => setMemuat(false));
    }
  }, [isLoading, user]);

  const tandaiSemua = async () => {
    try {
      await api("/api/notifikasi/tandai-baca", { method: "PATCH", body: {} });
      setItems((l) => l.map((n) => ({ ...n, statusBaca: true })));
      toast("Semua notifikasi ditandai baca", "sukses");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal", "error");
    }
  };

  const belumDibaca = items.filter((n) => !n.statusBaca).length;

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-6 pb-24 md:pb-12">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold md:text-3xl">Notifikasi</h1>
          {belumDibaca > 0 && (
            <button onClick={tandaiSemua} className="text-sm font-medium text-brand">
              Tandai Semua Baca
            </button>
          )}
        </div>
        {memuat || isLoading || !user ? (
          <div className="flex flex-col gap-2"><SkeletonBar /><SkeletonBar /></div>
        ) : items.length === 0 ? (
          <EmptyState judul="Belum ada notifikasi" deskripsi="Notifikasi bakal muncul di sini." />
        ) : (
          <div className="flex flex-col divide-y divide-garis rounded-xl border border-garis bg-white">
            {items.map((n) => (
              <div key={n.id} className="flex gap-3 p-4">
                {!n.statusBaca && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand" />}
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-ink-muda">[{TAG_TIPE[n.tipe] ?? "Info"}]</p>
                  <p className={`text-sm ${n.statusBaca ? "" : "font-semibold"}`}>{n.pesan}</p>
                  <p className="mt-1 text-xs text-ink-muda">{formatTanggalWaktu(n.tglKirim)}</p>
                  {n.pesananId && (
                    <Link href={`/pesanan/${n.pesananId}`} className="text-xs font-medium text-brand">
                      Lihat pesanan
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-6 text-center">
          <Link href="/bantuan"><Button varian="secondary" ukuran="sm">Butuh bantuan?</Button></Link>
        </div>
      </main>
      <SiteFooter />
      <BottomNav />
    </div>
  );
}
