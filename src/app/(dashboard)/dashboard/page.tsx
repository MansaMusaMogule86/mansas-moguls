import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Panel } from "@/components/dashboard/Panel";
import { AgentStatusList } from "@/components/dashboard/AgentStatus";
import { MilestoneTracker } from "@/components/dashboard/MilestoneTracker";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { RevenuePipeline } from "@/components/dashboard/RevenuePipeline";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { empireStats } from "@/lib/data/dashboard";
import { agents } from "@/lib/data/agents";
import { projectMilestones } from "@/lib/data/projects";
import { projects } from "@/lib/data/projects";
import { getMogulById } from "@/lib/data/moguls";
import { projectStatusLabel } from "@/lib/labels";

export const metadata: Metadata = {
  title: "Command Center",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  const activeAgents = agents.filter((a) => a.status === "active");
  const activeProjects = projects
    .filter((p) => p.status !== "scaled" && p.progressPercent < 100)
    .slice(0, 4);

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Command Center"
        description="A real-time view of the empire — projects, agents, milestones, and pipeline."
      />

      {/* Empire metrics */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {empireStats.map((stat) => (
          <MetricCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Active projects */}
        <Panel
          title="Active Projects"
          link={{ label: "All projects", href: "/dashboard/projects" }}
          className="lg:col-span-2"
        >
          <div className="space-y-4">
            {activeProjects.map((project) => {
              const mogul = getMogulById(project.mogulId);
              const isGold = mogul?.accentColor !== "royal";
              return (
                <Link
                  key={project.id}
                  href={`/dashboard/projects/${project.id}`}
                  className="group block rounded-xl border border-white/5 p-4 transition-colors hover:border-white/15 hover:bg-white/[0.02]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{project.name}</span>
                      <Badge variant="secondary" className="bg-white/5 text-[10px] text-muted-foreground">
                        {projectStatusLabel[project.status]}
                      </Badge>
                    </div>
                    <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <Progress
                      value={project.progressPercent}
                      className={cn(
                        "h-1.5 bg-white/5",
                        isGold ? "[&>div]:bg-gold" : "[&>div]:bg-royal",
                      )}
                    />
                    <span className="shrink-0 text-xs font-medium text-muted-foreground">
                      {project.progressPercent}%
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Panel>

        {/* Recent activity */}
        <Panel title="Recent Activity">
          <ActivityFeed />
        </Panel>

        {/* Revenue pipeline */}
        <Panel
          title="Revenue Pipeline"
          className="lg:col-span-2"
        >
          <RevenuePipeline />
        </Panel>

        {/* Milestones */}
        <Panel title="Milestones" link={{ label: "View all", href: "/dashboard/milestones" }}>
          <MilestoneTracker milestones={projectMilestones.slice(0, 4)} showProject />
        </Panel>
      </div>

      {/* Agents */}
      <Panel
        title="AI Agents Running"
        link={{ label: "All agents", href: "/dashboard/agents" }}
      >
        <AgentStatusList agents={activeAgents} />
      </Panel>
    </div>
  );
}
