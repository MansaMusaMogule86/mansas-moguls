// src/app/(public)/layout.tsx
// Layout for all public pages

import { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* BreadcrumbList will be added per-page */}
      {children}
    </>
  );
}