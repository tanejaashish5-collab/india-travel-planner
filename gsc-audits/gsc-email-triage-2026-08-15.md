# GSC Email Triage — 2026-08-15

Run date: 2026-08-15 ~22:40 UTC  
Prior triage: `gsc-email-triage-2026-08-08.md`

---

## Emails seen (sc-noreply@google.com, newer_than:2d)

1 email arrived 2026-08-14 07:10 UTC.

| Time (UTC) | Subject | Verdict |
|---|---|---|
| 07:10:10 | **New Events structured data issues detected for nakshiq.com** | ALREADY FIXED ✓ |

No emails from ops@nakshiq.com with subject GSC. No manual actions. No security issues. No 404/5xx failures.

---

## §1 — Events structured data: "Missing field endDate" (Non-critical)

**Classification: REAL CANDIDATE (investigated) → Already fixed. No code change needed.**

### What Google reported

> "Top non-critical issues: Missing field 'endDate'"
> Non-critical issues are suggestions for improvement, but don't prevent the page or feature from appearing on Google.

### Root cause (historical — now fixed)

Before commit `3cb2f3a` (2026-08-10), `festivalsItemListJsonLd` in `apps/web/src/lib/festival-schema.ts` emitted Event nodes for movable/unannounced festivals (those with `month=null` in the DB) with `dates = {}` — meaning no `startDate` AND no `endDate`. The Aug 10 session fixed "Missing field startDate" (GSC email that day) by making the function skip those festivals entirely (`return []`). The Aug 14 email about "Missing field endDate" is based on the **same pre-fix crawl batch** — Google issues separate emails per distinct structured data problem, sometimes on different days.

### Current code status

`apps/web/src/lib/festival-schema.ts` (current, post-`3cb2f3a`):
- `festivalsItemListJsonLd`: movable-month festivals (month=null) are filtered out entirely. All emitted Events carry both `startDate` and `endDate` (day-precision from `tryExtractIsoRange`, or month-end fallback).
- `singleFestivalEventJsonLd`: returns `null` for movable-month festivals (same policy). All valid Events have both dates.

No Event is emitted without `endDate` in any current code path.

### Live check

Network egress proxy blocks outbound connections to `www.nakshiq.com` from this session. Live curl not possible. Assessment is based on code analysis of the committed schema + git diff of `3cb2f3a`.

### No code change

The Aug 10 commit already eliminates the root cause. The Aug 14 GSC email is a lagged notification.

---

## What the founder should do in GSC

1. **Events structured data** → Go to GSC > Search Appearance > Enhancements > Events → click **"Validate fix"** on the "Missing field endDate" issue. Google will recrawl the affected pages and should confirm the issue is resolved once it processes the updated schema.
2. **Do NOT** click "Validate fix" on noindex / redirect / canonical / duplicate categories — those are exclusions by design and will always "fail."

---

## No code changes. No deploy.

The structured data fix shipped with commit `3cb2f3a` on 2026-08-10. The Aug 14 email is stale data from a pre-fix crawl. Current code is clean.

**Verdict: clean run — 1 non-critical structured data email, already fixed. Founder clicks "Validate fix" in GSC Enhancements > Events.**
