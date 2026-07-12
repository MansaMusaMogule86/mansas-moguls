"use client";

import { motion } from "framer-motion";

export function EmpireAtmosphere() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0 bg-[#020308]">
      
      {/* Deep Space Background */}
      <div 
        className="absolute inset-0 opacity-80"
        style={{
          background: "radial-gradient(ellipse at top center, rgba(16, 24, 40, 0.4) 0%, rgba(2, 3, 8, 1) 100%)"
        }}
      />

      {/* Gold Horizon Glow */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[150%] h-[60%] opacity-40 blur-[100px]"
        style={{
          background: "radial-gradient(ellipse at top center, rgba(214, 170, 56, 0.3) 0%, rgba(59, 130, 246, 0.1) 40%, transparent 70%)"
        }}
      />

      {/* Blue Edge Light */}
      <div 
        className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[100%] h-[40%] opacity-60 blur-[60px]"
        style={{
          background: "radial-gradient(ellipse at top center, rgba(59, 130, 246, 0.4) 0%, transparent 60%)"
        }}
      />

      {/* Center Sunrise Pulse */}
      <motion.div
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-30 blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(214, 170, 56, 0.15) 0%, transparent 60%)"
        }}
      />

      {/* Volumetric Haze Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

    </div>
  );
}
