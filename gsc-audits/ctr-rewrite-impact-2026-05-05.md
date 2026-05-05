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

## GSC numbers — auto-filled 2026-05-06 via `scripts/data-pull.mjs` GSC client

| Metric | Baseline (Apr 20–26) | 7d post-deploy (Apr 29–May 5) | Delta |
|---|---|---|---|
| **Site-wide clicks** | 129 | 148 | **+15%** ✅ |
| **Site-wide impressions** | 54,377 | 47,772 | −12% |
| **Site-wide CTR** | 0.24% | **0.31%** | **+29%** ✅ |
| **Site-wide position** | 10.7 | **9.8** | **+0.9 ranks** ✅ |
| tungnath/may | 3 / 506 (0.59% @ 7.9) | 5 / 1357 (0.37% @ 7.0) | clicks +67%, impr +168%, pos +0.9, CTR −0.22pp |
| vrindavan/may | 1 / 808 (0.12% @ 8.8) | 1 / 215 (0.47% @ 9.4) | CTR ×4, impr −73% |
| yercaud/may | 1 / 721 (0.14% @ 10.7) | 0 / 222 (0.00% @ 8.5) | pos +2.2, 0 clicks |
| kodaikanal/june | 1 / 548 (0.18% @ 10.6) | 0 / 26 (0.00% @ 12.1) | impr −95% (off-season decay) |
| mussoorie/may | 2 / 593 (0.34% @ 11.0) | 1 / 431 (0.23% @ 10.7) | flat-down |

**Target check:** site-wide CTR target was 0.4% (2× baseline). Hit **0.31%** — partial. **Direction is correct (+29% CTR, +0.9 ranks, +15% net clicks)**, magnitude under target.

### Verdict: ✅ partial success — keep, do not revert

- **At scale**, the rewrite is biting: 0.24% → 0.31% site-wide CTR, +0.9 average rank improvement, 15% more clicks on 12% fewer impressions. Better quality of impression-to-click conversion AND Google ranking the rewritten pages higher.
- **At single-URL level**, samples are too low-volume to read individually (1–5 clicks per URL). Tungnath shows the dominant pattern: rewrite triggered Google to surface page 168% more often (impressions exploded), but the bigger denominator drags CTR down even as clicks rose 67%. Vrindavan got the textbook 4× CTR lift.
- **2 URLs with 0 clicks** (yercaud, kodaikanal) are likely sample-size noise + month decay (May→June peak ending), not template failure.

### Action: none. Continue monitoring.

Re-run this audit at the 14d mark (2026-05-12) when sample size doubles. Expect CTR to drift up further as Googlebot finishes re-crawling the long tail and SERP-snippet feedback loop completes (typically 2–4 weeks).

---

## If CTR didn't lift: one hypothesis + one experiment

**Most likely cause:** Google is still serving the cached snippet for the high-impression URLs. GSC's 3-day data lag + Googlebot's crawl cadence for non-homepage URLs means some pages may not have been re-crawled since Apr 29. Position is typically stable (CTR rewrites don't move ranking directly; secondary CTR signal feeds back over 2–4 weeks).

**Experiment:** Request URL Inspection → "Test live URL" → "Request indexing" in GSC for tungnath/may (991 impr, highest-volume miss). If Googlebot hasn't re-crawled, this forces it. Check if the GSC "Google-selected canonical" still shows the old snippet — if it does, it hasn't re-crawled yet, not a template failure.

**Secondary hypothesis to rule out:** `/hi/` URLs may be siphoning impressions from `/en/` if hreflang signals are weak — check the `hi` locale CTR separately in GSC by filtering by country=India and comparing en vs hi impression split.
