import { activity } from "@/lib/data/dashboard";

/**
 * Recent activity timeline for the command center.
 */
export function ActivityFeed() {
  return (
    <ul className="space-y-3">
      {activity.map((item) => (
        <li key={item.id} className="flex gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-3 py-3">
          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold shadow-[0_0_0_4px_rgba(255,196,61,0.08)]" />
          <div className="min-w-0 text-sm">
            <p className="text-pretty text-foreground/90">
              <span className="font-medium text-foreground">{item.actor}</span>{" "}
              {item.action}{" "}
              <span className="text-muted-foreground">{item.target}</span>
            </p>
            <p className="mt-0.5 text-xs uppercase tracking-[0.14em] text-muted-foreground">{item.time}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
