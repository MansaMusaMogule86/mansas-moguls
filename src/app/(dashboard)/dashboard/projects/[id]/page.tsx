import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { MilestoneTracker } from "@/components/dashboard/MilestoneTracker";
import { AgentStatusList } from "@/components/dashboard/AgentStatus";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  projects,
  getProjectById,
  getMilestonesForProject,
} from "@/lib/data/projects";
import { getMogulById } from "@/lib/data/moguls";
import { tasks } from "@/lib/data/tasks";
import { agents } from "@/lib/data/agents";
import { files } from "@/lib/data/dashboard";
import { projectTypeLabel, projectStatusLabel, taskStatusLabel } from "@/lib/labels";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);
  return {
    title: project ? project.name : "Project",
    robots: { index: false, follow: false },
  };
}

export default async function ProjectWorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  const mogul = getMogulById(project.mogulId);
  const milestones = getMilestonesForProject(project.id);
  const projectTasks = tasks.filter((t) => t.projectId === project.id);
  const projectAgents = agents.filter((a) => a.projectId === project.id);
  const projectFiles = files.filter((f) => f.projectName === project.name);

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/dashboard/projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Projects
        </Link>
      </div>

      <DashboardHeader
        title={project.name}
        description={project.shortDescription}
        action={
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-white/15 bg-white/5 text-gold">
              {projectTypeLabel[project.type]}
            </Badge>
            <Badge variant="secondary" className="bg-white/5 text-muted-foreground">
              {projectStatusLabel[project.status]}
            </Badge>
          </div>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <MetricCard label="Progress" value={`${project.progressPercent}%`} />
        <MetricCard label="Open Tasks" value={String(projectTasks.filter((t) => t.status !== "done").length)} />
        <MetricCard label="Milestones" value={String(milestones.length)} />
        <MetricCard label="Agents" value={String(projectAgents.length)} />
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="bg-white/5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="glass-panel rounded-2xl p-6">
            <h2 className="text-lg font-semibold">About this project</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {project.fullDescription}
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
              <MetaItem label="Mogul" value={mogul?.name ?? "—"} />
              <MetaItem label="Industry" value={project.industry} />
              <MetaItem
                label="Client"
                value={
                  project.isClientNamePublic && project.clientName
                    ? project.clientName
                    : "Confidential"
                }
              />
              <MetaItem
                label="Started"
                value={new Date(project.startedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                })}
              />
            </dl>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="mt-6">
          <div className="glass-panel rounded-2xl p-6">
            {projectTasks.length > 0 ? (
              <ul className="divide-y divide-white/5">
                {projectTasks.map((t) => (
                  <li key={t.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                    <div>
                      <p className="text-sm font-medium">{t.title}</p>
                      <p className="text-xs text-muted-foreground">{t.assigneeName}</p>
                    </div>
                    <Badge variant="secondary" className="bg-white/5 text-[11px] text-muted-foreground">
                      {taskStatusLabel[t.status]}
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState label="No tasks for this project yet." />
            )}
          </div>
        </TabsContent>

        <TabsContent value="milestones" className="mt-6">
          <div className="glass-panel rounded-2xl p-6">
            {milestones.length > 0 ? (
              <MilestoneTracker milestones={milestones} />
            ) : (
              <EmptyState label="No milestones yet." />
            )}
          </div>
        </TabsContent>

        <TabsContent value="agents" className="mt-6">
          {projectAgents.length > 0 ? (
            <AgentStatusList agents={projectAgents} />
          ) : (
            <div className="glass-panel rounded-2xl p-6">
              <EmptyState label="No agents assigned to this project." />
            </div>
          )}
        </TabsContent>

        <TabsContent value="files" className="mt-6">
          <div className="glass-panel rounded-2xl p-6">
            {projectFiles.length > 0 ? (
              <ul className="divide-y divide-white/5">
                {projectFiles.map((f) => (
                  <li key={f.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                    <FileText className="size-4 text-gold" />
                    <span className="flex-1 text-sm">{f.name}</span>
                    <span className="text-xs text-muted-foreground">{f.size}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState label="No files uploaded yet." />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </dt>
      <dd className={cn("mt-1 text-foreground")}>{value}</dd>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return <p className="py-6 text-center text-sm text-muted-foreground">{label}</p>;
}
