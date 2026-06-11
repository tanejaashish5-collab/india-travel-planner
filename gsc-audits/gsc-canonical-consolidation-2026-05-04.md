# GSC Canonical Consolidation — Status Report
**Date:** 2026-05-04 (T+7 days from April 27 deploy)
**Task:** Verify canonical consolidation for 5 non-prefixed URLs and request indexing in GSC.

## Summary

The April 27 snippet rewrite + cache prewarm deploy is **fully live and serving correctly** on all 5 target URLs. All technical SEO signals (301 redirect, self-canonical, hreflang, x-default) are healthy. The remaining work — clicking "REQUEST INDEXING" in GSC URL Inspection — could not be executed automatically because the Chrome extension was not reachable during this run. **User action required for the GSC UI step.** See action list at bottom.

## What I verified externally (no GSC access needed)

For each non-prefixed URL, I confirmed:

| URL | Redirect | Status | Canonical | hreflang | Snippet |
|---|---|---|---|---|---|
| `/destination/kumbhalgarh/may` | **301** → `/en/...` | 200 | self → `/en/...` ✓ | en, hi, x-default → `/en/...` ✓ | "Skip Kumbhalgarh in May 2026: Brutal 28-44°C..." (rewritten ✓) |
| `/destination/vrindavan/may` | **301** → `/en/...` | 200 | self → `/en/...` ✓ | en, hi, x-default → `/en/...` ✓ | "Skip Vrindavan in May 2026: Heat-pilgrimage: 38-46°C..." (rewritten ✓) |
| `/destination/yercaud/may` | **301** → `/en/...` | 200 | self → `/en/...` ✓ | en, hi, x-default → `/en/...` ✓ | "Visit Yercaud in May 2026: 15-28°C, Eastern Ghats coffee..." (rewritten ✓) |
| `/destination/chakrata/may` | **301** → `/en/...` | 200 | self → `/en/...` ✓ | en, hi, x-default → `/en/...` ✓ | "Visit Chakrata in May 2026: Warm 14-26°C..." (rewritten ✓) |
| `/destination/pondicherry/may` | **301** → `/en/...` | 200 | self → `/en/...` ✓ | en, hi, x-default → `/en/...` ✓ | "Skip Pondicherry (Puducherry) in May 2026: peak heat..." (rewritten ✓) |

All 5 emit HTTP/2 301 (the middleware's 307→301 conversion is working). All 5 `/en/` targets emit self-referential canonicals plus correct `hreflang` triples (en, hi, x-default — x-default points to `/en/` per the next-intl 4.9 hreflang fix). The rewritten snippets from April 27 are visible in the live HTML, so when Google does recrawl, it will pick up the new descriptions.

## Google index spot-check (`site:` query proxy)

I ran proxy queries via web search to see what Google currently has indexed:

- **`site:nakshiq.com vrindavan temperature in may`** — surfaces `/en/destination/vrindavan/june` but **not** `/en/destination/vrindavan/may`. Vrindavan-May is not yet in primary index.
- **`site:nakshiq.com kumbhalgarh may`** — surfaces `/en/destination/kumbhalgarh` (the index page) but **not** `/en/destination/kumbhalgarh/may`. Same pattern.
- **`"nakshiq" "yercaud" may`** — surfaces `/en/destination/yercaud` plus other states' May pages (kodaikanal/may, valparai/may, kumarakom/may, gokarna/may, mahabaleshwar/may, spiti-valley/may). The architecture works; **the 5 target URLs are simply lagging behind their peers** for crawl/indexing.

Notably, the non-prefixed versions did not surface in any query — so Google has at least dropped them from active results, which is the first half of consolidation. The second half (recognising `/en/` as the consolidated canonical for these specific month-pages) is what's still pending.

## Why the GSC UI step matters

48 hours of organic recrawl haven't been enough to pick up these 5 URLs yet (as evidenced by the site: probes). Manual "Request Indexing" via URL Inspection bypasses Google's crawl scheduling and forces a re-fetch within hours, not weeks. Doing it for these 5 specific URLs is the highest-leverage SEO action available right now.

## Why I couldn't complete the GSC steps

1. **Chrome extension wasn't reachable** during this run (`Claude in Chrome is not connected` on two retries).
2. Even if it had been, the task notes that **`taneja.ashish5@gmail.com` doesn't have direct access to the GSC property**. Per saved memory ("Google account for NakshIQ"), the right account is **`ashish@forgevoice.studio`** (authuser=5).
3. Performance dashboard CTR analysis requires the same GSC access.

## ⏩ User actions required

Open Chrome signed in as **`ashish@forgevoice.studio`** (authuser=5) and:

### 1. URL Inspection — paste each in turn
GSC URL Inspection: https://search.google.com/search-console/inspect?resource_id=https%3A%2F%2Fwww.nakshiq.com%2F

For each URL below: paste it, wait for the inspection to load, check whether the **User-declared canonical** and **Google-selected canonical** both show the `/en/` version. If the Google-selected canonical is not yet `/en/` (or shows "Inspected URL is not on Google"), click **REQUEST INDEXING**.

1. `https://www.nakshiq.com/destination/kumbhalgarh/may`
2. `https://www.nakshiq.com/destination/vrindavan/may`
3. `https://www.nakshiq.com/destination/yercaud/may`
4. `https://www.nakshiq.com/destination/chakrata/may`
5. `https://www.nakshiq.com/destination/pondicherry/may`

(GSC throttles ~10 indexing requests per property per day — 5 fits comfortably.)

Bonus: if GSC accepts more, also inspect the `/en/` versions of the same paths and request indexing on those too — this gives the canonical target a direct nudge as well.

### 2. Performance dashboard — CTR check on April 27 snippet rewrites
GSC Performance: https://search.google.com/search-console/performance/search-analytics?resource_id=https%3A%2F%2Fwww.nakshiq.com%2F

- Date range: **April 28 → May 4** (post-deploy) vs **April 20 → April 26** (pre-deploy)
- Filter by Query, then check these one at a time:
  - `vrindavan temperature in may`
  - `yercaud weather in may`
  - `chakrata temperature in may`
  - `kanatal in may`
  - `pondicherry weather in may`
  - `darjeeling june weather`
- Look for CTR delta. Even +0.5pp on a high-impression query is meaningful at this traffic level.

If CTR is flat, the cause is almost certainly that the recrawl hasn't happened yet — re-check 48 hours after step 1.

## Reference: technical signals captured (raw)

- Redirects: HTTP/2 301, single hop, `Location: /en/destination/<slug>/may`
- `cache-control: public, max-age=0, must-revalidate` on all redirect responses (correct — re-validates on every request)
- `/en/` pages return `<link rel="canonical" href="https://www.nakshiq.com/en/destination/<slug>/may"/>`
- `<link rel="alternate" hrefLang="en" href=".../en/..."/>`, `hi`, and `x-default` → `/en/...` all emitted via Next.js metadata (per the documented hreflang fix; next-intl `alternateLinks: false` is in effect).
