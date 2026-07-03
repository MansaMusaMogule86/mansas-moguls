import type { Metadata } from "next";
import { Mail, MapPin, Building2 } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Section } from "@/components/shared/Section";
import { InquiryForm } from "@/components/forms/InquiryForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to the Mansas Moguls empire.",
};

const details = [
  { icon: Mail, label: "Email", value: "empire@mansasmoguls.com" },
  { icon: MapPin, label: "Base", value: "Dubai, United Arab Emirates" },
  { icon: Building2, label: "Entity", value: "Mansas Moguls Holding" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Talk to the empire"
        description="Partnerships, investments, press, or building with us — reach the right division."
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            {details.map((d) => (
              <div
                key={d.label}
                className="glass-panel flex items-center gap-4 rounded-2xl p-5"
              >
                <div className="grid size-11 place-items-center rounded-xl border border-gold/25 bg-gold/10 text-gold">
                  <d.icon className="size-5" strokeWidth={1.75} />
                </div>
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    {d.label}
                  </div>
                  <div className="mt-0.5 text-sm text-foreground">{d.value}</div>
                </div>
              </div>
            ))}
          </div>
          <InquiryForm submitLabel="Send message" intent="message" />
        </div>
      </Section>
    </>
  );
}
