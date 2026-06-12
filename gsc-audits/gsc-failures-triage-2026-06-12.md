# GSC failure-storm triage — 2026-06-12

**Trigger:** founder report "lots of issues with GSC, keeps failing" + 7 × "Some fixes
failed" emails (09:09–09:11 UTC) + 2 × "New reason preventing indexing: Indexed, though
blocked by robots.txt" (08:27 + 09:10 UTC, both properties).
**Inputs:** tonight's 6 founder-downloaded GSC exports (~/Downloads, 19:09–19:13 AEST —
extracted to `gsc-export-zips/2026-06-12/`), live curl checks, repo/middleware code read,
git archaeology.

**Verdict: 2 real site bugs (both FIXED + shipped, commit `39e06b18`), 1 small redirect
gap (fixed in same commit), everything else is validation-churn on intentional behavior —
those validations can NEVER pass and failing is the correct outcome.**

---

## Real bug #1 — every `/destination/*/share` page 404'd for 39 days (FIXED)

- The share route (trip-report form) has existed since 2026-04-25 and its code is fine.
- The middleware soft-404 fix `e36752d0` (2026-05-04) validates the segment after a
  destination slug against month names only — `share` isn't a month → middleware returned
  404 **before the route ever ran**. Verified live: `/en/destination/jaipur/share` = 404
  pre-fix despite the page existing.
- GSC evidence matches exactly: 85 share URLs sat in "Excluded by 'noindex'" (their correct
  state — the form is intentionally noindexed) with last-crawl dates ≤ 2026-05-03, and the
  ones recrawled after 05-04 (guruvayur 05-31, bir-billing 05-30, mechuka 05-28) moved into
  "Not found (404)". That's the failed noindex validation AND part of the failed 404 one.
- **Fix:** middleware now allows `share` alongside valid months. Numeric/garbage segments
  still 404.

## Real bug #2 — robots.txt blocked Googlebot from rendering (FIXED)

- `Disallow: /_next/` blocked ALL JS/CSS build chunks. Consequences, all visible in
  tonight's exports:
  - **"Blocked by robots.txt" validation: 1002 URLs, 989 of them `/_next/static` chunks**
    → validation churns forever (the block was intentional, so it can never pass).
  - **NEW reason "Indexed, though blocked by robots.txt": 18 chunk URLs** — Google indexed
    JS/CSS files as pages because it couldn't crawl them to learn otherwise.
  - **Render quality:** Google explicitly warns that blocking CSS/JS harms indexing —
    relevant while we sit on a ~1.1K "Crawled - currently not indexed" pile.
- **Fix:** `Allow: /_next/static/` (longest-match wins; `/_next/image`, `/_next/data`,
  `/api/`, `/admin/` stay blocked — no function/DB cost, chunks are pure CDN) **plus**
  `X-Robots-Tag: noindex` on `/_next/static/*` via next.config headers, so chunks are
  fetchable for rendering but can never be indexed as documents. The 18 indexed chunks
  drop out on next recrawl.

## Small fix — `/with-kids/ziro` 404

ziro→ziro-valley dedup (2026-05-28) only 301'd `/destination/ziro*`. Extended the
middleware redirect to the `with-kids` family (`/hi/with-kids/ziro-valley` verified 200).

---

## Everything else in the failed validations — already fine, no action

| Category (failed validation) | Count | Reality |
|---|---|---|
| Excluded by 'noindex' | 85 | Share pages are noindexed **by design**. Validation can never pass. Post-fix they return 200+noindex again (correct exclusion, not an error). |
| Page with redirect | — | Intentional 301s (locale, slug merges, skip-list→tourist-traps, region→state). Exclusion, not error. |
| Alternate page with proper canonical | — | Canonicals doing their job. Exclusion, not error. |
| Duplicate, Google chose different canonical | — | Same class; known /vs reversed-order rule already codified. |
| Blocked by robots.txt | 1002 | 989 chunks (now resolved by the robots fix — category empties on recrawl), 13 `/api/og` (intentional, harmless). |
| Crawled - currently not indexed | 1093 | The known Google-rationing-programmatic-surface issue (06-11 audit). 31 are apex-domain dupes that 301 to www. Lever is ranking/internal links, not validation. Render fix (bug #2) may help at the margin. |
| Not found (404) | 34 | Live-verified the recent ones: weekend-from-varanasi **200** (06-10 fix landed after Google's 06-06 crawl), skip-list/region/where-to-go **301** (already-shipped redirects, crawled before fix), share pages = bug #1 (now fixed), garbage URLs (`/$`, `/&`, `/10`, `/दिन`) **correctly 404**. Old /vs 404s are dead pairs, fine. |

## Indexed-pages "drop" alert (−5.9%, 17K→16K)

Same false-alarm shape documented in `reference_m2_indexed_drop_alert_frozen_baseline_false_shape.md`:
frozen-then-unfrozen baseline + intended /hi noindex consolidation + Google rationing.
Core pages verified indexable on 06-11. No action.

## What the founder should do in GSC (after the deploy is READY)

1. **"Not found (404)"** → Start new validation (the live URLs now 200/301).
2. **"Blocked by robots.txt"** → Start new validation (chunks are now crawlable).
3. **Do NOT validate** noindex / redirect / canonical / duplicate categories — they are
   exclusions by design and will always "fail". Failing there is correct behavior.

## Ship record

- Commit `39e06b18` on main (middleware + robots.txt + next.config) — Vercel prod deploy
  `dpl_JC6kkZKdpeo6ttZRHbvfYosdQrhY`.
- Live verify checklist: `/en/destination/jaipur/share` 200 + noindex meta; robots.txt
  serves `Allow: /_next/static/`; chunk URL serves `X-Robots-Tag: noindex`;
  `/hi/with-kids/ziro` 301→ziro-valley; spot dest/month pages no-regress.
