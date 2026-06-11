# GSC Canonical Consolidation — Apr 29, 2026 Report

**Scheduled task:** `gsc-canonical-consolidation` (48h post-deploy check)
**Property:** `sc-domain:nakshiq.com` (Domain property — accessed successfully via Chrome)
**Run:** 2026-04-29

## TL;DR

- **4 of 5 target URLs are already consolidated.** Google-selected canonical is the `/en/` prefixed version. No action required.
- **1 of 5 (Kumbhalgarh) is NOT yet consolidated.** Last Googlebot crawl was Apr 14, predating the redirect/canonical signals. **REQUEST INDEXING submitted ✓** (priority crawl queue).
- **Production redirect + canonical signals are clean** for all 5 URLs (301 → `/en/`, self-canonical on the resolved page).
- **Performance: Apr 27 snippet-rewrite CTR uplift not yet measurable.** GSC has a ~3-day data lag — latest data is Apr 26. Re-check Wed May 2 or later.

## Production signals (verified via curl)

All 5 non-prefixed URLs serve a clean `HTTP/2 301` to the `/en/` version with redirect chain count = 1. Resolved `/en/` pages each carry a self-canonical:

| URL | 301 → | Canonical on /en/ |
|---|---|---|
| `/destination/kumbhalgarh/may` | `/en/destination/kumbhalgarh/may` | self ✓ |
| `/destination/vrindavan/may` | `/en/destination/vrindavan/may` | self ✓ |
| `/destination/yercaud/may` | `/en/destination/yercaud/may` | self ✓ |
| `/destination/chakrata/may` | `/en/destination/chakrata/may` | self ✓ |
| `/destination/pondicherry/may` | `/en/destination/pondicherry/may` | self ✓ |

Apr 27 snippet-rewrite descriptions verified live on each `/en/` page (temp range + NakshIQ verdict + state in description).

## GSC URL Inspection results

| # | URL (non-prefixed) | Google index status | User-declared canonical | Google-selected canonical | Last crawl | Action taken |
|---|---|---|---|---|---|---|
| 1 | `/destination/kumbhalgarh/may` | URL is on Google (indexed at non-prefixed) | None | **Inspected URL** (non-prefixed) | Apr 14, 2026 1:55 AM | **Request indexing ✓** |
| 2 | `/destination/vrindavan/may` | URL is not on Google · Page with redirect | None | **`/en/destination/vrindavan/may`** ✓ | Apr 18, 2026 5:08 AM | None — already consolidated |
| 3 | `/destination/yercaud/may` | URL is not on Google · Page with redirect | None | **`/en/destination/yercaud/may`** ✓ | Apr 20, 2026 10:22 AM | None — already consolidated |
| 4 | `/destination/chakrata/may` | URL is not on Google · Page with redirect | None | **`/en/destination/chakrata/may`** ✓ | Apr 18, 2026 9:03 AM | None — already consolidated |
| 5 | `/destination/pondicherry/may` | URL is not on Google · Page with redirect | None | **`/en/destination/pondicherry/may`** ✓ | Apr 20, 2026 10:19 AM | None — already consolidated |

**Why Kumbhalgarh hasn't consolidated:** Googlebot last visited the non-prefixed URL on Apr 14, before it could see the redirect+canonical signals at their current state. Since the page was indexed at the non-prefixed URL and Google hasn't re-crawled, the Google-selected canonical is still the inspected (non-prefixed) URL. The other 4 had Apr 18-20 crawls — late enough to pick up the redirect signal.

**Why request indexing is the right nudge:** Google confirmed "URL was added to a priority crawl queue." On the next crawl, Googlebot will hit the 301 → `/en/` redirect, see the self-canonical there, and consolidate the index entry the same way it did for vrindavan/yercaud/chakrata/pondicherry.

**Note on user-declared canonical = "None":** This appears even on the consolidated 4 URLs. Google reports the user-declared canonical as "None" because the **non-prefixed URL itself doesn't ship a canonical tag** — it ships a 301 redirect. The canonical is on the destination `/en/` page. Google figures this out via the redirect resolution, which is fine. No action needed.

## Performance check (28-day window, ending Apr 26 due to GSC lag)

Site-wide totals:
- Total clicks: **155** (28d) · **129** (7d, Apr 20–26)
- Total impressions: **63.2K** (28d) · **54.4K** (7d)
- Avg CTR: **0.2%** (both windows)
- Avg position: **11** (28d) · **10.7** (7d)

Trend: a sharp inflection around Apr 17–18 — clicks went from ~5/day to ~35/day by Apr 25–26, with impressions rising in lockstep. **83% of the 28-day clicks landed in the last 7 days.** This is rising-rankings signal, not the snippet rewrite (which only deployed Apr 27).

**Snippet-rewrite CTR uplift status: NOT YET MEASURABLE.**
GSC's ~3-day data lag means latest available data is Apr 26 — the day before the rewrites went live. Of the 6 target queries from the task brief:

- `vrindavan temperature in may` — not in top-100 by impressions (any window)
- `yercaud weather in may` — appears as `yercaud weather may` in top 10 (1 click / 33 impressions / 3.0% CTR, 7d)
- `chakrata temperature in may` — not in top results
- `kanatal in may` — not in top results
- `pondicherry weather in may` — not in top results
- `darjeeling june weather` — not in top results

These queries either don't have meaningful impression volume yet, or are sitting outside the top-N display. Recommend re-checking after May 2 (Apr 30 + Apr 29 + Apr 28 data should be in by then) and ideally May 4–5 for a clean before/after on the snippet rewrites.

Top-impressions queries in the 7d window for context (none of them are the snippet-rewrite targets):

| Query | Clicks | Impressions | CTR |
|---|---|---|---|
| tungnath temperature in may | 1 | 99 | 1.0% |
| landour | 1 | 73 | 1.4% |
| lambasingi in may | 1 | 46 | 2.2% |
| chitrakoot parikrama distance | 1 | 43 | 2.3% |
| dhanaulti temperature in may | 1 | 37 | 2.7% |
| nubra valley temperature in may | 1 | 33 | 3.0% |
| yercaud weather may | 1 | 33 | 3.0% |
| ranikhet weather in june | 1 | 31 | 3.2% |
| ziro valley in may | 1 | 28 | 3.6% |
| bir billing temperature in may | 1 | 27 | 3.7% |

## What to do next (suggested follow-ups)

1. **Re-check May 2–5** for post-Apr-27 CTR data. By then, GSC will have 5–8 days of post-deploy data on the same queries.
2. **Re-inspect Kumbhalgarh in 3–5 days** to confirm the priority-crawl request was honored and Google-selected canonical flipped to `/en/`.
3. **Pre-existing pending task** (CLAUDE.md) "GSC URL Inspection for top 5 non-prefixed URLs" → can now be marked complete in the ledger, with the 1 outstanding nudge documented.

## Data accuracy notes

- Task brief said `taneja.ashish5@gmail.com` doesn't have direct access. The actual Chrome session was already authenticated to nakshiq.com property — no auth blocker.
- All 5 non-prefixed URLs were inspected interactively in URL Inspection (live tool); 1 indexing request was submitted. Quota usage: 1 of ~10/day.
- Performance data lag: GSC populates daily metrics with a ~3-day delay; today (Apr 29) shows data through Apr 26.
