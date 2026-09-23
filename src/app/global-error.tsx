// letak: src/app/global-error.tsx
"use client";

import { GlobalErrorBoundary } from "@/components/error-boundary";

export default function GlobalError(props: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <GlobalErrorBoundary {...props} />;
}
