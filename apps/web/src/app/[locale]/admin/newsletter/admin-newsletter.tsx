"use client";

import { useState } from "react";

type Step = "auth" | "preview" | "sending" | "done";

export function AdminNewsletter() {
  const [step, setStep] = useState<Step>("auth");
  const [secret, setSecret] = useState("");
  const [testEmail, setTestEmail] = useState("");
  const [preview, setPreview] = useState<any>(null);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadPreview() {
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`/api/newsletter/send?dry=1&secret=${encodeURIComponent(secret)}`);
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
      const res = await fetch(
        `/api/newsletter/send?test=${encodeURIComponent(testEmail)}&secret=${encodeURIComponent(secret)}`,
        { method: "POST" }
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
      const res = await fetch(`/api/newsletter/send?secret=${encodeURIComponent(secret)}`, {
        method: "POST",
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
      )}

      {step === "preview" && preview && (
        <div className="space-y-6">
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
