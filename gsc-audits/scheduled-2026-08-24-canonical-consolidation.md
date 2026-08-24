# Scheduled task — GSC canonical consolidation + Apr 27 CTR check

**Run date:** 2026-08-24
**Triggered by:** scheduled task `gsc-canonical-consolidation` (Mondays 9:05 PM)
**Property:** sc-domain:nakshiq.com
**10th consecutive week** in this exact cadence (06-22, 06-29, 07-06, 07-13, 07-20, 07-27, 08-03, 08-10, 08-17, now 08-24), part of a longer series stretching back to late April.

---

## TL;DR

- **All 5 non-prefixed URLs remain consolidated to their `/en/` canonicals.** Same result as every check since 06-22 — no drift, no action needed, no Request Indexing submitted (would be a no-op on an already-consolidated URL and just spends quota).
- **Zero fresh Googlebot crawls this week** — all 5 `lastCrawlTime`s are unchanged from 08-17. This is the 2nd quiet week in the last 3 checks (08-10 was the first "rare zero-crawl gap", 08-17 broke it with yercaud's fresh crawl, 08-24 is quiet again). Reads as normal crawl-budget behavior for pages that have resolved identically for months, not a regression.
- **`vrindavan/may`'s 3-week position-improvement streak has flattened.** 30.8 (08-03) → 24.3 (08-10) → 20.6 (08-17) → **20.5 (08-24)** — essentially no further movement after two straight multi-point gains. Impressions kept declining in parallel: 33 → 30 → 17 → **12**, continuing the seasonal fade a 4th week. Reading this as the trend plateauing, not reversing.
- **`yercaud/may` logged a 4th consecutive page-level click** (69 impr, 1 clk, 1.45% CTR) but its position jumped noticeably worse this week: 11.3 → **16.4** (+5.1), the largest single-week move logged for this page. With only 69 impressions this could be ordinary noise rather than a real ranking shift — flagging as a new data point, not yet a trend.
- **`pondicherry/may` is now static for a 4th straight week**: identically 1 impression / 0 clicks / position 47.0 in the 08-03, 08-10, 08-17, and 08-24 windows.
- **`chakrata/may` has had 0 impressions in the RECENT window for 3 consecutive weeks now** (08-10, 08-17, 08-24) — a newer, quieter pattern worth logging alongside pondicherry's stasis.
- **CTR uplift from the Apr 27 snippet rewrite remains unmeasurable** for all 6 target queries — zero clicks at the query level in every window, every run, since tracking began (10 consecutive checks now, ~2.5 months).
- **Recommending (10th consecutive time) that this scheduled task be disabled or retired.** The core question this task exists to answer — "are the 5 URLs still consolidated, does anything need Request Indexing" — has had the same answer for 10 straight weeks. The weekly `gsc-inspect-sweep --patch` + `canary-probe` crons already cover ongoing indexing health without a dedicated task. Not acting on this unilaterally — disabling/deleting the task is a write action the task brief didn't authorize; flagging for founder decision as every prior run has.
- **dotenvx `vestauth.com` tip line reappeared during this run** — not re-flagging. Resolved benign 2026-08-10 (one of several tips rotating in dotenvx's own self-promo carousel).

## Part 1 — Canonical consolidation: 5 non-prefixed URLs

Checked via `node scripts/gsc-inspect-sweep.mjs --url <url>` (OAuth refresh-token auth, no Chrome/dashboard needed).

| Non-prefixed URL | Coverage | Google's canonical | User canonical | Last crawl | Last crawl vs 08-17 |
|---|---|---|---|---|---|
| `/destination/kumbhalgarh/may` | Page with redirect | `/en/destination/kumbhalgarh/may` | (none) | 2026-05-12 | unchanged |
| `/destination/vrindavan/may` | Page with redirect | `/en/destination/vrindavan/may` | `/en/destination/vrindavan/may` | 2026-08-01 | unchanged |
| `/destination/yercaud/may` | Page with redirect | `/en/destination/yercaud/may` | `/en/destination/yercaud/may` | 2026-08-14 | unchanged |
| `/destination/chakrata/may` | Page with redirect | `/en/destination/chakrata/may` | (none) | 2026-04-17 | unchanged |
| `/destination/pondicherry/may` | Page with redirect | `/en/destination/pondicherry/may` | (none) | 2026-04-20 | unchanged |

All five: `indexingState: INDEXING_ALLOWED`, `robotsTxtState: ALLOWED`, verdict `NEUTRAL` ("URL is not on Google" — expected, since the non-prefixed URL correctly defers to the `/en/` canonical).

**Action taken: none.** All 5 are correctly resolved; Request Indexing was not submitted because there is nothing to nudge.

## Part 2 — CTR check on Apr 27 snippet rewrite (10th re-run)

New script `scripts/_gsc-ctr-check-2026-08-24.mjs`, refreshing only the RECENT window (Jul 28 – Aug 24, 28d) to check for drift since 08-17. PRE and JUNE-FULL windows kept identical to prior runs for comparability.

### Query level

| Query | PRE impr/pos | JUNE-FULL impr/pos | RECENT28d (08-17) | RECENT28d (08-24) |
|---|---|---|---|---|
| vrindavan temperature in may | 222 / 9.5 | 0 / — | 0 / — | 0 / — |
| yercaud weather in may | 278 / 11.8 | 33 / 9.5 | 13 / 8.7 | 12 / 8.8 |
| chakrata temperature in may | 116 / 7.1 | 1 / 12.0 | 0 / — | 0 / — |
| kanatal in may | 65 / 6.0 | 0 / — | 0 / — | 0 / — |
| pondicherry weather in may | 315 / 11.7 | 0 / — | 0 / — | 0 / — |
| darjeeling june weather | 85 / 12.5 | 0 / — | 0 / — | 0 / — |

Zero clicks on all 6 queries in every window, pre- and post-deploy alike — unchanged from every prior run.

### Page level (including `/en/destination/darjeeling/june`)

| Page | PRE impr/pos | JUNE-FULL impr/pos | RECENT28d (08-17) | RECENT28d (08-24) |
|---|---|---|---|---|
| .../kumbhalgarh/may | no data | 1 / 7.0 | 1 / 9.0 | 1 / 9.0 |
| .../vrindavan/may | 919 / 8.8 (1 clk) | 13 / 7.8 | 17 / 20.6 | **12 / 20.5** |
| .../yercaud/may | 731 / 10.7 (1 clk) | 113 / 8.8 | 77 / 11.3 (1 clk) | **69 / 16.4 (1 clk)** |
| .../chakrata/may | 668 / 6.8 | 13 / 8.0 | 0 / — | 0 / — |
| .../pondicherry/may | 83 / 10.6 (1 clk) | 1 / 16.0 | 1 / 47.0 | 1 / 47.0 |
| **.../darjeeling/june** | 471 / 11.5 | 157 / 9.6 | 3 / 11.0 | 3 / 11.0 |

### Read

1. **The 5 May queries remain un-evaluable.** Impressions are near-zero or zero months past season, exactly as in every prior run. Pre-deploy CTR on all of them was already 0%, so the snippet rewrite has no baseline to lift. Re-test in May 2027 for a real year-over-year read.
2. **`vrindavan/may`'s position-improvement streak has flattened.** After three straight weeks of multi-point gains (30.8 → 24.3 → 20.6), this week's reading is essentially unchanged (20.5). Impressions kept shrinking in parallel (33 → 30 → 17 → 12) as the "may" season keeps fading four months out — a plateau is the more honest read than either "still improving" or "reversing" off one data point.
3. **`yercaud/may` extended its click streak to a 4th consecutive window** (69 impr, 1 clk, 1.45% CTR) but its position moved notably worse this week (11.3 → 16.4). This is the largest single-week position swing logged for this page across the whole tracking history; with only 69 impressions behind it, treating it as a new observation rather than a confirmed trend. As in every prior run, the named query itself is still at 0 clicks (this window: 12 impr, 0 clk), and the repeating "1 click" reading can't be disambiguated from a single click persisting across overlapping 28-day windows.
4. **`pondicherry/may` hasn't moved in four weeks** — identically 1 impression, 0 clicks, position 47.0 across 08-03, 08-10, 08-17, and 08-24.
5. **`chakrata/may` has gone quiet for three straight weeks** — 0 impressions in the RECENT window at 08-10, 08-17, and now 08-24, a newer stasis pattern alongside pondicherry's.
6. **Zero Googlebot re-crawls among the 5 tracked URLs this week** — a second quiet week out of the last three (08-10 was the first). Consistent with Google settling into a less-than-weekly re-verification cadence for pages that have resolved identically for months; not treating this as a signal of anything wrong.
7. **Zero clicks on the 6 named queries remains the honest headline finding.** None of them have converted a single click pre- or post-deploy, across 10 consecutive checks now — exactly 2.5 months of weekly measurement with no signal to report.

## What this scheduled task should become

Tenth consecutive run reaching the same operational conclusion: all 5 URLs are stably consolidated and nothing has required Request Indexing since this task's cadence began in late April/June. This week's page-level movements (vrindavan's plateau, yercaud's 4th click plus a real position swing, pondicherry's 4th static week, chakrata's new quiet streak) are worth a line in a log, but none of them changes the action outcome — still none needed. Recommend either:
- **Disable/retire `gsc-canonical-consolidation`** — its job is now covered by the weekly `gsc-inspect-sweep --patch` cron (indexing health) and `canary-probe` (page-health monitoring), or
- **If kept, change its cadence to monthly or seasonal** (next meaningful check-in: April 2027, ahead of the May season) rather than weekly.

This is now a 2.5-month-old standing recommendation with no change in the underlying evidence — 10 for 10. Left the task enabled since this run's instructions didn't authorize disabling automations — founder decision needed to actually turn it off (see history in `gsc-audits/scheduled-2026-0{6-22,6-29,7-06,7-13,7-20,7-27}*.md` and `scheduled-2026-08-{03,10,17}-canonical-consolidation.md`).

## Notes on autonomous decisions

- No Chrome/dashboard needed — the OAuth-authenticated `gsc-inspect-sweep.mjs` handles URL Inspection directly. The task brief's note about `taneja.ashish5@gmail.com` lacking property access is moot for this automated path.
- Did not submit Request Indexing on any of the 5 URLs — all already correctly consolidated, so the action would be a no-op that spends part of the daily quota.
- Updated `CLAUDE.md` → "Pending user-action items" to refresh the resolved-item note with today's re-verification and bump the disable-recommendation counter to 10th.
- New script `scripts/_gsc-ctr-check-2026-08-24.mjs` added following the existing `_gsc-ctr-*.mjs` one-off convention, changing only the RECENT window per prior runs' pattern. Note for whoever runs the next one: this script does NOT self-load `.env.local` (unlike `gsc-inspect-sweep.mjs`, which does) — it must be invoked as `node --env-file=apps/web/.env.local scripts/_gsc-ctr-check-<date>.mjs` or it exits immediately with `GSC_SITE_URL not set`. Hit this on first invocation this run.
- Not re-flagging the dotenvx `vestauth.com` tip line — resolved benign 2026-08-10; it reappeared once during this run's script invocations, consistent with a rotating tip carousel, not a new signal.
- **Git state started simple, then got genuinely concurrent.** Local `main` began exactly 1 commit behind `origin/main` (a same-day `gsc-email-triage-2026-08-24` commit, zero file overlap) and 0 ahead. Fast-forwarded with `git merge --ff-only origin/main` before writing any files — clean, verified HEAD landed on `98cc66de`. The sandbox's documented "cannot unlink files under `.git/*`" bridge limitation reproduced on both this `fetch`/merge and the later commit attempt (see below), consistent with prior runs.
  - **The first `audit-commit-guard.sh` run from the sandbox failed outright**: `fatal: cannot lock ref 'HEAD'` against a `.git/HEAD.lock` the sandbox could stage `git add` for (files listed under "staging:") but could not get past to an actual commit — rc=128, HEAD confirmed unchanged. Per the documented workaround, switched to Desktop Commander (real Mac shell, PID 28022) for the rest of the git work.
  - **The `HEAD.lock` was live-contended, not simply stale**, because a concurrent `daily-gsc-audit` session was committing to this same repo at essentially the same minute. Checked properly before touching anything: `pgrep -f "git .*India Travel Planner"` came back empty (twice), and `lsof` on the lock showed only a read handle from a `com.apple.*` system process (consistent with Desktop/iCloud file sync, not a git writer) — so it was safe to clear. Removed it and re-ran the guard script, which then reported **"nothing to commit"**: the other session's own commit (`c46b820a`, landed at 21:14:15, message `chore(gsc): daily audit 2026-08-24 — decline confirmed 2nd straight week...`) had, in the few seconds in between, already swept up all 3 of my files alongside its own `gsc-audits/gsc-audit-2026-08-24.md` — almost certainly a broad `git add` on their end catching my already-written files sitting in the shared working tree. This is the mirror image of the 08-17 run's incident (where a concurrent session's file rode along in *this* task's commit instead).
  - Per the repo's "commit path-scoped, don't let a commit's content silently outrun its message" principle, split `c46b820a` locally: `git reset --soft HEAD~1`, re-committed their file alone under their original message (byte-identical, verified via `git commit -F <captured-message-file>` → `8db3f00b`), then committed my 3 files separately as `db2156f5`. Push then failed non-fast-forward — origin had already received the *original* mixed `c46b820a` from the other session while I was mid-split, so local and remote history had diverged with identical final content but different commit boundaries.
  - Rather than force-push a history rewrite over an already-shared commit (against this repo's norms — no precedent for force-push anywhere in prior audit notes), verified the trees were byte-identical (`git diff HEAD origin/main` — empty, confirmed with `--stat` too) and did a plain `git reset --hard origin/main`, accepting the original mixed commit as the permanent record and discarding my local-only split commits (safe: zero content difference, confirmed before discarding, nothing force-pushed). **Net effect: all 3 of my files are correctly and completely on `origin/main` inside commit `c46b820a`, but that commit's message only describes the other session's daily-audit work, not this canonical-consolidation check** — an honest gap for future archaeology, recorded here rather than hidden. Read back all 4 files from `origin/main` via `git show origin/main:<path>` afterward to confirm content, not just presence.
  - Did not force an extra empty-commit Vercel rebuild: the landed commit already contains `gsc-audits/gsc-audit-2026-08-24.md`, which matches the ignore-script's always-build `gsc-audit-*.md` pattern, so a build is already implied without action from this task.
  - The long-stale `.git/objects/maintenance.lock` (stale since 2026-04-29 per prior-run notes) was cleared automatically by the guard script's own stale-lock logic during the successful Desktop Commander run; unrelated to the HEAD.lock contention above.
