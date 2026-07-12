"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { AnimatedPanelFrame } from "./AnimatedPanelFrame";
import { PANEL_ICONS } from "./panelIcons";
import { feedRow } from "@/lib/animationConfig";
import type { FeedEvent } from "@/types/empire";

const PRIORITY_COLOR: Record<string, string> = {
  normal: "rgba(255,255,255,0.25)",
  elevated: "#d6aa38",
  critical: "#e83e9c",
};

export function LiveFeedPanel({
  feed,
  feedPulse,
  formatAge,
  reducedMotion = false,
  index = 0,
}: {
  feed: FeedEvent[];
  feedPulse: number;
  formatAge: (n: number) => string;
  reducedMotion?: boolean;
  index?: number;
}) {
  return (
    <AnimatedPanelFrame index={index} pulseKey={feedPulse} reducedMotion={reducedMotion} sweepDelay={0} className="p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full rounded-full bg-gold/60" style={{ animation: reducedMotion ? undefined : "cmd-ring 3s ease-out infinite" }} />
          <span className="relative inline-flex size-1.5 rounded-full bg-gold" />
        </span>
        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-gold">Live Feed</span>
        <span className="ml-auto text-[8px] font-mono uppercase tracking-widest text-white/25">Intelligence</span>
      </div>

      <ul className="space-y-1.5">
        <AnimatePresence initial={false}>
          {feed.map((e, i) => {
            const Icon = PANEL_ICONS[e.icon];
            const newest = i === 0;
            return (
              <motion.li
                key={e.id}
                layout={!reducedMotion}
                variants={reducedMotion ? undefined : feedRow}
                initial={reducedMotion ? { opacity: 0 } : "hidden"}
                animate={reducedMotion ? { opacity: 1 } : "show"}
                exit={reducedMotion ? { opacity: 0 } : "exit"}
                className="group/row flex items-center gap-2.5 overflow-hidden"
              >
                <motion.span
                  key={newest ? `flash-${e.id}` : e.id}
                  initial={newest && !reducedMotion ? { scale: 1.4, color: "#f2cc68" } : false}
                  animate={{ scale: 1, color: "rgba(214,170,56,0.75)" }}
                  transition={{ duration: 0.5 }}
                  className="grid size-6 shrink-0 place-items-center rounded-md border border-gold/15 bg-gold/5"
                >
                  {Icon && <Icon className="size-3" />}
                </motion.span>
                <span className="flex-1 truncate text-[11px] text-white/60 transition-colors group-hover/row:text-gold/90">{e.label}</span>
                <span className="size-1 shrink-0 rounded-full" style={{ background: PRIORITY_COLOR[e.priority] }} title={e.priority} />
                <span className="shrink-0 font-mono text-[9px] tabular-nums text-white/25">{formatAge(e.bornAt)}</span>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>

      <FeedButton label="View Full Feed" />
    </AnimatedPanelFrame>
  );
}

function FeedButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="group/btn relative mt-4 flex h-9 w-full items-center justify-center gap-2 overflow-hidden rounded-md border border-gold/15 text-[9px] font-mono uppercase tracking-[0.2em] text-gold/70 outline-none transition-colors hover:border-gold/40 hover:text-gold focus-visible:ring-2 focus-visible:ring-gold/60"
    >
      <span aria-hidden className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/20 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
      <span className="relative">{label}</span>
      <ChevronRight className="relative size-3 transition-transform group-hover/btn:translate-x-1" />
    </button>
  );
}
