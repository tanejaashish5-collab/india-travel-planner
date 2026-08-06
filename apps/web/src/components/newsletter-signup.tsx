"use client";

import { useEffect, useRef, useState } from "react";
import { FadeIn } from "./animated-hero";
import { KEY_EVENTS, track } from "@/lib/analytics";
import SHORTLIST from "@/data/month-shortlist-summary.json";

// One offer, one voice.
//
// 2026-08-06: the offer changed from "subscribe to The Window, every Sunday"
// to the month shortlist. The old pitch asked for a COMMITMENT with a vague
// benefit, from someone mid-decision, and it converted to zero — 918 human
// sessions/wk, 3 save_prompt_view, **0** emails captured, 13 subscribers in
// four months. The threshold was already 1 and the form was already on every
// high-traffic page, so neither gating nor placement was the cause. The offer
// was. This asks for an email in exchange for one concrete thing, delivered
// now, that a reader cannot assemble without opening 533 pages.
//
// Counts come from month-shortlist-summary.json (regenerated monthly by
// scripts/build-month-shortlist.mjs) — the tiny client-safe companion to the
// full shortlist, which stays server-side.
const DEFAULT_HEADLINE = `The ${SHORTLIST.monthLong} shortlist`;
const DEFAULT_SUBHEAD =
  `${SHORTLIST.totals.listed} of ${SHORTLIST.totals.destinations} places in India are in their best month right now — and ` +
  `${SHORTLIST.totals.inAMonthToAvoid} are in one we'd tell you to skip. We'll send the list.`;
const DEFAULT_BUTTON = "Send it";
const DEFAULT_FOOTNOTE = "Free, arrives straight away. Nothing sponsored. Unsubscribe in one click.";

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
  const [hint, setHint] = useState("");
  // Impression tracking — fires once per mount so we can measure
  // funnel stages: view → attempt → success/error. Without this,
  // a 0% conversion rate is indistinguishable from "form invisible"
  // vs "form visible but ignored". Caught 2026-05-06 (data audit
  // showed 0 organic signups despite ~280 engaged sessions / 28d).
  const viewTrackedRef = useRef(false);
  // Real-human gate for EMAIL_SIGNUP — fires only after a keystroke on
  // the input. Real-Chrome bot fleets fill `value` programmatically and
  // never dispatch keydown, so this strips ~99% of bot signal from GA4.
  // (Audit 2026-05-25 showed 16K signups/wk almost all bot.)
  const interactedRef = useRef(false);
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
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          source,
          // Tells the API to send the shortlist immediately as a transactional
          // email. Without this tag the reader gets only a confirm-your-email
          // message, which is not what the form promised.
          tags: ["month_brief"],
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data?.error || "Something went wrong. Please try again.");
        setStatus("error");
        track("newsletter_error", { source, reason: data?.error || `http_${res.status}` });
        return;
      }

      if (interactedRef.current) {
        track(KEY_EVENTS.EMAIL_SIGNUP, { source });
      }
      // Suppress the sticky tray for the rest of the session — this reader
      // has already been asked and answered.
      try {
        window.sessionStorage?.setItem("nq_newsletter_submitted", "1");
      } catch {
        /* ignore */
      }
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
          <div className="text-3xl mb-3">{"✉️"}</div>
          <p className="text-lg font-bold text-emerald-400">Sent — it&apos;s in your inbox.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            The {SHORTLIST.monthLong} shortlist is on its way to {email}. There&apos;s
            also a confirmation link in there — tap it and we&apos;ll send next
            month&apos;s when the list changes.
          </p>
        </div>
      </FadeIn>
    );
  }

  return (
    <FadeIn>
      <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 via-card to-primary/5 p-8">
        <div className="text-center max-w-md mx-auto">
          {/* `??` keeps an EMPTY-STRING headline (only catches null/undefined),
              which rendered a literally empty <h3> on /explore (2026-07-15
              audit). Empty string = caller wants no heading → render none. */}
          {(headline == null || headline.trim()) && (
            <h3 className="text-xl font-bold">{headline ?? DEFAULT_HEADLINE}</h3>
          )}
          <p className="mt-2 text-sm text-muted-foreground">
            {subhead ?? DEFAULT_SUBHEAD}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (hint) setHint("");
                if (status === "error") setStatus("idle");
              }}
              onKeyDown={() => {
                interactedRef.current = true;
              }}
              onBlur={(e) => {
                const v = e.target.value.trim();
                setHint(v && !v.includes("@") ? "Enter a valid email address." : "");
              }}
              placeholder="your@email.com"
              required
              aria-label="Email address"
              aria-invalid={hint ? true : undefined}
              className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              disabled={status === "loading"}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="group shrink-0 inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                "Subscribing…"
              ) : (
                <>
                  {buttonLabel ?? DEFAULT_BUTTON}
                  <span
                    aria-hidden
                    className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                  >
                    →
                  </span>
                </>
              )}
            </button>
          </form>

          {hint && status !== "error" && (
            <p className="mt-3 text-sm text-amber-400">{hint}</p>
          )}
          {status === "error" && errorMsg && (
            <p className="mt-3 text-sm text-red-400">{errorMsg}</p>
          )}

          <p className="mt-4 text-xs text-muted-foreground/60">
            {footnote ?? DEFAULT_FOOTNOTE}
          </p>
        </div>
      </div>
    </FadeIn>
  );
}
