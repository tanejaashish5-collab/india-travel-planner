import { cn } from "@/lib/utils";

type Logistics = {
  taxi?: string;
  checkin_norms?: string;
  cash_vs_upi?: string;
  atm_reliability?: string;
  shop_hours?: string;
  language_realities?: string;
  internet_backup?: string;
};

const ROWS: Array<{ key: keyof Logistics; label: string }> = [
  { key: "taxi",               label: "Taxis & local transport" },
  { key: "checkin_norms",      label: "Check-in / check-out norms" },
  { key: "cash_vs_upi",        label: "Cash vs UPI" },
  { key: "atm_reliability",    label: "ATMs (real-world reliability)" },
  { key: "shop_hours",         label: "Shop & restaurant hours" },
  { key: "language_realities", label: "Language realities" },
  { key: "internet_backup",    label: "Internet backup plan" },
];

export function LogisticsChecklist({ data, className }: { data: Logistics | null | undefined; className?: string }) {
  if (!data) return null;
  const filled = ROWS.filter((r) => !!data[r.key]?.toString().trim());
  if (filled.length === 0) return null;

  return (
    <section id="section-logistics" className={cn("scroll-mt-24", className)}>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <h2 className="text-xl font-semibold">How This Place Actually Works</h2>
        <span className="text-sm text-muted-foreground">
          Day-to-day logistics — what locals know that maps don't show.
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {filled.map(({ key, label }) => (
          <div key={key} className="rounded-xl border border-border bg-background/40 p-4">
            <h3 className="mb-2 text-sm font-semibold">{label}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{data[key]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
