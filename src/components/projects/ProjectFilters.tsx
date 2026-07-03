"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";
import type { Project, ProjectType } from "@/lib/types";

type Filter = "all" | ProjectType;

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "empire_project", label: "Empire Projects" },
  { value: "partner_project", label: "Partner Projects" },
  { value: "stealth_project", label: "Stealth Projects" },
  { value: "portfolio_company", label: "Portfolio Companies" },
];

/**
 * Client-side filterable grid for the projects index.
 */
export function ProjectFilters({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Filter>("all");

  const visible = useMemo(
    () =>
      active === "all"
        ? projects
        : projects.filter((p) => p.type === active),
    [active, projects],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const isActive = active === f.value;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setActive(f.value)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "border-gold/40 bg-gold/10 text-gold"
                  : "border-white/10 bg-white/5 text-muted-foreground hover:text-foreground",
              )}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          No projects in this category yet.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
