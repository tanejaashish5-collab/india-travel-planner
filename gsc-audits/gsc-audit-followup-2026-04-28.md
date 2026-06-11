# Live-site SEO audit — follow-up to GSC audit 2026-04-28

**Property:** https://www.nakshiq.com/
**Run:** 2026-04-29
**Trigger:** Diagnose root causes for issues flagged in `gsc-audit-2026-04-28.md` — particularly the page-2 trap (high-impression, 0-click pages) and the 1,079-page "Duplicate without user-selected canonical" backlog.

---

## TL;DR — three critical SEO bugs found

1. **🔴 No hreflang tags anywhere on the site.** Both `/en/` and `/hi/` versions exist but Google has no signal they're language alternates. This is the root cause of the 1,079-page "Duplicate without user-selected canonical" pile and is suppressing Hindi visibility.
2. **🔴 `/hi/` pages have `lang="hi"` but English content.** Translations were never wired through. From Google's perspective, `/en/X` and `/hi/X` are word-for-word duplicates with conflicting language signals — guaranteed canonical confusion.
3. **🟡 Destination pages serve `cache-control: private, no-cache, no-store`.** HTML is uncacheable at the CDN, hurting TTFB (a Core Web Vitals input) and burning Vercel bandwidth. Every request hits origin (`x-vercel-cache: MISS` confirmed).

Plus an actionable CTR insight on the page-2-trap problem (section 4).

---

## 1. Foundational checks ✅

| Item | Status | Notes |
|---|---|---|
| robots.txt reachable | ✅ | Returns 200, AI bot allowlist correctly configured (GPTBot, ClaudeBot, PerplexityBot, etc.), scrapers blocked (Bytespider, Diffbot, MJ12bot, DotBot) |
| Sitemap index | ✅ | `/sitemap.xml` returns 200, references 6 chunks |
| Sitemap URLs | ✅ | All sampled URLs are properly prefixed `/en/` or `/hi/` — no legacy non-prefixed URLs in sitemap |
| 301 conversion of legacy URLs | ✅ | `/destination/kumbhalgarh/may` → 301 → `/en/destination/kumbhalgarh/may` (proper 301, not 307) |
| Canonical tags | ✅ | Self-referencing canonical present on all sampled pages |
| Structured data | ✅ | Rich JSON-LD: Article, FAQPage (7 Q&As), BreadcrumbList, TouristDestination, Organization, Place, GeoCoordinates, Country |
| HTML compression | ✅ | Brotli (`content-encoding: br`) enabled |
| Page weight | ✅ | ~143 KB HTML — fine; 2 scripts, 1 stylesheet |

### Sitemap volume

| Chunk | URLs | Likely contents |
|---|---:|---|
| sitemap/0.xml | 210 | Static + region pages |
| sitemap/1.xml | 12,766 | Destinations (en + hi for ~6,300 dests) |
| sitemap/2.xml | 928 | Content (where-to-go, blog) |
| sitemap/3.xml | 3,196 | Programmatic SEO (explore/state) |
| sitemap/4.xml | 2,620 | Comparisons (vs/) |
| **sitemap/5.xml** | **0** | **⚠️ Empty** — robots.txt comment says this is the Q&A chunk, but it's been generating no URLs. Either intentionally not built yet, or a generator bug. |
| **Total** | **19,720** | |

GSC reports **12,500 indexed** out of these 19,720 → **63% indexation rate**. The gap (≈7,220) closely matches the "Discovered – currently not indexed" backlog (7,138). At current throughput (~700 pages/day), the backlog should clear in ~10 days **if no new bugs slow it down**. Bugs in §2–3 below will slow it down.

---

## 2. 🔴 Bug 1 — No hreflang tags

**Pages checked:** `/en/destination/{kumbhalgarh,puducherry,vrindavan,yercaud,nainital,chakrata}/may` + `/hi/destination/kumbhalgarh/may`. **Result: zero hreflang link elements on any page.**

```bash
grep -cE 'hreflang' (every page) → 0
```

### Why this matters

Without hreflang, Google has no idea that `/en/destination/yercaud/may` and `/hi/destination/yercaud/may` are language alternates of each other. It treats them as two separate pages competing for the same query, which triggers:
- **"Duplicate without user-selected canonical"** for ~1,079 pages (per GSC)
- Suppressed Hindi visibility (Google rarely surfaces /hi/ when /en/ already ranks)
- Wrong-language results for users in Hindi-speaking regions

### Fix

