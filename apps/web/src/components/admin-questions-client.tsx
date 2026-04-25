"use client";

import { useEffect, useState, useCallback } from "react";

type Question = {
  id: string;
  destination_id: string;
  slug: string;
  question: string;
  answer: string | null;
  category: string;
  traveler_type: string | null;
  submitter_name: string | null;
  submitter_email: string | null;
  editor_handle: string | null;
  status: "pending" | "answered" | "rejected";
  moderator_note: string | null;
  submitted_at: string;
  answered_at: string | null;
  destination: { name: string; state: { name: string } | { name: string }[] | null } | null;
};

const CATEGORY_LABEL: Record<string, string> = {
  safety: "Safety",
  cost: "Cost",
  permits: "Permits",
  family: "Family",
  transport: "Transport",
  timing: "Timing",
  practical: "Practical",
  weather: "Weather",
};

export function AdminQuestionsClient() {
  const [keyInput, setKeyInput] = useState("");
  const [adminKey, setAdminKey] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"pending" | "answered" | "rejected" | "all">("pending");
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? sessionStorage.getItem("adminKey") : null;
    if (stored) setAdminKey(stored);
  }, []);

  const fetchQuestions = useCallback(async () => {
    if (!adminKey) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/questions?status=${filter}`, {
        headers: { authorization: `Bearer ${adminKey}` },
      });
      if (res.status === 401) {
        setError("Wrong key.");
        sessionStorage.removeItem("adminKey");
        setAdminKey(null);
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Fetch failed");
        return;
      }
      setQuestions(data.questions ?? []);
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }, [adminKey, filter]);

  useEffect(() => {
    if (adminKey) void fetchQuestions();
  }, [adminKey, filter, fetchQuestions]);

  async function moderate(id: string, action: "approve" | "reject", answer?: string) {
    if (!adminKey) return;
    setBusyId(id);
    try {
      const res = await fetch("/api/admin/questions", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${adminKey}`,
        },
        body: JSON.stringify({ id, action, answer }),
      });
      const data = await res.json();
      if (res.ok) {
        setDrafts((d) => {
          const { [id]: _, ...rest } = d;
          return rest;
        });
        await fetchQuestions();
      } else {
        setError(`Moderation failed: ${data.error ?? res.status}`);
      }
    } finally {
      setBusyId(null);
    }
  }

  if (!adminKey) {
    return (
      <div className="mx-auto max-w-md px-4 py-20">
        <h1 className="text-2xl font-semibold mb-4">Questions — moderation</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (keyInput.trim()) {
              sessionStorage.setItem("adminKey", keyInput.trim());
              setAdminKey(keyInput.trim());
            }
          }}
          className="space-y-3"
        >
          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="Admin key"
            className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
            autoFocus
          />
          <button
            type="submit"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Unlock
          </button>
          {error && <p className="text-xs text-red-400">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-baseline justify-between gap-3 mb-6 flex-wrap">
        <h1 className="text-3xl font-semibold">Questions</h1>
        <div className="flex gap-2">
          {(["pending", "answered", "rejected", "all"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-full border px-3 py-1 text-xs font-medium ${filter === s ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
      {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

      {questions.length === 0 && !loading && (
        <p className="text-sm text-muted-foreground">No {filter === "all" ? "" : filter} questions.</p>
      )}

      <div className="space-y-4">
        {questions.map((q) => {
          const dest = q.destination;
          const stateName = Array.isArray(dest?.state) ? dest?.state[0]?.name : dest?.state?.name;
          const draft = drafts[q.id] ?? "";
          const draftLen = draft.trim().length;
          const canApprove = draftLen >= 100 && draftLen <= 3000;

          return (
            <article key={q.id} className="rounded-2xl border border-border bg-card/40 p-5">
              <div className="flex items-baseline justify-between gap-3 flex-wrap mb-3">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="rounded-full border border-border bg-background/40 px-2 py-0.5 font-mono text-[10px] tracking-[0.08em] uppercase">
                    {CATEGORY_LABEL[q.category] ?? q.category}
                  </span>
                  <h2 className="font-semibold">{dest?.name ?? q.destination_id}</h2>
                  <span className="text-xs text-muted-foreground">{stateName}</span>
                  {q.traveler_type && (
                    <span className="rounded-full border border-border bg-background/40 px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                      {q.traveler_type}
                    </span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {new Date(q.submitted_at).toLocaleDateString()}
                </span>
              </div>

              <p className="text-base font-medium mb-3 leading-snug">{q.question}</p>

              <div className="text-xs text-muted-foreground mb-3">
                — {q.submitter_name || "Anonymous"}
                {q.submitter_email && (
                  <>
                    {" · "}
                    <a href={`mailto:${q.submitter_email}`} className="underline">{q.submitter_email}</a>
                  </>
                )}
              </div>

              {q.status === "pending" && (
                <>
                  <textarea
                    value={draft}
                    onChange={(e) => setDrafts((d) => ({ ...d, [q.id]: e.target.value }))}
                    placeholder="Write the authoritative answer (100-3000 characters). This goes live on /destination/[id]/q/<slug> with FAQPage JSON-LD."
                    rows={6}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none mb-2"
                  />
                  <div className="flex items-center justify-between gap-3 mb-3 text-xs">
                    <span className={`tabular-nums ${draftLen > 3000 ? "text-rose-400" : draftLen >= 100 ? "text-emerald-400" : "text-muted-foreground"}`}>
                      {draftLen} / 100-3000 chars
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => moderate(q.id, "approve", draft.trim())}
                      disabled={!canApprove || busyId === q.id}
                      className="rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 px-4 py-1.5 text-xs font-medium hover:bg-emerald-500/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {busyId === q.id ? "Publishing…" : "Approve with answer"}
                    </button>
                    <button
                      onClick={() => moderate(q.id, "reject")}
                      disabled={busyId === q.id}
                      className="rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 px-4 py-1.5 text-xs font-medium hover:bg-rose-500/30 transition-colors disabled:opacity-40"
                    >
                      Reject
                    </button>
                  </div>
                </>
              )}

              {q.status !== "pending" && (
                <>
                  {q.answer && (
                    <div className="rounded-xl border border-border/60 bg-background/40 p-3 mb-3">
                      <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground mb-1">Answer</p>
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{q.answer}</p>
                      {q.editor_handle && (
                        <p className="text-xs text-muted-foreground mt-2">— {q.editor_handle}</p>
                      )}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className={`rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-[0.08em] uppercase ${q.status === "answered" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" : "border-rose-500/30 bg-rose-500/10 text-rose-300"}`}>
                      {q.status}
                    </span>
                    {q.status === "answered" && (
                      <a
                        href={`/en/destination/${q.destination_id}/q/${q.slug}`}
                        target="_blank"
                        rel="noopener"
                        className="underline hover:text-foreground"
                      >
                        view live
                      </a>
                    )}
                    {q.status === "rejected" && q.answer && (
                      <button
                        onClick={() => moderate(q.id, "approve", q.answer ?? "")}
                        disabled={busyId === q.id}
                        className="underline hover:text-foreground"
                      >
                        un-reject (republish)
                      </button>
                    )}
                  </div>
                </>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
