// letak: src/components/error-boundary.tsx
"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export function GlobalErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[CLIENT_ERROR]", error.message, error.digest);
  }, [error]);

  return (
    <div className="mx-auto max-w-md p-8 text-center">
      <h2 className="font-display text-xl font-bold">Terjadi kesalahan</h2>
      <p className="mt-2 text-sm text-ink-muda">
        Coba muat ulang halaman. Kalau masih gagal, hubungi admin lewat WhatsApp.
      </p>
      <Button className="mt-4" onClick={reset}>
        Coba Lagi
      </Button>
    </div>
  );
}