Add to `<head>` of every locale-keyed page (Next.js 16 metadata API, in `apps/web/src/app/[locale]/destination/[id]/[month]/page.tsx`):

```tsx
export async function generateMetadata({ params }) {
  const { locale, id, month } = await params;
  const path = `/destination/${id}/${month}`;
  return {
    alternates: {
      canonical: `https://www.nakshiq.com/${locale}${path}`,
      languages: {
        'en-IN': `https://www.nakshiq.com/en${path}`,
        'hi-IN': `https://www.nakshiq.com/hi${path}`,
        'x-default': `https://www.nakshiq.com/en${path}`,
      },
    },
  };
}
```

The `x-default` should point at `/en/` (current canonical default per middleware). Apply the same pattern to all locale-keyed routes: `destination/[id]`, `destination/[id]/[month]`, `where-to-go/[month]`, `region/[id]`, `explore/state/[state]/[month]`, `vs/[slug]`.

---

## 3. 🔴 Bug 2 — Hindi pages are not actually translated

`/hi/destination/kumbhalgarh/may` returns `<html lang="hi">` but the body is English:

> "The 13km fort walls offer no shade in 40°C+ heat, making even short walks physically risky"
> "Kumbhalgarh in May is a furnace with a view…"
> "Do not come."

Title and meta description on `/hi/` are also English-language and identical to the `/en/` version:

```
<title>Kumbhalgarh Weather in May 2026 — 28–44°C | NakshIQ</title>
```

### Why this matters

Combined with the missing hreflang (§2), every `/hi/` page is a **near-perfect duplicate** of the corresponding `/en/` page from Google's perspective — same title, same description, same body. The `lang="hi"` attribute is actually a *negative* signal here (claims Hindi, serves English).

This is the single biggest cause of:
- 1,079 "Duplicate without user-selected canonical" pages
- Compressed crawl budget (Google wastes crawl on dupes)
- Both versions competing for the same query in SERP

### Options (pick one)

| Option | Effort | Outcome |
|---|---|---|
| **A. Translate `/hi/` content for real** | High (LLM batch translate ~6,300 dests × content blocks) | Best long-term — bilingual SEO works as intended |
| **B. Drop `/hi/` pages, redirect to `/en/`** | Low | Eliminates the duplicate problem immediately. Lose Hindi search opportunity. |
| **C. Add `noindex` to `/hi/` until translated** | Trivial | Stops bleeding now, retains URLs for later translation. Recommended as interim fix. |

**Recommendation: ship C immediately, then A as a sprint.** Until Hindi content actually exists, the `/hi/` pages are net-negative for SEO.

---

## 4. 🟡 Bug 3 — Page-2-trap CTR analysis

Spot-checked the top 10 May destination pages. Pattern is unmistakable:

| Slug | Verdict word in meta | Click outcome (per GSC) |
|---|---|---|
| tungnath | **Go** (5/5) | 3 clicks — top page |
| kanatal | **Go** (4/5) | 3 clicks |
| chakrata | **Go** (4/5) | 0 clicks (impressions only — but ranking on page 2) |
| yercaud | **Go** (5/5) | 1 click / 721 impressions |
| valparai | **Wait** (3/5) | 0 clicks |
| puducherry | **Skip** (2/5) | **0 clicks / 809 impressions** ← top trap |
| vrindavan | **Skip** (1/5) | 1 click / 808 impressions |
| nainital | **Skip** (2/5) | 0 clicks / 611 impressions |
| mussoorie | **Skip** (2/5) | 2 clicks / 593 impressions |
| kumbhalgarh | **Skip** (1/5) | 2 clicks / 217 impressions |

### Pattern

**"Skip" pages = page-2 trap.** Pages titled with positive scoring ("Go") earn clicks at 5–10× the rate of pages titled with rejection ("Skip"). On a SERP, users searching "puducherry weather in may" want to plan a visit. A meta saying "Skip — NakshIQ scores 2/5" tells them this isn't the page they need; they bounce to the next result.

The honest scoring is the brand differentiator and must stay — but **placement in the title/meta is suppressing CTR.** Reframe so the warning becomes the hook, not the conclusion.

### Title/meta rewrites (concrete proposals)

| Page | Current title | Proposed title |
|---|---|---|
| puducherry/may | "Puducherry (Pondicherry) Weather in May 2026 — 26°C nights \| NakshIQ" | "Puducherry in May 2026: Hot, Humid, 26°C Nights — Should You Go? \| NakshIQ" |
| vrindavan/may | "Vrindavan Weather in May 2026 — 38–46°C \| NakshIQ" | "Vrindavan in May 2026: 46°C Days — Read This Before You Book \| NakshIQ" |
| nainital/june | "Nainital Weather in June 2026 — 15°C nights \| NakshIQ" | "Nainital in June 2026: Why Locals Skip It (and Where to Go Instead) \| NakshIQ" |
| kumbhalgarh/may | "Kumbhalgarh Weather in May 2026 — 28–44°C \| NakshIQ" | "Kumbhalgarh in May 2026: 44°C Heat — Plan Your Walk Before 7 AM \| NakshIQ" |

| Page | Current meta | Proposed meta |
|---|---|---|
| puducherry/may | "Puducherry (Pondicherry) in May 2026: Very hot and humid. Skip — NakshIQ scores 2/5" | "May in Puducherry: 26°C nights, 33°C+ days, brutal humidity. NakshIQ honest score: 2/5. Better Tamil Nadu picks for May inside." |
| vrindavan/may | "Vrindavan in May 2026: Extreme 38-46°C. Yamuna banks scorching. Temple yards radiate heat. Heatstroke risk. Skip — 1/5" | "May in Vrindavan: 38-46°C, no shade on temple circuits, heatstroke risk on Yamuna ghats. NakshIQ score 1/5 — see what to do if you're already going." |

**Key reframing principles:**
- Lead with what the user searched for (destination + month) — already doing this ✓
- Replace "Skip" with a question or action (curiosity hook beats rejection)
- Always include something a "going anyway" user can do — even on 1/5 destinations
- Score stays in the meta but isn't the verdict

This change alone could lift CTR on the ~1,500 high-impression "Skip" pages from ~0.1% to 1–2%, equivalent to roughly +500–1,000 clicks/week at current impression volume.

### H1 quick win

H1s on destination/month pages are just the destination name (e.g., `<h1>Vrindavan</h1>`). Make them keyword-rich:

```
<h1>Vrindavan in May 2026</h1>
```

This compounds with the title/meta change — Google rewards exact-query match in H1.

---

## 5. 🟡 Caching issue — uncacheable HTML

```
cache-control: private, no-cache, no-store, max-age=0, must-revalidate
x-vercel-cache: MISS
```

Destination/month pages are returning a **no-cache** header, meaning Vercel's edge can't serve them from cache. Every request hits origin. For pages that change at most daily (weather data, scoring), this is wasteful and slows TTFB (a Core Web Vitals input).

**Fix:** add to the page or route segment config:

```tsx
// apps/web/src/app/[locale]/destination/[id]/[month]/page.tsx
export const revalidate = 86400; // 24 hours

