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
      className={cn(
        "group hud-panel relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.02] backdrop-blur-xl sm:p-7",
        isGold
          ? "hover:border-gold/40 hover:shadow-[0_24px_56px_rgba(212,175,55,0.12)]"
          : "hover:border-royal/40 hover:shadow-[0_24px_56px_rgba(43,84,240,0.12)]",
      )}
    >
      {/* Top accent line */}
      <span
        className={cn(
          "absolute inset-x-0 top-0 h-[2px] transition-all duration-700 w-[200%] -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0",
          isGold
            ? "bg-gradient-to-r from-transparent via-gold to-transparent shadow-[0_0_12px_rgba(212,175,55,0.8)]"
            : "bg-gradient-to-r from-transparent via-royal-bright to-transparent shadow-[0_0_12px_rgba(43,84,240,0.8)]",
        )}
      />

      <div className="flex items-start justify-between gap-4">
        {/* Type + status badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "rounded-full border px-2.5 py-0.5 text-[10px] font-mono font-medium uppercase tracking-wider",
              isGold
                ? "border-gold/20 bg-gold/5 text-gold"
                : "border-royal/25 bg-royal/5 text-royal-bright",
            )}
          >
            {projectTypeLabel[project.type]}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
            {projectStatusLabel[project.status]}
          </span>
          {isAnonymous && (
            <span className="rounded-full border border-white/8 bg-white/3 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground/50">
              Anonymous
            </span>
          )}
        </div>
        <ArrowUpRight className={cn(
          "size-4 shrink-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
          isGold ? "text-muted-foreground group-hover:text-gold" : "text-muted-foreground group-hover:text-royal-bright"
        )} />
      </div>

      <h3 className="mt-5 text-xl font-heading tracking-tight sm:text-2xl text-white drop-shadow-sm">{project.name}</h3>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground/60 group-hover:text-muted-foreground/80 transition-colors">
        {project.shortDescription}
      </p>

      <div className="mt-6 space-y-2.5 pt-4 relative">
        <div className={cn("absolute top-0 left-0 w-10 h-px", isGold ? "bg-gold/20" : "bg-royal/20")} />
        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          <span>{mogul?.name ?? project.industry}</span>
          <span className="font-semibold text-foreground">{project.progressPercent}%</span>
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
