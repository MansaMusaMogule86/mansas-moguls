import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { Section } from "@/components/shared/Section";
import { CTASection } from "@/components/shared/CTASection";
import { ContentCard } from "@/components/content/ContentCard";
import { mediaPosts } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "Media",
  description:
    "Articles, films, podcasts, and announcements from the Mansas Moguls empire.",
};

export default function MediaPage() {
  const [featured, ...rest] = mediaPosts;

  return (
    <>
      <PageHeader
        eyebrow="Newsroom"
        title="Media"
        description="Articles, films, podcasts, and announcements from across the empire."
      />

      {featured && (
        <Section className="pb-6">
          <article className="glass-panel gold-glow overflow-hidden rounded-3xl p-8 sm:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
              Featured — {featured.category}
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold sm:text-4xl">
              {featured.title}
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              {featured.excerpt}
            </p>
          </article>
        </Section>
      )}

      <Section className="pt-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <ContentCard key={post.id} post={post} />
          ))}
        </div>
      </Section>

      <CTASection
        title="Follow the empire"
        description="New films, articles, and announcements as the empire compounds."
        primary={{ label: "Join The Empire", href: "/join" }}
      />
    </>
  );
}
