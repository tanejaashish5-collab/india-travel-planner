# NakshIQ De-Risk Plan — 2026-06-02

> Trigger: ~50 startup ideas validated to 0 clean survivors across two methodologies; the evidence-led move is to harden the one real asset (NakshIQ) against the melting search-traffic model. Founder chose this direction.

## The two facts that drive everything

**1. The traffic model is melting (external, 2025-26 evidence).** Google organic traffic -33-38% YoY; zero-click ~69-80%; AI Overviews on 80-99% of informational queries; ranking↔AI-citation overlap collapsed 75%→17-38%; major travel blogs losing ~90% and shutting down. NakshIQ is almost entirely informational surface → directly exposed.

**2. The owned-audience escape hatch is currently non-functional (internal, live DB 2026-06-02).**
- `newsletter_subscribers`: **6 total, 4 confirmed** (~4/mo).
- `destination_alerts`: **0**.
- `membership_waitlist`: **0**.
- ~10 capture components exist; peak-alert-hook shows ~180-190 impressions/day and converts **0%**.

**Conclusion:** capture fails on **value-exchange**, not traffic or surface count. And the "monetise only after 100K MUV + 2K email" gate is, at ~4 emails/mo against a melting top-of-funnel, **effectively unreachable (≈40 years)**. The gate must change.

## What already exists (don't rebuild)
- Affiliate is BUILT: `lib/affiliate.ts`, `lib/booking-links.ts`, `lib/experience-links.ts`, `components/booking-handoff.tsx` (Agoda/Booking.com/Viator/GetYourGuide, 82 refs).
- Stripe ref + `membership-form` → but membership is a **waitlist only** (0 signups), not live paid.
- Email infra: double-opt-in (`confirmation_token`/`confirmed_at`), `newsletter_issues`, unsubscribe tokens. Solid plumbing.
- **Genuine gap: NO web-push** (`web-push`/VAPID/pushManager absent) — the highest-value Google-independent re-engagement channel is unbuilt.

## Strategic reframe
The durable asset is NOT the search-traffic engine — it's (a) the verified data + the *moment of high intent* when a visitor is making a trip decision, and (b) any audience we convert to an **owned, off-Google channel before the traffic erodes.** So:
1. **Capture value NOW** from the high-intent traffic that still exists (don't wait for a 100K-MUV gate that's melting away).
2. **Fix the value-exchange** so capture goes from ~0% to benchmark (1-3%+).
3. **Build the missing owned channel** (web-push) that needs no email and is one tap.

## Prioritized moves

### P0 — Stop waiting; capture value now (revenue + audience that already have demand)
- **P0a — Verify + switch ON affiliate earnings.** It's built. Confirm `booking-handoff` fires, links carry the affiliate IDs, clicks/conversions are tracked. This is direct, ~Google-independent revenue available at *today's* traffic. (Founder: confirm current affiliate $ in the partner dashboards — Agoda/Booking/GYG.) **Decision: un-gate this from the 100K-MUV rule.**
- **P0b — Kill or rewrite the gate.** The "2K email before monetising" rule was set pre-AI-Overviews. With a melting funnel, capture value continuously instead. Re-baseline the goal to "owned-audience growth rate" not an absolute MUV gate.

### P1 — Fix the value-exchange (the actual broken thing)
The confirmed failure mode: nobody trades email for "a future reminder" or a generic newsletter. Replace weak asks with an **immediate, high-value, gated deliverable** — give them the thing they came for, in exchange for email. Candidates to A/B (hypotheses, instrument before scaling):
- A **personalised "India trip confidence report" / month-by-month verdict PDF** for the destination(s) they're viewing — emailed instantly. (Uses data you already have; the email is the delivery mechanism, not a bribe.)
- **"Save this trip" → email me my saved list + price/crowd alerts** (re-anchor `save-list-email-prompt` + `saved-content` as the primary capture, not the weak peak-alert hook). Note `newsletter_subscribers.saved_destination_ids` already exists — the schema anticipated this.
- Gate the **export-trip / itinerary** output behind a one-field email.
- **Instrumentation first:** log impressions→submits per surface (we are currently fixing blind). Can't optimise what isn't measured.

### P2 — Build the missing owned channel
- **Web-push (VAPID/service-worker).** One-tap, no email, Google-independent. Perfect for "crowds spike next month at [saved dest]" / "monsoon window opening" re-engagement. The SW already exists (PWA) — add push. This is the single highest-leverage *new* build.
- **PWA install prompt** on engaged sessions (offline-saved-trips already exists) — turns a visitor into an app icon = a channel you own.

## What needs founder/GA4 input (can't see from here)
- Current monthly MUV + the impressions→signup rate per surface (GA4).
- Current affiliate revenue (partner dashboards).
- Appetite to drop/rewrite the 100K-MUV monetisation gate.

## Honest risks
- If actual traffic is much lower than assumed, even a fixed value-exchange yields a small list — capture % fix is necessary but maybe not sufficient; affiliate-now + push may matter more than email.
- Lead-magnet PDFs must be genuinely useful or they just move the 0% from signup to unsubscribe.
- None of this makes NakshIQ a *bigger* business by itself; it makes the existing one *durable*. That's the goal chosen, but name it honestly.

## Suggested first execution slice (for approval)
1. P0a: audit affiliate wiring + confirm tracking (code) → report what's live.
2. P1 instrumentation: add per-surface impression/submit logging.
3. P1 value-exchange: ship ONE strong gated deliverable (recommend "save trip → emailed saved list + alerts") and measure.
4. P2: scope web-push.
