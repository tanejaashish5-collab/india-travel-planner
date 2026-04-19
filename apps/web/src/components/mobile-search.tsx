"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getBrowserSupabase } from "@/lib/supabase-browser";

const CATEGORIES = [
  { label: "Hill Stations", tag: "hill-station", icon: "🏔️" },
  { label: "Beaches", tag: "beach", icon: "🏖️" },
  { label: "Heritage", tag: "heritage", icon: "🏛️" },
  { label: "Wildlife", tag: "wildlife", icon: "🐅" },
  { label: "Spiritual", tag: "spiritual", icon: "🛕" },
  { label: "Offbeat", tag: "offbeat", icon: "🗺️" },
  { label: "Adventure", tag: "adventure", icon: "🧗" },
  { label: "Family", tag: "family", icon: "👨‍👩‍👧" },
  { label: "Trekking", tag: "trek", icon: "🥾" },
  { label: "Lakes", tag: "lake", icon: "💧" },
];

const getSupabase = getBrowserSupabase;

export function MobileSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const locale = useLocale();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [recents, setRecents] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      const saved = localStorage.getItem("nakshiq_recent_searches");
      if (saved) setRecents(JSON.parse(saved).slice(0, 5));
    } else {
      setQuery("");
      setResults([]);
    }
  }, [open]);

  const search = useCallback(async (q: string) => {
    if (q.length < 2) { setResults([]); return; }
    setLoading(true);
    const supabase = getSupabase();
    if (!supabase) { setLoading(false); return; }

    const [dests, collections, articles, states] = await Promise.all([
      supabase.from("destinations").select("id, name, state:states(name), difficulty").ilike("name", `%${q}%`).limit(6),
      supabase.from("collections").select("id, name").ilike("name", `%${q}%`).limit(3),
      supabase.from("articles").select("slug, title, category").ilike("title", `%${q}%`).limit(3),
      supabase.from("states").select("id, name").ilike("name", `%${q}%`).limit(3),
    ]);

    const grouped: any[] = [];
    if (states.data?.length) grouped.push({ type: "States", items: states.data.map((s: any) => ({ id: s.id, name: s.name, href: `/${locale}/state/${s.id}` })) });
    if (dests.data?.length) grouped.push({ type: "Destinations", items: dests.data.map((d: any) => ({ id: d.id, name: d.name, sub: (Array.isArray(d.state) ? d.state[0]?.name : d.state?.name) || "", href: `/${locale}/destination/${d.id}` })) });
    if (collections.data?.length) grouped.push({ type: "Collections", items: collections.data.map((c: any) => ({ id: c.id, name: c.name, href: `/${locale}/collections/${c.id}` })) });
    if (articles.data?.length) grouped.push({ type: "Articles", items: articles.data.map((a: any) => ({ id: a.slug, name: a.title, href: `/${locale}/blog/${a.slug}` })) });

    setResults(grouped);
    setLoading(false);
  }, [locale]);

  useEffect(() => {
    const timer = setTimeout(() => search(query), 250);
    return () => clearTimeout(timer);
  }, [query, search]);

  function navigate(href: string, searchTerm?: string) {
    if (searchTerm) {
      const updated = [searchTerm, ...recents.filter((r) => r !== searchTerm)].slice(0, 5);
      localStorage.setItem("nakshiq_recent_searches", JSON.stringify(updated));
    }
    onClose();
    router.push(href);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[200] bg-background md:hidden"
        >
          {/* Search header */}
          <div className="flex items-center gap-3 px-4 pt-[env(safe-area-inset-top)] pb-3 border-b border-border/50">
            <button onClick={onClose} className="p-1 -ml-1 text-muted-foreground">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search destinations, states, collections..."
                className="w-full bg-muted/50 rounded-full px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/20"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto h-[calc(100dvh-60px)] px-4 py-4">
            {!query ? (
              <>
                {/* Recent searches */}
                {recents.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Recent</h3>
                    <div className="flex flex-col gap-1">
                      {recents.map((r, i) => (
                        <button key={i} onClick={() => setQuery(r)} className="flex items-center gap-3 py-2.5 text-sm text-foreground text-left">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground shrink-0"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Category chips */}
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Browse by category</h3>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.tag}
                      onClick={() => navigate(`/${locale}/explore/tag/${cat.tag}`, cat.label)}
                      className="flex items-center gap-1.5 rounded-full bg-muted/50 border border-border/50 px-3.5 py-2 text-sm font-medium transition-colors active:scale-95 active:bg-muted"
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>

                {/* Quick links */}
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 mt-6">Quick access</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Where to Go", href: `/${locale}/where-to-go`, icon: "📅" },
                    { label: "All States", href: `/${locale}/states`, icon: "🗺️" },
                    { label: "Ask NakshIQ", href: `/${locale}/ask`, icon: "💬" },
                    { label: "Blog", href: `/${locale}/blog`, icon: "📝" },
                  ].map((link) => (
                    <button
                      key={link.href}
                      onClick={() => navigate(link.href)}
                      className="flex items-center gap-2 rounded-xl bg-muted/30 border border-border/30 p-3 text-sm font-medium text-left active:scale-[0.98]"
                    >
                      <span className="text-lg">{link.icon}</span>
                      <span>{link.label}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                {loading && (
                  <div className="flex items-center gap-2 py-4 text-sm text-muted-foreground">
                    <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30 border-t-primary animate-spin" />
                    Searching...
                  </div>
                )}

                {!loading && results.length === 0 && query.length >= 2 && (
                  <p className="py-8 text-center text-sm text-muted-foreground">No results for &ldquo;{query}&rdquo;</p>
                )}

                {results.map((group) => (
                  <div key={group.type} className="mb-5">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{group.type}</h3>
                    <div className="flex flex-col">
                      {group.items.map((item: any) => (
                        <button
                          key={item.id}
                          onClick={() => navigate(item.href, query)}
                          className="flex items-center gap-3 py-3 border-b border-border/20 last:border-0 text-left active:bg-muted/50 -mx-2 px-2 rounded-lg"
                        >
                          <div>
                            <p className="text-sm font-medium">{item.name}</p>
                            {item.sub && <p className="text-xs text-muted-foreground">{item.sub}</p>}
                          </div>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-auto text-muted-foreground/50 shrink-0"><path d="m9 18 6-6-6-6"/></svg>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
