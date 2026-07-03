import { cn } from "@/lib/utils";

/**
 * Inner-page hero header — grid backdrop, gold eyebrow, large title, lede.
 * Used at the top of every secondary public route.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden border-b border-white/5", className)}>
      <div className="empire-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[48rem] -translate-x-1/2 rounded-full bg-royal/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 sm:pt-24 lg:px-8">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-4 text-balance text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-balance text-lg text-muted-foreground">
              {description}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
