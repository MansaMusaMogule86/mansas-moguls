/**
 * Live Empire command-center types.
 * Kept UI-agnostic so the mock generators in `useLiveEmpireData` can later be
 * swapped for WebSockets / Supabase Realtime / an API without touching panels.
 */

export type Priority = "normal" | "elevated" | "critical";

/** Business-intelligence event (Live Feed). */
export interface FeedEvent {
  id: string;
  label: string;
  /** lucide icon key, resolved in the panel. */
  icon: string;
  /** Seconds relative to the hook's mount (0 = born now, negative = seeded/aged). */
  bornAt: number;
  priority: Priority;
}

/** Infrastructure / agent event (System Log). */
export interface LogEntry {
  id: string;
  message: string;
  icon: string;
  bornAt: number;
  /** true only for the newest entry, which types itself in. */
  fresh: boolean;
}

export type ResourceFlow = "OPTIMAL" | "ELEVATED" | "EXPANDING" | "STABILIZED";
export type TrendDir = "up" | "stable";

export interface EmpireHealth {
  integrity: number; // 99.4 – 100
  network: number; // 97.8 – 99.8
  resourceFlow: ResourceFlow;
  integrityTrend: TrendDir;
  networkTrend: TrendDir;
  /** Rolling chart series, oldest → newest. */
  chart: number[];
}

export interface EmpireImpact {
  value: number; // total empire value in trillions (e.g. 1.28)
  markets: number;
  countries: number;
  assets: number;
  /** which metric key just changed, for a brief highlight; null when idle. */
  pulsed: "value" | "markets" | "countries" | "assets" | null;
}

export interface MapNode {
  id: string;
  name: string;
  /** viewBox coords, 0–100 x, 0–60 y. */
  x: number;
  y: number;
}

export interface MapRoute {
  id: string;
  from: string; // node id
  to: string; // node id
}

/** A currently-travelling route pulse. */
export interface ActiveRoute {
  routeId: string;
  /** key forces a fresh particle animation each activation. */
  key: number;
}
