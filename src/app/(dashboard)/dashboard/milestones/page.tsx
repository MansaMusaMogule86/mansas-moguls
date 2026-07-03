import type { Metadata } from "next";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Panel } from "@/components/dashboard/Panel";
import { MilestoneTracker } from "@/components/dashboard/MilestoneTracker";
import { projects, projectMilestones } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Milestones",
  robots: { index: false, follow: false },
};

export default function MilestonesPage() {
  // Group milestones by project (only projects that have milestones).
  const groups = projects
    .map((project) => ({
      project,
      milestones: projectMilestones.filter((m) => m.projectId === project.id),
    }))
    .filter((g) => g.milestones.length > 0);

  const total = projectMilestones.length;
  const completed = projectMilestones.filter((m) => m.status === "completed").length;
  const inProgress = projectMilestones.filter((m) => m.status === "in_progress").length;

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Milestones"
        description="Delivery checkpoints across every active project in the empire."
      />

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <MetricCard label="Total" value={String(total)} />
        <MetricCard label="Completed" value={String(completed)} trend="up" delta="shipped" />
        <MetricCard label="In Progress" value={String(inProgress)} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {groups.map(({ project, milestones }) => (
          <Panel
            key={project.id}
            title={project.name}
            link={{ label: "Open", href: `/dashboard/projects/${project.id}` }}
          >
            <MilestoneTracker milestones={milestones} />
          </Panel>
        ))}
      </div>
    </div>
  );
}
