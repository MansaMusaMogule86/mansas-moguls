"use client";

import { motion } from "framer-motion";

interface Node {
  id: string;
  name: string;
  x: number;
  y: number;
}

interface Path {
  from: string;
  to: string;
}

const NODES: Node[] = [
  { id: "ny", name: "NYC", x: 25, y: 15 },
  { id: "ld", name: "LDN", x: 45, y: 12 },
  { id: "db", name: "DXB", x: 60, y: 20 },
  { id: "sg", name: "SIN", x: 75, y: 28 },
  { id: "tk", name: "TYO", x: 88, y: 14 },
];

const PATHS: Path[] = [
  { from: "ny", to: "ld" },
  { from: "ld", to: "db" },
  { from: "db", to: "sg" },
  { from: "sg", to: "tk" },
  { from: "tk", to: "ny" },
];

export function WorldMapNetwork({ color = "#d6aa38", className }: { color?: string; className?: string }) {
  return (
    <div className={className}>
      <svg viewBox="0 0 100 40" className="w-full h-full opacity-65">
        {/* Draw connections */}
        {PATHS.map((p, idx) => {
          const fromNode = NODES.find((n) => n.id === p.from);
          const toNode = NODES.find((n) => n.id === p.to);
          if (!fromNode || !toNode) return null;

          // Curve logic: draw curved paths
          const dx = toNode.x - fromNode.x;
          const dy = toNode.y - fromNode.y;
          const cx = (fromNode.x + toNode.x) / 2;
          const cy = (fromNode.y + toNode.y) / 2 - 5; // offset upward for curve

          return (
            <g key={idx}>
              <path
                d={`M ${fromNode.x} ${fromNode.y} Q ${cx} ${cy} ${toNode.x} ${toNode.y}`}
                fill="none"
                stroke={color}
                strokeWidth={0.25}
                strokeDasharray="1 1"
                opacity={0.3}
              />
              
              {/* Transit energy packet */}
              <motion.circle
                r={0.4}
                fill="#a855f7" // Purple accent color for energy paths
                style={{ filter: "drop-shadow(0 0 1px #a855f7)" }}
                initial={{ offset: 0 }}
                animate={{
                  cx: [fromNode.x, cx, toNode.x],
                  cy: [fromNode.y, cy, toNode.y],
                }}
                transition={{
                  duration: 2.5 + idx * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </g>
          );
        })}

        {/* Draw nodes */}
        {NODES.map((n) => (
          <g key={n.id}>
            <circle
              cx={n.x}
              cy={n.y}
              r={0.7}
              fill={color}
              className="animate-pulse"
              style={{ filter: `drop-shadow(0 0 1px ${color})` }}
            />
            <circle
              cx={n.x}
              cy={n.y}
              r={1.8}
              fill="none"
              stroke={color}
              strokeWidth={0.1}
              opacity={0.3}
            />
            <text
              x={n.x}
              y={n.y - 2.5}
              fill="rgba(255,255,255,0.4)"
              fontSize={1.8}
              fontFamily="monospace"
              textAnchor="middle"
              className="uppercase tracking-[0.15em] font-mono font-bold"
            >
              {n.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
