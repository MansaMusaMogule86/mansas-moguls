/**
 * Mansas Moguls — Domain Types
 *
 * TypeScript types aligned with the PRD backend schema (§5). These are the
 * canonical shapes used across the public site. No database yet — mock data
 * in `src/lib/data/*` conforms to these types so the eventual Supabase swap
 * is a drop-in.
 *
 * Naming: DB is snake_case; the app layer uses camelCase.
 */

/** Accent token used for card/icon treatments across the empire. */
export type Accent = "gold" | "royal";

export type Visibility = "public" | "anonymous" | "private" | "stealth";

export type ProjectType =
  | "empire_project"
  | "partner_project"
  | "client_project"
  | "stealth_project"
  | "portfolio_company";

export type ProjectStatus =
  | "idea"
  | "research"
  | "design"
  | "building"
  | "alpha"
  | "beta"
  | "launched"
  | "revenue"
  | "scaled"
  | "archived";

export type MilestoneStatus =
  | "pending"
  | "in_progress"
  | "completed"
  | "blocked";

export type OwnershipType =
  | "owned"
  | "invested"
  | "acquired"
  | "incubated"
  | "partner";

export type ContentType =
  | "article"
  | "announcement"
  | "video"
  | "podcast"
  | "research"
  | "case_study";

export type TaskStatus = "todo" | "doing" | "review" | "done";

export type TaskPriority = "low" | "medium" | "high" | "urgent";

export type AgentStatus = "idle" | "active" | "paused" | "error";

/** Permanent empire divisions (schema: moguls). */
export interface Mogul {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  icon: string;
  image?: string;
  heroImage?: string;
  accentColor: Accent;
  orderIndex: number;
  isActive: boolean;
  /** Denormalized capabilities for the division page (not in base schema). */
  capabilities: string[];
}

/** Internal, partner, stealth, and portfolio projects (schema: projects). */
export interface Project {
  id: string;
  mogulId: string;
  name: string;
  slug: string;
  type: ProjectType;
  visibility: Visibility;
  status: ProjectStatus;
  progressPercent: number;
  shortDescription: string;
  fullDescription: string;
  industry: string;
  image?: string;
  heroImage?: string;
  coverImage?: string;
  clientName?: string;
  isClientNamePublic: boolean;
  startedAt: string;
  targetLaunchDate?: string;
}

/** schema: project_milestones */
export interface ProjectMilestone {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: MilestoneStatus;
  dueDate?: string;
  orderIndex: number;
}

/** schema: portfolio_companies */
export interface PortfolioCompany {
  id: string;
  name: string;
  industry: string;
  ownershipType: OwnershipType;
  valuationEstimate?: number;
  revenueEstimate?: number;
  location: string;
  publicDescription: string;
  logoUrl?: string;
  websiteUrl?: string;
  accentColor: Accent;
}

/** schema: content_posts */
export interface ContentPost {
  id: string;
  title: string;
  slug: string;
  type: ContentType;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: string;
  published: boolean;
  createdAt: string;
}

/** schema: tasks */
export interface Task {
  id: string;
  projectId: string;
  assignedTo?: string;
  /** Denormalized assignee name for display (not in base schema). */
  assigneeName?: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
}

/** schema: ai_agents */
export interface AiAgent {
  id: string;
  name: string;
  role: string;
  projectId?: string;
  status: AgentStatus;
  lastRunAt?: string;
  outputSummary?: string;
}
