import { revenuePipeline } from "@/lib/data/dashboard";

function formatMoney(value: number): string {
  return `$${(value / 1_000_000).toFixed(1)}M`;
}

/**
 * Horizontal revenue pipeline bars by stage.
 */
export function RevenuePipeline() {
  const max = Math.max(...revenuePipeline.map((s) => s.value));

  return (
    <div className="flex flex-col gap-5">
      {revenuePipeline.map((stage, i) => (
        <div key={stage.stage}>
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-muted-foreground/50">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-sm font-medium text-foreground">{stage.stage}</span>
            </div>
            <div className="text-right text-xs text-muted-foreground font-mono">
              <span className="text-foreground font-semibold">{formatMoney(stage.value)}</span>
              <span className="ml-2 opacity-50">· {stage.deals} deals</span>
            </div>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-bright"
              style={{ width: `${(stage.value / max) * 100}%` }}
            />
          </div>
          {i < revenuePipeline.length - 1 && (
            <div className="mt-5 h-px bg-white/5" />
          )}
        </div>
      ))}
    </div>
  );
}
