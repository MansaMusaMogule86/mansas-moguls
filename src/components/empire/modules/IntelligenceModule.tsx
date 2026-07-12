"use client";

import { motion } from "framer-motion";

export function IntelligenceModule() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Visual Identity for Intelligence */}
      <div className="absolute inset-0 flex flex-col items-start justify-center">
        
        {/* Radar / Scanning effect */}
        <motion.div 
          className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 border border-[#00ffff]/20 rounded-full flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ffff] to-transparent opacity-50" />
          <div className="w-64 h-64 border border-[#00ffff]/30 rounded-full border-dashed" />
          <div className="absolute w-32 h-32 border border-[#00ffff]/50 rounded-full" />
        </motion.div>

        {/* Data points */}
        <div className="relative z-10 w-1/2">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="p-6 border border-[#00ffff]/20 bg-black/40 backdrop-blur-md mb-4"
            style={{ clipPath: "polygon(0 0, 100% 0, 95% 100%, 0 100%)" }}
          >
            <h3 className="text-[#00ffff] text-xs uppercase tracking-widest mb-2">Live Scanning</h3>
            <div className="text-3xl font-mono text-white">4,208.99 <span className="text-sm text-[#00ffff]">+12.4%</span></div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="p-6 border border-[#00ffff]/20 bg-black/40 backdrop-blur-md"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 5% 100%)" }}
          >
            <h3 className="text-[#00ffff] text-xs uppercase tracking-widest mb-2">Threat Detection</h3>
            <div className="text-xl font-mono text-white">Nominal. Global markets optimal.</div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
