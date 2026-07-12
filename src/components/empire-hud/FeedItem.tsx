"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

export interface FeedEventData {
  id: string;
  label: string;
  icon: string;
  bornAt: number;
  priority: "normal" | "elevated" | "critical";
  formattedAge?: string;
}

interface FeedItemProps {
  event: FeedEventData;
  onClick?: () => void;
  className?: string;
}

export function FeedItem({ event, onClick, className }: FeedItemProps) {
  // Dynamically resolve lucide icon name
  const IconComponent = (Icons as any)[event.icon] || Icons.Activity;
  
  const priorityColor = {
    normal: "bg-white/20",
    elevated: "bg-gold",
    critical: "bg-pink-500",
  }[event.priority];

  const isAntiGrav = event.label.toLowerCase().includes("anti-grav") || 
                     event.label.toLowerCase().includes("zero-g") ||
                     event.label.toLowerCase().includes("ecological") ||
                     event.label.toLowerCase().includes("inter-agent") ||
                     event.label.toLowerCase().includes("multi-force");

  return (
    <motion.li
      onClick={onClick}
      className={cn(
        "group/item relative flex items-center gap-3 py-2 px-3 border border-white/5 bg-[#05070B] hover:bg-gold/[0.03] hover:border-gold/25 rounded-[1px] cursor-pointer transition-all select-none overflow-hidden",
        className
      )}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {/* Subtle Mogul Profile Silhouette watermark */}
      {isAntiGrav && (
        <span className="absolute right-12 top-1/2 -translate-y-1/2 opacity-15 pointer-events-none group-hover/item:opacity-30 transition-opacity">
          <Icons.User2 className="size-4 text-gold-bright" />
        </span>
      )}

      {/* Dynamic Lucide Icon Wrapper */}
      <span className="grid size-6 shrink-0 place-items-center rounded-sm border border-gold/15 bg-gold/5 text-gold/75 group-hover/item:border-gold/30 group-hover/item:text-gold transition-colors z-10">
        <IconComponent className="size-3" />
      </span>

      {/* Description */}
      <span className="flex-1 truncate text-[10px] text-white/70 font-mono tracking-wide group-hover/item:text-white transition-colors z-10">
        {event.label}
      </span>

      {/* Priority bullet */}
      <span className={cn("size-1.5 shrink-0 rounded-full z-10", priorityColor)} title={`Priority: ${event.priority}`} />

      {/* Time label */}
      <span className="shrink-0 font-mono text-[8.5px] tabular-nums text-white/30 z-10">
        {event.formattedAge || "now"}
      </span>
    </motion.li>
  );
}
