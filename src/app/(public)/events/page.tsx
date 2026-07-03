import type { Metadata } from "next";
import { CalendarDays, MapPin } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Section } from "@/components/shared/Section";
import { CTASection } from "@/components/shared/CTASection";
import { Badge } from "@/components/ui/badge";
import { events } from "@/lib/data/site-data";

export const metadata: Metadata = {
  title: "Events",
  description: "Summits, webinars, and appearances from Mansas Moguls.",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function EventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gatherings"
        title="Events"
        description="Summits, webinars, and roundtables where the empire meets founders, operators, and investors."
      />
      <Section>
        <div className="space-y-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="glass-panel flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-white/15 bg-white/5 text-gold">
                    {event.format}
                  </Badge>
                </div>
                <h2 className="mt-3 text-lg font-semibold">{event.title}</h2>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="size-4" />
                    {formatDate(event.date)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-4" />
                    {event.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <CTASection
        title="Join the next gathering"
        description="Request an invitation to the empire's upcoming events."
        primary={{ label: "Request an invite", href: "/contact" }}
      />
    </>
  );
}
