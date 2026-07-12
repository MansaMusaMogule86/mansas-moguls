import type { LucideIcon } from "lucide-react";
import {
  Activity, Target, Wallet, Bot, Shield, Network, TrendingUp, Radar,
  Library, Coins, Cpu, Workflow, Boxes, Database, ShieldCheck,
} from "lucide-react";

/** String-key → lucide icon, so event data stays serializable. */
export const PANEL_ICONS: Record<string, LucideIcon> = {
  activity: Activity,
  target: Target,
  wallet: Wallet,
  bot: Bot,
  shield: Shield,
  network: Network,
  "trending-up": TrendingUp,
  radar: Radar,
  library: Library,
  coins: Coins,
  cpu: Cpu,
  workflow: Workflow,
  boxes: Boxes,
  database: Database,
  "shield-check": ShieldCheck,
};
