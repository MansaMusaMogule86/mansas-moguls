import type { Metadata } from "next";
import { EyeOff } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Section } from "@/components/shared/Section";
import { CTASection } from "@/components/shared/CTASection";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Stealth Projects",
  description:
    "Anonymous stealth ventures in active development across the empire.",
};

export default function StealthProjectsPage() {
  // Stealth work is shown anonymously only — never with identifying detail.
  const list = projects.filter(
    (p) => p.type === "stealth_project" && p.visibility === "anonymous",
  );

  return (
    <>
      <PageHeader
        eyebrow="Stealth"
        title="Building in the shadows"
        description="Anonymous ventures in active development. Only stage, division, and thesis are public until launch."
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-muted-foreground">
          <EyeOff className="size-3.5" />
          Details withheld under empire visibility rules
        </div>
      </PageHeader>
      <Section>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {list.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Section>
      <CTASection />
    </>
  );
}
