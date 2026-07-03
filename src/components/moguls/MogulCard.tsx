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
      className="group hud-panel relative flex min-h-[230px] flex-col rounded-3xl p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1"
    >
      <div
        className={cn(
          "grid size-12 place-items-center rounded-xl border transition-colors shadow-[0_10px_24px_rgba(0,0,0,0.14)]",
          isGold
            ? "border-gold/25 bg-gold/5 text-gold group-hover:bg-gold/10"
            : "border-royal/30 bg-royal/5 text-royal-bright group-hover:bg-royal/10",
        )}
      >
        {Icon && <Icon className="size-5" strokeWidth={1.5} />}
      </div>

      <h3 className="mt-6 text-xl sm:text-2xl font-heading tracking-tight drop-shadow-sm">{mogul.name}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground/80 font-sans">
        {mogul.shortDescription}
      </p>

      <div className="mt-6 flex items-center justify-between pt-5 relative">
        <div className="absolute top-0 left-0 w-8 h-px bg-gold/30" />
        <span className="text-[10px] font-mono font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {mogul.category}
        </span>
        <ArrowUpRight className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
      </div>
    </Link>
  );
}
