"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useSearchIndex } from "@/lib/search-index";

interface SearchCommandProps {
  open: boolean;
  onClose: () => void;
}

interface Destination {
  id: string;
  name: string;
  state: { name: string } | null;
  difficulty: string | null;
  tags: string[] | null;
}
interface SubDestination {
  id: string;
  name: string;
  parent_id: string;
  parent_name: string;
}
interface State {
  id: string;
  name: string;
}
interface Trek {
  id: string;
  name: string;
  difficulty: string | null;
}
interface Route {
  id: string;
  name: string;
}
interface Collection {
  id: string;
  name: string;
}
interface Festival {
  id: string;
  name: string;
  month: number | null;
  destination_id: string | null;
  destination_name: string;
}
interface Stay {
  id: string;
  name: string;
  type: string | null;
  destination_id: string;
  destination_name: string;
}
interface HiddenGem {
  id: string;
  name: string;
  near_destination_id: string | null;
  parent_name: string;
}
interface Article {
  slug: string;
  title: string;
  category: string | null;
}

type ResultItem =
  | { type: "destination"; data: Destination }
  | { type: "sub"; data: SubDestination }
  | { type: "state"; data: State }
  | { type: "trek"; data: Trek }
  | { type: "route"; data: Route }
  | { type: "collection"; data: Collection }
  | { type: "festival"; data: Festival }
  | { type: "stay"; data: Stay }
  | { type: "gem"; data: HiddenGem }
  | { type: "article"; data: Article };

const CATEGORY_ORDER = [
  "destination",
  "sub",
  "state",
  "trek",
  "route",
  "collection",
  "festival",
  "stay",
  "gem",
  "article",
] as const;
const CATEGORY_LABELS: Record<string, string> = {
  destination: "Destinations",
  sub: "Sub-destinations",
  state: "States",
  trek: "Treks",
  route: "Routes",
  collection: "Collections",
  festival: "Festivals",
  stay: "Stays",
  gem: "Hidden Gems",
  article: "Articles",
};
const CATEGORY_ICONS: Record<string, string> = {
  destination: "📍",
  sub: "📌",
  state: "🗺️",
  trek: "🥾",
  route: "🛣️",
  collection: "📦",
  festival: "🎉",
  stay: "🏡",
  gem: "💎",
  article: "📝",
};

const MONTH_SHORT = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function getSubtitle(item: ResultItem): string {
  switch (item.type) {
    case "destination":
      return item.data.state?.name ?? "";
    case "sub":
      return `in ${item.data.parent_name}`;
    case "state":
      return "State";
    case "trek":
      return item.data.difficulty ?? "";
    case "route":
      return "";
    case "collection":
      return "";
    case "festival": {
      const m = item.data.month ? MONTH_SHORT[item.data.month] : "";
      const dest = item.data.destination_name;
      return [m, dest].filter(Boolean).join(" · ");
    }
    case "stay":
      return [item.data.type, item.data.destination_name].filter(Boolean).join(" · ");
    case "gem":
      return item.data.parent_name ? `near ${item.data.parent_name}` : "";
    case "article":
      return item.data.category ?? "";
  }
}

function getHref(item: ResultItem, locale: string): string {
  switch (item.type) {
    case "destination":
      return `/${locale}/destination/${item.data.id}`;
    case "sub":
      return `/${locale}/destination/${item.data.parent_id}#sub-${item.data.id}`;
    case "state":
      return `/${locale}/state/${item.data.id}`;
    case "trek":
      return `/${locale}/treks/${item.data.id}`;
    case "route":
      return `/${locale}/routes/${item.data.id}`;
    case "collection":
      return `/${locale}/collections/${item.data.id}`;
    case "festival":
      return item.data.destination_id
        ? `/${locale}/destination/${item.data.destination_id}#festival-${item.data.id}`
        : `/${locale}/festivals`;
    case "stay":
      return `/${locale}/destination/${item.data.destination_id}#stay-${item.data.id}`;
    case "gem":
      return item.data.near_destination_id
        ? `/${locale}/destination/${item.data.near_destination_id}#gem-${item.data.id}`
        : `/${locale}`;
    case "article":
      return `/${locale}/blog/${item.data.slug}`;
  }
}

