# GSC Email Triage — 2026-09-20

Run date: 2026-09-20 ~10:41 UTC (morning run)  
Prior triage: `gsc-email-triage-2026-09-19.md`

---

## Emails seen

- `from:sc-noreply@google.com newer_than:2d` → **1 result**
- `from:ops@nakshiq.com subject:GSC newer_than:2d` → **0 results**

### Email 1 — Breadcrumbs structured data issue

- **Subject:** New Breadcrumbs structured data issues detected for nakshiq.com
- **Date:** 2026-09-20T08:47:23Z
- **Issue:** 1 critical issue: *"Either 'name' or 'item.name' should be specified (in 'itemListElement')"*

---

## Classification

| Email | Class | Action |
|---|---|---|
| Breadcrumbs structured data issue | REAL — code bug, breadcrumb `name: ""` emitted | Fixed + shipped |

---

## Root cause

`apps/web/src/app/[locale]/festivals/[festivalSlug]/page.tsx` line 356:

```ts
const monthName = MONTHS_LONG[f.month] ?? "";
```

`MONTHS_LONG` is a 1-indexed array starting with `""` at index 0. When `f.month` is:
- `0` → `MONTHS_LONG[0] = ""` (nullish coalescing `?? ""` doesn't catch empty strings)
- `null` or `undefined` → `MONTHS_LONG[null/undefined] = undefined` → `undefined ?? ""` = `""`

In both cases `monthName = ""`, and the breadcrumb item `{ name: monthName }` emits `name: ""`. 
Google's Structured Data validation rejects empty-string `name` as missing, hence the GSC alert.

---

## Fix shipped

**Commit `7e10786` on main** — `fix(seo): guard festival breadcrumb month crumb against empty monthName`

Change: month breadcrumb is now conditional — only emitted when `monthName` is truthy.
The festival crumb shifts from position 4 → position 3 when the month crumb is absent.

```ts
// Before (broken for f.month=0 or null):
{ "@type": "ListItem", position: 3, name: monthName, item: `.../month/${monthName.toLowerCase()}` },
{ "@type": "ListItem", position: 4, name: f.name, item: pageUrl },

// After (safe):
...(monthName
  ? [{ "@type": "ListItem", position: 3, name: monthName, item: `.../month/${monthName.toLowerCase()}` }]
  : []),
{ "@type": "ListItem", position: monthName ? 4 : 3, name: f.name, item: pageUrl },
```

One file changed. TypeScript errors in output are all pre-existing module-resolution misses from the
cloud container's missing node_modules — zero new errors introduced.

---

## Deploy state

Commit pushed to main at 10:40 UTC. GitHub Actions run `35505751443` was `in_progress` at time
of report. Vercel deployment triggered by the push — alias was still on prior prod deployment
`dpl_HchJ6pyJ2XJE274YCxZGaWHrb4k1` (built 09:47 UTC) when checked. Build expected READY in
~5-10 min. Production curl could not be verified (egress proxy blocks nakshiq.com from cloud
container).

**Expected post-deploy behavior:** festival pages with `f.month=0` or `null` emit a 3-item
breadcrumb (Home → Festivals → [festival name]) instead of a 4-item one with `name:""`.
Pages with a valid month (1–12) emit the full 4-item trail unchanged.

---

## What the founder should do in GSC

1. **Breadcrumbs structured data** → After the deploy goes READY (check
   https://vercel.com/ashs-projects/web), click **"Validate Fix"** in GSC's Enhancement report.
   Google will re-crawl festival pages and confirm the fix within a few days.

2. **Nothing else from the morning window** — no new 404, 5xx, redirect errors, manual actions, or security issues.

---

## Evening run — 2026-09-20 ~22:36 UTC

### Emails seen (new since morning run)

- `from:sc-noreply@google.com newer_than:2d` → **2 results total** (1 new vs. morning)
- `from:ops@nakshiq.com subject:GSC newer_than:2d` → **0 results**

### Email 2 — Coverage: Not found (404) — new reason

- **Subject:** New reasons prevent pages from being indexed on site https://www.nakshiq.com/
- **Date:** 2026-09-20T18:14:51Z
- **Issue:** New reason: *"Not found (404)"* — generic Coverage alert, no specific URLs listed in email body.

### Classification

| Email | Class | Action |
|---|---|---|
| Coverage: Not found (404) | REAL CANDIDATE — investigated, no code fix warranted | See below |

### Investigation

**Could not curl production** — egress proxy blocks `nakshiq.com` from this cloud container
(same limitation noted in morning run). Specific URLs affected are visible only in the GSC
Coverage → "Not found (404)" report.

**Recent commits reviewed for routing regressions:**

| Commit | What changed | 404 risk |
|---|---|---|
| `7e10786` (morning fix) | Festival breadcrumb JSON-LD only — no routing change | None |
| `d6e3c68` | Reels assembly + hardcoded JUNE fix — no routing change | None |
| `03c01a8` | Force-rebuild empty commit after Supabase gateway recovery | None |
| `baa66e8` | Capability-watch brief markdown only | None |

**Supabase platform incident today:** `03c01a8` commit message documents a Supabase API Gateway
`degraded_performance` incident during which destination pages with expired ISR caches hung on
regeneration. The recovery-watch script fired a force-rebuild once two consecutive healthy checks
passed. Transient 404/5xx responses served during the incident window may have been crawled by
Googlebot and logged as the "new reason" now surfacing in the Coverage report.

**No persistent 404 root-cause found.** The ISR poison was cleared by the force-rebuild. The
alert most likely reflects either (a) the transient incident window, or (b) pre-existing
data-gap 404s (e.g. `cost/*` pages where no cost row exists — a known honest data gap per
CLAUDE.md) that Google first crawled today.

### What the founder should do in GSC

3. **Coverage → "Not found (404)"** → Open the report and check the specific URLs listed.
   - If they are `cost/*` URLs: these are honest data-gap 404s — no action needed.
   - If they are destination/festival/other real pages returning 200 now: click **"Validate Fix"** (the transient incident is resolved).
   - If any real page is still 404ing: paste the URL here for the next triage run to investigate.
