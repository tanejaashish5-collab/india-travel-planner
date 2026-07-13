# Scheduled task — GSC canonical consolidation + Apr 27 CTR check

**Run date:** 2026-06-29
**Triggered by:** scheduled task `gsc-canonical-consolidation`
**Property:** sc-domain:nakshiq.com

---

## Part 1 — Canonical consolidation: 5 non-prefixed URLs

All 5 URLs were checked via the URL Inspection API
(`node scripts/gsc-inspect-sweep.mjs --url <url>`). **No "Request Indexing"
action needed on any of them** — every one already has Google's chosen
canonical pointing at the `/en/` prefixed version, identical to the
hemkund-sahib pattern resolved on 2026-06-10.

| Non-prefixed URL | Coverage | Google's canonical | Last crawl |
|---|---|---|---|
| `/destination/kumbhalgarh/may` | Page with redirect | `/en/destination/kumbhalgarh/may` | 2026-05-12 |
| `/destination/vrindavan/may` | Page with redirect | `/en/destination/vrindavan/may` | 2026-04-17 |
| `/destination/yercaud/may` | Page with redirect | `/en/destination/yercaud/may` | 2026-06-20 |
| `/destination/chakrata/may` | Page with redirect | `/en/destination/chakrata/may` | 2026-04-17 |
| `/destination/pondicherry/may` | Page with redirect | `/en/destination/pondicherry/may` | 2026-04-20 |

All five report `indexingState: INDEXING_ALLOWED`, `robotsTxtState: ALLOWED`,
verdict `NEUTRAL` ("URL is not on Google" only because it's the
non-canonical) — exactly the desired post-301-consolidation state.

**Conclusion:** consolidation succeeded on all five. The scheduled task's
"Request Indexing" step is no longer needed for this batch and can be
removed from the schedule. Per CLAUDE.md, future per-URL canonical checks
go through `gsc-inspect-sweep.mjs --url <url>`, no dashboard.

## Part 2 — CTR check on Apr 27 snippet rewrite

Ran `_gsc-ctr-rewrite-check-current.mjs` and `_gsc-page-perf-rewrite-check.mjs`
(both created today; the existing `_gsc-ctr-apr27-rewrite-check.mjs` had
hardcoded windows ending Jun 14). Pre-window Mar 30 – Apr 26, post-window
May 31 – Jun 27.

### Query level (the 6 target queries)

| Query | PRE impr / pos | POST impr / pos | Δ |
|---|---|---|---|
| vrindavan temperature in may | 222 / 9.5 | 0 / — | seasonal expiry |
| yercaud weather in may | 278 / 11.8 | 37 / 9.8 | +2.0 positions, 0 clicks |
| chakrata temperature in may | 116 / 7.1 | 1 / 12.0 | seasonal expiry |
| kanatal in may | 65 / 6.0 | 0 / — | seasonal expiry |
| pondicherry weather in may | 315 / 11.7 | 0 / — | seasonal expiry |
| darjeeling june weather | 85 / 12.5 | 0 / — | **unexpected — see below** |

### Page level (5 rewritten pages)

| Page | PRE impr / pos | POST impr / pos |
|---|---|---|
| /en/destination/kumbhalgarh/may | (no data) | 1 / 7.0 |
| /en/destination/vrindavan/may | 919 / 8.8 | 14 / 7.6 |
| /en/destination/yercaud/may | 731 / 10.7 | 110 / 9.0 |
| /en/destination/chakrata/may | 668 / 6.8 | 13 / 8.7 |
| /en/destination/pondicherry/may | 83 / 10.6 | 2 / 22.0 |

### Read

- **The May queries are essentially un-evaluable in late June.** Impressions
  collapsed across the board because these are "destination in may"
  searches that don't run outside May. The right time to re-evaluate the
  May rewrite is May 2027 (year-over-year).
- **Position deltas where measurable are slightly positive on 2 of 4**
  (vrindavan -1.2, yercaud -1.7; chakrata +1.9 worse, pondicherry +11.4
  worse but only 2 impressions = noise). No CTR lift observed; sample
  too small to attribute either way.
- **"darjeeling june weather" with 0 impressions in June is the real
  surprise.** This is in-season and used to rank position ~12.5 with 85
  pre-deploy impressions. Either the page fell out of the top 100 entirely
  or Google's weather widget is satisfying the query without surfacing
  any organic results. Worth a deeper look in the next weekly GSC audit —
  not actionable from this scheduled run.

## Outputs / artifacts

- `scripts/_gsc-ctr-rewrite-check-current.mjs` — fresh-windowed version of
  the Apr 27 query CTR check.
- `scripts/_gsc-page-perf-rewrite-check.mjs` — page-level pre/post
  comparison for the 5 rewritten URLs.

## Notes on autonomous decisions

- Did NOT attempt to "Request Indexing" via UI automation — all 5 URLs are
  already correctly canonical-consolidated, so the action would be no-op
  noise (Search Console rate-limits Request Indexing).
- Did NOT log the seasonal-query "no impressions" as a regression. Flagged
  only `darjeeling june weather` because it's the one in-season query
  that should have data.
- CLAUDE.md item #5 ("GSC URL Inspection for top 5 non-prefixed URLs") can
  now be marked resolved alongside hemkund-sahib.
