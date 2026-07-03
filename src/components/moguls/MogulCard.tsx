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
      className="group glass-panel relative flex min-h-[230px] flex-col rounded-3xl border border-white/10 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
    >
      <div
        className={cn(
          "grid size-11 place-items-center rounded-xl border transition-colors shadow-[0_10px_24px_rgba(0,0,0,0.14)]",
          isGold
            ? "border-gold/25 bg-gold/10 text-gold group-hover:border-gold/50"
            : "border-royal/30 bg-royal/10 text-royal-bright group-hover:border-royal/60",
        )}
      >
        {Icon && <Icon className="size-5" strokeWidth={1.75} />}
      </div>

      <h3 className="mt-5 text-lg font-semibold tracking-[-0.02em]">{mogul.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {mogul.shortDescription}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
        <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          {mogul.category}
        </span>
        <ArrowUpRight className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
      </div>
    </Link>
  );
}
