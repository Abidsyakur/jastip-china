"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { MessageCircle, ShoppingCart, UserRound } from "lucide-react";

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
        <div className="flex items-center gap-2">
          <Link
            href="/keranjang"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-krim"
            aria-label="Keranjang"
          >
            <ShoppingCart size={22} />
          </Link>
          {user ? (
            <Link
              href={user.tipe === "admin" ? "/admin/dashboard" : "/akun"}
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-krim"
              aria-label={user.nama}
              title={user.nama}
            >
              <UserRound size={22} />
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex h-10 w-10 items-center justify-center rounded-full text-brand hover:bg-krim"
              aria-label="Login / Daftar"
            >
              <UserRound size={22} />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <>
      <a
        href="https://wa.me/6287898388993"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 md:bottom-6"
        aria-label="Chat via WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
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
    </>
  );
}
