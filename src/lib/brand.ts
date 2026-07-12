/**
 * Mansas Moguls — Brand & Site Configuration
 *
 * Single source of truth for empire copy, navigation, and design tokens
 * referenced from TypeScript. Visual tokens live in `globals.css`.
 */

export const brand = {
  name: "Mansas Moguls",
  monogram: "MM",
  tagline: "The Empire Operating System",
  description:
    "We build, acquire, automate, and scale intelligent businesses.",
  mission:
    "An AI-powered holding empire that builds, acquires, automates, scales, and compounds intelligent businesses.",
} as const;

/** Primary marketing navigation (from PRD §6). */
export const mainNav = [
  { label: "Empire", href: "/empire" },
  { label: "Moguls", href: "/moguls" },
  { label: "Projects", href: "/projects" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Intelligence", href: "/intelligence" },
  { label: "Media", href: "/media" },
  { label: "Join The Empire", href: "/join" },
] as const;

export const primaryCta = { label: "Enter Dashboard", href: "/dashboard" } as const;

/** Dashboard sidebar navigation. Icons resolved in the sidebar component. */
export const dashboardNav = [
  { label: "Command Center", href: "/dashboard", icon: "layout-dashboard" },
  { label: "Projects", href: "/dashboard/projects", icon: "folder-kanban" },
  { label: "Tasks", href: "/dashboard/tasks", icon: "check-square" },
  { label: "AI Agents", href: "/dashboard/agents", icon: "bot" },
  { label: "Intelligence Mogul", href: "/dashboard/moguls/intelligence-mogul", icon: "brain-circuit" },
  { label: "Milestones", href: "/dashboard/milestones", icon: "flag" },
  { label: "Files", href: "/dashboard/files", icon: "folder" },
  { label: "Messages", href: "/dashboard/messages", icon: "message-square" },
  { label: "Settings", href: "/dashboard/settings", icon: "settings" },
] as const;

/** Footer link groups. */
export const footerNav = [
  {
    title: "Empire",
    links: [
      { label: "The Empire", href: "/empire" },
      { label: "Moguls", href: "/moguls" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Work",
    links: [
      { label: "Projects", href: "/projects" },
      { label: "Intelligence", href: "/intelligence" },
      { label: "Media", href: "/media" },
      { label: "Events", href: "/events" },
    ],
  },
  {
    title: "Engage",
    links: [
      { label: "Join The Empire", href: "/join" },
      { label: "Investors", href: "/investors" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;

/** Empire flywheel stages (from PRD home §7). */
export const flywheel = [
  "Build",
  "Acquire",
  "Automate",
  "Scale",
  "Compound",
] as const;

/** Headline metrics rendered in the hero. Static for the first sprint. */
export const empireMetrics = [
  { label: "Active Projects", value: "24" },
  { label: "AI Agents", value: "60+" },
  { label: "Portfolio Companies", value: "9" },
  { label: "Markets", value: "5" },
] as const;
