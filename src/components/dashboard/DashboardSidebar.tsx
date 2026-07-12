"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Bot,
  BrainCircuit,
  Flag,
  Folder,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/Logo";
import { dashboardNav } from "@/lib/brand";

const icons: Record<string, LucideIcon> = {
  "layout-dashboard": LayoutDashboard,
  "folder-kanban": FolderKanban,
  "check-square": CheckSquare,
  bot: Bot,
  "brain-circuit": BrainCircuit,
  flag: Flag,
  folder: Folder,
  "message-square": MessageSquare,
  settings: Settings,
};

/**
 * Dashboard nav links — shared by the desktop rail and the mobile sheet.
 */
export function DashboardNavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-1">
      {dashboardNav.map((item) => {
        const Icon = icons[item.icon];
        const isActive =
          item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors",
              isActive
                ? "border border-gold/15 bg-gold/10 text-gold"
                : "border border-transparent text-muted-foreground hover:border-white/10 hover:bg-white/5 hover:text-foreground",
            )}
          >
            {Icon && (
              <Icon
                className={cn(
                  "size-4.5 shrink-0",
                  isActive ? "text-gold" : "text-muted-foreground group-hover:text-foreground",
                )}
                strokeWidth={1.75}
              />
            )}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

/**
 * Fixed desktop sidebar for the command center.
 */
export function DashboardSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/10 bg-empire-ink/80 px-4 py-6 backdrop-blur-xl lg:flex">
      <div className="px-2">
        <Logo />
      </div>
      <div className="mt-8 flex flex-1 flex-col">
        <DashboardNavLinks />
        <Link
          href="/"
          className="mt-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
        >
          <LogOut className="size-4.5 shrink-0" strokeWidth={1.75} />
          Exit to site
        </Link>
      </div>
    </aside>
  );
}
