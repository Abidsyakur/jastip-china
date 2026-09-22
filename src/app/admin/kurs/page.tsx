"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { rupiah, formatTanggalWaktu } from "@/lib/format";
import { AdminShell } from "@/components/layout/admin-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/input";
import { SkeletonBar } from "@/components/ui/feedback";
import { toast } from "@/components/ui/toaster";
import { useRequireAdmin } from "@/components/auth-guard";
import type { KursMaster } from "@/lib/types-admin";

export default function AdminKursPage() {
  const { user, isLoading } = useRequireAdmin();
  const [aktif, setAktif] = useState<KursMaster | null>(null);
  const [riwayat, setRiwayat] = useState<KursMaster[]>([]);
  const [baru, setBaru] = useState("");
  const [siap, setSiap] = useState(false);
  const [kerja, setKerja] = useState(false);

  const ambil = async () => {
    const [a, r] = await Promise.all([
      api<{ kurs: KursMaster }>("/api/admin/kurs-master/aktif").catch(() => null),
      api<{ items: KursMaster[] }>("/api/admin/kurs-master").catch(() => ({ items: [] as KursMaster[] })),
    ]);
    if (a) setAktif(a.kurs);
    setRiwayat(r.items);
  };

  useEffect(() => {
    if (!isLoading && user) {
      ambil()
        .catch((err) => toast(err.message, "error"))
        .finally(() => setSiap(true));
    }
  }, [isLoading, user]);

  const simpan = async () => {
    const nilai = Number(baru);
    if (!nilai || nilai <= 0) {
      toast("Kurs minimal 1", "error");
      return;
    }
    setKerja(true);
    try {
      await api("/api/admin/kurs-master", { method: "POST", body: { kursRmbIdr: nilai } });
      setBaru("");
      toast("Kurs berhasil diupdate. Harga produk otomatis mengikuti.", "sukses");
      await ambil();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal", "error");
    } finally {
      setKerja(false);
    }
  };

  return (
    <AdminShell>
      <h1 className="mb-4 text-2xl font-bold">Pengaturan Kurs</h1>

      <Card className="p-4 text-center">
        <p className="text-sm text-ink-muda">Kurs Saat Ini</p>
        {!siap || isLoading || !user ? (
          <SkeletonBar />
        ) : aktif ? (
          <>
            <p className="font-display text-4xl font-bold text-gold">1 RMB = {rupiah(aktif.kursRmbIdr)}</p>
            <p className="mt-1 text-xs text-ink-muda">Update: {formatTanggalWaktu(aktif.dibuatPada)}</p>
          </>
        ) : (
          <p className="text-sm text-ink-muda">Belum ada kurs. Isi pertama di bawah.</p>
        )}
      </Card>

      <Card className="mt-4 p-4">
        <p className="mb-2 font-display font-bold">Update Kurs</p>
        <div className="flex gap-2">
          <div className="flex-1">
            <Field label="Kurs RMB ke IDR">
              <Input value={baru} onChange={(e) => setBaru(e.target.value)} inputMode="decimal" placeholder="2450" />
            </Field>
          </div>
          <div className="flex items-end">
            <Button disabled={kerja} onClick={simpan}>Simpan Kurs Baru</Button>
          </div>
        </div>
        <p className="mt-2 text-xs text-ink-muda">Selalu bikin baris baru (append-only). Harga produk otomatis ikut kurs baru.</p>
      </Card>

      <Card className="mt-4 p-4">
        <p className="mb-2 font-display font-bold">Riwayat Kurs</p>
        {riwayat.length === 0 ? (
          <p className="text-sm text-ink-muda">Belum ada riwayat kurs.</p>
        ) : (
          <div className="flex flex-col divide-y divide-garis text-sm">
            {riwayat.map((k) => (
              <div key={k.id} className="flex justify-between py-2">
                <span>{formatTanggalWaktu(k.dibuatPada)}</span>
                <span className="font-medium">{rupiah(k.kursRmbIdr)}</span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </AdminShell>
  );
}
