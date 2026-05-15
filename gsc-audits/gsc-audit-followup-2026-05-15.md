# GSC + Analytics Audit Follow-up — 2026-05-15

Action pass on the priority queue in [gsc-audit-2026-05-15.md](./gsc-audit-2026-05-15.md).

## TL;DR

- **Fixed** the highest-leverage CTR lever site-wide: duplicate temperature in destination/month meta descriptions. Affects ~6,000 month pages (505 dests × 12 months).
- **Verified** redirect chain returns 301 (not 307) on locale-prefix conversions. Middleware 307→301 layer working.
- **Verified** hreflang on /en/ + /hi/ destination pages — all three entries (en, hi, x-default) present and self-referential. Duplicate-Google-chose-different bucket growth (+11) is not from a code regression.
- **Verified** sitemap chunks 0-4 serve, chunk 1 contains every dest×month×locale URL. Kasol/May + Munnar/June both indexed in sitemap (2 entries each = en+hi).
- **Surfaced** apex 2-hop redirect chain: `nakshiq.com → www.nakshiq.com → /en/`. Platform-config item (Vercel domain), not code.

---

## Fix shipped — duplicate temperature in SERP description

### Symptom

Pulled live HTML for the 5 highest-impression destination/month pages:

| Page | Title | Description (issue bolded) |
|---|---|---|
| Kasol/May | "Kasol in May 2026, 14–26°C — Peak season" | "Kasol in May: 14–26°C. Visit: Peak season, **14-26°C**. Kheerganga, Tosh, Malana all accessible." |
| Munnar/June | "Munnar in June 2026, 14–22°C — Avoid this month" | "Munnar in June: 14–22°C. Skip: SW monsoon onset. **14-22C**, 800-1000mm rainfall. Landslides on NH85, viewpoints fogged-out." |
| Vrindavan/May | "Vrindavan in May 2026, 38–46°C — Avoid this month" | "Vrindavan in May: 38–46°C. Skip: Heat-pilgrimage: **38-46°C** with marble courtyards and temple yards radiating heat." |
| Tungnath/May | "Tungnath in May 2026, 8–18°C — Peak season" | "Tungnath in May: 8–18°C. Visit: Best month **8-18°C**. Rhododendrons blaze red and pink along trail." |
| Pondicherry/May | "Pondicherry in May 2026, 28–38°C — Tough season" | "Pondicherry (Puducherry) in May: 28–38°C. Wait on: Peak heat. **28-38C**, humidity 80 percent." |

Every description shows the temp range twice — once in the verb-led lead, once again in the editorial note. The 2026-05-10 weather-lead rewrite moved the range to `descLead`, but the editorial notes were authored before that change and still front-load the same number, so the SERP snippet displays it twice. Wastes 15-20 chars on every page.

### Fix

