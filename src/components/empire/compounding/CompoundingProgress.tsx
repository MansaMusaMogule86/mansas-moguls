"use client";

import { motion } from "framer-motion";

interface CompoundingProgressProps {
  logs: string[];
}

export function CompoundingProgress({ logs }: CompoundingProgressProps) {
  return (
    <div className="w-full max-w-xl mx-auto p-4 border border-white/5 bg-black/60 rounded-sm font-mono text-left space-y-2 mt-4 select-none">
      {/* Title block */}
      <div className="flex items-center justify-between pb-1.5 border-b border-white/5 text-[9px] text-white/40 tracking-widest uppercase font-bold">
        <span>PROCESS COMPILATION STREAM</span>
        <span className="text-gold animate-pulse">ACTIVE RUN</span>
      </div>

      {/* Logs container */}
      <div className="h-28 overflow-y-auto space-y-1 pr-2 scrollbar-thin scrollbar-thumb-white/10">
        {logs.map((log, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="text-[9.5px] text-white/70 flex items-start gap-1"
          >
            <span className="text-gold font-bold">{`>`}</span>
            <span>{log}</span>
          </motion.div>
        ))}
        {logs.length === 0 && (
          <div className="text-[9.5px] text-white/30 text-center py-8">
            Click Run Engine to execute compounding sequence.
          </div>
        )}
      </div>
    </div>
  );
}
