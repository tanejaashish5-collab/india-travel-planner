# NakshIQ Content Strategy v3 — Travel + Leisure Decode

**File:** `content_strategy_v3_tl.csv` (7 rows × 15 cols, same schema as v2)
**Shipped:** 2026-05-19
**Plan reference:** `/Users/ashishtaneja/.claude/plans/do-tier-1-serene-wigderson.md`
**See also:** `content_strategy.csv` (v2, 25 Indian-creator-inspired rows) + `content_strategy_README.md`

## Why this exists

User direction: "Check @travelandleisure — has a lot of followers and great looking posts. Find their content strategy, visuals, captions, formats. Decode and use it for our Indian market. Make sure you do a comprehensive analysis, not surface level."

Travel + Leisure (@travelandleisure, 7M IG; @travelandleisureindia, 395K — both Dotdash Meredith) is a 30-year editorial brand with publication discipline NakshIQ lacks. v3 decodes their 10-format taxonomy and converts 7 patterns into NakshIQ rows. We borrow their **format discipline** (10-slide editorial listicles · drone-led hotel carousels · first-person essay arcs · "Just announced" news cards · annual award franchise · interactive poll reels) and rewrite captions hard for NakshIQ voice rules.

This is a **separate** CSV from v2, not appended, so attribution stays clean and the future Phase 2 autoposter loader can opt into one or both as different rotation pools.

## The 10 T&L formats we decoded (and which 7 we adapted)

