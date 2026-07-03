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
    <div className="space-y-4">
      {revenuePipeline.map((stage) => (
        <div key={stage.stage} className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="font-medium text-foreground">{stage.stage}</span>
            <span className="text-right text-muted-foreground">
              {formatMoney(stage.value)}
              <span className="ml-2 text-xs uppercase tracking-[0.14em]">· {stage.deals} deals</span>
            </span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-bright"
              style={{ width: `${(stage.value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
