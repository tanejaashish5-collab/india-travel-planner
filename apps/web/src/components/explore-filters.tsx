"use client";

import { useTranslations, useLocale } from "next-intl";

export interface FilterState {
  stateId: string;
  month: number;
  kidsOnly: boolean;
  difficulty: string;
  search: string;
  sort: string;
}

interface ExploreFiltersProps {
  states: Array<{ id: string; name: string }>;
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  resultCount: number;
}

export function ExploreFilters({
  states,
  filters,
  onChange,
  resultCount,
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
        {/* State */}
        <select
          value={filters.stateId}
          onChange={(e) => update({ stateId: e.target.value })}
          className="shrink-0 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">{tf("allStates")}</option>
          {states.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        {/* Month */}
        <select
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

        {/* Sort */}
        <select
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
