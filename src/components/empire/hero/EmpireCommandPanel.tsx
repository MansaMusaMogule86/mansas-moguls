"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export interface CommandPanelProps {
  id: string;
  title: string;
  type: string;
  content?: string;
  items?: string[];
  metrics?: { label: string; value: string }[];
  accent: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  mousePosition: { x: number; y: number };
  delay: number;
}

export function EmpireCommandPanel({
  title,
  type,
  content,
  items,
  metrics,
  accent,
  position,
  mousePosition,
  delay
}: CommandPanelProps) {
  const shouldReduceMotion = useReducedMotion();
  
  // Subtle parallax effect based on mouse position
  const parallaxX = shouldReduceMotion ? 0 : (mousePosition.x - 0.5) * 15;
  const parallaxY = shouldReduceMotion ? 0 : (mousePosition.y - 0.5) * 15;
  const rotateY = shouldReduceMotion ? 0 : (mousePosition.x - 0.5) * 3;
  const rotateX = shouldReduceMotion ? 0 : -(mousePosition.y - 0.5) * 3;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={
        shouldReduceMotion 
          ? { opacity: 1, scale: 1 }
          : { 
              opacity: 1, 
              scale: 1, 
              y: ["-5px", "5px"], 
              transition: { 
                duration: 4 + delay, 
                repeat: Infinity, 
                repeatType: "reverse", 
                ease: "easeInOut" 
              } 
            }
      }
      transition={{ duration: 1, delay }}
      className="hidden lg:flex flex-col z-30"
      style={{
        ...position,
        x: parallaxX,
        y: parallaxY,
        rotateX,
        rotateY,
        transformPerspective: 1000
      }}
    >
      <div 
        className="group relative w-64 p-5 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden cursor-default transition-colors duration-300 hover:bg-black/60 hover:border-white/20"
      >
        {/* Hover Internal Light */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
          style={{ background: `radial-gradient(circle at center, ${accent} 0%, transparent 70%)` }}
        />

        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
          <h4 className="text-[10px] font-mono tracking-widest text-white/50 uppercase">
            {title}
          </h4>
        </div>

        {/* Content based on type */}
        {type === "info" && content && (
          <p className="text-sm text-white/80 leading-relaxed font-sans group-hover:text-white transition-colors">
            {content}
          </p>
        )}

        {type === "list" && items && (
          <ul className="flex flex-col gap-2">
            {items.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-white/80 group-hover:text-white transition-colors">
                <span className="w-1 h-1 bg-white/20 rounded-full group-hover:bg-white/40" />
                {item}
              </li>
            ))}
          </ul>
        )}

        {type === "metrics" && metrics && (
          <div className="flex flex-col gap-3">
            {metrics.map((metric, i) => (
              <div key={i} className="flex justify-between items-baseline border-b border-white/5 pb-1 last:border-0 last:pb-0">
                <span className="text-[10px] font-mono text-white/40">{metric.label}</span>
                <span className="text-sm font-bold font-mono group-hover:text-white transition-colors" style={{ color: accent }}>
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
