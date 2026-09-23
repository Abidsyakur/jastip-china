"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import { SiteHeader, SiteFooter } from "@/components/layout/site";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/input";
import { SkeletonBar } from "@/components/ui/feedback";
import { toast } from "@/components/ui/toaster";
import { AddressForm } from "@/components/address-form";
import { useAuth } from "@/contexts/auth-context";
import { useRequireCustomer } from "@/components/auth-guard";
import type { Alamat } from "@/lib/types";

interface Profil {
  nama: string;
  noWa: string;
  email: string | null;
  tglRegistrasi: string;
}

export default function AkunPage() {
  const { user, isLoading, logout } = useAuth();
  useRequireCustomer();
  const router = useRouter();
  const [profil, setProfil] = useState<Profil | null>(null);
  const [alamat, setAlamat] = useState<Alamat[]>([]);
  const [editNama, setEditNama] = useState(false);
  const [namaBaru, setNamaBaru] = useState("");
  const [tambahAlamat, setTambahAlamat] = useState(false);

  const ambil = useCallback(async () => {
    const [p, a] = await Promise.all([
      api<{ customer: Profil }>("/api/auth/profil"),
      api<{ items: Alamat[] }>("/api/alamat"),
    ]);
    setProfil(p.customer);
    setNamaBaru(p.customer.nama);
    setAlamat(a.items);
  }, []);

  useEffect(() => {
    if (!isLoading && user) ambil().catch((err) => toast(err.message, "error"));
  }, [isLoading, user, ambil]);

  const simpanNama = async () => {
    try {
      const res = await api<{ customer: Profil }>("/api/auth/profil", {
        method: "PATCH",
        body: { nama: namaBaru },
      });
      setProfil(res.customer);
      setEditNama(false);
      toast("Profil diperbarui", "sukses");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal", "error");
    }
  };

  const hapusAlamat = async (id: string) => {
    if (!confirm("Hapus alamat ini?")) return;
    try {
      await api(`/api/alamat/${id}`, { method: "DELETE" });
      setAlamat((l) => l.filter((a) => a.id !== id));
      toast("Alamat dihapus", "sukses");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal", "error");
    }
  };

  const keluar = async () => {
    if (!confirm("Yakin mau logout?")) return;
    await logout();
    router.push("/");
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <main className="mx-auto max-w-3xl px-4 py-6"><SkeletonBar /></main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-6 pb-24 md:pb-12">
        <h1 className="mb-4 text-2xl font-bold md:text-3xl">Akun Saya</h1>

        <Card className="p-4">
          <p className="mb-2 font-display text-lg font-bold">Informasi Pribadi</p>
          {profil ? (
            <div className="text-sm">
              {editNama ? (
                <div className="flex gap-2">
                  <Input value={namaBaru} onChange={(e) => setNamaBaru(e.target.value)} />
                  <Button ukuran="sm" onClick={simpanNama}>Simpan</Button>
                  <Button ukuran="sm" varian="secondary" onClick={() => setEditNama(false)}>Batal</Button>
                </div>
              ) : (
                <p>
                  <span className="font-semibold">{profil.nama}</span>{" "}
                  <button onClick={() => setEditNama(true)} className="text-xs text-brand underline">
                    Edit
                  </button>
                </p>
              )}
              <p className="mt-1 text-ink-muda">{profil.noWa}</p>
              <p className="text-ink-muda">{profil.email ?? "Belum ada email"}</p>
            </div>
          ) : (
            <SkeletonBar />
          )}
          <div className="mt-3 flex gap-4 border-t border-garis pt-3 text-sm">
            <Link href="/pesanan" className="font-medium text-brand">Pesanan Saya</Link>
            <Link href="/riwayat-komplain" className="font-medium text-brand">Riwayat Komplain</Link>
            <Link href="/bantuan" className="font-medium text-brand">Bantuan</Link>
          </div>
        </Card>

        <Card className="mt-4 p-4">
          <p className="mb-2 font-display text-lg font-bold">Alamat Tersimpan</p>
          <div className="flex flex-col gap-2">
            {alamat.map((a) => (
              <div key={a.id} className="rounded-lg border border-garis p-3 text-sm">
                <p className="font-semibold">{a.label} — {a.penerima}</p>
                <p className="text-ink-muda">
                  {a.alamatLengkap}, {a.kota} {a.kodePos}
                </p>
                <button onClick={() => hapusAlamat(a.id)} className="mt-1 text-xs text-merah-muda">
                  Hapus
                </button>
              </div>
            ))}
            {alamat.length === 0 && <p className="text-sm text-ink-muda">Belum ada alamat. Tambah dulu biar checkout lebih cepat.</p>}
            <button
              onClick={() => setTambahAlamat((v) => !v)}
              className="rounded-lg border border-dashed border-garis p-3 text-sm text-brand"
            >
              + Tambah Alamat Baru
            </button>
            {tambahAlamat && (
              <AddressForm
                onSimpan={(a) => {
                  setAlamat((l) => [a, ...l]);
                  setTambahAlamat(false);
                  toast("Alamat baru tersimpan", "sukses");
                }}
                onBatal={() => setTambahAlamat(false)}
              />
            )}
          </div>
        </Card>

        <Button varian="secondary" penuh className="mt-4" onClick={keluar}>
          Logout
        </Button>
      </main>
      <SiteFooter />
      <BottomNav />
    </div>
  );
}
