import SEO from "@/components/shared/SEO";
import { globalGraph, generateBreadcrumbs } from "@/lib/seo-schema";
import { EmpireHero } from "@/components/empire/hero/EmpireHero";
import { EmpireHeroTransition } from "@/components/empire/hero/EmpireHeroTransition";
import { EmpireFlywheel } from "@/components/home/EmpireFlywheel";
import { ControlChamberHUD } from "@/components/empire/ControlChamberHUD";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { EmpireContact } from "@/components/home/EmpireContact";

export default function HomePage() {
  return (
    <>
      <SEO
        title="Mansas Moguls | Founder-First AI Strategy & Automation Studio"
        description="Build, acquire, automate, and scale AI-driven businesses. 24 portfolio companies. $1.2B+ valuation. Dubai-based, globally operating."
        path="/"
        jsonLd={[globalGraph(), generateBreadcrumbs("/")]}
      />

      <EmpireHero />
      <EmpireHeroTransition />
      <EmpireFlywheel />
      
      <section id="divisions" className="relative z-10 scroll-mt-24 py-16 md:py-24">
        <div className="container px-4 text-center pb-12">
          <h2 className="text-sm font-semibold tracking-[0.2em] text-gold uppercase mb-4">The Divisions</h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading text-foreground mb-6">Empire Control Chamber</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">Permanent strategic divisions that build, operate, and compound the empire.</p>
        </div>
        <div className="relative w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
          <ControlChamberHUD />
        </div>
      </section>
      
      <FeaturedProjects />
      <EmpireContact />
    </>
  );
}
