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
interface Article {
  slug: string;
  title: string;
  category: string | null;
}

type ResultItem =
  | { type: "destination"; data: Destination }
  | { type: "trek"; data: Trek }
  | { type: "route"; data: Route }
  | { type: "collection"; data: Collection }
  | { type: "article"; data: Article };

const CATEGORY_ORDER = ["destination", "trek", "route", "collection", "article"] as const;
const CATEGORY_LABELS: Record<string, string> = {
  destination: "Destinations",
  trek: "Treks",
  route: "Routes",
  collection: "Collections",
  article: "Articles",
};
const CATEGORY_ICONS: Record<string, string> = {
  destination: "📍",
  trek: "🥾",
  route: "🛣️",
  collection: "📦",
  article: "📝",
};

function getSubtitle(item: ResultItem): string {
  switch (item.type) {
    case "destination":
      return item.data.state?.name ?? "";
    case "trek":
      return item.data.difficulty ?? "";
    case "route":
      return "";
    case "collection":
      return "";
    case "article":
      return item.data.category ?? "";
  }
}

function getHref(item: ResultItem, locale: string): string {
  switch (item.type) {
    case "destination":
      return `/${locale}/destination/${item.data.id}`;
    case "trek":
      return `/${locale}/treks/${item.data.id}`;
    case "route":
      return `/${locale}/routes/${item.data.id}`;
    case "collection":
      return `/${locale}/collections/${item.data.id}`;
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
  const [treks, setTreks] = useState<Trek[] | null>(null);
  const [routes, setRoutes] = useState<Route[] | null>(null);
  const [collections, setCollections] = useState<Collection[] | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Fetch index data on first open
  useEffect(() => {
    if (!open || loaded) return;
    const sb = getSupabase();
    if (!sb) return;

    Promise.all([
      sb.from("destinations").select("id, name, state:states(name), difficulty, tags"),
      sb.from("treks").select("id, name, difficulty"),
      sb.from("routes").select("id, name"),
      sb.from("collections").select("id, name"),
    ]).then(([dRes, tRes, rRes, cRes]) => {
      setDestinations((dRes.data as unknown as Destination[]) ?? []);
      setTreks((tRes.data as Trek[]) ?? []);
      setRoutes((rRes.data as Route[]) ?? []);
      setCollections((cRes.data as Collection[]) ?? []);
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
  const filteredTreks = filterByName(treks, query);
  const filteredRoutes = filterByName(routes, query);
  const filteredCollections = filterByName(collections, query);

  // Build flat result list
  const results: ResultItem[] = [];
  for (const d of filteredDestinations) results.push({ type: "destination", data: d });
  for (const t of filteredTreks) results.push({ type: "trek", data: t });
  for (const r of filteredRoutes) results.push({ type: "route", data: r });
  for (const c of filteredCollections) results.push({ type: "collection", data: c });
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
              Start typing to search {destinations?.length || 297} destinations, {treks?.length || 60} treks, and more...
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
                  <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
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
