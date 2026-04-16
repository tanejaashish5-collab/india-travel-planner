"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { useState, useMemo } from "react";

/* ── Theme categories mapped from tags ── */
const THEME_FILTERS: Record<string, { label: string; match: string[] }> = {
  adventure: { label: "Adventure", match: ["adventure", "trekking", "trek", "motorcycle", "biker", "paragliding", "rafting", "skiing", "dangerous", "extreme", "eastern-ghats"] },
  spiritual: { label: "Spiritual", match: ["pilgrimage", "spiritual", "temple", "Jyotirlinga", "shiva", "Shiva", "buddhist", "Buddhist", "sikh", "sacred", "Hindu"] },
  nature: { label: "Nature", match: ["nature", "wildlife", "birding", "safari", "waterfall", "waterfalls", "rivers", "lakes", "monsoon", "snow", "snow-leopard", "national-park"] },
  heritage: { label: "Heritage", match: ["heritage", "fort", "unesco", "UNESCO", "world-heritage", "monastery", "ancient", "Mughal", "dynasty", "kakatiya", "maratha"] },
  food: { label: "Food", match: ["food", "cuisine", "street-food", "dhaba", "seafood", "biryani", "coffee", "tea", "deccan"] },
  family: { label: "Family", match: ["family", "kids", "safety", "solo", "women", "honeymoon", "romantic", "couples"] },
  budget: { label: "Budget", match: ["budget", "affordable", "value", "midrange", "luxury", "glamping"] },
  weekend: { label: "Weekends", match: ["weekend", "day-trip", "short-trip", "getaway"] },
  offbeat: { label: "Offbeat", match: ["offbeat", "hidden", "secret", "unexplored", "digital-detox", "tribal", "craft", "artisan", "ikat", "kalamkari"] },
  seasonal: { label: "Seasonal", match: ["winter", "summer", "monsoon", "spring", "autumn", "seasonal", "rain"] },
};

/* ── Region detection from tags ── */
const REGION_FILTERS: Record<string, { label: string; match: string[] }> = {
  north: { label: "North", match: ["North-India", "himachal", "uttarakhand", "rajasthan", "punjab", "delhi", "lucknow", "jaipur", "chandigarh"] },
  south: { label: "South", match: ["south-india", "kerala", "tamil-nadu", "andhra", "andhra-pradesh", "telangana", "hyderabad", "kochi", "bengaluru", "karnataka"] },
  east: { label: "East", match: ["west-bengal", "kolkata", "bihar"] },
  west: { label: "West", match: ["maharashtra", "mumbai", "goa", "gujarat", "konkan"] },
  central: { label: "Central", match: ["madhya-pradesh"] },
  northeast: { label: "Northeast", match: ["Northeast", "Meghalaya", "sikkim", "assam"] },
};

function getCollectionRegions(tags: string[]): string[] {
  const regions: string[] = [];
  for (const [key, { match }] of Object.entries(REGION_FILTERS)) {
    if (tags.some((t) => match.includes(t))) regions.push(key);
  }
  return regions;
}

function getCollectionThemes(tags: string[]): string[] {
  const themes: string[] = [];
  for (const [key, { match }] of Object.entries(THEME_FILTERS)) {
    if (tags.some((t) => match.includes(t))) themes.push(key);
  }
  return themes;
}

export function CollectionsGrid({ collections }: { collections: any[] }) {
  const locale = useLocale();
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [activeTheme, setActiveTheme] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return collections.filter((c) => {
      const tags = c.tags ?? [];
      const name = (c.name ?? "").toLowerCase();
      const desc = (c.description ?? "").toLowerCase();

      // Search filter
      if (search) {
        const q = search.toLowerCase();
        if (!name.includes(q) && !desc.includes(q) && !tags.some((t: string) => t.toLowerCase().includes(q))) {
          return false;
        }
      }

      // Region filter
      if (activeRegion) {
        const regions = getCollectionRegions(tags);
        // Collections with no region tags are "pan-India" — show them in all regions
        if (regions.length > 0 && !regions.includes(activeRegion)) return false;
      }

      // Theme filter
      if (activeTheme) {
        const themes = getCollectionThemes(tags);
        if (themes.length > 0 && !themes.includes(activeTheme)) return false;
      }

      return true;
    });
  }, [collections, activeRegion, activeTheme, search]);

  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const key of Object.keys(REGION_FILTERS)) {
      counts[key] = collections.filter((c) => {
        const regions = getCollectionRegions(c.tags ?? []);
        return regions.length === 0 || regions.includes(key);
      }).length;
    }
    return counts;
  }, [collections]);

  return (
    <div>
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search collections..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md rounded-xl border border-border bg-card px-4 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20"
        />
      </div>

      {/* Region tabs */}
      <div className="mb-3 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveRegion(null)}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            activeRegion === null
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          All Regions
        </button>
        {Object.entries(REGION_FILTERS).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => setActiveRegion(activeRegion === key ? null : key)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              activeRegion === key
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Theme tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTheme(null)}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            activeTheme === null
              ? "bg-emerald-600 text-white"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          All Themes
        </button>
        {Object.entries(THEME_FILTERS).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => setActiveTheme(activeTheme === key ? null : key)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTheme === key
                ? "bg-emerald-600 text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Results count */}
      {(activeRegion || activeTheme || search) && (
        <p className="mb-4 text-sm text-muted-foreground">
          Showing {filtered.length} of {collections.length} collections
          {activeRegion && ` in ${REGION_FILTERS[activeRegion].label}`}
          {activeTheme && ` — ${THEME_FILTERS[activeTheme].label}`}
          {search && ` matching "${search}"`}
        </p>
      )}

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c: any) => {
          const items = c.items ?? [];
          const coverUrl = `/images/collections/COLLECTION_${c.id}.jpg`;

          return (
            <a
              key={c.id}
              href={`/${locale}/collections/${c.id}`}
              className="group block rounded-2xl border border-border/50 bg-card overflow-hidden h-full transition-all duration-200 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 active:scale-[0.98]"
            >
              {/* Cover image */}
              <div
                className="relative h-40 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, oklch(0.22 0.03 260), oklch(0.16 0.02 280))`,
                  backgroundImage: `url(${coverUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-lg font-semibold text-white drop-shadow-lg">{c.name}</h3>
                </div>
              </div>

              <div className="p-5 pt-3">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {c.description}
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-mono font-bold text-primary">{items.length} places</span>
                  <div className="flex gap-1">
                    {(c.tags ?? []).slice(0, 3).map((tag: string) => (
                      <span key={tag} className="rounded-full border border-border px-2 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-full py-20 text-center text-muted-foreground">
            No collections match your filters.{" "}
            <button
              onClick={() => { setActiveRegion(null); setActiveTheme(null); setSearch(""); }}
              className="text-primary underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
