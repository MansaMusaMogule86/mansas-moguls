"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { heroContent } from "@/data/empireHero";
import { itemVariants } from "./heroMotion";

export function EmpireHeroActions({ onExplore }: { onExplore: () => void }) {
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  const definitions: Record<string, string> = {
    "BUILD.": "Create systems, products, and intellectual property.",
    "ACQUIRE.": "Own assets, audiences, companies, and distribution.",
    "AUTOMATE.": "Deploy AI agents and autonomous workflows.",
    "SCALE.": "Increase reach, revenue, and operational capacity.",
    "COMPOUND.": "Convert every system into long-term leverage.",
  };

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto text-center px-4 mt-6">
      {/* Subtitle */}
      <motion.div variants={itemVariants} className="mb-4">
        <h2 className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-gold uppercase font-bold">
          Mansas Moguls Ecosystem
        </h2>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        variants={itemVariants}
        className="text-4xl md:text-5xl lg:text-7xl font-heading font-black text-white uppercase tracking-wider mb-5 leading-none flex flex-wrap justify-center gap-x-4 gap-y-2 select-none"
      >
        {heroContent.headline.map((word) => (
          <span
            key={word}
            className="cursor-help hover:text-gold transition-colors duration-200"
            onMouseEnter={() => setHoveredWord(word)}
            onMouseLeave={() => setHoveredWord(null)}
          >
            {word}
          </span>
        ))}
      </motion.h1>

      {/* Headline definitions block */}
      <div className="h-10 mb-8 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {hoveredWord ? (
            <motion.p
              key={hoveredWord}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="text-xs md:text-sm font-mono tracking-widest text-gold/90 uppercase font-bold px-2"
            >
              {hoveredWord}: {definitions[hoveredWord]}
            </motion.p>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              className="text-xs md:text-sm font-sans tracking-wide text-white/50 px-2"
            >
              Hover each force to inspect operating guidelines.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Main Description */}
      <motion.p
        variants={itemVariants}
        className="text-base md:text-lg text-white/60 max-w-xl mx-auto mb-10 leading-relaxed font-sans"
      >
        {heroContent.description}
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto z-40 pointer-events-auto"
      >
        <Link
          href={heroContent.primaryCTA.href}
          className="group relative flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-gold text-black rounded-[1px] font-bold uppercase tracking-widest text-[11px] transition-transform active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020308] focus-visible:ring-gold overflow-hidden"
          style={{ minHeight: "44px" }}
        >
          <span className="relative z-10">{heroContent.primaryCTA.label}</span>
          <ArrowRight className="w-3.5 h-3.5 relative z-10 transition-transform group-hover:translate-x-1" />

          {/* Gold Shimmer Sweep */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 ease-out" />
        </Link>

        <button
          onClick={onExplore}
          className="group relative flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-transparent border border-white/10 hover:border-gold/30 text-white rounded-[1px] font-bold uppercase tracking-widest text-[11px] transition-all hover:bg-gold/[0.03] active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020308] focus-visible:ring-gold"
          style={{ minHeight: "44px" }}
        >
          <span>{heroContent.secondaryCTA.label}</span>
        </button>
      </motion.div>
    </div>
  );
}
