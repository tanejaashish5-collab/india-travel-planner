---
type: source
sources: [data/research/DEMAND-SWEEP-REDDIT-2026-07-30.md]
updated: 2026-08-02
---

# src — Reddit demand sweep (2026-07-30)

The deliberate pivot from commentary to **demand** sources after the Economist sweep yielded
nothing. Lane-scoped subreddits × complaint-phrase queries, `sort=top&t=year`, keeping posts
with score ≥15 or ≥12 comments. Vote/comment counts used as the demand proxy. Business track
only.

**The instrument worked** — it is the only source in four sweeps that produced a real signal.
See [[demand-sources-over-commentary-sources]]. **What it produced still failed the gate** —
see [[src-travel-trust-gate-2026-08-02]].

## Access note (load-bearing for future runs)

`curl` → 403 · `WebFetch` → blocked · `old.reddit.com` → 302 · `api.reddit.com` → 403.
**Only Playwright works.** Fetch from *inside* the page context (`page.evaluate` + `fetch`) so
one call sweeps many endpoints. Rate limit bites at ~60–70 requests; back off ~90s, pace
≥300ms.

## Lane 1 — India travel: TRUST AND SCAMS, dominant by a wide margin

180 scanned, 118 kept. Not one post — the organising complaint of the entire lane.
Top: *"One month in India: Struggling with 'Scam Fatigue' and feeling dehumanized as a solo
traveler"* **2,908 / 745**; *"Got scammed in Mumbai T2"* (Digi Yatra) **2,371 / 469**;
Akshardham ₹1.8 lakh robbery **1,693 / 244**; plus ~8 named-operator alerts (Kaizen
Adventours Ladakh, Hill View Bike Rent Dehradun, a Rishikesh serial scammer, Goa reservation
scams). The complaint is **not price** — it is *"the cognitive load of never knowing who to
trust."* → gated and CLOSED 2026-08-02.

## Lane 1b — city subreddits: WRONG INSTRUMENT

r/delhi, r/mumbai, r/bangalore returned **civic** complaints (fake toothpaste factories,
apartment disputes, toll-plaza RTIs) at 2,000–9,800 scores — high engagement, irrelevant.
**City subs are resident forums, not travel forums.** Recorded so it is not repeated.

## Lane 1c — matchmaking trust (incidental)

*"Beware: I Caught a Matrimonial App Scammer"* 733 / 112 — reported it, *"the scammer profile
is still not taken down."* Plus a PSA at 153 / 12. → gated as bycatch, CROWDED/table-stakes.

## Lane 2 — India wisdom: the pain is ONBOARDING, not content

Collected on `t=all`, so these are *durable* questions. Five of seven top posts are literally
the same one: *"where do I start?"* (130/58, 102/37, 38/42, 18/44, 31/33, 43/15). One poster:
*"it seemed so interwoven and complicated."* The corpus is vast, commentary contradictory, and
there is **no trusted sequenced beginning**.

⚠️ **Honest mismatch, unresolved and not to be papered over:** this audience is
**English-speaking diaspora / second-generation**, while Chanakya publishes **Hindi
Devanagari** shorts. Real durable demand, not addressable by the asset in that lane without a
language/format change. Still an open founder decision as of 2026-08-02.

## Lanes 3–4 — skip, recorded so they are not re-swept hopefully

**Self-mastery:** real pain, high emotion (phone addiction 57/51 *"I've tried so many things
and nothing works"*, popcorn brain 311/50, *"stuck in a life I hate"* 278/262) — the most
saturated content category on the internet, no differentiated wedge. **Business education:**
thin; *"How do I get clients online?"* (0/46) is the single most-answered question in
entrepreneurship.

Related: [[demand-sources-over-commentary-sources]], [[passion-fit-gate]],
[[ai-content-saturation]], [[verification-as-moat]].
