import SEO from "@/components/shared/SEO";
import { globalGraph, generateBreadcrumbs } from "@/lib/seo-schema";
import { HeroEmpire } from "@/components/home/HeroEmpire";
import { EmpireFlywheel } from "@/components/home/EmpireFlywheel";
import { MogulsGrid } from "@/components/home/MogulsGrid";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { CTASection } from "@/components/shared/CTASection";

export default function HomePage() {
  return (
    <>
      <SEO
        title="Mansas Moguls | Founder-First AI Strategy & Automation Studio"
        description="Build, acquire, automate, and scale AI-driven businesses. 24 portfolio companies. $1.2B+ valuation. Dubai-based, globally operating."
        path="/"
        jsonLd={[globalGraph(), generateBreadcrumbs("/")]}
      />

      <HeroEmpire />
      <EmpireFlywheel />
      <MogulsGrid />
      <FeaturedProjects />
      <CTASection
        title={
          <>
            Build, invest, or partner with{" "}
            <span className="text-gradient-gold">the empire</span>
          </>
        }
      />
    </>
  );
}
