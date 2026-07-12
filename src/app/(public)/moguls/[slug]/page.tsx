import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SEO from "@/components/shared/SEO";
import { generateBreadcrumbs } from "@/lib/seo-schema";
import { MogulExperience, type NavMogul } from "@/components/moguls/MogulExperience";
import { moguls, getMogulBySlug } from "@/lib/data/moguls";
import { mogulExtras, getMogulExtras } from "@/lib/data/mogul-extras";
import { getProjectsForMogul } from "@/lib/data/projects";

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

/** Fallback accent for the (unexpected) case a mogul has no extras defined. */
const FALLBACK_ACCENT = "#d6aa38";

export default async function MogulDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mogul = getMogulBySlug(slug);
  if (!mogul) notFound();

  const extras = getMogulExtras(slug);
  if (!extras) notFound();

  const projects = getProjectsForMogul(mogul.id).filter(
    (p) => p.visibility === "public" || p.visibility === "anonymous",
  );

  const allMoguls: NavMogul[] = moguls.map((m) => ({
    slug: m.slug,
    name: m.name,
    icon: m.icon,
    accent: mogulExtras[m.slug]?.accent ?? FALLBACK_ACCENT,
    order: m.orderIndex,
  }));

  const mogulSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `https://mansasmoguls.com/moguls/${mogul.slug}#mogul`,
    name: mogul.name,
    description: mogul.shortDescription,
    parentOrganization: { "@id": "https://mansasmoguls.com/#organization" },
    founder: { "@id": "https://mansasmoguls.com/#el-mehdi" },
    url: `https://mansasmoguls.com/moguls/${mogul.slug}`,
  };

  return (
    <>
      <SEO
        title={mogul.name}
        description={mogul.shortDescription}
        path={`/moguls/${mogul.slug}`}
        jsonLd={[mogulSchema, generateBreadcrumbs(`/moguls/${mogul.slug}`)]}
      />
      <MogulExperience
        mogul={mogul}
        extras={extras}
        projects={projects}
        allMoguls={allMoguls}
      />
    </>
  );
}
