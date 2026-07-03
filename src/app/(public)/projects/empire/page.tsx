import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { Section } from "@/components/shared/Section";
import { CTASection } from "@/components/shared/CTASection";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Empire Projects",
  description: "Internal ventures the empire is building and operating.",
};

export default function EmpireProjectsPage() {
  const list = projects.filter(
    (p) => p.type === "empire_project" && p.visibility === "public",
  );

  return (
    <>
      <PageHeader
        eyebrow="Empire Projects"
        title="Built and owned by the empire"
        description="Internal ventures created, operated, and scaled across the Moguls."
      />
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
