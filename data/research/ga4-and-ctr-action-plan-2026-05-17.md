# GA4 + CTR Action Plan — 2026-05-17

**Triggered by:** `data/research/data-baseline-2026-05-17.md` audit.
**Direction approved:** template hook upgrade + override columns later (CTR); client bot guard + GA4 Admin filter (GA4 bots).

---

## What I shipped today (code)

### 1. Title-hook upgrade — `apps/web/src/app/[locale]/destination/[id]/[month]/page.tsx`

Replaced score-based judgmental verdict labels with action/info-led hooks. Ships across all 505 dests × 12 months = **6,060 pages** automatically via the template.

| Score | Verdict | Old hook (en) | New hook (en) | Old (hi) | New (hi) |
|---:|---|---|---|---|---|
| 5 | go | Peak season | **Peak month** | उच्च मौसम | सबसे अच्छा महीना |
| 4 | go | Great time | **Best window** | बढ़िया समय | बेहतरीन समय |
| 3 | wait | Mixed conditions | **Worth waiting?** | मिश्रित स्थिति | क्या रुकें? |
| 2 | tough | Tough season | **Plan carefully** | कठिन मौसम | सोच-समझकर जाएँ |
| 1 | skip | Avoid this month | **What to expect** | इस महीने टालें | क्या उम्मीद करें |

**Why this should lift CTR on the 5 flagged pages:**
- `/en/vrindavan/may` (score 1, 0.29% CTR) → was `… — Avoid this month`, now `… — What to expect`. Users searching "vrindavan temperature in june" usually have a religious/family reason already locked in. They want info, not a verdict. The note body actually contains the actionable answer ("go pre-dawn 4-6am") — the new hook signals that info is inside.
- `/en/munnar/june` (score 1, 0.36%) → same fix. Note body explains landslide windows + when to come instead.
- `/hi/darjeeling/may` (score 3, 0.21%) → was मिश्रित स्थिति (passive judgment), now क्या रुकें? (question form). Questions historically earn the curiosity click.
- `/en/kasol/may` (score 5, 0.35%) + `/en/yercaud/may` (score 4, 0.21%) → smaller delta. New "Peak month" / "Best window" are tighter and slightly more concrete than "Peak season" / "Great time", but **the real lift on these will need per-page override copy** (see deferred work below) — at position 7-9 against MakeMyTrip / TripAdvisor the templated hook alone won't differentiate.

**Char-budget check (all fit ≤50 char title budget pre-suffix):**
- `Vrindavan in May 2026, 38–46°C — What to expect` = 47 ✓
- `Munnar in June 2026, 14–22°C — What to expect` = 45 ✓
- `Darjeeling in May 2026, 14–22°C — Worth waiting?` = 49 ✓
- `Kasol in May 2026, 14–26°C — Peak month` = 39 ✓
- `Yercaud in May 2026, 18–30°C — Best window` = 42 ✓

**Ranking-risk check:** Google may re-evaluate snippets on next crawl. There's a small risk of position shift (positive or negative) as the new title signals re-index. Monitor via daily GSC audit; baseline is in `data-baseline-2026-05-17.md`. Expected timeline: 7-14 days for Google to swap the snippet in SERPs.

### 2. Client-side bot guard — `apps/web/src/lib/analytics.ts`

Added `isLikelyBot()` check at the top of `track()`. Memoised so it runs once per page.

Catches:
- `navigator.webdriver` (headless Chrome/Firefox automation flag)
- UA tokens: bot, crawler, spider, headless, phantom, puppeteer, playwright, selenium, wget, curl, chatgpt, claudebot, gptbot, ccbot, perplexity
- Missing `navigator.languages` (stripped runtimes)
- Failed `localStorage` write (privacy-mode browsers OR sandboxed bots)

