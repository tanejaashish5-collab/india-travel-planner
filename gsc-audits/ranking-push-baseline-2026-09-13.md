# Ranking push — pre-registered baseline (2026-09-13)

Written BEFORE the change shipped, per the measurement rule in CLAUDE.md: name the number,
its baseline, and the target, so the result cannot be argued with after the fact.

## The diagnosis this tests

GSC 28d window 2026-08-14 → 2026-09-11 (`ranking-push-candidates-2026-09-13.json`):

| Position bucket | Pages | Clicks | Impressions | CTR |
|---|---|---|---|---|
| 1-3 | 317 | 248 | 6,995 | 3.55% |
| 4-6 | 1,255 | 846 | 71,477 | 1.18% |
| **6-12** | **2,828** | **985** | **137,922** | **0.71%** |
| 13-20 | 302 | 60 | 13,020 | 0.46% |
| 21+ | 871 | 52 | 17,061 | 0.30% |

65% of all impressions sit at positions 6-12 and convert at 0.71%. The site is shown; it is
not clicked, because it sits at the bottom of page 1. Coverage is not the constraint.

## What shipped (commit referenced in the follow-up audit)

1. **Hindi cost titles/H1 rewritten to the colloquial query form** ("X घूमने का खर्चा: कितना
   खर्च आता है") on every `/hi/cost/*` page. Evidence: 28d page-level queries — every real
   query is "घूमने का खर्चा" / "jane ka kharcha" / "ghumne me kitna kharcha"; none is
   "यात्रा खर्च". Devanagari queries ranked 7-8 while romanised queries on the SAME page
   ranked 3-5.
2. **High-impression rail regenerated from live GSC** (`scripts/gen-high-impression-pages.mjs`)
   so `/where-to-go` and `/explore` link to the 38 September + 16 October dest×month pages
   at positions 5-12 with ≥75 impressions. The previous list was hand-curated in May-July
   and surfaced nothing current.

## Baselines (28d to 2026-09-11)

| Metric | Baseline | Target by 2026-10-20 |
|---|---|---|
| Site clicks / week (GSC weekly audit) | 456 | 900 |
| `/hi/cost/jaisalmer` clicks / 28d | 18 (6,299 imp, pos 6.4, CTR 0.29%) | 90 (CTR ≥ 1.5%) |
| `/hi/cost/mussoorie` clicks / 28d | 9 (2,152 imp, pos 6.5) | 40 |
| "जैसलमेर घूमने का खर्चा" position | 8.3 | ≤ 5 |
| "मसूरी घूमने का खर्च" position | 7.1 | ≤ 5 |
| All `/hi/cost/*` pages with impressions (77) — clicks / 28d | 191 | 382 (2×) |
| Rail cohort (72 pages matched in the generated list) — impression-weighted avg position | 8.5 (221 clicks) | ≤ 7.0 (−1.5) |

## How to read the result on 2026-10-20

- Re-run `node --env-file=apps/web/.env.local scripts/gsc-ranking-push-candidates.mjs` and
  `scripts/gsc-page-queries.mjs`; compare the same pages, same 28d window length.
- Hindi title change and rail change are separable: the Hindi cost pages are NOT in the rail,
  so a move on `/hi/cost/*` is the title lever; a move on the Sep/Oct dest×month cohort is
  the internal-link lever.
- Misses are findings, not failures to explain away. If `/hi/cost/*` does not move, the
  colloquial-title hypothesis is wrong for this page family. If the rail cohort does not move,
  two hub pages are not enough internal-link weight and the next step is state hubs.

## How the check runs

Automated, not promised: LaunchAgent `com.nakshiq.ranking-push-check` (plist in `scripts/`) fires
2026-10-20 09:17 local with a 10-21 retry, runs `scripts/ranking-push-check.sh` → `ranking-push-check.mjs`,
writes `gsc-audits/ranking-push-check-2026-10-20.md`, renders the dark PDF to `~/Desktop/Reports/`,
notifies through the NakshIQ-Brief applet (click opens the PDF), and commits via the guard. It is a
LaunchAgent via /bin/bash because the GSC secrets are local-only and launchd has the keychain for push.
Dry-run on 2026-09-13 reproduced the baseline exactly (0% change, 72 + 77 pages matched).

