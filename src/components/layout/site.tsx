"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

const MENU = [
  { href: "/", label: "Beranda" },
  { href: "/katalog", label: "Katalog" },
  { href: "/ajukan-po", label: "Ajukan PO" },
  { href: "/cara-order", label: "Cara Order" },
  { href: "/lacak", label: "Lacak Pesanan" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-garis bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" aria-label="Beranda Jastip China">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-nihao.png" alt="Nihao Jastip" className="h-10 w-auto" />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {MENU.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className={`text-sm ${pathname === m.href ? "font-semibold text-brand" : "text-ink"}`}
            >
              {m.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/keranjang" className="text-sm text-ink" aria-label="Keranjang">
            Keranjang
          </Link>
          {user ? (
            <Link href={user.tipe === "admin" ? "/admin/dashboard" : "/akun"} className="text-sm font-medium text-ink">
              {user.nama}
            </Link>
          ) : (
            <Link href="/login" className="text-sm font-medium text-brand">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-garis bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4 md:px-6">
        <div>
          {/* Logo versi putih (filter) — file asli ber-background putih,
              jadi di footer gelap tampil bersih tanpa kotak. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-nihao.png" alt="Nihao Jastip" className="h-12 w-auto brightness-0 invert" />
          <p className="mt-2 text-sm opacity-80">
            Titip barang China mudah, aman, sampai depan pintu.
          </p>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold">Jelajahi</p>
          <div className="flex flex-col gap-1 text-sm opacity-80">
            <Link href="/">Beranda</Link>
            <Link href="/katalog">Katalog</Link>
            <Link href="/cara-order">Cara Order</Link>
            <Link href="/lacak">Lacak Pesanan</Link>
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold">Bantuan</p>
          <div className="flex flex-col gap-1 text-sm opacity-80">
            <Link href="/bantuan">FAQ</Link>
            <Link href="/syarat-layanan">Syarat Layanan</Link>
            <Link href="/kebijakan-refund">Kebijakan Refund</Link>
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold">Hubungi kami</p>
          <p className="text-sm opacity-80">WA 0812-3456-7890</p>
          <p className="text-sm opacity-80">Senin sampai Sabtu 09.00 sampai 17.00</p>
        </div>
      </div>
    </footer>
  );
}
