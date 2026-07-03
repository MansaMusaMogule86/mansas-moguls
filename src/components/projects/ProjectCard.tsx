import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
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
      className="group hud-panel flex min-h-[280px] flex-col rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1 sm:p-7"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase font-mono tracking-widest text-muted-foreground">
          <span className={cn(isGold ? "text-gold" : "text-royal-bright")}>
            [{projectTypeLabel[project.type]}]
          </span>
          <span className="text-white/40">/</span>
          <span>{projectStatusLabel[project.status]}</span>
          {isAnonymous && (
             <>
                <span className="text-white/40">/</span>
                <span className="opacity-60">Anonymous</span>
             </>
          )}
        </div>
        <ArrowUpRight className="size-5 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
      </div>

      <h3 className="mt-5 text-xl font-heading tracking-tight sm:text-2xl drop-shadow-md text-foreground">{project.name}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground/80">
        {project.shortDescription}
      </p>

      <div className="mt-6 space-y-3 pt-5 relative">
        <div className="absolute top-0 left-0 w-12 h-px bg-gold/20" />
        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          <span>{mogul?.name ?? project.industry}</span>
          <span className="font-medium text-foreground">
            {project.progressPercent}%
          </span>
        </div>
        <Progress
          value={project.progressPercent}
          className={cn(
            "h-1 bg-white/5",
            isGold ? "[&>div]:bg-gold" : "[&>div]:bg-royal",
          )}
        />
      </div>
    </Link>
  );
}
