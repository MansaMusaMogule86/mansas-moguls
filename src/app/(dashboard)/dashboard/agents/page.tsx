import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { AgentStatusList } from "@/components/dashboard/AgentStatus";
import { Button } from "@/components/ui/button";
import { agents } from "@/lib/data/agents";

export const metadata: Metadata = {
  title: "AI Agents",
  robots: { index: false, follow: false },
};

export default function AgentsPage() {
  const count = (status: string) => agents.filter((a) => a.status === status).length;

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="AI Agents"
        description="The autonomous workforce running across the empire's divisions."
        action={
          <Button className="bg-gold text-primary-foreground hover:bg-gold-bright">
            <Plus className="size-4" />
            Deploy agent
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <MetricCard label="Total Agents" value={String(agents.length)} />
        <MetricCard label="Active" value={String(count("active"))} trend="up" delta="running" />
        <MetricCard label="Paused" value={String(count("paused"))} />
        <MetricCard label="Errors" value={String(count("error"))} trend={count("error") ? "down" : "flat"} delta={count("error") ? "attention" : "clear"} />
      </div>

      <AgentStatusList agents={agents} />
    </div>
  );
}
