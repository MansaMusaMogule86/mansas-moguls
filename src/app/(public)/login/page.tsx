import type { Metadata } from "next";
import Link from "next/link";
import { Crown } from "lucide-react";
import { LoginForm } from "@/components/forms/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Enter the Mansas Moguls command center.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 py-20">
      <div className="empire-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[130px]" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-xl border border-gold/30 bg-empire-ink gold-glow">
            <Crown className="size-5 text-gold" strokeWidth={1.75} />
          </span>
          <h1 className="mt-5 text-2xl font-semibold">Enter the command center</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Access is reserved for the empire&apos;s founders, team, partners,
            and clients.
          </p>
        </div>

        <LoginForm />

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Not yet inside?{" "}
          <Link href="/join" className="font-medium text-gold hover:text-gold-bright">
            Join the empire
          </Link>
        </p>
      </div>
    </section>
  );
}
