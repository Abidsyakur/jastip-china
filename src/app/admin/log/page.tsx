"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { formatTanggalWaktu } from "@/lib/format";
import { AdminShell } from "@/components/layout/admin-shell";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";
import { SkeletonBar, EmptyState } from "@/components/ui/feedback";
import { toast } from "@/components/ui/toaster";
import { useRequireAdmin } from "@/components/auth-guard";
import type { LogAktivitas } from "@/lib/types-admin";

export default function AdminLogPage() {
  const { user, isLoading } = useRequireAdmin();
  const [items, setItems] = useState<LogAktivitas[]>([]);
  const [total, setTotal] = useState(0);
  const [aksi, setAksi] = useState("");
  const [page, setPage] = useState(1);
  const [memuat, setMemuat] = useState(true);

  const ambil = useCallback(async () => {
    setMemuat(true);
    try {
      const q = new URLSearchParams({ limit: "20", page: String(page) });
      if (aksi) q.set("aksi", aksi);
      const res = await api<{ items: LogAktivitas[]; total: number }>(`/api/admin/log-aktivitas?${q}`);
      setItems(res.items);
      setTotal(res.total);
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal", "error");
    } finally {
      setMemuat(false);
    }
  }, [aksi, page]);

  useEffect(() => {
    if (!isLoading && user) void ambil();
  }, [isLoading, user, ambil]);

  const halamanTerakhir = Math.max(1, Math.ceil(total / 20));

  return (
    <AdminShell>
      <h1 className="mb-4 text-2xl font-bold">Log Aktivitas</h1>
      <form
        className="mb-3 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          setPage(1);
          void ambil();
        }}
      >
        <div className="flex-1">
          <Field label="Filter aksi">
            <Input value={aksi} onChange={(e) => setAksi(e.target.value)} placeholder="VERIFIKASI_PEMBAYARAN" />
          </Field>
        </div>
        <div className="flex items-end">
          <Button type="submit" ukuran="sm" varian="secondary">Filter</Button>
        </div>
      </form>

      {memuat || isLoading || !user ? (
        <div className="flex flex-col gap-2"><SkeletonBar /><SkeletonBar /></div>
      ) : items.length === 0 ? (
        <EmptyState judul="Belum ada aktivitas tercatat" deskripsi="Tidak ada log untuk filter ini." />
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl border border-garis bg-white">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-garis text-xs text-ink-muda">
                  <th className="p-3">Waktu</th>
                  <th className="p-3">Admin</th>
                  <th className="p-3">Aksi</th>
                  <th className="p-3">Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {items.map((l) => (
                  <tr key={l.id} className="border-b border-garis last:border-0">
                    <td className="whitespace-nowrap p-3">{formatTanggalWaktu(l.waktu)}</td>
                    <td className="p-3">{l.admin.nama}</td>
                    <td className="p-3 font-medium">{l.aksi}</td>
                    <td className="p-3 text-ink-muda">{l.keterangan ?? "-"}</td>
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
