"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { AdminShell } from "@/components/layout/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Select, Textarea } from "@/components/ui/input";
import { SkeletonBar, EmptyState } from "@/components/ui/feedback";
import { toast } from "@/components/ui/toaster";
import { useRequireAdmin } from "@/components/auth-guard";
import type { AdminKomplain } from "@/lib/types-admin";

const STATUS = ["", "DIAJUKAN", "DIPROSES", "SELESAI"];
const SOLUSI = ["KIRIM_ULANG", "REFUND_SEBAGIAN", "REFUND_PENUH", "DITOLAK"];

export default function AdminKomplainPage() {
  const { user, isLoading } = useRequireAdmin();
  const [items, setItems] = useState<AdminKomplain[]>([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [memuat, setMemuat] = useState(true);
  const [bukaId, setBukaId] = useState<string | null>(null);
  const [catatan, setCatatan] = useState("");
  const [statusBaru, setStatusBaru] = useState("DIPROSES");
  const [solusi, setSolusi] = useState("");
  const [kerja, setKerja] = useState(false);

  const ambil = useCallback(async () => {
    setMemuat(true);
    try {
      const q = new URLSearchParams({ limit: "10", page: String(page) });
      if (status) q.set("status", status);
      const res = await api<{ items: AdminKomplain[]; total: number }>(`/api/admin/komplain?${q}`);
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

  const kirim = async (id: string) => {
    if (!catatan.trim()) {
      toast("Catatan tindak lanjut wajib diisi", "error");
      return;
    }
    if (statusBaru === "SELESAI" && !solusi) {
      toast("Solusi wajib diisi kalau komplain ditutup", "error");
      return;
    }
    setKerja(true);
    try {
      await api(`/api/admin/komplain/${id}`, {
        method: "PATCH",
        body: { status: statusBaru, catatan, ...(solusi ? { solusi } : {}) },
      });
      toast("Tanggapan dikirim. Customer dikabarin.", "sukses");
      setBukaId(null);
      setCatatan("");
      setSolusi("");
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
      <h1 className="mb-4 text-2xl font-bold">Kelola Komplain</h1>
      <div className="mb-3 md:w-64">
        <Field label="Status">
          <Select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
            <option value="">Belum Selesai (default)</option>
            {STATUS.slice(1).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </Select>
        </Field>
      </div>

      {memuat || isLoading || !user ? (
        <div className="flex flex-col gap-2"><SkeletonBar /><SkeletonBar /></div>
      ) : items.length === 0 ? (
        <EmptyState judul="Belum ada komplain. Mantap!" deskripsi="Tidak ada komplain untuk filter ini." />
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {items.map((k) => (
              <Card key={k.id} className="p-4">
                <button
                  onClick={() => setBukaId(bukaId === k.id ? null : k.id)}
                  className="flex w-full items-center justify-between gap-2 text-left"
                >
                  <div>
                    <p className="text-sm font-semibold">
                      {k.pesananItem.namaItemSnapshot} — {k.alasan.replace(/_/g, " ")}
                    </p>
                    <p className="text-xs text-ink-muda">
                      {k.pesananItem.pesanan.noInvoice} — {k.pesananItem.pesanan.customer.nama}
                    </p>
                  </div>
                  <Badge status={k.status} />
                </button>

                {bukaId === k.id && (
                  <div className="mt-3 border-t border-garis pt-3 text-sm">
                    {k.deskripsi && <p className="whitespace-pre-line">{k.deskripsi}</p>}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={k.buktiFoto} alt="Bukti komplain" className="mt-2 max-h-48 rounded-lg object-contain" />
                    {k.log.length > 0 && (
                      <div className="mt-2 border-t border-garis pt-2">
                        <p className="font-semibold">Riwayat</p>
                        {k.log.map((l) => (
                          <p key={l.id} className="text-ink-muda">
                            {l.catatan} <span className="text-xs">({l.admin.nama})</span>
                          </p>
                        ))}
                      </div>
                    )}
                    {k.status !== "SELESAI" ? (
                      <div className="mt-3 flex flex-col gap-2">
                        <Field label="Tanggapan untuk Customer (wajib)">
                          <Textarea value={catatan} onChange={(e) => setCatatan(e.target.value)} />
                        </Field>
                        <div className="grid grid-cols-2 gap-2">
                          <Field label="Status">
                            <Select value={statusBaru} onChange={(e) => setStatusBaru(e.target.value)}>
                              <option value="DIPROSES">Diproses</option>
                              <option value="SELESAI">Selesai</option>
                            </Select>
                          </Field>
                          <Field label="Solusi (wajib kalau Selesai)">
                            <Select value={solusi} onChange={(e) => setSolusi(e.target.value)}>
                              <option value="">Pilih solusi</option>
                              {SOLUSI.map((s) => (
                                <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
                              ))}
                            </Select>
                          </Field>
                        </div>
                        <Button disabled={kerja} onClick={() => kirim(k.id)}>
                          Kirim Tanggapan
                        </Button>
                      </div>
                    ) : (
                      <p className="mt-2 text-ink-muda">Sudah ditutup — solusi: {k.solusi?.replace(/_/g, " ")}</p>
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
