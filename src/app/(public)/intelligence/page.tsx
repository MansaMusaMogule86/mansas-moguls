import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { Section } from "@/components/shared/Section";
import { CTASection } from "@/components/shared/CTASection";
import { ContentCard } from "@/components/content/ContentCard";
import { intelligencePosts } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "Intelligence",
  description:
    "Market reports, AI insights, research, and executive briefings from the empire.",
};

export default function IntelligencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Signal"
        title="Intelligence"
        description="Market reports, AI insights, and executive briefings from the empire's research divisions."
      />
      <Section>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {intelligencePosts.map((post) => (
            <ContentCard key={post.id} post={post} />
          ))}
        </div>
      </Section>
      <CTASection
        title="Get the executive briefing"
        description="Join the empire's intelligence list for reports and market signal."
        primary={{ label: "Request access", href: "/contact" }}
        secondary={{ label: "Explore Moguls", href: "/moguls" }}
      />
    </>
  );
}
