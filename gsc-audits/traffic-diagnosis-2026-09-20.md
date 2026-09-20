# NakshIQ traffic diagnosis — 2026-09-20

Working source for the interactive HTML brief. Question asked: *"what needs to be
done to make it more traffic, and how can we beat the deep links from other
websites like MakeMyTrip?"*

All figures from Google Search Console (28d, 2026-08-21 → 2026-09-17, 11,898
queries / 13,186 query×page rows) and three live logged-out India-locale Google
SERPs probed with headful Chromium on 2026-09-20.

---

## 1. The MakeMyTrip premise, tested

MakeMyTrip competes on exactly one of our three query classes.

| Query probed | Who holds the top organic slots | NakshIQ |
|---|---|---|
| `morni hills` (bare place name) | **MakeMyTrip #1**, Tripadvisor #2, Instagram, Haryana Tourism | position 8.4, **0 clicks on 2,725 impressions** |
| `lansdowne vs kasauli` (comparison) | **NakshIQ #1**, then Tripoto, Rome2Rio, Times of India | cited *inside* the AI Overview |
| `shimla vs mussoorie` (comparison) | travelcoffee.in #1 (a small blog), Quora, NDTV | ~#6, not cited |

MakeMyTrip appears on the place-name SERP and nowhere near the comparison SERPs.
On `morni hills` Google also stacks its own *Places to stay / Things to do /
Where to eat* module above every organic result.

**Conclusion: we already beat MakeMyTrip where it matters, and cannot beat it
where it wins. The competitor on decision queries is Google's own answer block,
plus small fast blogs — not the OTAs.**

## 2. Where the traffic actually is

CTR by position band, split by what the searcher is asking:

| Intent | pos 1-3 | pos 4-5 | pos 6-10 | share of impressions |
|---|---:|---:|---:|---:|
| **Decision** (vs / cost / best time / itinerary) | **4.49%** | 1.04% | 0.33% | ~25% |
| Bare place name / other | 0.87% | 1.00% | 0.49% | 30.9% |
| Weather | 0.93% | 1.52% | 0.21% | 33.5% |

Two facts fall out:

1. **A top-3 ranking is worth ~5x more on a decision query.** Ranking #1 for a
   weather or place-name query still earns almost nothing, because Google
   answers it on the page.
2. **Within decision queries the cliff is 13.6x** between position 1-3 and 6-10.
   Position is nearly everything — but only on this one class.

**~65% of our Google visibility sits in classes that cannot convert.** Weather
alone is 33.5% of impressions and 14% of clicks.

This also closes an open question: the 2026-07-15 weather-title experiment came
back "UNREADABLE" on 07-30. That was not a measurement failure. Weather queries
are structurally zero-click, so there was never a result to find.

## 3. Why even our top-3 rankings underconvert

An AI Overview appeared on **12 of 12** queries probed, pushing the first organic
link **628–940px** down the page. Site-wide, NakshIQ holds position 1-3 on 3,016
queries and converts them at **1.39%**.

Citation inside the AI Overview is becoming the real position 1 — and until
today nothing measured it. Ranking is measured daily by GSC; being quoted was
measured by nothing.

## 4. A hypothesis that did NOT survive

**Claim tested:** ~49% of /vs/ pages (768 of 1,579) rendered *"Both destinations
score equally right now (2.0/10)"* instead of naming a winner, because
`destination_months.score` is an integer 0-5 so ties are structurally common.
The live snippet for `shimla-vs-mussoorie` was literally that sentence; the
winning page's snippet named a winner.

**Result across all 1,670 /vs/ pages with impressions:**

| Cohort | pages | impressions | clicks | CTR | avg pos |
|---|---:|---:|---:|---:|---:|
| Verdict names a winner | 824 | 18,075 | 247 | 1.37% | 5.7 |
| Verdict says "score equally" | 846 | 24,495 | 288 | 1.18% | 6.3 |

1.16x, two-proportion z = 1.75, **p = 0.074 — not significant**. Worth about
+47 clicks/28d. The 20x gap between the two example pages was *position*
(3.0 vs 8.2), not wording.

Shipped anyway because it is cheap, directionally positive and strictly more
useful copy — but it is **not** a growth lever and is not presented as one.

## 5. What shipped today

1. **`/vs/` quick-verdict rewrite** (`apps/web/src/components/vs-comparison.tsx`).
   Never renders a bare tie. Breaks current-month ties on year-round score →
   kids rating → difficulty → safety rating, and appends the strongest-window
   months when the current month is weak. Bilingual. Verified on 40 live tie
   pages: 40/40 clean, 39 name a winner, 1 falls through to the honest
   "genuinely interchangeable" line. `sw.js` bumped v59 → v60.

2. **Frozen decision target set**
   (`gsc-audits/decision-target-set-2026-09-20.json`, built by
   `scripts/gsc-decision-target-set.mjs`). 381 query×page rows across 151 pages.

   | | |
   |---|---:|
   | Baseline impressions | 6,516 |
   | Baseline clicks | **21** |
   | Baseline CTR | 0.322% |
   | Baseline avg position | 7.54 |
   | Same cohort at our own decision top-3 CTR (4.24%) | **276 clicks/28d** |

   **Pre-registered target: ≥100 clicks AND avg position ≤4.5 by 2026-11-15.**
   Re-score with `--measure`. A miss is a finding: it would mean position is not
   the binding constraint and the next hypothesis is demand seasonality.

3. **AI Overview citation tracker**
   (`scripts/ai-overview-citation-probe.mjs` + `ai-citation-probe-cron.sh` +
   `com.ashish.ai-citation.plist`, weekly Mon 10:20). Records whether the AI
   Overview quotes nakshiq.com. Three honesty rules are in the tool, not the
   prompt: a blocked probe is never recorded as "not cited"; a run where every
   probe fails exits non-zero; and every run probes a **positive control**
   (`lansdowne vs kasauli`, verified by hand to cite us) first — if the control
   comes back uncited the run is declared a measurement fault, not a citation
   loss. That control exists because the first version of this script scored
   0/12 while scraping "Skip to main content" as a citation.

## 6. What to do next, ranked

1. **Aim everything at the 151 target pages.** They carry 6,516 impressions and
   produce 21 clicks. This is the only pool where moving position pays.
2. **Links are the lever for that move**, which matches the 2026-09-13 diagnosis.
   Coverage is finished; more pages only adds impressions in the dead classes.
   The citable-asset + outreach machine is the right machine and needs to run.
3. **Stop optimising for weather and place-name queries.** Don't delete the
   pages — they are the same destination/month pages — just stop titling,
   testing and measuring against those queries.
4. **Watch the citation rate weekly** now that it is measured.

## 7. Caveats

- Three SERPs is an anecdote. The CTR splits behind the conclusion cover 11,898
  queries, which is why the conclusion holds and the SERP detail is illustrative.
- GSC's query table reports 317 clicks against 1,986 at page level, because rare
  queries are anonymised. Query-level numbers are used for **ratios only**.
- The `/vs/` verdict references the current month, so Google's cached snippet can
  show a previous month's verdict. The `shimla-vs-mussoorie` snippet showing
  "2.0/10" while September scores both at 8.0/10 is an example.
