import { activity } from "@/lib/data/dashboard";

/**
 * Recent activity timeline for the command center.
 */
export function ActivityFeed() {
  return (
    <ul className="relative flex flex-col gap-0">
      {/* Vertical connector line */}
      <span className="absolute left-[5px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-gold/30 via-white/10 to-transparent" />

      {activity.map((item, i) => (
        <li key={item.id} className="relative flex gap-4 pb-5 last:pb-0">
          {/* Dot */}
          <span className="relative z-10 mt-1 flex size-3 shrink-0 items-center justify-center">
            <span className="size-2 rounded-full bg-gold/70 shadow-[0_0_0_3px_rgba(212,175,55,0.12)]" />
          </span>

          <div className="min-w-0 flex-1">
            <p className="text-sm leading-snug text-foreground/90">
              <span className="font-medium text-foreground">{item.actor}</span>{" "}
              {item.action}{" "}
              <span className="text-muted-foreground">{item.target}</span>
            </p>
            <p className="mt-1 text-[11px] font-mono uppercase tracking-[0.14em] text-muted-foreground/60">
              {item.time}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
