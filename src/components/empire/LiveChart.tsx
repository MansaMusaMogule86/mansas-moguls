"use client";

import { useEffect, useMemo, useRef, useId } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

const VH = 40;
const VW = 100;

/** Catmull-Rom → cubic bezier smoothing for an organic line. */
function smoothPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`;
  }
  return d;
}

/**
 * Continuously scrolling health chart. Draws left→right on mount, then slides
 * one step left as each new point arrives. Memoized path math; reduced motion
 * renders a static line.
 */
export function LiveChart({
  data,
  accent = "#11d98a",
  reducedMotion = false,
}: {
  data: number[];
  accent?: string;
  reducedMotion?: boolean;
}) {
  const gradId = useId();
  const n = data.length;
  const step = VW / (n - 1);
  const x = useMotionValue(0);
  const first = useRef(true);

  const { line, area, head } = useMemo(() => {
    const pts = data.map((v, i) => ({ x: i * step, y: VH - (v / 100) * VH }));
    const linePath = smoothPath(pts);
    const areaPath = `${linePath} L ${pts[pts.length - 1].x},${VH} L ${pts[0].x},${VH} Z`;
    return { line: linePath, area: areaPath, head: pts[pts.length - 1] };
  }, [data, step]);

  // Slide left by one step on each new data point.
  useEffect(() => {
    if (reducedMotion) return;
    if (first.current) {
      first.current = false;
      return;
    }
    x.set(step);
    const controls = animate(x, 0, { duration: 0.9, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [data, step, x, reducedMotion]);

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="none" className="h-full w-full overflow-hidden">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.28" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.g style={reducedMotion ? undefined : { x }}>
        <path d={area} fill={`url(#${gradId})`} />
        <motion.path
          d={line}
          fill="none"
          stroke={accent}
          strokeWidth={1.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: `drop-shadow(0 0 3px ${accent}88)` }}
          initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <circle cx={head.x} cy={head.y} r={1.6} fill={accent} style={{ filter: `drop-shadow(0 0 4px ${accent})` }} />
        {!reducedMotion && (
          <circle cx={head.x} cy={head.y} r={1.6} fill="none" stroke={accent} strokeWidth={0.5} className="cmd-breathe" style={{ color: accent }} />
        )}
      </motion.g>
    </svg>
  );
}
