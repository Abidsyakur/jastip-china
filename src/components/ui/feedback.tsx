export function EmptyState({
  judul,
  deskripsi,
  aksi,
}: {
  judul: string;
  deskripsi: string;
  aksi?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-garis bg-white px-6 py-12 text-center">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-krim text-3xl text-ink-muda">
        ○
      </div>
      <h2 className="mb-2 text-xl font-semibold">{judul}</h2>
      <p className="mb-6 max-w-sm text-sm text-ink-muda">{deskripsi}</p>
      {aksi}
    </div>
  );
}

export function SkeletonBar({ lebar = "w-full" }: { lebar?: string }) {
  return <div className={`h-4 animate-pulse rounded bg-krim ${lebar}`} />;
}

export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-garis bg-white p-4">
      <div className="mb-3 aspect-square animate-pulse rounded-lg bg-krim" />
      <SkeletonBar lebar="w-3/4" />
      <div className="mt-2" />
      <SkeletonBar lebar="w-1/2" />
    </div>
  );
}
