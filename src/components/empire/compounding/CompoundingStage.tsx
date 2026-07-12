"use client";

import { motion, useReducedMotion } from "framer-motion";
import { StageId, CompoundingStageData } from "./compounding.types";
import { cn } from "@/lib/utils";

interface CompoundingStageProps {
  stage: CompoundingStageData;
  isSelected: boolean;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
  onHover: (hovered: boolean) => void;
}

export function CompoundingStage({
  stage,
  isSelected,
  isActive,
  isCompleted,
  onClick,
  onHover,
}: CompoundingStageProps) {
  const shouldReduce = useReducedMotion();

  // Color mapping based on stage state
  let accentColor = "text-white/40";
  let borderColor = "border-white/5";
  let bgGradient = "bg-transparent";

  if (isActive) {
    accentColor = "text-gold";
    borderColor = "border-gold";
    bgGradient = "bg-gold/[0.03]";
  } else if (isSelected) {
    accentColor = "text-gold";
    borderColor = "border-gold/60";
    bgGradient = "bg-gold/[0.02]";
  } else if (isCompleted) {
    accentColor = "text-gold/80";
    borderColor = "border-gold/30";
    bgGradient = "bg-white/[0.01]";
  }

  // Stage-specific SVG animations
  const renderIcon = () => {
    const iconClass = cn(
      "w-12 h-12 flex items-center justify-center rounded-full border bg-[#05070a] mb-4 transition-all duration-300",
      isActive || isSelected ? "border-gold text-gold shadow-[0_0_12px_rgba(214,170,56,0.25)]" : "border-white/10 text-white/50"
    );

    if (stage.id === "capture") {
      // 01 CAPTURE: Crosshair rotation, target ring expansion, center lock pulse
      return (
        <div className={iconClass}>
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="1.5">
            {/* Outer Target Circle */}
            <motion.circle
              cx="12"
              cy="12"
              r="8"
              animate={isActive && !shouldReduce ? { scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Crosshair lines rotating */}
            <motion.g
              animate={isActive && !shouldReduce ? { rotate: 360 } : {}}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              style={{ originX: "12px", originY: "12px" }}
            >
              <line x1="12" y1="2" x2="12" y2="6" />
              <line x1="12" y1="18" x2="12" y2="22" />
              <line x1="2" y1="12" x2="6" y2="12" />
              <line x1="18" y1="12" x2="22" y2="12" />
            </motion.g>
            {/* Central lock dot */}
            <circle cx="12" cy="12" r="1.5" className="fill-current" />
          </svg>
        </div>
      );
    }

    if (stage.id === "analyze") {
      // 02 ANALYZE: Grid of dots reorganizing/moving, scanning line sweep, grid pulse
      return (
        <div className={iconClass}>
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="1.5">
            {/* Scanning line sweep */}
            {isActive && !shouldReduce && (
              <motion.line
                x1="2"
                y1="4"
                x2="22"
                y2="4"
                stroke="rgba(214,170,56,0.6)"
                strokeWidth="1"
                animate={{ y: [2, 16, 2] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            {/* Dot matrix grid grid */}
            <g className="fill-current stroke-none">
              <circle cx="6" cy="6" r="1.2" />
              <circle cx="12" cy="6" r="1.2" />
              <circle cx="18" cy="6" r="1.2" />
              <circle cx="6" cy="12" r="1.2" />
              <circle cx="12" cy="12" r="1.2" />
              <circle cx="18" cy="12" r="1.2" />
              <circle cx="6" cy="18" r="1.2" />
              <circle cx="12" cy="18" r="1.2" />
              <circle cx="18" cy="18" r="1.2" />
            </g>
          </svg>
        </div>
      );
    }

    if (stage.id === "compound") {
      // 03 COMPOUND: Infinity loop energy path, center glow
      return (
        <div className={iconClass}>
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="1.5">
            {/* Infinity loop path */}
            <path d="M 7 12 C 7 9, 11 9, 12 12 C 13 15, 17 15, 17 12 C 17 9, 13 9, 12 12 C 11 15, 7 15, 7 12 Z" />
            {/* Pulsing glow particle traveling the path */}
            {isActive && !shouldReduce && (
              <motion.circle
                cx="12"
                cy="12"
                r="1"
                fill="#d6aa38"
                stroke="none"
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </svg>
        </div>
      );
    }

    if (stage.id === "multiply") {
      // 04 MULTIPLY: Rising chart arrow progression, chart line rise, multiplier pulse
      return (
        <div className={iconClass}>
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="1.5">
            {/* Climbing arrow path */}
            <motion.path
              d="M3 19 L10 12 L14 15 L21 7"
              initial={{ pathLength: 0 }}
              animate={isActive || isCompleted ? { pathLength: 1 } : { pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            {/* Arrowhead */}
            <path d="M17 7 H21 V11" />
            {/* Pulsing multiplier wave */}
            {isActive && !shouldReduce && (
              <motion.circle
                cx="21"
                cy="7"
                r="3"
                stroke="rgba(214,170,56,0.4)"
                animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </svg>
        </div>
      );
    }

    if (stage.id === "dominate") {
      // 05 DOMINATE: Sequential bar chart growth, top bar highlight
      return (
        <div className={iconClass}>
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="1.5">
            {/* Dominating vertical columns */}
            <rect x="4" y="14" width="3" height="6" rx="0.5" />
            <rect x="10.5" y="10" width="3" height="10" rx="0.5" />
            {/* Dominant tallest column animating growth */}
            <motion.rect
              x="17"
              y="6"
              width="3"
              height="14"
              rx="0.5"
              animate={isActive && !shouldReduce ? { height: [10, 14, 10], y: [10, 6, 10] } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </div>
      );
    }

    return null;
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className={cn(
        "flex flex-col items-center p-5 text-center border bg-black/60 backdrop-blur-md transition-all duration-300 w-full md:w-56 hover:bg-[#05080E] rounded-[1px] select-none pointer-events-auto",
        borderColor,
        bgGradient,
        isSelected ? "shadow-[0_0_15px_rgba(214,170,56,0.1)] scale-[1.02]" : "hover:border-white/15"
      )}
      style={{ minHeight: "260px" }}
    >
      {/* Step index number */}
      <span className={cn("text-[9px] font-mono tracking-widest uppercase font-extrabold mb-1", accentColor)}>
        STEP {stage.number}
      </span>

      {/* Stage Name */}
      <h3 className="text-xs font-mono font-bold tracking-widest text-white mb-4">
        {stage.name}
      </h3>

      {/* Icon visualizer container */}
      {renderIcon()}

      {/* Description */}
      <p className="text-[10px] text-white/50 leading-relaxed max-w-[180px] mb-4 text-center line-clamp-3">
        {stage.purpose}
      </p>

      {/* Dynamic Telemetry row */}
      <div className="mt-auto w-full pt-2.5 border-t border-white/5 flex flex-col items-center gap-0.5">
        <span className="text-[8px] font-mono text-white/35 uppercase tracking-wider">LIVE TELEMETRY</span>
        <span className="text-[10px] font-mono font-extrabold text-gold tracking-wide animate-pulse">
          {stage.liveMetric}
        </span>
      </div>
    </button>
  );
}
