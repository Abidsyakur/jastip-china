import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jastip China",
  description: "Platform jasa titip barang dari China",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
