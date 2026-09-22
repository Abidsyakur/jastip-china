"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api-client";
import { rupiah } from "@/lib/format";
import { AdminShell } from "@/components/layout/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, Input, Select } from "@/components/ui/input";
import { SkeletonBar, EmptyState } from "@/components/ui/feedback";
import { toast } from "@/components/ui/toaster";
import { useRequireAdmin } from "@/components/auth-guard";

interface ProdukRow {
  id: string;
  namaProduk: string;
  hargaJualIdr: number | string;
  stok: number;
  status: string;
  kategori: { namaKategori: string };
}

interface Kategori {
  id: string;
  namaKategori: string;
}

export default function AdminProdukPage() {
  const { user, isLoading } = useRequireAdmin();
  const [items, setItems] = useState<ProdukRow[]>([]);
  const [total, setTotal] = useState(0);
  const [kategori, setKategori] = useState<Kategori[]>([]);
  const [kategoriId, setKategoriId] = useState("");
  const [cari, setCari] = useState("");
  const [page, setPage] = useState(1);
  const [memuat, setMemuat] = useState(true);

  const ambil = useCallback(async () => {
    setMemuat(true);
    try {
      const q = new URLSearchParams({ limit: "10", page: String(page) });
      if (kategoriId) q.set("kategoriId", kategoriId);
      if (cari) q.set("cari", cari);
      const [p, k] = await Promise.all([
        api<{ items: ProdukRow[]; total: number }>(`/api/admin/produk?${q}`),
        api<{ items: Kategori[] }>("/api/kategori").catch(() => ({ items: [] as Kategori[] })),
      ]);
      setItems(p.items);
      setTotal(p.total);
      setKategori(k.items);
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal", "error");
    } finally {
      setMemuat(false);
    }
  }, [kategoriId, page, cari]);

  useEffect(() => {
    if (!isLoading && user) void ambil();
  }, [isLoading, user, ambil]);

  const hapus = async (id: string, nama: string) => {
    if (!confirm(`Nonaktifkan produk "${nama}"? (soft delete — riwayat pesanan tetap utuh)`)) return;
    try {
      await api(`/api/admin/produk/${id}`, { method: "DELETE" });
      toast("Produk dinonaktifkan", "sukses");
      await ambil();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal", "error");
    }
  };

  const halamanTerakhir = Math.max(1, Math.ceil(total / 10));

  return (
    <AdminShell>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Kelola Produk</h1>
        <Link href="/admin/produk/baru"><Button ukuran="sm">+ Tambah Produk</Button></Link>
      </div>

      <form
        className="mb-3 flex flex-col gap-2 md:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          setPage(1);
          void ambil();
        }}
      >
        <div className="flex-1">
          <Field label="Cari produk">
            <Input value={cari} onChange={(e) => setCari(e.target.value)} placeholder="Nama produk..." />
          </Field>
        </div>
        <div className="md:w-52">
          <Field label="Kategori">
            <Select value={kategoriId} onChange={(e) => { setKategoriId(e.target.value); setPage(1); }}>
              <option value="">Semua</option>
              {kategori.map((k) => (
                <option key={k.id} value={k.id}>{k.namaKategori}</option>
              ))}
            </Select>
          </Field>
        </div>
        <div className="flex items-end">
          <Button type="submit" ukuran="sm" varian="secondary">Cari</Button>
        </div>
      </form>

      {memuat || isLoading || !user ? (
        <div className="flex flex-col gap-2"><SkeletonBar /><SkeletonBar /></div>
      ) : items.length === 0 ? (
        <EmptyState judul="Belum ada produk" deskripsi="Tambah produk pertama kamu." />
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl border border-garis bg-white">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead>
                <tr className="border-b border-garis text-xs text-ink-muda">
                  <th className="p-3">Produk</th>
                  <th className="p-3">Kategori</th>
                  <th className="p-3">Harga</th>
                  <th className="p-3">Stok</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {items.map((p) => (
                  <tr key={p.id} className="border-b border-garis last:border-0 hover:bg-krim/50">
                    <td className="p-3 font-medium">{p.namaProduk}</td>
                    <td className="p-3">{p.kategori.namaKategori}</td>
                    <td className="p-3">{rupiah(p.hargaJualIdr)}</td>
                    <td className="p-3">{p.stok}</td>
                    <td className="p-3"><Badge status={p.status} /></td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Link href={`/admin/produk/${p.id}`} className="text-brand underline">Edit</Link>
                        <button onClick={() => hapus(p.id, p.namaProduk)} className="text-merah-muda underline">
                          Hapus
                        </button>
                      </div>
                    </td>
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
