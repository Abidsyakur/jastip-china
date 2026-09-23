import { Metadata } from "next";
import { prisma } from "@/lib/db";
import { rupiah } from "@/lib/format";
import { SiteHeader, SiteFooter } from "@/components/layout/site";
import { BottomNav } from "@/components/layout/bottom-nav";
import { ProdukDetailClient } from "@/components/produk-detail";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const produk = await prisma.produk.findUnique({
    where: { id },
    include: { gambar: { take: 1 } },
  });

  if (!produk) {
    return {
      title: "Produk Tidak Ditemukan - Jastip China",
      description: "Produk yang Anda cari tidak ditemukan.",
    };
  }

  const title = `${produk.namaProduk} - Jastip China`;
  const description = `Beli ${produk.namaProduk} seharga ${rupiah(Number(produk.hargaJualIdr))} via Jastip China. Cepat, aman, terpercaya.`;
  const image = produk.gambar[0]?.urlGambar ?? "/logo-nihao.png";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function DetailProdukPage({ params }: Props) {
  const { id } = await params;
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <ProdukDetailClient produkId={id} />
      <div className="hidden md:block">
        <SiteFooter />
      </div>
      <BottomNav />
    </div>
  );
}
