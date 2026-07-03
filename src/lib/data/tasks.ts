/**
 * Static tasks data for the dashboard (no database yet).
 */

import type { Task, TaskStatus } from "@/lib/types";

export const tasks: Task[] = [
  {
    id: "tsk_1",
    projectId: "prj_empire_os",
    assigneeName: "Founder",
    title: "Finalize agent orchestration API",
    description: "Lock the internal contract for spawning and monitoring agents.",
    status: "doing",
    priority: "urgent",
    dueDate: "2026-07-08",
  },
  {
    id: "tsk_2",
    projectId: "prj_empire_os",
    assigneeName: "AI Mogul",
    title: "Wire capital dashboard data",
    description: "Connect revenue and portfolio widgets to the data layer.",
    status: "todo",
    priority: "high",
    dueDate: "2026-07-14",
  },
  {
    id: "tsk_3",
    projectId: "prj_aurora",
    assigneeName: "Intelligence Mogul",
    title: "Ship executive briefing template v2",
    description: "Improve the auto-generated briefing layout and summary quality.",
    status: "review",
    priority: "medium",
    dueDate: "2026-07-05",
  },
  {
    id: "tsk_4",
    projectId: "prj_studio_signal",
    assigneeName: "Studio Mogul",
    title: "Render Q3 empire film",
    description: "Final color grade and export for the empire brand film.",
    status: "done",
    priority: "medium",
    dueDate: "2026-06-28",
  },
  {
    id: "tsk_5",
    projectId: "prj_aurora",
    assigneeName: "Growth Mogul",
    title: "Design intelligence waitlist funnel",
    description: "Landing + capture flow for the intelligence briefing list.",
    status: "todo",
    priority: "low",
    dueDate: "2026-07-20",
  },
  {
    id: "tsk_6",
    projectId: "prj_empire_os",
    assigneeName: "Founder",
    title: "Review stealth fintech alpha",
    description: "Assess alpha build and decide on next milestone gate.",
    status: "doing",
    priority: "high",
    dueDate: "2026-07-10",
  },
  {
    id: "tsk_7",
    projectId: "prj_partner_atlas",
    assigneeName: "Growth Mogul",
    title: "Scale winning ad set",
    description: "Increase budget on the top-performing acquisition campaign.",
    status: "review",
    priority: "high",
    dueDate: "2026-07-03",
  },
  {
    id: "tsk_8",
    projectId: "prj_studio_signal",
    assigneeName: "Studio Mogul",
    title: "Publish press kit",
    description: "Assemble and publish the empire press kit assets.",
    status: "done",
    priority: "low",
    dueDate: "2026-06-25",
  },
];

export const taskColumns: TaskStatus[] = ["todo", "doing", "review", "done"];

export function getTasksByStatus(status: TaskStatus): Task[] {
  return tasks.filter((t) => t.status === status);
}
