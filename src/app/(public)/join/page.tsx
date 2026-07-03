import type { Metadata } from "next";
import { Handshake, Building2, Briefcase, LineChart, Hammer } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Section } from "@/components/shared/Section";
import { InquiryForm } from "@/components/forms/InquiryForm";

export const metadata: Metadata = {
  title: "Join The Empire",
  description:
    "Partner, submit a company, apply, invest, or build with Mansas Moguls.",
};

const paths = [
  { icon: Handshake, title: "Become a partner", body: "Scale your company with the empire's systems." },
  { icon: Building2, title: "Submit a company", body: "For acquisition, investment, or incubation." },
  { icon: Briefcase, title: "Apply for a career", body: "Build inside a Mogul division." },
  { icon: LineChart, title: "Investor inquiry", body: "Explore the compounding thesis." },
  { icon: Hammer, title: "Build with us", body: "Bring a venture idea to the empire." },
];

export default function JoinPage() {
  return (
    <>
      <PageHeader
        eyebrow="Join The Empire"
        title="Build, invest, or partner"
        description="Founders, operators, investors, and talent join Mansas Moguls to build and compound intelligent businesses."
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {paths.map((p) => (
              <div key={p.title} className="glass-panel flex items-start gap-4 rounded-2xl p-5">
                <div className="grid size-11 shrink-0 place-items-center rounded-xl border border-royal/30 bg-royal/10 text-royal-bright">
                  <p.icon className="size-5" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
          <InquiryForm submitLabel="Apply to the empire" intent="application" />
        </div>
      </Section>
    </>
  );
}
