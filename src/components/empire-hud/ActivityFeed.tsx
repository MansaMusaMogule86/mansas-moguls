"use client";

import { AnimatePresence } from "framer-motion";
import { FeedItem, FeedEventData } from "./FeedItem";
import { cn } from "@/lib/utils";

interface ActivityFeedProps {
  events: FeedEventData[];
  onItemClick?: (event: FeedEventData) => void;
  className?: string;
}

export function ActivityFeed({ events, onItemClick, className }: ActivityFeedProps) {
  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <ul className="space-y-1.5 overflow-y-auto max-h-[220px] no-scrollbar pr-0.5">
        <AnimatePresence initial={false}>
          {events.map((e) => (
            <FeedItem
              key={e.id}
              event={e}
              onClick={onItemClick ? () => onItemClick(e) : undefined}
            />
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
