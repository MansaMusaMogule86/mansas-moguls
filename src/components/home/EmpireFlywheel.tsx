import { ChevronRight } from "lucide-react";
import { flywheel } from "@/lib/brand";

/**
 * The empire flywheel: Build → Acquire → Automate → Scale → Compound.
 */
export function EmpireFlywheel() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 -mt-12">
      <div className="glass-panel overflow-hidden rounded-2xl border border-gold/10 px-6 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.5)] sm:px-10 bg-empire-ink/80 backdrop-blur-md">
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold font-mono">
            The Empire Flywheel
          </p>
          <h2 className="mt-3 text-2xl font-heading tracking-tight sm:text-3xl text-gradient-royal">
            Continuous Compounding Engine
          </h2>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:flex-nowrap md:overflow-x-auto pb-2">
          {flywheel.map((stage, i) => (
            <div key={stage} className="flex items-center gap-2 sm:gap-4 shrink-0">
              <span className="flex items-center rounded-full border border-gold/20 bg-empire-surface/60 px-5 py-2.5 text-[13px] uppercase tracking-wider font-mono text-foreground/90 shadow-[0_10px_24px_rgba(0,0,0,0.3)] transition-colors hover:border-gold/40 hover:text-white">
                <span className="mr-2 text-gold opacity-60">0{i + 1}</span>
                {stage}
              </span>
              {i < flywheel.length - 1 && (
                <ChevronRight className="size-4 text-gold/30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
