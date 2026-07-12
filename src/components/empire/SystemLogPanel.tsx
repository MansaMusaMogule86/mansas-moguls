"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { AnimatedPanelFrame } from "./AnimatedPanelFrame";
import { PANEL_ICONS } from "./panelIcons";
import { feedRow } from "@/lib/animationConfig";
import type { LogEntry } from "@/types/empire";

/** Types the message in on the freshest line; instant for the rest. */
function LogLine({ entry, age, reducedMotion }: { entry: LogEntry; age: string; reducedMotion: boolean }) {
  const shouldType = entry.fresh && !reducedMotion;
  const [shown, setShown] = useState(shouldType ? "" : entry.message);
  const [done, setDone] = useState(!shouldType);
  const Icon = PANEL_ICONS[entry.icon];

  useEffect(() => {
    if (!shouldType) {
      setShown(entry.message);
      setDone(true);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(entry.message.slice(0, i));
      if (i >= entry.message.length) {
        clearInterval(id);
        setDone(true);
      }
    }, 26);
    return () => clearInterval(id);
  }, [entry.message, shouldType]);

  return (
    <motion.li
      layout={!reducedMotion}
      variants={reducedMotion ? undefined : feedRow}
      initial={reducedMotion ? { opacity: 0 } : "hidden"}
      animate={reducedMotion ? { opacity: 1 } : "show"}
      exit={reducedMotion ? { opacity: 0 } : "exit"}
      className="relative flex items-center gap-2.5 overflow-hidden"
    >
      {entry.fresh && !reducedMotion && (
        <span aria-hidden className="cmd-row-scan pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-gold/12 to-transparent" />
      )}
      <span className="grid size-6 shrink-0 place-items-center rounded-md border border-emerald/20 bg-emerald/5 text-emerald" style={entry.fresh && !reducedMotion ? { animation: "cmd-breathe 1.2s ease-in-out 2" } : undefined}>
        {Icon && <Icon className="size-3" />}
      </span>
      <span className="flex-1 truncate font-mono text-[10px] text-white/55">
        {shown}
        {!done && <span className="cmd-cursor ml-0.5 inline-block h-2.5 w-1 -translate-y-px bg-emerald align-middle" />}
      </span>
      <span className="shrink-0 font-mono text-[9px] tabular-nums text-white/25">{done ? age : ""}</span>
    </motion.li>
  );
}

export function SystemLogPanel({
  log,
  logPulse,
  formatAge,
  reducedMotion = false,
  index = 0,
}: {
  log: LogEntry[];
  logPulse: number;
  formatAge: (n: number) => string;
  reducedMotion?: boolean;
  index?: number;
}) {
  return (
    <AnimatedPanelFrame index={index} accent="#11d98a" glow="17, 217, 138" pulseKey={logPulse} reducedMotion={reducedMotion} sweepDelay={6} className="p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="size-1.5 rounded-full bg-emerald" style={{ boxShadow: "0 0 8px var(--emerald)" }} />
        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-emerald">System Log</span>
        <span className="ml-auto text-[8px] font-mono uppercase tracking-widest text-white/25">Infrastructure</span>
      </div>

      <ul className="space-y-1.5">
        <AnimatePresence initial={false}>
          {log.map((e) => (
            <LogLine key={e.id} entry={e} age={formatAge(e.bornAt)} reducedMotion={reducedMotion} />
          ))}
        </AnimatePresence>
      </ul>

      <button
        type="button"
        aria-label="View System Log"
        className="group/btn relative mt-4 flex h-9 w-full items-center justify-center gap-2 overflow-hidden rounded-md border border-emerald/15 text-[9px] font-mono uppercase tracking-[0.2em] text-emerald/70 outline-none transition-colors hover:border-emerald/40 hover:text-emerald focus-visible:ring-2 focus-visible:ring-emerald/60"
      >
        <span aria-hidden className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-emerald/20 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
        <span className="relative">View System Log</span>
        <ChevronRight className="relative size-3 transition-transform group-hover/btn:translate-x-1" />
      </button>
    </AnimatedPanelFrame>
  );
}
