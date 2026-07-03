import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { TaskBoard } from "@/components/dashboard/TaskBoard";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Tasks",
  robots: { index: false, follow: false },
};

export default function TasksPage() {
  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Tasks"
        description="Work in motion across the empire, grouped by stage."
        action={
          <Button className="bg-gold text-primary-foreground hover:bg-gold-bright">
            <Plus className="size-4" />
            New task
          </Button>
        }
      />
      <TaskBoard />
    </div>
  );
}
