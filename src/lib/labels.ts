/**
 * Human-readable labels for schema enums.
 */

import type {
  ProjectType,
  ProjectStatus,
  MilestoneStatus,
  OwnershipType,
  ContentType,
  TaskStatus,
  TaskPriority,
  AgentStatus,
} from "./types";

export const projectTypeLabel: Record<ProjectType, string> = {
  empire_project: "Empire Project",
  partner_project: "Partner Project",
  client_project: "Client Project",
  stealth_project: "Stealth Project",
  portfolio_company: "Portfolio Company",
};

export const projectStatusLabel: Record<ProjectStatus, string> = {
  idea: "Idea",
  research: "Research",
  design: "Design",
  building: "Building",
  alpha: "Alpha",
  beta: "Beta",
  launched: "Launched",
  revenue: "Revenue",
  scaled: "Scaled",
  archived: "Archived",
};

export const milestoneStatusLabel: Record<MilestoneStatus, string> = {
  pending: "Pending",
  in_progress: "In Progress",
  completed: "Completed",
  blocked: "Blocked",
};

export const ownershipTypeLabel: Record<OwnershipType, string> = {
  owned: "Owned",
  invested: "Invested",
  acquired: "Acquired",
  incubated: "Incubated",
  partner: "Partner",
};

export const contentTypeLabel: Record<ContentType, string> = {
  article: "Article",
  announcement: "Announcement",
  video: "Video",
  podcast: "Podcast",
  research: "Research",
  case_study: "Case Study",
};

export const taskStatusLabel: Record<TaskStatus, string> = {
  todo: "To Do",
  doing: "In Progress",
  review: "Review",
  done: "Done",
};

export const taskPriorityLabel: Record<TaskPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
};

export const agentStatusLabel: Record<AgentStatus, string> = {
  idle: "Idle",
  active: "Active",
  paused: "Paused",
  error: "Error",
};
