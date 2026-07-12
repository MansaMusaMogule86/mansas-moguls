"use client";

import { motion } from "framer-motion";

export function EmpireSignalLine({
  id,
  active,
  hovered,
}: {
  id: string;
  active: boolean;
  hovered: boolean;
}) {
  // Draw distinct angled paths based on panel ID.
  // Center MM Core is located around (50, 24) on the 100x100 grid.
  let d = "";
  let color = "rgba(255, 255, 255, 0.05)";
  let strokeWidth = 0.35;

  if (id === "mission") {
    // Top-Left (Mission) starting around (18, 16) going to core
    d = "M 18,17 H 36 L 43,23 H 47";
    if (active || hovered) {
      color = "#d6aa38";
      strokeWidth = 0.5;
    }
  } else if (id === "pillars") {
    // Bottom-Left (Pillars) starting around (18, 59) going to core
    d = "M 18,60 H 34 L 42,38 V 26 H 47";
    if (active || hovered) {
      color = "#3b82f6";
      strokeWidth = 0.5;
    }
  } else if (id === "status") {
    // Top-Right (System Status) starting around (82, 26) going to core
    d = "M 82,26 H 64 L 57,23 H 53";
    if (active || hovered) {
      color = "#10b981";
      strokeWidth = 0.5;
    }
  } else if (id === "portfolio") {
    // Bottom-Right (Portfolio) starting around (82, 54) going to core
    d = "M 82,56 H 66 L 58,38 V 26 H 53";
    if (active || hovered) {
      color = "#a855f7";
      strokeWidth = 0.5;
    }
  }

  return (
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden lg:block" 
      viewBox="0 0 100 100" 
      preserveAspectRatio="none"
    >
      {/* Background static connector line */}
      <path 
        d={d} 
        fill="none" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        className="transition-colors duration-500" 
      />

      {/* Energy signal pulse overlay */}
      {(active || hovered) && (
        <motion.path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth * 1.5}
          style={{ filter: `drop-shadow(0 0 2px ${color})` }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </svg>
  );
}
