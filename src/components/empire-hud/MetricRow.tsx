"use client";

import { cn } from "@/lib/utils";

interface MetricRowProps {
  label: string;
  value: string | number;
  onClick?: () => void;
  className?: string;
}

export function MetricRow({ label, value, onClick, className }: MetricRowProps) {
  const isClickable = !!onClick;
  
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center justify-between text-[10px] font-mono py-1.5 px-2 rounded-sm border border-transparent transition-all select-none",
        isClickable && "cursor-pointer hover:bg-gold/5 hover:border-gold/25 hover:shadow-[0_0_10px_rgba(214,170,56,0.15)]",
        className
      )}
    >
      <span className="text-white/40 uppercase tracking-widest text-[8.5px] truncate max-w-[50%] shrink-0">
        {label}
      </span>
      
      {/* Dashed line to fill space between label and value */}
      <div className="flex-1 mx-3 border-b border-dashed border-white/10 h-2 min-w-[15px]" />
      
      <span className={cn(
        "text-white font-bold tracking-wider font-mono shrink-0 transition-colors",
        isClickable && "group-hover:text-gold text-gold-bright"
      )}>
        {value}
      </span>
    </div>
  );
}
