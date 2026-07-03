"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "./Logo";
import { mainNav, primaryCta } from "@/lib/brand";

/**
 * Public marketing navbar — glass bar, desktop links, mobile sheet.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto flex h-16 max-w-[92rem] items-center justify-between gap-4 px-3 sm:px-6 lg:px-8">
        <div className="glass-panel flex w-full items-center justify-between rounded-2xl border border-white/10 px-3 py-2.5 shadow-[0_20px_70px_rgba(0,0,0,0.2)] sm:px-4">
          <Logo />

          <nav className="hidden flex-1 items-center justify-center gap-1 whitespace-nowrap lg:flex xl:gap-2">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-2.5 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground xl:px-3 xl:text-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Button
              asChild
              className="hidden whitespace-nowrap bg-gold px-4 text-primary-foreground shadow-[0_18px_40px_rgba(255,196,61,0.16)] hover:bg-gold-bright sm:inline-flex"
            >
              <Link href={primaryCta.href}>{primaryCta.label}</Link>
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs border-white/10 bg-empire-ink px-4">
                <SheetHeader className="px-0">
                  <SheetTitle className="text-left">
                    <div className="flex items-center justify-between gap-4">
                      <Logo />
                      <span className="rounded-full border border-gold/20 bg-gold/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
                        Menu
                      </span>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-5 flex flex-col gap-1 px-0">
                  {mainNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="rounded-lg border border-transparent px-3 py-3 text-[15px] font-medium text-muted-foreground transition-colors hover:border-white/10 hover:bg-white/5 hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Button
                    asChild
                    className="mt-4 w-full bg-gold text-primary-foreground shadow-[0_18px_40px_rgba(255,196,61,0.16)] hover:bg-gold-bright"
                  >
                    <Link href={primaryCta.href} onClick={() => setOpen(false)}>
                      {primaryCta.label}
                    </Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
