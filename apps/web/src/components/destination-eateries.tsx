"use client";

import { useMemo, useState } from "react";
import { localizeRow, type Locale, type Translations, type EateryTranslatable } from "@itp/shared";
import { CollapsibleDetails } from "./collapsible-details";

type Eatery = {
  id: string;
  name: string;
  area: string | null;
  area_slug: string | null;
  cuisine: string[] | null;
  category: string;
  signature_dish: string | null;
  parking_type?:
    | "on-site"
    | "paid-nearby"
    | "valet"
    | "street"
    | "walk-200m"
    | "walk-500m+"
    | "no-vehicle-access"
    | null;
  hygiene_confidence?: {
    fssai?: boolean | null;
    water?: "clean" | "bottled-only" | "unsure" | null;
    reviews_count?: number | null;
    established_year_min_5?: boolean | null;
  } | null;
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
  translations?: Translations<EateryTranslatable> | null;
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

const CATEGORY_LABEL_HI: Record<string, string> = {
  fine_dining: "फ़ाइन डाइनिंग",
  mid_range: "मिड-रेंज",
  casual: "कैज़ुअल",
  street_food: "स्ट्रीट फ़ूड",
  cafe: "कैफ़े",
  bar: "बार",
  sweet_shop: "मिठाई की दुकान",
};

const CATEGORY_ORDER = ["fine_dining", "mid_range", "casual", "street_food", "cafe", "bar", "sweet_shop"];

const PARKING_LABEL: Record<string, string> = {
  "on-site": "On-site parking",
  "paid-nearby": "Paid lot nearby",
  valet: "Valet",
  street: "Street parking",
  "walk-200m": "Park 200m away",
  "walk-500m+": "Park 500m+ walk",
  "no-vehicle-access": "No vehicle access",
};

const PARKING_LABEL_HI: Record<string, string> = {
  "on-site": "ऑन-साइट पार्किंग",
  "paid-nearby": "पास में पेड पार्किंग",
  valet: "वैले पार्किंग",
  street: "स्ट्रीट पार्किंग",
  "walk-200m": "200मी दूर पार्किंग",
  "walk-500m+": "500मी+ पैदल",
  "no-vehicle-access": "वाहन प्रवेश नहीं",
};

// Hygiene tier — three buckets based on how many signals an eatery clears.
// Returns null when no useful signal exists (UI hides the badge).
function computeHygieneTier(h: {
  fssai?: boolean | null;
  water?: "clean" | "bottled-only" | "unsure" | null;
  reviews_count?: number | null;
  established_year_min_5?: boolean | null;
}): { label: string; cls: string; tooltip: string } | null {
  const fssai = h.fssai === true;
  const waterOk = h.water === "clean" || h.water === "bottled-only";
  const reviewsOk = (h.reviews_count ?? 0) >= 50;
  const seasoned = h.established_year_min_5 === true;
  const score = (fssai ? 1 : 0) + (waterOk ? 1 : 0) + (reviewsOk ? 1 : 0) + (seasoned ? 1 : 0);

  // Only surface when there's at least one positive signal AND no red flag.
  // h.water === "unsure" is a neutral, not a red flag.
  if (score === 0) return null;
  const tooltipBits: string[] = [];
  if (fssai) tooltipBits.push("FSSAI registered");
  if (waterOk) tooltipBits.push(h.water === "clean" ? "clean water source" : "bottled water only");
  if (reviewsOk) tooltipBits.push(`${h.reviews_count} reviews`);
  if (seasoned) tooltipBits.push("operating 5+ years");
  const tooltip = `Hygiene signals — ${tooltipBits.join(" · ")}`;

  if (score >= 3) {
    return {
      label: "Hygiene ✓",
      cls: "border-teal-500/40 bg-teal-500/10 text-teal-600 dark:text-teal-300",
      tooltip,
    };
  }
  return {
    label: "Hygiene ~",
    cls: "border-zinc-500/30 bg-zinc-500/5 text-zinc-500 dark:text-zinc-400",
    tooltip,
  };
}

function mapsUrl(e: Eatery): string {
  if (e.google_maps_url) return e.google_maps_url;
  const q = encodeURIComponent(`${e.name} ${e.area ?? ""}`.trim());
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export function DestinationEateries({
  eateries,
  destinationName,
  locale,
}: {
  eateries: Eatery[];
  destinationName: string;
  locale: Locale;
}) {
  const [activeArea, setActiveArea] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Swap prose fields (signature_dish / why_it_matters / insider_tip) to Hindi
  // when present; names, areas, dishes and addresses stay in Latin script.
  const localized = useMemo(
    () => eateries.map((e) => localizeRow(e, locale, ["signature_dish", "why_it_matters", "insider_tip"])),
    [eateries, locale],
  );
  const catLabel = locale === "hi" ? CATEGORY_LABEL_HI : CATEGORY_LABEL;
  const parkLabel = locale === "hi" ? PARKING_LABEL_HI : PARKING_LABEL;

  const areas = useMemo(() => {
    const map = new Map<string, { slug: string; label: string; count: number }>();
    for (const e of localized) {
      if (!e.area_slug) continue;
      const label = (e.area ?? "").split(",")[0].trim() || e.area_slug;
      const existing = map.get(e.area_slug);
      if (existing) existing.count++;
      else map.set(e.area_slug, { slug: e.area_slug, label, count: 1 });
    }
    return Array.from(map.values()).sort((a, b) => b.count - a.count);
  }, [localized]);

  const categories = useMemo(() => {
    const set = new Set(localized.map((e) => e.category));
    return CATEGORY_ORDER.filter((c) => set.has(c));
  }, [localized]);

  const filtered = useMemo(() => {
    return localized.filter((e) => {
      if (activeArea && e.area_slug !== activeArea) return false;
      if (activeCategory && e.category !== activeCategory) return false;
      return true;
    });
  }, [localized, activeArea, activeCategory]);

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
              {catLabel[c] ?? c}
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
                  {(() => {
                    if (!e.established_year) return null;
                    const yearsOpen = new Date().getUTCFullYear() - e.established_year;
                    if (yearsOpen >= 50) {
                      // 1970s and older — heritage tier
                      return (
                        <span
                          title={`Operating since ${e.established_year} — ${yearsOpen} years`}
                          className="inline-flex items-center rounded-full border border-sky-500/30 bg-sky-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-sky-600 dark:text-sky-400"
                        >
                          {yearsOpen >= 100 ? "Centenary+" : `${Math.floor(yearsOpen / 10) * 10}+ years`}
                        </span>
                      );
                    }
                    if (yearsOpen >= 5) {
                      // Survived the 2-year cliff — 70% of Indian F&B closes inside 2 years.
                      return (
                        <span
                          title={`Operating since ${e.established_year} — past the 2-year cliff`}
                          className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-600 dark:text-emerald-400"
                        >
                          Established
                        </span>
                      );
                    }
                    return null;
                  })()}
                  {e.vegetarian === "pure-veg" && (
                    <span title="Pure vegetarian" className="inline-flex h-4 w-4 items-center justify-center rounded-sm border border-green-600/40">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                    </span>
                  )}
                  {(() => {
                    const h = e.hygiene_confidence;
                    if (!h) return null;
                    const tier = computeHygieneTier(h);
                    if (!tier) return null;
                    return (
                      <span
                        title={tier.tooltip}
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${tier.cls}`}
                      >
                        {tier.label}
                      </span>
                    );
                  })()}
                </div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">
                  {e.area && <span>{e.area}</span>}
                  {e.established_year && <span> · since {e.established_year}</span>}
                </div>
              </div>
              <div className="text-right text-[11px] text-muted-foreground shrink-0">
                <div className="font-medium">{e.price_range}</div>
                <div>{catLabel[e.category] ?? e.category}</div>
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
              {e.parking_type && (
                <span
                  className="inline-flex items-center gap-1 text-muted-foreground/80"
                  title="Parking situation as audited"
                >
                  <span aria-hidden="true">🅿︎</span>
                  {parkLabel[e.parking_type] ?? e.parking_type}
                </span>
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
