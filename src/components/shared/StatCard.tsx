/**
 * Glass metric tile used in hero rows and page stat bands.
 */
export function StatCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="glass-panel rounded-2xl px-5 py-6 text-center">
      <div className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">
        {value}
      </div>
      <div className="mt-1.5 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
