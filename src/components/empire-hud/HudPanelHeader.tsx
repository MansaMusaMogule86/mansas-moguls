"use client";

import { StatusPulse } from "./StatusPulse";
import { cn } from "@/lib/utils";

interface HudPanelHeaderProps {
  title: string;
  divisionNumber?: string;
  status?: string;
  color?: "green" | "gold" | "purple" | "blue" | "pink" | "orange";
  className?: string;
}

export function HudPanelHeader({
  title,
  divisionNumber,
  status,
  color = "green",
  className,
}: HudPanelHeaderProps) {
  return (
    <div className={cn("flex flex-col w-full mb-4 select-none", className)}>
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          {divisionNumber && (
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="text-[9px] font-mono text-white/30 tracking-[0.2em] font-medium">{divisionNumber}</span>
              <div className="h-[1px] w-4 bg-white/10" />
              <span className="text-[7.5px] font-mono text-white/30 tracking-[0.2em] uppercase font-bold">Division</span>
            </div>
          )}
          <h2 className="text-sm font-heading font-extrabold tracking-[0.25em] text-white uppercase drop-shadow-sm">
            {title}
          </h2>
        </div>

        {status && (
          <div className="border border-white/5 bg-black/60 px-2 py-0.5 rounded backdrop-blur-md">
            <StatusPulse status={status} color={color} />
          </div>
        )}
      </div>
      
      {/* Sleek divider line */}
      <div className="relative w-full h-[3px] mt-2.5 overflow-hidden flex flex-col gap-[1px]">
        <div className="w-full h-[1px] bg-gradient-to-r from-white/15 via-white/5 to-transparent" />
        <div className="w-1/3 h-[1px] bg-gradient-to-r from-gold/30 via-gold/10 to-transparent" />
      </div>
    </div>
  );
}
