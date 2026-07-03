import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { agentStatusLabel } from "@/lib/labels";
import { projects } from "@/lib/data/projects";
import type { AiAgent, AgentStatus as AgentStatusType } from "@/lib/types";

const statusDot: Record<AgentStatusType, string> = {
  active: "bg-emerald-400",
  idle: "bg-muted-foreground",
  paused: "bg-gold",
  error: "bg-destructive",
};

function projectName(projectId?: string): string {
  if (!projectId) return "Empire-wide";
  return projects.find((p) => p.id === projectId)?.name ?? "—";
}

function timeAgo(iso?: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function AgentRow({ agent }: { agent: AiAgent }) {
  return (
    <div className="glass-panel flex items-start gap-4 rounded-xl p-4">
      <div className="grid size-10 shrink-0 place-items-center rounded-lg border border-royal/30 bg-royal/10 text-royal-bright">
        <Bot className="size-5" strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-semibold">{agent.name}</p>
          <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className={cn("size-1.5 rounded-full", statusDot[agent.status])} />
            {agentStatusLabel[agent.status]}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{agent.role}</p>
        {agent.outputSummary && (
          <p className="mt-2 line-clamp-1 text-xs text-foreground/80">
            {agent.outputSummary}
          </p>
        )}
        <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>{projectName(agent.projectId)}</span>
          <span>{timeAgo(agent.lastRunAt)}</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Compact list of AI agents and their live status.
 */
export function AgentStatusList({ agents }: { agents: AiAgent[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {agents.map((agent) => (
        <AgentRow key={agent.id} agent={agent} />
      ))}
    </div>
  );
}
