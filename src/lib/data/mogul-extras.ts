/**
 * Per-Mogul rich content + theming for the immersive division pages.
 * Keyed by mogul slug. Each entry gives the page a distinct accent (matched to
 * the mogul's octagon in the Empire Control Chamber artwork), animated KPIs,
 * an operating sequence, and a live signal feed — so all eight pages feel
 * bespoke while sharing one template.
 */

export interface MogulMetric {
  label: string;
  /** Numeric target the counter animates to. */
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export interface MogulStep {
  title: string;
  desc: string;
}

export interface MogulExtras {
  /** Accent hex, matched to the mogul's octagon color in the artwork. */
  accent: string;
  /** Accent as "r, g, b" for rgba() glows. */
  glow: string;
  status: string;
  mandate: string;
  tagline: string;
  metrics: MogulMetric[];
  sequence: MogulStep[];
  signals: string[];
}

export const mogulExtras: Record<string, MogulExtras> = {
  intelligence: {
    accent: "#3b82f6",
    glow: "59, 130, 246",
    status: "ACTIVE",
    mandate: "The empire's radar.",
    tagline: "Decode markets before they move.",
    metrics: [
      { label: "Signals / day", value: 2.4, suffix: "M", decimals: 1 },
      { label: "Markets tracked", value: 42 },
      { label: "Forecast accuracy", value: 96, suffix: "%" },
      { label: "Briefings shipped", value: 1280, suffix: "+" },
    ],
    sequence: [
      { title: "Ingest", desc: "Stream every relevant market, competitor, and macro signal in real time." },
      { title: "Analyze", desc: "Autonomous research agents cluster, score, and rank the noise into signal." },
      { title: "Synthesize", desc: "Compress findings into executive-ready intelligence." },
      { title: "Forecast", desc: "Model where the market moves next with probability-weighted scenarios." },
      { title: "Brief", desc: "Direct where the empire builds, acquires, and allocates." },
    ],
    signals: ["Market shift detected", "Competitor repositioned", "New opportunity surfaced", "Executive briefing dispatched"],
  },
  ai: {
    accent: "#6366f1",
    glow: "99, 102, 241",
    status: "ACTIVE",
    mandate: "The empire's autonomous layer.",
    tagline: "Deploy autonomous systems that multiply output.",
    metrics: [
      { label: "Active agents", value: 320 },
      { label: "Tasks automated / day", value: 48, suffix: "K" },
      { label: "Cost reduced", value: 71, suffix: "%" },
      { label: "System uptime", value: 99.9, suffix: "%", decimals: 1 },
    ],
    sequence: [
      { title: "Define", desc: "Map the workflow, its inputs, and the outcome worth automating." },
      { title: "Build", desc: "Compose agents, tools, and models into a reliable system." },
      { title: "Deploy", desc: "Ship into production with guardrails and observability." },
      { title: "Orchestrate", desc: "Coordinate fleets of agents across every division." },
      { title: "Compound", desc: "Each automation frees capacity to build the next." },
    ],
    signals: ["Agent fleet scaled", "Workflow automated", "Model upgraded", "Task queue cleared"],
  },
  venture: {
    accent: "#fb923c",
    glow: "251, 146, 60",
    status: "LAUNCH READY",
    mandate: "The empire's builder.",
    tagline: "Turn ideas into revenue engines.",
    metrics: [
      { label: "Ventures launched", value: 24 },
      { label: "Avg 0→1 time", value: 90, suffix: "d" },
      { label: "Success rate", value: 68, suffix: "%" },
      { label: "ARR generated", value: 40, prefix: "$", suffix: "M+" },
    ],
    sequence: [
      { title: "Validate", desc: "Pressure-test the idea against real demand and unit economics." },
      { title: "Build", desc: "Assemble product, brand, and MVP at empire speed." },
      { title: "Launch", desc: "Go to market with a distribution engine on day one." },
      { title: "Scale", desc: "Pour fuel into what works; kill what doesn't." },
      { title: "Spin out", desc: "Graduate winners into owned portfolio companies." },
    ],
    signals: ["MVP shipped", "First revenue recognized", "Go-to-market live", "Venture graduated"],
  },
  capital: {
    accent: "#d6aa38",
    glow: "214, 170, 56",
    status: "STRONG",
    mandate: "The empire's allocator.",
    tagline: "Acquire, allocate, and compound ownership.",
    metrics: [
      { label: "Assets under mgmt", value: 1.2, prefix: "$", suffix: "B+", decimals: 1 },
      { label: "Acquisitions", value: 18 },
      { label: "Portfolio IRR", value: 34, suffix: "%" },
      { label: "Companies owned", value: 24 },
    ],
    sequence: [
      { title: "Source", desc: "Hunt cash-flowing businesses and asymmetric opportunities." },
      { title: "Diligence", desc: "Underwrite with an operator's eye, not just a spreadsheet." },
      { title: "Acquire", desc: "Structure deals that protect downside and compound upside." },
      { title: "Optimize", desc: "Install systems, AI, and operators to lift margins." },
      { title: "Compound", desc: "Reinvest cash flow into the next acquisition." },
    ],
    signals: ["Deal sourced", "Diligence complete", "Acquisition closed", "Dividend reinvested"],
  },
  growth: {
    accent: "#10b981",
    glow: "16, 185, 129",
    status: "ACCELERATING",
    mandate: "The empire's distribution engine.",
    tagline: "Engineer attention into scalable revenue.",
    metrics: [
      { label: "Revenue driven", value: 128, prefix: "$", suffix: "M" },
      { label: "Avg ROAS", value: 5.4, suffix: "x", decimals: 1 },
      { label: "Channels", value: 30, suffix: "+" },
      { label: "Retention", value: 92, suffix: "%" },
    ],
    sequence: [
      { title: "Attract", desc: "Manufacture attention across every high-intent channel." },
      { title: "Convert", desc: "Engineer funnels that turn interest into revenue." },
      { title: "Retain", desc: "Systems that keep customers and lift lifetime value." },
      { title: "Expand", desc: "Upsell, cross-sell, and land-and-expand motions." },
      { title: "Refer", desc: "Turn customers into a compounding acquisition loop." },
    ],
    signals: ["Funnel optimized", "ROAS climbing", "Channel scaled", "LTV increased"],
  },
  studio: {
    accent: "#ec4899",
    glow: "236, 72, 153",
    status: "ONLINE",
    mandate: "The empire's creative arm.",
    tagline: "Produce premium content at empire scale.",
    metrics: [
      { label: "Assets produced", value: 12, suffix: "K+" },
      { label: "Brands built", value: 40 },
      { label: "Views generated", value: 1.8, suffix: "B", decimals: 1 },
      { label: "Avg turnaround", value: 72, suffix: "h" },
    ],
    sequence: [
      { title: "Concept", desc: "Find the idea sharp enough to stop the scroll." },
      { title: "Script", desc: "Write for the platform, the hook, and the outcome." },
      { title: "Produce", desc: "Shoot and generate cinematic assets at scale." },
      { title: "Edit", desc: "Cut for retention with a premium finish." },
      { title: "Distribute", desc: "Ship across channels and measure what lands." },
    ],
    signals: ["Film wrapped", "Campaign live", "Brand identity shipped", "Asset delivered"],
  },
  innovation: {
    accent: "#a855f7",
    glow: "168, 85, 247",
    status: "RESEARCHING",
    mandate: "The empire's frontier.",
    tagline: "Build what the market has not imagined yet.",
    metrics: [
      { label: "Experiments run", value: 240 },
      { label: "Patents / IP", value: 12 },
      { label: "Prototypes shipped", value: 86 },
      { label: "Frontier bets", value: 9 },
    ],
    sequence: [
      { title: "Explore", desc: "Scan emerging tech for asymmetric, empire-scale bets." },
      { title: "Prototype", desc: "Build the smallest thing that proves the future." },
      { title: "Test", desc: "Put prototypes in front of reality, fast." },
      { title: "Validate", desc: "Kill fast, double down on what breaks the ceiling." },
      { title: "Graduate", desc: "Spin winners into ventures and new divisions." },
    ],
    signals: ["Prototype live", "Hypothesis validated", "Frontier bet placed", "New tech spun up"],
  },
  knowledge: {
    accent: "#f5b301",
    glow: "245, 179, 1",
    status: "EXPANDING",
    mandate: "The empire's memory.",
    tagline: "Convert lessons into repeatable power.",
    metrics: [
      { label: "Playbooks", value: 320 },
      { label: "SOPs", value: 1450, suffix: "+" },
      { label: "Knowledge nodes", value: 18, suffix: "K" },
      { label: "Onboarding time", value: 60, prefix: "-", suffix: "%" },
    ],
    sequence: [
      { title: "Capture", desc: "Record every lesson, win, and failure the moment it happens." },
      { title: "Codify", desc: "Turn tacit knowledge into explicit playbooks." },
      { title: "Structure", desc: "Organize into a searchable, connected knowledge graph." },
      { title: "Distribute", desc: "Put the right playbook in the right hands instantly." },
      { title: "Compound", desc: "Every new venture starts further ahead than the last." },
    ],
    signals: ["Playbook published", "SOP updated", "Lesson captured", "Library expanded"],
  },
};

export function getMogulExtras(slug: string): MogulExtras | undefined {
  return mogulExtras[slug];
}
