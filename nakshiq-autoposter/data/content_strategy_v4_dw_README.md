# NakshIQ Content Strategy v4 — Delhi Walks Decode

**File:** `content_strategy_v4_dw.csv` (6 rows × 15 cols, same schema as v2 + v3)
**Shipped:** 2026-05-19
**Plan reference:** `/Users/ashishtaneja/.claude/plans/do-tier-1-serene-wigderson.md`
**See also:** `content_strategy.csv` (v2 · 25 rows) + `content_strategy_v3_tl.csv` (v3 · 7 rows) + their READMEs

## Why this exists

User direction: "Check @delhiwalks — Delhi-based, awesome for strategy and format, their posts are well-researched. Check the captions and image details as well."

@delhiwalks (81K, founded 2010 by Dr. Sachin Bansal, City Explorers Pvt Ltd, 3-time National Award winner) is the FIRST hyper-local, research-led account decoded for NakshIQ. Their value isn't aesthetic (T&L) or POV cinema (Tanya) — it's **research depth + verified citations + local-historian partnerships + archival sourcing**. This positioning maps cleanly to NakshIQ's verification-first stance. They're closer to our DNA than any of the 8 creators already decoded.

This CSV is the third of three sibling prompt libraries. The Phase 2 autoposter loader (when it ships) will read all three as one rotation pool.

## What @delhiwalks does that we don't

