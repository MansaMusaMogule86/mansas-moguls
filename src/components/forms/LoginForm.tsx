"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type LoginValues = z.infer<typeof loginSchema>;

/**
 * Visual login form. Authentication is not wired in this sprint — submitting
 * shows a notice that the dashboard is coming soon.
 */
export function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit() {
    // No real auth in this sprint — enter the (mock) command center.
    await new Promise((r) => setTimeout(r, 500));
    router.push("/dashboard");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="glass-panel space-y-5 rounded-2xl p-6 sm:p-8"
      noValidate
    >
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="you@company.com"
          className="border-white/10 bg-white/5"
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          {...register("password")}
          placeholder="••••••••"
          className="border-white/10 bg-white/5"
        />
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full bg-gold text-primary-foreground hover:bg-gold-bright"
      >
        <Lock className="size-4" />
        {isSubmitting ? "Verifying…" : "Enter Dashboard"}
      </Button>
    </form>
  );
}
