"use client";

import { useRef, useState } from "react";
import { unggahGambar, type TujuanUpload } from "@/lib/upload";
import { Button } from "@/components/ui/button";

// Zona upload 1 gambar: pilih/drop -> upload ke R2 -> preview + URL.
// Copy disesuaikan: backend cuma terima JPG/PNG/WebP (tanpa PDF).
export function UploadField({
  tujuan,
  nilai,
  onBerubah,
  label = "Pilih File",
}: {
  tujuan: TujuanUpload;
  nilai: string | null;
  onBerubah: (url: string | null) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [mengunggah, setMengunggah] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const proses = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    setMengunggah(true);
    try {
      const url = await unggahGambar(file, tujuan);
      onBerubah(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal upload");
    } finally {
      setMengunggah(false);
    }
  };

  return (
    <div>
      <div
        className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-garis bg-krim/50 p-6 text-center"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          void proses(e.dataTransfer.files[0]);
        }}
      >
        {nilai ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={nilai} alt="Pratinjau" className="max-h-48 rounded-lg object-contain" />
        ) : (
          <>
            <p className="text-4xl text-ink-muda">↑</p>
            <p className="mt-2 text-sm text-ink">Drop file di sini atau</p>
            <span className="text-sm font-medium text-brand underline">{label}</span>
            <p className="mt-2 text-xs text-ink-muda">JPG, PNG, WebP. Maksimal 5MB.</p>
          </>
        )}
        {mengunggah && <p className="mt-2 text-sm text-ink-muda">Mengupload...</p>}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          void proses(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      {error && <p className="mt-1 text-xs text-merah-muda">{error}</p>}
      {nilai && (
        <Button varian="ghost" ukuran="sm" onClick={() => onBerubah(null)} className="mt-1">
          Hapus file
        </Button>
      )}
    </div>
  );
}
