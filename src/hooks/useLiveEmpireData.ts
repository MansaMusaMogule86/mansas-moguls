"use client";

/**
 * useLiveEmpireData — the single source of live state for the command center.
 *
 * Manages: live feed, system log, empire health (+ rolling chart), global
 * impact metrics, world-map route activity, elapsed clock, tab visibility and
 * reduced-motion. All randomness runs only after mount (SSR-safe), every timer
 * is cleaned up, and updates pause while the tab is hidden.
 *
 * Mock generators are isolated here so a realtime source (WebSocket / Supabase)
 * can replace them without touching any panel component.
 */

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import {
  FEED_POOL,
  FEED_SEED,
  LOG_POOL,
  LOG_SEED,
  MAP_ROUTES,
} from "@/data/empireLiveEvents";
import type {
  ActiveRoute,
  EmpireHealth,
  EmpireImpact,
  FeedEvent,
  LogEntry,
  ResourceFlow,
  TrendDir,
} from "@/types/empire";

const MAX_ROWS = 5;
const CHART_LEN = 40;
const FLOWS: ResourceFlow[] = ["OPTIMAL", "ELEVATED", "EXPANDING", "STABILIZED"];

/** Deterministic seed series for the chart (no random on first render). */
const SEED_CHART = Array.from({ length: CHART_LEN }, (_, i) =>
  Math.round(58 + 14 * Math.sin(i / 4) + 6 * Math.sin(i / 1.7)),
);

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Recurring timer with a fresh random interval each cycle; pauses when `active` is false. */
function useRandomInterval(
  cb: () => void,
  minMs: number,
  maxMs: number,
  ready: boolean,
  activeRef: React.RefObject<boolean>,
) {
  const saved = useRef(cb);
  saved.current = cb;
  useEffect(() => {
    if (!ready) return;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (activeRef.current) saved.current();
      timer = setTimeout(tick, rand(minMs, maxMs));
    };
    timer = setTimeout(tick, rand(minMs, maxMs));
    return () => clearTimeout(timer);
  }, [ready, minMs, maxMs, activeRef]);
}

