// letak: src/app/admin/error.tsx
"use client";

import { GlobalErrorBoundary } from "@/components/error-boundary";

export default function AdminError(props: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <GlobalErrorBoundary {...props} />;
}
