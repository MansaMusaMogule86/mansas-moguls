import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { featuredProjects } from "@/lib/data/projects";

/**
 * Featured projects — the empire in motion, without exposing sensitive work.
 */
export function FeaturedProjects() {
  return (
    <Section>
      <SectionHeading
        eyebrow="In Motion"
        title="Featured Projects"
        link={{ label: "View all projects", href: "/projects" }}
      />
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}
