"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatusPulseProps {
  status?: string;
  className?: string;
  color?: "green" | "gold" | "purple" | "blue" | "pink" | "orange";
}

export function StatusPulse({ status, className, color = "green" }: StatusPulseProps) {
  const colorMap = {
    green: {
      bg: "bg-emerald",
      shadow: "shadow-[0_0_8px_rgba(16,185,129,0.7)]",
      border: "border-emerald/30",
      text: "text-emerald",
    },
    gold: {
      bg: "bg-gold",
      shadow: "shadow-[0_0_8px_rgba(214,170,56,0.7)]",
      border: "border-gold/30",
      text: "text-gold",
    },
    purple: {
      bg: "bg-purple-400",
      shadow: "shadow-[0_0_8px_rgba(192,132,252,0.7)]",
      border: "border-purple-400/30",
      text: "text-purple-400",
    },
    blue: {
      bg: "bg-electric-blue",
      shadow: "shadow-[0_0_8px_rgba(59,130,246,0.7)]",
      border: "border-electric-blue/30",
      text: "text-electric-blue",
    },
    pink: {
      bg: "bg-pink-500",
      shadow: "shadow-[0_0_8px_rgba(236,72,153,0.7)]",
      border: "border-pink-500/30",
      text: "text-pink-500",
    },
    orange: {
      bg: "bg-orange-400",
      shadow: "shadow-[0_0_8px_rgba(251,146,60,0.7)]",
      border: "border-orange-400/30",
      text: "text-orange-400",
    },
  };

  const current = colorMap[color] || colorMap.green;

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <span className="relative flex h-2 w-2">
        <motion.span
          animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className={cn("absolute inline-flex h-full w-full rounded-full opacity-75", current.bg)}
        />
        <span className={cn("relative inline-flex h-2 w-2 rounded-full", current.bg, current.shadow)} />
      </span>
      {status && (
        <span className={cn("text-[9px] font-mono font-bold tracking-widest uppercase", current.text)}>
          {status}
        </span>
      )}
    </div>
  );
}
