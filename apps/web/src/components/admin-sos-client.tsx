"use client";

import { useEffect, useMemo, useState } from "react";

interface SosRow {
  destination_id: string;
  destination_name: string;
  state_id: string | null;
  verified: boolean | null;
  verified_date: string | null;
  last_verified_attempt_at: string | null;
  source_url: string | null;
  source_label: string | null;
  local_police_station: string | null;
  police_address: string | null;
  nearest_hospital: string | null;
  nearest_hospital_km: number | null;
  hospital_has_er: boolean | null;
  nearest_pharmacy: string | null;
  pharmacy_24hr: boolean | null;
  mechanic_contact: string | null;
  tow_service: string | null;
  rescue_contact: string | null;
  mountain_rescue: string | null;
  nearest_guesthouse_emergency: string | null;
  english_speaking_doctor: string | null;
}

const EDITABLE = [
  "local_police_station",
  "police_address",
  "nearest_hospital",
  "nearest_hospital_km",
  "hospital_has_er",
  "nearest_pharmacy",
  "pharmacy_24hr",
  "mechanic_contact",
  "tow_service",
  "rescue_contact",
  "mountain_rescue",
  "nearest_guesthouse_emergency",
  "english_speaking_doctor",
  "source_url",
  "source_label",
] as const;

