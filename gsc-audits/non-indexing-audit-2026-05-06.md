# GSC non-indexing audit — 2026-05-06

**Source:** 8 Coverage drilldown CSVs exported by Ashish from GSC ("All known pages" report) into `GSC non indexing/`. Snapshot data through 2026-05-01.
**Site:** sc-domain:nakshiq.com
**Live verification:** all categorical claims below were confirmed by curling production today.

---

## TL;DR

| Bucket | GSC count | Trend | Real action needed? |
|---|---:|---|---|
| Page with redirect | **2,849** | rising +234 in 10d | ❌ Stale Google decay — no fix possible |
| Duplicate without user-selected canonical | **1,200** | rising +121 in 10d | 🟡 Wait — fix already deployed 2026-05-03 |
| Blocked by robots.txt | 562 | stable | ❌ All `_next/*` chunks — correct |
| Alternate page with proper canonical | 138 | stable | ❌ Working as intended |
| Duplicate, Google chose different canonical | **140** | — | 🟡 Mostly hi/* under-translated — wait + measure |
| Excluded by 'noindex' tag | 49 | — | ❌ 47 of 49 are `/share` pages (correct) |
| Crawled - not indexed | 49 | falling 96→49 (good) | 🟡 Quality signal on ~30 dest×month pages |
| **Not found (404)** | **48** | — | 🔴 **2 actionable bugs (43 are stale)** |

**Net actionable today:** ~2 bugs. Everything else is decay, snapshot lag, or working as intended.

---

## 1. Page with redirect (2,849 — rising) — wait it out

**Pattern:** Old pre-`/en/`-prefix URLs (`/destination/X/Y`) and apex no-www URLs (`nakshiq.com/...`) that 301 to canonical (`www.nakshiq.com/en/destination/X/Y`).

**Verified:** All sampled URLs return correct 301 redirects. Sitemap is clean (only `/en/` and `/hi/` URLs listed). Internal linking is clean.

**Why growing:** Google keeps re-crawling old URLs from its memory for 6–12 months post-architecture-change. Each re-crawl sees the 301 and adds it to this bucket. Nothing we generated is feeding the bucket — it's pure decay queue.

**Action:** None. This will resolve naturally over 3–6 months. Optional: submit "Removal" requests in GSC for the highest-volume old patterns (`/destination/*`) to accelerate, but it's a one-by-one UI flow and not worth the time.

---

## 2. Duplicate without user-selected canonical (1,200 — rising) — wait for re-crawl

**Pattern:** 968 of 999 sampled rows are dest×month pages. Hindi-skewed: 627 hi vs 373 en (1.7×). All months affected fairly evenly.

**Verified live:** Sampled `/hi/destination/kinnaur/november`, `/en/destination/drass/february`, `/hi/destination/champhai/may` — **all three have correct self-canonical AND complete hreflang (en, hi, x-default)**.

**Why GSC still flags them:** GSC report is from 2026-05-01. The hreflang/canonical fix landed 2026-05-03 (commit 3ab4d8ef — "kill x-default loop + add BreadcrumbList to state/region hubs"). Google re-crawls long-tail pages every 1–4 weeks. Reports lag actual state.

**Action:** Wait. Re-pull this report 2026-06-01 (4 weeks post-fix). If still rising, escalate — would mean the hreflang signal isn't trusted (likely cause: hi pages are too-thin translations, content too similar to en).

---

## 3. Duplicate, Google chose different canonical (140) — wait + measure

**Pattern by route:**
- 22 `/hi/where-to-go` · 20 `/hi/region` · 13 `/hi/blog` (Hindi consolidated to English)
- 13 `/en/region` · 12 `/en/with-kids` · 11 `/en/blog` (en variants where Google chose another en URL)
- 11 `/hi/skip-list` · 5 `/en/skip-list` (these are stale — see §6)

**Why:** Google folds Hindi into English when it judges hi content too similar to en (translation depth low). This is signal that hi pages need richer translations to earn independent ranking, not a "fix-the-canonical" issue.

**Action:** No code fix. Track over the next 2 reports; if hi pages stay folded, prioritize i18n content depth over feature-building.

---

## 4. Blocked by robots.txt (562) — correct, ignore

All 561 sampled URLs are `/_next/static/chunks/...` or `/_next/static/media/...` — bundler output, correctly disallowed in robots.txt. **No action.**

---

## 5. Alternate page with proper canonical tag (138) — correct, ignore

Properly hreflang'd alternates (`/hi/plan?seed=...`, `/hi/blog/...`, etc). Working as intended. **No action.**

---

## 6. Excluded by 'noindex' tag (49) — 47 correct, 2 stale

- **46 `/destination/X/share`** — share pages are OG-only, noindex correct ✅
- **1 `/hi/explore/tag/mountains`** — tag pages noindex'd by design ✅
- **2 stale**: `/destination/dirang/june` + `/destination/sangla/april` — verified live today, both return 200 with no `<meta name="robots">`. Stale GSC record from a past noindex state. Will resolve on next re-crawl.

**No action.**

---

## 7. Not found 404 (48) — 2 actionable bugs

**Live-verified all 47 URLs in the table:**
- **43 of 47 now return 200** — already fixed since GSC last crawled. Will drop from this bucket on next re-crawl.
- **3 junk URLs**: `/$`, `/10`, `/&` — single-char garbage, ignore.
- **2 real bugs** ↓

### Real bug A: `/skip-list` index page is missing

- `/en/skip-list` and `/hi/skip-list` return 404.
- Linked from `apps/web/src/app/[locale]/more/page.tsx:52`:
  `{ href: p("/skip-list"), label: "Skip list", desc: "Overhyped places we'd actively recommend skipping." }`
- Detail pages (`/skip-list/gangtok`, `/skip-list/mussoorie`) work fine — only the index is missing.
- The `/tourist-traps` page is the actual editorial home for "skip" content (already exists and indexable).

**Fix options:**
- (a) Repoint the `/more` link to `/tourist-traps` (1-line change).
- (b) Build a thin `/skip-list/page.tsx` that redirects to `/tourist-traps` (cleaner: preserves backlinks if any external sites point to `/skip-list`).
- (c) Build a real `/skip-list` index listing all `[slug]` detail pages.

**Recommendation: (b)** — server-side redirect from `/skip-list` → `/tourist-traps`, AND fix the `/more` link to point at `/tourist-traps` directly. Two-line change, eliminates the 404, preserves any old inbound links.

---

## 8. Crawled - currently not indexed (49) — falling, low priority

**Trend:** 96 → 49 over 10 days. Google is steadily indexing more.

**Pattern of remaining 49:**
- ~5 favicon.ico cache-busted variants — junk, ignore
- ~30 dest×month pages where Google saw the page and decided not to index — quality signal
- 3 dest-root pages without month: `/en/destination/surat`, `/en/destination/namchi`, `/en/destination/kumbalangi` — likely thin content
- ~6 vs pages, festivals, with-kids, region pages

**Action:** No code fix today. Check the 3 thin dest-roots in the next data session (improve content depth or noindex if not strategic).

---

## Recommended actions, prioritized

| # | Action | Effort | Reach | Confidence |
|---|---|---|---|---|
| **F1** | Fix `/skip-list` 404 — redirect to `/tourist-traps` + update `/more` link | 5 min | 2 URLs + every visitor of `/more` who clicks "Skip list" | HIGH |
| W1 | Wait — re-pull non-indexing audit at 2026-06-01 to validate the §2 + §3 hi-page hypothesis | passive | 1,340 URLs may resolve | — |
| I1 | Investigate why `/en/destination/surat`, `/namchi`, `/kumbalangi` aren't being indexed (content depth?) | 30 min | 3 URLs | MEDIUM |

Everything else is decay, snapshot lag, working as intended, or under content-quality (not a bug).

---

## Headline takeaway

**The non-indexing report looks scary at 4,200+ URLs but resolves to ~5 actual issues today**, and only 2 are code bugs (the same `/skip-list` thing × en/hi). The rest is Google decay, GSC snapshot lag behind your 2026-05-03 hreflang fix, intentional noindex, or quality signals on Hindi content depth that need strategic decisions, not patches.
