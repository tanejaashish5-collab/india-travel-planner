import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/ui/section-label";

/**
 * Elevation context chart — renders an altitude stripe with the destination
 * marked against well-known reference altitudes so a cold visitor understands
 * "how high IS this place really?" without needing a geographic mental model.
 *
 * Only rendered for destinations above 1500m — below that, altitude isn't the
 * traveler-relevant fact.
 */
const REFERENCES: Array<{ m: number; label: string }> = [
  { m: 0,     label: "Sea level" },
  { m: 216,   label: "Delhi" },
  { m: 1500,  label: "Shimla" },
  { m: 2130,  label: "AMS risk begins" },
  { m: 3524,  label: "Leh" },
  { m: 5359,  label: "Khardung-La" },
  { m: 8849,  label: "Everest" },
];

export function ElevationChart({
  elevationM,
  destinationName,
  className,
}: {
  elevationM: number | null | undefined;
  destinationName: string;
  className?: string;
}) {
  if (!elevationM || elevationM < 1500) return null;

  // Visual ceiling: snap to the next major reference above the destination.
  // Caps at Everest so very-high dests (Stok Kangri etc.) still have context.
  const ceiling = REFERENCES.find((r) => r.m >= elevationM)?.m ?? 8849;
  const pct = Math.min(100, (elevationM / ceiling) * 100);
  const visibleRefs = REFERENCES.filter((r) => r.m <= ceiling && r.m > 0);
  const amsTone =
    elevationM >= 3500 ? "text-red-300 border-red-500/30" :
    elevationM >= 2500 ? "text-orange-300 border-orange-500/30" :
    elevationM >= 2100 ? "text-yellow-300 border-yellow-500/30" :
    "text-emerald-300 border-emerald-500/30";

  return (
    <section id="section-elevation" className={cn("scroll-mt-24", className)}>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <h2 className="text-xl font-semibold">Altitude Context</h2>
        <span className="text-sm text-muted-foreground">
          How high this sits vs places you already know.
        </span>
      </div>

      <div className="rounded-xl border border-border bg-background/40 p-5">
        <div className="flex items-start gap-6">
          {/* Vertical stripe — flex column with proportional slivers */}
          <div className="relative h-64 w-8 shrink-0 overflow-hidden rounded-lg bg-gradient-to-t from-emerald-500/10 via-yellow-500/10 to-red-500/20">
            {/* Reference ticks */}
            {visibleRefs.map((r) => {
              const topPct = 100 - (r.m / ceiling) * 100;
              return (
                <div
                  key={r.m}
                  className="absolute left-0 right-0 h-px bg-white/15"
                  style={{ top: `${topPct}%` }}
                />
              );
            })}
            {/* Destination pin */}
            <div
              className="absolute left-0 right-0 h-1 bg-foreground shadow-lg shadow-foreground/50"
              style={{ top: `${100 - pct}%` }}
            />
          </div>

          {/* Reference labels on the right, vertically aligned */}
          <div className="relative flex-1 h-64 text-xs">
            {visibleRefs.map((r) => {
              const topPct = 100 - (r.m / ceiling) * 100;
              return (
                <div
                  key={r.m}
                  className="absolute left-0 right-0 flex items-center gap-2 text-muted-foreground/70"
                  style={{ top: `calc(${topPct}% - 0.5em)` }}
                >
                  <span className="font-mono text-[10px] tabular-nums opacity-60">
                    {r.m.toLocaleString()}m
                  </span>
                  <span className="opacity-75">· {r.label}</span>
                </div>
              );
            })}
            {/* Destination label — bolder, overriding ticks if same height */}
            <div
              className="absolute left-0 right-0 flex items-center gap-2 text-foreground font-semibold"
              style={{ top: `calc(${100 - pct}% - 0.5em)` }}
            >
              <span className="font-mono text-[11px] tabular-nums">{elevationM.toLocaleString()}m</span>
              <span>· {destinationName}</span>
            </div>
          </div>
        </div>

        {/* AMS indicator row */}
        <div className={cn("mt-5 rounded-lg border bg-background/40 px-3 py-2 text-xs", amsTone)}>
          <SectionLabel as="span" tone="muted" className="mr-2">AMS risk</SectionLabel>
          {elevationM >= 3500 && "High — acclimatize at least 2 nights before going higher. Diamox prophylaxis recommended."}
          {elevationM >= 2500 && elevationM < 3500 && "Moderate — sleep one night here before ascending further."}
          {elevationM >= 2100 && elevationM < 2500 && "Low but present — some travelers feel mild effects. Hydrate, go easy on day 1."}
          {elevationM < 2100 && "Negligible for most travelers."}
        </div>
      </div>
    </section>
  );
}