export function AdminSosClient() {
  const [key, setKey] = useState("");
  const [keyInput, setKeyInput] = useState("");
  const [rows, setRows] = useState<SosRow[]>([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState<"stale" | "all">("stale");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, Record<string, any>>>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [expandedStates, setExpandedStates] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = typeof window !== "undefined" ? sessionStorage.getItem("adminKey") : null;
    if (stored) setKey(stored);
  }, []);

  useEffect(() => {
    if (!key) return;
    void load();
  }, [key, status]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/sos?key=${encodeURIComponent(key)}&status=${status}`);
      if (res.status === 401) {
        setError("Wrong admin key.");
        setKey("");
        sessionStorage.removeItem("adminKey");
        return;
      }
      const data = await res.json();
      setRows(data.rows ?? []);
      setTotal(data.total ?? 0);
    } catch (err: any) {
      setError(err?.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  function setDraft(destId: string, field: string, value: any) {
    setDrafts((d) => ({ ...d, [destId]: { ...(d[destId] ?? {}), [field]: value } }));
  }

  function getValue(row: SosRow, field: string): any {
    const draft = drafts[row.destination_id];
    if (draft && field in draft) return draft[field];
    return (row as any)[field] ?? "";
  }

  async function act(row: SosRow, action: "edit" | "verify") {
    const patch = drafts[row.destination_id] ?? {};
    if (action === "verify" && !(patch.source_url ?? row.source_url)) {
      alert("source_url required before verifying.");
      return;
    }
    setSavingId(row.destination_id);
    try {
      const res = await fetch("/api/admin/sos", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify({ destinationId: row.destination_id, action, patch }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err?.error || `${action} failed`);
        return;
      }
      setDrafts((d) => {
        const next = { ...d };
        delete next[row.destination_id];
        return next;
      });
      void load();
    } finally {
      setSavingId(null);
    }
  }

  const grouped = useMemo(() => {
    const m = new Map<string, SosRow[]>();
    for (const r of rows) {
      const s = r.state_id || "unknown";
      if (!m.has(s)) m.set(s, []);
      m.get(s)!.push(r);
    }
    return [...m.entries()].sort((a, b) => b[1].length - a[1].length);
  }, [rows]);

  function toggleState(s: string) {
    setExpandedStates((prev) => {
      const next = new Set(prev);
      next.has(s) ? next.delete(s) : next.add(s);
      return next;
    });
  }

  if (!key) {
    return (
      <div className="mx-auto max-w-md p-6">
        <h1 className="text-xl font-semibold mb-4">SOS verification admin</h1>
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
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2"
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">SOS verification</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {loading ? "Loading…" : `${rows.length} of ${total} rows · status: ${status}`}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setStatus("stale")}
            className={`px-3 py-1.5 rounded-lg text-sm ${status === "stale" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
          >
            Stale only
          </button>
          <button
            onClick={() => setStatus("all")}
            className={`px-3 py-1.5 rounded-lg text-sm ${status === "all" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
          >
            All
          </button>
          <button onClick={() => load()} className="px-3 py-1.5 rounded-lg text-sm bg-muted">
            Refresh
          </button>
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-destructive">{error}</p>}

      <div className="space-y-3">
        {grouped.map(([stateId, stateRows]) => {
          const isOpen = expandedStates.has(stateId);
          return (
            <div key={stateId} className="rounded-lg border border-border">
              <button
                onClick={() => toggleState(stateId)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50"
              >
                <span className="font-medium uppercase tracking-wide text-sm">
                  {stateId} <span className="text-muted-foreground ml-2">({stateRows.length})</span>
                </span>
                <span className="text-muted-foreground">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <div className="divide-y divide-border">
                  {stateRows.map((row) => {
                    const editing = openId === row.destination_id;
                    const dirty = !!drafts[row.destination_id];
                    const canVerify = !!(drafts[row.destination_id]?.source_url ?? row.source_url);
                    return (
                      <div key={row.destination_id} className="px-4 py-3">
                        <button
                          onClick={() => setOpenId(editing ? null : row.destination_id)}
                          className="w-full flex items-center justify-between text-left"
                        >
                          <div>
                            <div className="font-medium">{row.destination_name}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {row.verified ? `verified ${row.verified_date}` : "not verified"}
                              {row.source_url ? " · has source" : " · no source"}
                              {dirty && " · unsaved"}
                            </div>
                          </div>
                          <span className="text-muted-foreground">{editing ? "−" : "Edit"}</span>
                        </button>

                        {editing && (
                          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {EDITABLE.map((field) => {
                              const isBool = field === "hospital_has_er" || field === "pharmacy_24hr";
                              const isNum = field === "nearest_hospital_km";
                              if (isBool) {
                                return (
                                  <label key={field} className="flex items-center gap-2 text-sm">
                                    <input
                                      type="checkbox"
                                      checked={!!getValue(row, field)}
                                      onChange={(e) => setDraft(row.destination_id, field, e.target.checked)}
                                    />
                                    <span>{field}</span>
                                  </label>
                                );
                              }
                              return (
                                <label key={field} className="text-sm flex flex-col gap-1">
                                  <span className="text-muted-foreground text-xs">{field}</span>
                                  <input
                                    type={isNum ? "number" : field === "source_url" ? "url" : "text"}
                                    value={getValue(row, field) ?? ""}
                                    onChange={(e) =>
                                      setDraft(
                                        row.destination_id,
                                        field,
                                        isNum ? (e.target.value ? Number(e.target.value) : null) : e.target.value
                                      )
                                    }
                                    className="rounded border border-border bg-background px-2 py-1.5"
                                    placeholder={field === "source_url" ? "https://*.gov.in/..." : ""}
                                  />
                                </label>
                              );
                            })}

                            <div className="sm:col-span-2 flex items-center gap-2 mt-2">
                              <button
                                disabled={!dirty || savingId === row.destination_id}
                                onClick={() => act(row, "edit")}
                                className="px-3 py-1.5 rounded-lg text-sm bg-muted hover:bg-muted/80 disabled:opacity-50"
                              >
                                Save changes
                              </button>
                              <button
                                disabled={!canVerify || savingId === row.destination_id}
                                onClick={() => act(row, "verify")}
                                className="px-3 py-1.5 rounded-lg text-sm bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                                title={canVerify ? "" : "source_url required first"}
                              >
                                Mark verified today
                              </button>
                              {savingId === row.destination_id && (
                                <span className="text-xs text-muted-foreground">Saving…</span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
