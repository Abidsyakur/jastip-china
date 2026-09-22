"use client";

import { useEffect, useState } from "react";

type Jenis = "sukses" | "error" | "info";

interface ToastItem {
  id: number;
  pesan: string;
  jenis: Jenis;
}

let dorong: ((pesan: string, jenis: Jenis) => void) | null = null;
let hitung = 0;

export function toast(pesan: string, jenis: Jenis = "info") {
  dorong?.(pesan, jenis);
}

const gayaJenis: Record<Jenis, string> = {
  sukses: "border-jade bg-white",
  error: "border-merah-muda bg-white",
  info: "border-garis bg-white",
};

export function Toaster() {
  const [daftar, setDaftar] = useState<ToastItem[]>([]);

  useEffect(() => {
    dorong = (pesan, jenis) => {
      const id = ++hitung;
      setDaftar((d) => [...d, { id, pesan, jenis }]);
      setTimeout(() => setDaftar((d) => d.filter((t) => t.id !== id)), 5000);
    };
    return () => {
      dorong = null;
    };
  }, []);

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 flex w-80 flex-col gap-2">
      {daftar.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto rounded-xl border-l-4 p-4 shadow-lg ${gayaJenis[t.jenis]}`}
        >
          <p className="text-sm text-ink">{t.pesan}</p>
        </div>
      ))}
    </div>
  );
}
