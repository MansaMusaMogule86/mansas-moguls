import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Section } from "@/components/shared/Section";
import { CTASection } from "@/components/shared/CTASection";
import { Badge } from "@/components/ui/badge";
import { roles } from "@/lib/data/site-data";

export const metadata: Metadata = {
  title: "Careers",
  description: "Open roles and culture across the Mansas Moguls empire.",
};

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Join the team"
        title="Build the empire"
        description="Operators, engineers, and creatives who want to build and compound with AI at empire scale."
      />
      <Section>
        <div className="space-y-3">
          {roles.map((role) => (
            <Link
              key={role.id}
              href="/join"
              className="group glass-panel flex flex-col gap-4 rounded-2xl p-6 transition-all hover:-translate-y-0.5 hover:border-white/20 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold">{role.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {role.mogul} · {role.location}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="border-white/15 bg-white/5 text-gold">
                  {role.type}
                </Badge>
                <ArrowUpRight className="size-5 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
              </div>
            </Link>
          ))}
        </div>
      </Section>
      <CTASection
        title="Don't see your role?"
        description="The empire is always looking for exceptional operators. Introduce yourself."
        primary={{ label: "Apply for a career", href: "/join" }}
      />
    </>
  );
}
