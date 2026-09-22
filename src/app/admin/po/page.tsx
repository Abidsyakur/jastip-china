"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { rupiah, formatTanggal } from "@/lib/format";
import { AdminShell } from "@/components/layout/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input, Select, Textarea } from "@/components/ui/input";
import { SkeletonBar, EmptyState } from "@/components/ui/feedback";
import { toast } from "@/components/ui/toaster";
import { useRequireAdmin } from "@/components/auth-guard";
import type { AdminPO } from "@/lib/types-admin";

const STATUS = ["", "MENUNGGU_REVIEW", "DIKONFIRMASI_HARGA", "SUDAH_JADI_PESANAN", "DITOLAK"];

export default function AdminPOPage() {
  const { user, isLoading } = useRequireAdmin();
  const [items, setItems] = useState<AdminPO[]>([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [memuat, setMemuat] = useState(true);
  const [bukaId, setBukaId] = useState<string | null>(null);
  const [harga, setHarga] = useState("");
  const [ongkir, setOngkir] = useState("");
  const [catatan, setCatatan] = useState("");
  const [kerja, setKerja] = useState(false);

  const ambil = useCallback(async () => {
    setMemuat(true);
    try {
      const q = new URLSearchParams({ limit: "10", page: String(page) });
      if (status) q.set("status", status);
      const res = await api<{ items: AdminPO[]; total: number }>(`/api/admin/permintaan-po?${q}`);
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

  const buka = (po: AdminPO) => {
    setBukaId(bukaId === po.id ? null : po.id);
    setHarga(po.estimasiHarga ? String(po.estimasiHarga) : "");
    setOngkir(po.estimasiOngkir ? String(po.estimasiOngkir) : "");
    setCatatan(po.catatanAdmin ?? "");
  };

  const kirim = async (poId: string, setuju: boolean) => {
    if (setuju && (!harga || !ongkir)) {
      toast("Isi estimasi harga dan ongkir", "error");
      return;
    }
    if (!setuju && !catatan.trim()) {
      toast("Catatan wajib diisi kalau menolak", "error");
      return;
    }
    setKerja(true);
    try {
      await api(`/api/admin/permintaan-po/${poId}/review`, {
        method: "PATCH",
        body: setuju
          ? { status: "DIKONFIRMASI_HARGA", estimasiHarga: Number(harga), estimasiOngkir: Number(ongkir), catatanAdmin: catatan || undefined }
          : { status: "DITOLAK", catatanAdmin: catatan },
      });
      toast(setuju ? "Penawaran dikirim. Customer bakal dikabarin." : "PO ditolak", "sukses");
      setBukaId(null);
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
      <h1 className="mb-4 text-2xl font-bold">Kelola PO</h1>
      <div className="mb-3 md:w-64">
        <Field label="Status">
          <Select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
            <option value="">Menunggu Review (default)</option>
            {STATUS.slice(1).map((s) => (
              <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
            ))}
          </Select>
        </Field>
      </div>

      {memuat || isLoading || !user ? (
        <div className="flex flex-col gap-2"><SkeletonBar /><SkeletonBar /></div>
      ) : items.length === 0 ? (
        <EmptyState judul="Belum ada permintaan PO" deskripsi="Tidak ada PO untuk filter ini." />
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {items.map((po) => (
              <Card key={po.id} className="p-4">
                <button onClick={() => buka(po)} className="flex w-full items-center justify-between gap-2 text-left">
                  <div>
                    <p className="text-sm font-semibold">{po.deskripsiSpesifikasi.slice(0, 80)}</p>
                    <p className="text-xs text-ink-muda">
                      {po.customer.nama} — {formatTanggal(po.tglSubmit)} — {po.jumlahDiminta} unit
                    </p>
                  </div>
                  <Badge status={po.status} />
                </button>

                {bukaId === po.id && (
                  <div className="mt-3 border-t border-garis pt-3 text-sm">
                    {po.linkProdukReferensi && (
                      <p>
                        Link: <a href={po.linkProdukReferensi} target="_blank" rel="noreferrer" className="text-brand underline">Buka Link</a>
                      </p>
                    )}
                    <p className="mt-1 whitespace-pre-line">{po.deskripsiSpesifikasi}</p>
                    {po.fotoReferensiUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={po.fotoReferensiUrl} alt="Referensi" className="mt-2 max-h-40 rounded-lg object-contain" />
                    )}
                    {po.status === "MENUNGGU_REVIEW" ? (
                      <div className="mt-3 grid gap-2 md:grid-cols-2">
                        <Field label="Harga per Unit (IDR)">
                          <Input value={harga} onChange={(e) => setHarga(e.target.value)} inputMode="numeric" placeholder="450000" />
                        </Field>
                        <Field label="Estimasi Ongkir (IDR)">
                          <Input value={ongkir} onChange={(e) => setOngkir(e.target.value)} inputMode="numeric" placeholder="150000" />
                        </Field>
                        <div className="md:col-span-2">
                          <Field label="Catatan untuk Customer (min 20 karakter untuk penawaran)">
                            <Textarea value={catatan} onChange={(e) => setCatatan(e.target.value)} />
                          </Field>
                        </div>
                        <div className="flex gap-2 md:col-span-2">
                          <Button varian="danger" className="flex-1" disabled={kerja} onClick={() => kirim(po.id, false)}>
                            Tolak PO
                          </Button>
                          <Button className="flex-1" disabled={kerja} onClick={() => kirim(po.id, true)}>
                            Kirim Penawaran
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-2 text-ink-muda">
                        <p>Harga: {po.estimasiHarga ? rupiah(po.estimasiHarga) : "-"} — Ongkir: {po.estimasiOngkir ? rupiah(po.estimasiOngkir) : "-"}</p>
                        {po.catatanAdmin && <p>Catatan: {po.catatanAdmin}</p>}
                      </div>
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
