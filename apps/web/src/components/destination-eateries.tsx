"use client";

import { useMemo, useState } from "react";
import { CollapsibleDetails } from "./collapsible-details";

type Eatery = {
  id: string;
  name: string;
  area: string | null;
  area_slug: string | null;
  cuisine: string[] | null;
  category: string;
  signature_dish: string | null;
  must_try: string[] | null;
  price_range: string | null;
  price_per_head_inr: string | null;
  vegetarian: string;
  kid_friendly: boolean | null;
  reservation: string | null;
  dress_code: string | null;
  established_year: number | null;
  why_it_matters: string | null;
  insider_tip: string | null;
  signature_address: string | null;
  google_maps_url: string | null;
  zomato_url: string | null;
  is_legendary: boolean;
};

const CATEGORY_LABEL: Record<string, string> = {
  fine_dining: "Fine dining",
  mid_range: "Mid-range",
  casual: "Casual",
  street_food: "Street food",
  cafe: "Cafe",
  bar: "Bar",
  sweet_shop: "Sweet shop",
};

const CATEGORY_ORDER = ["fine_dining", "mid_range", "casual", "street_food", "cafe", "bar", "sweet_shop"];

function mapsUrl(e: Eatery): string {
  if (e.google_maps_url) return e.google_maps_url;
  const q = encodeURIComponent(`${e.name} ${e.area ?? ""}`.trim());
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export function DestinationEateries({ eateries, destinationName }: { eateries: Eatery[]; destinationName: string }) {
  const [activeArea, setActiveArea] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const areas = useMemo(() => {
    const map = new Map<string, { slug: string; label: string; count: number }>();
    for (const e of eateries) {
      if (!e.area_slug) continue;
      const label = (e.area ?? "").split(",")[0].trim() || e.area_slug;
      const existing = map.get(e.area_slug);
      if (existing) existing.count++;
      else map.set(e.area_slug, { slug: e.area_slug, label, count: 1 });
    }
    return Array.from(map.values()).sort((a, b) => b.count - a.count);
  }, [eateries]);

  const categories = useMemo(() => {
    const set = new Set(eateries.map((e) => e.category));
    return CATEGORY_ORDER.filter((c) => set.has(c));
  }, [eateries]);

  const filtered = useMemo(() => {
    return eateries.filter((e) => {
      if (activeArea && e.area_slug !== activeArea) return false;
      if (activeCategory && e.category !== activeCategory) return false;
      return true;
    });
  }, [eateries, activeArea, activeCategory]);

  if (eateries.length === 0) return null;

  // Compute a list of distinct area names for the hint, capped to 4 so the
  // trigger row stays readable even on Delhi-scale data (25+ areas).
  const areaPreview = areas.slice(0, 4).map((a) => a.label).join(", ");
  const areaHint =
    areas.length > 4
      ? `${areaPreview} + ${areas.length - 4} more areas`
      : areaPreview || "Filter by area or category — addresses, signatures, insider tips.";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-baseline gap-2">
        <h2 className="font-serif italic text-2xl sm:text-3xl">Where to eat in {destinationName}</h2>
        <span className="text-xs text-muted-foreground">{eateries.length} verified spots</span>
      </div>
      <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
        From legacy institutions to modern bistros — addresses, signature dishes, and what locals actually order. Every entry verified against multiple sources.
      </p>

      {/* Collapsed by default — 72 dense restaurant cards swamp the page on
          long-scroll. Hide behind the same disclosure pattern used for the
          infrastructure reality check; serious planners click in, casual
          visitors scroll past. */}
      <CollapsibleDetails
        label="all places to eat"
        count={eateries.length}
        hint={areaHint}
      >
        <div className="space-y-5">
          {/* Area chips */}
          {areas.length > 1 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveArea(null)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
              activeArea === null ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            All areas
          </button>
          {areas.map((a) => (
            <button
              key={a.slug}
              onClick={() => setActiveArea(a.slug)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                activeArea === a.slug ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {a.label} <span className="opacity-60">· {a.count}</span>
            </button>
          ))}
        </div>
      )}

      {/* Category filter */}
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveCategory(null)}
            className={`rounded-md border px-2.5 py-1 text-[11px] font-medium transition-all ${
              activeCategory === null ? "border-foreground text-foreground" : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`rounded-md border px-2.5 py-1 text-[11px] font-medium transition-all ${
                activeCategory === c ? "border-foreground text-foreground" : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {CATEGORY_LABEL[c] ?? c}
            </button>
          ))}
        </div>
      )}

      {/* Cards */}
      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((e) => (
          <article key={e.id} className="rounded-2xl border border-border bg-card/40 p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <h3 className="font-serif italic text-lg leading-tight">{e.name}</h3>
                  {e.is_legendary && (
                    <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-600 dark:text-amber-400">
                      Legendary
                    </span>
                  )}
                  {e.vegetarian === "pure-veg" && (
                    <span title="Pure vegetarian" className="inline-flex h-4 w-4 items-center justify-center rounded-sm border border-green-600/40">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                    </span>
                  )}
                </div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">
                  {e.area && <span>{e.area}</span>}
                  {e.established_year && <span> · since {e.established_year}</span>}
                </div>
              </div>
              <div className="text-right text-[11px] text-muted-foreground shrink-0">
                <div className="font-medium">{e.price_range}</div>
                <div>{CATEGORY_LABEL[e.category] ?? e.category}</div>
              </div>
            </div>

            {e.signature_dish && (
              <div className="mt-3 text-[13px] leading-relaxed">
                <span className="text-muted-foreground/70">Signature: </span>
                <span className="font-medium">{e.signature_dish}</span>
              </div>
            )}

            {e.must_try && e.must_try.length > 0 && (
              <div className="mt-1 flex flex-wrap gap-1">
                {e.must_try.slice(0, 5).map((d) => (
                  <span key={d} className="rounded-md bg-muted/40 px-2 py-0.5 text-[11px] text-muted-foreground">
                    {d}
                  </span>
                ))}
              </div>
            )}

            {e.why_it_matters && (
              <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{e.why_it_matters}</p>
            )}

            {e.insider_tip && (
              <p className="mt-2 rounded-lg border-l-2 border-primary/40 bg-primary/5 px-3 py-2 text-[12px] leading-relaxed">
                <span className="font-medium">Tip — </span>
                {e.insider_tip}
              </p>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px]">
              {e.signature_address && (
                <span className="text-muted-foreground/80">{e.signature_address}</span>
              )}
            </div>

            <div className="mt-2.5 flex flex-wrap gap-2 text-[11px]">
              <a
                href={mapsUrl(e)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                Map →
              </a>
              {e.zomato_url && (
                <a
                  href={e.zomato_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  Zomato →
                </a>
              )}
              {e.reservation === "required" && (
                <span className="inline-flex items-center rounded-md bg-orange-500/10 px-2.5 py-1 text-orange-600 dark:text-orange-400">
                  Reservation required
                </span>
              )}
              {e.reservation === "recommended" && (
                <span className="inline-flex items-center rounded-md bg-amber-500/10 px-2.5 py-1 text-amber-600 dark:text-amber-400">
                  Reservation recommended
                </span>
              )}
              {e.dress_code === "formal" && (
                <span className="inline-flex items-center rounded-md bg-muted/60 px-2.5 py-1 text-muted-foreground">
                  Formal dress
                </span>
              )}
              {e.dress_code === "smart-casual" && (
                <span className="inline-flex items-center rounded-md bg-muted/60 px-2.5 py-1 text-muted-foreground">
                  Smart casual
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
        </div>
      </CollapsibleDetails>
    </div>
  );
}
