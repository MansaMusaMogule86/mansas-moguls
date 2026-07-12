/**
 * Static Moguls data (no database yet).
 * The eight permanent strategic divisions of the empire.
 */

import type { LucideIcon } from "lucide-react";
import {
  Brain,
  Bot,
  Rocket,
  Landmark,
  TrendingUp,
  Clapperboard,
  Lightbulb,
  Library,
} from "lucide-react";
import type { Mogul } from "@/lib/types";

/** Icon registry — maps a Mogul's `icon` key to a Lucide component. */
export const mogulIcons: Record<string, LucideIcon> = {
  brain: Brain,
  bot: Bot,
  rocket: Rocket,
  landmark: Landmark,
  "trending-up": TrendingUp,
  clapperboard: Clapperboard,
  lightbulb: Lightbulb,
  library: Library,
};

export const moguls: Mogul[] = [
  {
    id: "mgl_intelligence",
    name: "Intelligence Mogul",
    slug: "intelligence",
    shortDescription:
      "Market intelligence, research, and strategic foresight for the empire.",
    fullDescription:
      "The Intelligence Mogul is the empire's radar. It runs continuous market research, competitive analysis, and strategic foresight — turning raw signal into executive-ready intelligence that directs where the empire builds, acquires, and allocates next.",
    category: "Strategy",
    icon: "brain",
    image: "/images/moguls/intelligence-mogul.webp",
    accentColor: "royal",
    orderIndex: 1,
    isActive: true,
    capabilities: [
      "Market & competitive intelligence",
      "Executive briefings",
      "Autonomous research agents",
      "Strategic foresight",
    ],
  },
  {
    id: "mgl_ai",
    name: "AI Mogul",
    slug: "ai",
    shortDescription:
      "Autonomous agents, automation, and applied AI systems at scale.",
    fullDescription:
      "The AI Mogul builds the autonomous operating layer of the empire — agents, automations, and applied AI systems that run projects, compress cost, and compound output across every division.",
    category: "Technology",
    icon: "bot",
    image: "/images/moguls/ai-mogul-core.webp",
    accentColor: "royal",
    orderIndex: 2,
    isActive: true,
    capabilities: [
      "Autonomous agent fleets",
      "Workflow automation",
      "Applied AI systems",
      "AI infrastructure",
    ],
  },
  {
    id: "mgl_venture",
    name: "Venture Mogul",
    slug: "venture",
    shortDescription:
      "Building and launching new ventures from idea to revenue.",
    fullDescription:
      "The Venture Mogul is the empire's builder. It takes validated ideas from research to revenue — assembling product, brand, and go-to-market into new ventures the empire owns and scales.",
    category: "Building",
    icon: "rocket",
    image: "/images/moguls/venture-mogul-launch.webp",
    accentColor: "gold",
    orderIndex: 3,
    isActive: true,
    capabilities: [
      "0→1 venture building",
      "Product & MVP delivery",
      "Go-to-market launch",
      "Founder partnerships",
    ],
  },
  {
    id: "mgl_capital",
    name: "Capital Mogul",
    slug: "capital",
    shortDescription:
      "Capital allocation, acquisitions, and compounding ownership.",
    fullDescription:
      "The Capital Mogul allocates the empire's capital. Inspired by a Berkshire-style compounding model, it acquires cash-flowing businesses, structures investments, and compounds ownership across the portfolio.",
    category: "Capital",
    icon: "landmark",
    image: "/images/moguls/capital-mogul-engine.webp",
    accentColor: "gold",
    orderIndex: 4,
    isActive: true,
    capabilities: [
      "Acquisitions & M&A",
      "Capital allocation",
      "Investment structuring",
      "Portfolio compounding",
    ],
  },
  {
    id: "mgl_growth",
    name: "Growth Mogul",
    slug: "growth",
    shortDescription:
      "Distribution, performance systems, and revenue acceleration.",
    fullDescription:
      "The Growth Mogul is the empire's distribution engine. It runs performance systems, funnels, and revenue acceleration across every venture and portfolio company.",
    category: "Growth",
    icon: "trending-up",
    image: "/images/moguls/growth-mogul-funnel.webp",
    accentColor: "royal",
    orderIndex: 5,
    isActive: true,
    capabilities: [
      "Performance marketing",
      "Revenue systems",
      "Distribution & funnels",
      "Retention & LTV",
    ],
  },
  {
    id: "mgl_studio",
    name: "Studio Mogul",
    slug: "studio",
    shortDescription:
      "Creative production, brand, and cinematic content at empire scale.",
    fullDescription:
      "The Studio Mogul is the empire's creative arm — cinematic brand films, campaigns, and content produced at scale to give every venture a premium presence.",
    category: "Creative",
    icon: "clapperboard",
    image: "/images/moguls/studio-mogul-lens.webp",
    accentColor: "gold",
    orderIndex: 6,
    isActive: true,
    capabilities: [
      "Brand & identity",
      "Cinematic content",
      "Campaign production",
      "Creative direction",
    ],
  },
  {
    id: "mgl_innovation",
    name: "Innovation Mogul",
    slug: "innovation",
    shortDescription:
      "R&D, emerging technology, and the next frontier of the empire.",
    fullDescription:
      "The Innovation Mogul explores the frontier — R&D, emerging technology, and experimental bets that become the empire's next divisions and ventures.",
    category: "R&D",
    icon: "lightbulb",
    image: "/images/moguls/innovation-mogul-orb.webp",
    accentColor: "royal",
    orderIndex: 7,
    isActive: true,
    capabilities: [
      "Applied R&D",
      "Emerging technology",
      "Rapid prototyping",
      "Frontier bets",
    ],
  },
  {
    id: "mgl_knowledge",
    name: "Knowledge Mogul",
    slug: "knowledge",
    shortDescription:
      "Playbooks, systems, and the compounding knowledge base of the empire.",
    fullDescription:
      "The Knowledge Mogul is the empire's memory. It codifies playbooks, systems, and standards so every lesson compounds and every new venture starts further ahead.",
    category: "Knowledge",
    icon: "library",
    image: "/images/moguls/knowledge-mogul-vault.webp",
    accentColor: "gold",
    orderIndex: 8,
    isActive: true,
    capabilities: [
      "Playbooks & systems",
      "Standard operating procedures",
      "Internal knowledge base",
      "Training & enablement",
    ],
  },
];

export function getMogulBySlug(slug: string): Mogul | undefined {
  return moguls.find((m) => m.slug === slug);
}

export function getMogulById(id: string): Mogul | undefined {
  return moguls.find((m) => m.id === id);
}
