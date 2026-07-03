import { HeroEmpire } from "@/components/home/HeroEmpire";
import { EmpireFlywheel } from "@/components/home/EmpireFlywheel";
import { MogulsGrid } from "@/components/home/MogulsGrid";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { CTASection } from "@/components/shared/CTASection";

export default function HomePage() {
  return (
    <>
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
