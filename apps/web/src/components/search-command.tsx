"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { getBrowserSupabase } from "@/lib/supabase-browser";

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

const getSupabase = getBrowserSupabase;

export function SearchCommand({ open, onClose }: SearchCommandProps) {
  const router = useRouter();
  const locale = useLocale();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  // Cached index data
  const [destinations, setDestinations] = useState<Destination[] | null>(null);
  const [subs, setSubs] = useState<SubDestination[] | null>(null);
  const [states, setStates] = useState<State[] | null>(null);
  const [treks, setTreks] = useState<Trek[] | null>(null);
  const [routes, setRoutes] = useState<Route[] | null>(null);
  const [collections, setCollections] = useState<Collection[] | null>(null);
  const [festivals, setFestivals] = useState<Festival[] | null>(null);
  const [stays, setStays] = useState<Stay[] | null>(null);
  const [gems, setGems] = useState<HiddenGem[] | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Fetch index data on first open — 9 parallel queries, cached in session
  useEffect(() => {
    if (!open || loaded) return;
    const sb = getSupabase();
    if (!sb) return;

    Promise.all([
      sb.from("destinations").select("id, name, state:states(name), difficulty, tags"),
      sb.from("sub_destinations").select("id, name, parent_id, parent:destinations!sub_destinations_parent_id_fkey(name)"),
      sb.from("states").select("id, name"),
      sb.from("treks").select("id, name, difficulty"),
      sb.from("routes").select("id, name"),
      sb.from("collections").select("id, name"),
      sb.from("festivals").select("id, name, month, destination_id, destination:destinations(name)"),
      sb.from("local_stays").select("id, name, type, destination_id, destination:destinations(name)"),
      sb.from("hidden_gems").select("id, name, near_destination_id, near:destinations!hidden_gems_near_destination_id_fkey(name)"),
    ]).then(([dRes, subRes, stRes, tRes, rRes, cRes, fRes, slRes, gRes]) => {
      setDestinations((dRes.data as unknown as Destination[]) ?? []);
      const subRows = ((subRes.data as unknown as Array<{ id: string; name: string; parent_id: string; parent: { name: string } | { name: string }[] | null }>) ?? []).map((s) => ({
        id: s.id,
        name: s.name,
        parent_id: s.parent_id,
        parent_name: Array.isArray(s.parent) ? s.parent[0]?.name ?? "" : s.parent?.name ?? "",
      }));
      setSubs(subRows);
      setStates((stRes.data as State[]) ?? []);
      setTreks((tRes.data as Trek[]) ?? []);
      setRoutes((rRes.data as Route[]) ?? []);
      setCollections((cRes.data as Collection[]) ?? []);
      const festRows = ((fRes.data as unknown as Array<{ id: string; name: string; month: number | null; destination_id: string | null; destination: { name: string } | { name: string }[] | null }>) ?? []).map((f) => ({
        id: f.id,
        name: f.name,
        month: f.month,
        destination_id: f.destination_id,
        destination_name: Array.isArray(f.destination) ? f.destination[0]?.name ?? "" : f.destination?.name ?? "",
      }));
      setFestivals(festRows);
      const stayRows = ((slRes.data as unknown as Array<{ id: string; name: string; type: string | null; destination_id: string; destination: { name: string } | { name: string }[] | null }>) ?? []).map((s) => ({
        id: s.id,
        name: s.name,
        type: s.type,
        destination_id: s.destination_id,
        destination_name: Array.isArray(s.destination) ? s.destination[0]?.name ?? "" : s.destination?.name ?? "",
      }));
      setStays(stayRows);
      const gemRows = ((gRes.data as unknown as Array<{ id: string; name: string; near_destination_id: string | null; near: { name: string } | { name: string }[] | null }>) ?? []).map((g) => ({
        id: g.id,
        name: g.name,
        near_destination_id: g.near_destination_id,
        parent_name: Array.isArray(g.near) ? g.near[0]?.name ?? "" : g.near?.name ?? "",
      }));
      setGems(gemRows);
      setLoaded(true);
    });
  }, [open, loaded]);

  // Auto-focus input
  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Debounced article search
  useEffect(() => {
    if (!query.trim()) {
      setArticles([]);
      return;
    }
    const timer = setTimeout(() => {
      const sb = getSupabase();
      if (!sb) return;
      sb.from("articles")
        .select("slug, title, category")
        .ilike("title", `%${query}%`)
        .limit(5)
        .then(({ data }) => {
          setArticles((data as Article[]) ?? []);
        });
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

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
              Search {destinations?.length || 488} destinations, {subs?.length || 343} places, {states?.length || 36} states, {treks?.length || 60} treks, festivals, stays, and more...
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