Decoded across the account, comparable heritage accounts (Purani Dilli Walo ki Baatein, Zikr-e-Dilli, @dastaanedilli, Bangalore Local Walks, Hyderabad History Project), and press features ([The Print](https://theprint.in/feature/60-second-heritage-instagram-breathing-life-into-india-old-cities-buildings-stories/1065203/) · [Patriot](https://thepatriot.in/lifestyle/the-chroniclers-of-delhi-preserving-the-citys-soul-on-instagram-23650) · [Better India](https://thebetterindia.com/481895/old-delhi-instagram-page-purani-dilli-walo-ki-baatein-genz/) · [BuzzFeed archival series](https://www.buzzfeed.com/soniathomas/this-instagram-series-juxtaposes-old-photos-of-delhis-monume)):

| @delhiwalks pattern | What it looks like | NakshIQ status |
|---|---|---|
| Archival + modern photo split carousel | Sepia 1920s photo on slide 1 / modern same-angle on slide 2 | ❌ We don't have this → `v4_dw_archival_modern_carousel` |
| Heritage Heroes™ — custodian spotlight | Multi-slide profile of someone who's stewarded a site 30+ years | ❌ → `v4_dw_local_historian_spotlight` |
| Counter-narrative myth bust (heritage) | "This wasn't built by X to celebrate Y — actually it was…" | ✅ partial (v2_myth_bust_oneline is destination myths) → `v4_dw_counter_narrative_myth_bust` (heritage-specific, deeper sourcing) |
| Sensory POV reel — heritage edition | 4 sec of pure ambient (no text, no music) then name reveal | ✅ partial (v2_pov_slow_morning is dawn-at-destination) → `v4_dw_heritage_reel_sensory_pov` (built-year + architectural context, 4 sec wordless) |
| Walk itinerary day-by-day | Multi-stop carousel with times, distances, eateries | ✅ partial (v2_route_animated_map is inter-state routes) → `v4_dw_walk_itinerary_day_by_day` (hyper-local within-city) |
| Architectural detail deep-dive | Wide → medium → macro of one carved element with named technique | ❌ → `v4_dw_architecture_detail_deep_dive` |

### What we EXPLICITLY don't copy

- **Short 3–5 sec trending-audio Reels** (their reach-maximisation move) — conflicts with our voice. Our heritage Reels go LONGER (12s) and use ambient-only audio (no Bollywood trending sound).
- **`#WalkWithUs®` branded CTA** — their owned slogan. We use comment-CTAs.
- **`STORY LIVING®` and `EXCEPTIONAL EXPERIENCES®` brand language** — their proprietary positioning, not ours.
- **High-tour-sale CTAs** — they're a tour-operating business. We're an editorial platform. No "book your walk" pitch.

## The 6 NakshIQ-adapted format rows

### 1. `v4_dw_archival_modern_carousel` (discovery)
**One-liner**: Paired archival + modern photo carousel revealing how a heritage landmark changed (or didn't) over decades. Sepia slide 1 → matching-angle modern slide 2 → 3-4 verified detail slides → closing citation card.

**Research signals** (all enforced in row):
- Cited `year_built` + `architect_or_patron` (no "old building" generic)
- `archival_photo_source` field with skip-on-null
- `counter_narrative_short` per post — every post has a "what most people get wrong"
- `verification_date` from field visit, NOT desk research

**Differentiates from**: every other before/after pattern in v2/v3 — those are tourist-trap split-screens or seasonal score comparisons. This is HISTORICAL.

**Workaround for cities without archival wealth**: substitute hand-drawn heritage maps for slide 1 (note in `image_prompt`).

### 2. `v4_dw_local_historian_spotlight` (moment)
**One-liner**: 6-slide hero carousel featuring a local custodian (priest, shopkeeper, artisan, family historian) who has stewarded a heritage site or tradition for 20+ years. Editorial portrait slide 1 → hands-at-work → wide context → family archive photo → quote card → object that represents their stewardship.

**Research signals**:
- `custodian_name` + `start_year` + `years_in_role` — named individual, verifiable role
- `story_quote` — actual interview quote, written + photographed permission required
- `oral_history_note` — what they remember that no book records
- `local_language_phrase` — preserves the community's own terminology
- `verification_date` — interview date

**Differentiates from**: `v2_ugc_spotlight` (community photo submissions). v4 is EXPERT/CUSTODIAN-led with primary-source oral history.

**Hard rule baked into the row**: skip if no real interview was conducted. Synthesised quotes destroy trust.

### 3. `v4_dw_counter_narrative_myth_bust` (anti_trap)
**One-liner**: Single-image text card debunking a SPECIFIC heritage myth (e.g. "Qutub Minar wasn't built to celebrate victory — it was…"). MYTH strikethrough in saffron / REALITY in vermillion / citation in bottom band.

**Research signals**:
- `myth_claim_full` + `who_claims_it` — name the myth-spreader (tour guides, schoolbooks, Wikipedia stub)
- `true_history` + `why_myth_persists` — explanation must be sourced
- `primary_source_citation` — archive document, named historian, peer-reviewed publication
- `local_historian_name_or_role` — on-record source

**Differentiates from**: `v2_myth_bust_oneline` (destination myths — "Is Goa safe?"). v4 is HERITAGE-specific (about buildings, dates, lineages).

**Hindi parity**: required, since most heritage myths circulate in Hindi/Urdu more than English.

### 4. `v4_dw_heritage_reel_sensory_pov` (moment)
**One-liner**: 12-15 second Reel. First 4 seconds = PURE ATMOSPHERE (no text, no music, only captured ambient sound — footsteps on stone, prayer bells, hands touching carved wall). At 4s, burned-in name plate appears: `{heritage_site} · Built {year}`. Final 8s: 3 documentary cuts revealing scale.

**Research signals**:
- `year_built` archive-verifiable
- `ambient_sounds_list` — what's actually captured (not stock)
- `sensory_detail_1` + `sensory_detail_2` — what to notice (architectural / cultural)
- `why_worth_visiting_note` — single sentence, no "must-visit" cliche

**Differentiates from**: `v2_pov_slow_morning` is dawn-at-tourist-destination (sensory). v4 is heritage-context-specific (architectural / cultural depth), with longer wordless opener (4 sec vs 2-3 sec).

**Hard rule**: real captured ambient audio only. NO stock SFX.

### 5. `v4_dw_walk_itinerary_day_by_day` (discovery)
**One-liner**: 1:1 carousel breaking a 2–3 day heritage walk into stops with specific times, distances, nearby eateries, permits, local guide contact. Hand-drawn route map slide 1 → 4 documentary stop photos slides 2-5.

**Research signals**:
- `day_N_stops_summary` — every stop has timing + distance + heritage context
- `nearby_eatery_1_name` + `nearby_eatery_1_price` — verified eateries, not generic
- `permit_note` — explicit (Inner Line / wildlife / archaeological zone)
- `local_guide_contact` — real, vetted

**Differentiates from**: `v2_route_animated_map` (national / inter-state routes, animated map reel). v4 is hyper-local within-city or within-region walks (e.g. "Mehrauli Archaeological Park 2-day walk").

**Skip rule**: < 2 days OR < 4 verified stops per day.

### 6. `v4_dw_architecture_detail_deep_dive` (verification)
**One-liner**: 4:5 carousel zooming wide → medium → macro on a single architectural element (carved capital, Persian tile pattern, chattri dome detail) with technical vocabulary.

**Research signals**:
- `architectural_style` (Indo-Saracenic / Indo-Persian / Dravidian / etc.)
- `year_created` + `artisan_technique` (zardosi / jharokha / chhajja / etc.)
- `craftsperson_or_school` — named tradition or guild
- `current_condition_note` — conservation status

**Differentiates from**: `v2_texture_macro` (pure aesthetic, no data). v4 is HERITAGE EDUCATIONAL — every detail carries period, technique, craftsperson context.

**Hindi parity**: required. Element names in Hindi/Urdu transliteration with brackets (e.g. "Jharokha (झरोखा)").

## Pillar distribution

| Pillar | Count |
|---|---|
| Discovery | 2 |
| Moment | 2 |
| Anti-trap | 1 |
| Verification | 1 |
| Verdict | 0 |

Deliberately zero verdict — v4 is depth-not-judgement. Existing 7 verdict-pillar rows across v1+v2+v3 are enough.

## Hindi parity

**6 of 6 rows** have Hindi variants flagged in `notes` — best coverage of any decode. Heritage formats are inherently multilingual (Hindi/Urdu/Persian/Punjabi/regional vocabulary), so Hindi parity is non-negotiable for this set.

## Portability beyond Delhi

@delhiwalks decode flags 3 capabilities NakshIQ needs to fully use these formats elsewhere:

1. **Archival photo sourcing** — Delhi has 150+ years of British-era photography. Smaller cities have spottier coverage. **Workaround**: for cities with thin archives, substitute hand-drawn heritage maps OR family-owned historical photos (with permission). Lower polish, equal credibility.
2. **Local historian / custodian network** — heritage tourism in Delhi has decades of professional historian community. New cities need partnerships. **Workaround**: co-author posts with local heritage foundation / academic / long-term resident; cite them visibly.
3. **Tourism infrastructure for monetisation** — @delhiwalks runs paid heritage tours. NakshIQ doesn't yet. **Workaround**: content first, monetisation second. CTA stays comment-based (no "book a tour" pitch). When NakshIQ runs guided walks, the format adapts naturally.

These workarounds are documented in row `notes` fields so the production team knows what to do when archive density is thin.

## What gets unlocked combining v2 + v3 + v4

| Audience need | Format(s) that serve it |
|---|---|
| Verification-first travelers (NakshIQ's core) | v4_dw_archival_modern · v4_dw_architecture_detail · v4_dw_local_historian · v2_arrival_intel · v2_cost_index_handwritten |
| Heritage / culture audience | All 6 v4_dw_* + v3_tl_first_person_essay + v3_tl_city_neighborhood |
| POV / mood / aesthetic | v2_pov_slow_morning · v2_thali_close_up · v2_texture_macro · v4_dw_heritage_reel_sensory_pov |
| Anti-trap / myth-busting | v2_tourist_trap_split · v2_local_knows · v2_myth_bust_oneline · v4_dw_counter_narrative_myth_bust |
| Editorial flagship / annual | v3_tl_world_best_india · (no v4 verdict — intentional) |
| Interactive engagement (algo) | v3_tl_poll_reel · v2_ugc_spotlight · v3_tl_first_person_essay |
| Hindi-tier-2/3 reach | v2_hindi_score_card · v2_yt_hindi_3things · all 6 v4_dw_* (Hindi variant each) |

## Verification

```bash
cd nakshiq-autoposter/data
python3 -c "
import csv
rows = list(csv.DictReader(open('content_strategy_v4_dw.csv')))
print(f'{len(rows)} rows × {len(rows[0])} cols')
assert len(rows) == 6

# Schema match
v2 = csv.DictReader(open('content_strategy.csv')).fieldnames
v3 = csv.DictReader(open('content_strategy_v3_tl.csv')).fieldnames
v4 = csv.DictReader(open('content_strategy_v4_dw.csv')).fieldnames
assert v2 == v3 == v4
print('schema matches v2 + v3 ✓')

# Pillar dist
from collections import Counter
pillars = Counter(r['pillar'] for r in rows)
print('pillars:', dict(pillars))

# No collisions across all 3 sibling files
all_ids = set()
for f in ('content_strategy.csv', 'content_strategy_v3_tl.csv'):
    all_ids |= {r['format_id'] for r in csv.DictReader(open(f))}
v4_ids = {r['format_id'] for r in rows}
assert not (all_ids & v4_ids)
print(f'no collisions ({len(all_ids)} prior ids) ✓')
"
```

Expected: `6 rows × 15 cols / schema matches v2 + v3 ✓ / pillars: {discovery:2, moment:2, anti_trap:1, verification:1} / no collisions (32 prior ids) ✓`.

## Sources

- [Delhi Walks official site](https://delhiwalks.in/)
- [Delhi Walks about / Sachin Bansal bio](https://delhiwalks.in/about-us/)
- [Shared Heritage® initiative](https://delhiwalks.in/sharedheritage/)
- [Heritage Heroes™ program](https://delhiwalks.in/heritageheroes/)
- [The Print — "60-second heritage" on @delhiwalks](https://theprint.in/feature/60-second-heritage-instagram-breathing-life-into-india-old-cities-buildings-stories/1065203/)
- [The Patriot — Delhi heritage chroniclers (@dastaanedilli, @sikkawala)](https://thepatriot.in/lifestyle/the-chroniclers-of-delhi-preserving-the-citys-soul-on-instagram-23650)
- [Better India — Purani Dilli Walo ki Baatein (comparable account)](https://thebetterindia.com/481895/old-delhi-instagram-page-purani-dilli-walo-ki-baatein-genz/)
- [BuzzFeed — archival photo juxtaposition series](https://www.buzzfeed.com/soniathomas/this-instagram-series-juxtaposes-old-photos-of-delhis-monume)
- [Homegrown — Delhi digital archivists list](https://homegrown.co.in/homegrown-explore/explore-the-many-charms-of-delhi-with-these-digital-archivists-on-instagram)
- [Sachin Bansal CEO spotlight (CEOWORLD)](https://ceoworld.biz/2021/03/13/ceo-spotlight-sachin-bansal-chief-explorer-india-city-walks/)
- [Bangalore Local Walks (sibling-genre)](https://www.instagram.com/localwalks.blr/)
- [Hyderabad History Project (sibling-genre)](https://www.instagram.com/thehyderabadhistoryproject/)
