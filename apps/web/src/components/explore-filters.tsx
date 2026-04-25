"use client";

import { useTranslations, useLocale } from "next-intl";

export interface FilterState {
  stateId: string;
  month: number;
  kidsOnly: boolean;
  soloFemaleOnly: boolean;
  ecoOnly: boolean;
  difficulty: string;
  search: string;
  sort: string;
}

interface ExploreFiltersProps {
  states: Array<{ id: string; name: string }>;
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  resultCount: number;
  // Hide the eco toggle when zero destinations carry an eco_tier rating —
  // prevents shipping a filter that returns 0 results during seeding.
  ecoCount?: number;
}

export function ExploreFilters({
  states,
  filters,
  onChange,
  resultCount,
  ecoCount = 0,
}: ExploreFiltersProps) {
  const locale = useLocale();
  const tf = useTranslations("filters");
  const tm = useTranslations("months");

  function update(partial: Partial<FilterState>) {
    onChange({ ...filters, ...partial });
  }

  const hasFilters =
    filters.stateId !== "" ||
    filters.month !== 0 ||
    filters.kidsOnly ||
    filters.soloFemaleOnly ||
    filters.ecoOnly ||
    filters.difficulty !== "" ||
    filters.search !== "" ||
    filters.sort !== "";

  return (
    <div className="space-y-4">
      {/* Search */}
      <input
        type="text"
        value={filters.search}
        onChange={(e) => update({ search: e.target.value })}
        placeholder={locale === "hi" ? "जगह खोजें..." : "Search destinations..."}
        className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
      />

      {/* Filter row — horizontal scroll on mobile, wrap on desktop */}
      <div className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-x-visible sm:pb-0 scrollbar-none">
        {/* State — grouped by region */}
        <select
          aria-label="Filter by state"
          value={filters.stateId}
          onChange={(e) => update({ stateId: e.target.value })}
          className="shrink-0 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">{tf("allStates")}</option>
          {(() => {
            const groups: Record<string, typeof states> = {};
            states.forEach((s) => {
              const region = (s as any).region ?? "Other";
              if (!groups[region]) groups[region] = [];
              groups[region].push(s);
            });
            return Object.entries(groups).map(([region, regionStates]) => (
              <optgroup key={region} label={region}>
                {regionStates.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </optgroup>
            ));
          })()}
        </select>

        {/* Month */}
        <select
          aria-label="Filter by month"
          value={filters.month}
          onChange={(e) => update({ month: Number(e.target.value) })}
          className="shrink-0 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value={0}>{tf("allMonths")}</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {tm(String(i + 1))}
            </option>
          ))}
        </select>

        {/* Difficulty */}
        <select
          aria-label="Filter by difficulty"
          value={filters.difficulty}
          onChange={(e) => update({ difficulty: e.target.value })}
          className="shrink-0 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">{tf("difficulty")}</option>
          <option value="easy">{tf("easy")}</option>
          <option value="moderate">{tf("moderate")}</option>
          <option value="hard">{tf("hard")}</option>
          <option value="extreme">{tf("extreme")}</option>
        </select>

        {/* Kids toggle */}
        <button
          onClick={() => update({ kidsOnly: !filters.kidsOnly })}
          className={`shrink-0 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
            filters.kidsOnly
              ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-400"
              : "border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          👶 {tf("kidsOnly")}
        </button>

        {/* Solo-female toggle */}
        <button
          onClick={() => update({ soloFemaleOnly: !filters.soloFemaleOnly })}
          aria-pressed={filters.soloFemaleOnly}
          title="Show only destinations with solo-female score 4 or 5"
          className={`shrink-0 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
            filters.soloFemaleOnly
              ? "border-rose-400/50 bg-rose-500/15 text-rose-200"
              : "border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          <span className="font-serif italic mr-1" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>♀</span>
          Solo-female friendly
        </button>

        {/* Eco-rated toggle — only renders when ≥1 destination carries an
            eco_tier value (high or mid). Hidden during early seeding so we
            never ship a chip that maps to zero results. */}
        {ecoCount > 0 && (
          <button
            onClick={() => update({ ecoOnly: !filters.ecoOnly })}
            aria-pressed={filters.ecoOnly}
            title="Community-managed and low-impact destinations (eco_tier high/mid)"
            className={`shrink-0 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
              filters.ecoOnly
                ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-200"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            🌱 Eco-rated ({ecoCount})
          </button>
        )}

        {/* Sort */}
        <select
          aria-label="Sort destinations"
          value={filters.sort}
          onChange={(e) => update({ sort: e.target.value })}
          className="shrink-0 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">{tf("sortBy")}</option>
          <option value="score-desc">{tf("scoreHighest")}</option>
          <option value="score-asc">{tf("scoreLowest")}</option>
          <option value="elevation-desc">{tf("elevationHighest")}</option>
          <option value="elevation-asc">{tf("elevationLowest")}</option>
          <option value="kids-desc">{tf("kidsRatingBest")}</option>
          <option value="name-asc">{tf("nameAZ")}</option>
        </select>

        {/* Clear */}
        {hasFilters && (
          <button
            onClick={() =>
              onChange({
                stateId: "",
                month: 0,
                kidsOnly: false,
                soloFemaleOnly: false,
                ecoOnly: false,
                difficulty: "",
                search: "",
                sort: "",
              })
            }
            className="shrink-0 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {tf("clear")} ✕
          </button>
        )}
      </div>

      {/* Result count */}
      <div className="text-[15px] text-muted-foreground">
        {resultCount} {tf("destinationsFound")}
        {filters.month > 0 && (
          <span>
            {" "}
            · {tf("showingScores")} {tm(String(filters.month))}
          </span>
        )}
      </div>
    </div>
  );
}
