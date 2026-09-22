"use client";

export function QtyStepper({
  nilai,
  min = 1,
  max,
  onUbah,
}: {
  nilai: number;
  min?: number;
  max?: number;
  onUbah: (v: number) => void;
}) {
  const kurang = () => onUbah(Math.max(min, nilai - 1));
  const tambah = () => onUbah(max !== undefined ? Math.min(max, nilai + 1) : nilai + 1);
  const btn =
    "flex h-9 w-9 items-center justify-center rounded-lg border border-garis text-lg disabled:opacity-40";
  return (
    <div className="inline-flex items-center gap-2">
      <button type="button" onClick={kurang} disabled={nilai <= min} className={btn} aria-label="Kurangi">
        -
      </button>
      <span className="w-8 text-center font-medium">{nilai}</span>
      <button
        type="button"
        onClick={tambah}
        disabled={max !== undefined && nilai >= max}
        className={btn}
        aria-label="Tambah"
      >
        +
      </button>
    </div>
  );
}
