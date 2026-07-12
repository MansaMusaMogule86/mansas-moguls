"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { ArrowUp, Minus } from "lucide-react";
import { AnimatedPanelFrame } from "./AnimatedPanelFrame";
import { LiveChart } from "./LiveChart";
import type { EmpireHealth, TrendDir } from "@/types/empire";
import { cn } from "@/lib/utils";

/** Smoothly interpolates a number toward its target when it changes. */
function AnimatedValue({ value, decimals = 0, suffix = "", reducedMotion }: { value: number; decimals?: number; suffix?: string; reducedMotion: boolean }) {
  const [disp, setDisp] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    if (reducedMotion) return;
    const c = animate(prev.current, value, {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisp(v),
    });
    prev.current = value;
    return () => c.stop();
  }, [value, reducedMotion]);
  const shown = reducedMotion ? value : disp;
  return (
    <span className="tabular-nums">
      {shown.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function MetricRow({ label, value, decimals, suffix, trend, color, reducedMotion }: { label: string; value: number; decimals: number; suffix: string; trend: TrendDir; color: string; reducedMotion: boolean }) {
  const [flash, setFlash] = useState(false);
  const prev = useRef(value);
  useEffect(() => {
    if (prev.current !== value) {
      prev.current = value;
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 800);
      return () => clearTimeout(t);
    }
  }, [value]);

  return (
    <div className={cn("flex items-center justify-between rounded px-1.5 py-1 transition-colors duration-500", flash ? "bg-white/[0.06]" : "bg-transparent")}>
      <span className="text-[9px] font-mono uppercase tracking-widest text-white/40">{label}</span>
      <span className="flex items-center gap-1.5 text-[11px] font-mono" style={{ color }}>
        <AnimatedValue value={value} decimals={decimals} suffix={suffix} reducedMotion={reducedMotion} />
        {trend === "up" ? (
          <ArrowUp className="size-2.5 text-emerald" />
        ) : (
          <Minus className="size-2.5 text-white/30" />
        )}
      </span>
    </div>
  );
}

export function EmpireStatusPanel({ health, reducedMotion = false, index = 0 }: { health: EmpireHealth; reducedMotion?: boolean; index?: number }) {
  return (
    <AnimatedPanelFrame index={index} accent="#11d98a" glow="17, 217, 138" reducedMotion={reducedMotion} sweepDelay={3} className="p-4">
      <div className="mb-1 text-[9px] font-mono uppercase tracking-[0.2em] text-white/40">Empire Status</div>
      <div className="flex items-center justify-between">
        <span className={cn("font-heading text-xl uppercase tracking-widest text-white", !reducedMotion && "cmd-shimmer-emerald")}>OPTIMAL</span>
        <span className="relative flex size-2.5 items-center justify-center">
          {!reducedMotion && <span className="absolute inline-flex size-2.5 rounded-full border border-emerald cmd-ring" style={{ color: "#11d98a" }} />}
          <span className="relative size-2 rounded-full bg-emerald cmd-breathe" style={{ color: "#11d98a" }} />
        </span>
      </div>

      {/* Live health chart */}
      <div className="mt-3 h-14 w-full">
        <LiveChart data={health.chart} accent="#11d98a" reducedMotion={reducedMotion} />
      </div>

      <div className="mt-3 space-y-0.5 border-t border-white/5 pt-3">
        <MetricRow label="System Integrity" value={health.integrity} decimals={1} suffix="%" trend={health.integrityTrend} color="#f2cc68" reducedMotion={reducedMotion} />
        <MetricRow label="Network Strength" value={health.network} decimals={1} suffix="%" trend={health.networkTrend} color="#6ea8ff" reducedMotion={reducedMotion} />
        <div className="flex items-center justify-between px-1.5 py-1">
          <span className="text-[9px] font-mono uppercase tracking-widest text-white/40">Resource Flow</span>
          <span className="text-[11px] font-mono uppercase tracking-wide text-emerald">{health.resourceFlow}</span>
        </div>
      </div>
    </AnimatedPanelFrame>
  );
}
