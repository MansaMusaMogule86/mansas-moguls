/**
 * Mock event pools + world-map topology for the live command center.
 * Separate from UI so this can later be replaced by a realtime source.
 */

import type { MapNode, MapRoute, Priority } from "@/types/empire";

export interface FeedTemplate {
  label: string;
  icon: string;
  priority: Priority;
}

/** Business-intelligence events (Live Feed). */
export const FEED_POOL: FeedTemplate[] = [
  { label: "Ecological alignment protocol established", icon: "activity", priority: "elevated" },
  { label: "Inter-agent communication latency eliminated", icon: "zap", priority: "normal" },
  { label: "Multi-force cross-calibration complete", icon: "refresh-cw", priority: "elevated" },
  { label: "AI consensus protocol deployed", icon: "bot", priority: "normal" },
  { label: "Unified asset compounding active", icon: "wallet", priority: "normal" },
  { label: "Ecology learning loop integrated", icon: "library", priority: "normal" },
  { label: "Synergistic revenue scaling confirm", icon: "trending-up", priority: "elevated" },
  { label: "Concept fusion channels locked", icon: "radar", priority: "critical" },
];

/** Seed events, already aged (bornAt negative = seconds in the past). */
export const FEED_SEED = [
  { label: "Ecological alignment protocol established", icon: "activity", priority: "elevated" as Priority, bornAt: -60 }, // 1m ago
  { label: "Inter-agent communication latency eliminated", icon: "zap", priority: "normal" as Priority, bornAt: -120 }, // 2m ago
  { label: "Multi-force cross-calibration complete", icon: "refresh-cw", priority: "elevated" as Priority, bornAt: -180 }, // 3m ago
  { label: "Ecology learning loop integrated", icon: "library", priority: "normal" as Priority, bornAt: -240 },
  { label: "Unified asset compounding active", icon: "wallet", priority: "normal" as Priority, bornAt: -300 },
];

/** Infrastructure / agent events (System Log). */
export const LOG_POOL: { message: string; icon: string }[] = [
  { message: "ECOLOGY_SYNC Intelligence optimized.", icon: "cpu" },
  { message: "ECOLOGY_SYNC Capital allocation balanced.", icon: "wallet" },
  { message: "ECOLOGY_SYNC Studio assets unified.", icon: "film" },
  { message: "ECOLOGY_SYNC AI consensus deployed.", icon: "bot" },
  { message: "ECOLOGY_SYNC Venture launch confirmed.", icon: "workflow" },
  { message: "ECOLOGY_SYNC Knowledge streams synchronized.", icon: "library" },
  { message: "ECOLOGY_SYNC Concept fusion initialized.", icon: "target" },
  { message: "ECOLOGY_SYNC Growth multiplier boosted.", icon: "trending-up" },
];

export const LOG_SEED = [
  { message: "ECOLOGY_SYNC Intelligence optimized.", icon: "cpu", bornAt: -22 },
  { message: "ECOLOGY_SYNC Capital allocation balanced.", icon: "wallet", bornAt: -68 },
  { message: "ECOLOGY_SYNC Studio assets unified.", icon: "film", bornAt: -140 },
  { message: "ECOLOGY_SYNC AI consensus deployed.", icon: "bot", bornAt: -226 },
  { message: "ECOLOGY_SYNC Venture launch confirmed.", icon: "workflow", bornAt: -390 },
];

/** World map nodes — viewBox 100 x 60, roughly geographic. */
export const MAP_NODES: MapNode[] = [
  { id: "newyork", name: "New York", x: 26, y: 25 },
  { id: "london", name: "London", x: 46.5, y: 20 },
  { id: "paris", name: "Paris", x: 48.5, y: 22 },
  { id: "casablanca", name: "Casablanca", x: 45, y: 31 },
  { id: "riyadh", name: "Riyadh", x: 58, y: 30 },
  { id: "dubai", name: "Dubai", x: 61.5, y: 31 },
  { id: "hongkong", name: "Hong Kong", x: 78, y: 30 },
  { id: "singapore", name: "Singapore", x: 76, y: 40 },
];

export const MAP_ROUTES: MapRoute[] = [
  { id: "r1", from: "dubai", to: "london" },
  { id: "r2", from: "newyork", to: "london" },
  { id: "r3", from: "dubai", to: "singapore" },
  { id: "r4", from: "riyadh", to: "paris" },
  { id: "r5", from: "hongkong", to: "singapore" },
  { id: "r6", from: "casablanca", to: "dubai" },
  { id: "r7", from: "london", to: "newyork" },
  { id: "r8", from: "paris", to: "hongkong" },
];
