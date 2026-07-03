"use client";

import { useState } from "react";
import { Menu, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/layout/Logo";
import { DashboardNavLinks } from "./DashboardSidebar";
import { notifications } from "@/lib/data/dashboard";

/**
 * Sticky top bar for the dashboard — mobile nav trigger, search, notifications,
 * and the founder avatar.
 */
export function DashboardTopbar() {
  const [open, setOpen] = useState(false);
  const unread = notifications.length;

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-empire-black/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 border-white/10 bg-empire-ink px-4 py-6">
              <SheetHeader className="p-0">
                <SheetTitle className="text-left">
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-1 flex-col">
                <DashboardNavLinks onNavigate={() => setOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>

          {/* Search */}
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.12)] sm:flex">
            <Search className="size-4 text-muted-foreground" />
            <input
              placeholder="Search the empire…"
              className="w-44 bg-transparent text-sm outline-none placeholder:text-muted-foreground lg:w-72"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Notifications"
          >
            <Bell className="size-5" />
            {unread > 0 && (
              <span className="absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-gold text-[10px] font-bold text-primary-foreground">
                {unread}
              </span>
            )}
          </Button>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1 pl-1 pr-3 shadow-[0_10px_24px_rgba(0,0,0,0.08)]">
            <span className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-gold to-gold-deep text-xs font-bold text-primary-foreground shadow-[0_10px_20px_rgba(255,196,61,0.18)]">
              F
            </span>
            <span className="hidden text-sm font-medium sm:inline">Founder</span>
          </div>
        </div>
      </div>
    </header>
  );
}
