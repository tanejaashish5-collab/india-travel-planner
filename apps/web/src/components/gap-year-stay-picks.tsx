"use client";

import type { StayPick, StaySlot } from "@/lib/gap-year/types";

interface Props {
  stays: StayPick[] | undefined;
  loading?: boolean;
}

const SLOT_LABEL: Record<StaySlot, string> = {
  experience: "Experience",
  value: "Value",
  location: "Location",
  xfactor: "X-Factor",
};

const SLOT_COLOR: Record<StaySlot, string> = {
  experience: "bg-amber-500/15 text-amber-400 border-amber-500/40",
  value: "bg-emerald-500/15 text-emerald-400 border-emerald-500/40",
  location: "bg-sky-500/15 text-sky-400 border-sky-500/40",
  xfactor: "bg-fuchsia-500/15 text-fuchsia-400 border-fuchsia-500/40",
};

const SLOT_ORDER: StaySlot[] = ["experience", "value", "location", "xfactor"];

export function GapYearStayPicks({ stays, loading }: Props) {
  if (loading) {
    return (
      <div className="mt-3 rounded-md border border-border/60 bg-muted/20 p-3 text-xs text-muted-foreground">
        Loading stay picks…
      </div>
    );
  }
  if (!stays || stays.length === 0) {
    return (
      <div className="mt-3 rounded-md border border-dashed border-border/60 bg-muted/20 p-3 text-xs text-muted-foreground">
        NakshIQ is still finalising stays for this destination.
      </div>
    );
  }

  const bySlot = new Map(stays.map((s) => [s.slot, s]));
  const ordered = SLOT_ORDER.map((slot) => bySlot.get(slot)).filter((s): s is StayPick => !!s);

  return (
    <div className="mt-3 rounded-md border border-border/60 bg-muted/20 p-3">
      <div className="text-[10px] uppercase tracking-[0.08em] text-muted-foreground mb-2">
        NakshIQ stay picks
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {ordered.map((s) => (
          <div key={s.slot} className="rounded border border-border/60 bg-background p-2">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className={`inline-block text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded border ${SLOT_COLOR[s.slot]}`}>
                {SLOT_LABEL[s.slot]}
              </span>
              {s.priceBand && (
                <span className="text-[10px] text-muted-foreground">{s.priceBand}</span>
              )}
            </div>
            <div className="text-sm font-medium text-foreground">{s.name}</div>
            {s.propertyType && (
              <div className="text-[10px] text-muted-foreground capitalize">{s.propertyType}</div>
            )}
            <p className="text-xs text-foreground/80 mt-1 line-clamp-2">{s.whyNakshiq}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
