"use client";

import { useEffect, useId, useMemo } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { MAP_NODES, MAP_ROUTES } from "@/data/empireLiveEvents";
import type { ActiveRoute } from "@/types/empire";

const GOLD = "#d6aa38";
const NODE = Object.fromEntries(MAP_NODES.map((n) => [n.id, n]));

function control(x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.hypot(dx, dy);
  return { cx: (x1 + x2) / 2, cy: (y1 + y2) / 2 - dist * 0.22 };
}

/** Gold particle gliding along the active route's arc (keyed → replays). */
function Traveller({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const cx = useMotionValue(x1);
  const cy = useMotionValue(y1);
  const { cx: mx, cy: my } = useMemo(() => control(x1, y1, x2, y2), [x1, y1, x2, y2]);

  useEffect(() => {
    const c = animate(0, 1, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (t) => {
        const q = 1 - t;
        cx.set(q * q * x1 + 2 * q * t * mx + t * t * x2);
        cy.set(q * q * y1 + 2 * q * t * my + t * t * y2);
      },
    });
    return () => c.stop();
  }, [x1, y1, x2, y2, mx, my, cx, cy]);

  return <motion.circle cx={cx} cy={cy} r={0.9} fill={GOLD} style={{ filter: `drop-shadow(0 0 3px ${GOLD})` }} />;
}

export function WorldImpactMap({ activeRoute, reducedMotion = false }: { activeRoute: ActiveRoute | null; reducedMotion?: boolean }) {
  const dotsId = useId();
  const route = activeRoute ? MAP_ROUTES.find((r) => r.id === activeRoute.routeId) : null;
  const from = route ? NODE[route.from] : null;
  const to = route ? NODE[route.to] : null;
  const arc = from && to ? control(from.x, from.y, to.x, to.y) : null;

  return (
    <svg viewBox="0 0 100 60" className="h-full w-full">
      <defs>
        <pattern id={dotsId} width="3" height="3" patternUnits="userSpaceOnUse">
          <circle cx="0.5" cy="0.5" r="0.35" fill={GOLD} opacity="0.12" />
        </pattern>
        <radialGradient id={`${dotsId}-fade`} cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id={`${dotsId}-mask`}>
          <rect width="100" height="60" fill={`url(#${dotsId}-fade)`} />
        </mask>
      </defs>

      {/* Dotted global grid */}
      <rect width="100" height="60" fill={`url(#${dotsId})`} mask={`url(#${dotsId}-mask)`} />

      {/* Faint static routes */}
      {MAP_ROUTES.map((r) => {
        const a = NODE[r.from];
        const b = NODE[r.to];
        const { cx, cy } = control(a.x, a.y, b.x, b.y);
        return (
          <path key={r.id} d={`M ${a.x},${a.y} Q ${cx},${cy} ${b.x},${b.y}`} fill="none" stroke={GOLD} strokeWidth={0.25} opacity={0.12} />
        );
      })}

      {/* Active route highlight + traveller */}
      {route && from && to && arc && !reducedMotion && (
        <g key={activeRoute!.key}>
          <motion.path
            d={`M ${from.x},${from.y} Q ${arc.cx},${arc.cy} ${to.x},${to.y}`}
            fill="none"
            stroke={GOLD}
            strokeWidth={0.5}
            initial={{ pathLength: 0, opacity: 0.9 }}
            animate={{ pathLength: 1, opacity: 0 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Origin + destination pulse rings */}
          <circle cx={from.x} cy={from.y} r={1} fill="none" stroke={GOLD} strokeWidth={0.4} className="cmd-ring" style={{ color: GOLD, transformOrigin: `${from.x}px ${from.y}px` }} />
          <circle cx={to.x} cy={to.y} r={1} fill="none" stroke={GOLD} strokeWidth={0.4} className="cmd-ring" style={{ color: GOLD, transformOrigin: `${to.x}px ${to.y}px`, animationDelay: "1.2s" }} />
          <Traveller x1={from.x} y1={from.y} x2={to.x} y2={to.y} />
        </g>
      )}

      {/* City nodes with independent breathing */}
      {MAP_NODES.map((nd, i) => (
        <g key={nd.id}>
          <circle
            cx={nd.x}
            cy={nd.y}
            r={0.8}
            fill={GOLD}
            className={reducedMotion ? undefined : "cmd-breathe"}
            style={{ color: GOLD, filter: `drop-shadow(0 0 2px ${GOLD})`, animationDelay: `${(i % 5) * 0.6}s` }}
          />
        </g>
      ))}
    </svg>
  );
}
