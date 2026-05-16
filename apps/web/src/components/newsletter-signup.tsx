"use client";

import { useEffect, useRef, useState } from "react";
import { FadeIn } from "./animated-hero";
import { KEY_EVENTS, track } from "@/lib/analytics";

export function NewsletterSignup({
  source = "inline-widget",
  headline,
  subhead,
  buttonLabel,
  footnote,
}: {
  source?: string;
  headline?: string;
  subhead?: string;
  buttonLabel?: string;
  footnote?: string;
} = {}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  // Impression tracking — fires once per mount so we can measure
  // funnel stages: view → attempt → success/error. Without this,
  // a 0% conversion rate is indistinguishable from "form invisible"
  // vs "form visible but ignored". Caught 2026-05-06 (data audit
  // showed 0 organic signups despite ~280 engaged sessions / 28d).
  const viewTrackedRef = useRef(false);
  useEffect(() => {
    if (viewTrackedRef.current) return;
    viewTrackedRef.current = true;
    track("newsletter_view", { source });
  }, [source]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    track("newsletter_attempt", { source });
    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      track("newsletter_error", { source, reason: "client_validation" });
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), source }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data?.error || "Something went wrong. Please try again.");
        setStatus("error");
        track("newsletter_error", { source, reason: data?.error || `http_${res.status}` });
        return;
      }

      track(KEY_EVENTS.EMAIL_SIGNUP, { source });
      setStatus("success");
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
      track("newsletter_error", { source, reason: "network" });
    }
  }

  if (status === "success") {
    return (
      <FadeIn>
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 text-center">
          <div className="text-3xl mb-3">{"\u2709\uFE0F"}</div>
          <p className="text-lg font-bold text-emerald-400">Check your inbox.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Tap the confirmation link we just emailed to {email}. The Window arrives every Sunday.
          </p>
        </div>
      </FadeIn>
    );
  }

  return (
    <FadeIn>
      <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 via-card to-primary/5 p-8">
        <div className="text-center max-w-md mx-auto">
          <h3 className="text-xl font-bold">{headline ?? "The Window — your Sunday travel briefing"}</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {subhead ?? "India's best destination this week, the honest skip, road conditions, and what changed. One short email, every Sunday. Free."}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="your@email.com"
              required
              className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              disabled={status === "loading"}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="shrink-0 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "..." : (buttonLabel ?? "Get Sunday's email")}
            </button>
          </form>

          {status === "error" && errorMsg && (
            <p className="mt-3 text-sm text-red-400">{errorMsg}</p>
          )}

          <p className="mt-4 text-xs text-muted-foreground/60">
            {footnote ?? "One email per Sunday. Unsubscribe in one click."}
          </p>
        </div>
      </div>
    </FadeIn>
  );
}
