"use client";

import { useId, useMemo } from "react";
import { motion } from "framer-motion";

interface MiniLineChartProps {
  data: number[];
  color?: string;
  className?: string;
}

export function MiniLineChart({ data, color = "#d6aa38", className }: MiniLineChartProps) {
  const gradId = useId();
  
  const points = useMemo(() => {
    if (!data || data.length < 2) return [];
    
    const width = 120;
    const height = 40;
    const padding = 2;
    
    const minVal = Math.min(...data);
    const maxVal = Math.max(...data);
    const range = maxVal - minVal === 0 ? 1 : maxVal - minVal;
    
    return data.map((val, idx) => {
      const x = (idx / (data.length - 1)) * (width - padding * 2) + padding;
      // Invert Y so higher value is higher up
      const y = height - ((val - minVal) / range) * (height - padding * 2) - padding;
      return { x, y };
    });
  }, [data]);

  const pathD = useMemo(() => {
    if (points.length < 2) return "";
    return points.reduce((acc, pt, idx) => {
      if (idx === 0) return `M ${pt.x} ${pt.y}`;
      return `${acc} L ${pt.x} ${pt.y}`;
    }, "");
  }, [points]);

  const areaD = useMemo(() => {
    if (points.length < 2) return "";
    const first = points[0];
    const last = points[points.length - 1];
    return `${pathD} L ${last.x} 40 L ${first.x} 40 Z`;
  }, [points, pathD]);

  if (points.length < 2) {
    return <div className="h-10 flex items-center justify-center text-[8px] font-mono text-white/30">NO DATA</div>;
  }

  return (
    <div className={className}>
      <svg
        viewBox="0 0 120 40"
        preserveAspectRatio="none"
        className="w-full h-full overflow-hidden"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Glow Shadow Area */}
        <path d={areaD} fill={`url(#${gradId})`} />
        
        {/* Glowing signal line */}
        <motion.path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: `drop-shadow(0 0 2px ${color}88)` }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        
        {/* Pulse indicator at the end */}
        <circle
          cx={points[points.length - 1].x}
          cy={points[points.length - 1].y}
          r={1.5}
          fill={color}
          className="animate-pulse"
        />
      </svg>
    </div>
  );
}
