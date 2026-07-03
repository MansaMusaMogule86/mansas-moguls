import Link from "next/link";
import { Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center">
      <div className="empire-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[130px]" />

      <div className="relative">
        <span className="mx-auto grid size-12 place-items-center rounded-xl border border-gold/30 bg-empire-ink gold-glow">
          <Crown className="size-5 text-gold" strokeWidth={1.75} />
        </span>
        <p className="mt-8 font-heading text-6xl font-bold text-gradient-gold">404</p>
        <h1 className="mt-4 text-2xl font-semibold">Beyond the empire</h1>
        <p className="mx-auto mt-3 max-w-sm text-muted-foreground">
          This page is private, stealth, or does not exist.
        </p>
        <Button
          asChild
          size="lg"
          className="mt-8 bg-gold text-primary-foreground hover:bg-gold-bright"
        >
          <Link href="/">Return to the empire</Link>
        </Button>
      </div>
    </div>
  );
}
