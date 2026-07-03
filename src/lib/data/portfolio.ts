/**
 * Static Portfolio Companies data (no database yet).
 * Public-facing figures only.
 */

import type { PortfolioCompany } from "@/lib/types";

export const portfolioCompanies: PortfolioCompany[] = [
  {
    id: "pc_helios",
    name: "Helios Holdings",
    industry: "Business Services",
    ownershipType: "acquired",
    valuationEstimate: 12_000_000,
    revenueEstimate: 3_400_000,
    location: "Dubai, UAE",
    publicDescription:
      "An acquired, cash-flowing business services company compounded with the empire's AI and growth systems.",
    accentColor: "gold",
  },
  {
    id: "pc_atlas",
    name: "Atlas Commerce",
    industry: "E-commerce",
    ownershipType: "partner",
    valuationEstimate: 8_500_000,
    revenueEstimate: 5_100_000,
    location: "Riyadh, KSA",
    publicDescription:
      "A partner e-commerce brand scaled through the empire's performance and retention systems.",
    accentColor: "royal",
  },
  {
    id: "pc_meridian",
    name: "Meridian Group",
    industry: "Operations",
    ownershipType: "invested",
    valuationEstimate: 15_000_000,
    revenueEstimate: 6_800_000,
    location: "London, UK",
    publicDescription:
      "An operations company running on an AI automation layer built by the AI Mogul.",
    accentColor: "royal",
  },
  {
    id: "pc_nova",
    name: "Nova Studios",
    industry: "Media & Creative",
    ownershipType: "incubated",
    valuationEstimate: 4_200_000,
    revenueEstimate: 1_200_000,
    location: "Dubai, UAE",
    publicDescription:
      "An incubated creative studio productizing cinematic content for empire ventures and partners.",
    accentColor: "gold",
  },
  {
    id: "pc_vertex",
    name: "Vertex Capital",
    industry: "Financial Services",
    ownershipType: "owned",
    valuationEstimate: 22_000_000,
    revenueEstimate: 4_600_000,
    location: "Abu Dhabi, UAE",
    publicDescription:
      "A wholly owned capital vehicle structuring investments and acquisitions across the portfolio.",
    accentColor: "gold",
  },
  {
    id: "pc_orbit",
    name: "Orbit Labs",
    industry: "AI Technology",
    ownershipType: "incubated",
    valuationEstimate: 6_000_000,
    location: "Remote",
    publicDescription:
      "An incubated AI R&D lab exploring frontier applications for future empire divisions.",
    accentColor: "royal",
  },
];
