import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
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
    <div className="glass-panel flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
      <div className="flex items-center justify-between gap-4">
        <div
          className={cn(
            "grid size-11 place-items-center rounded-xl border",
            isGold
              ? "border-gold/25 bg-gold/10 text-gold"
              : "border-royal/30 bg-royal/10 text-royal-bright",
          )}
        >
          <Building2 className="size-5" strokeWidth={1.75} />
        </div>
        <Badge variant="outline" className="border-white/15 bg-white/5 text-muted-foreground">
          {ownershipTypeLabel[company.ownershipType]}
        </Badge>
      </div>

      <h3 className="mt-5 text-lg font-semibold">{company.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {company.publicDescription}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/5 pt-4">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Industry
          </div>
          <div className="mt-1 text-sm text-foreground">{company.industry}</div>
        </div>
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Location
          </div>
          <div className="mt-1 text-sm text-foreground">{company.location}</div>
        </div>
        {valuation && (
          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Valuation
            </div>
            <div className="mt-1 text-sm font-medium text-gold">{valuation}</div>
          </div>
        )}
        {revenue && (
          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Revenue
            </div>
            <div className="mt-1 text-sm font-medium text-foreground">{revenue}</div>
          </div>
        )}
      </div>
    </div>
  );
}
