# 🔍 Nakshiq Autoposter Daily Audit — 2026-06-08 (evening run)

**Generated:** 2026-06-08 23:05 AEST (Mon) · covers the **2026-06-08 posting cycle, in progress** (morning + YT-Short-1 fired; evening/analytics slots not yet due).
**Verdict:** ⚠️ **1 actionable issue** — Facebook morning feed post **rejected** (FB Graph 500). IG + YouTube all published. No re-trigger fired (see Actions Taken for why).

> **Filename note:** saved as `audit_2026-06-08-evening.md`, NOT `audit_2026-06-08.md`. The latter already exists from this morning's 9:10 AM AEST run and documents the **June 7** cycle (incl. the still-open weekly-digest commit bug). Overwriting it would destroy that record, so this off-cadence evening run gets its own file. (This run fired ~14h after the morning audit and ~10h before the normal next-morning slot.)

**Sources:** `origin/autoposter-state` branch — `autoposter.log` (timestamps **UTC**), `data/post_log.jsonl`, `state.json` (each "chore: autoposter state …" commit = one completed run that pushed state). All times below converted to **AEST = UTC+10** (June = no DST in Sydney).

---

## ⚠️ Methodology / environment caveat (read first)

This scheduled run executed in a **sandboxed Linux environment where the `gh` CLI is not installed and no GitHub token is present.** Task steps that depend on `gh` could not run as written:

- **Step 3 (GH Actions run history):** substituted with the `origin/autoposter-state` commit log + the per-run `autoposter.log` committed to that branch. This reliably shows every run that **completed and pushed state**. Blind spot: a run that crashed *before* its state-commit/log-append would be invisible here — I cannot positively confirm "0 failed runs" the way `gh run list` would. Both runs seen today logged clean `State saved. Run complete.` banners.
- **Step 7 (auto re-trigger via `gh workflow run`):** not executable here. Also not warranted — see Actions Taken.

To get true Actions run-status + re-trigger capability, this audit should run on the Mac where `gh` is authenticated (or a `GH_TOKEN` should be exposed to the sandbox).

---

## 📊 Runs today (from state-branch evidence): **2 completed, 0 push failures**

| # | Run | Start (AEST) | State commit | Result |
|---|---|---|---|---|
| 1 | MORNING (feed + story) | 18:27 | `d62a75c4` 18:29 | ⚠️ partial — IG ✅, FB ❌ |
| 2 | YT SHORT slot 1 | 19:06 | `bf554a94` 19:10 | ✅ clean |

Both state commits landed on `origin/autoposter-state` → **no git push rejections.**

---

## Content Published — 2026-06-08 cycle (active schedule)

| Slot | Target (AEST) | Actual (AEST) | Status |
|---|---|---|---|
| Morning IG feed | 6:30–9:00 PM | 6:28 PM — **pangong-lake** (`v2_cost_index_handwritten`) · Outstand `avgkb` · Platform `17934660036278353` | ✅ Published |
| Morning IG Story | with feed | 6:29 PM — **hemkund-sahib** (`festival_alert`) · ID `17990637902808838` | ✅ Published |
| Morning FB feed | with feed | 6:29 PM — **nubra-valley** (`v2_cost_index_handwritten`) · Outstand `nLVdl` | 💥 **REJECTED** |
| YT Short slot 1 (YouTube) | afternoon | 7:09 PM — **hemkund-sahib** (`nakshiq_score`, music `fast-1085`) · Outstand `VdvjN` · Platform `gtq0tOlbjBw` | ✅ Published |
| YT Short slot 1 (IG cross-post) | with YT | 7:10 PM — **hemkund-sahib** · Outstand `KNbf9` · Platform `18076861265650524` | ✅ Published |
| YT Short slot 2 | ~9:45–11 PM (drifts later) | not yet in state at 23:05 audit close | ⏳ Pending — due now/imminent |
| Evening post (IG carousel + Story + FB) | ~12:15 AM Tue | after midnight AEST | ⏳ Not yet due |
| Analytics sync | ~4 AM Tue | — | ⏳ Not yet due |
| Engagement pull | ~7 AM Tue | — | ⏳ Not yet due |

**Published so far: 4/5 attempted (IG feed, IG Story, YT Short, IG cross-post ✅ · FB feed ❌).** `posted_today` confirms `m8EAd`(IG)=2026-06-08, `PdMu0`(FB)=2026-06-08, `m8EAd_yt_short`/`GAh5p_yt_short`=2026-06-08 (count 1).

