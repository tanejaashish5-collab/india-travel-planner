# data/cro — SERP title-override pipeline

Per-page `<title>` + meta-description overrides for high-impression / low-CTR
destination-month pages. Overrides live in `destination_months.title_override`
(+ `_hi`, `meta_description_override`, `_hi` — migration 063) and are consumed
by `generateMetadata()` in `apps/web/src/app/[locale]/destination/[id]/[month]/page.tsx`.
A non-empty override replaces the default templated title/description.

The override system is for the **Tier-A cohort only** — pages that already rank
on page 1 where the SERP snippet, not the ranking, is losing the click. The
~6,000 long-tail pages keep the score-based template.

## Weekly cycle

```bash
# 1. Pull the Tier-A cohort (pos ≤10, impressions ≥300, CTR <2%, 28d)
node scripts/data-pull.mjs cohort 28d            # → cohort-<date>.json

# 2. Ground every page in verifiable DB data (anti-fabrication source of truth)
node scripts/_grounding-for-cohort.mjs           # → grounding-<date>.json

# 3. Draft title + meta copy into title-overrides.csv (editorial step).
#    Anti-fabrication: every fact must trace to a field in grounding-<date>.json.
#    Title ≤50 visual chars, meta ≤155.

# 4. Build the human-review doc and get founder sign-off
node scripts/_build-override-review.mjs          # → title-overrides-review-<date>.md

# 5. Apply — dry-run first, then commit
node scripts/apply-title-overrides.mjs                       # dry-run diff
node scripts/apply-title-overrides.mjs --commit --revalidate # write + flush ISR

# 6. +14 days: re-pull and compare CTR against the pre-override value
node scripts/data-pull.mjs cohort 28d
```

## Files

| File | Role |
|---|---|
| `cohort-<date>.json` | GSC Tier-A cohort (generated) |
| `grounding-<date>.json` | per-page verifiable DB data — the only source copy may quote |
| `title-overrides.csv` | **durable queue.** `status=applied` rows are skipped on re-runs |
| `title-overrides-review-<date>.md` | human-review artifact — approve before commit |
| `apply-log.md` | append-only audit trail of every committed batch |

## CSV format

`destination_id,month,locale,title_override,meta_description_override,status,applied_at`

- `month` — slug (`may`) or 1-12 · `locale` — `en` | `hi` (picks the `_hi` columns)
- `status` blank = pending; the apply script stamps `applied` + `applied_at` on commit
- Empty title/meta cells are skipped unless `--allow-clear` is passed

## Notes

- Googlebot reads server-rendered ISR HTML, not the service worker — no
  `sw.js` `CACHE_VERSION` bump is needed for SERP titles.
- `--revalidate` POSTs `/api/admin/revalidate` per page so ISR serves the new
  title immediately; without it ISR refreshes within 24h anyway.
- Pages ranking below position 10 are a *ranking* problem, not a title problem —
  the cohort query excludes them.
