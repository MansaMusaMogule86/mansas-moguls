"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { EmpireCoreTooltip } from "./EmpireCoreTooltip";
import { cn } from "@/lib/utils";

interface EmpireCoreProps {
  hovered: boolean;
  onHover: (hovered: boolean) => void;
  onClick: () => void;
}

export function EmpireCore({ hovered, onHover, onClick }: EmpireCoreProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div 
      className="relative flex items-center justify-center w-64 h-64 md:w-80 md:h-80 mx-auto z-40 select-none cursor-pointer"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onClick={onClick}
    >
      {/* Central glow layer */}
      <motion.div
        animate={
          shouldReduceMotion
            ? { opacity: 0.3 }
            : {
                scale: hovered ? 1.25 : 1,
                opacity: hovered ? [0.4, 0.7, 0.4] : [0.2, 0.4, 0.2],
                transition: { duration: hovered ? 1.5 : 3.5, repeat: Infinity, ease: "easeInOut" },
              }
        }
        className={cn(
          "absolute inset-12 rounded-full blur-2xl transition-colors duration-500",
          hovered ? "bg-gold/20" : "bg-gold/10"
        )}
      />

      {/* Outer Orbit Ring - Clockwise */}
      <motion.div
        className="absolute inset-0 rounded-full border border-white/5"
        style={{ borderStyle: "dashed" }}
      >
        {!shouldReduceMotion && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: hovered ? 15 : 35,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-full h-full rounded-full border border-gold/20"
            style={{ clipPath: "polygon(0 0, 50% 0, 50% 50%, 0 50%)" }}
          />
        )}
      </motion.div>

      {/* Outer Data Arc ring (Tick Marks) */}
      <div className="absolute inset-4 rounded-full border border-white/5 opacity-40">
        <div className="absolute top-1/2 left-0 w-3 h-[1px] bg-gold" />
        <div className="absolute top-1/2 right-0 w-3 h-[1px] bg-gold" />
        <div className="absolute top-0 left-1/2 w-[1px] h-3 bg-gold" />
        <div className="absolute bottom-0 left-1/2 w-[1px] h-3 bg-gold" />
      </div>

      {/* Inner Orbit Ring - Counter-Clockwise */}
      <div className="absolute inset-8 rounded-full border border-white/5">
        {!shouldReduceMotion && (
          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: hovered ? 12 : 28,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-full h-full rounded-full border-t border-blue-500/20"
          />
        )}
      </div>

      {/* Pulsing energy wave (occasional radial pulse) */}
      {!shouldReduceMotion && (
        <motion.div
          animate={
            hovered
              ? { scale: [1, 1.4, 1], opacity: [0, 0.4, 0] }
              : { scale: [1, 1.3, 1], opacity: [0, 0.15, 0] }
          }
          transition={{
            duration: hovered ? 2 : 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-16 rounded-full border border-gold/30 bg-gold/5 blur-[2px]"
        />
      )}

      {/* Center MM Shield/Crest */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative z-10 w-24 h-24 md:w-28 md:h-28 flex flex-col items-center justify-center bg-black/75 backdrop-blur-md rounded-full border transition-all duration-500",
          hovered ? "border-gold shadow-[0_0_30px_rgba(214,170,56,0.35)]" : "border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.8)]"
        )}
      >
        <div className="text-gold font-heading text-3xl font-extrabold tracking-[0.2em] relative">
          MM
          {/* Subtle scanning bar */}
          {!shouldReduceMotion && (
            <motion.div
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-[1.5px] bg-gold/50 blur-[0.5px] shadow-[0_0_4px_#d6aa38]"
            />
          )}
        </div>
        <span className="text-[7px] font-mono text-white/40 tracking-widest mt-1">ECOLOGY</span>
      </motion.div>

      {/* Interactive Tooltip Reveal */}
      <AnimatePresence>
        {hovered && <EmpireCoreTooltip />}
      </AnimatePresence>
    </div>
  );
}
