import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { taskStatusLabel, taskPriorityLabel } from "@/lib/labels";
import { taskColumns, getTasksByStatus } from "@/lib/data/tasks";
import { projects } from "@/lib/data/projects";
import type { Task, TaskPriority } from "@/lib/types";

const priorityStyle: Record<TaskPriority, string> = {
  urgent: "border-destructive/30 bg-destructive/10 text-destructive",
  high: "border-gold/30 bg-gold/10 text-gold",
  medium: "border-royal/30 bg-royal/10 text-royal-bright",
  low: "border-white/10 bg-white/5 text-muted-foreground",
};

function projectName(projectId: string): string {
  const match = projects.find((p) => p.id === projectId);
  return match?.name ?? "—";
}

function TaskCard({ task }: { task: Task }) {
  return (
    <div className="glass-panel rounded-xl p-4">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium leading-snug">{task.title}</p>
        <Badge
          variant="outline"
          className={cn("shrink-0 text-[10px]", priorityStyle[task.priority])}
        >
          {taskPriorityLabel[task.priority]}
        </Badge>
      </div>
      <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
        {task.description}
      </p>
      <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
        <span className="truncate">{projectName(task.projectId)}</span>
        {task.assigneeName && (
          <span className="shrink-0 rounded-full bg-white/5 px-2 py-0.5">
            {task.assigneeName}
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Kanban board of tasks grouped by status.
 */
export function TaskBoard() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {taskColumns.map((status) => {
        const columnTasks = getTasksByStatus(status);
        return (
          <div key={status} className="rounded-2xl border border-white/10 bg-white/[0.02] p-3">
            <div className="flex items-center justify-between px-1 pb-3">
              <h3 className="text-sm font-semibold">{taskStatusLabel[status]}</h3>
              <span className="grid size-5 place-items-center rounded-full bg-white/5 text-[11px] text-muted-foreground">
                {columnTasks.length}
              </span>
            </div>
            <div className="space-y-3">
              {columnTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
              {columnTasks.length === 0 && (
                <p className="px-1 py-4 text-xs text-muted-foreground">No tasks</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
