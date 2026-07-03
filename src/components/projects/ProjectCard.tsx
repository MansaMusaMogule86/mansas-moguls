import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { projectTypeLabel, projectStatusLabel } from "@/lib/labels";
import { getMogulById } from "@/lib/data/moguls";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  const mogul = getMogulById(project.mogulId);
  const isGold = mogul?.accentColor !== "royal";
  const isAnonymous = project.visibility === "anonymous";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group glass-panel flex min-h-[280px] flex-col rounded-3xl border border-white/10 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 sm:p-7"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className={cn(
              "border-white/15 bg-white/5",
              isGold ? "text-gold" : "text-royal-bright",
            )}
          >
            {projectTypeLabel[project.type]}
          </Badge>
          <Badge variant="secondary" className="bg-white/5 text-muted-foreground">
            {projectStatusLabel[project.status]}
          </Badge>
          {isAnonymous && (
            <Badge
              variant="outline"
              className="border-white/10 bg-white/5 text-muted-foreground"
            >
              Anonymous
            </Badge>
          )}
        </div>
        <ArrowUpRight className="size-5 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
      </div>

      <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em]">{project.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {project.shortDescription}
      </p>

      <div className="mt-6 space-y-2 border-t border-white/5 pt-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{mogul?.name ?? project.industry}</span>
          <span className="font-medium text-foreground">
            {project.progressPercent}%
          </span>
        </div>
        <Progress
          value={project.progressPercent}
          className={cn(
            "h-1.5 bg-white/5",
            isGold ? "[&>div]:bg-gold" : "[&>div]:bg-royal",
          )}
        />
      </div>
    </Link>
  );
}
