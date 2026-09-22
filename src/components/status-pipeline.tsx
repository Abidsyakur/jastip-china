export interface Tahap {
  label: string;
  waktu?: string | null;
}

// Pipeline horizontal; indeksAktif = tahap berjalan. `gagal` untuk DIBATALKAN.
export function StatusPipeline({
  tahap,
  indeksAktif,
  gagal = false,
}: {
  tahap: Tahap[];
  indeksAktif: number;
  gagal?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center">
        {tahap.map((t, i) => (
          <div key={t.label} className="flex flex-1 items-center last:flex-none">
            <div
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                gagal && i === indeksAktif
                  ? "bg-merah-muda text-white"
                  : i < indeksAktif
                    ? "bg-gold text-white"
                    : i === indeksAktif
                      ? "bg-brand text-white"
                      : "border border-garis text-ink-muda"
              }`}
            >
              {i < indeksAktif && !gagal ? "✓" : i + 1}
            </div>
            {i < tahap.length - 1 && <div className="mx-1 h-0.5 flex-1 bg-garis" />}
          </div>
        ))}
      </div>
      <div className="mt-1 flex">
        {tahap.map((t, i) => (
          <div key={t.label} className="flex-1 text-center last:flex-none">
            <p className={`text-[11px] ${i === indeksAktif ? "font-semibold text-ink" : "text-ink-muda"}`}>
              {t.label}
            </p>
            {t.waktu && <p className="text-[10px] text-ink-muda">{t.waktu}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
