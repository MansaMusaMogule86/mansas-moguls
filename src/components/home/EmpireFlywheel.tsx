import { ChevronRight } from "lucide-react";
import { flywheel } from "@/lib/brand";

/**
 * The empire flywheel: Build → Acquire → Automate → Scale → Compound.
 */
export function EmpireFlywheel() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="glass-panel overflow-hidden rounded-3xl border border-white/10 px-6 py-10 shadow-[0_24px_80px_rgba(0,0,0,0.18)] sm:px-10">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            The Empire Flywheel
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
            One compounding engine
          </h2>
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {flywheel.map((stage, i) => (
            <div key={stage} className="flex items-center gap-3 sm:gap-4">
              <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-foreground shadow-[0_10px_24px_rgba(0,0,0,0.12)] sm:text-base">
                <span className="mr-2 font-heading text-gold">{i + 1}</span>
                {stage}
              </span>
              {i < flywheel.length - 1 && (
                <ChevronRight className="size-4 text-muted-foreground/70" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
