# GSC Email Triage — 2026-08-14

Run date: 2026-08-14 ~10:41 UTC  
Prior triage: `gsc-email-triage-2026-08-13.md`

---

## Emails seen (sc-noreply@google.com, newer_than:2d)

1 new email since the last triage (2026-08-13).

| Time (UTC) | Subject | Verdict |
|---|---|---|
| 2026-08-14 07:10:10 | **New Events structured data issues detected for nakshiq.com** | ALREADY FIXED — stale signal, no action |

No emails from ops@nakshiq.com with subject GSC. No manual actions. No security issues. No 404/5xx.

---

## §1 — Events structured data: "Missing field 'endDate'" (non-critical)

**Classification: ALREADY FIXED — downstream of the 2026-08-10 festival schema fix**

### What Google flagged

- **Issue**: Missing field `endDate` in Events structured data
- **Severity**: Non-critical (Google's own label — suggestions that "don't prevent the page or feature from appearing on Google")
- **Message type**: WNC-10030322 (same class as the Aug 10 "Missing field startDate" alert)

### Root cause analysis

This alert is a stale signal from the same underlying defect fixed by commit `3cb2f3a` (2026-08-10):

**Before the fix:** `festivalsItemListJsonLd` emitted `Event` nodes for ALL festivals, including the ~11 "movable-month" festivals where `month = null` in the DB (e.g. Dholavira Festival). For those, the code used `dates = {}` (an empty object), resulting in events with neither `startDate` nor `endDate`. The "Missing field startDate" alert (Aug 10) was the primary signal; Google can send separate alerts for each missing required/recommended field.

**After the fix (current code):** Movable-month festivals are skipped entirely (`return []` in `flatMap`), so no Events with missing dates are emitted. Both `startDate` and `endDate` are always present for every Event node that is emitted.

### Code verification

Current `festival-schema.ts` — both Event emitters always include `endDate`:

1. **`festivalsItemListJsonLd`** (hub/state/month listing pages): For every festival that passes the `validMonth` guard, `endDate` is set to either the parsed end of a day-range (e.g. "Sep 8-15" → "2026-09-15") or falls back to the last day of the festival's month (e.g. "2026-09-30"). No path reaches the event object without `endDate`.

2. **`singleFestivalEventJsonLd`** (festival detail pages `/festivals/[slug]`): Same policy — returns `null` (no schema emitted) for movable-month festivals; for valid-month festivals, `endDate` is always set via the same fallback.

### Evidence

- `git log -- apps/web/src/lib/festival-schema.ts` shows only 2 commits; the last one (`3cb2f3a`, 2026-08-10) is the fix.
- No other component or page emits Events structured data outside of `festival-schema.ts`.
- The GSC alert carries "non-critical" severity, consistent with Google's stale-recrawl patterns after a recent schema fix.
- Live-check of nakshiq.com returned 403 from this environment (Vercel firewall + proxy policy); no curl evidence possible, but code analysis is unambiguous.

### No code change needed

The current code is correct. The alert will self-clear as Google recrawls the festival hub/state/month pages.

---

## Classification summary

| Email | Class | Action |
|---|---|---|
| New Events structured data issues (Missing field endDate) | ALREADY FIXED — stale signal from pre-Aug-10 crawl | None — will self-clear on recrawl |

---

## What the founder should do in GSC

**Nothing.** This is a non-critical suggestion (Google's own label). The code that caused it (`festivalsItemListJsonLd` emitting Events with `dates = {}`) was fixed 2026-08-10. Google will clear the alert automatically as it recrawls the festival pages. You do NOT need to click "Start new validation" — doing so for a non-critical issue is optional and has no urgency.

---

## Fixes shipped

None — no bugs found; prior fix already addressed the root cause.
