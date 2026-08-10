# GSC Email Triage — 2026-08-10

Run date: 2026-08-10 ~10:44 UTC  
Prior triage: `gsc-email-triage-2026-08-08.md`

---

## Emails seen (sc-noreply@google.com, newer_than:2d)

1 new email since the last triage (2026-08-08).

| Time (UTC) | Subject / Issue | Verdict |
|---|---|---|
| 2026-08-10 07:44:21 | **New Events structured data issues detected for nakshiq.com** — Missing field "startDate" | REAL BUG — FIXED |

No emails from ops@nakshiq.com with subject GSC. No manual actions. No security issues. No 404/5xx.

---

## §1 — Events structured data: Missing field "startDate" (FIXED)

**Root cause:** `festivalsItemListJsonLd()` in `apps/web/src/lib/festival-schema.ts` was emitting
`"@type": "Event"` nodes with `dates = {}` (no `startDate`) for the ~11 movable/unannounced
festivals where `month = null` in the DB (e.g. Dholavira Festival). These events don't have a
confirmed calendar month, so the code correctly skipped computing dates — but it still included
them as `ListItem` entries in the JSON-LD `ItemList` schema. Google requires `startDate` on
every `Event` node for rich-result eligibility; a missing field on any item in the list is
enough to trigger the alert.

The single-festival detail page (`singleFestivalEventJsonLd`) already handled this correctly:
it returns `null` and the `<script>` tag is suppressed when `month = null`. The ItemList path
had no equivalent guard.

**Fix applied:** Changed `festivals.map()` to `festivals.flatMap()` and added an early `return []`
when `!validMonth` — movable-month festivals are now skipped from the ItemList entirely. Position
counter re-indexes sequentially after filtering so no gaps appear in `ListItem.position`. The
`dates` object is simplified (always the confirmed-month branch after the early return).

**Files changed (1):**
- `apps/web/src/lib/festival-schema.ts` — 1 file, safe class

**Commit:** `3cb2f3a` — "fix(schema): omit movable-month festivals from Event ItemList to fix GSC 'Missing field startDate'"  
**Pushed to main:** 2026-08-10 ~10:44 UTC  
**CI (GitHub Actions "Test & Audit"):** `in_progress` at time of report (run #836, SHA `3cb2f3a`)  
**Vercel deploy:** triggered (festival-schema.ts is a code change → vercel-ignore.sh exits 1 → build runs)

---

## Deploy verification

Vercel direct deploy API not available in this environment. Verification plan:
- `festivalsItemListJsonLd` is consumed by 4 festival list routes (`/festivals`, `/festivals/month/[monthSlug]`, `/festivals/state/[stateSlug]`, `/festivals/state/[stateSlug]/[monthSlug]`).
- After deploy, the `/en/festivals` page JSON-LD should contain no `"@type": "Event"` node without a `startDate`.
- A spot-check with: `curl -A "Googlebot" https://www.nakshiq.com/en/festivals | grep -o '"startDate":"[^"]*"' | head -5`

---

## What the founder should do in GSC

1. **"Events structured data" → "Missing field startDate"**: Once the Vercel deploy is READY (typically 3–8 min after push), click **"Fix" → "Start new validation"** in GSC's Rich Results / Structured Data section. The 11 movable-month festivals will no longer appear in the ItemList schema, eliminating the missing-field errors.
2. Nothing else requires action. This was the only new email.

---

## Classification summary

| Email | Class | Action |
|---|---|---|
| Missing field "startDate" (Events structured data) | REAL BUG | Fixed — commit `3cb2f3a`, pushed to main |
