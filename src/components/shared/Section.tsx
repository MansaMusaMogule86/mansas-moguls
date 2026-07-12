import { cn } from "@/lib/utils";

/**
 * Standard centered content section with empire max-width and padding.
 */
export function Section({
  children,
  className,
  as: Tag = "section",
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  return (
    // @ts-expect-error Generic polymorphic element
    <Tag className={cn("mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8", className)}>
      {children}
    </Tag>
  );
}
