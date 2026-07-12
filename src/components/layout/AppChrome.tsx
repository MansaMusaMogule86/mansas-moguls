"use client";

/**
 * Site chrome switch.
 *
 * The public marketing site, The Throne, and every dashboard screen share the
 * global Navbar / Footer / top padding from the root layout. Intelligence Mogul
 * is a dedicated, full-canvas operating system and must NOT inherit the public
 * navbar, the footer, or the `pt-20` content offset — otherwise it would be
 * crushed under a second navigation shell.
 *
 * This component decides per-route whether the global chrome is rendered. It is
 * the only place that branches on pathname at the layout level, so The Throne
 * and the public site are completely untouched.
 */

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const INTELLIGENCE_PREFIX = "/dashboard/moguls/intelligence-mogul";

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isIntelligence =
    !!pathname && pathname.startsWith(INTELLIGENCE_PREFIX);

  if (isIntelligence) {
    // Full-bleed operating system canvas — no public chrome, no padding.
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">{children}</main>
      <Footer />
    </>
  );
}
