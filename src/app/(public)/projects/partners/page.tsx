import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { Section } from "@/components/shared/Section";
import { CTASection } from "@/components/shared/CTASection";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Partner Projects",
  description: "Approved partner ventures scaled with the empire's systems.",
};

export default function PartnerProjectsPage() {
  const list = projects.filter(
    (p) => p.type === "partner_project" && p.visibility === "public",
  );

  return (
    <>
      <PageHeader
        eyebrow="Partner Projects"
        title="Built with our partners"
        description="Approved partner ventures scaled with the empire's AI, growth, and capital systems."
      />
      <Section>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {list.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Section>
      <CTASection
        title="Become a partner"
        description="Scale your company with the empire's operating systems."
        primary={{ label: "Become a partner", href: "/join" }}
      />
    </>
  );
}
