🔍 Nakshiq Autoposter Daily Audit — 2026-06-17 (evening / 2nd run)

_Run Wed 2026-06-17 ≈ 23:01 AEST (13:01 UTC). All times AEST (UTC+10, no DST in June), UTC in parens._
_Data current through `origin/autoposter-state` commit `33d32011` (2026-06-17 09:19 UTC / 7:19 PM AEST)._
_Supplements this morning's `audit_2026-06-17.md` (which closed out the June 16 cycle, written before any June 17 slot had fired)._

## Audit window

This run reviews **today's in-progress cycle: June 17 (UTC)** — the daily slots that have come due by ~13:01 UTC. The later daily slots (YT Short 2, evening feed, analytics, engagement) fire after this audit time and will be covered by the next run. The previous complete cycle (June 16) was fully audited this morning and remains clean — re-confirmed below, no regressions.

> The autoposter dedups and keys "today" by **UTC date**. One UTC posting day spans AEST early-afternoon → next AEST morning.

**Data-source note:** `gh` CLI is **not available** in this run environment (no token in the sandbox), so GitHub Actions history could not be queried directly. Findings are reconstructed from the authoritative artifacts the workflow commits after every run on `origin/autoposter-state` (`autoposter.log`, `state.json`). Run count is inferred from the dated `chore: autoposter state …` commits (one ≈ one successful run). `git` reaches origin fine, so this is ground truth, just one indirection removed.

## ⚠️ Schedule note — the task-file schedule is stale

The schedule block in the audit task file predates the **2026-05-16 cadence cut** (it lists 3 reels/day, tourist-map, canva-visual, standalone infographic). Those standalone crons are **PAUSED until 1k followers** and must never be re-triggered. The live workflow runs only the daily core:

| Slot | AEST | UTC | Cadence |
|------|------|-----|---------|
| Morning feed (IG + FB, + Story) | ~1:17 PM | ~03:17 | daily |
| YT Short 1 (YT + IG cross-post) | ~2:17 PM | ~04:17 | daily |
| YT Short 2 (YT + IG cross-post) | ~9:47 PM | ~11:47 | daily |
| Evening feed (IG + FB, + Story) | ~12:17 AM (+1d) | ~14:17 | daily |
| Analytics sync | ~4:17 AM (+1d) | ~18:17 | daily |
| Engagement pull | ~7:17 AM (+1d) | ~21:17 | daily |
| Weekly digest | Sun ~8:17 AM | Sun ~22:17 | Sun only — N/A today (Wed) |

GitHub Actions start-delay is currently running ~+4.75 h to +6.4 h after each cron — both of today's posts landed inside that drift band, so no slot is late.

## 📊 GitHub Actions (inferred from state commits) — June 17 UTC

2 successful runs so far today, 0 failed, 0 in-progress, 0 git-push errors:
- `963cfb5f` — 08:44 UTC (18:44 AEST) — morning feed run
- `33d32011` — 09:19 UTC (19:19 AEST) — YT Short 1 run

No `ERROR` / `Traceback` / `rejected` / `failed to push` lines anywhere in the June 15–17 log.

## Content published — June 17 (UTC) cycle

| Slot | Status | Detail |
|------|--------|--------|
| Morning feed — IG | ✅ Published | `pangong-lake` · v2_myth_bust_oneline · 18:43 AEST (08:43 UTC) · Outstand=HO3h5 |
| Morning feed — FB | ✅ Published | `nubra-valley` · v2_myth_bust_oneline · 18:43 AEST (08:43 UTC) · Outstand=ILtdX |
| Morning Story — IG | ⚠️ Unconfirmed | Story format selected (collection_spotlight) but **no "✅ Story live" line** and `posted_today.m8EAd_story` still = 06-16. See watch-item below. |
| YT Short 1 — YT @naksh-iq | ✅ Published | `har-ki-doon` · nakshiq_score · 19:19 AEST (09:19 UTC) · Outstand=QFely · Platform=DJ01dJ-MQDE |
| YT Short 1 — IG cross-post | ✅ Published | `har-ki-doon` · 19:19 AEST (09:19 UTC) · Outstand=lp8BK |
| YT Short 2 | ⏳ Not yet due | Cron ~21:47 AEST (11:47 UTC) + drift — fires after audit time |
| Evening feed (IG + FB + Story) | ⏳ Not yet due | Cron ~00:17 AEST +1d (14:17 UTC) + drift |
| Analytics sync | ⏳ Not yet due | Cron ~04:17 AEST +1d (18:17 UTC) |
| Engagement pull | ⏳ Not yet due | Cron ~07:17 AEST +1d (21:17 UTC) |

By-design, not flagged: `[youtube/@naksh-iq] Skipping feed post` (YT takes video only); `WARNING Ignoring non-NakshIQ account … (xS5s8)` (chanakyasutra — shares the Outstand workspace, deliberately ignored, not counted); caption-sanitizer stripping banned tags (#IncredibleIndia/#India).

## Issues found

**1. Morning Story leg silently dropped (LOW confidence — watch).** June 17 morning selected `Story: collection_spotlight` but published no story (no "✅ Story live", `m8EAd_story` unchanged from 06-16). This is **not** a reel-day by-design skip — the feed post was an image (v2_myth_bust_oneline), so the `not use_video` Story gate should have allowed it. It's intermittent and recurring: **June 15 morning also dropped its story** (format chosen, no publish), while June 16 published stories on both runs. No error line is emitted — the story step appears to bail silently when its media/data doesn't resolve, mirroring the known "morning-feed no-fallback silent skip" pattern. Feed posts (the primary deliverable) are unaffected. Not re-triggerable from the audit (no story-only mode; the active-content re-trigger guidance doesn't cover it; window has passed). **Recommend:** add a log line when the story leg skips (so it stops being silent), and confirm against `analytics.json` reconciliation before treating any single instance as a true miss.

**2. `gh` CLI unavailable in the run environment.** GitHub Actions API couldn't be queried directly; used commit-inference instead (reliable here). Not a posting issue — noting for the operator in case direct Actions visibility is wanted.

## Actions taken

**None — and none were warranted.** Every slot due by audit time published successfully; the remaining daily slots aren't due yet. The morning-story watch-item has no re-trigger path and its window has passed. Paused standalone crons (reel / tourist-map / canva / infographic) are never re-triggered. `gh` is unavailable regardless. No `--force` was or would be used.

## June 16 (UTC) — re-confirmation, no regression

Full clean cycle: morning feed IG+FB **+ Story** (09:09–09:10 UTC), YT Short 1 (09:42), YT Short 2 (14:38), a 3rd capped YT run (16:17, correctly published nothing — 2/day YT cap), evening feed IG+FB **+ Story** (18:45), analytics/engagement synced (`analytics.json` last_sync 21:23 UTC, 469 posts tracked). Zero errors.

---

⚠️ **1 low-confidence watch-item** (morning Story leg silently dropped — recurred 06-15 & 06-17; primary feed + YT posts all clean). No failures, no missed due slots, no git-push problems, no action required.
