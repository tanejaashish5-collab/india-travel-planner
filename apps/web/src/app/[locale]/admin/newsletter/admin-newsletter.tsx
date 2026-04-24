"use client";

import { useState } from "react";

type Step = "auth" | "preview" | "sending" | "done";

// Special-edition override fields. Empty strings are dropped before POST so
// the cron + regular weekly sends stay on auto-compose. Filled fields get
// applied in buildWindowIssue().
type OverrideState = {
  issueNumber: string;
  subject: string;
  previewText: string;
  opening: string;
  closing: string;
};

const EMPTY_OVERRIDES: OverrideState = {
  issueNumber: "",
  subject: "",
  previewText: "",
  opening: "",
  closing: "",
};

function buildOverridesPayload(ov: OverrideState): Record<string, string | number> | undefined {
  const out: Record<string, string | number> = {};
  if (ov.issueNumber.trim()) {
    const n = Number(ov.issueNumber.trim());
    if (Number.isFinite(n) && n > 0) out.issueNumber = n;
  }
  if (ov.subject.trim()) out.subject = ov.subject.trim();
  if (ov.previewText.trim()) out.previewText = ov.previewText.trim();
  if (ov.opening.trim()) out.opening = ov.opening;
  if (ov.closing.trim()) out.closing = ov.closing;
  return Object.keys(out).length ? out : undefined;
}

