/**
 * Static Projects data (no database yet).
 *
 * VISIBILITY RULE: only `public` and `anonymous` projects live here. Nothing
 * private or stealth-identifying is exposed. Anonymous entries use a masked
 * label instead of a real client name.
 */

import type { Project, ProjectMilestone } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "prj_empire_os",
    mogulId: "mgl_ai",
    name: "Empire OS",
    slug: "empire-os",
    type: "empire_project",
    visibility: "public",
    status: "building",
    progressPercent: 62,
    shortDescription:
      "The internal operating system orchestrating agents, projects, and capital across the empire.",
    fullDescription:
      "Empire OS is the command center that unifies the empire — orchestrating autonomous agents, tracking every project and milestone, and giving the founder a single real-time view of capital, growth, and output across all Moguls.",
    industry: "AI Infrastructure",
    isClientNamePublic: false,
    startedAt: "2025-11-01",
    targetLaunchDate: "2026-09-01",
  },
  {
    id: "prj_aurora",
    mogulId: "mgl_intelligence",
    name: "Aurora Intelligence",
    slug: "aurora-intelligence",
    type: "empire_project",
    visibility: "public",
    status: "beta",
    progressPercent: 78,
    shortDescription:
      "Real-time market intelligence and executive briefings powered by autonomous research agents.",
    fullDescription:
      "Aurora is the empire's intelligence platform — autonomous research agents that monitor markets, competitors, and signals in real time, then deliver executive-ready briefings that direct where the empire moves next.",
    industry: "Market Intelligence",
    isClientNamePublic: false,
    startedAt: "2025-09-15",
    targetLaunchDate: "2026-07-15",
  },
  {
    id: "prj_studio_signal",
    mogulId: "mgl_studio",
    name: "Studio Signal",
    slug: "studio-signal",
    type: "empire_project",
    visibility: "public",
    status: "launched",
    progressPercent: 100,
    shortDescription:
      "Cinematic content engine producing brand films and campaigns at empire scale.",
    fullDescription:
      "Studio Signal is the empire's content engine — a production system that turns briefs into cinematic brand films and campaigns, giving every venture a premium creative presence at scale.",
    industry: "Media & Creative",
    isClientNamePublic: false,
    startedAt: "2025-06-01",
    targetLaunchDate: "2026-01-10",
  },
  {
    id: "prj_partner_atlas",
    mogulId: "mgl_growth",
    name: "Atlas Commerce",
    slug: "atlas-commerce",
    type: "partner_project",
    visibility: "public",
    status: "scaled",
    progressPercent: 100,
    shortDescription:
      "A partner e-commerce brand scaled through the empire's growth systems.",
    fullDescription:
      "Atlas Commerce is a partner venture scaled with the Growth Mogul's performance systems — rebuilt funnels, retention, and paid distribution took it from flat to compounding revenue.",
    industry: "E-commerce",
    clientName: "Atlas Commerce",
    isClientNamePublic: true,
    startedAt: "2025-03-01",
  },
  {
    id: "prj_partner_meridian",
    mogulId: "mgl_ai",
    name: "Meridian Automation",
    slug: "meridian-automation",
    type: "partner_project",
    visibility: "public",
    status: "revenue",
    progressPercent: 88,
    shortDescription:
      "AI automation layer built for a partner operations company.",
    fullDescription:
      "Meridian is a partner engagement where the AI Mogul deployed an automation layer across operations — replacing manual workflows with agent-driven pipelines and cutting turnaround time dramatically.",
    industry: "Operations",
    clientName: "Meridian Group",
    isClientNamePublic: true,
    startedAt: "2025-07-20",
  },
  {
    id: "prj_stealth_fintech",
    mogulId: "mgl_venture",
    name: "Stealth Venture — Fintech",
    slug: "stealth-fintech",
    type: "stealth_project",
    visibility: "anonymous",
    status: "alpha",
    progressPercent: 34,
    shortDescription:
      "An anonymous stealth venture reshaping capital access in emerging markets.",
    fullDescription:
      "A stealth fintech venture in active development. Details are withheld under the empire's visibility rules — only the stage, division, and thesis are public until launch.",
    industry: "Financial Services",
    isClientNamePublic: false,
    startedAt: "2026-01-05",
  },
  {
    id: "prj_stealth_health",
    mogulId: "mgl_innovation",
    name: "Stealth Venture — Health AI",
    slug: "stealth-health-ai",
    type: "stealth_project",
    visibility: "anonymous",
    status: "research",
    progressPercent: 18,
    shortDescription:
      "A stealth health-AI venture in early research under the Innovation Mogul.",
    fullDescription:
      "An early-stage stealth venture applying AI to a large healthcare problem. Kept anonymous under the empire's visibility rules until it reaches launch stage.",
    industry: "Health Technology",
    isClientNamePublic: false,
    startedAt: "2026-04-01",
  },
  {
    id: "prj_helios",
    mogulId: "mgl_capital",
    name: "Helios Holdings",
    slug: "helios-holdings",
    type: "portfolio_company",
    visibility: "public",
    status: "revenue",
    progressPercent: 100,
    shortDescription:
      "An acquired cash-flowing business held and compounded by the Capital Mogul.",
    fullDescription:
      "Helios Holdings is an acquired, cash-flowing business held by the Capital Mogul — optimized with the empire's AI and growth systems and compounded as part of the long-term portfolio.",
    industry: "Business Services",
    isClientNamePublic: false,
    startedAt: "2025-02-01",
  },
];

/** Milestones for project detail pages (schema: project_milestones). */
export const projectMilestones: ProjectMilestone[] = [
  {
    id: "ms_eos_1",
    projectId: "prj_empire_os",
    title: "Agent orchestration core",
    description: "Foundation layer for running and monitoring agent fleets.",
    status: "completed",
    orderIndex: 1,
  },
  {
    id: "ms_eos_2",
    projectId: "prj_empire_os",
    title: "Project & milestone tracking",
    description: "Unified project workspace across all Moguls.",
    status: "in_progress",
    orderIndex: 2,
  },
  {
    id: "ms_eos_3",
    projectId: "prj_empire_os",
    title: "Capital & growth dashboards",
    description: "Real-time revenue and portfolio views.",
    status: "pending",
    orderIndex: 3,
  },
  {
    id: "ms_aur_1",
    projectId: "prj_aurora",
    title: "Research agent network",
    description: "Autonomous agents monitoring markets and competitors.",
    status: "completed",
    orderIndex: 1,
  },
  {
    id: "ms_aur_2",
    projectId: "prj_aurora",
    title: "Executive briefing engine",
    description: "Signal-to-briefing generation pipeline.",
    status: "in_progress",
    orderIndex: 2,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getMilestonesForProject(projectId: string): ProjectMilestone[] {
  return projectMilestones
    .filter((m) => m.projectId === projectId)
    .sort((a, b) => a.orderIndex - b.orderIndex);
}

export function getProjectsForMogul(mogulId: string): Project[] {
  return projects.filter((p) => p.mogulId === mogulId);
}

/** Featured subset for the homepage. */
export const featuredProjectSlugs = [
  "empire-os",
  "aurora-intelligence",
  "stealth-fintech",
  "studio-signal",
];

export const featuredProjects = featuredProjectSlugs
  .map((slug) => getProjectBySlug(slug))
  .filter((p): p is Project => Boolean(p));
