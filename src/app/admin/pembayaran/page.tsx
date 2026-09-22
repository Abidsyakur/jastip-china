"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { rupiah } from "@/lib/format";
import { AdminShell } from "@/components/layout/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Select, Textarea } from "@/components/ui/input";
import { SkeletonBar, EmptyState } from "@/components/ui/feedback";
import { toast } from "@/components/ui/toaster";
import { useRequireAdmin } from "@/components/auth-guard";
import type { AdminPembayaran } from "@/lib/types-admin";

const STATUS = ["MENUNGGU_VERIFIKASI", "TERVERIFIKASI", "DITOLAK", "KADALUARSA", "MENUNGGU_BUKTI"];

export default function AdminPembayaranPage() {
  const { user, isLoading } = useRequireAdmin();
  const [items, setItems] = useState<AdminPembayaran[]>([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [memuat, setMemuat] = useState(true);
  const [bukaId, setBukaId] = useState<string | null>(null);
  const [catatan, setCatatan] = useState("");
  const [kerja, setKerja] = useState(false);

  const ambil = useCallback(async () => {
    setMemuat(true);
    try {
      const q = new URLSearchParams({ limit: "10", page: String(page) });
      if (status) q.set("status", status);
      const res = await api<{ items: AdminPembayaran[]; total: number }>(`/api/admin/pembayaran?${q}`);
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

  const verifikasi = async (id: string, terima: boolean) => {
    if (!terima && !catatan.trim()) {
      toast("Catatan wajib diisi kalau menolak", "error");
      return;
    }
    setKerja(true);
    try {
      await api(`/api/admin/pembayaran/${id}/verifikasi`, {
        method: "PATCH",
        body: terima ? { status: "TERVERIFIKASI" } : { status: "DITOLAK", catatanAdmin: catatan },
      });
      toast(terima ? "Pembayaran diverifikasi" : "Pembayaran ditolak, customer dikabarin", "sukses");
      setBukaId(null);
      setCatatan("");
      await ambil();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal", "error");
    } finally {
      setKerja(false);
    }
  };

  const halamanTerakhir = Math.max(1, Math.ceil(total / 10));

  return (
    <AdminShell>
      <h1 className="mb-4 text-2xl font-bold">Verifikasi Pembayaran</h1>
      <div className="mb-3 md:w-64">
        <Field label="Status">
          <Select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
            <option value="">Menunggu Verifikasi (default)</option>
            {STATUS.map((s) => (
              <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
            ))}
          </Select>
        </Field>
      </div>

      {memuat || isLoading || !user ? (
        <div className="flex flex-col gap-2"><SkeletonBar /><SkeletonBar /></div>
      ) : items.length === 0 ? (
        <EmptyState judul="Nihil" deskripsi="Tidak ada pembayaran untuk filter ini." />
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {items.map((b) => (
              <Card key={b.id} className="p-4">
                <button
                  onClick={() => { setBukaId(bukaId === b.id ? null : b.id); setCatatan(""); }}
                  className="flex w-full items-center justify-between gap-2 text-left"
                >
                  <div>
                    <p className="font-mono text-sm font-semibold">{b.pesanan.noInvoice}</p>
                    <p className="text-sm">{b.metode} — {rupiah(b.jumlahBayar)}</p>
                  </div>
                  <Badge status={b.status} />
                </button>

                {bukaId === b.id && (
                  <div className="mt-3 border-t border-garis pt-3 text-sm">
                    <p>Cocokkan nominal, bank, tanggal. Terima jadi DIPROSES_ADMIN, tolak stok kembali.</p>
                    {b.buktiUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={b.buktiUrl} alt="Bukti transfer" className="mt-2 max-h-72 rounded-lg object-contain" />
                    ) : (
                      <p className="mt-2 text-ink-muda">Belum ada bukti terupload.</p>
                    )}
                    {b.status === "MENUNGGU_VERIFIKASI" ? (
                      <div className="mt-3">
                        <Field label="Catatan (wajib kalau tolak)">
                          <Textarea value={catatan} onChange={(e) => setCatatan(e.target.value)} />
                        </Field>
                        <div className="mt-2 flex gap-2">
                          <Button varian="danger" className="flex-1" disabled={kerja} onClick={() => verifikasi(b.id, false)}>
                            Tolak, wajib catatan
                          </Button>
                          <Button className="flex-1" disabled={kerja} onClick={() => verifikasi(b.id, true)}>
                            Verifikasi Bayar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      b.catatanAdmin && <p className="mt-2 text-ink-muda">Catatan: {b.catatanAdmin}</p>
                    )}
                  </div>
                )}
              </Card>
            ))}
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