export function AdminNewsletter() {
  const [step, setStep] = useState<Step>("auth");
  const [secret, setSecret] = useState("");
  const [testEmail, setTestEmail] = useState("");
  const [preview, setPreview] = useState<any>(null);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [overrides, setOverrides] = useState<OverrideState>(EMPTY_OVERRIDES);

  async function loadPreview() {
    setError("");
    setLoading(true);
    try {
      const body = buildOverridesPayload(overrides);
      // POST so we can pass overrides JSON body; route reads dry=1 from query.
      const res = await fetch(`/api/newsletter/send?dry=1&secret=${encodeURIComponent(secret)}`, {
        method: "POST",
        headers: body ? { "content-type": "application/json" } : undefined,
        body: body ? JSON.stringify({ overrides: body }) : undefined,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Failed");
        setStep("auth");
        return;
      }
      setPreview(data);
      setStep("preview");
    } catch (e: any) {
      setError(e?.message || "Network error");
    } finally {
      setLoading(false);
    }
  }

  async function sendTest() {
    if (!testEmail) return;
    setError("");
    setLoading(true);
    try {
      const body = buildOverridesPayload(overrides);
      const res = await fetch(
        `/api/newsletter/send?test=${encodeURIComponent(testEmail)}&secret=${encodeURIComponent(secret)}`,
        {
          method: "POST",
          headers: body ? { "content-type": "application/json" } : undefined,
          body: body ? JSON.stringify({ overrides: body }) : undefined,
        }
      );
      const data = await res.json();
      if (!res.ok) setError(data?.error || "Test send failed");
      else setResult({ ...data, kind: "test" });
    } catch (e: any) {
      setError(e?.message || "Network error");
    } finally {
      setLoading(false);
    }
  }

  async function sendReal() {
    if (!confirm(`Really send to all confirmed subscribers?\nIssue: ${preview?.issue?.slug}`)) return;
    setError("");
    setLoading(true);
    setStep("sending");
    try {
      const body = buildOverridesPayload(overrides);
      const res = await fetch(`/api/newsletter/send?secret=${encodeURIComponent(secret)}`, {
        method: "POST",
        headers: body ? { "content-type": "application/json" } : undefined,
        body: body ? JSON.stringify({ overrides: body }) : undefined,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Send failed");
        setStep("preview");
        return;
      }
      setResult(data);
      setStep("done");
    } catch (e: any) {
      setError(e?.message || "Network error");
      setStep("preview");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-semibold mb-2">The Window — Admin</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Preview the next issue, send a test to yourself, then send to the real list.
      </p>

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {step === "auth" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <label className="block text-sm font-medium">Admin secret</label>
            <input
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="NEWSLETTER_SEND_SECRET"
              className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm"
            />
            <button
              onClick={loadPreview}
              disabled={!secret || loading}
              className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
            >
              {loading ? "Loading..." : "Load preview"}
            </button>
          </div>

          {/* Launch / special-edition overrides — collapsed by default so
              regular weekly auto-ships can't accidentally use it. Fill any
              subset; empty fields fall back to auto-compose. */}
          <details className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
            <summary className="cursor-pointer text-sm font-medium text-amber-300">
              Launch / special-edition overrides (advanced)
            </summary>
            <div className="mt-4 space-y-4">
              <p className="text-xs text-muted-foreground">
                Fill only the fields you want to override. Empty fields fall back to
                the auto-composed value. Use this for Issue #1 launch, year-end,
                100th, crisis response.
              </p>
              <div>
                <label className="block text-xs font-medium mb-1.5">Issue number override</label>
                <input
                  type="number"
                  value={overrides.issueNumber}
                  onChange={(e) => setOverrides({ ...overrides, issueNumber: e.target.value })}
                  placeholder="auto = ISO week of year"
                  min={1}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5">Subject line override</label>
                <input
                  type="text"
                  value={overrides.subject}
                  onChange={(e) => setOverrides({ ...overrides, subject: e.target.value })}
                  placeholder="auto = {destName} scores {score}/5 this week"
                  maxLength={100}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                />
                <p className="text-[10px] text-muted-foreground mt-1 font-mono">
                  {overrides.subject.length}/100 · mobile preview truncates around 40-50
                </p>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5">Preview text override</label>
                <input
                  type="text"
                  value={overrides.previewText}
                  onChange={(e) => setOverrides({ ...overrides, previewText: e.target.value })}
                  placeholder="auto = {destName}, {state} — and the place you should skip instead."
                  maxLength={150}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                />
                <p className="text-[10px] text-muted-foreground mt-1 font-mono">
                  {overrides.previewText.length}/150
                </p>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5">Opening letter override</label>
                <textarea
                  value={overrides.opening}
                  onChange={(e) => setOverrides({ ...overrides, opening: e.target.value })}
                  placeholder="auto = rotated from voice-pool (pickOpening). Use blank lines for paragraph breaks."
                  rows={6}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-serif italic leading-relaxed"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5">Closing line override</label>
                <textarea
                  value={overrides.closing}
                  onChange={(e) => setOverrides({ ...overrides, closing: e.target.value })}
                  placeholder="auto = rotated from voice-pool (pickClosing)"
                  rows={3}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-serif italic leading-relaxed"
                />
              </div>
              <button
                type="button"
                onClick={() => setOverrides(EMPTY_OVERRIDES)}
                className="text-xs text-muted-foreground hover:text-foreground underline"
              >
                Clear all overrides
              </button>
            </div>
          </details>
        </div>
      )}

      {step === "preview" && preview && (
        <div className="space-y-6">
          <button
            onClick={() => setStep("auth")}
            className="text-xs text-muted-foreground hover:text-foreground underline"
          >
            ← Back / edit overrides
          </button>

          {buildOverridesPayload(overrides) && (
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200">
              <strong>Overrides active:</strong>{" "}
              {Object.keys(buildOverridesPayload(overrides) ?? {}).join(", ")}
            </div>
          )}

          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Issue slug
            </p>
            <p className="font-mono text-sm mt-1">{preview.issue.slug}</p>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground mt-4">
              Subject
            </p>
            <p className="mt-1">{preview.issue.subject}</p>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground mt-4">
              Preview text
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{preview.issue.previewText}</p>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground mt-4">
              Confirmed recipients
            </p>
            <p className="mt-1 font-mono text-lg">{preview.recipientCount}</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <div>
              <h3 className="font-semibold mb-1">Best score</h3>
              <p className="text-sm text-muted-foreground">
                {preview.issue.props.bestScore.name}, {preview.issue.props.bestScore.state} — {preview.issue.props.bestScore.score}/5
              </p>
              <p className="text-xs text-muted-foreground mt-1">{preview.issue.props.bestScore.note}</p>
            </div>
            {preview.issue.props.skip && (
              <div>
                <h3 className="font-semibold mb-1">Honest skip</h3>
                <p className="text-sm text-muted-foreground">
                  Skip {preview.issue.props.skip.trapName}, go to {preview.issue.props.skip.alternativeName}
                </p>
              </div>
            )}
            {preview.issue.props.road && (
              <div>
                <h3 className="font-semibold mb-1">Road intel</h3>
                <p className="text-sm text-muted-foreground">{preview.issue.props.road.title}</p>
              </div>
            )}
            <div>
              <h3 className="font-semibold mb-1">What changed</h3>
              <p className="text-sm text-muted-foreground">
                {preview.issue.props.changes.scoresUpdated} scores updated · {preview.issue.props.changes.destinationsAdded} new destinations
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 space-y-3">
            <h3 className="font-semibold">Send test to yourself</h3>
            <div className="flex gap-2">
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm"
              />
              <button
                onClick={sendTest}
                disabled={!testEmail || loading}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:border-primary disabled:opacity-50"
              >
                Send test
              </button>
            </div>
            {result?.kind === "test" && (
              <p className="text-sm text-emerald-400">Test sent. Check your inbox.</p>
            )}
          </div>

          <button
            onClick={sendReal}
            disabled={loading || preview.recipientCount === 0}
            className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50"
          >
            Send to all {preview.recipientCount} subscribers
          </button>
        </div>
      )}

      {step === "sending" && (
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <p className="text-sm">Sending...</p>
        </div>
      )}

      {step === "done" && result && (
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-6">
          <h2 className="text-lg font-semibold text-emerald-400 mb-2">Sent.</h2>
          <p className="text-sm">
            Issue <span className="font-mono">{result.slug}</span> sent to {result.sent} recipients.
          </p>
          {result.errors?.length > 0 && (
            <div className="mt-3 text-xs text-red-400">
              {result.errors.length} batch error(s): {result.errors.join(", ")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
