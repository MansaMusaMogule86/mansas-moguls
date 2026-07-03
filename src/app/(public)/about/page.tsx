import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { Section } from "@/components/shared/Section";
import { CTASection } from "@/components/shared/CTASection";

export const metadata: Metadata = {
  title: "About",
  description: "The story, philosophy, and leadership behind Mansas Moguls.",
};

const values = [
  { title: "Compounding", body: "Every venture, lesson, and dollar compounds into the next." },
  { title: "Autonomy", body: "AI agents do the work so the empire scales without limits." },
  { title: "Ownership", body: "We build and own — not just advise." },
  { title: "Discretion", body: "Sensitive work stays private, stealth, and protected." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Story"
        title="Not an agency. An empire."
        description="Mansas Moguls is an AI-powered holding empire that creates, operates, automates, invests in, and scales businesses."
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              Mansas Moguls is built on a simple belief: the next great holding
              companies will be AI-native. Instead of one business, we operate an
              empire of divisions — Moguls — that each build and compound a part
              of the whole.
            </p>
            <p>
              We build ventures from zero, acquire cash-flowing companies,
              automate operations with agents, and scale distribution through
              shared growth systems. Capital and knowledge compound across every
              division.
            </p>
            <p>
              The result is a command center for an entire empire: transparent
              where it should be, discreet where it must be, and always
              compounding.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {values.map((v) => (
              <div key={v.title} className="glass-panel rounded-2xl p-6">
                <h3 className="font-heading text-lg font-semibold text-gold">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <CTASection />
    </>
  );
}
