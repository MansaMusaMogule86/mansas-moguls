"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PanelId } from "./hero.types";
import { useState } from "react";
import { Terminal, Shield, Cpu, RefreshCw, CheckCircle2 } from "lucide-react";

interface SatellitePanelProps {
  id: PanelId;
  title: string;
  accent: string;
  position: { top?: string; left?: string; bottom?: string; right?: string };
  status?: string;
  metrics?: { label: string; value: string }[];
  items?: string[];
  description?: string;
  onClick: (id: PanelId) => void;
  active: boolean;
  onHover?: (id: PanelId | null) => void;
  hoveredPillar?: string | null;
  onHoverPillar?: (pillarName: string | null) => void;
  mousePosition: { x: number; y: number };
  delay: number;
}

export function EmpireSatellitePanel({
  id,
  title,
  accent,
  position,
  status = "ONLINE",
  metrics,
  items,
  description,
  onClick,
  active,
  onHover,
  hoveredPillar,
  onHoverPillar,
  mousePosition,
  delay,
}: SatellitePanelProps) {
  const shouldReduceMotion = useReducedMotion();
  const [internalHover, setInternalHover] = useState(false);

  // Parallax calculations
  const parallaxX = shouldReduceMotion ? 0 : (mousePosition.x - 0.5) * 12;
  const parallaxY = shouldReduceMotion ? 0 : (mousePosition.y - 0.5) * 12;

  const handleMouseEnter = () => {
    setInternalHover(true);
    if (onHover) onHover(id);
  };

  const handleMouseLeave = () => {
    setInternalHover(false);
    if (onHover) onHover(null);
  };

  // Explanation map for Core Pillars
  const pillarExplanations: Record<string, string> = {
    Intelligence: "Decentralized signal processing and predictive analytics.",
    Capital: "Universal compounding engine and quantitative liquidity deployment.",
    Technology: "Autonomous agents, serverless pipelines, and LLM nodes.",
    Distribution: "Global network leverage, proprietary channels, and media scaling.",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={
        shouldReduceMotion
          ? { opacity: 1, scale: 1 }
          : {
              opacity: 1,
              scale: 1,
              y: ["-3px", "3px"],
              transition: {
                duration: 4.5 + delay,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }
      }
      style={{
        ...position,
        x: parallaxX,
        y: parallaxY,
      }}
      className={cn(
        "absolute w-64 p-4 md:p-5 border bg-black/60 backdrop-blur-md transition-all duration-300 pointer-events-auto select-none rounded-[1px]",
        active || internalHover ? "border-gold/45 shadow-[0_0_20px_rgba(214,170,56,0.15)]" : "border-white/5 hover:border-white/15"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Sci-fi layered border corner mark */}
      <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-gold/40 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-gold/40 pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-3.5 pb-1.5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: accent }} />
          <h4 className="text-[10px] font-mono tracking-[0.2em] font-extrabold text-white/55 uppercase">
            {title}
          </h4>
        </div>
        <span className="text-[8px] font-mono text-white/30 font-bold uppercase tracking-widest">
          {status}
        </span>
      </div>

      {/* MISSION CARD */}
      {id === "mission" && description && (
        <div className="space-y-3 cursor-pointer" onClick={() => onClick(id)}>
          <p className="text-xs text-white/70 font-sans leading-relaxed text-left">
            {description}
          </p>
          <div className="text-[8.5px] font-mono text-gold/80 hover:text-gold-bright tracking-widest uppercase font-bold flex items-center gap-1">
            <span>Access Strategy Vault</span>
            <span className="text-xs">→</span>
          </div>
        </div>
      )}

      {/* SYSTEM STATUS CARD */}
      {id === "status" && (
        <div className="space-y-2.5 cursor-pointer" onClick={() => onClick(id)}>
          <div className="grid grid-cols-2 gap-2 text-left">
            <div className="flex flex-col bg-white/[0.02] border border-white/5 p-1.5 rounded-sm">
              <span className="text-[7.5px] font-mono text-white/30 uppercase tracking-widest">Uptime</span>
              <span className="text-xs font-mono font-bold text-emerald">99.9%</span>
            </div>
            <div className="flex flex-col bg-white/[0.02] border border-white/5 p-1.5 rounded-sm">
              <span className="text-[7.5px] font-mono text-white/30 uppercase tracking-widest">Nodes</span>
              <span className="text-xs font-mono font-bold text-white">12,408</span>
            </div>
            <div className="flex flex-col bg-white/[0.02] border border-white/5 p-1.5 rounded-sm col-span-2">
              <span className="text-[7.5px] font-mono text-white/30 uppercase tracking-widest">AI Agent Load</span>
              <span className="text-xs font-mono font-bold text-gold">ACTIVE / OPTIMIZED</span>
            </div>
          </div>
          <div className="text-[8px] font-mono text-white/30 flex items-center justify-between border-t border-white/5 pt-2">
            <span>Last Sync: 1s ago</span>
            <span className="w-1.5 h-1.5 bg-emerald rounded-full animate-pulse" />
          </div>
        </div>
      )}

      {/* CORE PILLARS CARD */}
      {id === "pillars" && items && (
        <div className="space-y-3">
          <div className="flex flex-col gap-1.5">
            {items.map((item) => (
              <div
                key={item}
                className={cn(
                  "flex items-center justify-between py-1 px-2 border rounded-sm text-[10px] font-mono tracking-wide cursor-pointer transition-all",
                  hoveredPillar === item
                    ? "bg-gold/5 border-gold/40 text-gold-bright shadow-[0_0_8px_rgba(214,170,56,0.1)]"
                    : "bg-[#05070B] border-white/5 text-white/70 hover:border-white/20 hover:text-white"
                )}
                onMouseEnter={() => onHoverPillar?.(item)}
                onMouseLeave={() => onHoverPillar?.(null)}
                onClick={() => onClick(id)}
              >
                <span>{item}</span>
                <span className="opacity-40">→</span>
              </div>
            ))}
          </div>
          {hoveredPillar && pillarExplanations[hoveredPillar] && (
            <motion.div
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[8.5px] text-gold/80 font-mono leading-relaxed bg-gold/[0.02] border border-gold/15 p-2 rounded-sm text-left"
            >
              {pillarExplanations[hoveredPillar]}
            </motion.div>
          )}
        </div>
      )}

      {/* PORTFOLIO OVERVIEW CARD */}
      {id === "portfolio" && (
        <div className="space-y-3 cursor-pointer" onClick={() => onClick(id)}>
          <div className="grid grid-cols-2 gap-2 text-left">
            <div className="flex flex-col border border-white/5 bg-[#05070B] p-1.5 rounded-sm">
              <span className="text-[7.5px] font-mono text-white/30 uppercase tracking-widest">Total AUM</span>
              <span className="text-xs font-mono font-bold text-white">$1.28B+</span>
            </div>
            <div className="flex flex-col border border-white/5 bg-[#05070B] p-1.5 rounded-sm">
              <span className="text-[7.5px] font-mono text-white/30 uppercase tracking-widest">Companies</span>
              <span className="text-xs font-mono font-bold text-white">24</span>
            </div>
            <div className="flex flex-col border border-white/5 bg-[#05070B] p-1.5 rounded-sm col-span-2">
              <span className="text-[7.5px] font-mono text-white/30 uppercase tracking-widest">Growth Velocity</span>
              <span className="text-xs font-mono font-bold text-emerald">+24.6% YOY</span>
            </div>
          </div>
          <div className="text-[8.5px] font-mono text-white/40 uppercase tracking-widest font-bold flex justify-between border-t border-white/5 pt-2">
            <span>Explore Ventures</span>
            <span>→</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
