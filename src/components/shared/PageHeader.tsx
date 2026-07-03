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

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 sm:pt-36 lg:px-8">
        <div className="max-w-3xl">
          {eyebrow && (
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold/40" />
              <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.24em] text-gold/80">
                {eyebrow}
              </p>
            </div>
          )}
          <h1 className="mt-6 text-balance text-5xl font-heading font-bold leading-[1.05] sm:text-6xl lg:text-7xl drop-shadow-md">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-balance text-xl text-muted-foreground/90 font-sans leading-relaxed">
              {description}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
