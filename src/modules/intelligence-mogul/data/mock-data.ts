/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * MOCK DATA ADAPTER — Intelligence Mogul.
 *
 * This module is the single source of the demo dataset carried over from the
 * standalone Intelligence Mogul application. It is intentionally isolated so
 * the eventual Supabase-backed service layer (workspace-scoped tables) can
 * replace these exports without touching presentation components.
 */

import { Signal, CrawlAgent, MATarget, Intervention, AuditItem, TimelineLog } from "@/modules/intelligence-mogul/types";

export const INITIAL_SIGNALS: Signal[] = [
  {
    id: "sig_1",
    timestamp: "12:04:15 UTC",
    category: "COMPETITOR",
    sentiment: "CRITICAL",
    source: "Agent_Sentiment_4",
    text: "Competitor C posted 14 new vacancies specializing in high-throughput vector compute & localized LLM embeddings. Potential R&D shift detected."
  },
  {
    id: "sig_2",
    timestamp: "11:42:01 UTC",
    category: "PARTNERSHIP",
    sentiment: "BULLISH",
    source: "Agent_News_Pulse",
    text: "Official partnership announced between Hyperscale Inc. and Vertex Systems. Multi-year enterprise deal locking in compute capacities."
  },
  {
    id: "sig_3",
    timestamp: "09:30:12 UTC",
    category: "MARKET",
    sentiment: "BEARISH",
    source: "Agent_Crawler_X",
    text: "Competitor B Q3 revenue missed guidance by 4.2%. Public response indicates higher user churn rate on their unified API tier."
  },
  {
    id: "sig_4",
    timestamp: "07:15:39 UTC",
    category: "COMPETITOR",
    sentiment: "NEUTRAL",
    source: "Agent_Sentiment_4",
    text: "Competitor A initiated alpha testing of their edge caching layer: 'Aether Edge'. Zero-cost API routes announced for early adopters."
  },
  {
    id: "sig_5",
    timestamp: "04:00:10 UTC",
    category: "INTERNAL",
    sentiment: "BULLISH",
    source: "SYSTEM_CORE",
    text: "M&A target Apex Solutions engineering feedback crawled: Node retention rate increased to 94.6% following compensation revision."
  }
];

export const INITIAL_AGENTS: CrawlAgent[] = [
  {
    id: "ag_1",
    name: "Agent_Crawler_X",
    status: "ACTIVE",
    activity: "Scraping SEC Filings & Patent Registries",
    stats: "318 Pages / Min"
  },
  {
    id: "ag_2",
    name: "Agent_Sentiment_4",
    status: "ACTIVE",
    activity: "Parsing Dev Blogs & Tech Vacancies",
    stats: "2,410 Posts / Min"
  },
  {
    id: "ag_3",
    name: "Agent_News_Pulse",
    status: "ACTIVE",
    activity: "Synthesizing Press Releases & Financial Feeds",
    stats: "450 Outlets / Min"
  },
  {
    id: "ag_4",
    name: "Agent_Red_Audit",
    status: "SLEEPING",
    activity: "Simulating Cyber-Pentest Iterations",
    stats: "Idle since 02:40 UTC"
  }
];

export const INITIAL_TARGETS: MATarget[] = [
  {
    id: "apex",
    name: "Apex Solutions Intel",
    intelligenceScore: 94.2,
    cost: "$124M Est. EV",
    aiReadiness: "A+",
    rationale: "Unrivaled edge infrastructure with high enterprise contract retention. Ideal synergy with Core Alpha CRM.",
    synergy: 92,
    cultureFit: 68,
    techDebt: 12
  },
  {
    id: "vertex",
    name: "Vertex Systems Inc",
    intelligenceScore: 84.2,
    cost: "$340M Est. EV",
    aiReadiness: "B+",
    rationale: "Strong proprietary neural engines but hampered by aging monolithic web interfaces. High modernization value.",
    synergy: 84,
    cultureFit: 79,
    techDebt: 45
  },
  {
    id: "xenon",
    name: "Xenon Unified",
    intelligenceScore: 71.5,
    cost: "$86M Est. EV",
    aiReadiness: "C",
    rationale: "Legacy client base with slow containerization. Excellent fire-sale pricing, but significant re-architecting needed.",
    synergy: 54,
    cultureFit: 51,
    techDebt: 82
  }
];

export const INITIAL_INTERVENTIONS: Intervention[] = [
  {
    id: "SR-902",
    target: "NeuralLink Dynamics Corp.",
    codename: "Stabilization Alpha",
    status: "ACTIVE",
    timestamp: "2026-06-07 04:00 UTC",
    impact_rating: "CRITICAL ACTION",
    category: "INTEGRATION",
    description: "Initiation of retention packages for top-tier software architects and senior engineering directors following merger announcement."
  },
  {
    id: "SR-898",
    target: "Vertex Systems",
    codename: "Edge Stream Consolidation",
    status: "COMPLETED",
    timestamp: "2026-06-03 14:22 UTC",
    impact_rating: "HIGH IMPACT",
    category: "INFRASTRUCTURE",
    description: "Cold-migration of legacy database shards into the unified Kubernetes region. Resolved double-billing risks and network handshakes."
  },
  {
    id: "SR-892",
    target: "Apex Solutions",
    codename: "Security Hardening Omega",
    status: "COMPLETED",
    timestamp: "2026-05-28 21:05 UTC",
    impact_rating: "HIGH IMPACT",
    category: "CYBER",
    description: "Mitigated SQL injection vulnerabilities in secondary legacy ingestion pipelines. Implemented API proxies and Cloudflare rate limits."
  },
  {
    id: "SR-884",
    target: "Core Alpha Group",
    codename: "Model Distillation v2",
    status: "SUPERSEDED",
    timestamp: "2026-05-15 08:30 UTC",
    impact_rating: "MEDIUM IMPACT",
    category: "MODELING",
    description: "Distilled custom LLM candidate filters into a 7B parameter local instance, reducing raw token cost overhead by 41%."
  }
];

