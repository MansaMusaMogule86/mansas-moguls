"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HudPanelProps {
  children: React.ReactNode;
  colSpan?: string;
  heightClass?: string;
  color?: "gold" | "purple" | "emerald" | "blue" | "pink" | "orange";
  glow?: boolean;
  className?: string;
  onClick?: () => void;
}

export function HudPanel({
  children,
  colSpan = "col-span-12",
  heightClass = "min-h-[300px]",
  color = "gold",
  glow = true,
  className,
  onClick,
}: HudPanelProps) {
  const angledClipPath = "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)";

  const colorStyles = {
    gold: {
      border: "border-gold/30 group-hover:border-gold/60",
      glow: "hover:shadow-[0_0_30px_rgba(214,170,56,0.15)]",
      cornerColor: "bg-gold/40",
      bgGradient: "group-hover:from-gold/5",
    },
    purple: {
      border: "border-purple-400/30 group-hover:border-purple-400/60",
      glow: "hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
      cornerColor: "bg-purple-400/40",
      bgGradient: "group-hover:from-purple-500/5",
    },
    emerald: {
      border: "border-emerald/30 group-hover:border-emerald/60",
      glow: "hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
      cornerColor: "bg-emerald/40",
      bgGradient: "group-hover:from-emerald/5",
    },
    blue: {
      border: "border-electric-blue/30 group-hover:border-electric-blue/60",
      glow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
      cornerColor: "bg-electric-blue/40",
      bgGradient: "group-hover:from-electric-blue/5",
    },
    pink: {
      border: "border-pink-500/30 group-hover:border-pink-500/60",
      glow: "hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]",
      cornerColor: "bg-pink-500/40",
      bgGradient: "group-hover:from-pink-500/5",
    },
    orange: {
      border: "border-orange-400/30 group-hover:border-orange-400/60",
      glow: "hover:shadow-[0_0_30px_rgba(251,146,60,0.15)]",
      cornerColor: "bg-orange-400/40",
      bgGradient: "group-hover:from-orange-400/5",
    },
  }[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onClick={onClick}
      className={cn(
        "group relative w-full flex flex-col justify-between overflow-hidden bg-[#05070B] border backdrop-blur-md transition-all duration-500 select-none",
        onClick && "cursor-pointer hover:-translate-y-0.5",
        colSpan,
        heightClass,
        colorStyles.border,
        glow && colorStyles.glow,
        className
      )}
      style={{ clipPath: angledClipPath }}
    >
      {/* HUD grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:1rem_1rem] pointer-events-none" />
      
      {/* Subdued color radial gradient on hover */}
      <div className={cn(
        "absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_70%_60%,rgba(0,0,0,0)_60%,var(--tw-gradient-stops))] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700",
        colorStyles.bgGradient
      )} />

      {/* Layered Inner Frame (Double outline border offset) */}
      <div
        className="absolute inset-[3px] border border-white/5 pointer-events-none"
        style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}
      />

      {/* Decorative sci-fi corners */}
      <div className={cn("absolute top-0 left-0 w-2 h-[1px]", colorStyles.cornerColor)} />
      <div className={cn("absolute top-0 left-0 w-[1px] h-2", colorStyles.cornerColor)} />
      <div className={cn("absolute bottom-0 right-0 w-2 h-[1px]", colorStyles.cornerColor)} />
      <div className={cn("absolute bottom-0 right-0 w-[1px] h-2", colorStyles.cornerColor)} />

      {/* Content wrapper */}
      <div className="relative z-10 p-5 flex flex-col h-full justify-between">
        {children}
      </div>
    </motion.div>
  );
}
