"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface HudTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  side?: "top" | "bottom" | "left" | "right";
}

export function HudTooltip({ content, children, className, side = "top" }: HudTooltipProps) {
  const [visible, setVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2.5",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2.5",
    left: "right-full top-1/2 -translate-y-1/2 mr-2.5",
    right: "left-full top-1/2 -translate-y-1/2 ml-2.5",
  }[side];

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-gold/40 border-x-transparent border-b-transparent border-t-4 border-x-4 border-b-0",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-gold/40 border-x-transparent border-t-transparent border-b-4 border-x-4 border-t-0",
    left: "left-full top-1/2 -translate-y-1/2 border-l-gold/40 border-y-transparent border-r-transparent border-l-4 border-y-4 border-r-0",
    right: "right-full top-1/2 -translate-y-1/2 border-r-gold/40 border-y-transparent border-l-transparent border-r-4 border-y-4 border-l-0",
  }[side];

  const clipPath = "polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)";

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn("absolute z-50 pointer-events-none min-w-[120px] max-w-[220px]", positionClasses)}
          >
            {/* Outline Box */}
            <div
              className="border border-gold/40 bg-[#03050A]/95 p-2 shadow-[0_0_15px_rgba(214,170,56,0.25)] flex flex-col gap-0.5"
              style={{ clipPath }}
            >
              <div className="text-[8.5px] font-mono text-white/80 leading-relaxed text-left uppercase tracking-wider">
                {content}
              </div>
            </div>
            {/* Arrow */}
            <div className={cn("absolute w-0 h-0 border-solid", arrowClasses)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
