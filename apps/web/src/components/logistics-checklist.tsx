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

const ROWS: Array<{ key: keyof Logistics; icon: string; label: string }> = [
  { key: "taxi",               icon: "🚕", label: "Taxis & local transport" },
  { key: "checkin_norms",      icon: "🛎️", label: "Check-in / check-out norms" },
  { key: "cash_vs_upi",        icon: "💳", label: "Cash vs UPI" },
  { key: "atm_reliability",    icon: "🏧", label: "ATMs (real-world reliability)" },
  { key: "shop_hours",         icon: "🛍️", label: "Shop & restaurant hours" },
  { key: "language_realities", icon: "🗣️", label: "Language realities" },
  { key: "internet_backup",    icon: "📶", label: "Internet backup plan" },
];

export function LogisticsChecklist({ data, className }: { data: Logistics | null | undefined; className?: string }) {
  if (!data) return null;
  const filled = ROWS.filter((r) => !!data[r.key]?.toString().trim());
  if (filled.length === 0) return null;

  return (
    <section id="section-logistics" className={cn("scroll-mt-24", className)}>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <h2 className="text-xl font-semibold">How This Place Actually Works</h2>
        <span className="text-xs text-muted-foreground/70">
          Day-to-day logistics — what locals know that maps don't show.
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {filled.map(({ key, icon, label }) => (
          <div key={key} className="rounded-xl border border-border bg-background/40 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span aria-hidden className="text-lg">{icon}</span>
              <h3 className="text-sm font-semibold">{label}</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{data[key]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
