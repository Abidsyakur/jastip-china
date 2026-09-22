import Link from "next/link";
import { rupiah } from "@/lib/format";
import { Tag } from "@/components/ui/badge";

export interface KartuProduk {
  id: string;
  nama: string;
  harga: number | string;
  gambar?: string | null;
  stok: number;
  kategori?: string;
}

// Card reguler; `unggulan` me-render 2x2 (atur span di grid parent).
export function ProductCard({ p, unggulan = false }: { p: KartuProduk; unggulan?: boolean }) {
  const habis = p.stok <= 0;
  return (
    <Link
      href={`/produk/${p.id}`}
      className={`block overflow-hidden rounded-xl border border-garis bg-white transition-shadow hover:shadow-md ${
        unggulan ? "rounded-[20px]" : "rounded-xl"
      } ${habis ? "opacity-60" : ""}`}
    >
      <div className={`relative bg-krim ${unggulan ? "aspect-[2/1]" : "aspect-square"}`}>
        {p.gambar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.gambar} alt={p.nama} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl text-ink-muda/40">
            ○
          </div>
        )}
        <div className="absolute left-2 top-2">
          {habis ? (
            <Tag tone="netral">Stok Habis</Tag>
          ) : p.stok < 5 ? (
            <Tag tone="red">Stok Terbatas</Tag>
          ) : (
            <Tag tone="gold">Ready Stock</Tag>
          )}
        </div>
      </div>
      <div className="p-4">
        {p.kategori && <p className="text-xs text-ink-muda">{p.kategori}</p>}
        <h3 className={`mt-1 line-clamp-2 font-medium ${unggulan ? "text-xl" : "text-base"}`}>
          {p.nama}
        </h3>
        <p className={`mt-1 font-semibold text-gold-tua ${unggulan ? "text-2xl" : "text-lg"}`}>
          {rupiah(p.harga)}
        </p>
        {!habis && p.stok < 5 && <p className="text-xs text-merah-muda">Sisa {p.stok} biji</p>}
      </div>
    </Link>
  );
}
