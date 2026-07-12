export interface DashboardMetric {
  label: string;
  value: string;
}

export interface DashboardDivision {
  id: string;
  divisionNumber: string;
  title: string;
  accentClass: string;     // e.g. "text-electric-blue"
  borderClass: string;     // e.g. "border-electric-blue/50"
  glowClass: string;       // e.g. "shadow-[0_0_30px_rgba(43,84,240,0.4)]"
  visualImage: string;
  description: string;
  capabilities: string[];
  metrics: DashboardMetric[];
  status: string;
  statusClass: string;
  colSpan: string;         // e.g. "col-span-12 lg:col-span-4"
  heightClass: string;     // e.g. "h-[440px]"
}

export const dashboardDivisions: DashboardDivision[] = [
  {
    id: "intelligence",
    divisionNumber: "01",
    title: "INTELLIGENCE",
    accentClass: "text-electric-blue",
    borderClass: "border-electric-blue/50 group-hover:border-electric-blue/80",
    glowClass: "group-hover:shadow-[0_0_40px_rgba(43,84,240,0.4)]",
    visualImage: "/images/moguls/intelligence-mogul.webp",
    description: "Real-time insights that power smarter decisions across the empire.",
    capabilities: [
      "Market Surveillance",
      "Predictive Analytics",
      "Signal Intelligence",
      "Risk Assessment",
      "Opportunity Mapping"
    ],
    metrics: [
      { label: "Data Streams", value: "Active" },
      { label: "Accuracy", value: "99.8%" },
      { label: "Insights Today", value: "1,204" },
      { label: "Uptime", value: "99.9%" }
    ],
    status: "SYNTHESIZED INTEL: ALIGNED",
    statusClass: "text-emerald",
    colSpan: "col-span-12 lg:col-span-4",
    heightClass: "min-h-[440px]",
  },
  {
    id: "ai",
    divisionNumber: "02",
    title: "AI",
    accentClass: "text-violet-500",
    borderClass: "border-violet-500/50 group-hover:border-violet-500/80",
    glowClass: "group-hover:shadow-[0_0_40px_rgba(139,92,246,0.4)]",
    visualImage: "/images/moguls/ai-mogul-core.webp",
    description: "Autonomous systems that learn, evolve, and scale intelligence infinitely.",
    capabilities: [
      "Machine Learning",
      "Deep Neural Models",
      "Natural Language AI",
      "Computer Vision",
      "Decision Engines"
    ],
    metrics: [
      { label: "Models Active", value: "24" },
      { label: "Inference/Sec", value: "14.2k" },
      { label: "Learning Rate", value: "Exp" },
      { label: "Efficiency", value: "+84%" }
    ],
    status: "PROTOCOLS: DEPLOYED",
    statusClass: "text-emerald",
    colSpan: "col-span-12 lg:col-span-4",
    heightClass: "min-h-[440px]",
  },
  {
    id: "capital",
    divisionNumber: "03",
    title: "CAPITAL",
    accentClass: "text-gold",
    borderClass: "border-gold/50 group-hover:border-gold/80",
    glowClass: "group-hover:shadow-[0_0_40px_rgba(214,170,56,0.4)]",
    visualImage: "/images/moguls/capital-mogul-engine.webp",
    description: "UNIVERSAL ASSET ALLOCATION AND UNIFIED COMPOUNDING.",
    capabilities: [
      "Portfolio Allocation",
      "Deal Origination",
      "Capital Deployment",
      "Yield Optimization",
      "Exit Strategy"
    ],
    metrics: [
      { label: "AUM", value: "$1.28T" },
      { label: "Active Deals", value: "42" },
      { label: "ROI", value: "24.6%" },
      { label: "IC Multiple", value: "3.2x" }
    ],
    status: "OPTIMIZED",
    statusClass: "text-emerald",
    colSpan: "col-span-12 lg:col-span-4",
    heightClass: "min-h-[440px]",
  },
  {
    id: "growth",
    divisionNumber: "04",
    title: "GROWTH",
    accentClass: "text-emerald",
    borderClass: "border-emerald/50 group-hover:border-emerald/80",
    glowClass: "group-hover:shadow-[0_0_40px_rgba(17,217,138,0.4)]",
    visualImage: "/images/moguls/growth-mogul-funnel.webp",
    description: "Accelerating expansion through scalable systems and exponential leverage.",
    capabilities: [
      "Growth Engines",
      "Funnel Optimization",
      "User Acquisition",
      "Retention Systems",
      "Network Effects"
    ],
    metrics: [
      { label: "Revenue", value: "Scaling" },
      { label: "Growth Rate", value: "+18%" },
      { label: "CAC", value: "Optmzd" },
      { label: "LTV / CAC", value: "4.8" }
    ],
    status: "SCALING SYNERGISTIC REVENUE",
    statusClass: "text-emerald",
    colSpan: "col-span-12 lg:col-span-3",
    heightClass: "min-h-[360px]",
  },
  {
    id: "studio",
    divisionNumber: "05",
    title: "STUDIO",
    accentClass: "text-pink-500",
    borderClass: "border-pink-500/50 group-hover:border-pink-500/80",
    glowClass: "group-hover:shadow-[0_0_40px_rgba(236,72,153,0.4)]",
    visualImage: "/images/moguls/studio-mogul-lens.webp",
    description: "UNIFIED MULTI-AGENT ASSET SYNTHESIS.",
    capabilities: [
      "Content Production",
      "Brand Architecture",
      "Media Distribution",
      "Audience Engagement",
      "IP Development"
    ],
    metrics: [
      { label: "Projects", value: "14" },
      { label: "Content Pieces", value: "842" },
      { label: "Audience Reach", value: "2.4M" },
      { label: "Engagement", value: "12%" }
    ],
    status: "CREATING",
    statusClass: "text-pink-500",
    colSpan: "col-span-12 lg:col-span-3",
    heightClass: "h-[360px]",
  },
  {
    id: "venture",
    divisionNumber: "06",
    title: "VENTURE",
    accentClass: "text-orange-400",
    borderClass: "border-orange-400/50 group-hover:border-orange-400/80",
    glowClass: "group-hover:shadow-[0_0_40px_rgba(251,146,60,0.4)]",
    visualImage: "/images/moguls/venture-mogul-launch.webp",
    description: "Building and launching ventures with zero-g stabilization and advanced field dynamics.",
    capabilities: [
      "Anti-Grav System",
      "Zero-G Stabilization",
      "Go-To-Market",
      "Strategic Partnerships",
      "Venture Scaling"
    ],
    metrics: [
      { label: "Stabilization", value: "Optimal" },
      { label: "Anti-Grav System", value: "Active" },
      { label: "Ventures Live", value: "8" },
      { label: "Success Rate", value: "92%" }
    ],
    status: "DEPLOYMENT CONFIRMED: INTEGRATED LAUNCH",
    statusClass: "text-gold",
    colSpan: "col-span-12 lg:col-span-3",
    heightClass: "h-[360px]",
  },
  {
    id: "innovation",
    divisionNumber: "07",
    title: "INNOVATION",
    accentClass: "text-purple-400",
    borderClass: "border-purple-400/50 group-hover:border-purple-400/80",
    glowClass: "group-hover:shadow-[0_0_40px_rgba(192,132,252,0.4)]",
    visualImage: "/images/moguls/innovation-mogul-orb.webp",
    description: "CROSS-DISCIPLINARY CONCEPT FUSION.",
    capabilities: [
      "Concept Fusion",
      "Prototyping Lab",
      "Emerging Tech",
      "Future Intelligence",
      "Tech Scouting"
    ],
    metrics: [
      { label: "R&D Projects", value: "12" },
      { label: "Prototypes", value: "34" },
      { label: "Innovation Index", value: "High" },
      { label: "Breakthroughs", value: "6" }
    ],
    status: "RESEARCHING",
    statusClass: "text-purple-400",
    colSpan: "col-span-12 lg:col-span-3",
    heightClass: "h-[360px]",
  },
  {
    id: "knowledge",
    divisionNumber: "08",
    title: "KNOWLEDGE",
    accentClass: "text-amber-100", // warm white
    borderClass: "border-amber-100/40 group-hover:border-amber-100/70",
    glowClass: "group-hover:shadow-[0_0_40px_rgba(254,243,199,0.3)]",
    visualImage: "/images/moguls/knowledge-mogul-vault.webp",
    description: "Preserving wisdom and building systems of repeatable mastery.",
    capabilities: [
      "Digital Archive",
      "System Playbooks",
      "Knowledge Graph",
      "Wisdom Preservation",
      "Legacy Systems"
    ],
    metrics: [
      { label: "Playbooks", value: "142" },
      { label: "Systems", value: "86" },
      { label: "Articles", value: "1,402" },
      { label: "Completion", value: "94%" }
    ],
    status: "ECOLOGY-WIDE LESSONS INTEGRATED",
    statusClass: "text-gold",
    colSpan: "col-span-12 lg:col-span-6",
    heightClass: "min-h-[340px]",
  }
];
