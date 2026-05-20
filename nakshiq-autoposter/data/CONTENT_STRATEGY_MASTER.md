# NakshIQ Content Strategy — Master Co-work Brief

**Audience:** Claude Co-work / ChatGPT / Banana / Veo operators (you).
**Purpose:** One-stop doc to pick a post format, generate the assets, save them with the right filename, and let the autoposter publish them.
**Status:** 38 format rows across 3 prompt libraries (v2 + v3 + v4) — Phase 2 loader live as of 2026-05-19 commit `531a85c5`.

---

## 0 · TL;DR (the 60-second version)

1. **Pick a row** from the master table in §3 below. Recommended starters in §6.
2. **Find that row in its source CSV** (one of three — see §2). Copy `pomelli_prompt`, `image_prompt`, `video_prompt` as applicable.
3. **Substitute the placeholders** (`{dest_name}`, `{score}`, `{month_name}` …) with real values from a real NakshIQ destination. See §5 for the data source.
4. **Run each prompt in its designated tool** — Pomelli (template cards), ChatGPT-4o / Banana (photoreal images), Veo / Sora / Runway (videos).
5. **Save the output** to `nakshiq-autoposter/social_image_library/` with the exact filename `{format_id}-{dest_slug}.{ext}`. See §4 for the strict naming rule.
6. **Done.** The autoposter cron at 13:17 AEST next day will see the file via `is_eligible()` ([csv_format_loader.py:248](../csv_format_loader.py#L248)), substitute the data into the caption template, and publish. No code change required.

There is no manual "schedule a post" step. **Asset presence in the library IS the opt-in.**

---

## 1 · Why three libraries

The 14 original morning formats (live in [autoposter.py:91](../autoposter.py#L91) `MORNING_FORMATS`) skewed verification-heavy and never moved follower count (215 IG posts → 2 organic followers as of 2026-05-16). Three new libraries were decoded from accounts that DO move follower count, each with a different lens:

| Library | Inspiration | Strength | New rows |
|---|---|---|---|
| **v2** | 5 Indian travel creators (Tanya Khanijow 1.3M, Visa2explore 2M, Mountain Trekker, Tripoto Community 1M, Varun Aditya) | Cultural fit, Hindi reach, POV/sensory storytelling | 25 |
| **v3** | Travel + Leisure US (7M IG) + T+L India (395K IG) | Editorial polish, format discipline, "save-for-later" pacing | 7 |
| **v4** | Delhi Walks (@delhiwalks) | Heritage research depth, archival sources, custodian spotlights | 6 |

**Combined: 38 rows across 5 pillars.** Pillar coverage:

| Pillar | v1 (live) | v2 | v3 | v4 | **Combined** |
|---|---:|---:|---:|---:|---:|
| Verdict | 3 | 3 | 1 | 0 | **7** |
| Verification | 4 | 5 | 2 | 1 | **12** |
| Discovery | 4 | 6 | 2 | 2 | **14** |
| Anti-trap | 1 | 5 | 0 | 1 | **7** |
| Moment | 2 | 6 | 2 | 2 | **12** |

Anti-trap went from 1 (v1 only) to 7 combined. Moment went from 2 to 12. Both were the under-served pillars on the existing rotation.

---

## 2 · Source files (where each row's prompts live)

| Library | CSV | Detailed README | # rows |
|---|---|---|---:|
| v2 — Indian creators | [content_strategy.csv](content_strategy.csv) | [content_strategy_README.md](content_strategy_README.md) | 25 |
| v3 — Travel + Leisure | [content_strategy_v3_tl.csv](content_strategy_v3_tl.csv) | [content_strategy_v3_tl_README.md](content_strategy_v3_tl_README.md) | 7 |
| v4 — Delhi Walks | [content_strategy_v4_dw.csv](content_strategy_v4_dw.csv) | [content_strategy_v4_dw_README.md](content_strategy_v4_dw_README.md) | 6 |

All three CSVs share the same 15-column schema. The Phase 2 loader ([csv_format_loader.py](../csv_format_loader.py)) reads all three as one stream at startup.

**Schema columns (15):** `format_id`, `post_type`, `platform`, `pillar`, `inspired_by`, `hook_template`, `caption_template`, `cta_template`, `data_inputs`, `pomelli_prompt`, `image_prompt`, `video_prompt`, `asset_aspect`, `max_freq_per_month`, `notes`.

---

## 3 · Master format table (all 38 rows)

Sort within each pillar by `max_freq_per_month` desc — high-cap formats are the workhorses, low-cap are flagship.

Legend: **P** = needs Pomelli prompt · **I** = needs photoreal image prompt · **V** = needs video prompt · cap = `max_freq_per_month`.

### Verdict (4 rows)

| format_id | type | platform | inspired_by | P | I | V | cap |
|---|---|---|---|:-:|:-:|:-:|:-:|
| `v2_score_card_pov` | reel | ig+fb | Tanya Khanijow | ✓ | | ✓ | 6 |
| `v2_weekend_escape_map` | reel | ig+fb | Tanya Khanijow | ✓ | | ✓ | 4 |
| `v2_hindi_score_card` | single | ig+fb | Mountain Trekker | ✓ | | | 4 |
| `v3_tl_world_best_india` | single | ig+fb | Travel + Leisure (annual flagship) | ✓ | ✓ | ✓ | 1 |

### Verification (8 rows)

| format_id | type | platform | inspired_by | P | I | V | cap |
|---|---|---|---|:-:|:-:|:-:|:-:|
| `v3_tl_news_announcement` | single | ig+fb | Travel + Leisure | ✓ | ✓ | | 6 |
| `v2_budget_receipt` | single | ig+fb | Mountain Trekker | ✓ | ✓ | | 4 |
| `v2_cost_vs_feeling` | carousel | ig+fb | Mountain Trekker | ✓ | ✓ | | 3 |
| `v2_cost_index_handwritten` | single | ig+fb | Mountain Trekker | ✓ | ✓ | | 3 |
| `v2_yt_hindi_3things` | yt_short | yt | Mountain Trekker | ✓ | | ✓ | 3 |
| `v3_tl_hotel_drone_feature` | carousel | ig+fb | Travel + Leisure | ✓ | ✓ | ✓ | 3 |
| `v4_dw_architecture_detail_deep_dive` | carousel | ig+fb | Delhi Walks | ✓ | ✓ | | 3 |
| `v2_arrival_intel_video` | reel | ig+fb | Visa2explore | ✓ | | ✓ | 2 |

### Discovery (10 rows)

| format_id | type | platform | inspired_by | P | I | V | cap |
|---|---|---|---|:-:|:-:|:-:|:-:|
| `v2_ugc_spotlight` | single | ig+fb | Tripoto Community | ✓ | | | 6 |
| `v2_series_episode` | reel | ig+fb | Visa2explore | ✓ | | ✓ | 5 |
| `v2_hidden_gem_reveal_atmo` | reel | ig+fb | Tanya Khanijow | ✓ | | ✓ | 4 |
| `v2_women_solo_brief_video` | reel | ig+fb | Tanya Khanijow | ✓ | | ✓ | 3 |
| `v4_dw_archival_modern_carousel` | carousel | ig+fb | Delhi Walks (signature) | ✓ | ✓ | ✓ | 3 |
| `v2_route_animated_map` | reel | ig+fb | Tanya Khanijow | ✓ | | ✓ | 2 |
| `v2_yt_route_5_stops` | yt_short | yt | Tanya Khanijow | ✓ | | ✓ | 2 |
| `v3_tl_editorial_listicle` | carousel | ig+fb | Travel + Leisure (signature) | ✓ | ✓ | | 2 |
| `v3_tl_city_neighborhood` | carousel | ig+fb | Travel + Leisure | ✓ | ✓ | | 2 |
| `v4_dw_walk_itinerary_day_by_day` | carousel | ig+fb | Delhi Walks | ✓ | ✓ | | 2 |

### Anti-trap (6 rows)

| format_id | type | platform | inspired_by | P | I | V | cap |
|---|---|---|---|:-:|:-:|:-:|:-:|
| `v2_myth_bust_oneline` | reel | ig+fb | Tanya Khanijow | ✓ | | ✓ | 4 |
| `v2_local_knows` | single | ig+fb | Mountain Trekker | ✓ | | | 4 |
| `v2_tourist_trap_split` | reel | ig+fb | NakshIQ (original v1) | ✓ | | ✓ | 3 |
| `v2_yt_local_etiquette` | yt_short | yt | Mountain Trekker | ✓ | | ✓ | 3 |
| `v4_dw_counter_narrative_myth_bust` | single | ig+fb | Delhi Walks | ✓ | | ✓ | 3 |
| `v2_yt_food_capital` | yt_short | yt | Visa2explore | | | ✓ | 2 |

### Moment (10 rows)

| format_id | type | platform | inspired_by | P | I | V | cap |
|---|---|---|---|:-:|:-:|:-:|:-:|
| `v2_thali_close_up` | carousel | ig+fb | Visa2explore | ✓ | ✓ | ✓ | 4 |
| `v3_tl_poll_reel` | reel | ig+fb | Travel + Leisure | ✓ | | ✓ | 4 |
| `v2_festival_alert_sensory` | single | ig+fb | Varun Aditya | ✓ | ✓ | | 4 |
| `v2_pov_slow_morning` | reel | ig+fb | Tanya Khanijow (signature) | ✓ | ✓ | ✓ | 3 |
| `v2_wildlife_moment` | reel | ig+fb | Varun Aditya | | ✓ | ✓ | 3 |
| `v2_texture_macro` | single | ig+fb | Varun Aditya | | ✓ | ✓ | 3 |
| `v2_yt_silent_pov` | yt_short | yt | Varun Aditya | ✓ | | ✓ | 3 |
| `v4_dw_heritage_reel_sensory_pov` | reel | ig+fb | Delhi Walks | ✓ | | ✓ | 3 |
| `v3_tl_first_person_essay` | carousel | ig+fb | Travel + Leisure | ✓ | ✓ | | 2 |
| `v4_dw_local_historian_spotlight` | carousel | ig+fb | Delhi Walks | ✓ | ✓ | | 2 |

---

## 4 · The naming convention (the part you MUST get right)

The Phase 2 loader's `_find_matching_asset()` ([csv_format_loader.py:285](../csv_format_loader.py#L285)) looks at these filename patterns in **priority order**:

```
social_image_library/{format_id}-{dest_slug}.jpg    ← image hero
social_image_library/{format_id}-{dest_slug}.png    ← image hero (transparent)
social_image_library/{format_id}-{dest_slug}.mp4    ← video / reel
social_image_library/{format_id}-{dest_slug}-feed.{jpg|png}
social_image_library/{format_id}-{dest_slug}-story.{jpg|png}
social_image_library/{dest_slug}.{jpg|png}          ← generic fallback (Phase 1)
```

**Where:**
- `{format_id}` is the row's `format_id` column verbatim (e.g. `v2_pov_slow_morning`, `v3_tl_editorial_listicle`).
- `{dest_slug}` is the destination's lower-kebab-case slug (e.g. `spiti`, `manali`, `jaipur`, `old-delhi`). This is the `id` column in the Supabase `destinations` table.

**Concrete examples:**
- `social_image_library/v2_pov_slow_morning-spiti.mp4` — reel video for Spiti's POV slow morning.
- `social_image_library/v3_tl_editorial_listicle-rajasthan.jpg` — hero image for the Rajasthan 10-forts carousel.
- `social_image_library/v4_dw_archival_modern_carousel-mehrauli.png` — slide-1 cover for Mehrauli archival carousel.
- `social_image_library/v2_hindi_score_card-manali.png` — Pomelli-rendered Hindi score card for Manali.

**Important caveats:**

1. **One file per format-dest combo.** The current loader picks the first match. Multi-slide carousels = Phase 3 enhancement (TBD). For now, render slide 1 / hero / cover and save THAT as the format asset. Keep extra slides in a subdirectory `social_image_library/{slug}_XX/` for future use.

2. **Video formats need .mp4 at the matching slot.** A `.png` is checked before `.mp4`, so if you upload BOTH a still and a video, the still wins. For reel/yt_short rows, upload ONLY the .mp4 (or rename the .png to a backup subdir).

3. **`{dest_slug}` must match the Supabase `id` column exactly.** Slug list lives in `apps/web/known-destination-slugs.json` if you need to verify a spelling. Common gotchas: `old-delhi` (not `olddelhi`), `alleppey-(alappuzha)` (with parens), `bir-billing` (with hyphen).

4. **Naming is case-sensitive on Linux** (where the cron runs). Always lower-case.

5. **File sizes**: keep stills ≤ 5 MB and videos ≤ 50 MB per file (Outstand/IG upload limits). The current achabal `.mp4` test is 9.4 MB which is fine.

---

## 5 · Data substitution — where placeholder values come from

Every prompt has placeholders like `{dest_name}`, `{score}`, `{altitude_m}`, `{month_name}`. Substitute these with **real, current** values before you paste into Co-work / Banana / Veo. Otherwise the asset will hard-code a stale month or a fake stat and the autoposter's caption (which substitutes from live Supabase) won't match.

**Two data sources:**

1. **NakshIQ content API** — `https://nakshiq.com/api/content?type=destinations` returns the full destination row. Useful fields:
   - `name` (display name) — feeds `{dest_name}`
   - `id` (slug) — feeds `{dest_slug}`
   - `state` — feeds `{state}` / `{dest_state}`
   - `score_may`, `score_jun`, … `score_apr` — monthly scores feed `{score}`
   - `verdict_may`, … `verdict_apr` — short verdict text feeds `{verdict}`
   - `elevation_m` — feeds `{altitude_m}` (aliased in loader)
   - Confidence cards JSON — feeds `{sunrise_time}`, `{cell_signal}`, etc. depending on format

2. **Computed at render time** (injected by `csv_format_loader.render_caption()` via `extra_context`):
   - `{month_name}` — current month name (e.g. "May")
   - `{verification_date}` — today's date (ISO)
   - `{state_list}` — comma-separated state list for multi-state listicles
   - `{state_list_first}` — first state in the list

**Verify your placeholder list before you generate.** Open `csv_format_loader.py:200` `placeholders_in_caption` — it returns the exact placeholder set the caption needs. If you generate an asset for a row whose data inputs aren't available for your chosen dest, the loader will SKIP it ([is_eligible()](../csv_format_loader.py#L248) reports `missing dest fields: [...]`).

---

## 6 · Recommended seed list — first 12 format/dest combos to ship

Picked to (a) cover all 5 pillars, (b) test each library at least once, (c) start with formats you can render in <2 hours each.

| # | format_id | Library | Dest | Pillar | Why this combo |
|---|---|---|---|---|---|
| 1 | `v2_pov_slow_morning` | v2 | spiti | Moment | Richest example in the v2 README. POV reel. Spiti has strong sunrise data + a known emotional pull. |
| 2 | `v2_hindi_score_card` | v2 | manali | Verdict | P-only (no photo/video needed). Hindi reach. Lowest effort, highest cadence (4/mo cap). |
| 3 | `v2_thali_close_up` | v2 | old-delhi | Moment | Tests P+I+V triple format. Old Delhi street food data is rich (rich `eateries` table). |
| 4 | `v2_local_knows` | v2 | goa | Anti-trap | P-only single. Tests anti-trap pillar (under-indexed). Goa has tourist-trap data ready. |
| 5 | `v2_budget_receipt` | v2 | ladakh | Verification | P+I. Tests verification pillar. Ladakh has real cost data already verified through audit. |
| 6 | `v3_tl_editorial_listicle` | v3 | rajasthan | Discovery | Tests v3 library + T+L's signature 10-slide listicle. State-led ("forts in Rajasthan you can sleep inside"). |
| 7 | `v3_tl_first_person_essay` | v3 | hampi | Moment | P+I carousel. Hampi has strong narrative arc (arrival-via-coracle + Vijayanagar context). |
| 8 | `v3_tl_poll_reel` | v3 | manali | Moment | "Manali or Mussoorie in May?" — comment-driven engagement. Tests T+L's interactive pattern. |
| 9 | `v4_dw_archival_modern_carousel` | v4 | mehrauli | Discovery | DW's signature format on its home turf. Strong archival photo availability (ASI public domain). |
| 10 | `v4_dw_counter_narrative_myth_bust` | v4 | mumbai | Anti-trap | Tests v4's research-depth pattern on a non-Delhi dest. Mumbai has rich counter-narrative material. |
| 11 | `v2_yt_silent_pov` | v2 | tungnath | Moment | V-only YT short. Tungnath is high-altitude visually striking, silent POV reads as cinematic. |
| 12 | `v3_tl_news_announcement` | v3 | rohtang-pass | Verification | Timely format — Rohtang opens late-May/early-June. Plays into seasonal news cycle. |

**Pillar distribution of this seed list:**
- Verdict: 1 (Hindi score card)
- Verification: 2 (budget receipt + news announcement)
- Discovery: 2 (editorial listicle + archival carousel)
- Anti-trap: 2 (local knows + myth bust)
- Moment: 5 (POV slow morning + thali + first-person essay + poll + silent POV)

Moment-heavy on purpose: that's where engagement lives.

**Production effort estimate:** ~12 hours total if you batch the Pomelli cards together (3-4 hours), then Banana images (3-4 hours), then Veo videos (4-5 hours). 35 video gens/day budget per the v2 README — plenty of headroom.

---

## 7 · Workflow detail — step by step for one row

Use this as the template for every row you ship. **Concrete walk-through with `v2_pov_slow_morning` + Spiti as the example.**

### Step 1 — Pick row, pull prompts

```bash
cd nakshiq-autoposter/data
python3 -c "
import csv
rows = list(csv.DictReader(open('content_strategy.csv')))
row = next(r for r in rows if r['format_id'] == 'v2_pov_slow_morning')
print('=== POMELLI ===\n' + row['pomelli_prompt'])
print('\n=== IMAGE ===\n' + row['image_prompt'])
print('\n=== VIDEO ===\n' + row['video_prompt'])
print('\n=== DATA INPUTS ===\n' + row['data_inputs'])
print('\n=== CAPTION TEMPLATE ===\n' + row['caption_template'])
"
```

### Step 2 — Pull dest data

```bash
curl -s 'https://nakshiq.com/api/content?type=destinations' | jq '.[] | select(.id == "spiti")'
```

Note down values for every placeholder appearing in `data_inputs` + the prompts. For `v2_pov_slow_morning` you'll need: `dest_name`=Spiti, `dest_slug`=spiti, `dest_state`=Himachal Pradesh, `sunrise_time`=05:47 (from confidence card), `altitude_m`=4270, `score`=4 (for May).

### Step 3 — Substitute placeholders in prompts

Replace `{dest_name}` → Spiti, `{sunrise_time}` → 05:47, etc. in every prompt string.

### Step 4 — Run in Co-work / Banana / Veo

- **Pomelli**: paste the substituted `pomelli_prompt` into Pomelli. It returns a 1080×1080 (or 1080×1920 for story) template card.
- **Banana / ChatGPT-4o**: paste the substituted `image_prompt`. Specify aspect from the row's `asset_aspect` column. Refine 1-2 iterations.
- **Veo / Sora**: paste the substituted `video_prompt`. Specify duration + aspect. Render once, check for the on-screen text directions in the prompt.

### Step 5 — Save with the correct filename

For `v2_pov_slow_morning` + Spiti, the reel video is the primary asset (the format is a reel). Save it as:

```
nakshiq-autoposter/social_image_library/v2_pov_slow_morning-spiti.mp4
```

If you also rendered a Pomelli end-slate or a Banana still, save them in a subdirectory for future use:

```
nakshiq-autoposter/social_image_library/spiti_HI/v2_pov_slow_morning_end-slate.png
nakshiq-autoposter/social_image_library/spiti_HI/v2_pov_slow_morning_hero.jpg
```

(The autoposter ignores subdirectories — only top-level files match the loader's pattern. This keeps the working assets organized while not interfering with the cron.)

### Step 6 — Sanity check

```bash
cd nakshiq-autoposter
python3 -c "
import sys
sys.path.insert(0, '.')
import csv_format_loader as L
specs = L.load_all_formats()
spec = specs['v2_pov_slow_morning']
ok, why = L.is_eligible(spec, {'id': 'spiti', 'name': 'Spiti', 'state': 'Himachal Pradesh', 'elevation_m': 4270, 'score': 4}, L.SOCIAL_IMAGE_LIBRARY_DIR if hasattr(L, 'SOCIAL_IMAGE_LIBRARY_DIR') else __import__('pathlib').Path('social_image_library'))
print(f'eligible: {ok} · why: {why}')
"
```

Expect: `eligible: True · why: ok` once the asset is in place. If False, the `why` tells you which fields are missing.

### Step 7 — Wait for the cron

Next morning's 13:17 AEST cron will iterate every spec, find that `v2_pov_slow_morning` + Spiti is eligible, render the caption, and publish to IG + FB. **No further action needed.** The autoposter's existing logging will surface the post in the next daily audit.

---

## 8 · Voice rules (grep-asserted at CSV write-time — preserve these in every asset)

These rules are enforced in the row prompts already. When you generate assets, keep them visually consistent:

- **Sentence case** throughout — no Title Case in headlines.
- **Banned phrases**: `wanderlust`, `magical`, `hidden paradise`, `must-visit`, `bucket-list`, `link in bio`. Already absent from prompts — don't reintroduce in image overlays or video on-screen text.
- **Allowed hashtags**: `#nakshiqfound` (UGC submission tag only). NOT `#NakshIQ` self-tag.
- **CTAs**: always comment-CTA close ("Comment X for the link"), never URL-CTA (IG strips URLs).
- **Hindi parity**: any format flagged for tier-2/3 India audience (v2 score card / cost / local knows / yt etiquette + most v4 rows) must have a Hindi variant. Devanagari in Pomelli is fine.
- **SKIP-on-missing-data**: if a dest is missing required fields, render a different dest. Never hallucinate placeholders.
- **Photo credit line**: if you use a Getty / Shutterstock / stock image, credit in the caption tail. If you use AI (Banana/Co-work), no credit needed but the asset must not look obviously AI (no warped hands, no melted faces, no double-stitched horizons).

---

## 9 · Anti-patterns — things NOT to do

1. **Don't post 14 of the same format in a row.** Respect `max_freq_per_month`. The autoposter rotation will hit the cap and skip, but if you upload 14 assets for the same format the engagement-weighted picker will keep returning to it.

2. **Don't generate assets for formats you can't sustain.** A format with cap 6/mo needs 6 assets/month. If you can render 30 assets/month total, budget across the 38 formats accordingly. Don't burn 25 on one format.

3. **Don't reuse the same image across formats.** The autoposter's `post_fingerprints()` ([autoposter.py:1187](../autoposter.py#L1187)) blocks a media file from re-firing within 60 days. Two formats sharing the same .png file = one post.

4. **Don't render assets for destinations the autoposter doesn't know about.** The dest slug must exist in Supabase. Run the curl in §5 step 2 first.

5. **Don't skip the data substitution step.** A Pomelli card with `{dest_name}` literally on it is unusable. The autoposter caption substitutes the placeholder but the image doesn't.

6. **Don't upload your working/intermediate files to the top-level library.** Only the hero/cover/reel goes to `social_image_library/{format_id}-{dest_slug}.{ext}`. Everything else (storyboards, slide 2-4, alternate cuts) goes into `social_image_library/{slug}_XX/`.

---

## 10 · Current asset inventory (as of 2026-05-20)

### What exists

- **373 subdirectories** under `social_image_library/` (one per destination, naming `{slug}_{STATECODE}`). Each contains 2-3 Phase 1 destination images (`{slug}_feed_{template}_{branding}.jpg` etc.) totaling ~850 images. These are the **Phase 1 destination-render system** — autoposter v1 still uses them.
- **13 Phase 2 test assets** inside `social_image_library/achabal_JA/`:
  - `v2_hindi_score_card_slide-{1..4}.png` (carousel slides)
  - `v2_score_card_pov_slide-{1..4}.png` (reel still slides)
  - `v2_score_card_pov_reel.mp4` (the actual reel)
  - Plus 2 Phase 1 dest images (`achabal_feed_*`, `achabal_story_*`) — unrelated.

### What's missing

- **No top-level Phase 2 assets** matching `{format_id}-{dest_slug}.{ext}`. That's why the autoposter cron is still running on v1's 14 formats only — Phase 2 has nothing eligible to fire.
- **Migration shipped 2026-05-20** (this session): `achabal_JA/v2_hindi_score_card_slide-1.png` → `v2_hindi_score_card-achabal.png` (top level), `achabal_JA/v2_score_card_pov_reel.mp4` → `v2_score_card_pov-achabal.mp4` (top level). Slide 2-4 files left in subdir for future multi-slide carousel work.

### ⚠️ Data-field gap (separate blocker beyond assets)

Smoke test of the loader's `is_eligible()` against `achabal` (with the new assets in place) revealed that even WITH the asset, the format requires data fields that don't exist in the current Supabase destination row. Examples:

- `v2_hindi_score_card` expects: `daily_cost_inr`, `crowd_hindi`, `weather_hindi`, `why_go_hindi`, `english_one_liner` — all 5 missing.
- `v2_score_card_pov` expects: `still_skip`, `daily_cost_inr`, `true_now`, `crowd_level`, `change_note` — all 5 missing.

These fields were invented when the v2 CSV was designed (2026-05-19) anticipating Phase 3 data enrichment. They are NOT in the current schema. **Until they're added (or the format prompts revised to use existing fields), even asset-eligible formats will SKIP.**

Three options to close this gap (out of scope for this README's ship — separate ticket):

1. **Schema enrichment** — add the 10-15 new JSONB fields to the Supabase `destinations` table, backfill via audit pipeline (similar to how `local_eateries` was added).
2. **Prompt revision** — rewrite the v2 CSV templates to use only existing fields (lose some bilingual richness).
3. **Phase 2.5 fallback** — `is_eligible()` could be relaxed to "data fields are nice-to-have, not required" — but that means the caption renders with empty placeholders, which violates the SKIP-on-null rule.

Recommendation: option 1, scoped per format-row in priority order matching the §6 seed list. Two seed formats (`v2_hindi_score_card` and `v2_score_card_pov`) need the achabal fields populated first to validate the end-to-end pipeline before scaling.

### Roadmap to Phase 2 firing

| Milestone | Definition | Status |
|---|---|---|
| 1 dest with Phase 2 coverage | At least 1 `{format_id}-{dest_slug}.{ext}` at top level | ✅ as of 2026-05-20 (achabal) |
| 12 dests x 1 format = 12 seed assets | §6 seed list rendered + uploaded | ⏳ Your turn |
| 50 dests x ~3 formats avg = 150 assets | First credible Phase 2 cohort to A/B against v1 | ⏳ Multi-week |
| 200+ dests x ~5 formats avg = 1000+ assets | Phase 2 dominates v1 in the rotation | ⏳ Months |

---

## 10.5 · ⚠️ Critical — production asset deployment path

**`social_image_library/` is gitignored** ([nakshiq-autoposter/.gitignore](../.gitignore)). It never reaches the `main` branch. The GitHub Actions cron does NOT see your local files unless they get there by one of two paths:

**Path A — GHA cache (current Phase 1 mechanism, [autoposter.yml:169-181](../../.github/workflows/autoposter.yml#L169)):**

```yaml
- name: Cache social image library
  uses: actions/cache@v4
  with:
    path: nakshiq-autoposter/social_image_library
    key: social-image-library-v1

- name: Generate social image library (if not cached)
  run: |
    if [ ! -d "nakshiq-autoposter/social_image_library" ] || ... ; then
      python nakshiq-autoposter/dest_image_gen.py --limit 0
    fi
```

The workflow caches the library between runs using key `social-image-library-v1`. On cache miss, it runs `dest_image_gen.py` which generates the Phase 1 destination images **but knows nothing about v2/v3/v4 format assets**. So if cache busts, your Phase 2 work disappears until you upload again.

**Path B — R2 / cloud upload (recommended for Phase 2 scale-up):**

Until a real R2 sync step ships in the workflow, **the practical Phase 2 deployment loop is manual**:

1. Generate assets locally in `social_image_library/`.
2. Either:
   - **(quick)** Push files to the GHA cache by triggering a one-off workflow_dispatch that includes a "warm cache" step uploading your local library. The cache will then serve your assets on subsequent cron runs until eviction (~7 days idle).
   - **(durable)** Upload to R2 at `https://pub-bcda9bac2f63408880ee3f23aa3548e5.r2.dev/{filename}` and add a sync step to the workflow that pulls Phase 2 assets from R2 into `social_image_library/` at the start of every run.

**For now (immediate Phase 2 validation), Path A is fine** — render the §6 seed list locally, run the workflow once with a forced cache refresh, and watch the next morning's audit. **For sustained scale-up**, Path B (R2 sync) is the right shape; that's a ~1h add-on to the workflow YAML (out of scope for this README's ship, separate ticket).

**Key insight:** the achabal test assets that exist locally as of 2026-05-20 commit will NOT post in production until one of those two paths fires. Don't assume "asset in local library = cron will fire" — verify cache state before celebrating.

---

## 11 · References + deeper docs

| Topic | File |
|---|---|
| v2 Indian-creators decode + 25 prompts | [content_strategy_README.md](content_strategy_README.md) + [content_strategy.csv](content_strategy.csv) |
| v3 Travel + Leisure decode + 7 prompts | [content_strategy_v3_tl_README.md](content_strategy_v3_tl_README.md) + [content_strategy_v3_tl.csv](content_strategy_v3_tl.csv) |
| v4 Delhi Walks decode + 6 prompts | [content_strategy_v4_dw_README.md](content_strategy_v4_dw_README.md) + [content_strategy_v4_dw.csv](content_strategy_v4_dw.csv) |
| Phase 2 autoposter integration (loader) | [csv_format_loader.py](../csv_format_loader.py) |
| Existing 14 v1 morning formats | [autoposter.py:91](../autoposter.py#L91) `MORNING_FORMATS` |
| Voice rules in long form | [apps/web/docs/voice.md](../../apps/web/docs/voice.md) |
| Destination slug list (validate filename) | [apps/web/known-destination-slugs.json](../../apps/web/known-destination-slugs.json) |
| NakshIQ content API (dest data) | `https://nakshiq.com/api/content?type=destinations` |

---

## 12 · How to ask for help

If you're stuck on a row:
1. Re-read the source README (v2 / v3 / v4) — most prompts have a "what kept vs what changed" note explaining the design.
2. If the prompt has placeholders you can't map to a real destination, the row is **not suitable for that dest** — pick a different one.
3. If the autoposter publishes but the post looks wrong, check the daily audit report at `nakshiq-autoposter/audit_YYYY-MM-DD.md` for skip reasons.
4. If Phase 2 is loaded but no posts are firing, the `is_eligible()` log in `autoposter.log` shows the skip reason per spec.

---

## 13 · Changelog

| Date | Change |
|---|---|
| 2026-05-19 | v2 (25 rows) shipped (commit `7f01f772`) |
| 2026-05-19 | v3 T+L (7 rows) shipped (commit `d20c6801`) |
| 2026-05-19 | v4 DW (6 rows) shipped (commit `4ebf83f2`) |
| 2026-05-19 | Phase 2 autoposter loader shipped (commit `531a85c5`) |
| 2026-05-20 | This master README shipped + 2 achabal seed assets migrated to top level |

---

*Maintained by NakshIQ. Last reviewed: 2026-05-20.*
