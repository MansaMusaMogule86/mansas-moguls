"use client";

import { motion, useReducedMotion } from "framer-motion";

export function EmpireOrbitSystem({ hoveredPillar }: { hoveredPillar: string | null }) {
  const shouldReduce = useReducedMotion();

  return (
    <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
      <svg className="w-full h-full opacity-45" viewBox="0 0 600 600">
        <defs>
          <radialGradient id="orbitGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d6aa38" stopOpacity="0.05" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient background glow */}
        <circle cx="300" cy="300" r="280" fill="url(#orbitGlow)" />

        {/* Orbit 1: Outer Ellipse (Dotted Gold) */}
        <circle
          cx="300"
          cy="300"
          r="240"
          fill="none"
          stroke="rgba(214, 170, 56, 0.15)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />

        {/* Orbit 2: Mid Ellipse (Solid Blue/Indigo) */}
        <circle
          cx="300"
          cy="300"
          r="180"
          fill="none"
          stroke="rgba(59, 130, 246, 0.12)"
          strokeWidth="1"
        />

        {/* Partial Arc Segments */}
        <path
          d="M 120 300 A 180 180 0 0 1 300 120"
          fill="none"
          stroke="rgba(214, 170, 56, 0.25)"
          strokeWidth="1.5"
          strokeDasharray="20 40 10 90"
        />
        <path
          d="M 480 300 A 180 180 0 0 1 300 480"
          fill="none"
          stroke="rgba(168, 85, 247, 0.25)"
          strokeWidth="1.5"
          strokeDasharray="30 80 50 120"
        />

        {/* Orbit 3: Inner Ellipse (Golden rings) */}
        <circle
          cx="300"
          cy="300"
          r="120"
          fill="none"
          stroke="rgba(214, 170, 56, 0.15)"
          strokeWidth="0.75"
        />

        {/* Rotating SVG Nodes */}
        {!shouldReduce && (
          <>
            {/* Outer Gold Node */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
              style={{ originX: "300px", originY: "300px" }}
            >
              <circle cx="300" cy="60" r="3.5" fill="#d6aa38" style={{ filter: "drop-shadow(0 0 4px #d6aa38)" }} />
            </motion.g>

            {/* Mid Blue Node */}
            <motion.g
              animate={{ rotate: -360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              style={{ originX: "300px", originY: "300px" }}
            >
              <circle cx="300" cy="120" r="3" fill="#3b82f6" style={{ filter: "drop-shadow(0 0 4px #3b82f6)" }} />
              <circle cx="120" cy="300" r="2" fill="#ffffff" />
            </motion.g>

            {/* Inner Purple Node */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              style={{ originX: "300px", originY: "300px" }}
            >
              <circle cx="300" cy="180" r="2.5" fill="#a855f7" style={{ filter: "drop-shadow(0 0 4px #a855f7)" }} />
            </motion.g>
          </>
        )}

        {/* Highlight ring for active pillars */}
        {hoveredPillar && (
          <motion.circle
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.25 }}
            cx="300"
            cy="300"
            r="150"
            fill="none"
            stroke={hoveredPillar === "Capital" ? "#d6aa38" : hoveredPillar === "Technology" ? "#3b82f6" : "#a855f7"}
            strokeWidth="3"
            style={{ filter: "blur(2px)" }}
            transition={{ duration: 0.4 }}
          />
        )}
      </svg>
    </div>
  );
}
