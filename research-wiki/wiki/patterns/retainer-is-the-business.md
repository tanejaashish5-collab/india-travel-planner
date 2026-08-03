---
type: pattern
sources: [data/research/ISENBERG-COREY-GANIM-AI-ASSESSMENT-2026-07-16.md, data/research/LENNY-LEMKIN-CASEL-DEEP-SCRAPE-2026-07-16.md]
updated: 2026-07-16
---

# Retainer is the business

**The pattern:** the assessment/audit is a tripwire — cheap, fast, builds trust, generates the diagnosis. The recurring maintenance retainer is the actual business — the revenue that compounds instead of resetting to zero every sales cycle.

## Three independent operators, same shape

- **Corey Ganim** ($999 AI Tools Assessment): 45-min discovery → 7-slide report → review call → upsell into process redesign ($3–3.5K) or the star product, an **AI Concierge retainer** priced $1,200 → $1,500 → $1,800 → $2,000/mo (raising on every new close), hard-capped at 6 clients as real scarcity. The assessment converts 50–60% into implementation work at his claimed numbers (self-reported, unverified). See [[src-ganim-ai-assessment]], [[corey-ganim]].
- **Jason Lemkin** (SaaStr, 20 agents live): frames the same economics from the buyer's side — enterprise agent vendors charge $50–100K/yr + $25–50K forward-deployed training, a price SMBs can't buy into. **Orchestration itself is a headcount line** (10–15 hrs/wk for 1.2 humans running 20 agents), not a free byproduct of "AI." See [[jason-lemkin]].
- **Brian Casel** (agent-in-a-box, bootstrapper scale): sells template + install ($2–10K) + retainer ($500–2K/mo) — explicit that maintenance is real work (business changes, models improve, edge cases), not padding. Night-shift pattern: interface + scheduled skill + 2–20min human reviews. See [[brian-casel]].

Full extraction: [[src-lenny-deep-scrape]].

## The correction this makes to the Ganim kit

The original Ganim ingest (2026-07-16, earlier the same day) banked the $999 assessment spec as dashboard Project #1's missing GTM. This pattern sharpens it: **do not run the assessment as a standalone $999 product.** The offer ladder must be designed assessment → $3–5K single-process install → $500–2K/mo concierge/maintenance retainer **from day one**, or the business is a one-off consulting treadmill that never compounds — 5–10 clients on the full ladder is ~$30–120K/yr at ~4 hrs/wk/client; 5–10 clients on assessment-only is $5–10K total, once, no recurrence.

## Why this matters beyond the Ganim kit

This generalizes past one project: any future audit/diagnostic/scan offer in the [[ledger-overview]] needs its retainer designed before it needs its tripwire priced. It's the services-side mirror of [[money-is-services-not-adsense]] — that pattern says the visible channel isn't the money; this one says the visible *offer* (the assessment) isn't the money either, one layer further down.

## 2026-08-02 — the missing scope boundary, and the missing pricing method

Three operators established that the retainer *is* the business, but none of them defined what
the retainer actually **buys** — which is where these deals get argued. [[src-nate-herk-pricing-ai]]
supplies it, and it is a one-sentence fix:

> *"That $400 a month isn't for me to bolt on new features every month. It's just me
> guaranteeing that the build keeps doing what we agreed that it would do."*

**Covered:** breakage, API changes, a new model release, edge cases needing a tweak to keep the
system meeting the agreed scope. **Not covered: new functionality — a separate conversation.**
Sanity check: if maintenance on a $30K system would cost you more than the retainer to deliver,
you cannot charge that retainer.

This pattern also never said how to derive any of its numbers. That is now
[[price-off-the-clients-own-number]] — price at 10–20% of first-year annualised value, sized
from the client's own stated cost. **Read the two together:** this page decides the *shape* of
the offer ladder, that one decides the *numbers* in it, and it carries the standing correction
that the anti-hourly argument must not be applied to the contract lane.

Related: [[src-ganim-ai-assessment]], [[src-lenny-deep-scrape]], [[money-is-services-not-adsense]], [[corey-ganim]], [[jason-lemkin]], [[brian-casel]], [[price-off-the-clients-own-number]], [[src-nate-herk-pricing-ai]]
