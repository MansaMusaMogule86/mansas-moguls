import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { Section } from "@/components/shared/Section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Mansas Moguls handles your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="How the empire collects, uses, and protects your information."
      />
      <Section>
        <div className="glass-panel prose-empire max-w-3xl space-y-6 rounded-2xl p-8 text-muted-foreground">
          <p>
            Mansas Moguls respects your privacy. This placeholder policy will be
            replaced with the full legal text before public launch.
          </p>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Information we collect</h2>
            <p className="mt-2">
              We collect only the information you provide through our forms —
              name, email, company, and message — to respond to your inquiry.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">How we use it</h2>
            <p className="mt-2">
              Your information is used solely to communicate with you about the
              empire. We never sell your data.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Contact</h2>
            <p className="mt-2">
              Questions about privacy? Reach us at empire@mansasmoguls.com.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
