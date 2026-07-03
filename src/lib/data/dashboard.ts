/**
 * Static dashboard support data (no database yet):
 * files, messages, activity feed, notifications, and revenue pipeline.
 * These are dashboard-only view models, not part of the core PRD schema.
 */

export type EmpireFile = {
  id: string;
  name: string;
  kind: "doc" | "sheet" | "deck" | "image" | "pdf";
  projectName: string;
  size: string;
  updatedAt: string;
};

export const files: EmpireFile[] = [
  {
    id: "file_1",
    name: "Empire OS — Architecture.pdf",
    kind: "pdf",
    projectName: "Empire OS",
    size: "2.4 MB",
    updatedAt: "2026-07-02",
  },
  {
    id: "file_2",
    name: "Aurora Briefing Template.deck",
    kind: "deck",
    projectName: "Aurora Intelligence",
    size: "8.1 MB",
    updatedAt: "2026-07-01",
  },
  {
    id: "file_3",
    name: "Portfolio Model Q3.sheet",
    kind: "sheet",
    projectName: "Vertex Capital",
    size: "640 KB",
    updatedAt: "2026-06-30",
  },
  {
    id: "file_4",
    name: "Empire Film — Master.image",
    kind: "image",
    projectName: "Studio Signal",
    size: "45 MB",
    updatedAt: "2026-06-28",
  },
  {
    id: "file_5",
    name: "Partner Agreement — Atlas.doc",
    kind: "doc",
    projectName: "Atlas Commerce",
    size: "220 KB",
    updatedAt: "2026-06-26",
  },
];

export type Message = {
  id: string;
  from: string;
  role: string;
  preview: string;
  time: string;
  unread: boolean;
};

export const messages: Message[] = [
  {
    id: "msg_1",
    from: "Atlas Commerce",
    role: "Partner",
    preview: "The new funnel is converting — can we push more budget this week?",
    time: "2h ago",
    unread: true,
  },
  {
    id: "msg_2",
    from: "Meridian Group",
    role: "Partner",
    preview: "Automation cut our turnaround by half. Next phase scope attached.",
    time: "5h ago",
    unread: true,
  },
  {
    id: "msg_3",
    from: "Intelligence Mogul",
    role: "Team",
    preview: "Q2 briefing is ready for your review before it ships.",
    time: "1d ago",
    unread: false,
  },
  {
    id: "msg_4",
    from: "Vertex Capital",
    role: "Portfolio",
    preview: "Acquisition target shortlist updated with two new candidates.",
    time: "2d ago",
    unread: false,
  },
];

export type Activity = {
  id: string;
  actor: string;
  action: string;
  target: string;
  time: string;
};

export const activity: Activity[] = [
  { id: "act_1", actor: "Forge", action: "generated", target: "orchestration API scaffolding", time: "20m ago" },
  { id: "act_2", actor: "Growth Mogul", action: "moved task", target: "Scale winning ad set → Review", time: "1h ago" },
  { id: "act_3", actor: "Scout", action: "completed a run on", target: "Aurora Intelligence", time: "2h ago" },
  { id: "act_4", actor: "Founder", action: "approved milestone", target: "Agent orchestration core", time: "4h ago" },
  { id: "act_5", actor: "Studio Mogul", action: "published", target: "Empire press kit", time: "1d ago" },
];

export type Notification = {
  id: string;
  title: string;
  body: string;
  time: string;
  tone: "info" | "success" | "warning";
};

export const notifications: Notification[] = [
  { id: "ntf_1", title: "Agent error", body: "Sentinel hit a data source timeout.", time: "1h ago", tone: "warning" },
  { id: "ntf_2", title: "Milestone completed", body: "Aurora research agent network shipped.", time: "3h ago", tone: "success" },
  { id: "ntf_3", title: "New partner message", body: "Atlas Commerce sent a message.", time: "2h ago", tone: "info" },
];

export type PipelineStage = {
  stage: string;
  value: number;
  deals: number;
};

/** Revenue pipeline (value in USD). */
export const revenuePipeline: PipelineStage[] = [
  { stage: "Lead", value: 1_200_000, deals: 12 },
  { stage: "Qualified", value: 2_400_000, deals: 8 },
  { stage: "Proposal", value: 3_100_000, deals: 5 },
  { stage: "Closing", value: 1_800_000, deals: 3 },
];

export const empireStats = [
  { label: "Active Projects", value: "24", delta: "+3", trend: "up" as const },
  { label: "AI Agents Running", value: "4", delta: "+1", trend: "up" as const },
  { label: "Revenue Pipeline", value: "$8.5M", delta: "+12%", trend: "up" as const },
  { label: "Tasks Due", value: "6", delta: "2 urgent", trend: "flat" as const },
];
