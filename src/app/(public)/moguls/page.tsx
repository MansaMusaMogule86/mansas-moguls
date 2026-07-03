import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { Section } from "@/components/shared/Section";
import { CTASection } from "@/components/shared/CTASection";
import { MogulCard } from "@/components/moguls/MogulCard";
import { moguls } from "@/lib/data/moguls";

export const metadata: Metadata = {
  title: "Moguls",
  description:
    "The eight permanent strategic divisions of the Mansas Moguls empire.",
};

export default function MogulsPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Divisions"
        title="Eight Moguls, one empire"
        description="Each Mogul is a permanent strategic division that builds, operates, and compounds a part of the empire."
      />
      <Section>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {moguls.map((mogul) => (
            <MogulCard key={mogul.id} mogul={mogul} />
          ))}
        </div>
      </Section>
      <CTASection />
    </>
  );
}