export function SearchCommand({ open, onClose }: SearchCommandProps) {
  const router = useRouter();
  const locale = useLocale();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  // Global search index — fetched once per session from /api/search-index
  // (server + CDN + browser cached). Loads the first time the palette opens.
  // Replaces 9 uncached Supabase queries per open + a per-keystroke article query.
  const { index } = useSearchIndex(open);
  const destinations: Destination[] | null = index?.destinations ?? null;
  const subs: SubDestination[] | null = index?.subs ?? null;
  const states: State[] | null = index?.states ?? null;
  const treks: Trek[] | null = index?.treks ?? null;
  const routes: Route[] | null = index?.routes ?? null;
  const collections: Collection[] | null = index?.collections ?? null;
  const festivals: Festival[] | null = index?.festivals ?? null;
  const stays: Stay[] | null = index?.stays ?? null;
  const gems: HiddenGem[] | null = index?.gems ?? null;

  // Auto-focus input
  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Filter local data
  const filterByName = useCallback(
    <T extends { name: string }>(items: T[] | null, q: string, max = 5): T[] => {
      if (!items || !q.trim()) return [];
      const lower = q.toLowerCase();
      const results: T[] = [];
      for (const item of items) {
        if (item.name.toLowerCase().includes(lower)) {
          results.push(item);
          if (results.length >= max) break;
        }
      }
      return results;
    },
    []
  );

  const filteredDestinations = filterByName(destinations, query);
  const filteredSubs = filterByName(subs, query);
  const filteredStates = filterByName(states, query);
  const filteredTreks = filterByName(treks, query);
  const filteredRoutes = filterByName(routes, query);
  const filteredCollections = filterByName(collections, query);
  const filteredFestivals = filterByName(festivals, query);
  const filteredStays = filterByName(stays, query);
  const filteredGems = filterByName(gems, query);
  // Articles match on `title` (not `name`), so filter them separately.
  const articles: Article[] = (() => {
    const list = index?.articles;
    if (!list || !query.trim()) return [];
    const lower = query.toLowerCase();
    const out: Article[] = [];
    for (const a of list) {
      if (a.title.toLowerCase().includes(lower)) {
        out.push(a);
        if (out.length >= 5) break;
      }
    }
    return out;
  })();

  // Build flat result list — order matches CATEGORY_ORDER
  const results: ResultItem[] = [];
  for (const d of filteredDestinations) results.push({ type: "destination", data: d });
  for (const s of filteredSubs) results.push({ type: "sub", data: s });
  for (const s of filteredStates) results.push({ type: "state", data: s });
  for (const t of filteredTreks) results.push({ type: "trek", data: t });
  for (const r of filteredRoutes) results.push({ type: "route", data: r });
  for (const c of filteredCollections) results.push({ type: "collection", data: c });
  for (const f of filteredFestivals) results.push({ type: "festival", data: f });
  for (const s of filteredStays) results.push({ type: "stay", data: s });
  for (const g of filteredGems) results.push({ type: "gem", data: g });
  for (const a of articles) results.push({ type: "article", data: a });

  // Group for display
  const grouped: Record<string, ResultItem[]> = {};
  for (const r of results) {
    if (!grouped[r.type]) grouped[r.type] = [];
    grouped[r.type].push(r);
  }

  const hasQuery = query.trim().length > 0;
  const hasResults = results.length > 0;

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
      if (e.key === "Enter" && results[activeIndex]) {
        e.preventDefault();
        navigate(results[activeIndex]);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const active = listRef.current.querySelector("[data-active='true']");
    active?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  function navigate(item: ResultItem) {
    router.push(getHref(item, locale));
    onClose();
  }

  if (!open) return null;

  let flatIndex = -1;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-xl rounded-2xl border border-border/60 bg-card shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-border/40 px-4 py-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0 text-muted-foreground"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            placeholder="Search destinations, treks, routes..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
          />
          <kbd className="hidden sm:inline-flex items-center rounded border border-border/50 bg-muted/50 px-1.5 py-0.5 text-xs text-muted-foreground">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[60vh] overflow-y-auto p-2">
          {!hasQuery && (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              Search {destinations?.length || 491} destinations, {subs?.length || 343} places, {states?.length || 36} states, {treks?.length || 60} treks, festivals, stays, and more...
            </p>
          )}

          {hasQuery && !hasResults && (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              No results for &lsquo;{query}&rsquo;
            </p>
          )}

          {hasQuery &&
            hasResults &&
            CATEGORY_ORDER.map((cat) => {
              const items = grouped[cat];
              if (!items || items.length === 0) return null;
              return (
                <div key={cat} className="mb-2">
                  <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    {CATEGORY_LABELS[cat]}
                  </div>
                  {items.map((item) => {
                    flatIndex++;
                    const idx = flatIndex;
                    const isActive = idx === activeIndex;
                    const subtitle = getSubtitle(item);
                    return (
                      <button
                        key={`${item.type}-${"id" in item.data ? item.data.id : (item.data as Article).slug}`}
                        data-active={isActive}
                        onClick={() => navigate(item)}
                        onMouseEnter={() => setActiveIndex(idx)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                          isActive
                            ? "bg-primary/10 text-foreground"
                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                        }`}
                      >
                        <span className="text-base">{CATEGORY_ICONS[item.type]}</span>
                        <span className="flex-1 truncate">
                          {"name" in item.data ? item.data.name : (item.data as Article).title}
                        </span>
                        {subtitle && (
                          <span className="shrink-0 text-xs text-muted-foreground/70">
                            {subtitle}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
