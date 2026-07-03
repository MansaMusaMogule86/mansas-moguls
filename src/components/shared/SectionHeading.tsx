import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Reusable section heading: gold eyebrow, title, optional description and link.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  link,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  link?: { label: string; href: string };
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end",
        className,
      )}
    >
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{title}</h2>
        {description && (
          <p className="mt-3 max-w-xl text-muted-foreground">{description}</p>
        )}
      </div>
      {link && (
        <Link
          href={link.href}
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gold/15 bg-gold/5 px-3 py-1.5 text-sm font-medium text-gold transition-colors hover:border-gold/30 hover:text-gold-bright"
        >
          {link.label}
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      )}
    </div>
  );
}
