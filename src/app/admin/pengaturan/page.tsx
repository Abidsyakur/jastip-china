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
import type { Rekening } from "@/lib/types";

type RekeningAdmin = Rekening & { aktif: boolean };

export default function AdminPengaturanPage() {
  const { user, isLoading } = useRequireAdmin();
  const [items, setItems] = useState<RekeningAdmin[]>([]);
  const [bank, setBank] = useState("");
  const [noRekening, setNoRekening] = useState("");
  const [atasNama, setAtasNama] = useState("PT Jastip China");
  const [siap, setSiap] = useState(false);
  const [kerja, setKerja] = useState(false);

  const ambil = async () => {
    const res = await api<{ items: RekeningAdmin[] }>("/api/admin/rekening");
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
    if (!bank.trim() || !noRekening.trim() || !atasNama.trim()) {
      toast("Lengkapi bank, nomor, dan atas nama", "error");
      return;
    }
    setKerja(true);
    try {
      await api("/api/admin/rekening", {
        method: "POST",
        body: { bank: bank.trim(), noRekening: noRekening.trim(), atasNama: atasNama.trim() },
      });
      setBank("");
      setNoRekening("");
      toast("Rekening disimpan", "sukses");
      await ambil();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal", "error");
    } finally {
      setKerja(false);
    }
  };

  const toggleAktif = async (r: RekeningAdmin) => {
    try {
      await api(`/api/admin/rekening/${r.id}`, { method: "PATCH", body: { aktif: !r.aktif } });
      toast(r.aktif ? "Rekening dinonaktifkan" : "Rekening diaktifkan", "sukses");
      await ambil();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal", "error");
    }
  };

  const hapus = async (id: string) => {
    if (!confirm("Hapus rekening ini? Customer tidak bisa lihat rekening ini buat transfer.")) return;
    try {
      await api(`/api/admin/rekening/${id}`, { method: "DELETE" });
      toast("Rekening dihapus", "sukses");
      await ambil();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal", "error");
    }
  };

  return (
    <AdminShell>
      <h1 className="mb-4 text-2xl font-bold">Pengaturan Umum</h1>

      <Card className="p-4">
        <p className="mb-1 font-display font-bold">Rekening Bank</p>
        <p className="mb-3 text-sm text-ink-muda">Dipakai customer buat transfer pembayaran. Minimal 1 rekening harus ada.</p>
        {!siap || isLoading || !user ? (
          <SkeletonBar />
        ) : (
          <div className="flex flex-col gap-2">
            {items.map((r) => (
              <div key={r.id} className="flex items-center justify-between rounded-lg border border-garis p-3 text-sm">
                <div>
                  <p className="font-semibold">{r.bank}</p>
                  <p className="font-mono">{r.noRekening}</p>
                  <p className="text-xs text-ink-muda">{r.atasNama}</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => toggleAktif(r)} className="text-brand underline">
                    Aktif/Nonaktif
                  </button>
                  <button onClick={() => hapus(r.id)} className="text-merah-muda underline">
                    Hapus
                  </button>
                </div>
              </div>
            ))}
            <div className="grid gap-2 rounded-lg bg-krim/50 p-3 md:grid-cols-3">
              <Field label="Bank">
                <Input value={bank} onChange={(e) => setBank(e.target.value)} placeholder="BCA" />
              </Field>
              <Field label="No. Rekening">
                <Input value={noRekening} onChange={(e) => setNoRekening(e.target.value)} placeholder="1234567890" />
              </Field>
              <Field label="Atas Nama">
                <Input value={atasNama} onChange={(e) => setAtasNama(e.target.value)} />
              </Field>
              <div className="md:col-span-3">
                <Button ukuran="sm" disabled={kerja} onClick={tambah}>+ Tambah Rekening</Button>
              </div>
            </div>
          </div>
        )}
      </Card>

      <Card className="mt-4 p-4 text-sm">
        <p className="mb-1 font-display font-bold">Info Kontak & Brand</p>
        <p>WhatsApp Admin: 0812-0000-0000</p>
        <p>Email CS: hello@jastipchina.id</p>
        <p className="text-ink-muda">Jam: Senin-Sabtu, 09.00-18.00 WIB</p>
        <div className="my-2 h-px bg-garis" />
        <p>Jasa Titip: 35% (min Rp15.000) — tetap, tidak bisa diubah dari panel.</p>
      </Card>
    </AdminShell>
  );
}
