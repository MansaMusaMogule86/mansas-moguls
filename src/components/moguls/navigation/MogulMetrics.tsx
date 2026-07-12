"use client";

import { motion } from "framer-motion";
import type { Mogul } from "@/lib/types";
import { type MogulExtras, type MogulMetric } from "@/lib/data/mogul-extras";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export function MogulMetrics({ mogul, extras }: { mogul: Mogul; extras: MogulExtras }) {
  const accent = extras.accent || "#ffffff";
  const glow = extras.glow || "255,255,255";

  return (
    <div className="relative z-20 flex flex-col md:w-1/2 pr-8 h-full">
      <motion.div
        key={mogul.id + "-content"}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col h-full"
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span 
              className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-sm border"
              style={{ color: accent, borderColor: `rgba(${glow}, 0.3)`, backgroundColor: `rgba(${glow}, 0.05)` }}
            >
              Division {String(mogul.orderIndex).padStart(2, "0")}
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-white/50">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
              {extras.status}
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white uppercase tracking-wider mb-4">
            {mogul.name}
          </h2>
          <p className="text-lg text-white/70 max-w-xl leading-relaxed">
            {mogul.fullDescription}
          </p>
        </div>

        {/* Capabilities */}
        <div className="mb-10">
          <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 mb-4">Capabilities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {mogul.capabilities.map((cap, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: accent }} />
                <span className="text-sm font-medium text-white/80">{cap}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="mb-10">
          <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 mb-4">Live Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            {extras.metrics.map((metric, i) => (
              <div key={i} className="flex flex-col gap-1 p-4 rounded-lg border border-white/10 bg-black/40 backdrop-blur-sm">
                <span className="text-2xl font-mono font-bold" style={{ color: accent }}>
                  {metric.prefix}{metric.value}{metric.suffix}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-6 border-t border-white/10">
          <Link
            href={`/moguls/${mogul.slug}`}
            className="group flex items-center justify-between w-full p-4 rounded-lg border transition-colors bg-white/5 hover:bg-white/10"
            style={{ borderColor: `rgba(${glow}, 0.2)` }}
          >
            <span className="text-sm font-bold uppercase tracking-widest text-white">Enter {mogul.name}</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" style={{ color: accent }} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
