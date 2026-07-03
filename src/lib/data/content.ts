/**
 * Static content posts (no database yet).
 * Powers the Intelligence and Media pages. Split by type at the page level.
 */

import type { ContentPost } from "@/lib/types";

export const contentPosts: ContentPost[] = [
  // Intelligence — research / reports
  {
    id: "cp_gcc_ai",
    title: "The GCC AI Opportunity: 2026 Market Map",
    slug: "gcc-ai-opportunity-2026",
    type: "research",
    excerpt:
      "Where AI-native businesses will compound fastest across the Gulf over the next 24 months.",
    content: "",
    category: "Market Intelligence",
    published: true,
    createdAt: "2026-06-18",
  },
  {
    id: "cp_holding_model",
    title: "The AI Holding Company Playbook",
    slug: "ai-holding-company-playbook",
    type: "research",
    excerpt:
      "How a Berkshire-style compounding model works when every operating company runs on agents.",
    category: "Strategy",
    content: "",
    published: true,
    createdAt: "2026-05-30",
  },
  {
    id: "cp_agent_econ",
    title: "Agent Economics: The New Unit of Output",
    slug: "agent-economics",
    type: "research",
    excerpt:
      "Rethinking cost, margin, and headcount when autonomous agents do the work.",
    category: "AI",
    content: "",
    published: true,
    createdAt: "2026-05-02",
  },
  {
    id: "cp_briefing_q2",
    title: "Empire Briefing — Q2 2026",
    slug: "empire-briefing-q2-2026",
    type: "announcement",
    excerpt:
      "Portfolio momentum, new ventures, and where the empire is allocating next.",
    category: "Briefing",
    content: "",
    published: true,
    createdAt: "2026-04-10",
  },

  // Media — articles / video / podcast
  {
    id: "cp_build_public",
    title: "Building an Empire in Public",
    slug: "building-an-empire-in-public",
    type: "article",
    excerpt:
      "Why Mansas Moguls shares its flywheel, its Moguls, and its momentum openly.",
    category: "Story",
    content: "",
    published: true,
    createdAt: "2026-06-22",
  },
  {
    id: "cp_studio_film",
    title: "Studio Signal: The Empire Film",
    slug: "studio-signal-empire-film",
    type: "video",
    excerpt:
      "A cinematic look inside the divisions, ventures, and ambition of the empire.",
    category: "Film",
    content: "",
    published: true,
    createdAt: "2026-06-05",
  },
  {
    id: "cp_podcast_capital",
    title: "On Capital, Compounding, and AI",
    slug: "on-capital-compounding-and-ai",
    type: "podcast",
    excerpt:
      "The Capital Mogul thesis: acquiring and compounding AI-optimized businesses.",
    category: "Podcast",
    content: "",
    published: true,
    createdAt: "2026-05-19",
  },
  {
    id: "cp_launch",
    title: "Mansas Moguls Announces Its First Portfolio Cohort",
    slug: "first-portfolio-cohort",
    type: "announcement",
    excerpt:
      "Six companies now sit inside the empire portfolio across four industries.",
    category: "News",
    content: "",
    published: true,
    createdAt: "2026-04-28",
  },
];

export const intelligencePosts = contentPosts.filter((p) =>
  ["research", "announcement"].includes(p.type),
);

export const mediaPosts = contentPosts.filter((p) =>
  ["article", "video", "podcast", "announcement", "case_study"].includes(p.type),
);
