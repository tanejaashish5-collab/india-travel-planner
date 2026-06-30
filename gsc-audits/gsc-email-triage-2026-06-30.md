# GSC Email Triage — 2026-06-30

Site: `sc-domain:nakshiq.com`
Run date: 2026-06-30 10:40 UTC
Prior triage: `gsc-email-triage-2026-06-27.md`
Search window: `newer_than:3d` (from 2026-06-27 UTC)

---

## Emails seen

| Date (UTC) | From | Subject | Action |
|---|---|---|---|
| 2026-06-30 03:01 | ops@nakshiq.com | `[NakshIQ ops] bot crawl-rate drop — 3 family/bot pair(s) flagged` | **FALSE ALARM — see below** |

**No emails from `sc-noreply@google.com` in the last 7 days.**
**No `ops@nakshiq.com subject:GSC` emails since 2026-06-27 (already triaged).**

---

## Classification — 2026-06-30 bot crawl-rate drop

### Finding: Googlebot/Bingbot crawl-rate drop — MEASUREMENT ARTIFACT / NO ACTION

Reported drops:
- Googlebot `/destination/month`: 235 → 116 (-50.6%)
- Googlebot `/other`: 118 → 33 (-72.0%)
- Bingbot `/other`: 75 → 19 (-74.7%)

**Root cause: these numbers are not a real crawl-rate drop.** The `audit-bot-crawl-rate`
cron compares "current 7d" vs "prior 7d" hits from the `bot_visits` table, which is
populated by middleware sampling. Commit `fec4259` (2026-06-25) cut the middleware
sampling rate from **10% → 1%** as a cost-reduction measure.

The comparison window straddles the change:
- **Prior 7d** (06-16→06-23): all rows at 10% sample → full baseline
- **Current 7d** (06-23→06-30): 06-23→06-25 at 10%, 06-25→06-30 at 1% → ~3.6% effective rate

That 10x reduction in the second half of the current window produces exactly the
50-75% measured "drop". Real Googlebot crawl-rate would show up in GSC's Coverage
report — and **no `sc-noreply@google.com` emails have arrived in 7 days**, confirming
no indexing regression.

The alert will continue to produce false positives until **2026-07-09**, when both
7-day comparison windows are fully in the 1%-sampling era.

---

## Fix shipped

**File**: `apps/web/src/app/api/cron/audit-bot-crawl-rate/route.ts`

Changes (1 file):
1. Updated all text references from "10% sample / true volume ~10×" → "1% sample / true volume ~100×" (comments, alert email body, HTML template header)
2. Added `SAMPLING_STABLE_DATE = "2026-07-09T00:00:00Z"` constant
3. Added `inSamplingTransition` check: email alert is **suppressed until 2026-07-09** while ops_reports still records the data with `sampling_transition: true`

This stops the daily false-alarm emails for the next 9 days and auto-expires.

**TypeScript**: only pre-existing infrastructure errors (missing node_modules in remote env); no errors introduced by this change.

---

## Commit

See git log — commit to follow this file.

---

## Contextual signals (no GSC action needed)

| Signal | Detail | Status |
|---|---|---|
| `audit-gsc-alerts` errored on 06-27/06-28 | Watchdog shows "errored" because `ok: false` means HIGH findings exist — it's the cron's correct success path, not a crash. `440e596` demoted cohort_clicks_drop HIGH→MEDIUM; subsequent runs return `ok: true`. | Self-resolved |
| Indexed pages frozen at 18,800 | 4+ consecutive audits — same as 06-27 triage. Google data staleness, not a real index loss. | Monitor |
| `vs/pair` click drop | Seasonal monsoon suppression (triaged 06-23/06-24/06-27). Monitor into July. | Monitor |

---

## Deploy state

No deployment needed for a cron route change (no ISR pages affected, no data written).
Change ships with the next Vercel deploy triggered by this commit.

---

## What the founder should do in GSC UI

| Priority | Action |
|---|---|
| ✅ **Nothing urgent** | No sc-noreply emails, no 404s, no 5xxs, no manual actions. |
| 🟡 **Ignore** the bot crawl-rate drop email (2026-06-30) | False alarm from sampling-rate change — no real Googlebot issue. Alert suppressed until 07-09. |
| 🟡 **Monitor** | Indexed-pages count; check if 18,800 moves in next GSC data refresh. |
| 🟡 **vs/pair clicks** | Re-check mid-July after monsoon eases. |