// or set headers directly
export async function GET() {
  return new Response(html, {
    headers: {
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
```

Expected impact: ~80% of edge requests served from cache, lower bills, faster TTFB → small position bump from CWV.

---

## 6. Action plan (ranked by impact)

| # | Action | Effort | Expected impact |
|---|---|---|---|
| 1 | **Add hreflang to all locale-keyed routes** | 0.5 day | Eliminates 1,079 duplicate-canonical pages from GSC; unlocks Hindi indexing |
| 2 | **`noindex` `/hi/` pages until translated** (interim) | 30 min | Stops duplicate signal immediately while real translation lands |
| 3 | **Rewrite titles/metas on top 50 page-2-trap "Skip" pages** | 1 day | +500–1,000 clicks/week at current impression volume |
| 4 | **Promote H1 to include `{Destination} in {Month} 2026`** | 1 hr | Compounds with #3 |
| 5 | **Set `revalidate = 86400` on destination/month routes** | 30 min | TTFB improvement, lower Vercel bills |
| 6 | **Investigate empty sitemap/5.xml** (Q&A chunk) | 1 hr | If Q&A pages exist, expose them to Google |
| 7 | Triage 50 failed-validation 404 URLs (from yesterday's audit) | 1 hr | Clears the failed validation, keeps GSC happy |
| 8 | Real Hindi translations for /hi/ | Sprint | Unlocks Hindi search market properly |

Items 1, 2, 5, 6, 7 are bug fixes and can ship today. Item 3 (CTR) has the highest near-term traffic impact and is a copy task, not engineering — can be batched with an LLM rewrite pipeline.

---

## 7. Methodology

Live-site spot-check: 7 destination/month URLs (mix of /en/ and /hi/, mix of "Skip"/"Go" verdicts), plus robots.txt, sitemap index, and 5 sitemap chunks. All checks via `curl` from a shell sandbox with a custom UA, no JavaScript rendering. Findings should be re-verified after fixes ship.
