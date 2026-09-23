"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import { rupiah, formatTanggalWaktu } from "@/lib/format";
import { SiteHeader, SiteFooter } from "@/components/layout/site";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState, SkeletonBar } from "@/components/ui/feedback";
import { useRequireCustomer } from "@/components/auth-guard";
import type { Pesanan, PermintaanPO } from "@/lib/types";

const FILTER_PESANAN = ["Semua", "Menunggu Bayar", "Diproses", "Dikirim", "Selesai"] as const;

function cocokFilter(status: string, filter: string): boolean {
  switch (filter) {
    case "Menunggu Bayar":
      return status === "MENUNGGU_PEMBAYARAN";
    case "Diproses":
      return status === "DIPROSES_ADMIN" || status === "DIKONSOLIDASI_KIRIM";
    case "Dikirim":
      return status === "TIBA_KIRIM_LOKAL";
    case "Selesai":
      return status === "SELESAI";
    default:
      return true;
  }
}

const LABEL_PO: Record<string, string> = {
  MENUNGGU_REVIEW: "Menunggu Review",
  DIKONFIRMASI_HARGA: "Dikonfirmasi Harga",
  SUDAH_JADI_PESANAN: "Sudah Jadi Pesanan",
  DITOLAK: "Ditolak",
};

function RiwayatIsi() {
  const { user, isLoading } = useRequireCustomer();
  const params = useSearchParams();
  const router = useRouter();
  const tab = params.get("tab") === "po" ? "po" : "pesanan";
  const [pesanan, setPesanan] = useState<Pesanan[]>([]);
  const [po, setPo] = useState<PermintaanPO[]>([]);
  const [filter, setFilter] = useState<string>("Semua");
  const [memuat, setMemuat] = useState(true);

  useEffect(() => {
    if (isLoading || !user) return;
    (async () => {
      setMemuat(true);
      try {
        if (tab === "po") {
          const res = await api<{ items: PermintaanPO[] }>("/api/permintaan-po");
          setPo(res.items);
        } else {
          const res = await api<{ items: Pesanan[] }>("/api/pesanan");
          setPesanan(res.items);
        }
      } finally {
        setMemuat(false);
      }
    })();
  }, [isLoading, user, tab]);

  const daftar = useMemo(() => pesanan.filter((p) => cocokFilter(p.statusPesanan, filter)), [pesanan, filter]);

  const gantiTab = (t: string) => {
    router.push(t === "po" ? "/pesanan?tab=po" : "/pesanan");
  };

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <Button varian={tab === "pesanan" ? "primary" : "secondary"} ukuran="sm" onClick={() => gantiTab("pesanan")}>
          Pesanan
        </Button>
        <Button varian={tab === "po" ? "primary" : "secondary"} ukuran="sm" onClick={() => gantiTab("po")}>
          Pengajuan PO
        </Button>
      </div>

      {tab === "pesanan" ? (
        <>
          <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
            {FILTER_PESANAN.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-sm ${
                  filter === f ? "border-brand bg-brand/10 font-semibold text-brand" : "border-garis bg-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          {memuat ? (
            <div className="flex flex-col gap-2"><SkeletonBar /><SkeletonBar /><SkeletonBar /></div>
          ) : daftar.length === 0 ? (
            <EmptyState
              judul="Belum ada pesanan"
              deskripsi="Saatnya belanja pertama kamu!"
              aksi={<Link href="/katalog"><Button>Mulai Belanja</Button></Link>}
            />
          ) : (
            <div className="flex flex-col gap-3">
              {daftar.map((p) => (
                <Link
                  key={p.id}
                  href={`/pesanan/${p.id}`}
                  className="rounded-xl border border-garis bg-white p-4 transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-mono text-sm font-semibold">{p.noInvoice}</p>
                    <Badge status={p.statusPesanan} />
                  </div>
                  <p className="mt-1 text-xs text-ink-muda">{formatTanggalWaktu(p.tglPesan)}</p>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-sm text-ink-muda">{p.item.length} item</p>
                    <p className="font-display text-lg font-bold text-gold-tua">{rupiah(p.totalAkhir)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      ) : memuat ? (
        <div className="flex flex-col gap-2"><SkeletonBar /><SkeletonBar /></div>
      ) : po.length === 0 ? (
        <EmptyState
          judul="Belum ada pengajuan PO"
          deskripsi="Ajukan barang impianmu yang nggak ada di katalog."
          aksi={<Link href="/ajukan-po"><Button>Ajukan PO</Button></Link>}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {po.map((x) => (
            <Link
              key={x.id}
              href={`/po/${x.id}`}
              className="rounded-xl border border-garis bg-white p-4 transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold">{x.deskripsiSpesifikasi.slice(0, 60)}</p>
                <Badge status={x.status} />
              </div>
              <p className="mt-1 text-xs text-ink-muda">
                {formatTanggalWaktu(x.tglSubmit)} — {x.jumlahDiminta} unit
              </p>
              {x.status === "DIKONFIRMASI_HARGA" && (
                <p className="mt-1 text-sm font-medium text-brand">
                  {LABEL_PO[x.status]} — {rupiah(x.estimasiHarga ?? 0)}/unit. Ketuk untuk setujui/tolak.
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function RiwayatPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-6 pb-24 md:pb-12">
        <h1 className="mb-4 text-2xl font-bold md:text-3xl">Riwayat</h1>
        <Suspense fallback={<SkeletonBar />}>
          <RiwayatIsi />
        </Suspense>
      </main>
      <SiteFooter />
      <BottomNav />
    </div>
  );
}
