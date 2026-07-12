"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { AnimatedPanelFrame } from "./AnimatedPanelFrame";
import { WorldImpactMap } from "./WorldImpactMap";
import type { ActiveRoute, EmpireImpact } from "@/types/empire";
import { cn } from "@/lib/utils";

/** Counts up from 0 on load, then interpolates on each change. */
function ImpactNumber({ value, decimals = 0, prefix = "", suffix = "", reducedMotion, className }: { value: number; decimals?: number; prefix?: string; suffix?: string; reducedMotion: boolean; className?: string }) {
  const [disp, setDisp] = useState(0);
  const prev = useRef(0);
  const first = useRef(true);
  useEffect(() => {
    if (reducedMotion) return;
    const from = first.current ? 0 : prev.current;
    const dur = first.current ? 1.7 : 0.9;
    first.current = false;
    const c = animate(from, value, { duration: dur, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setDisp(v) });
    prev.current = value;
    return () => c.stop();
  }, [value, reducedMotion]);
  const shown = reducedMotion ? value : disp;
  return (
    <span className={cn("tabular-nums", className)}>
      {prefix}
      {shown.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function MetricStat({ label, value, active, reducedMotion }: { label: string; value: number; active: boolean; reducedMotion: boolean }) {
  return (
    <div className={cn("rounded px-1 py-1 text-center transition-colors duration-500", active ? "bg-gold/10" : "bg-transparent")}>
      <div className={cn("text-sm font-heading transition-colors duration-500", active ? "text-gold-bright" : "text-white")} style={active ? { textShadow: "0 0 12px rgba(214,170,56,0.6)" } : undefined}>
        <ImpactNumber value={value} reducedMotion={reducedMotion} />
      </div>
      <div className="text-[8px] font-mono uppercase tracking-widest text-white/35">{label}</div>
    </div>
  );
}

export function GlobalImpactPanel({ impact, activeRoute, reducedMotion = false, index = 0 }: { impact: EmpireImpact; activeRoute: ActiveRoute | null; reducedMotion?: boolean; index?: number }) {
  return (
    <AnimatedPanelFrame index={index} reducedMotion={reducedMotion} sweepDelay={9} className="p-4">
      <div className="mb-1 text-[9px] font-mono uppercase tracking-[0.2em] text-white/40">Global Impact</div>
      <div className={cn("font-mono text-2xl text-gold", !reducedMotion && "cmd-flicker")} style={impact.pulsed === "value" ? { textShadow: "0 0 16px rgba(214,170,56,0.7)" } : undefined}>
        <ImpactNumber value={impact.value} decimals={3} prefix="$" suffix="T" reducedMotion={reducedMotion} />
      </div>
      <div className="mb-3 text-[8px] font-mono uppercase tracking-widest text-white/35">ALIGNED GLOBAL FOOTPRINT</div>

      {/* Animated world map */}
      <div className="h-24 w-full overflow-hidden rounded-lg border border-white/5 bg-black/30">
        <WorldImpactMap activeRoute={activeRoute} reducedMotion={reducedMotion} />
      </div>

      <div className="mt-3 grid grid-cols-3 gap-1 border-t border-white/5 pt-3">
        <MetricStat label="Markets" value={impact.markets} active={impact.pulsed === "markets"} reducedMotion={reducedMotion} />
        <MetricStat label="Countries" value={impact.countries} active={impact.pulsed === "countries"} reducedMotion={reducedMotion} />
        <MetricStat label="Assets" value={impact.assets} active={impact.pulsed === "assets"} reducedMotion={reducedMotion} />
      </div>
    </AnimatedPanelFrame>
  );
}
