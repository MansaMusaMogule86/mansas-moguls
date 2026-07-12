"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Mogul } from "@/lib/types";
import { getMogulExtras } from "@/lib/data/mogul-extras";
import { moguls } from "@/lib/data/moguls";
import { MogulArtwork } from "./MogulArtwork";
import { MogulMetrics } from "./MogulMetrics";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function ActiveDivisionStage({
  mogul,
  onSelectNext,
  onSelectPrev,
}: {
  mogul: Mogul;
  onSelectNext: (id: string) => void;
  onSelectPrev: (id: string) => void;
}) {
  const extras = getMogulExtras(mogul.slug);
  
  if (!extras) return null;

  // Calculate prev/next
  const currentIndex = moguls.findIndex((m) => m.id === mogul.id);
  const prevMogul = moguls[(currentIndex - 1 + moguls.length) % moguls.length];
  const nextMogul = moguls[(currentIndex + 1) % moguls.length];

  return (
    <section className="w-full max-w-[1280px] mx-auto px-6 relative flex-1 flex flex-col">
      <div className="relative w-full h-full min-h-[600px] border border-white/10 rounded-2xl overflow-hidden bg-black flex flex-col md:flex-row">
        
        <AnimatePresence mode="wait">
          <MogulArtwork key={mogul.id + "-artwork"} mogul={mogul} />
        </AnimatePresence>

        <div className="relative z-20 flex-1 p-8 md:p-12 flex flex-col">
          <AnimatePresence mode="wait">
            <MogulMetrics key={mogul.id + "-metrics"} mogul={mogul} extras={extras} />
          </AnimatePresence>
        </div>

        {/* Division Pager (Prev / Next) placed on the bottom right or bottom rail */}
        <div className="absolute bottom-0 right-0 left-0 md:left-auto md:w-1/2 p-8 flex items-center justify-between z-30 border-t border-white/5 bg-black/40 backdrop-blur-md md:border-t-0 md:bg-transparent md:backdrop-blur-none">
          
          {/* Prev Button */}
          <button 
            type="button"
            onClick={() => onSelectPrev(prevMogul.id)}
            className="group flex flex-col items-start gap-1"
          >
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-white/40 uppercase">
              <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
              <span>Previous</span>
            </div>
            <span className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">
              {prevMogul.name.replace(" Mogul", "")}
            </span>
          </button>

          {/* Next Button */}
          <button 
            type="button"
            onClick={() => onSelectNext(nextMogul.id)}
            className="group flex flex-col items-end gap-1 text-right"
          >
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-white/40 uppercase">
              <span>Next</span>
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
            </div>
            <span className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">
              {nextMogul.name.replace(" Mogul", "")}
            </span>
          </button>

        </div>
      </div>
    </section>
  );
}
