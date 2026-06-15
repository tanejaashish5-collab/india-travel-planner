🔍 Nakshiq Autoposter Daily Audit — 2026-06-14 (evening run)

_Run Sun 14 Jun 2026, 11:02 PM AEST (13:02 UTC). All times AEST (UTC+10). Saved as `-evening` to preserve this morning's `audit_2026-06-14.md` (12:02 PM AEST run), per the existing two-runs-per-day convention._

## Data source

`gh` CLI is **not available in this run environment** (no binary, no token), so GitHub Actions run history could not be queried directly. The local checkout's `autoposter.log` is stale (ends 06-08). Findings are read from the authoritative runner artifacts on **`origin/autoposter-state`**, which the runner commits after every run. State branch HEAD: **`8c6c68ed`** (committed 2026-06-14 08:28:32 UTC = 6:28 PM AEST).

## ⚠️ Schedule note (carried from prior audits)

The 11-slot schedule in the task file is **stale** — it predates the **2026-05-16 cadence cut**. Live workflow crons now run only:

| Slot | Cron (UTC) | AEST target | Cadence |
|------|-----------|-------------|---------|
| Morning feed (IG+FB) | `17 3 * * *` | 1:17 PM | daily |
| YT Short 1 (YT+IG) | `17 4 * * *` | 2:17 PM | daily |
| YT Short 2 (YT+IG) | `47 11 * * *` | 9:47 PM | daily |
| Evening feed (IG+FB) | `17 14 * * *` | 12:17 AM | daily |
| Analytics sync | `17 18 * * *` | 4:17 AM | daily |
| Engagement pull | `17 21 * * *` | 7:17 AM | daily |
| Weekly digest | `17 22 * * 0` | Sun 8:17 AM | Sundays |

**Tourist map, Canva visual, infographic, and all reel slots are PAUSED (since 2026-05-16).** Their absence is expected — not flagged as gaps.

## 📊 Runs — June 14 cycle: 2 content runs observed on state branch (0 failed, 0 push errors)

State branch advanced d55d2097 → 8c6c68ed since this morning's audit, confirming the runner is live and committing normally. No `error` / `rejected` / `failed to push` / traceback lines in the June 14 log.

## Content Published Today (AEST)

| Slot (AEST target) | Actual | Status |
|---|---|---|
| Morning feed — 1:17 PM | 6:01 PM (+4.7h) | ❌ **MISSED** — `confidence_intel` picked for **Sangla Valley (0 card rows)** → "No content generated" on both IG & FB. No feed post went out. |
| YT Short 1 — 2:17 PM | 6:25 PM (+4.1h) | ✅ YouTube published (`@naksh-iq`, platform `mB8-KE_Ldes`, fmt nakshiq_score) · ⚠️ Instagram **queued-unconfirmed** (`9MfjQ`, 40s poll timeout) |
| YT Short 2 — 9:47 PM | not yet recorded | ⏳ **Pending** — state branch last committed 6:28 PM AEST; slot is ~1.3h past target, within the observed 1.7–4.8h GHA delay band. Not yet a confirmed miss. |
| Evening feed — 12:17 AM (Jun 15) | — | ⏭️ Not due (future) |
| Analytics sync / Engagement pull | — | ⏭️ Not due (future) |
| Weekly digest — Sun 8:17 AM | — | ⏳ Due 22:17 UTC; not yet in window at run time |
| Tourist map / Canva / infographic / reels | — | ⏸️ Paused by design |

## Issues Found

1. **🔴 Morning feed MISSED — 2nd consecutive day (recurring, not transient).** Same root cause as June 13 (Lolab Valley): the format picker assigned the data-dependent format `confidence_intel` to a destination with **0 confidence-card rows** (June 14 = Sangla Valley), then skipped the entire IG+FB post instead of falling back to an eligible destination. The day's primary feed post did not publish two days running. This is now a predictable pattern and will keep recurring until fixed in code.
2. **🟡 IG queued-unconfirmed (`9MfjQ`, YT Short 1).** Outstand accepted; platform confirmation polling exhausted in 40s. Per the documented known-pattern, IG-unconfirmed warnings are usually false alarms (the post lands; confirmation lagged the window). Low priority — spot-check it rendered on @nakshiq.
3. **🟡 Chronic GHA delays persist.** Morning feed and YT Short 1 both fired ~4–4.7h after their cron targets (6:01 PM / 6:25 PM vs 1:17 PM / 2:17 PM). Consistent with the multi-day delay pattern; pushes posts outside intended IG windows.
4. **No git-push failures.** State branch commits continuously through 08:28 UTC; the account-allowlist hotfix is working (log correctly ignores the foreign shared-workspace account `@chanakyasutra-t8o`).

## Actions Taken

- **None auto-executed.** Re-trigger via `gh workflow run` is **not reachable** in this environment (no `gh` binary, no token). This is the same constraint noted in every recent audit.
- **Re-trigger judgment (would not auto-fire even if `gh` were available):** the morning-feed miss is a **content-data bug, not a transient failure** — a blind re-fire would re-hit the same 0-row skip and/or post off the 2-posts/day cadence. The YT Short 2 slot is **delayed, not confirmed-missed**, so re-triggering it now risks a duplicate when the late cron lands. Neither warrants an autonomous write.

## Recommended (founder, from your Mac)

1. **Fix the root cause** (this is the second day — priority): gate `confidence_intel` (and other data-dependent formats) on `confidence_card rows > 0`, or add a destination fallback so a 0-data pick doesn't kill the whole morning feed. The picker keeps selecting `confidence_intel` (50% vs 20% target) and landing on 0-row destinations.
2. If you want today's missed morning feed backfilled manually: `cd ~/Desktop/India\ Travel\ Planner && gh workflow run autoposter.yml` (no `-f mode`, no `-force`) — but it'll post off-cadence and may re-skip without the fix above.
3. Spot-check IG post `9MfjQ` (YT Short 1) actually rendered on @nakshiq.
4. Confirm YT Short 2 (9:47 PM target) lands in tomorrow's morning audit; if still absent by then, it's a genuine cron skip to recover.

## ⚠️ 2 issues (morning feed missed — 2nd day, needs code fix · chronic GHA delay) + 1 known-pattern warning (IG unconfirmed) + 1 pending slot (YT Short 2). Infra healthy, runner committing, allowlist fix confirmed.
