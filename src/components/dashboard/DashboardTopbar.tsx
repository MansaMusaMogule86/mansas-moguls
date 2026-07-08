"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/Logo";
import { DashboardNavLinks } from "./DashboardSidebar";
import { notifications } from "@/lib/data/dashboard";

/**
 * Sticky top bar for the dashboard — mobile nav trigger, search, notifications,
 * and the founder avatar.
 */
export function DashboardTopbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const unread = notifications.length;

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-white/8 bg-empire-black/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-8 place-items-center rounded-lg border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:text-foreground lg:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="size-4" />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="size-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Search */}
            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 sm:flex">
              <Search className="size-3.5 shrink-0 text-muted-foreground" />
              <input
                placeholder="Search the empire…"
                className="w-44 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60 lg:w-64"
              />
              <kbd className="hidden rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground/50 lg:inline">⌘K</kbd>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Button variant="ghost" size="icon" className="relative size-8" aria-label="Notifications">
              <Bell className="size-4" />
              {unread > 0 && (
                <span className="absolute right-1 top-1 grid size-3.5 place-items-center rounded-full bg-gold text-[9px] font-bold text-primary-foreground">
                  {unread}
                </span>
              )}
            </Button>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1 pl-1 pr-3">
              <span className="grid size-6 place-items-center rounded-full bg-gradient-to-br from-gold to-gold-deep text-[11px] font-bold text-primary-foreground shadow-[0_4px_12px_rgba(212,175,55,0.25)]">
                F
              </span>
              <span className="hidden text-sm font-medium sm:inline">Founder</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile sidebar drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-14 z-40 bg-empire-black/80 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed left-0 top-14 z-50 flex h-[calc(100svh-3.5rem)] w-72 flex-col border-r border-white/10 bg-empire-ink px-4 py-6 lg:hidden"
            >
              <div className="px-2 pb-6 border-b border-white/8">
                <Logo />
              </div>
              <div className="mt-4 flex flex-1 flex-col">
                <DashboardNavLinks onNavigate={() => setOpen(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
