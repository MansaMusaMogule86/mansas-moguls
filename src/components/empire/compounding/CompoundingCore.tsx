"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CompoundingCoreProps {
  status: "idle" | "running" | "complete";
  onClick: () => void;
}

export function CompoundingCore({ status, onClick }: CompoundingCoreProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex flex-col items-center gap-2 mt-8 select-none">
      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        disabled={status === "running"}
        className={cn(
          "w-12 h-12 rounded-full border bg-black/80 flex items-center justify-center cursor-pointer transition-all duration-500 relative outline-none focus-visible:ring-1 focus-visible:ring-gold",
          status === "running"
            ? "border-emerald/40 text-emerald shadow-[0_0_12px_rgba(16,185,129,0.3)] animate-pulse"
            : status === "complete"
            ? "border-emerald text-emerald shadow-[0_0_15px_rgba(16,185,129,0.4)]"
            : "border-gold/30 text-gold hover:border-gold hover:shadow-[0_0_15px_rgba(214,170,56,0.35)]"
        )}
      >
        <span className="font-heading font-extrabold text-[13px] tracking-wider">MM</span>
      </button>

      {/* Status label under core */}
      <div className="h-6">
        {status === "running" ? (
          <span className="text-[8px] font-mono tracking-widest text-emerald uppercase font-bold animate-pulse">
            COMPOUNDING CYCLE RUNNING
          </span>
        ) : status === "complete" ? (
          <span className="text-[8px] font-mono tracking-widest text-emerald uppercase font-bold">
            COMPOUNDING CYCLE COMPLETE
          </span>
        ) : hovered ? (
          <span className="text-[8px] font-mono tracking-widest text-gold uppercase font-bold">
            COMPOUNDING ENGINE READY
          </span>
        ) : (
          <span className="text-[8px] font-mono tracking-widest text-white/30 uppercase font-bold">
            COMPOUNDING ENGINE
          </span>
        )}
      </div>
    </div>
  );
}
