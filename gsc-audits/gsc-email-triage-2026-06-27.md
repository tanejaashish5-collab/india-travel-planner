# GSC Email Triage — 2026-06-27

Site: `sc-domain:nakshiq.com`
Run date: 2026-06-27 18:25 UTC
Prior triage: `gsc-email-triage-2026-06-24.md`
Search window: `newer_than:2d` (from 2026-06-25 UTC)

---

## Emails seen

| Date (UTC) | Subject | Type | Thread | Action |
|---|---|---|---|---|
| 2026-06-27 03:30:40 | [NakshIQ ops] GSC alerts — 1 high-severity finding(s) | Ops alert | `19f072126cc24a4f` | **REPEAT — see below** |

**No emails from `sc-noreply@google.com` in the window.**
**Net new actionable: 0.**

---

## Classification of the 06-27 ops alert

Both findings reference **Latest audit: 2026-06-22** — the exact same underlying data
as the 06-24 triage (which itself was a repeat of 06-23). The GSC data snapshot has
not refreshed since 06-22.

### Finding 1 — `indexed_pages_frozen` (MEDIUM) — REPEAT / NO ACTION

> GSC indexed-pages reading frozen at 18800 for 4 consecutive audits. Snapshot likely stale.

Triaged on 06-23 and 06-24. Google-side data staleness; site traffic held at all-time
highs confirming no real index loss. Will self-resolve on Google's next data refresh.

No code change.

---

### Finding 2 — `cohort_clicks_drop` (HIGH) — REPEAT / NO ACTION

> Cohort 'vs/pair' lost 86.7% of clicks (75 → 10 over the last 7 vs prior 7 audits).

Triaged on 06-23 and 06-24. Full investigation on 06-23 confirmed `/vs/[pair]/page.tsx`
and middleware are clean. Drop attributed to peak monsoon seasonality (June); vs/pair
demand is pre-trip-planning, suppressed during monsoon. Monitor into July — if clicks
don't recover as monsoon eases, run GSC URL Inspection on 5 representative vs pages.

No code change.

---

## Fixes shipped

**None.**

---

## Deploy state

No push. Vercel deployment unchanged.

---

## What the founder should do in GSC UI

| Priority | Action |
|---|---|
| 🟡 **Monitor** | Indexed-pages count (18,800) — awaiting Google data refresh, likely self-resolves this week. |
| 🟡 **vs/pair clicks** | Check mid-July after monsoon eases. If below 20 clicks/week, run URL Inspection on `/en/vs/manali-vs-shimla` and 4 peers. |
| ✅ **Nothing urgent** | No sc-noreply emails, no 404s, no 5xxs, no manual actions. |
