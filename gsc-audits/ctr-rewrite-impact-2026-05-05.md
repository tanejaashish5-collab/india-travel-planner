# CTR Rewrite Impact — 7d Post-Deploy (2026-05-05)

**Deploy date:** 2026-04-29  
**Audit date:** 2026-05-05 (first day GSC data fully reflects deploy; 3-day lag)  
**Templates rewritten:** dest×month · where-to-go monthly · state×month · region×month

---

## Technical: Template regression check

Live-site fetch blocked by Vercel WAF (403 on all 5 URLs). Verified via source-code inspection instead — authoritative for "is the new template still serving."

### dest×month (`/en/destination/[id]/[month]/page.tsx`)

**Title logic (lines 144–197):** Score-keyed hook, TITLE_BUDGET=50, progressive shortening:
- 5 → "Peak season" | 4 → "Great time" | 3 → "Mixed conditions" | 2 → "Tough season" | 1 → "Avoid this month"
- Format: `{name} in {month} {year}: {hook} ({temp})` → shorter fallbacks until ≤50 chars

**Description logic (lines 221–262):** Verdict-keyed verb-first lead:
- `go` → "Visit {name} in {month} {year}: …`
- `skip` → "Skip {name} in {month} {year}: …`
- `wait` → "Wait on {name} in {month} {year}: …`
- Closes with `NakshIQ verdict: {score}/5 ({state}).`

**Status: ✅ New template confirmed in code — NOT reverted.**

### where-to-go monthly (`/en/where-to-go/[month]/page.tsx`)

Title leads with count + "5/5 picks" (lines 150–156). Description front-loads score count (lines 158–164).  
**Status: ✅ New template confirmed.**

### region×month (`/en/region/[id]/[month]/page.tsx`)

Same pattern as where-to-go, region-scoped count (lines 63–73).  
**Status: ✅ New template confirmed.**

---

## URL-level checks

| URL | Template | Verdict hook | Verb-first desc | Title ≤60 | Status |
|---|---|---|---|---|---|
| /en/destination/tungnath/may | dest×month | ✅ score-keyed | ✅ verdict-keyed | ✅ budget=50+10 | ✅ |
| /en/destination/vrindavan/may | dest×month | ✅ | ✅ | ✅ | ✅ |
| /en/destination/yercaud/may | dest×month | ✅ | ✅ | ✅ | ✅ |
| /en/destination/kodaikanal/june | dest×month | ✅ | ✅ | ✅ | ✅ |
| /en/destination/mussoorie/may | dest×month | ✅ | ✅ | ✅ | ✅ |

*Note: Live fetch 403'd (Vercel WAF). Status reflects source-code verification, not live HTTP check.*

---

## GSC numbers — Ashish to fill in

**Link:** https://search.google.com/search-console/performance/search-analytics?resource_id=https%3A%2F%2Fwww.nakshiq.com%2F&num_of_days=7

Set date range to last 7 days (Apr 29 – May 5). Compare to baseline Apr 20–26.

| Metric | Baseline (Apr 20–26) | 7d post-deploy (Apr 29–May 5) | Delta |
|---|---|---|---|
| Site-wide CTR | 0.2% | _fill_ | _fill_ |
| tungnath/may CTR | 0.1% (1/991) | _fill_ | _fill_ |
| vrindavan/may CTR | 0.9% (2/217) | _fill_ | _fill_ |
| yercaud/may CTR | ~0.1% | _fill_ | _fill_ |
| kodaikanal/june CTR | ~0.1% | _fill_ | _fill_ |
| mussoorie/may CTR | 0.3% (2/593) | _fill_ | _fill_ |

**Target:** site-wide CTR ≥0.4% (2× baseline) indicates rewrite is biting.

---

## If CTR didn't lift: one hypothesis + one experiment

**Most likely cause:** Google is still serving the cached snippet for the high-impression URLs. GSC's 3-day data lag + Googlebot's crawl cadence for non-homepage URLs means some pages may not have been re-crawled since Apr 29. Position is typically stable (CTR rewrites don't move ranking directly; secondary CTR signal feeds back over 2–4 weeks).

**Experiment:** Request URL Inspection → "Test live URL" → "Request indexing" in GSC for tungnath/may (991 impr, highest-volume miss). If Googlebot hasn't re-crawled, this forces it. Check if the GSC "Google-selected canonical" still shows the old snippet — if it does, it hasn't re-crawled yet, not a template failure.

**Secondary hypothesis to rule out:** `/hi/` URLs may be siphoning impressions from `/en/` if hreflang signals are weak — check the `hi` locale CTR separately in GSC by filtering by country=India and comparing en vs hi impression split.
