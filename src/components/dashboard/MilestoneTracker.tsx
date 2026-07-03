import { Check, CircleDot, Circle, Ban } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { milestoneStatusLabel } from "@/lib/labels";
import { projects } from "@/lib/data/projects";
import type { ProjectMilestone, MilestoneStatus } from "@/lib/types";

const icon: Record<MilestoneStatus, LucideIcon> = {
  completed: Check,
  in_progress: CircleDot,
  pending: Circle,
  blocked: Ban,
};

const tone: Record<MilestoneStatus, string> = {
  completed: "text-gold",
  in_progress: "text-royal-bright",
  pending: "text-muted-foreground",
  blocked: "text-destructive",
};

function projectName(projectId: string): string {
  return projects.find((p) => p.id === projectId)?.name ?? "—";
}

/**
 * Vertical milestone tracker used on the dashboard and milestones page.
 */
export function MilestoneTracker({
  milestones,
  showProject = false,
}: {
  milestones: ProjectMilestone[];
  showProject?: boolean;
}) {
  return (
    <ul className="space-y-4">
      {milestones.map((m) => {
        const Icon = icon[m.status];
        return (
          <li key={m.id} className="flex items-start gap-3">
            <Icon className={cn("mt-0.5 size-4 shrink-0", tone[m.status])} />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2">
                <span className="text-sm font-medium">{m.title}</span>
                <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {milestoneStatusLabel[m.status]}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">{m.description}</p>
              {showProject && (
                <p className="mt-1 text-[11px] text-muted-foreground/70">
                  {projectName(m.projectId)}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
