"use client";

import { useEffect, useMemo, useState } from "react";

type Prompt = {
  id: string;
  category: string;
  query: string;
  target_url: string;
};

type CellState = { key: string; cited: boolean; ran_at: string };

const ENGINE_URL: Record<string, (q: string) => string> = {
  perplexity: (q) => `https://www.perplexity.ai/search?q=${encodeURIComponent(q)}`,
  chatgpt: (q) => `https://chatgpt.com/?hints=search&prompt=${encodeURIComponent(q)}`,
  aio: (q) => `https://www.google.com/search?udm=50&q=${encodeURIComponent(q)}`,
  gemini: (q) => `https://gemini.google.com/app?q=${encodeURIComponent(q)}`,
  claude: (q) => `https://claude.ai/new?q=${encodeURIComponent(q)}`,
  copilot: (q) => `https://www.bing.com/search?q=${encodeURIComponent(q)}`,
};

export function CitationsLogger({
  prompts,
  engines,
  latestByCell,
}: {
  prompts: Prompt[];
  engines: string[];
  latestByCell: CellState[];
}) {
  const [adminKey, setAdminKey] = useState<string | null>(null);
  const [keyInput, setKeyInput] = useState("");
  const [overrides, setOverrides] = useState<Record<string, boolean>>({});
  const [busyCell, setBusyCell] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? sessionStorage.getItem("adminKey") : null;
    if (stored) setAdminKey(stored);
  }, []);

  const baseMap = useMemo(() => {
    const m = new Map<string, CellState>();
    for (const c of latestByCell) m.set(c.key, c);
    return m;
  }, [latestByCell]);

  const categories = useMemo(() => {
    return Array.from(new Set(prompts.map((p) => p.category)));
  }, [prompts]);

  const visiblePrompts = useMemo(() => {
    return filterCategory === "all"
      ? prompts
      : prompts.filter((p) => p.category === filterCategory);
  }, [prompts, filterCategory]);

  function openAll(prompt: Prompt) {
    for (const e of engines) {
      const url = ENGINE_URL[e]?.(prompt.query);
      if (url) window.open(url, "_blank", "noopener,noreferrer");
    }
  }

  async function logCell(promptId: string, engine: string, cited: boolean) {
    if (!adminKey) {
      setError("Unlock with admin key first.");
      return;
    }
    const cellKey = `${promptId}::${engine}`;
    setBusyCell(cellKey);
    setError(null);
    try {
      const res = await fetch("/api/admin/citations/log", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${adminKey}`,
        },
        body: JSON.stringify({ query_id: promptId, engine, cited }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? `Log failed: ${res.status}`);
        return;
      }
      setOverrides((prev) => ({ ...prev, [cellKey]: cited }));
    } catch {
      setError("Network error.");
    } finally {
      setBusyCell(null);
    }
  }

  function cellState(promptId: string, engine: string): "cited" | "not_cited" | "unknown" {
    const k = `${promptId}::${engine}`;
    if (overrides[k] !== undefined) return overrides[k] ? "cited" : "not_cited";
    const base = baseMap.get(k);
    if (!base) return "unknown";
    return base.cited ? "cited" : "not_cited";
  }

  return (
    <section className="mb-12">
      <div className="flex items-baseline justify-between flex-wrap gap-3 mb-4">
        <h2 className="text-lg font-semibold">Pivot · prompt × engine (latest result)</h2>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilterCategory("all")}
            className={`rounded-full border px-3 py-1 text-xs font-medium ${filterCategory === "all" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}
          >
            all ({prompts.length})
          </button>
          {categories.map((c) => {
            const count = prompts.filter((p) => p.category === c).length;
            return (
              <button
                key={c}
                onClick={() => setFilterCategory(c)}
                className={`rounded-full border px-3 py-1 text-xs font-medium ${filterCategory === c ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}
              >
                {c} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Admin key gate (collapsed when set) */}
      {!adminKey ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (keyInput.trim()) {
              sessionStorage.setItem("adminKey", keyInput.trim());
              setAdminKey(keyInput.trim());
            }
          }}
          className="mb-4 flex gap-2 max-w-sm"
        >
          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="Admin key (to enable logging)"
            className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button
            type="submit"
            className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Unlock
          </button>
        </form>
      ) : (
        <p className="mb-4 text-xs text-muted-foreground">
          Logging enabled.{" "}
          <button
            onClick={() => {
              sessionStorage.removeItem("adminKey");
              setAdminKey(null);
            }}
            className="underline hover:text-foreground"
          >
            lock
          </button>
        </p>
      )}

      {error && <p className="mb-3 text-sm text-red-400">{error}</p>}

      {prompts.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No prompts loaded. Verify <code className="font-mono">data/citation-prompts.json</code> is reachable.
        </p>
      ) : (
        <div className="rounded-2xl border border-border/60 overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-muted/30 text-[10px] uppercase tracking-[0.12em] text-muted-foreground/70">
              <tr>
                <th className="text-left px-3 py-2 sticky left-0 bg-muted/30 z-10">Prompt</th>
                {engines.map((e) => (
                  <th key={e} className="text-center px-3 py-2">{e}</th>
                ))}
                <th className="text-center px-3 py-2">Open all</th>
              </tr>
            </thead>
            <tbody>
              {visiblePrompts.map((p) => (
                <tr key={p.id} className="border-t border-border/30 align-top">
                  <td className="px-3 py-2 sticky left-0 bg-background z-10">
                    <div className="font-mono text-[10px] text-muted-foreground">{p.id}</div>
                    <div className="font-medium leading-snug max-w-[240px]">{p.query}</div>
                    <a
                      href={p.target_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono text-primary/70 hover:underline"
                    >
                      → {p.target_url}
                    </a>
                  </td>
                  {engines.map((e) => {
                    const state = cellState(p.id, e);
                    const cellKey = `${p.id}::${e}`;
                    const busy = busyCell === cellKey;
                    return (
                      <td key={e} className="px-2 py-2 text-center">
                        <div className="flex flex-col gap-1 items-center">
                          <span
                            className={`text-[10px] uppercase tracking-[0.1em] ${
                              state === "cited"
                                ? "text-emerald-400"
                                : state === "not_cited"
                                  ? "text-rose-400"
                                  : "text-muted-foreground/40"
                            }`}
                          >
                            {state === "cited" ? "✓" : state === "not_cited" ? "✗" : "—"}
                          </span>
                          {adminKey && (
                            <div className="flex gap-1">
                              <button
                                onClick={() => logCell(p.id, e, true)}
                                disabled={busy}
                                className="rounded border border-emerald-500/30 bg-emerald-500/5 px-1.5 py-0.5 text-[10px] text-emerald-400 hover:bg-emerald-500/15 disabled:opacity-40"
                                title="Mark cited"
                              >
                                ✓
                              </button>
                              <button
                                onClick={() => logCell(p.id, e, false)}
                                disabled={busy}
                                className="rounded border border-rose-500/30 bg-rose-500/5 px-1.5 py-0.5 text-[10px] text-rose-400 hover:bg-rose-500/15 disabled:opacity-40"
                                title="Mark not cited"
                              >
                                ✗
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                  <td className="px-2 py-2 text-center">
                    <button
                      onClick={() => openAll(p)}
                      className="rounded-full border border-border bg-background/40 px-2 py-1 text-[10px] uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                    >
                      Open all 6
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
