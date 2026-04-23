import { cn } from "@/lib/utils";

export type Scenario = {
  id: string;
  slug: string;
  title: string;
  category: string;
  if_clause: string;
  then_clause: string;
  severity: "info" | "warning" | "critical";
};

const SEVERITY_TONE: Record<Scenario["severity"], { border: string; text: string; badge: string }> = {
  info:     { border: "border-sky-500/25",     text: "text-sky-300",     badge: "bg-sky-500/10 text-sky-300" },
  warning:  { border: "border-amber-500/30",   text: "text-amber-200",   badge: "bg-amber-500/10 text-amber-300" },
  critical: { border: "border-red-500/35",     text: "text-red-200",     badge: "bg-red-500/15 text-red-300" },
};

const CATEGORY_ICON: Record<string, string> = {
  pass_closure: "⛰",
  health:       "🩺",
  network:      "📡",
  logistics:    "🗝",
  safety:       "🚨",
  money:        "💸",
  weather:      "🌧",
};

function LocaleLink({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) {
  // eslint-disable-next-line @next/next/no-html-link-for-pages — matches destination-detail pattern
  return <a href={to} className={className}>{children}</a>;
}

export function ScenarioStrip({
  scenarios,
  locale,
  title = "If Things Go Wrong",
  subtitle = "Pre-run these scenarios before you leave — you won't have signal to read them later.",
}: {
  scenarios: Scenario[] | null | undefined;
  locale: string;
  title?: string;
  subtitle?: string;
}) {
  if (!scenarios || scenarios.length === 0) return null;

  // Sort critical → warning → info
  const order = { critical: 0, warning: 1, info: 2 } as const;
  const sorted = [...scenarios].sort((a, b) => order[a.severity] - order[b.severity]).slice(0, 6);

  return (
    <section id="section-scenarios" className="scroll-mt-24">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <span className="text-xs text-muted-foreground/70">{subtitle}</span>
      </div>

      <div className={cn("grid gap-3", sorted.length > 1 && "md:grid-cols-2")}>
        {sorted.map((s) => {
          const tone = SEVERITY_TONE[s.severity];
          return (
            <LocaleLink
              key={s.id}
              to={`/${locale}/guide/scenarios/${s.slug}`}
              className={cn(
                "rounded-xl border bg-background/40 p-4 transition-all hover:bg-background/60",
                tone.border,
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <span aria-hidden className="text-base">{CATEGORY_ICON[s.category] ?? "•"}</span>
                <span className={cn("font-mono text-[9px] tracking-[0.22em] uppercase rounded-full px-2 py-0.5", tone.badge)}>
                  {s.severity}
                </span>
                <h3 className="text-sm font-semibold truncate flex-1">{s.title}</h3>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs text-muted-foreground/80">
                  <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-muted-foreground/60 mr-1">If</span>
                  {s.if_clause}
                </p>
                <p className={cn("text-sm leading-relaxed", tone.text)}>
                  <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-muted-foreground/60 mr-1">Then</span>
                  {s.then_clause}
                </p>
              </div>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/50">
                Full protocol →
              </div>
            </LocaleLink>
          );
        })}
      </div>
    </section>
  );
}
