import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { projects } from "@/lib/data/projects";
import { getMogulById } from "@/lib/data/moguls";
import { projectTypeLabel, projectStatusLabel } from "@/lib/labels";

export const metadata: Metadata = {
  title: "Projects",
  robots: { index: false, follow: false },
};

export default function DashboardProjectsPage() {
  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Projects"
        description="Every project in the empire — internal, partner, stealth, and portfolio."
        action={
          <Button className="bg-gold text-primary-foreground hover:bg-gold-bright">
            <Plus className="size-4" />
            New project
          </Button>
        }
      />

      <div className="glass-panel overflow-hidden rounded-2xl">
        {/* Header row (desktop) */}
        <div className="hidden grid-cols-[2fr_1fr_1fr_1.4fr] gap-4 border-b border-white/10 px-5 py-3 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground md:grid">
          <span>Project</span>
          <span>Type</span>
          <span>Status</span>
          <span>Progress</span>
        </div>

        <div className="divide-y divide-white/5">
          {projects.map((project) => {
            const mogul = getMogulById(project.mogulId);
            const isGold = mogul?.accentColor !== "royal";
            return (
              <Link
                key={project.id}
                href={`/dashboard/projects/${project.id}`}
                className="group grid grid-cols-1 gap-3 px-5 py-4 transition-colors hover:bg-white/[0.02] md:grid-cols-[2fr_1fr_1fr_1.4fr] md:items-center md:gap-4"
              >
                <div className="flex items-center justify-between gap-2 md:block">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{project.name}</span>
                      <ArrowUpRight className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {mogul?.name ?? project.industry}
                    </span>
                  </div>
                </div>
                <div>
                  <Badge
                    variant="outline"
                    className={cn(
                      "border-white/15 bg-white/5 text-[11px]",
                      isGold ? "text-gold" : "text-royal-bright",
                    )}
                  >
                    {projectTypeLabel[project.type]}
                  </Badge>
                </div>
                <div>
                  <Badge variant="secondary" className="bg-white/5 text-[11px] text-muted-foreground">
                    {projectStatusLabel[project.status]}
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
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
      </div>
    </div>
  );
}