export const INITIAL_AUDITS: AuditItem[] = [
  {
    id: "aud_1",
    name: "Apex Solutions Tech Audit",
    status: "VERIFIED",
    value: "92/100",
    category: "TECH"
  },
  {
    id: "aud_2",
    name: "Apex Security Penetration Assessment",
    status: "FLAGGED",
    value: "3 Moderate Vulnerabilities",
    category: "CYBER"
  },
  {
    id: "aud_3",
    name: "Core Ledger Validation Study",
    status: "VERIFIED",
    value: "$124.2M AUDITED",
    category: "FINANCIAL"
  },
  {
    id: "aud_4",
    name: "IP Portfolio & Trademark Assurances",
    status: "VERIFIED",
    value: "14 Registered Patents",
    category: "LEGAL"
  },
  {
    id: "aud_5",
    name: "Cultural Sentiment & Compensation Sync",
    status: "PENDING",
    value: "68% Satisfaction Rating",
    category: "CULTURAL"
  },
  {
    id: "aud_6",
    name: "Kubernetes Cluster Configuration Audit",
    status: "FLAGGED",
    value: "Stale SSL Certificates",
    category: "TECH"
  }
];

export const INITIAL_TIMELINE: TimelineLog[] = [
  {
    time: "04:00 UTC",
    event: "Retention Package Alpha Initiated. Budget approved: $12.5M pooled equity.",
    actor: "ORACLE_AUTONOMOUS",
    hash: "0x7E4FFB9"
  },
  {
    time: "04:12 UTC",
    event: "Active crawler dispatched to monitor sentiment across developer channels.",
    actor: "Agent_Crawler_X",
    hash: "0x3D9BB21"
  },
  {
    time: "04:45 UTC",
    event: "9 out of 11 core tech architects locked in. Sign-off confirmed on revised vesting schedule.",
    actor: "SYSTEM_CORE",
    hash: "0x1A2CC4B"
  },
  {
    time: "05:10 UTC",
    event: "Compensation adjustment triggers positive telemetry shift. Node stress metrics decay.",
    actor: "Agent_Sentiment_4",
    hash: "0x9E2DF1A"
  },
  {
    time: "05:30 UTC",
    event: "Handshake v3 connection established: Apex AWS workloads routed safely over local tunnels.",
    actor: "ORACLE_AUTONOMOUS",
    hash: "0x5A8FE03"
  }
];

export const ROADMAP_ITEMS = {
  foundational: [
    {
      id: "rd_1",
      title: "Data Hygiene Protocol V1",
      days: "Days 1-15",
      status: "COMPLETED",
      desc: "Implement unified Postgres indexes & schemas over legacy databases. Synchronize vector storage nodes.",
      badge: "DATA_HYGIENE_V1"
    },
    {
      id: "rd_2",
      title: "Consolidated IAM Provisioning",
      days: "Days 10-25",
      status: "COMPLETED",
      desc: "Authenticate 1,200+ engineers globally under Single Sign-On, establishing fine-grained RBAC access.",
      badge: "IAM_PROVISION"
    },
    {
      id: "rd_3",
      title: "Agentic Crawler Daemon Fleet",
      days: "Days 20-30",
      status: "IN_PROGRESS",
      desc: "Dispatched crawler agents targeting 14 market variables. Connected logs directly to system intelligence matrix.",
      badge: "CRAWL_FLEET"
    }
  ],
  expansion: [
    {
      id: "rd_4",
      title: "Edge Cache Deployment (Aether)",
      days: "Days 31-45",
      status: "IN_PROGRESS",
      desc: "Initiate local edge cache in Seattle, Tokyo, Frankfurt. Drive overall customer API latency down to sub-12ms.",
      badge: "AETHER_EDGE"
    },
    {
      id: "rd_5",
      title: "Competitor Intelligence Engine",
      days: "Days 45-60",
      status: "PENDING",
      desc: "Integrate competitor telemetry, vacancy scanners, and public repositories under a unified analysis center.",
      badge: "MOAT_ENGINE_DEPLOY"
    },
    {
      id: "rd_6",
      title: "Model Moat Distillation",
      days: "Days 50-60",
      status: "PENDING",
      desc: "Compile custom routing models down to locally hosted Llama units. Bypass third-party token fees cleanly.",
      badge: "DISTILL_V2"
    }
  ],
  realization: [
    {
      id: "rd_7",
      title: "Integrated AI Sales Agent Engine",
      days: "Days 61-80",
      status: "PENDING",
      desc: "Activate system-level sales agents autonomously responding to high-value inbound requests via local models.",
      badge: "AGENT_SALES_V1"
    },
    {
      id: "rd_8",
      title: "Complete Equity/Billing Overhaul",
      days: "Days 75-90",
      status: "PENDING",
      desc: "Synchronize general ledger entries directly with real-time server workloads to automate monthly calculations.",
      badge: "LEDGER_SYNC"
    },
    {
      id: "rd_9",
      title: "Global Command Platform Release",
      days: "Days 91-100",
      status: "PENDING",
      desc: "Complete God-Mode integration, establishing the unified high-performance ORACLE OS workspace worldwide.",
      badge: "ORACLE_OS_ALPHA"
    }
  ]
};
