# GSC Email Triage — 2026-06-23

Site: `sc-domain:nakshiq.com`
Run date: 2026-06-23 10:40 UTC
Prior triage: `gsc-email-triage-2026-06-21.md`
Search window: `newer_than:2d` (from 2026-06-21 UTC)

---

## Emails seen

| Date (UTC) | Subject | Type | Thread / Source |
|---|---|---|---|
| 2026-06-21 14:35:26 | We're validating your Page indexing issue fixes (Crawled – currently not indexed) | Validation started | `19eea9b9cc4ec20a` — **SKIP**: already covered in 06-21 triage |
| 2026-06-21 14:35:40 | We're validating your Page indexing issue fixes (Not found 404) | Validation started | `19eea9bd0592725c` — **SKIP**: already covered in 06-21 triage |
| 2026-06-23 03:30:47 | [NakshIQ ops] GSC alerts — 1 high-severity finding(s) | Ops alert | `19ef287d5f189626` — **NEW** |

**Net new: 1 email (the ops@nakshiq.com alert).**

---

## Classification of the ops alert

The ops alert contains two findings from the 2026-06-22 audit run:

### Finding 1 — `indexed_pages_frozen` (MEDIUM)

> GSC indexed-pages reading frozen at 18800 for 4 consecutive audits. Snapshot likely stale — masking any real movement.

**Assessment: Google-side data staleness. No code fix.**

This is the same class of false alarm documented in
`reference_m2_indexed_drop_alert_frozen_baseline_false_shape.md` and previously
classified in the 06-12 and 06-13 triages. The GSC indexed-page count API
sometimes freezes at a snapshot value for days before refreshing. The most recent
GSC audit (2026-06-22, per `gsc-audit-2026-06-22.md`) shows the overall site at
502 clicks — a 9th consecutive fresh-window high with impressions clearing 90K for
the first time. If real pages were dropping out of the index, traffic would be
falling, not rising.

No code change needed. The stale snapshot will resolve on Google's next data
refresh cycle.

---

### Finding 2 — `cohort_clicks_drop` (HIGH)

> Cohort 'vs/pair' lost 86.7% of clicks (75 → 10 over the last 7 vs prior 7
> audits). Same shape as the destination/month cohort losing share during the ISR
> regression.

**Assessment: SEASONAL DEMAND DROP + small absolute numbers. No code bug found.**

#### Evidence of code health

1. **`apps/web/src/app/[locale]/vs/[pair]/page.tsx`**: `revalidate = 2592000`
   (30d ISR, intentional — comparison content is static), `dynamicParams = true`.
   The `generateStaticParams` generates all entries from the full `VS_PAIRS`
   export (1577 pairs: 133 curated + 1444 generated from `f8bfc88`). Code logic
   is clean: `pair.split("-vs-")` is safe for all current pair IDs, null checks
   are present for `confidence_cards` and `kids_friendly`. No change to this file
   since `ca08c9d` (2026-05-28).

2. **Middleware** (`apps/web/src/middleware.ts`): No block or redirect targets
   `/vs/` routes. The Hindi-dup consolidation explicitly excludes `vs` from the
   noindex rule.

3. **Sitemap** (`apps/web/src/app/sitemap/[file]/route.ts`): All VS_PAIRS are
   listed with `priority: 0.8` / `changefreq: monthly`. No changes to sitemap
   since the reference-data caching commit (`cf89e03`, 2026-06-04).

4. **Canary probe**: The canary cron runs every 30 min and would have caught
   sustained 5xx errors on vs pages before an 86.7% multi-day click drop could
   accumulate.

5. **Site-wide health**: Overall clicks at an all-time high (502 clicks, +32.5%
   WoW, as of 2026-06-22 audit). The drop is cohort-specific, not site-wide.

#### Why seasonal + small-number variance explains it

- **Absolute numbers are tiny**: 75 clicks over 7 days = 10.7/day; 10 over 7
  days = 1.4/day. One slow news cycle or a Google-position swing on 2–3 head
  queries can move these in percentage terms dramatically.
- **Monsoon**: June is peak monsoon in north India. Comparative "manali vs shimla"
  / "shimla vs kasauli" queries — the bulk of the vs/pair click base — are
  strongly demand-tied to pre-trip planning. Monsoon = fewer active planners.
- **Historical signal**: `gsc-audit-2026-05-25.md` already noted "/vs/ comparison
  demand is fading" with "lansdowne height vs mussoorie height" slipping. The
  trend predates any code change.
- **"ISR regression" pattern-match**: The ops monitoring flag is correct in shape
  but the cause is different. A true ISR regression would show simultaneous
  position loss across many pages; the site-wide position held at 8.9 on 06-22.

**Verdict**: Monitor into July. If vs/pair clicks don't recover when monsoon eases
and pre-trip planning resumes, run a targeted GSC URL Inspection on the top 5
vs/pair pages to verify indexing status.

---

## Fixes shipped

**None.** No code bug was found; no commit was made.

Live curl verification was unavailable: this cloud environment's egress policy
returns `403 host_not_allowed` for outbound requests to www.nakshiq.com (same
limitation noted in 06-16 triage). Code analysis and git archaeology were the
primary investigation tools.

---

## Deploy state

No changes pushed. Vercel deployment unchanged.

---

## What the founder should do in GSC UI

| Priority | Action |
|---|---|
| 🟡 **Monitor** | "Not found (404)" and "Crawled – currently not indexed" validations are running (started 06-21) — no action until Google sends pass/fail emails. |
| 🟡 **Manual check** | If the indexed-pages counter in the GSC Overview tab still reads 18,800 next week, it's likely a true freeze — no real change. It will eventually update on its own. |
| 🟡 **vs/pair clicks** | If clicks don't recover toward mid-July as monsoon eases, run GSC URL Inspection on 5 representative vs pages (e.g., `/en/vs/manali-vs-shimla`, `/en/vs/shimla-vs-kasauli`) to confirm they're indexed and no manual action has been applied. |
| ✅ **Nothing urgent** | All other categories are stable. No 404s, no 5xxs, no new GSC failure emails. |

---

## GSC sender search (ops@nakshiq.com subject:GSC)

Thread `19ef287d5f189626` is the one alert processed above. No other ops threads
found in the 2-day window.
