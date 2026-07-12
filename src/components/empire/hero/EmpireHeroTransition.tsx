"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export function EmpireHeroTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Signal line stretching down
  const signalHeight = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);
  const signalOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  if (shouldReduceMotion) return <div className="h-24" />;

  return (
    <div ref={containerRef} className="relative w-full h-48 -mt-24 z-20 flex justify-center pointer-events-none">
      
      {/* Central Signal Line */}
      <motion.div 
        className="w-px bg-gradient-to-b from-gold via-gold/50 to-transparent shadow-[0_0_15px_rgba(214,170,56,0.6)]"
        style={{
          height: signalHeight,
          opacity: signalOpacity
        }}
      />
      
      {/* Moving Signal Packet */}
      <motion.div
        className="absolute top-0 w-1.5 h-16 rounded-full bg-gold shadow-[0_0_20px_rgba(214,170,56,1)]"
        style={{ opacity: signalOpacity }}
        animate={{ y: ["-100%", "300px"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      
    </div>
  );
}
