"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HudButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "gold" | "purple" | "emerald" | "blue" | "pink" | "orange" | "default";
  className?: string;
}

export function HudButton({
  children,
  variant = "default",
  className,
  ...props
}: HudButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const angledClipPath = "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)";

  const variantStyles = {
    default: {
      border: "border-white/10 hover:border-white/30",
      text: "text-white/70 hover:text-white",
      glow: "hover:shadow-[0_0_12px_rgba(255,255,255,0.05)]",
      sweep: "from-white/15",
      bg: "bg-white/5",
    },
    gold: {
      border: "border-gold/30 hover:border-gold/60",
      text: "text-gold/80 hover:text-gold-bright",
      glow: "hover:shadow-[0_0_15px_rgba(214,170,56,0.2)]",
      sweep: "from-gold/25",
      bg: "bg-gold/5",
    },
    purple: {
      border: "border-purple-400/30 hover:border-purple-400/60",
      text: "text-purple-400/80 hover:text-purple-300",
      glow: "hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]",
      sweep: "from-purple-500/25",
      bg: "bg-purple-500/5",
    },
    emerald: {
      border: "border-emerald/30 hover:border-emerald/60",
      text: "text-emerald/80 hover:text-emerald-bright",
      glow: "hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]",
      sweep: "from-emerald/25",
      bg: "bg-emerald/5",
    },
    blue: {
      border: "border-electric-blue/30 hover:border-electric-blue/60",
      text: "text-electric-blue/80 hover:text-blue-300",
      glow: "hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]",
      sweep: "from-electric-blue/25",
      bg: "bg-electric-blue/5",
    },
    pink: {
      border: "border-pink-500/30 hover:border-pink-500/60",
      text: "text-pink-500/80 hover:text-pink-300",
      glow: "hover:shadow-[0_0_15px_rgba(236,72,153,0.2)]",
      sweep: "from-pink-500/25",
      bg: "bg-pink-500/5",
    },
    orange: {
      border: "border-orange-400/30 hover:border-orange-400/60",
      text: "text-orange-400/80 hover:text-orange-300",
      glow: "hover:shadow-[0_0_15px_rgba(251,146,60,0.2)]",
      sweep: "from-orange-400/25",
      bg: "bg-orange-400/5",
    },
  }[variant] || {
    border: "border-white/10 hover:border-white/30",
    text: "text-white/70 hover:text-white",
    glow: "hover:shadow-[0_0_12px_rgba(255,255,255,0.05)]",
    sweep: "from-white/15",
    bg: "bg-white/5",
  };

  return (
    <button
      className={cn(
        "group/hudbtn relative h-9 w-full flex items-center justify-center overflow-hidden font-mono text-[9px] uppercase tracking-[0.2em] transition-all duration-300 bg-black/40 backdrop-blur-md outline-none focus-visible:ring-1 focus-visible:ring-gold/60 border select-none cursor-pointer",
        variantStyles.border,
        variantStyles.text,
        variantStyles.glow,
        variantStyles.bg,
        className
      )}
      style={{ clipPath: angledClipPath }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Laser/shimmer sweep animation */}
      <motion.span
        className={cn(
          "pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r via-transparent to-transparent opacity-65",
          variantStyles.sweep
        )}
        initial={{ x: "-100%" }}
        animate={isHovered ? { x: "300%" } : { x: "-100%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      <span className="relative z-10 flex items-center gap-1.5 font-bold">
        {children}
      </span>
    </button>
  );
}
