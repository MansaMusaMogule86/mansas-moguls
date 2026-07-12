"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { entranceVariants } from "@/lib/animationConfig";
import { cn } from "@/lib/utils";

/**
 * Angular luxury panel frame with: staggered entrance, cursor-follow highlight,
 * hover elevation, a periodic gold border sweep, and a data-pulse (border flash)
 * fired whenever `pulseKey` changes. All continuous motion is disabled under
 * reduced motion; the entrance degrades to a simple fade.
 */
export function AnimatedPanelFrame({
  children,
  index = 0,
  accent = "#d6aa38",
  glow = "214, 170, 56",
  pulseKey = 0,
  reducedMotion = false,
  sweepDelay = 0,
  className,
}: {
  children: React.ReactNode;
  index?: number;
  accent?: string;
  glow?: string;
  pulseKey?: number;
  reducedMotion?: boolean;
  sweepDelay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pulsing, setPulsing] = useState(false);
  const firstPulse = useRef(true);

  // Flash the border when new data arrives (skip the initial mount).
  useEffect(() => {
    if (firstPulse.current) {
      firstPulse.current = false;
      return;
    }
    setPulsing(true);
    const t = setTimeout(() => setPulsing(false), 1100);
    return () => clearTimeout(t);
  }, [pulseKey]);

  function onMove(e: React.MouseEvent) {
    if (reducedMotion || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    ref.current.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      custom={index}
      variants={entranceVariants(reducedMotion)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      whileHover={reducedMotion ? undefined : { y: -3 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "hud-panel group relative overflow-hidden rounded-xl bg-black/50 backdrop-blur-md transition-shadow duration-500",
        className,
      )}
      style={{
        borderColor: `rgba(${glow}, ${pulsing ? 0.7 : 0.15})`,
        boxShadow: pulsing
          ? `0 0 34px -4px rgba(${glow}, 0.55), inset 0 0 22px -8px rgba(${glow}, 0.4)`
          : undefined,
      }}
    >
      {/* Cursor-follow highlight */}
      {!reducedMotion && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: `radial-gradient(240px circle at var(--mx,50%) var(--my,50%), rgba(${glow},0.09), transparent 70%)` }}
        />
      )}

      {/* Periodic gold border sweep (top edge) */}
      {!reducedMotion && (
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden">
          <div
            className="cmd-border-sweep h-full w-1/3"
            style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)`, animationDelay: `${sweepDelay}s` }}
          />
        </div>
      )}

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
