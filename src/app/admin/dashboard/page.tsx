"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api-client";
import { rupiah } from "@/lib/format";
import { AdminShell } from "@/components/layout/admin-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SkeletonBar } from "@/components/ui/feedback";
import { toast } from "@/components/ui/toaster";
import { useRequireAdmin } from "@/components/auth-guard";
import type { DashboardStatistik, ProdukTerlaris, OmzetHarian, AdminPesanan } from "@/lib/types-admin";

export default function AdminDashboardPage() {
  const { user, isLoading } = useRequireAdmin();
  const [stat, setStat] = useState<DashboardStatistik | null>(null);
  const [terlaris, setTerlaris] = useState<ProdukTerlaris[]>([]);
  const [harian, setHarian] = useState<OmzetHarian[]>([]);
  const [terbaru, setTerbaru] = useState<AdminPesanan[]>([]);

  useEffect(() => {
    if (isLoading || !user) return;
    (async () => {
      try {
        const [s, t, h, b] = await Promise.all([
          api<DashboardStatistik>("/api/admin/dashboard/statistik"),
          api<{ items: ProdukTerlaris[] }>("/api/admin/dashboard/produk-terlaris?limit=3"),
          api<{ items: OmzetHarian[] }>("/api/admin/dashboard/omzet-harian?hari=7"),
          api<{ items: AdminPesanan[] }>("/api/admin/pesanan?limit=4"),
        ]);
        setStat(s);
        setTerlaris(t.items);
        setHarian(h.items);
        setTerbaru(b.items);
      } catch (err) {
        toast(err instanceof Error ? err.message : "Gagal", "error");
      }
    })();
  }, [isLoading, user]);

  if (isLoading || !user) {
    return (
      <AdminShell>
        <SkeletonBar />
      </AdminShell>
    );
  }

  const maksOmzet = Math.max(1, ...harian.map((x) => Number(x.omzet)));
  const totalPesanan = (stat?.pesananPerStatus ?? []).reduce((s, x) => s + x.jumlah, 0);

  return (
    <AdminShell>
      <h1 className="mb-1 text-2xl font-bold">Dashboard Admin, Kelola</h1>
      <p className="mb-4 text-sm text-ink-muda">Halo, {user.nama}. Toko berjalan baik hari ini.</p>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Card className="p-4">
          <p className="font-display text-2xl font-bold">{totalPesanan}</p>
          <p className="text-xs text-ink-muda">Pesanan Bulan Ini</p>
        </Card>
        <Card className="p-4">
          <p className="font-display text-2xl font-bold text-gold-tua">{rupiah(stat?.omzet ?? 0)}</p>
          <p className="text-xs text-ink-muda">Omzet Bulan Ini</p>
        </Card>
        <Card className="p-4">
          <p className="font-display text-2xl font-bold">{stat?.perluPerhatian.poMenungguReview ?? "-"}</p>
          <p className="text-xs text-ink-muda">PO Menunggu</p>
        </Card>
        <Card className="p-4">
          <p className="font-display text-2xl font-bold">{stat?.perluPerhatian.komplainBelumSelesai ?? "-"}</p>
          <p className="text-xs text-ink-muda">Komplain Terbuka</p>
        </Card>
      </div>

      {stat && (
        <Card className="mt-4 border-l-4 border-l-brand p-4 text-sm">
          <p className="mb-1 font-display font-bold">Perlu Perhatian</p>
          <p>● {stat.perluPerhatian.pembayaranMenungguVerifikasi} pesanan menunggu verifikasi pembayaran</p>
          <p>● {stat.perluPerhatian.poMenungguReview} PO menunggu penawaran</p>
          <p>● {stat.perluPerhatian.komplainBelumSelesai} komplain baru</p>
        </Card>
      )}

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card className="p-4">
          <p className="mb-2 font-display font-bold">Omzet 7 hari</p>
          {harian.length === 0 ? (
            <SkeletonBar />
          ) : (
            <div className="flex h-28 items-end gap-1">
              {harian.map((x) => (
                <div key={x.tanggal} className="flex flex-1 flex-col items-center gap-1" title={`${x.tanggal}: ${rupiah(x.omzet)}`}>
                  <div
                    className="w-full rounded-t bg-gold"
                    style={{ height: `${Math.max(4, (Number(x.omzet) / maksOmzet) * 100)}px` }}
                  />
                  <span className="text-[10px] text-ink-muda">{x.tanggal.slice(8)}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
        <Card className="p-4">
          <p className="mb-2 font-display font-bold">Produk Terlaris</p>
          {terlaris.length === 0 ? (
            <p className="text-sm text-ink-muda">Belum ada data.</p>
          ) : (
            <div className="flex flex-col gap-1 text-sm">
              {terlaris.map((t) => (
                <p key={t.produkId}>
                  {t.namaProduk}, {t.kategori}, {rupiah(t.hargaJualIdr)}, {t.totalTerjual} terjual
                </p>
              ))}
            </div>
          )}
        </Card>
      </div>

      <Card className="mt-4 p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="font-display font-bold">Pesanan Terbaru</p>
          <Link href="/admin/pesanan" className="text-sm font-medium text-brand">Lihat Semua</Link>
        </div>
        <div className="flex flex-col divide-y divide-garis text-sm">
          {terbaru.map((p) => (
            <Link key={p.id} href={`/admin/pesanan/${p.id}`} className="flex items-center justify-between gap-2 py-2">
              <span className="font-mono">{p.noInvoice}</span>
              <Badge status={p.statusPesanan} />
              <span className="font-medium">{rupiah(p.totalAkhir)}</span>
            </Link>
          ))}
          {terbaru.length === 0 && <p className="py-2 text-ink-muda">Belum ada pesanan.</p>}
        </div>
      </Card>
    </AdminShell>
  );
}
