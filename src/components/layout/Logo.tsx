import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { brand } from "@/lib/brand";

/**
 * Empire wordmark: crown mark + Mansas Moguls lockup.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${brand.name} home`}
      className={cn("group flex items-center gap-3", className)}
    >
      <span className="relative grid size-9 place-items-center rounded-md border border-gold/30 bg-empire-ink gold-glow transition-colors group-hover:border-gold/60">
        <Image
          src="/mansas-moguls-crown.png"
          alt="Mansas Moguls crown"
          width={22}
          height={22}
          className="object-contain drop-shadow-[0_0_6px_rgba(212,175,55,0.6)]"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-base font-semibold tracking-wide text-foreground">
          {brand.name}
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
          The Empire
        </span>
      </span>
    </Link>
  );
}