export function useLiveEmpireData() {
  const prefersReduced = !!useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const activeRef = useRef(true); // false while tab hidden
  const idRef = useRef(0);
  const nextId = (p: string) => `${p}${(idRef.current += 1)}`;

  // ── Seed state (deterministic; identical on server + first client render) ──
  const [feed, setFeed] = useState<FeedEvent[]>(() =>
    FEED_SEED.map((e, i) => ({ id: `seed-f${i}`, ...e })),
  );
  const [feedPulse, setFeedPulse] = useState(0);

  const [log, setLog] = useState<LogEntry[]>(() =>
    LOG_SEED.map((e, i) => ({ id: `seed-l${i}`, ...e, fresh: false })),
  );
  const [logPulse, setLogPulse] = useState(0);

  const [health, setHealth] = useState<EmpireHealth>(() => ({
    integrity: 99.8,
    network: 98.7,
    resourceFlow: "OPTIMAL",
    integrityTrend: "stable",
    networkTrend: "stable",
    chart: SEED_CHART,
  }));

  const [impact, setImpact] = useState<EmpireImpact>(() => ({
    value: 1.28,
    markets: 42,
    countries: 28,
    assets: 163,
    pulsed: null,
  }));

  const [activeRoute, setActiveRoute] = useState<ActiveRoute | null>(null);
  const routeKey = useRef(0);
  const pulseClear = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Mount + visibility ──
  useEffect(() => {
    setMounted(true);
    const onVis = () => {
      activeRef.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Elapsed clock (drives relative timestamps). Pauses when hidden.
  useEffect(() => {
    if (!mounted) return;
    const t = setInterval(() => {
      if (activeRef.current) setElapsed((e) => e + 1);
    }, 1000);
    return () => clearInterval(t);
  }, [mounted]);

  const elapsedRef = useRef(0);
  elapsedRef.current = elapsed;

  // ── Live Feed: new business event every 6–12s ──
  useRandomInterval(
    () => {
      const t = FEED_POOL[Math.floor(Math.random() * FEED_POOL.length)];
      setFeed((prev) =>
        [{ id: nextId("f"), ...t, bornAt: elapsedRef.current }, ...prev].slice(0, MAX_ROWS),
      );
      setFeedPulse((n) => n + 1);
    },
    6000,
    12000,
    mounted,
    activeRef,
  );

  // ── System Log: new infra event every 8–14s ──
  useRandomInterval(
    () => {
      const t = LOG_POOL[Math.floor(Math.random() * LOG_POOL.length)];
      setLog((prev) =>
        [
          { id: nextId("l"), ...t, bornAt: elapsedRef.current, fresh: true },
          ...prev.map((e) => (e.fresh ? { ...e, fresh: false } : e)),
        ].slice(0, MAX_ROWS),
      );
      setLogPulse((n) => n + 1);
    },
    8000,
    14000,
    mounted,
    activeRef,
  );

  // ── Chart: new health data point every 3–5s ──
  useRandomInterval(
    () => {
      setHealth((h) => {
        const last = h.chart[h.chart.length - 1] ?? 60;
        const next = clamp(last + rand(-7, 7), 34, 94);
        return { ...h, chart: [...h.chart.slice(1), Math.round(next)] };
      });
    },
    3000,
    5000,
    mounted,
    activeRef,
  );

  // ── Health metrics wander every 5–9s ──
  useRandomInterval(
    () => {
      setHealth((h) => {
        const integrity = clamp(h.integrity + rand(-0.15, 0.15), 99.4, 100);
        const network = clamp(h.network + rand(-0.35, 0.35), 97.8, 99.8);
        const flow = Math.random() < 0.25 ? FLOWS[Math.floor(Math.random() * FLOWS.length)] : h.resourceFlow;
        const trend = (a: number, b: number): TrendDir => (a - b > 0.02 ? "up" : "stable");
        return {
          ...h,
          integrityTrend: trend(integrity, h.integrity),
          networkTrend: trend(network, h.network),
          integrity: Math.round(integrity * 10) / 10,
          network: Math.round(network * 10) / 10,
          resourceFlow: flow,
        };
      });
    },
    5000,
    9000,
    mounted,
    activeRef,
  );

  // ── Global impact grows slowly every 15–30s ──
  useRandomInterval(
    () => {
      setImpact((im) => {
        const roll = Math.random();
        const next: EmpireImpact = { ...im, pulsed: "value", value: Math.round((im.value + rand(0.001, 0.004)) * 1000) / 1000 };
        if (roll > 0.55) {
          next.assets = im.assets + Math.floor(rand(1, 4));
          next.pulsed = "assets";
        } else if (roll > 0.9) {
          next.markets = im.markets + 1;
          next.pulsed = "markets";
        } else if (roll > 0.85) {
          next.countries = im.countries + 1;
          next.pulsed = "countries";
        }
        if (pulseClear.current) clearTimeout(pulseClear.current);
        pulseClear.current = setTimeout(() => setImpact((p) => ({ ...p, pulsed: null })), 1300);
        return next;
      });
    },
    15000,
    30000,
    mounted,
    activeRef,
  );

  // ── Map: activate a trade route every 4–7s ──
  useRandomInterval(
    () => {
      const r = MAP_ROUTES[Math.floor(Math.random() * MAP_ROUTES.length)];
      routeKey.current += 1;
      setActiveRoute({ routeId: r.id, key: routeKey.current });
    },
    4000,
    7000,
    mounted,
    activeRef,
  );

  useEffect(() => () => {
    if (pulseClear.current) clearTimeout(pulseClear.current);
  }, []);

  const formatAge = useCallback(
    (bornAt: number) => {
      const age = Math.max(0, elapsed - bornAt);
      if (age < 5) return "now";
      if (age < 60) return `${age}s ago`;
      if (age < 3600) return `${Math.floor(age / 60)}m ago`;
      return `${Math.floor(age / 3600)}h ago`;
    },
    [elapsed],
  );

  return useMemo(
    () => ({
      mounted,
      reducedMotion: prefersReduced,
      feed,
      feedPulse,
      log,
      logPulse,
      health,
      impact,
      activeRoute,
      formatAge,
    }),
    [mounted, prefersReduced, feed, feedPulse, log, logPulse, health, impact, activeRoute, formatAge],
  );
}

export type LiveEmpireData = ReturnType<typeof useLiveEmpireData>;
