"use client";

import { motion } from "framer-motion";

interface Node {
  id: string;
  name: string;
  x: number;
  y: number;
  color: string;
  size: number;
}

interface Edge {
  from: string;
  to: string;
}

const NODES: Node[] = [
  { id: "gamma", name: "Agent-Gamma", x: 26, y: 14, color: "#60a5fa", size: 1.2 },
  { id: "gamod", name: "Agent-Gamod", x: 8, y: 24, color: "#fbbf24", size: 1.2 },
  { id: "m_alpha1", name: "Market-Alpha", x: 44, y: 10, color: "#f87171", size: 1.2 },
  { id: "alpha", name: "Agent Alpha", x: 62, y: 22, color: "#f59e0b", size: 2.2 },
  { id: "pioma", name: "Agent-Pioma", x: 88, y: 13, color: "#60a5fa", size: 1.2 },
  { id: "sigma1", name: "Sentiment-Sigma", x: 82, y: 25, color: "#ec4899", size: 1.2 },
  { id: "sigma2", name: "Sentiment-Sigma", x: 80, y: 38, color: "#ec4899", size: 1.2 },
  { id: "bitra", name: "Agent-Bitra", x: 28, y: 30, color: "#3b82f6", size: 1.2 },
  { id: "aior", name: "Agent-Aior", x: 22, y: 38, color: "#34d399", size: 1.2 },
  { id: "sina", name: "Sentiment-Sina", x: 48, y: 34, color: "#60a5fa", size: 1.2 },
  { id: "m_alpha2", name: "Market-Alpha", x: 36, y: 22, color: "#93c5fd", size: 1.2 },
];

const EDGES: Edge[] = [
  { from: "gamod", to: "gamma" },
  { from: "gamod", to: "bitra" },
  { from: "gamod", to: "aior" },
  { from: "gamma", to: "m_alpha1" },
  { from: "gamma", to: "m_alpha2" },
  { from: "gamma", to: "alpha" },
  { from: "m_alpha1", to: "alpha" },
  { from: "alpha", to: "pioma" },
  { from: "alpha", to: "sigma1" },
  { from: "alpha", to: "sigma2" },
  { from: "alpha", to: "sina" },
  { from: "bitra", to: "aior" },
  { from: "bitra", to: "m_alpha2" },
  { from: "m_alpha2", to: "sina" },
  { from: "sina", to: "sigma2" },
  { from: "sigma2", to: "pioma" },
  { from: "sigma1", to: "pioma" },
];

export function AgentNetwork({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg viewBox="0 0 100 48" className="w-full h-full overflow-visible">
        {/* Connection paths */}
        {EDGES.map((edge, idx) => {
          const fromNode = NODES.find((n) => n.id === edge.from);
          const toNode = NODES.find((n) => n.id === edge.to);
          if (!fromNode || !toNode) return null;

          return (
            <g key={idx}>
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth={0.25}
              />
              {/* Pulsing light sweep on the line */}
              <motion.line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={idx % 3 === 0 ? "#f59e0b" : idx % 3 === 1 ? "#3b82f6" : "#ec4899"}
                strokeWidth={0.4}
                opacity={0.5}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 0] }}
                transition={{
                  duration: 2.5 + (idx % 3) * 0.7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </g>
          );
        })}

        {/* Nodes */}
        {NODES.map((node) => (
          <g key={node.id}>
            {/* Luminous outer glow ring */}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size * 2.2}
              fill="none"
              stroke={node.color}
              strokeWidth={0.2}
              opacity={0.3}
              className="animate-pulse"
            />
            {/* Core dot */}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size * 0.8}
              fill={node.color}
              style={{ filter: `drop-shadow(0 0 2px ${node.color})` }}
            />

            {/* Label */}
            <text
              x={node.x}
              y={node.y - node.size - 1.2}
              fill="rgba(255, 255, 255, 0.55)"
              fontSize={1.8}
              fontFamily="monospace"
              textAnchor="middle"
              className="font-mono tracking-wider font-bold select-none"
            >
              {node.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
