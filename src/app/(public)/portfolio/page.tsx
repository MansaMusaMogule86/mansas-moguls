import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { Section } from "@/components/shared/Section";
import { CTASection } from "@/components/shared/CTASection";
import { StatCard } from "@/components/shared/StatCard";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { portfolioCompanies } from "@/lib/data/portfolio";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Companies owned, invested in, acquired, and incubated by the empire.",
};

export default function PortfolioPage() {
  const stats = [
    { value: String(portfolioCompanies.length), label: "Companies" },
    { value: "$67M+", label: "Combined Valuation" },
    { value: "5", label: "Industries" },
    { value: "4", label: "Markets" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Ownership"
        title="The Portfolio"
        description="Companies the empire owns, invests in, acquires, and incubates — compounded over time."
      />
      <Section className="py-10">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </Section>
      <Section className="pt-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioCompanies.map((company) => (
            <PortfolioCard key={company.id} company={company} />
          ))}
        </div>
      </Section>
      <CTASection
        title="Submit a company"
        description="Building something the empire should own, acquire, or scale? Tell us about it."
        primary={{ label: "Submit a company", href: "/join" }}
      />
    </>
  );
}
