import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { Section } from "@/components/shared/Section";
import { CTASection } from "@/components/shared/CTASection";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "The empire in motion — empire, partner, stealth, and portfolio projects.",
};

export default function ProjectsPage() {
  // Public visibility only — nothing private is ever listed.
  const publicProjects = projects.filter(
    (p) => p.visibility === "public" || p.visibility === "anonymous",
  );

  return (
    <>
      <PageHeader
        eyebrow="In Motion"
        title="Projects"
        description="A live view of what the empire is building, scaling, and compounding — without exposing sensitive work."
      />
      <Section>
        <ProjectFilters projects={publicProjects} />
      </Section>
      <CTASection
        title="Have a project for the empire?"
        description="Bring a build, a partnership, or a company you want scaled."
        primary={{ label: "Build with us", href: "/join" }}
      />
    </>
  );
}
