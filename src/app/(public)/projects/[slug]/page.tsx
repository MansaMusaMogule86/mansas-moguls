import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, Circle, CircleDot, Ban } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Section } from "@/components/shared/Section";
import { CTASection } from "@/components/shared/CTASection";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  projects,
  getProjectBySlug,
  getMilestonesForProject,
} from "@/lib/data/projects";
import { getMogulById } from "@/lib/data/moguls";
import {
  projectTypeLabel,
  projectStatusLabel,
  milestoneStatusLabel,
} from "@/lib/labels";
import type { MilestoneStatus } from "@/lib/types";

export function generateStaticParams() {
  return projects
    .filter((p) => p.visibility === "public" || p.visibility === "anonymous")
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return { title: project.name, description: project.shortDescription };
}

const milestoneIcon: Record<MilestoneStatus, LucideIcon> = {
  completed: Check,
  in_progress: CircleDot,
  pending: Circle,
  blocked: Ban,
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  // Public safety: only public/anonymous projects are ever rendered.
  if (
    !project ||
    (project.visibility !== "public" && project.visibility !== "anonymous")
  ) {
    notFound();
  }

  const mogul = getMogulById(project.mogulId);
  const isGold = mogul?.accentColor !== "royal";
  const milestones = getMilestonesForProject(project.id);
  const isAnonymous = project.visibility === "anonymous";

  return (
    <>
      <PageHeader
        eyebrow={projectTypeLabel[project.type]}
        title={project.name}
        description={project.fullDescription}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/projects"
            className="mr-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            All projects
          </Link>
          <Badge variant="secondary" className="bg-white/5 text-muted-foreground">
            {projectStatusLabel[project.status]}
          </Badge>
          <Badge variant="outline" className="border-white/15 bg-white/5 text-muted-foreground">
            {project.industry}
          </Badge>
          {isAnonymous && (
            <Badge variant="outline" className="border-white/10 bg-white/5 text-muted-foreground">
              Anonymous
            </Badge>
          )}
        </div>
      </PageHeader>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          {/* Progress + milestones */}
          <div className="glass-panel rounded-2xl p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Progress</h2>
              <span className="font-heading text-2xl font-semibold text-gold">
                {project.progressPercent}%
              </span>
            </div>
            <Progress
              value={project.progressPercent}
              className={cn(
                "mt-4 h-2 bg-white/5",
                isGold ? "[&>div]:bg-gold" : "[&>div]:bg-royal",
              )}
            />

            <h3 className="mt-10 text-lg font-semibold">Milestones</h3>
            {milestones.length > 0 ? (
              <ul className="mt-5 space-y-4">
                {milestones.map((m) => {
                  const Icon = milestoneIcon[m.status];
                  return (
                    <li key={m.id} className="flex items-start gap-3">
                      <Icon
                        className={cn(
                          "mt-0.5 size-4 shrink-0",
                          m.status === "completed" && "text-gold",
                          m.status === "in_progress" && "text-royal-bright",
                          m.status === "pending" && "text-muted-foreground",
                          m.status === "blocked" && "text-destructive",
                        )}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{m.title}</span>
                          <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                            {milestoneStatusLabel[m.status]}
                          </span>
                        </div>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {m.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-5 text-sm text-muted-foreground">
                Public milestones will appear here as this project advances.
              </p>
            )}
          </div>

          {/* Meta panel */}
          <div className="glass-panel h-fit rounded-2xl p-8">
            <h2 className="text-lg font-semibold">Overview</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <MetaRow label="Mogul owner" value={mogul?.name ?? "—"} />
              <MetaRow label="Type" value={projectTypeLabel[project.type]} />
              <MetaRow label="Status" value={projectStatusLabel[project.status]} />
              <MetaRow label="Industry" value={project.industry} />
              <MetaRow
                label="Client"
                value={
                  project.isClientNamePublic && project.clientName
                    ? project.clientName
                    : "Confidential"
                }
              />
              <MetaRow
                label="Started"
                value={new Date(project.startedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                })}
              />
              {project.targetLaunchDate && (
                <MetaRow
                  label="Target launch"
                  value={new Date(project.targetLaunchDate).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "short" },
                  )}
                />
              )}
            </dl>
          </div>
        </div>
      </Section>

      <CTASection />
    </>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-3 last:border-0 last:pb-0">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium text-foreground">{value}</dd>
    </div>
  );
}
