import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Badge } from "@/components/ui/badge";
import { messages } from "@/lib/data/dashboard";

export const metadata: Metadata = {
  title: "Messages",
  robots: { index: false, follow: false },
};

export default function MessagesPage() {
  const unread = messages.filter((m) => m.unread).length;

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Messages"
        description="Communication with partners, clients, and the empire team."
        action={
          unread > 0 ? (
            <Badge className="bg-gold text-primary-foreground">{unread} unread</Badge>
          ) : undefined
        }
      />

      <div className="glass-panel divide-y divide-white/5 overflow-hidden rounded-2xl">
        {messages.map((message) => (
          <button
            key={message.id}
            type="button"
            className="flex w-full items-start gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.02]"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-royal to-royal-bright text-sm font-bold text-white">
              {message.from.charAt(0)}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{message.from}</span>
                <Badge variant="outline" className="border-white/15 bg-white/5 text-[10px] text-muted-foreground">
                  {message.role}
                </Badge>
                {message.unread && <span className="size-1.5 rounded-full bg-gold" />}
              </div>
              <p
                className={cn(
                  "mt-1 truncate text-sm",
                  message.unread ? "text-foreground/90" : "text-muted-foreground",
                )}
              >
                {message.preview}
              </p>
            </div>
            <span className="shrink-0 text-xs text-muted-foreground">{message.time}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
