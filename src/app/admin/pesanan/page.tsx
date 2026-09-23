"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api-client";
import { rupiah, formatTanggal } from "@/lib/format";
import { AdminShell } from "@/components/layout/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, Input, Select } from "@/components/ui/input";
import { SkeletonBar, EmptyState } from "@/components/ui/feedback";
import { toast } from "@/components/ui/toaster";
import { useRequireAdmin } from "@/components/auth-guard";
import type { AdminPesanan } from "@/lib/types-admin";

const STATUS = ["", "MENUNGGU_PEMBAYARAN", "DIPROSES_ADMIN", "DIKONSOLIDASI_KIRIM", "TIBA_KIRIM_LOKAL", "SUDAH_SAMPAI", "DIBATALKAN"];

export default function AdminPesananPage() {
  const { user, isLoading } = useRequireAdmin();
  const [items, setItems] = useState<AdminPesanan[]>([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("");
  const [cari, setCari] = useState("");
  const [page, setPage] = useState(1);
  const [memuat, setMemuat] = useState(true);

  const ambil = useCallback(async () => {
    setMemuat(true);
    try {
      const q = new URLSearchParams({ limit: "10", page: String(page) });
      if (status) q.set("status", status);
      const res = await api<{ items: AdminPesanan[]; total: number }>(`/api/admin/pesanan?${q}`);
      setItems(res.items);
      setTotal(res.total);
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal", "error");
    } finally {
      setMemuat(false);
    }
  }, [status, page]);

  useEffect(() => {
    if (!isLoading && user) void ambil();
  }, [isLoading, user, ambil]);

  const tampil = items.filter(
    (p) => !cari || p.noInvoice.toLowerCase().includes(cari.toLowerCase())
  );

  const exportCsv = () => {
    const baris = ["invoice,tanggal,total,status", ...tampil.map((p) => `${p.noInvoice},${p.tglPesan},${p.totalAkhir},${p.statusPesanan}`)];
    const blob = new Blob([baris.join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "pesanan.csv";
    a.click();
  };

  const halamanTerakhir = Math.max(1, Math.ceil(total / 10));

  return (
    <AdminShell>
      <h1 className="mb-4 text-2xl font-bold">Kelola Pesanan</h1>
      <div className="mb-3 flex flex-col gap-2 md:flex-row">
        <div className="flex-1">
          <Field label="Cari invoice">
            <Input value={cari} onChange={(e) => setCari(e.target.value)} placeholder="INV-..." />
          </Field>
        </div>
        <div className="md:w-56">
          <Field label="Status">
            <Select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
              <option value="">Semua</option>
              {STATUS.slice(1).map((s) => (
                <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
              ))}
            </Select>
          </Field>
        </div>
        <div className="flex items-end">
          <Button varian="secondary" ukuran="sm" onClick={exportCsv}>Export CSV</Button>
        </div>
      </div>

      {memuat || isLoading || !user ? (
        <div className="flex flex-col gap-2"><SkeletonBar /><SkeletonBar /></div>
      ) : tampil.length === 0 ? (
        <EmptyState judul="Belum ada pesanan" deskripsi="Tidak ada pesanan untuk filter ini." />
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl border border-garis bg-white">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-garis text-xs text-ink-muda">
                  <th className="p-3">Invoice</th>
                  <th className="p-3">Tanggal</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {tampil.map((p) => (
                  <tr key={p.id} className="border-b border-garis last:border-0 hover:bg-krim/50">
                    <td className="p-3">
                      <Link href={`/admin/pesanan/${p.id}`} className="font-mono font-medium text-brand">
                        {p.noInvoice}
                      </Link>
                    </td>
                    <td className="p-3">{formatTanggal(p.tglPesan)}</td>
                    <td className="p-3 font-medium">{rupiah(p.totalAkhir)}</td>
                    <td className="p-3"><Badge status={p.statusPesanan} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm">
            <Button varian="secondary" ukuran="sm" disabled={page <= 1} onClick={() => setPage((x) => x - 1)}>
              Sebelumnya
            </Button>
            <span className="text-ink-muda">{page} / {halamanTerakhir}</span>
            <Button varian="secondary" ukuran="sm" disabled={page >= halamanTerakhir} onClick={() => setPage((x) => x + 1)}>
              Selanjutnya
            </Button>
          </div>
        </>
      )}
    </AdminShell>
  );
}
