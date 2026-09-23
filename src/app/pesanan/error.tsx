// letak: src/app/pesanan/error.tsx
"use client";

import { GlobalErrorBoundary } from "@/components/error-boundary";

export default function PesananError(props: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <GlobalErrorBoundary {...props} />;
}
