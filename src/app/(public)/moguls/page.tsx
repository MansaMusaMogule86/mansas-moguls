import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { CTASection } from "@/components/shared/CTASection";
import { MogulNavigationSystem } from "@/components/moguls/navigation/MogulNavigationSystem";

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
      <MogulNavigationSystem />
      <CTASection />
    </>
  );
}
