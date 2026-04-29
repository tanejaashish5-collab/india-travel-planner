"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type PersonaKey = "family" | "biker" | "photographer" | "nomad" | "solo_female" | "elderly";

type PersonaBlocks = Partial<Record<PersonaKey, string>>;

// Kept `♀` on solo-female — it's a typographic symbol (Unicode U+2640)
// not a face emoji, and the rest of the app (card chips, explore filter)
// already uses it as a consistent identity marker. Face/object emojis
// on the other persona tabs were removed as part of the D4 emoji
// restraint pass — they competed with the tab label text.
//
// `tone` is for the active-chip + content-card surface; `ring` lifts the
// active chip a step further so first-time visitors see "this is selected,
// the others are switchable" at a glance.
const META: Record<PersonaKey, { glyph: string | null; label: string; tone: string; ring: string }> = {
  family:        { glyph: null, label: "Family with kids",      tone: "border-emerald-500/40 bg-emerald-500/15", ring: "ring-emerald-500/40" },
  biker:         { glyph: null, label: "Biker / road trip",     tone: "border-orange-500/40 bg-orange-500/15",   ring: "ring-orange-500/40"   },
  photographer:  { glyph: null, label: "Photographer",          tone: "border-purple-500/40 bg-purple-500/15",   ring: "ring-purple-500/40"   },
  nomad:         { glyph: null, label: "Digital nomad",         tone: "border-sky-500/40 bg-sky-500/15",         ring: "ring-sky-500/40"      },
  solo_female:   { glyph: "♀",  label: "Solo-female traveler",  tone: "border-pink-500/40 bg-pink-500/15",       ring: "ring-pink-500/40"     },
  elderly:       { glyph: null, label: "Elderly parents",       tone: "border-amber-500/40 bg-amber-500/15",     ring: "ring-amber-500/40"    },
};

export function PersonaBlocksSection({ data }: { data: PersonaBlocks | null | undefined }) {
  const available = (Object.keys(META) as PersonaKey[]).filter((k) => !!data?.[k]?.trim());
  const [active, setActive] = useState<PersonaKey | null>(available[0] ?? null);

  if (!data || available.length === 0) return null;

  return (
    <section id="section-personas" className="scroll-mt-24">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">For travelers like you</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Tap any traveler type below to see how this place feels for them.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4" role="tablist" aria-label="Traveler type">
        {available.map((k) => {
          const isActive = active === k;
          const meta = META[k];
          return (
            <button
              key={k}
              type="button"
              onClick={() => setActive(k)}
              role="tab"
              aria-selected={isActive}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all cursor-pointer",
                isActive
                  ? `${meta.tone} ${meta.ring} ring-2 text-foreground font-semibold`
                  : "border-border/70 text-muted-foreground hover:text-foreground hover:border-foreground/40 hover:bg-foreground/5",
              )}
              aria-pressed={isActive}
            >
              {meta.glyph && <span aria-hidden>{meta.glyph}</span>}
              {meta.label}
            </button>
          );
        })}
      </div>

      {active && data[active] && (
        <div className={cn("rounded-xl border p-5", META[active].tone)}>
          <p className="text-sm leading-relaxed text-foreground/90">{data[active]}</p>
        </div>
      )}
    </section>
  );
}
