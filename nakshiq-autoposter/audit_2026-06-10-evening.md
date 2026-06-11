# 🔍 Nakshiq Autoposter Daily Audit — 2026-06-10 (evening)

**Generated:** Wed 2026-06-10 11:05 PM AEST · covers **today's AEST calendar day** (Wed 12:00 AM → 11:05 PM AEST = 2026-06-09 14:00 → 2026-06-10 13:05 UTC).
**Verdict:** ✅ **All clear.** 7/7 GH Actions runs succeeded, every live slot published, no push failures, no re-triggers needed. 1 new self-healed warning to watch (FB carousel 400).

**Sources:** `origin/autoposter-state` tip `b49a7e15` (2026-06-10 08:23 UTC) — fresh `autoposter.log` (UTC timestamps) + `state.json`; **GH Actions API via `gh` (Desktop Commander)** — unavailable in this morning's audit, available now; live crons from `origin/main:.github/workflows/autoposter.yml`.

> Complements [audit_2026-06-10.md](audit_2026-06-10.md) (morning run, Jun 9 cycle through 8:55 AM AEST). This evening pass adds the Wed daytime slots + real Actions history.

---

## 📊 GitHub Actions: 7 runs in window (7 succeeded, 0 failed)

`gh run list` (UTC): Jun 9 — 14:03, 16:48, 20:20, 22:50 · Jun 10 — 07:18, 08:16 (+ Jun 9 13:26 workflow_dispatch). All `success`. The "Failed to push state" strings visible in `gh run view --log` are the workflow's **script source echoed by the runner**, not fired errors — every run is green and a state commit landed after each posting run (22:55 UTC, 07:26, 08:23). **0 real push failures.**

---

## ✅ Content published today (live post-2026-05-16 schedule · AEST = UTC+10)

| Slot (live cron) | Due AEST | Ran AEST | Status |
|---|---|---|---|
| **YT Short (Jun 9 slot-2, delayed)** | — | 12:07 AM | ✅ IG cross-post **sinthan-top** `4ol9i`; YT ⏭️ correctly dedup-skipped (2/day cap) |
| **Evening post → infographic** · `17 14 * * *` | 12:17 AM | 2:52 AM | ✅ Variety picker → **infographic** carousel (festivals/topo: guptkashi, hemkund-sahib, kedarnath): IG ✅ + FB ✅ |
| **Analytics sync** · `17 18 * * *` | 4:17 AM | 6:25 AM | ✅ Ran (ledger: published 342 / failed 49 lifetime) |
| **Engagement pull** · `17 21 * * *` | 7:17 AM | 8:50 AM | ✅ Ran — internal, logs outside `autoposter.log` (expected); state committed 8:55 AM |
| **Morning post** (IG+FB) · `17 3 * * *` | 1:17 PM | 5:22 PM | ✅ IG **pangong-lake** `DtxZo` (v2_cost_vs_feeling) — "queued unconfirmed" = known false-positive, entry in post_log · FB **nubra-valley** `AKJe7` via single-image fallback (see Issue 1) · **IG Story ✅ gurez-valley live** `17871053460682306` |
| **YT Short slot 1** · `17 4 * * *` | 2:17 PM | 6:20 PM | ✅ YT **doodhpathri** `mkD9d` (nakshiq_score) + IG cross-post `DtXAo` (unconfirmed-warning pattern, in post_log) |
| **YT Short slot 2** · `47 11 * * *` | 9:47 PM | ⏳ not yet (11:05 PM) | **PENDING** — GHA delay for this slot ran 1–3h all week (landed 10:52 PM–12:41 AM). Dedup (`GAh5p_yt_short_count=1`) ensures the late run still publishes. Verify in tomorrow's audit. |

**Paused by design (2026-05-16 cadence cut)** — reel slots, reel-map, visual slot (tourist map / canva / moat / pomelli), flow story: intentionally dark, not counted missing, not re-triggered. Tourist map also wouldn't be due Wed even under the old schedule.

**State cross-check:** `posted_today` = feed `m8EAd`/`PdMu0` 2026-06-10 ✓ · `GAh5p_yt_short_count`=1 (Jun 10) ✓ · `m8EAd_story` 2026-06-10 ✓ · infographic keys stamped Jun 9 ✓.

---

## ⚠️ Issues found — 0 blocking

1. **NEW — FB rejected the 5-slide morning carousel** (400 "Missing or invalid image file" on photo upload, post `PjUi0`). First occurrence since the log began (May 26). **Self-healed:** poster retried as single cover image and published (`AKJe7`). Watch tomorrow — if it recurs, a slide image is likely oversized/invalid for FB's photo endpoint.
2. **IG "queued unconfirmed" ×2** (morning `DtxZo`, short `DtXAo`) — matches the established false-positive pattern (Jun 6/7/8/9, all were live); both have post_log entries. Standing fix unchanged: lengthen the IG poll window.
3. **Resolved from morning audit:** the "story not posted" flag — today's morning run published the Story (gurez-valley, ✅ live, ID `17871053460682306`); `m8EAd_story` now stamped 2026-06-10.
4. **Cosmetic:** infographic pipeline writes dedup keys but no `post_log` entries.

**Git push health:** ✅ clean (see Actions section).

---

## 🛠️ Actions taken

**None — no re-triggers.** 0 missing, 0 failed. YT Short 2 is inside its normal GHA delay envelope (premature `gh workflow run` would waste a render; dedup would govern anyway). Paused modes correctly left dark per the cadence-cut strategy. No `-force` used (never is).

**Follow-ups for tomorrow:** (1) confirm YT Short 2 landed late tonight with a non-doodhpathri destination; (2) check for FB carousel 400 recurrence.

## 📋 Standing recommendation

The scheduled-task definition still carries the pre-2026-05-16 slot list (3 reels, tourist map, canva, 3 YT shorts, old AEST times) — flagged in every audit. Updating it to the live 4-content + 3-internal schedule would retire this recurring caveat.

✅ **All clear — 7/7 runs, 0 failures, 1 self-healed warning to watch.**
