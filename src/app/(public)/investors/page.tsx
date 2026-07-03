import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { Section } from "@/components/shared/Section";
import { CTASection } from "@/components/shared/CTASection";
import { StatCard } from "@/components/shared/StatCard";

export const metadata: Metadata = {
  title: "Investors",
  description: "Investor relations and the Mansas Moguls compounding thesis.",
};

const thesis = [
  {
    title: "AI-native holding model",
    body: "Every operating company runs on agents, compressing cost and expanding margin across the portfolio.",
  },
  {
    title: "Acquire & compound",
    body: "The Capital Mogul acquires cash-flowing businesses and compounds ownership over the long term.",
  },
  {
    title: "Shared operating systems",
    body: "Growth, intelligence, and production systems lift every company the empire touches.",
  },
];

export default function InvestorsPage() {
  const stats = [
    { value: "$67M+", label: "Portfolio Valuation" },
    { value: "9", label: "Companies" },
    { value: "5", label: "Industries" },
    { value: "60+", label: "AI Agents" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Investor Relations"
        title="Compounding, by design"
        description="Mansas Moguls compounds capital through an AI-native holding model — building, acquiring, and scaling intelligent businesses."
      />
      <Section className="py-10">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </Section>
      <Section className="pt-6">
        <div className="grid gap-4 md:grid-cols-3">
          {thesis.map((t) => (
            <div key={t.title} className="glass-panel rounded-2xl p-8">
              <h2 className="text-lg font-semibold">{t.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {t.body}
              </p>
            </div>
          ))}
        </div>
      </Section>
      <CTASection
        title="Invest in the empire"
        description="For qualified investors exploring the Mansas Moguls thesis."
        primary={{ label: "Investor inquiry", href: "/contact" }}
        secondary={{ label: "View portfolio", href: "/portfolio" }}
      />
    </>
  );
}
