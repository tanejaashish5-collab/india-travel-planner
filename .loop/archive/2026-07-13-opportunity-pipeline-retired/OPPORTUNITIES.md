# `.loop/` Phase 4 — the Opportunity Scout

The loop's first three phases only find **defects** (things breaking). Phase 4 finds
**opportunities** (things that could be more valuable even when nothing is broken).

**The core difference, and why it's a separate stage:** a defect has ground truth —
it reproduces or it doesn't, so the verify layer just re-checks it. An opportunity is
speculative — so every candidate must clear an **evidence gate** before it reaches you.
Nothing is surfaced unless real GSC / GA4 / DB numbers back it. That gate is the
opportunity-equivalent of `verify-findings.mjs`'s "verify-before-fix", and it's the
founder rule *"validate before recommending · no hype without evidence"* written in code.

The scout is **read-only**. It writes only `.loop/opportunities-{inbox.json,digest.md}`
and applies nothing. Propose-ready items flow into the existing propose → approve →
iMessage path; the rest are a ranked digest for you to judge.

---

## Run it

```bash
# credentials first (read-only, tiny pulls — proves the loop can reach each source)
node --env-file=apps/web/.env.local scripts/_loop/sources.mjs --probe

# the scout (config-driven: runs the enabled classes)
node --env-file=apps/web/.env.local scripts/_loop/scout-opportunities.mjs

# one class only
node --env-file=apps/web/.env.local scripts/_loop/scout-opportunities.mjs --only=striking-distance

# pure-logic self-test (no creds needed)
node scripts/_loop/scout-opportunities.mjs --self-test
```

Output: a ranked `opportunities-digest.md` (top 12 per class) + the full
`opportunities-inbox.json`. Ranking = `value × confidence ÷ effort` (cheap + confident
+ high-value floats up).

---

## The four classes

| Class | Source | Status | What it finds | Output |
|---|---|---|---|---|
| **data-coverage** | DB | ✅ on | Demand-weighted moat gaps (zero-POI, no-Hindi). Evidence-by-construction. | **propose-ready** — clear fix |
| **striking-distance** | GSC | ✅ on | **Query-level** (page+query): queries at rank 8-20 (one push from page 1) + queries at rank ≤5 starved of clicks for that rank (title/snippet). Query-level on purpose — page aggregates hide ranking-vs-title (the tungnath/may lesson); cross-refs existing title overrides so it never re-pitches an optimised page. | serp-ctr-gap is **propose-ready** (rides the title-overrides pipeline); near-page-1 is digest |
| **cro-leak** | GA4 | ⛔ off | Content pages with traffic but a below-median conversion rate. | digest + hypothesis |
| **new-surface** | GSC | ✅ on | Search-intent clusters with demand that map to **no** existing route family. | digest — **needs competitive validation** |

### Why cro-leak is OFF (and it's not a code problem)

Measured empirically 2026-06-07:
- GA4's blanket `keyEvents` metric reads **400%+ of sessions** (it counts page_view / scroll
  / engagement as "key events") — useless as a conversion rate.
- All-traffic events are **bot-saturated**: the median `save_destination / page_view`
  ratio across content pages is **68%** — impossible for humans. Bots fire the event on
  nearly every pageview, and the ratio is *inverted* (your best real-traffic pages look
  like the worst "leaks" because real humans dilute the bot rate).
- Filtering to **Organic Search only** (strips Direct/bot) leaves **0 content pages** with
  even 40 organic pageviews / 28d — organic traffic is too thin per page to measure
  per-page conversion at all.

So an autonomous CRO detector here would surface inverted noise. The detector is built and
ready (organic-only, relative-to-median, low-confidence) but **disabled in `config.json`**
with the reason recorded. **The unlock is more organic traffic per page + bot-filtered
attribution — not a detector tweak.** Re-enable by flipping `opportunities.scouts.cro-leak`
to `true` once `sources.mjs --probe` plus a manual check shows enough organic volume.

### The new-surface "research half" is a gated Claude step

The node scout proves **demand** (clustered GSC impressions for an intent with no serving
route family). It cannot prove **winnability** — that needs the web (does a rival already
own this query? is the SERP beatable?), which is a Claude WebSearch step, not a node
process. So new-surface candidates carry `needs_competitive_validation: true` and are
**never auto-built**. The competitive pass is budgeted and run on demand (Haiku research
agents, small fan-out per the cost rules) — see `/loop-scout`. Until that pass runs, a
new-surface item is "demand proven, winnability unknown".

---

## Guardrails (inherited from Phases 0-1)

The scout imports `guard.mjs` like every loop script: it honours `STOP`/`PAUSE`, is
read-only (the `read-db-query` / `web-fetch` / `write-scratch` noGate actions), and writes
nothing outside `.loop/`. It can never commit, deploy, or write the DB — those stay gated
behind your `go` in the existing propose → approve flow.

## Tuning

All thresholds live in `config.json → opportunities` (safe to edit; never executes):
`strikingDistance.{nearMinImpr, ctrGapMinImpr, ctrGapMinLostClicks, ctrGapMaxPos}`,
`newSurface.minClusterImpr`, `croLeak.{minOrganicPageviews, minPagesToMeasure}`, and the
`scouts` on/off switches. Lower a floor to surface more (noisier); raise it for only the
strongest signals.
