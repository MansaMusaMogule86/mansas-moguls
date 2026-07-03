import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Titled glass panel used to frame dashboard widgets.
 */
export function Panel({
  title,
  link,
  children,
  className,
}: {
  title: string;
  link?: { label: string; href: string };
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("glass-panel rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.035] to-white/[0.015] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.16)] sm:p-6", className)}>
      <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/90">{title}</h2>
        {link && (
          <Link
            href={link.href}
            className="group inline-flex items-center gap-1 rounded-full border border-gold/15 bg-gold/5 px-3 py-1.5 text-[11px] font-medium text-gold transition-colors hover:border-gold/30 hover:text-gold-bright"
          >
            {link.label}
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        )}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}
