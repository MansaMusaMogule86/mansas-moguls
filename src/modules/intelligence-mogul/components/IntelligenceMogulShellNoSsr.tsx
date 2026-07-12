"use client";

/**
 * Client-only mount for the Intelligence Mogul shell.
 *
 * The migrated workspace seeds live telemetry state with Math.random()/Date
 * initializers (by design — it simulates a live analytical system). Rendering
 * it on the server would produce HTML that can never match the client pass,
 * so the whole module is mounted client-side only. It sits behind the
 * dashboard, so there is no SEO cost.
 */

import dynamic from "next/dynamic";

const IntelligenceMogulShell = dynamic(
  () => import("@/modules/intelligence-mogul/components/IntelligenceMogulShell"),
  {
    ssr: false,
    loading: () => (
      <div className="intelligence-mogul-root flex h-[100dvh] w-full items-center justify-center bg-editorial-bg">
        <div className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-editorial-muted">
          Initializing Intelligence Node…
        </div>
      </div>
    ),
  }
);

export default function IntelligenceMogulShellNoSsr({
  children,
}: {
  children: React.ReactNode;
}) {
  return <IntelligenceMogulShell>{children}</IntelligenceMogulShell>;
}
