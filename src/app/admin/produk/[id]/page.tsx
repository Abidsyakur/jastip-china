"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import { rupiah } from "@/lib/format";
import { AdminShell } from "@/components/layout/admin-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input, Textarea, Select } from "@/components/ui/input";
import { SkeletonBar } from "@/components/ui/feedback";
import { toast } from "@/components/ui/toaster";
import { unggahGambar } from "@/lib/upload";
import { useRequireAdmin } from "@/components/auth-guard";

interface Kategori {
  id: string;
  namaKategori: string;
}

interface VarianRow {
  namaVarian: string;
  stok: number;
  hargaTambahan: number;
}

// Form tambah/edit produk. Varian FLAT (1 baris = 1 kombinasi) + REPLACE total
// saat simpan (bukan patch per-item) — ikut semantik backend PATCH.
export default function AdminProdukFormPage() {
  const { id } = useParams<{ id: string | string[] }>();
  const segmen = Array.isArray(id) ? id[0] : id;
  const modeBaru = segmen === "baru";
  const produkId = segmen;
  const router = useRouter();
  const { user, isLoading } = useRequireAdmin();

  const [kategori, setKategori] = useState<Kategori[]>([]);
  const [nama, setNama] = useState("");
  const [kategoriId, setKategoriId] = useState("");
  const [linkSumber, setLinkSumber] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [rmb, setRmb] = useState("");
  const [kurs, setKurs] = useState("");
  const [kursAktif, setKursAktif] = useState<number | null>(null);
  const [hargaOverride, setHargaOverride] = useState("");
  const [berat, setBerat] = useState("");
  const [stok, setStok] = useState("0");
  const [status, setStatus] = useState("AKTIF");
  const [gambar, setGambar] = useState<string[]>([]);
  const [varian, setVarian] = useState<VarianRow[]>([]);
  const [siap, setSiap] = useState(false);
  const [kirim, setKirim] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isLoading || !user) return;
    (async () => {
      try {
        const [k, kursRes] = await Promise.all([
          api<{ items: Kategori[] }>("/api/kategori"),
          api<{ kurs: { kursRmbIdr: number | string } }>("/api/admin/kurs-master/aktif").catch(() => null),
        ]);
        setKategori(k.items);
        if (kursRes) setKursAktif(Number(kursRes.kurs.kursRmbIdr));
        if (!modeBaru) {
          const p = await api<{ produk: {
            namaProduk: string; kategoriId: string; linkSumber: string; deskripsi: string | null;
            hargaAsalRmb: number | string; kurs: number | string; beratGram: number; stok: number;
            status: string; gambar: { urlGambar: string }[]; varian: { namaVarian: string; stok: number; hargaTambahan: number | string }[];
          } }>(`/api/admin/produk/${produkId}`);
          const d = p.produk;
          setNama(d.namaProduk);
          setKategoriId(d.kategoriId);
          setLinkSumber(d.linkSumber);
          setDeskripsi(d.deskripsi ?? "");
          setRmb(String(d.hargaAsalRmb));
          setKurs(String(d.kurs));
          setBerat(String(d.beratGram));
          setStok(String(d.stok));
          setStatus(d.status);
          setGambar(d.gambar.map((g) => g.urlGambar));
          setVarian(d.varian.map((v) => ({ namaVarian: v.namaVarian, stok: v.stok, hargaTambahan: Number(v.hargaTambahan) })));
        } else if (k.items[0]) {
          setKategoriId(k.items[0].id);
        }
      } catch (err) {
        toast(err instanceof Error ? err.message : "Gagal", "error");
      } finally {
        setSiap(true);
      }
    })();
  }, [isLoading, user, produkId, modeBaru]);

  const kursEfektif = kurs ? Number(kurs) : kursAktif;
  const previewOtomatis = rmb && kursEfektif ? Math.round(Number(rmb) * kursEfektif) : null;

  const tambahGambar = async (files: FileList | null) => {
    if (!files) return;
    if (gambar.length + files.length > 10) {
      toast("Maksimal 10 foto produk", "error");
      return;
    }
    try {
      const urls: string[] = [];
      for (const f of Array.from(files)) {
        urls.push(await unggahGambar(f, "produk"));
      }
      setGambar((g) => [...g, ...urls]);
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal upload", "error");
    }
  };

  const simpan = async () => {
    if (!nama.trim() || !kategoriId || !rmb || !berat || !linkSumber) {
      toast("Lengkapi nama, kategori, harga RMB, berat, dan link sumber", "error");
      return;
    }
    if (!/^https?:\/\//i.test(linkSumber.trim())) {
      toast("Link sumber harus URL lengkap dengan http:// atau https://", "error");
      return;
    }
    if (Number(berat) <= 0) {
      toast("Berat harus lebih dari 0 gram", "error");
      return;
    }
    if (Number(rmb) <= 0) {
      toast("Harga RMB harus lebih dari 0", "error");
      return;
    }
    if (Number(stok) < 0) {
      toast("Stok tidak boleh negatif", "error");
      return;
    }
    const varianValid = varian.filter((v) => v.namaVarian.trim().length > 0);
    if (varian.length > 0 && varianValid.length !== varian.length) {
      toast("Ada varian tanpa nama — isi nama atau hapus barisnya", "error");
      return;
    }
    if (gambar.length === 0) {
      toast("Minimal 1 foto produk", "error");
      return;
    }
    setKirim(true);
    try {
      const body: Record<string, unknown> = {
        namaProduk: nama.trim(),
        kategoriId,
        linkSumber: linkSumber.trim(),
        deskripsi: deskripsi.trim() || undefined,
        hargaAsalRmb: Number(rmb),
        ...(kurs ? { kurs: Number(kurs) } : {}),
        ...(hargaOverride ? { hargaJualIdr: Number(hargaOverride) } : {}),
        beratGram: Number(berat),
        stok: Number(stok),
        status,
        gambarUrls: gambar,
        varian: varianValid.map((v) => ({
          namaVarian: v.namaVarian.trim(),
          stok: v.stok,
          hargaTambahan: v.hargaTambahan,
        })),
      };
      if (modeBaru) {
        await api("/api/admin/produk", { method: "POST", body });
        toast("Produk baru ditambahkan", "sukses");
      } else {
        await api(`/api/admin/produk/${produkId}`, { method: "PATCH", body });
        toast("Produk berhasil disimpan", "sukses");
      }
      router.push("/admin/produk");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal", "error");
    } finally {
      setKirim(false);
    }
  };

  if (isLoading || !user || !siap) {
    return (
      <AdminShell>
        <SkeletonBar />
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <h1 className="mb-4 text-2xl font-bold">{modeBaru ? "Tambah Produk Baru" : "Edit Produk"}</h1>

      <Card className="p-4">
        <p className="mb-3 font-display font-bold">Informasi Dasar</p>
        <div className="flex flex-col gap-3">
          <Field label="Nama Produk">
            <Input value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Tas Backpack Premium" />
          </Field>
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Kategori">
              <Select value={kategoriId} onChange={(e) => setKategoriId(e.target.value)}>
                {kategori.map((k) => (
                  <option key={k.id} value={k.id}>{k.namaKategori}</option>
                ))}
              </Select>
            </Field>
            <Field label="Status">
              <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="AKTIF">AKTIF (tampil di katalog)</option>
                <option value="NONAKTIF">NONAKTIF (disembunyikan)</option>
              </Select>
            </Field>
          </div>
          <Field label="Link Sumber">
            <Input value={linkSumber} onChange={(e) => setLinkSumber(e.target.value)} placeholder="https://taobao.com/..." />
          </Field>
          <Field label="Deskripsi">
            <Textarea value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
          </Field>
          <div className="grid gap-3 md:grid-cols-3">
            <Field label="Harga Asal (RMB)" bantu={kursAktif ? `Kurs aktif 1 RMB = Rp ${kursAktif}` : undefined}>
              <Input value={rmb} onChange={(e) => setRmb(e.target.value)} inputMode="decimal" placeholder="120" />
            </Field>
            <Field label="Kurs (opsional)" bantu="Kosongkan = pakai kurs aktif">
              <Input value={kurs} onChange={(e) => setKurs(e.target.value)} inputMode="decimal" placeholder={kursAktif ? String(kursAktif) : ""} />
            </Field>
            <Field label="Harga Jual IDR (opsional)" bantu={previewOtomatis !== null ? `Otomatis: ${rupiah(previewOtomatis)}` : "Isi manual untuk override"}>
              <Input value={hargaOverride} onChange={(e) => setHargaOverride(e.target.value)} inputMode="numeric" placeholder="" />
            </Field>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Berat (gram)">
              <Input value={berat} onChange={(e) => setBerat(e.target.value)} inputMode="decimal" placeholder="800" />
            </Field>
            <Field label="Stok">
              <Input value={stok} onChange={(e) => setStok(e.target.value)} inputMode="numeric" />
            </Field>
          </div>
        </div>
      </Card>

      <Card className="mt-4 p-4">
        <p className="mb-2 font-display font-bold">Gambar Produk (maks 10, gambar pertama = utama)</p>
        <div className="flex flex-wrap gap-2">
          {gambar.map((g, i) => (
            <div key={g} className="relative h-20 w-20 overflow-hidden rounded-lg bg-krim">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={g} alt="" className="h-full w-full object-cover" />
              {i === 0 && <span className="absolute left-0 top-0 bg-gold px-1 text-[10px] text-white">Utama</span>}
              <button
                onClick={() => setGambar((l) => l.filter((x) => x !== g))}
                className="absolute right-0 top-0 bg-ink/70 px-1 text-xs text-white"
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={() => fileRef.current?.click()}
            className="flex h-20 w-20 items-center justify-center rounded-lg border border-dashed border-garis text-2xl text-ink-muda"
          >
            +
          </button>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={(e) => {
            void tambahGambar(e.target.files);
            e.target.value = "";
          }}
        />
      </Card>

      <Card className="mt-4 p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="font-display font-bold">Varian (flat, 1 baris = 1 kombinasi)</p>
          <Button ukuran="sm" varian="secondary" onClick={() => setVarian((v) => [...v, { namaVarian: "", stok: 0, hargaTambahan: 0 }])}>
            + Tambah Varian
          </Button>
        </div>
        <p className="mb-2 text-xs text-ink-muda">Simpan mengganti seluruh daftar varian, bukan per item.</p>
        <div className="flex flex-col gap-2">
          {varian.map((v, i) => (
            <div key={i} className="grid grid-cols-[1fr_70px_90px_auto] items-center gap-2">
              <Input
                value={v.namaVarian}
                onChange={(e) => setVarian((l) => l.map((x, j) => (j === i ? { ...x, namaVarian: e.target.value } : x)))}
                placeholder="Hitam Standar"
              />
              <Input
                value={v.stok} inputMode="numeric"
                onChange={(e) => setVarian((l) => l.map((x, j) => (j === i ? { ...x, stok: Number(e.target.value) || 0 } : x)))}
                placeholder="Stok"
              />
              <Input
                value={v.hargaTambahan} inputMode="numeric"
                onChange={(e) => setVarian((l) => l.map((x, j) => (j === i ? { ...x, hargaTambahan: Number(e.target.value) || 0 } : x)))}
                placeholder="+Rp"
              />
              <button onClick={() => setVarian((l) => l.filter((_, j) => j !== i))} className="text-sm text-merah-muda">
                Hapus
              </button>
            </div>
          ))}
          {varian.length === 0 && <p className="text-sm text-ink-muda">Tanpa varian — stok pakai stok produk.</p>}
        </div>
      </Card>

      <div className="mt-4 flex gap-2">
        <Button varian="secondary" className="flex-1" onClick={() => router.push("/admin/produk")}>
          Batal
        </Button>
        <Button memuat={kirim} className="flex-1" onClick={simpan}>
          Simpan Produk
        </Button>
      </div>
    </AdminShell>
  );
}
