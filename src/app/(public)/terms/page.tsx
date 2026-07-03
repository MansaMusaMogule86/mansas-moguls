import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { Section } from "@/components/shared/Section";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing use of the Mansas Moguls website.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        description="The terms that govern your use of the Mansas Moguls website."
      />
      <Section>
        <div className="glass-panel max-w-3xl space-y-6 rounded-2xl p-8 text-muted-foreground">
          <p>
            This placeholder agreement will be replaced with the full terms of
            service before public launch.
          </p>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Use of the site</h2>
            <p className="mt-2">
              The content on this site is provided for informational purposes.
              Project and portfolio figures are illustrative until confirmed.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Confidentiality</h2>
            <p className="mt-2">
              Private, stealth, and client projects are protected under the
              empire&apos;s visibility rules and applicable agreements.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Contact</h2>
            <p className="mt-2">
              Questions about these terms? Reach us at empire@mansasmoguls.com.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
