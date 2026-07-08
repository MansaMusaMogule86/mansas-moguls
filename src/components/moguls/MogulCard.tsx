import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { mogulIcons } from "@/lib/data/moguls";
import type { Mogul } from "@/lib/types";

export function MogulCard({ mogul }: { mogul: Mogul }) {
  const Icon = mogulIcons[mogul.icon];
  const isGold = mogul.accentColor === "gold";

  return (
    <Link
      href={`/moguls/${mogul.slug}`}
      className={cn(
        "group hud-panel relative flex h-full min-h-[230px] flex-col overflow-hidden rounded-3xl p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1",
        isGold
          ? "hover:border-gold/30 hover:shadow-[0_16px_48px_rgba(212,175,55,0.08)]"
          : "hover:border-royal/30 hover:shadow-[0_16px_48px_rgba(43,84,240,0.08)]",
      )}
    >
      {/* Top accent line */}
      <span
        className={cn(
          "absolute inset-x-0 top-0 h-px transition-opacity duration-500",
          isGold
            ? "bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 group-hover:opacity-100"
            : "bg-gradient-to-r from-transparent via-royal/60 to-transparent opacity-0 group-hover:opacity-100",
        )}
      />

      <div
        className={cn(
          "grid size-11 place-items-center rounded-xl border transition-all duration-300",
          isGold
            ? "border-gold/25 bg-gold/5 text-gold group-hover:bg-gold/15 group-hover:border-gold/40 group-hover:shadow-[0_0_16px_rgba(212,175,55,0.15)]"
            : "border-royal/30 bg-royal/5 text-royal-bright group-hover:bg-royal/15 group-hover:border-royal/50 group-hover:shadow-[0_0_16px_rgba(43,84,240,0.15)]",
        )}
      >
        {Icon && <Icon className="size-5" strokeWidth={1.5} />}
      </div>

      <h3 className="mt-5 text-xl font-heading tracking-tight sm:text-2xl">{mogul.name}</h3>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground/80 font-sans">
        {mogul.shortDescription}
      </p>

      <div className="mt-6 flex items-center justify-between pt-4 relative">
        <div className={cn("absolute top-0 left-0 w-10 h-px", isGold ? "bg-gold/25" : "bg-royal/25")} />
        <div className="flex items-center gap-2">
          <span className={cn("size-1.5 rounded-full", isGold ? "bg-gold/50" : "bg-royal/60")} />
          <span className="text-[10px] font-mono font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {mogul.category}
          </span>
        </div>
        <ArrowUpRight className={cn(
          "size-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
          isGold ? "text-muted-foreground group-hover:text-gold" : "text-muted-foreground group-hover:text-royal-bright"
        )} />
      </div>
    </Link>
  );
}
