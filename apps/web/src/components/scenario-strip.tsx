import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/ui/section-label";

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
  info:     { border: "border-sky-500/50",     text: "text-sky-300",     badge: "bg-sky-500/10 text-sky-300" },
  warning:  { border: "border-amber-500/55",   text: "text-amber-200",   badge: "bg-amber-500/10 text-amber-300" },
  critical: { border: "border-red-500/60",     text: "text-red-200",     badge: "bg-red-500/15 text-red-300" },
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
        <span className="text-sm text-muted-foreground">{subtitle}</span>
      </div>

      {/* Stacked full-width rows — scenario text is dense enough that a
          2-col grid cramps the reading column. Each card gets breathing
          room and a natural 60–75ch prose width. */}
      <div className="space-y-3">
        {sorted.map((s) => {
          const tone = SEVERITY_TONE[s.severity];
          return (
            <LocaleLink
              key={s.id}
              to={`/${locale}/guide/scenarios/${s.slug}`}
              className={cn(
                // `block` is load-bearing: <a> defaults to inline, so without
                // it `border` + `p-4` don't form a proper card — the border
                // tangles around text lines. (This bit us; don't remove.)
                "block rounded-xl border bg-background/40 p-5 transition-all hover:bg-background/60",
                tone.border,
              )}
            >
              <div className="flex items-center gap-2 mb-3">
                <span aria-hidden className="text-base">{CATEGORY_ICON[s.category] ?? "•"}</span>
                <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em]", tone.badge)}>
                  {s.severity}
                </span>
                <h3 className="text-base font-semibold flex-1">{s.title}</h3>
              </div>
              {/* IF / THEN blocks each on their own rows — inline labels at
                  tiny sizes were unreadable and the prose was hugging the
                  label without breathing room. */}
              <div className="space-y-3">
                <div>
                  <SectionLabel className="mb-1">If</SectionLabel>
                  <p className="text-sm leading-relaxed text-foreground/80">{s.if_clause}</p>
                </div>
                <div>
                  <SectionLabel className="mb-1">Then</SectionLabel>
                  <p className={cn("text-sm leading-relaxed font-medium", tone.text)}>{s.then_clause}</p>
                </div>
              </div>
              <SectionLabel tone="muted" className="mt-4">
                Full protocol &rarr;
              </SectionLabel>
            </LocaleLink>
          );
        })}
      </div>
    </section>
  );
}
