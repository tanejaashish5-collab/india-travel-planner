"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type PersonaKey = "family" | "biker" | "photographer" | "nomad" | "solo_female" | "elderly";

type PersonaBlocks = Partial<Record<PersonaKey, string>>;

const META: Record<PersonaKey, { icon: string; label: string; tone: string }> = {
  family:        { icon: "👨‍👩‍👧", label: "Family with kids",     tone: "border-emerald-500/30 bg-emerald-500/5" },
  biker:         { icon: "🏍️",     label: "Biker / road trip",   tone: "border-orange-500/30 bg-orange-500/5" },
  photographer:  { icon: "📷",     label: "Photographer",        tone: "border-purple-500/30 bg-purple-500/5" },
  nomad:         { icon: "💻",     label: "Digital nomad",       tone: "border-sky-500/30 bg-sky-500/5" },
  solo_female:   { icon: "♀",      label: "Solo-female traveler", tone: "border-pink-500/30 bg-pink-500/5" },
  elderly:       { icon: "🌿",     label: "Elderly parents",     tone: "border-amber-500/30 bg-amber-500/5" },
};

export function PersonaBlocksSection({ data }: { data: PersonaBlocks | null | undefined }) {
  const available = (Object.keys(META) as PersonaKey[]).filter((k) => !!data?.[k]?.trim());
  const [active, setActive] = useState<PersonaKey | null>(available[0] ?? null);

  if (!data || available.length === 0) return null;

  return (
    <section id="section-personas" className="scroll-mt-24">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <h2 className="text-xl font-semibold">For travelers like you</h2>
        <span className="text-sm text-muted-foreground">
          How this place plays out for each kind of traveler.
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {available.map((k) => {
          const isActive = active === k;
          const meta = META[k];
          return (
            <button
              key={k}
              type="button"
              onClick={() => setActive(k)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                isActive
                  ? `${meta.tone} text-foreground`
                  : "border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground",
              )}
              aria-pressed={isActive}
            >
              <span aria-hidden>{meta.icon}</span>
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
