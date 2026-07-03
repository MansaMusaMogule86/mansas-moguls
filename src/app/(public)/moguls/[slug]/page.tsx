import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CTASection } from "@/components/shared/CTASection";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { moguls, getMogulBySlug, mogulIcons } from "@/lib/data/moguls";
import { getProjectsForMogul } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return moguls.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const mogul = getMogulBySlug(slug);
  if (!mogul) return { title: "Mogul not found" };
  return { title: mogul.name, description: mogul.shortDescription };
}

export default async function MogulDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mogul = getMogulBySlug(slug);
  if (!mogul) notFound();

  const Icon = mogulIcons[mogul.icon];
  const isGold = mogul.accentColor === "gold";
  const projects = getProjectsForMogul(mogul.id).filter(
    (p) => p.visibility === "public" || p.visibility === "anonymous",
  );

  return (
    <>
      <PageHeader
        eyebrow={mogul.category}
        title={mogul.name}
        description={mogul.fullDescription}
      >
        <Link
          href="/moguls"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          All Moguls
        </Link>
      </PageHeader>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="glass-panel flex flex-col rounded-2xl p-8">
            <div
              className={cn(
                "grid size-14 place-items-center rounded-2xl border",
                isGold
                  ? "border-gold/25 bg-gold/10 text-gold"
                  : "border-royal/30 bg-royal/10 text-royal-bright",
              )}
            >
              {Icon && <Icon className="size-6" strokeWidth={1.75} />}
            </div>
            <h2 className="mt-6 text-2xl font-semibold">Capabilities</h2>
            <ul className="mt-5 space-y-3">
              {mogul.capabilities.map((cap) => (
                <li key={cap} className="flex items-start gap-3 text-sm">
                  <Check
                    className={cn(
                      "mt-0.5 size-4 shrink-0",
                      isGold ? "text-gold" : "text-royal-bright",
                    )}
                  />
                  <span className="text-muted-foreground">{cap}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionHeading
              eyebrow="In this division"
              title="Active projects"
            />
            {projects.length > 0 ? (
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <p className="mt-8 text-muted-foreground">
                Projects in this division are currently private or in stealth.
              </p>
            )}
          </div>
        </div>
      </Section>

      <CTASection
        title={`Partner with the ${mogul.name}`}
        description="Bring a project, a company, or capital to this division of the empire."
      />
    </>
  );
}