| # | T&L format | Type | What they do | v3 row |
|---|---|---|---|---|
| 1 | Listicle carousel ("50 Best / 10 Ways") | 8–10 slide carousel | Hero + numbered destinations + "Save this" close | ✅ `v3_tl_editorial_listicle` |
| 2 | World's Best Awards franchise | Single + reel series | Gold badge on annual winners (30+ year franchise) | ✅ `v3_tl_world_best_india` (format only — actual ops separate) |
| 3 | First-person essay ("I just returned from") | Long-caption carousel | Lifestyle portrait + landscape, byline | ✅ `v3_tl_first_person_essay` |
| 4 | Hotel / resort feature | 5–7 slide carousel | Drone-aerial slide 1 → interior → amenity → dining | ✅ `v3_tl_hotel_drone_feature` |
| 5 | Destination guide / city neighborhoods | 6–8 slide carousel | Neighborhood-by-neighborhood pacing | ✅ `v3_tl_city_neighborhood` |
| 6 | Before / after reality check | 4–5 slide carousel | Polished slide vs reality slide | ❌ Already in v2 (`v2_tourist_trap_split`) |
| 7 | Interactive poll / quiz reel | 30–60s reel | "Would you rather" / "X or Y" | ✅ `v3_tl_poll_reel` |
| 8 | Sponsored "#ad" partnership | Single / reel | Premium drone + partner credit | ❌ Out of scope (we're not running sponsored content yet) |
| 9 | UGC feature (`#TellTNLIndia`) | Carousel / single | Community photo + traveler attribution | ❌ Already in v2 (`v2_ugc_spotlight` with `#nakshiqfound`) |
| 10 | News / announcement ("Just announced") | Single / 10–20s reel | Time-sensitive immediate-relevance hook | ✅ `v3_tl_news_announcement` |

## Row-by-row adaptation rationale (what we kept vs changed)

### 1. `v3_tl_editorial_listicle` (discovery)
**Kept**: 8–10 slide editorial pacing, numbered ranks, "save this" close (T&L's strongest carousel engagement driver per [Carousel Effect study](https://www.tandfonline.com/doi/full/10.1080/02650487.2026.2624918) — +95% save rate).
**Changed**: Slide 1 is a hand-drawn India map (vermillion ink-line), not their luxury aerial photo style. Score chip on every item (verification-first, not just curation). 10 items not 5 (differentiates from existing YT short `_build_listicle`). NakshIQ voice rule: no "must-visit / magical" captions.
**Differentiates from v2**: We have `yt_short.listicle` in YT shorts (`yt_shorts_gen.py:76`). This is a FEED CAROUSEL — different surface, deeper pacing.

### 2. `v3_tl_hotel_drone_feature` (verification)
**Kept**: Drone-aerial slide-1 hero, 6-slide editorial sequence (aerial → exterior → room → amenity → dining → closing card), property-specific deep-dive.
**Changed**: Closing card carries the score chip + "verified booked {verification_date}. Not sponsored." — explicit anti-junket signal. T&L runs partnership content; we don't (yet). Photo set must be field-shot by NakshIQ, not Getty-licensed.
**Differentiates from v1**: `stays_pick` is a single-image card. This is a 6-slide editorial property essay with drone hero.

### 3. `v3_tl_first_person_essay` (moment)
**Kept**: 5-slide essay arc (arrival → mid → mid → mid → byline), human byline at end, long-form text-led.
**Changed**: Byline is `@{writer_handle} · NakshIQ desk` (named writer, never anonymous editorial we-voice). Verdict line carries score `{score}/5` + worth-it one-liner. Comment-CTA is `Drop your answer in the comments — would you go after reading this?` instead of `Click the link in our bio`.
**Differentiates from v2**: `v2_pov_slow_morning` is a <60s sensory reel. This is text-led 5-slide carousel essay — fully different surface.

### 4. `v3_tl_city_neighborhood` (discovery)
**Kept**: 7-slide guide pacing through 5 named neighborhoods, eat/see/avoid three-line block per slide, day-itinerary close.
**Changed**: Hand-drawn city map slide 1 (vermillion ink, not photo). "Avoid in {avoid_window}" line forced — NakshIQ has anti-trap pillar T&L doesn't. Hindi variant flagged in notes (T&L US is monolingual).
**Differentiates from existing**: Web app has state hubs; nothing on IG/reel surface for city-neighborhood pacing.

### 5. `v3_tl_world_best_india` (verdict)
**Kept**: Gold-badge announcement card aesthetic, annual flagship cadence, citation-text justification of the winner, runner-up reveal.
**Changed**: Categories rotate across NakshIQ's 10 dimensions (dest · stay · beach · food city · solo-female · offbeat · monsoon · budget · luxury · arrival airport) — broader than T&L's hotel/airline/destination triangle. Verification-anchored: every winner cites `{audit_count}` field visits. Reveal cadence: one category per day for 10 days each year.
**Caveat**: This row ships the FORMAT only. Actual awards franchise (jury · methodology · partner outreach · legal naming) is a separate multi-month ops project. Don't conflate.

### 6. `v3_tl_poll_reel` (moment)
**Kept**: Split-screen "X or Y" comment-driven structure, comment-CTA hook at the end.
**Changed**: Both halves carry their NakshIQ score (`{score_a}/5` vs `{score_b}/5`) so the poll is data-anchored, not vibes. Reveal at end: "Our data says {data_winner} edges it on {tie_breaker}." Skip-conditions: implausible score gap (4.8 vs 2.1 isn't a contest), HARDCODED_DEST_BLOCKS membership. Pair dests by state-cluster + similar score band (within 0.6 of each other) for fair contest.

### 7. `v3_tl_news_announcement` (verification)
**Kept**: "Just announced:" opener (T&L's news-card hook is one of their highest-engagement reusable templates), single-card simplicity, time-sensitive immediate-relevance.
**Changed**: Required `primary_source_note` field with skip-on-null — no fabricated news. Pinned-comment source link (IG strips URLs from caption body). Hindi variant required for permit/road-opening posts (these affect overland tier-2/3 travelers). max_freq_per_month = 6 because timely news cycles fast.
**Differentiates from existing**: `arrival_intel` is evergreen per-IATA. This is news-of-the-day.

## What WILL NOT translate to NakshIQ (explicit conflicts)

These T&L patterns are NOT in any v3 row — they conflict with our voice or model:

| T&L pattern | Why we don't copy |
|---|---|
| `Kicking your wanderlust into high gear` tagline | `wanderlust` is in our banned-phrase grep |
| Title Case in headlines | We use sentence case per `apps/web/docs/voice.md` |
| English-only captions | We need Hindi parity for tier-2/3 India (5 of 7 rows are Hindi-variant flagged) |
| `Click the link in our bio ⬇️` CTA | Banned: IG strips URLs, we don't have a link-page |
| Getty Images licensing | We can't afford it — use R2 + `#nakshiqfound` UGC + Co-work-generated Banana/Veo |
| 5+ posts/week editorial cadence | We run 1–2 posts/day max from cron — formats SKIP-on-null instead |
| Aspirational influencer voice (`Always a good choice`) | Conflicts with verification-first stance |

The CSV generator (`/tmp/gen_content_strategy_v3_tl.py`) GREP-asserts these rules at write time — if any row introduces a banned phrase or the `#NakshIQ` self-tag (allowing `#nakshiqfound` UGC), the build fails.

## Pillar balance after v3 ships (cumulative)

| Pillar | v1 (current 14) | v2 (25) | v3 (7) | Combined |
|---|---|---|---|---|
| Verdict | 3 | 3 | 1 | 7 |
| Verification | 4 | 5 | 2 | 11 |
| Discovery | 4 | 6 | 2 | 12 |
| Anti-trap | 1 | 5 | 0 | 6 |
| Moment | 2 | 6 | 2 | 10 |

v3 deliberately doesn't add to anti-trap (combined 6 is already healthy). Boosts discovery + verification, adds 1 verdict (the awards-franchise format slot).

## Hindi variants

5 of 7 rows have Hindi variants flagged in `notes` or Devanagari examples in `pomelli_prompt`:
- `v3_tl_editorial_listicle` — slide-1 title in Devanagari
- `v3_tl_city_neighborhood` — neighborhood names + eat/see/avoid bilingual
- `v3_tl_world_best_india` — winner_name in Devanagari + bilingual citation
- `v3_tl_poll_reel` — both split-screen slates bilingual
- `v3_tl_news_announcement` — REQUIRED for permit/road-opening news

## Sample row (verbatim — first row in CSV)

```csv
v3_tl_editorial_listicle,carousel,ig+fb,discovery,Travel + Leisure,"10 {category_plural} in India where {differentiator}.","Yes — actually {differentiator}. These ten {category_plural} in {state_list} are verified open this month.

Swipe through. Ranked by NakshIQ score for {month_name}, not by Tripadvisor.

Byline: NakshIQ desk · verified {verification_date}.","Save this. Comment LIST for the booking note DM.",category_plural|differentiator|state_list|month_name|verification_date|item_1_name|item_1_score|item_1_one_line|item_2_name|item_2_score|item_2_one_line|item_3_name|item_3_score|item_3_one_line|item_4_name|item_4_score|item_4_one_line|item_5_name|item_5_score|item_5_one_line|item_6_name|item_6_score|item_6_one_line|item_7_name|item_7_score|item_7_one_line|item_8_name|item_8_score|item_8_one_line|item_9_name|item_9_score|item_9_one_line|item_10_name|item_10_score|item_10_one_line,...,...,1:1,2,...
```

## Workflow: same as v2

Same as `content_strategy_README.md` workflow A (manual asset gen via Co-work) and workflow B (Phase 2 autoposter loader, deferred). The Phase 2 loader will read BOTH `content_strategy.csv` and `content_strategy_v3_tl.csv` as one rotation stream — schema is identical.

## Verification

```bash
cd nakshiq-autoposter/data
python3 -c "
import csv

# 1. CSV parses cleanly
rows = list(csv.DictReader(open('content_strategy_v3_tl.csv')))
print(f'{len(rows)} rows × {len(rows[0])} cols')
assert len(rows) == 7

# 2. Schema matches v2 exactly
v2 = csv.DictReader(open('content_strategy.csv')).fieldnames
v3 = csv.DictReader(open('content_strategy_v3_tl.csv')).fieldnames
assert v2 == v3
print('schema matches v2 ✓')

# 3. Pillar distribution
from collections import Counter
pillars = Counter(r['pillar'] for r in rows)
print('pillars:', dict(pillars))
assert dict(pillars) == {'discovery':2, 'verification':2, 'moment':2, 'verdict':1}

# 4. Hindi coverage
hindi = sum(1 for r in rows if 'Hindi' in r['notes'] or 'Devanagari' in r['pomelli_prompt'])
print(f'Hindi variants: {hindi}')
assert hindi >= 3

# 5. No format_id collisions with v2
v2_ids = {r['format_id'] for r in csv.DictReader(open('content_strategy.csv'))}
v3_ids = {r['format_id'] for r in rows}
assert not (v2_ids & v3_ids)
print(f'no collisions with v2 ({len(v2_ids)} ids) ✓')
"
```

Expected output:
```
7 rows × 15 cols
schema matches v2 ✓
pillars: {'discovery':2, 'verification':2, 'moment':2, 'verdict':1}
Hindi variants: 5
no collisions with v2 (25 ids) ✓
```

## Sources

- [Travel + Leisure Instagram (US, 7M)](https://www.instagram.com/travelandleisure/)
- [Travel + Leisure India Instagram (395K)](https://www.instagram.com/travelandleisureindia/)
- [Maddie Hiatt — Senior Social Editor, T+L (LinkedIn)](https://www.linkedin.com/in/maddie-hiatt-696377107/)
- [T+L announces 2025 World's Best Awards (PR Newswire)](https://www.prnewswire.com/news-releases/travel--leisure-announces-2025-worlds-best-awards-showcasing-the-top-travel-destinations-hotels-airlines-and-more-302500184.html)
- [Pentagram T+L brand redesign](https://www.pentagram.com/work/travel-leisure)
- [Mastering Instagram Carousel Strategy 2026](https://marketingagent.blog/2026/01/03/mastering-instagram-carousel-strategy-in-2026-the-algorithm-demands-swipes-not-just-scrolls/)
- [The Carousel Effect study (Taylor & Francis)](https://www.tandfonline.com/doi/full/10.1080/02650487.2026.2624918)
- [Social media localization in Indian languages](https://www.languagenobar.com/blog/the-growing-significance-of-social-media-localization-in-indian-languages)
