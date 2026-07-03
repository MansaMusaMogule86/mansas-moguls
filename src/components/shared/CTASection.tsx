import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "./Section";

/**
 * Reusable closing CTA band used across public pages.
 */
export function CTASection({
  title = "Build, invest, or partner with the empire",
  description = "Founders, operators, and investors join Mansas Moguls to build and compound intelligent businesses together.",
  primary = { label: "Join The Empire", href: "/join" },
  secondary = { label: "Talk to us", href: "/contact" },
}: {
  title?: React.ReactNode;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <Section>
      <div className="glass-panel gold-glow relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.035] to-white/[0.015] px-6 py-14 text-center shadow-[0_24px_90px_rgba(0,0,0,0.2)] sm:px-10 sm:py-20">
        <div className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-48 w-[40rem] rounded-full bg-gold/15 blur-[120px]" />
        <div className="relative mx-auto max-w-2xl">
          <p className="mx-auto inline-flex items-center rounded-full border border-gold/15 bg-gold/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
            Begin the next move
          </p>
          <h2 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-8 text-muted-foreground">{description}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="group w-full bg-gold text-primary-foreground shadow-[0_18px_40px_rgba(255,196,61,0.16)] hover:bg-gold-bright sm:w-auto"
            >
              <Link href={primary.href}>
                {primary.label}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-white/15 bg-white/5 hover:bg-white/10 sm:w-auto"
            >
              <Link href={secondary.href}>{secondary.label}</Link>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