[apps/web/src/app/[locale]/destination/[id]/[month]/page.tsx:281-313](apps/web/src/app/[locale]/destination/[id]/[month]/page.tsx#L281-L313): after the editorial note's `{Month} at {Name}:` prefix is stripped, if `noteRangeMatch` extracted the temp range from the note (which means descLead is using the same digits), do a literal `split.join` strip of that substring from the note body. Then a 6-stage cleanup chain handles the punctuation glitches: `". , "` → `". "`, `"Peak season,."` → `"Peak season."`, `"Best month ."` → `"Best month."`, double-space collapse, leading-separator strip, and sentence-case fix when stripping left a lowercase letter after a period.

### Validation

Simulated the strip locally against all 5 production cases plus a negative-winter edge case:

```
Kasol/May        → "Peak season. Kheerganga, Tosh, Malana all accessible."
Munnar/June      → "SW monsoon onset. 800-1000mm rainfall. Landslides on NH85, viewpoints fogged-out."
Vrindavan/May    → "Heat-pilgrimage: with marble courtyards and temple yards radiating heat."
Tungnath/May    → "Best month. Rhododendrons blaze red and pink along trail."
Pondicherry/May  → "Peak heat. Humidity 80 percent."
Negative winter  → "Brutal cold. Roads closed past Kaza."
```

Strip gated on `noteRangeMatch` so we never remove a temp range from the note when descLead's range came from the JSONB extremes — only when the note + descLead share the same source digits.

### Expected impact

On Kasol/May (693 imp / 0.3% CTR / pos 7.2) the new description reads:

> Kasol in May: 14–26°C. Visit: Peak season. Kheerganga, Tosh, Malana all accessible. NakshIQ verdict: 5/5 (Himachal Pradesh).

vs. the old:

> Kasol in May: 14–26°C. Visit: Peak season, 14-26°C. Kheerganga, Tosh, Malana all accessible. NakshIQ verdict: 5/5 (Himachal Pradesh).

Three named places (Kheerganga, Tosh, Malana) are now in the visible SERP snippet window instead of pushed past truncation. Same applies to Munnar's "viewpoints fogged-out" + "Landslides on NH85" detail — both now visible above the fold of the snippet. Re-measure CTR on 2026-05-22 (~7 days for Google to re-crawl + propagate).

---

## Items verified (no fix needed)

### 1. Locale redirect chain — 301, not 307

```
www.nakshiq.com/destination/munnar/june → 301 → /en/destination/munnar/june → 200
```

Middleware's 307→301 wrapper at [apps/web/src/middleware.ts:219-225](apps/web/src/middleware.ts#L219-L225) is working. Locale-prefix consolidation flows through next-intl's redirect, then the wrapper rewrites the status.

### 2. Hreflang — present and correct

Pulled from kasol/may production HTML:

```
<link rel="alternate" hrefLang="en" href="https://www.nakshiq.com/en/destination/kasol/may"/>
<link rel="alternate" hrefLang="hi" href="https://www.nakshiq.com/hi/destination/kasol/may"/>
<link rel="alternate" hrefLang="x-default" href="https://www.nakshiq.com/en/destination/kasol/may"/>
```

The +11 growth in "Duplicate, Google chose different canonical than user" bucket is *not* a hreflang regression. Plausible causes worth checking on 5/17:
- New dest/month pages crawled where Google preferred a different locale's URL as canonical
- Hindi pages where Google chose /en/ over /hi/ because Hindi user-intent signals are weaker

### 3. Sitemap coverage — full

```
/sitemap.xml → index of 5 chunks
/sitemap/1.xml → destinations + dest×month for all 505 dests × 12 months × 2 locales
```

Kasol/May and Munnar/June both present (en + hi entries each). The "No referring sitemaps detected" note in `gsc-canonical-consolidation-2026-05-11.md` is about pre-deploy crawls — current state is correct.

---

## Apex 2-hop chain — platform-config follow-up

`https://nakshiq.com/destination/munnar/june` has the chain:

```
nakshiq.com → 301 → www.nakshiq.com (same path)
www.nakshiq.com/destination/X → 301 → /en/destination/X
```

Two 301s before reaching the indexable URL. Google's docs explicitly recommend ≤1 hop. Middleware can't collapse this because the apex→www redirect runs at Vercel's edge before middleware executes.

**Action for Ashish (Vercel dashboard, not code):**
1. Vercel → nakshiq.com project → Settings → Domains
2. Find `nakshiq.com` apex entry → "Redirect to" — currently points at `www.nakshiq.com/<same-path>`
3. Investigate whether Vercel supports a redirect rewrite that goes directly to `www.nakshiq.com/en/<path>` (path-rewriting on apex redirects is supported on Pro/Enterprise tiers).

If Vercel can't do the path rewrite, an alternative is to flip the canonical: switch the primary domain from `www.nakshiq.com` to `nakshiq.com` and run the locale-prefix in middleware as today — same number of hops but the apex redirect goes away.

---

## GA4 / Analytics — minor inconsistency

[apps/web/src/app/[locale]/layout.tsx:307](apps/web/src/app/[locale]/layout.tsx#L307) initial config fires with `page_path: __pp` (pathname only — no querystring), while [apps/web/src/components/ga4-route-tracker.tsx:44-51](apps/web/src/components/ga4-route-tracker.tsx#L44-L51) route-change page_views fire with pathname + querystring concatenated.

GA4 sees `/destination/munnar/june` (first load) vs `/destination/munnar/june?ref=email` (next nav from same session) as two different `page_path` values. Splits landingPagePlusQueryString attribution.

Impact is small — most landing-page reports use `landingPagePlusQueryString` which already includes the query, and the initial fire is the canonical landing record. Deferred — not making this change without explicit user direction.

Still-pending user action items from CLAUDE.md:
- Register `aio_referral` as a GA4 user-scoped custom dimension (Admin → Custom definitions). The `gtag('set', 'user_properties', {aio_referral: 'true'})` call at layout.tsx:310 is already firing; without the dimension registered, the values are dropped on the server side.

---

## Updated priority queue (carrying forward)

1. **Re-measure Kasol/May + Munnar/June CTR on 2026-05-22** (~7 days for re-crawl + SERP propagation). Title same, description now ~15 chars more usable.
2. **Re-validate the 26 remaining 404s** — unchanged from 5/15 main audit.
3. **Audit "Page with redirect" 2,679 bucket** — unchanged from 5/15 main audit.
4. **Apex 2-hop chain** — Vercel dashboard action item (above).
5. **Register GA4 `aio_referral` custom dimension** — Admin action, recurring on the user-action list.