### Not scheduled today — by design (2026-05-16 cadence cut, paused until 1k followers)
Reel slots 1–3, tourist map, canva visual, **infographic**, YT Short slot 3 — all PAUSED in `autoposter.yml`. Note infographic's nominal day *is* Monday, but it stays paused → **deliberate, not a miss.** Tourist map is Tue/Thu/Sat (not Monday). Weekly digest is Sunday-only (N/A Monday). **None re-triggered** — doing so would violate the cadence cut.

---

## Issues Found

1. **💥 Facebook morning feed post rejected (actionable).** `nubra-valley` / `v2_cost_index_handwritten`, Outstand `nLVdl`, at 6:29 PM AEST:
   > `Platform error for post=nLVdl: Error publishing post to Facebook: Failed to upload Facebook photo: 500 - Please reduce the amount of data you're asking for, then retry your request`
   This is a transient **Facebook Graph API 500**, not a content/auth problem (IG published the same cycle fine). **Side effect to watch:** the same-day guard still set `PdMu0`(FB)=`posted_today=2026-06-08` despite the rejection, so the morning mode will **not** self-retry FB today — FB's only remaining shot today is the evening carousel slot. Net: Facebook likely gets 1 post today instead of 2. `post_log.jsonl` logged `nLVdl` as an entry, but the run log's `⚠️ Rejected` is authoritative — **FB nubra-valley is NOT live.**

2. **👀 Heavy `nubra-valley` repetition on Facebook (recurring).** FB has now drawn nubra-valley on **Jun 2, Jun 6, Jun 7, and (attempted) Jun 8** — 4× in 7 days across different formats. Same evening-dest-repetition pattern flagged in the Jun 7 audit (Issue 4). The `(dest,fmt)`-pair dedup permits it, but the dest picker is clearly over-weighting a small Ladakh cluster (nubra-valley, pangong-lake recur too). Worth tuning the dest picker to enforce a longer per-dest cooldown on FB.

3. **📋 This audit task's schedule definition is still stale (recurring).** The task file lists 3 reels/day, tourist map, canva, infographic, 3 YT Shorts at pre-rewrite times. Audited against the **actual active schedule** instead (morning feed+story · 2 YT Shorts · evening post · analytics · engagement; everything else paused). Same flag as Jun 7 audit (Issue 5) — update the task definition to kill future false "missing" alarms.

4. **🔁 Carry-over from this morning's audit (Jun 7 cycle):** the **weekly-digest output never gets committed** (`data/research/social-engagement-week-*.md` is outside the workflow's snapshot path). Not exercised today (Sunday-only), but still unfixed. See `audit_2026-06-08.md` Issue 1.

---

## Git push failures
None. Both June 8 state commits (`d62a75c4` 18:29 AEST, `bf554a94` 19:10 AEST) are present on `origin/autoposter-state` — no "rejected" / "failed to push".

---

## Actions Taken

**No re-trigger fired** — three independent reasons, all pointing the same way:
1. **Not possible in this environment** — `gh` is unavailable in the sandbox (no CLI, no token), so `gh workflow run` can't be issued from here.
2. **No applicable mode even if it were** — the failure is the *morning feed post*; the task's allowed re-trigger modes are `tourist-map`, `canva-visual`, `reel`, `infographic`, `yt-short`. None re-runs a feed post.
3. **Would be counterproductive** — re-running the morning mode would hit the same-day guard (IG already posted; FB already marked `posted_today`), risking a duplicate IG post for zero FB gain, and `-force` is banned (anti-repetition).

**Recommended follow-up (needs the Mac / `gh`):**
- The FB 500 is transient — **simplest fix is to let the evening carousel slot give Facebook its post today**; nubra-valley will rotate out naturally. No manual action strictly required.
- If you want the missed FB morning post back specifically, do it from the Mac: re-run on a *different* destination so it's not a dup — but given Issue 2 (nubra-valley fatigue), skipping is the better call.
- Tomorrow's audit (normal ~9 AM AEST slot) should confirm YT Short slot 2, the evening post, analytics sync, and engagement pull all landed for the June 8 cycle — none were due yet at this run's 23:05 close.

---

## ⚠️ 1 actionable issue found (FB morning feed rejected — transient, no safe auto-fix from sandbox)
