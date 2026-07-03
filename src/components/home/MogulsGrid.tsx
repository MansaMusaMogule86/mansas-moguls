import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MogulCard } from "@/components/moguls/MogulCard";
import { moguls } from "@/lib/data/moguls";

/**
 * Eight Moguls bento grid — the permanent divisions of the empire.
 */
export function MogulsGrid() {
  return (
    <Section>
      <SectionHeading
        eyebrow="The Divisions"
        title="Eight Moguls"
        description="Permanent strategic divisions that build, operate, and compound the empire."
        link={{ label: "View all Moguls", href: "/moguls" }}
      />
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {moguls.map((mogul) => (
          <MogulCard key={mogul.id} mogul={mogul} />
        ))}
      </div>
    </Section>
  );
}
