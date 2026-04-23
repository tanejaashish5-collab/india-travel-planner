"use client";

import { useEffect, useState } from "react";

interface StaySource { url: string; title: string; source_type?: string }
interface StayIntelligence { upgrade_reasoning?: string | null; destination_note?: string | null; as_of_date?: string | null }

interface PickRow {
  destination_id: string;
  slot: "experience" | "value" | "location" | "xfactor";
  name: string;
  property_type: string | null;
  price_band: string | null;
  why_nakshiq: string;
  signature_experience?: string | null;
  sources?: StaySource[];
  contact_only?: boolean;
  contact_info?: string | null;
  voice_flags?: string[];
  source: string;
  confidence: number;
  refreshed_at: string;
  published: boolean;
  destination?: { name: string; state?: any; stay_intelligence?: StayIntelligence };
}

export function AdminStayPicksClient() {
  const [key, setKey] = useState("");
  const [keyInput, setKeyInput] = useState("");
  const [rows, setRows] = useState<PickRow[]>([]);
  const [status, setStatus] = useState<"unpublished" | "published" | "all">("unpublished");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? sessionStorage.getItem("adminKey") : null;
    if (stored) setKey(stored);
  }, []);

  useEffect(() => {
    if (!key) return;
    load();
  }, [key, status]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/stay-picks?key=${encodeURIComponent(key)}&status=${status}`);
      if (res.status === 401) {
        setError("Wrong admin key.");
        setKey("");
        sessionStorage.removeItem("adminKey");
        return;
      }
      const data = await res.json();
      setRows(data.picks ?? []);
    } catch (err: any) {
      setError(err?.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  async function act(row: PickRow, action: "publish" | "reject" | "edit", patch?: Record<string, any>) {
    const res = await fetch("/api/admin/stay-picks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        destinationId: row.destination_id,
        slot: row.slot,
        action,
        patch,
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert(err?.error || `${action} failed`);
      return;
    }
    load();
  }

  if (!key) {
    return (
      <div className="mx-auto max-w-md p-6">
        <h1 className="text-xl font-semibold text-foreground mb-4">Stay picks admin</h1>
        <p className="text-sm text-muted-foreground mb-4">
          Enter the admin key (same value as <code>NEWSLETTER_SEND_SECRET</code>).
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (keyInput) {
              setKey(keyInput);
              sessionStorage.setItem("adminKey", keyInput);
            }
          }}
          className="flex gap-2"
        >
          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="admin key"
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-foreground"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Unlock
          </button>
        </form>
        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-foreground">Stay picks — {status}</h1>
        <div className="flex gap-2">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
          >
            <option value="unpublished">Unpublished</option>
            <option value="published">Published</option>
            <option value="all">All</option>
          </select>
          <button
            onClick={load}
            className="px-3 py-2 rounded-lg border border-border hover:bg-muted text-sm text-foreground"
          >
            {loading ? "…" : "Reload"}
          </button>
        </div>
      </div>

      {error && <p className="mb-3 text-sm text-destructive">{error}</p>}
      {rows.length === 0 && !loading && <p className="text-sm text-muted-foreground">No rows.</p>}

      <div className="space-y-3">
        {rows.map((r) => {
          const stateName = Array.isArray(r.destination?.state)
            ? r.destination?.state[0]?.name
            : r.destination?.state?.name;
          const intel = r.destination?.stay_intelligence;
          const voiceFlags = r.voice_flags ?? [];
          const sources = r.sources ?? [];
          const voiceIssue = voiceFlags.length > 0;
          const sourcesIssue = sources.length < 2;

          return (
            <div key={`${r.destination_id}-${r.slot}`} className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <div className="text-xs uppercase text-muted-foreground flex items-center gap-2 flex-wrap">
                    <span>{r.destination_id} · {r.slot} · confidence {r.confidence.toFixed(2)}</span>
                    {voiceIssue && (
                      <span className="text-destructive normal-case font-medium">⚠ voice: {voiceFlags.join(", ")}</span>
                    )}
                    {sourcesIssue && (
                      <span className="text-amber-400 normal-case font-medium">⚠ &lt;2 sources</span>
                    )}
                    {r.contact_only && (
                      <span className="text-sky-400 normal-case font-medium">contact-only</span>
                    )}
                  </div>
                  <div className="font-semibold text-foreground">
                    {r.destination?.name} {stateName ? `· ${stateName}` : ""}
                  </div>
                </div>
                <div className="flex gap-2">
                  {!r.published && (
                    <button
                      onClick={() => act(r, "publish")}
                      className="px-3 py-1.5 rounded-md bg-emerald-600 text-white text-xs"
                    >
                      Publish
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (confirm("Reject and delete this pick?")) act(r, "reject");
                    }}
                    className="px-3 py-1.5 rounded-md border border-destructive/50 text-destructive text-xs"
                  >
                    Reject
                  </button>
                </div>
              </div>
              <div className="mt-2 text-sm text-foreground">
                <span className="font-medium">{r.name}</span>
                {r.property_type && <span className="text-muted-foreground"> · {r.property_type}</span>}
                {r.price_band && <span className="text-muted-foreground"> · {r.price_band}</span>}
              </div>
              <p className="text-sm text-foreground/80 mt-1">{r.why_nakshiq}</p>

              {r.signature_experience && (
                <p className="mt-2 text-xs text-muted-foreground italic border-l-2 border-border pl-2">
                  {r.signature_experience}
                </p>
              )}

              {r.contact_only && r.contact_info && (
                <p className="mt-2 text-xs text-sky-300">Contact: <span className="font-mono">{r.contact_info}</span></p>
              )}

              {sources.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground mr-1 self-center">Sources</span>
                  {sources.map((s, i) => {
                    let host = "";
                    try { host = new URL(s.url).hostname.replace(/^www\./, ""); } catch { host = `src-${i + 1}`; }
                    return (
                      <a
                        key={`${s.url}-${i}`}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground hover:text-foreground"
                        title={s.title}
                      >
                        {host}
                      </a>
                    );
                  })}
                </div>
              )}

              {intel?.upgrade_reasoning && (
                <div className="mt-3 rounded border border-primary/30 bg-primary/5 p-2">
                  <div className="text-[10px] uppercase tracking-wider text-primary mb-1">Upgrade Question</div>
                  <p className="text-xs text-foreground">{intel.upgrade_reasoning}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
