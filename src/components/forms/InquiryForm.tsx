"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const inquirySchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Enter a valid email address."),
  company: z.string().optional(),
  message: z.string().min(10, "Tell us a little more (10+ characters)."),
});

type InquiryValues = z.infer<typeof inquirySchema>;

/**
 * Client-side validated inquiry form. No backend yet — on submit it simulates
 * success and shows a confirmation state. Used by Contact and Join pages.
 */
export function InquiryForm({
  submitLabel = "Send message",
  intent = "message",
}: {
  submitLabel?: string;
  intent?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryValues>({
    resolver: zodResolver(inquirySchema),
  });

  async function onSubmit() {
    // Placeholder: no backend in this sprint.
    await new Promise((r) => setTimeout(r, 600));
    reset();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="glass-panel flex flex-col items-center gap-3 rounded-2xl p-10 text-center">
        <CheckCircle2 className="size-10 text-gold" />
        <h3 className="text-xl font-semibold">Received</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          Thank you — your {intent} has reached the empire. Our team will be in
          touch shortly.
        </p>
        <Button
          variant="outline"
          className="mt-2 border-white/15 bg-white/5 hover:bg-white/10"
          onClick={() => setSubmitted(false)}
        >
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="glass-panel space-y-5 rounded-2xl p-6 sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <Input
            {...register("name")}
            placeholder="Your name"
            className="border-white/10 bg-white/5"
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <Input
            {...register("email")}
            type="email"
            placeholder="you@company.com"
            className="border-white/10 bg-white/5"
          />
        </Field>
      </div>

      <Field label="Company" hint="Optional" error={errors.company?.message}>
        <Input
          {...register("company")}
          placeholder="Company or venture"
          className="border-white/10 bg-white/5"
        />
      </Field>

      <Field label="Message" error={errors.message?.message}>
        <textarea
          {...register("message")}
          rows={5}
          placeholder="How can the empire help?"
          className={cn(
            "flex w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm shadow-xs outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-gold/40 focus-visible:ring-[3px] focus-visible:ring-gold/20",
          )}
        />
      </Field>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full bg-gold text-primary-foreground hover:bg-gold-bright"
      >
        {isSubmitting ? "Sending…" : submitLabel}
      </Button>
    </form>
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-foreground">{label}</Label>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
