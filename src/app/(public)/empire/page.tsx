import type { Metadata } from "next";
import { Section } from "@/components/shared/Section";
import { PageHeader } from "@/components/shared/PageHeader";
import { CTASection } from "@/components/shared/CTASection";
import { EmpireFlywheel } from "@/components/home/EmpireFlywheel";
import { StatCard } from "@/components/shared/StatCard";
import { empireMetrics } from "@/lib/brand";

export const metadata: Metadata = {
  title: "The Empire",
  description:
    "The vision, philosophy, and compounding model behind Mansas Moguls.",
};

const pillars = [
  {
    title: "Why the empire exists",
    body: "Most holding companies, agencies, and AI startups look disconnected and unclear. Mansas Moguls is one powerful home for an entire empire — divisions, ventures, portfolio, and intelligence under a single vision.",
  },
  {
    title: "Operating philosophy",
    body: "We build, acquire, automate, scale, and compound. Every division runs on AI as an operating layer, and every win compounds into the next through shared systems, capital, and knowledge.",
  },
  {
    title: "Berkshire-style compounding",
    body: "Inspired by a Berkshire Hathaway model, the Capital Mogul acquires and holds cash-flowing businesses, then compounds ownership across the portfolio over the long term.",
  },
  {
    title: "The AI operating layer",
    body: "Autonomous agents run research, operations, growth, and production across the empire — compressing cost and multiplying output in every venture.",
  },
];

export default function EmpirePage() {
  return (
    <>
      <PageHeader
        eyebrow="The Vision"
        title={
          <>
            An empire that <span className="text-gradient-gold">compounds</span>
          </>
        }
        description="Mansas Moguls builds, acquires, automates, and scales intelligent businesses — and compounds them into a single AI-powered holding empire."
      />

      <Section className="py-10">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {empireMetrics.map((m) => (
            <StatCard key={m.label} value={m.value} label={m.label} />
          ))}
        </div>
      </Section>

      <EmpireFlywheel />

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          {pillars.map((p) => (
            <div key={p.title} className="glass-panel rounded-2xl p-8">
              <h2 className="text-xl font-semibold">{p.title}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
