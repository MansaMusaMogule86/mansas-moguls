/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SectionType =
  | "dashboard"
  | "twin"
  | "competitors"
  | "simulation"
  | "portfolio"
  | "archive"
  | "report";

/** Base path of the Intelligence Mogul module inside the Mansas Moguls dashboard. */
export const INTELLIGENCE_MOGUL_BASE = "/dashboard/moguls/intelligence-mogul";

/** Maps each module section to its Next.js route. */
export const SECTION_ROUTES: Record<SectionType, string> = {
  dashboard: INTELLIGENCE_MOGUL_BASE,
  twin: `${INTELLIGENCE_MOGUL_BASE}/empire-twin`,
  competitors: `${INTELLIGENCE_MOGUL_BASE}/rivals`,
  simulation: `${INTELLIGENCE_MOGUL_BASE}/scenarios`,
  portfolio: `${INTELLIGENCE_MOGUL_BASE}/acquisitions`,
  archive: `${INTELLIGENCE_MOGUL_BASE}/interventions`,
  report: `${INTELLIGENCE_MOGUL_BASE}/outcomes`,
};

/** Resolves the active module section from the current pathname. */
export function sectionFromPathname(pathname: string): SectionType {
  const entry = (Object.entries(SECTION_ROUTES) as [SectionType, string][])
    .filter(([section]) => section !== "dashboard")
    .find(([, route]) => pathname.startsWith(route));
  return entry ? entry[0] : "dashboard";
}

/** Volatility alert raised when a telemetry tick crosses the configured threshold. */
export interface VolatilityAlert {
  id: string;
  metric: string;
  key: string;
  delta: number;
  prev: number;
  last: number;
  time: string;
  cleared: boolean;
}

export interface Signal {
  id: string;
  timestamp: string;
  category: "COMPETITOR" | "MARKET" | "PARTNERSHIP" | "INTERNAL";
  sentiment: "BULLISH" | "BEARISH" | "NEUTRAL" | "CRITICAL";
  source: string;
  text: string;
}

export interface CrawlAgent {
  id: string;
  name: string;
  status: "ACTIVE" | "SLEEPING" | "IDLE" | "ERROR";
  activity: string;
  stats: string;
}

export interface MATarget {
  id: string;
  name: string;
  intelligenceScore: number;
  cost: string;
  aiReadiness: string;
  rationale: string;
  synergy: number;
  cultureFit: number;
  techDebt: number;
}

export interface SimulationLever {
  automationTarget: number;
  talentAggregation: number;
  marketExpansion: "conservative" | "balanced" | "aggressive";
}

export interface MetricImpact {
  name: string;
  current: string;
  projected: string;
  delta: string;
  isPositive: boolean;
  confidence: number;
}

export interface Intervention {
  id: string;
  target: string;
  codename: string;
  status: "COMPLETED" | "ACTIVE" | "PENDING" | "SUPERSEDED";
  timestamp: string;
  impact_rating: string;
  category: string;
  description: string;
}

export interface AuditItem {
  id: string;
  name: string;
  status: "VERIFIED" | "FLAGGED" | "PENDING";
  value: string;
  category: "TECH" | "CYBER" | "FINANCIAL" | "LEGAL" | "CULTURAL";
}

export interface TimelineLog {
  time: string;
  event: string;
  actor: string;
  hash: string;
}
