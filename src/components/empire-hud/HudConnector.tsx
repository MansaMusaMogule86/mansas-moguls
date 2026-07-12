"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HudConnectorProps {
  className?: string;
  type?: "horizontal" | "vertical" | "angled";
  active?: boolean;
}

export function HudConnector({ className, type = "horizontal", active = true }: HudConnectorProps) {
  return (
    <div
      className={cn(
        "absolute pointer-events-none z-0",
        type === "horizontal" && "h-[1px] w-full",
        type === "vertical" && "w-[1px] h-full",
        type === "angled" && "w-10 h-10",
        className
      )}
    >
      {type === "horizontal" && (
        <div className="relative w-full h-full flex items-center">
          <div className="w-full h-[1px] bg-purple-500/20" />
          {active && (
            <motion.div
              className="absolute h-[1.5px] w-1/3 bg-gradient-to-r from-transparent via-purple-400 to-transparent"
              style={{ filter: "drop-shadow(0 0 2px #a855f7)" }}
              animate={{ x: ["-100%", "300%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          )}
        </div>
      )}

      {type === "vertical" && (
        <div className="relative w-full h-full flex justify-center">
          <div className="h-full w-[1px] bg-purple-500/20" />
          {active && (
            <motion.div
              className="absolute w-[1.5px] h-1/3 bg-gradient-to-b from-transparent via-purple-400 to-transparent"
              style={{ filter: "drop-shadow(0 0 2px #a855f7)" }}
              animate={{ y: ["-100%", "300%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          )}
        </div>
      )}

      {type === "angled" && (
        <svg viewBox="0 0 40 40" className="w-full h-full">
          <path
            d="M 0 0 L 20 20 L 40 20"
            fill="none"
            stroke="rgba(168, 85, 247, 0.2)"
            strokeWidth={1}
          />
          {active && (
            <motion.path
              d="M 0 0 L 20 20 L 40 20"
              fill="none"
              stroke="#a855f7"
              strokeWidth={1.5}
              style={{ filter: "drop-shadow(0 0 2px #a855f7)" }}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </svg>
      )}
    </div>
  );
}