**Does NOT catch** (won't pretend it does):
- Sophisticated residential-proxy fleets that ship real Chrome with normal UA
- Bots that have learned to fake navigator.webdriver=false (some scraping-as-a-service products do this)

**Expected impact**: the 49K → 25K-per-event counts should drop sharply within 24-48h of deploy. If the count *doesn't* drop, the bot fleet is using full real-Chrome (residential proxies) and the fix will need a server-side challenge (Cloudflare Turnstile or similar).

---

## What you need to do in GA4 Admin (manual — I can't do this for you)

### A. Configure Data Filters — 5 minutes

1. Go to **GA4 → Admin (gear icon) → Property → Data Filters**
2. Click **Create Filter**
3. **Filter 1: Developer traffic**
   - Filter name: `Exclude developer traffic`
   - Filter type: **Developer traffic**
   - Filter state: **Active** (not Testing)
   - Save.
4. **Filter 2: Internal traffic** (only if you set `traffic_type=internal` cookie/header — if not, skip)
   - Filter name: `Exclude internal traffic`
   - Filter type: **Internal traffic**
   - Parameter value: `internal`
   - Save.

### B. Create the "Real Humans" audience for reports — 3 minutes

1. **GA4 → Admin → Audiences** → **New audience**
2. Click **Create a custom audience**
3. Name: `Real Humans (non-bot)`
4. Description: `Engaged sessions from likely-human geos with >10s session duration`
5. Conditions (AND):
   - **Session default channel group** does NOT contain `Direct`
   - **Country** is one of `India, Australia, United States, Singapore, United Arab Emirates`
   - **Average session duration** > `10` (seconds)
6. Membership duration: 30 days
7. Save.

Then in every report, click **Add comparison** → use **Audience name = Real Humans (non-bot)** → that becomes the default human-only view.

### C. Housekeeping — investigate duplicate event rows — 2 minutes

The audit caught two definition records for each of these events (one flagged as Key event with bot counts, one not flagged with single-digit counts):
- `scroll_75_destination`
- `share_click`
- `outbound_booking_click`
- `save_destination`

Go to **GA4 → Admin → Events** → look for duplicates → if two rows exist for the same name, the *unflagged* one is the GA4-auto-collected version. Delete or merge it so reports don't split human signal across two rows.

---

## Deferred work (next sprint) — DB override columns for top-50 imp pages

For the 5 (and ~45 more) highest-impression pages, template hooks alone can't compete with TripAdvisor / MakeMyTrip at positions 7-12. The fix is per-page editorial copy.

### Migration to write

```sql
-- supabase/migrations/032_destination_month_overrides.sql
ALTER TABLE destination_months
  ADD COLUMN IF NOT EXISTS title_override text,
  ADD COLUMN IF NOT EXISTS title_override_hi text,
  ADD COLUMN IF NOT EXISTS meta_description_override text,
  ADD COLUMN IF NOT EXISTS meta_description_override_hi text;

COMMENT ON COLUMN destination_months.title_override IS
  'Per-page SERP title. Bypasses template. Hard 50-char limit (pre " | NakshIQ" suffix). Used for top-impression pages flagged for CRO.';
COMMENT ON COLUMN destination_months.meta_description_override IS
  'Per-page SERP meta description. Bypasses template. Hard 155-char limit. Used for top-impression pages flagged for CRO.';
```

### Template change

In `generateMetadata()`:
```ts
const title = (isHi ? monthData?.title_override_hi : monthData?.title_override)
  || /* existing titleLong → titleMed → titleMinWeather → titleMin fallback chain */;

const description = (isHi ? monthData?.meta_description_override_hi : monthData?.meta_description_override)
  || /* existing computed description */;
```

### Initial copy set — write these 5 by hand once the migration ships

| Page | Proposed title (50ch) | Proposed meta description (155ch) |
|---|---|---|
| /en/vrindavan/may | `Vrindavan in May: pre-dawn darshan only` | `38–46°C, marble courtyards radiate heat. Banke Bihari darshan 4-6am or after 7pm; AC mandatory. Pilgrimage works if you go before sunrise. NakshIQ verdict: 1/5.` |
| /en/munnar/june | `Munnar in June: monsoon closes the high range` | `14–22°C, 800-1000mm rainfall, NH85 landslide-prone, Eravikulam suspends visits, viewpoints fogged. Plan for October instead — full breakdown inside.` |
| /hi/darjeeling/may | `मई में दार्जिलिंग: एक छोटा गाइड क्या उम्मीद करें` | `14–22°C, हाज़े से पहाड़ी दृश्य कम। मानसून-पूर्व नमी बढ़ रही। चाय बगान हरे, पर भीड़ बढ़ी। मार्च-मई या अक्टूबर-नवंबर बेहतर। NakshIQ रेटिंग: 3/5।` |
| /en/kasol/may | `Kasol in May: 14–26°C, Kheerganga open` | `Peak Parvati Valley window — Kheerganga, Tosh, Malana all accessible. Weekend backpacker rush. Israeli cafés packed; book early. NakshIQ verdict: 5/5.` |
| /en/yercaud/may | `Yercaud in May: coffee bloom, last 10d wet` | `Summer-migration spillover, 18-30°C. First fortnight clean — coffee flowering peak, hotel rates low. Last 10 days bring SW-monsoon. NakshIQ verdict: 4/5.` |

### How to expand — process for top 50 pages

1. Daily GSC audit → identify any page with >500 imp / <1% CTR / >7 day persistence
2. Add to a `data/cro/title-overrides.csv` queue
3. Weekly batch: copywriter (or me) writes overrides → SQL UPDATE into `destination_months` → ship
4. Track CTR delta 14 days post-override per page

**Effort estimate:** 2 hours per batch of 10 overrides + the one-time migration. ~10 hours total to clear the current top-50 backlog.

---

## How we'll know it worked

| Signal | Where to check | Expected timeline | Threshold |
|---|---|---|---|
| Bot-event drop | `node scripts/_audit-key-events.mjs` re-run | 48h after deploy | email_signup count drops from 49K toward <5K |
| CTR lift on flagged pages | Daily GSC audit | 7-14 days | /en/vrindavan/may + /en/munnar/june from 0.29-0.36% → >1% |
| No ranking regression | Daily GSC audit "lost-ground" query | continuous | Stays at 0 rows (was 0 today) |
| Real-human conversion visibility | GA4 reports w/ Real Humans audience | immediate | Funnel shows accurate organic-search-only event counts |

If 14 days post-ship the CTR fix hasn't moved the needle on /en/vrindavan/may and /en/munnar/june — that's the signal to greenlight the migration + override columns.

---

## Files changed this session

| File | Change |
|---|---|
| `apps/web/src/lib/analytics.ts` | Added `isLikelyBot()` guard at top of `track()` |
| `apps/web/src/app/[locale]/destination/[id]/[month]/page.tsx` | Replaced 5 score-keyed title hooks (en + hi); old labels removed |
| `data/research/ga4-and-ctr-action-plan-2026-05-17.md` | This doc |
| `scripts/_audit-key-events.mjs` | One-off audit script (left in place for re-run) |
| `scripts/_inspect-ctr-leak-rows.mjs` | One-off DB inspection script (left in place) |

## Sources

- [data/research/data-baseline-2026-05-17.md](./data-baseline-2026-05-17.md) — the audit that triggered this plan
- [gsc-audits/gsc-audit-2026-05-16.md](../../gsc-audits/gsc-audit-2026-05-16.md) — last Chrome-MCP GSC pull
- [data/research/ga4-audit-2026-05-03.md](./ga4-audit-2026-05-03.md) — prior GA4 audit (2wk stale; this plan supersedes its P0 items)
