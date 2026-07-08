import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Empire metric tile for the command center.
 */
export function MetricCard({
  label,
  value,
  delta,
  trend = "flat",
}: {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
}) {
  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  return (
    <div className="glass-panel relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.015] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.18)] transition-all hover:-translate-y-0.5 hover:border-white/15">
      {/* Top accent line */}
      <span
        className={cn(
          "absolute inset-x-0 top-0 h-px",
          trend === "up" && "bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent",
          trend === "down" && "bg-gradient-to-r from-transparent via-destructive/40 to-transparent",
          trend === "flat" && "bg-gradient-to-r from-transparent via-gold/30 to-transparent",
        )}
      />
      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-3 font-heading text-[2.1rem] font-semibold tracking-[-0.04em] text-foreground sm:text-[2.35rem]">
        {value}
      </div>
      {delta && (
        <div
          className={cn(
            "mt-2 inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm",
            trend === "up" && "border-emerald-400/15 bg-emerald-400/5 text-emerald-400",
            trend === "down" && "border-destructive/15 bg-destructive/5 text-destructive",
            trend === "flat" && "border-white/10 text-muted-foreground",
          )}
        >
          <TrendIcon className="size-3.5" />
          {delta}
        </div>
      )}
    </div>
  );
}
