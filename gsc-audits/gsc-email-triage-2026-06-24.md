# GSC Email Triage — 2026-06-24

Site: `sc-domain:nakshiq.com`
Run date: 2026-06-24 10:35 UTC
Prior triage: `gsc-email-triage-2026-06-23.md`
Search window: `newer_than:2d` (from 2026-06-22 UTC)

---

## Emails seen

| Date (UTC) | Subject | Type | Thread | Action |
|---|---|---|---|---|
| 2026-06-23 03:30:47 | [NakshIQ ops] GSC alerts — 1 high-severity finding(s) | Ops alert | `19ef287d5f189626` | **SKIP** — covered in 06-23 triage |
| 2026-06-24 03:30:47 | [NakshIQ ops] GSC alerts — 1 high-severity finding(s) | Ops alert | `19ef7ae31a5207a3` | **NEW** — see below |

**No emails from `sc-noreply@google.com` in the window.**
**Net new: 1 ops alert (06-24). Duplicate findings — no action required.**

---

## Classification of the 06-24 ops alert

The 06-24 alert is a **verbatim repeat** of the 06-23 alert. Same two findings, same
underlying audit date (`2026-06-22`), same counts:

### Finding 1 — `indexed_pages_frozen` (MEDIUM) — REPEAT / NO ACTION

> GSC indexed-pages reading frozen at 18800 for 4 consecutive audits. Snapshot likely stale.

**Already triaged 2026-06-23.** This is documented Google-side data staleness —
same class as the false alarm in
`reference_m2_indexed_drop_alert_frozen_baseline_false_shape.md`. Site traffic was
at an all-time high (502 clicks, +32.5% WoW as of the 06-22 audit); real index loss
would show in falling traffic first. Will self-resolve on Google's next data refresh.

No code change.

---

### Finding 2 — `cohort_clicks_drop` (HIGH) — REPEAT / NO ACTION

> Cohort 'vs/pair' lost 86.7% of clicks (75 → 10 over last 7 vs prior 7 audits).

**Already triaged 2026-06-23.** Full investigation showed:
- `/vs/[pair]/page.tsx` and middleware are clean (verified 06-23).
- Absolute numbers tiny: 75 clicks / 7 days = 10.7/day.
- Peak monsoon season (June): "manali vs shimla"-type queries are pre-trip-planning
  demand; monsoon suppresses that demand. Historical signal: vs/pair demand fading
  noted in `gsc-audit-2026-05-25.md`, predating any code change.
- Site-wide position held at 8.9; the drop is cohort-specific.

**Monitor into July.** If clicks don't recover as monsoon eases, run GSC URL
Inspection on 5 representative vs pages.

No code change.

---

## Fixes shipped

**None.** Both findings are repeats, already classified as non-actionable on 06-23.

---

## Deploy state

No push. Vercel deployment unchanged.

---

## What the founder should do in GSC UI

| Priority | Action |
|---|---|
| 🟡 **Monitor** | "Not found (404)" and "Crawled – currently not indexed" validations started 06-21 — await pass/fail emails from Google. |
| 🟡 **Indexed-pages count** | Still frozen at 18,800 in the GSC Overview tab — no action, it will self-update. |
| 🟡 **vs/pair clicks** | Check mid-July. If below 20 clicks/week after monsoon eases, run URL Inspection on `/en/vs/manali-vs-shimla` and 4 peers. |
| ✅ **Nothing urgent** | No new GSC failure emails. No 404s, no 5xxs, no manual actions. |
