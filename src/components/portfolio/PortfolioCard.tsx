import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ownershipTypeLabel } from "@/lib/labels";
import type { PortfolioCompany } from "@/lib/types";

function formatMoney(value?: number): string | null {
  if (!value) return null;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${Math.round(value / 1_000)}K`;
  return `$${value}`;
}

export function PortfolioCard({ company }: { company: PortfolioCompany }) {
  const isGold = company.accentColor === "gold";
  const valuation = formatMoney(company.valuationEstimate);
  const revenue = formatMoney(company.revenueEstimate);

  return (
    <div className="hud-panel flex flex-col rounded-3xl p-6 sm:p-7 transition-all duration-500 hover:-translate-y-1">
      <div className="flex items-center justify-between gap-4">
        <div
          className={cn(
            "grid size-12 place-items-center rounded-xl border",
            isGold
              ? "border-gold/25 bg-gold/5 text-gold"
              : "border-royal/30 bg-royal/5 text-royal-bright",
          )}
        >
          <Building2 className="size-5" strokeWidth={1.5} />
        </div>
        <div className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest text-muted-foreground border border-white/5 bg-white/[0.02] px-2.5 py-1 rounded-sm">
          {ownershipTypeLabel[company.ownershipType]}
        </div>
      </div>

      <h3 className="mt-6 text-xl sm:text-2xl font-heading drop-shadow-sm">{company.name}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground/80 font-sans">
        {company.publicDescription}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-y-4 gap-x-3 pt-5 relative">
        <div className="absolute top-0 left-0 w-8 h-px bg-gold/20" />
        
        <div>
          <div className="text-[9px] font-medium uppercase tracking-[0.2em] font-mono text-muted-foreground opacity-70">
            Industry
          </div>
          <div className="mt-1 text-[13px] font-mono text-foreground/90">{company.industry}</div>
        </div>
        <div>
          <div className="text-[9px] font-medium uppercase tracking-[0.2em] font-mono text-muted-foreground opacity-70">
            Location
          </div>
          <div className="mt-1 text-[13px] font-mono text-foreground/90">{company.location}</div>
        </div>
        {valuation && (
          <div>
            <div className="text-[9px] font-medium uppercase tracking-[0.2em] font-mono text-muted-foreground opacity-70">
              Valuation
            </div>
            <div className="mt-1 text-[13px] tracking-wide font-mono font-medium text-gold">{valuation}</div>
          </div>
        )}
        {revenue && (
          <div>
            <div className="text-[9px] font-medium uppercase tracking-[0.2em] font-mono text-muted-foreground opacity-70">
              Revenue
            </div>
            <div className="mt-1 text-[13px] tracking-wide font-mono font-medium text-foreground/90">{revenue}</div>
          </div>
        )}
      </div>
    </div>
  );
}
