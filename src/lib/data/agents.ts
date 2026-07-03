/**
 * Static AI agents data for the dashboard (no database yet).
 */

import type { AiAgent } from "@/lib/types";

export const agents: AiAgent[] = [
  {
    id: "agt_scout",
    name: "Scout",
    role: "Market Research",
    projectId: "prj_aurora",
    status: "active",
    lastRunAt: "2026-07-03T08:12:00Z",
    outputSummary: "Compiled 14 competitor signals across GCC fintech.",
  },
  {
    id: "agt_forge",
    name: "Forge",
    role: "Code Generation",
    projectId: "prj_empire_os",
    status: "active",
    lastRunAt: "2026-07-03T07:40:00Z",
    outputSummary: "Generated agent orchestration API scaffolding.",
  },
  {
    id: "agt_herald",
    name: "Herald",
    role: "Content Production",
    projectId: "prj_studio_signal",
    status: "idle",
    lastRunAt: "2026-07-02T18:05:00Z",
    outputSummary: "Drafted 6 campaign scripts for review.",
  },
  {
    id: "agt_ledger",
    name: "Ledger",
    role: "Financial Analysis",
    projectId: "prj_helios",
    status: "paused",
    lastRunAt: "2026-07-01T11:30:00Z",
    outputSummary: "Flagged margin improvement in acquired unit.",
  },
  {
    id: "agt_atlas",
    name: "Atlas",
    role: "Growth Optimization",
    projectId: "prj_partner_atlas",
    status: "active",
    lastRunAt: "2026-07-03T06:55:00Z",
    outputSummary: "Reallocated spend to top-ROAS campaign.",
  },
  {
    id: "agt_sentinel",
    name: "Sentinel",
    role: "Monitoring",
    status: "error",
    lastRunAt: "2026-07-03T05:20:00Z",
    outputSummary: "Data source timeout — retry scheduled.",
  },
];

export function getAgentsByStatus(status: AiAgent["status"]): AiAgent[] {
  return agents.filter((a) => a.status === status);
}
