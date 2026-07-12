"use client";

import { motion } from "framer-motion";

export function EmpireCoreTooltip() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      className="absolute top-[110%] w-48 p-3 border border-gold/30 bg-black/85 backdrop-blur-md rounded-sm z-50 text-center font-mono pointer-events-none"
      style={{ clipPath: "polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)" }}
    >
      {/* Corner indicators */}
      <div className="absolute top-0 left-0 w-1 h-1 bg-gold/50" />
      <div className="absolute bottom-0 right-0 w-1 h-1 bg-gold/50" />

      <h5 className="text-[10px] font-extrabold tracking-widest text-gold uppercase mb-1">
        EMPIRE CORE
      </h5>
      <p className="text-[8px] tracking-wide text-emerald font-bold mb-1.5 uppercase">
        ALL SYSTEMS OPERATIONAL
      </p>
      
      <div className="border-t border-white/5 pt-1.5 space-y-0.5 text-[7px] text-white/50 text-left">
        <div className="flex justify-between">
          <span>ECOLOGY MODE</span>
          <span className="text-gold font-bold">SYNCHRONIZED</span>
        </div>
        <div className="flex justify-between">
          <span>ALIGNMENT SPEED</span>
          <span className="text-white font-bold">100%</span>
        </div>
      </div>
    </motion.div>
  );
}
