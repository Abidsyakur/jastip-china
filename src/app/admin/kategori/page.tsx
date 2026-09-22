"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { AdminShell } from "@/components/layout/admin-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/input";
import { SkeletonBar } from "@/components/ui/feedback";
import { toast } from "@/components/ui/toaster";
import { useRequireAdmin } from "@/components/auth-guard";

interface Kategori {
  id: string;
  namaKategori: string;
}

export default function AdminKategoriPage() {
  const { user, isLoading } = useRequireAdmin();
  const [items, setItems] = useState<Kategori[]>([]);
  const [nama, setNama] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editNama, setEditNama] = useState("");
  const [siap, setSiap] = useState(false);
  const [kerja, setKerja] = useState(false);

  const ambil = async () => {
    const res = await api<{ items: Kategori[] }>("/api/kategori");
    setItems(res.items);
  };

  useEffect(() => {
    if (!isLoading && user) {
      ambil()
        .catch((err) => toast(err.message, "error"))
        .finally(() => setSiap(true));
    }
  }, [isLoading, user]);

  const tambah = async () => {
    if (nama.trim().length < 2) {
      toast("Nama minimal 2 karakter", "error");
      return;
    }
    setKerja(true);
    try {
      await api("/api/admin/kategori", { method: "POST", body: { namaKategori: nama.trim() } });
      setNama("");
      toast("Kategori baru ditambahkan", "sukses");
      await ambil();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal", "error");
    } finally {
      setKerja(false);
    }
  };

  const simpanEdit = async () => {
    if (!editId || editNama.trim().length < 2) {
      toast("Nama minimal 2 karakter", "error");
      return;
    }
    setKerja(true);
    try {
      await api(`/api/admin/kategori/${editId}`, { method: "PATCH", body: { namaKategori: editNama.trim() } });
      setEditId(null);
      toast("Kategori disimpan", "sukses");
      await ambil();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal", "error");
    } finally {
      setKerja(false);
    }
  };

  const hapus = async (id: string, namaKategori: string) => {
    if (!confirm(`Hapus kategori "${namaKategori}"? Kategori yang dipakai produk tidak bisa dihapus.`)) return;
    try {
      await api(`/api/admin/kategori/${id}`, { method: "DELETE" });
      toast("Kategori dihapus", "sukses");
      await ambil();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal", "error");
    }
  };

  return (
    <AdminShell>
      <h1 className="mb-4 text-2xl font-bold">Kelola Kategori</h1>
      <Card className="p-4">
        <p className="text-sm text-ink-muda">Kategori yang dipakai produk tidak bisa dihapus.</p>
        <div className="mt-2 flex gap-2">
          <div className="flex-1">
            <Field label="Tambah Kategori">
              <Input value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Contoh: Tas" />
            </Field>
          </div>
          <div className="flex items-end">
            <Button ukuran="sm" disabled={kerja} onClick={tambah}>Tambah</Button>
          </div>
        </div>
      </Card>

      <Card className="mt-4 divide-y divide-garis">
        {!siap || isLoading || !user ? (
          <div className="p-4"><SkeletonBar /></div>
        ) : (
          items.map((k) => (
            <div key={k.id} className="flex items-center justify-between gap-2 p-3">
              {editId === k.id ? (
                <div className="flex flex-1 gap-2">
                  <div className="flex-1">
                    <Input value={editNama} onChange={(e) => setEditNama(e.target.value)} />
                  </div>
                  <Button ukuran="sm" disabled={kerja} onClick={simpanEdit}>Simpan</Button>
                  <Button ukuran="sm" varian="secondary" onClick={() => setEditId(null)}>Batal</Button>
                </div>
              ) : (
                <>
                  <span className="font-medium">{k.namaKategori}</span>
                  <div className="flex gap-3 text-sm">
                    <button
                      onClick={() => { setEditId(k.id); setEditNama(k.namaKategori); }}
                      className="text-brand underline"
                    >
                      Edit
                    </button>
                    <button onClick={() => hapus(k.id, k.namaKategori)} className="text-merah-muda underline">
                      Hapus
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </Card>
    </AdminShell>
  );
}
