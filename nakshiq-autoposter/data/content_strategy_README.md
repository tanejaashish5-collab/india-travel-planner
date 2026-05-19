# NakshIQ Content Strategy v2 — Prompt Library

**File:** `content_strategy.csv` (25 rows × 15 cols)
**Shipped:** 2026-05-19
**Plan reference:** `/Users/ashishtaneja/.claude/plans/do-tier-1-serene-wigderson.md`

**See also:**
- `content_strategy_v3_tl.csv` + `content_strategy_v3_tl_README.md` — 7 Travel + Leisure-decoded format rows (editorial / glossy / awards-franchise patterns).
- `content_strategy_v4_dw.csv` + `content_strategy_v4_dw_README.md` — 6 Delhi Walks-decoded format rows (research-depth heritage / custodian-spotlight / archival patterns).

All three CSVs share the 15-col schema. Phase 2 loader will read all three as one rotation pool.

## Why this exists

The autoposter's existing 14 morning formats skew toward **data cards** (score / cost / arrival). Useful, but cold. 215 IG posts, 2 net new organic followers. India's top travel creators (Tanya Khanijow 1.3M, Visa2explore 2M YT, Mountain Trekker, Tripoto Community 1M, Varun Aditya wildlife) win on **emotion + region + storytelling** — not data tables.

This CSV is a **prompt library**: 25 new post-format ideas, each with three explicitly labelled prompts the user hands to Claude Co-work / ChatGPT / Veo / Nano Banana to generate the actual assets. The autoposter doesn't read this file yet — Phase 2 (separate, future plan) will wire it in.

## What each column means

| Column | Purpose |
|---|---|
| `format_id` | snake_case unique key. `v2_` prefix distinguishes new formats from the current 14 |
| `post_type` | `reel` / `carousel` / `single` / `story` / `yt_short` |
| `platform` | Where to post: `ig+fb` / `ig_only` / `yt_short_only` / `ig+fb+yt_short` etc. |
| `pillar` | One of `verdict` / `verification` / `discovery` / `anti_trap` / `moment` (mirrors current FORMAT_PILLARS in autoposter.py) |
| `inspired_by` | Which Indian creator's pattern this borrows. `original` = NakshIQ design |
| `hook_template` | Opening line / first 1–2 sec text. Contains `{placeholders}` |
| `caption_template` | Full caption body, multi-line, with `{placeholders}` for dest/state/data |
| `cta_template` | Closing comment-CTA (never URL — IG strips them) |
| `data_inputs` | Pipe-separated Supabase field names this format consumes. If ANY field is null in production, the format SKIPS — same dead-on-missing-data rule as the existing 14 |
| `pomelli_prompt` | Spec for a Pomelli template card — layout, fonts, colours, text positions. NO photo prompt; Pomelli is text-on-template only |
| `image_prompt` | Photoreal AI-image prompt ("Nano Banana"). Aspect ratio + style + subject + lighting + colour palette. Empty when format is template-only or video-only |
| `video_prompt` | 5–45 sec video-gen prompt for Veo / Sora / Runway. Includes camera move, duration, atmosphere, on-screen text directions |
| `asset_aspect` | `1:1` / `4:5` / `9:16` / `mixed_carousel` |
| `max_freq_per_month` | Hard cap so even good formats don't dominate the feed |
| `notes` | Production caveats — skip conditions, Hindi variants, audience tag bias |

## Which prompts to fill for which format type

Not every row uses all 3 prompt fields. **By design:**

- **Template-only formats** (Hindi score card, local knows, UGC spotlight): Pomelli only. No need to generate a photo when the format IS the text card.
- **Video-only formats** (YT food capital, YT silent POV): Video prompt only. Pure cinematic moments don't get a Pomelli end-slate baked in.
- **Photo + Pomelli formats** (thali close-up, budget receipt, festival alert sensory): No video. They're static moments — adding a video prompt would force filler.
- **Pomelli + video formats** (POV slow morning, route animated map, score POV, arrival video, hidden gem atmo): Two-layer storytelling — Pomelli card opens or closes the reel, video carries the middle.
- **Full 3-prompt formats**: When the user wants flexibility — e.g. POV slow morning + thali close-up have all 3 because the same format can publish as static (image + Pomelli card) OR reel (video + Pomelli end-slate).

Sample-row breakdown of which prompt fields are filled (of 25):
- All 3 prompts: 2 rows
- Pomelli + video: 12 rows
- Pomelli + image: 5 rows
- Pomelli only: 4 rows
- Image + video (no Pomelli): 2 rows
- Video only: 0 rows (the design landed on every video format also having a brand end-slate)

**Every row has at least one prompt.** No row asks Co-work for nothing.

## Workflow: how to use this CSV

### A. Generating assets with Co-work / ChatGPT / Veo / Banana

1. Open the CSV in Numbers / Sheets / VS Code.
2. Pick a row (start with `v2_pov_slow_morning` — richest example).
3. Take the **`pomelli_prompt`** value, paste into Co-work with a real destination dataset (e.g. dest_name=Spiti, sunrise_time=05:47, etc.). Ask Co-work to render a Pomelli-style template card.
4. Take the **`image_prompt`**, paste into ChatGPT 4o / Nano Banana / Midjourney. Same dataset substitution.
5. Take the **`video_prompt`**, paste into Veo / Sora / Runway. Same dataset.
6. Upload the rendered assets to:
   - Images → `nakshiq-autoposter/social_image_library/` (naming: `{format_id}-{dest_slug}.jpg`)
   - Videos → R2 bucket at `https://pub-bcda9bac2f63408880ee3f23aa3548e5.r2.dev/{slug}.mp4` (or with a `format_id` prefix for variants)

You have 35 video gens/day credit budget. Spend it on **variety**, not volume — pick 3-5 distinct format_ids per day, not 35 reps of the same listicle.

### B. Phase 2 — autoposter integration (not done yet, separate plan)

When Phase 2 ships, the autoposter will:
1. Load this CSV at startup.
2. Add each `format_id` to `MORNING_FORMATS` (or YT_SHORT_FORMATS for `yt_short` rows), respecting `pillar` for rotation bias and `max_freq_per_month` for cadence.
3. For each scheduled fire, look up the row → fetch `data_inputs` from the Supabase API → render `caption_template` with the placeholders → look for a matching asset in `social_image_library/` or R2.
4. SKIP the post if any required `data_inputs` field is null (same pattern as current builders — no silent fallback).

Until Phase 2 ships, this CSV is a **manual studio queue**: you generate the assets yourself, drop them in, and post via the existing 14-format autoposter.

## Pillar balance

| Pillar | Current 14 formats | This CSV (25 v2) | Combined coverage |
|---|---|---|---|
| Verdict | 3 (`score_card`, `weekend_escape`, `festival_alert`) | 3 (hindi score, score POV, weekend map) | 6 |
| Verification | 4 (`stays_pick`, `emergency_intel`, `eateries_pick`, `confidence_intel`) | 5 (budget receipt, cost vs feeling, arrival video, cost handwritten, YT hindi 3things) | 9 |
| Discovery | 4 (`hidden_gem_reveal`, `collection_series`, `route_spotlight_short`, `women_solo_brief`) | 6 (route map, UGC, series, hidden gem atmo, women solo video, YT route 5 stops) | 10 |
| Anti-trap | 1 (`tourist_trap`) | 5 (myth bust, local knows, tourist trap split, YT food capital, YT local etiquette) | 6 |
| Moment | 2 (`arrival_intel`, `cost_index_card`) | 6 (POV slow morning, thali close-up, wildlife moment, texture macro, festival sensory, YT silent POV) | 8 |

Anti-trap went from 1 → 6 formats (the most under-served pillar). Discovery + moment doubled.

## The 5 Indian creators studied — what we learned

| Creator | What they do | Format(s) in this CSV that borrow |
|---|---|---|
| **Tanya Khanijow** (@tanyakhanijow, 1.3M IG) | POV reels, animated maps, slow-travel storytelling, "I can't believe this is India" opens | `v2_pov_slow_morning`, `v2_route_animated_map`, `v2_myth_bust_oneline`, `v2_hidden_gem_reveal_atmo`, `v2_weekend_escape_map`, `v2_women_solo_brief_video`, `v2_yt_route_5_stops` |
| **Visa2explore** (Harish, 2M YT) | Series episodes, regional cuisine close-ups, ₹ prices spoken | `v2_thali_close_up`, `v2_series_episode`, `v2_yt_food_capital` |
| **Mountain Trekker** (Varun Vagish) | Hindi-first, budget travel, off-beat HP/UK/J&K | `v2_hindi_score_card`, `v2_budget_receipt`, `v2_local_knows`, `v2_yt_hindi_3things`, `v2_yt_local_etiquette` |
| **Tripoto Community** (@tripotocommunity, 1M) | UGC repost engine + community attribution | `v2_ugc_spotlight` |
| **Varun Aditya** (NatGeo wildlife) | Calm wildlife close-ups, slow camera, minimal text | `v2_wildlife_moment`, `v2_festival_alert_sensory`, `v2_yt_silent_pov` |

## Voice rules (already enforced in CSV by build-time grep)

- Sentence case throughout
- No `#NakshIQ` self-tag (allowed: `#nakshiqfound` for UGC submissions)
- No "magical / hidden paradise / must-visit / wanderlust / bucket-list"
- No "link in bio" (IG strips URLs, we don't have a bio link page)
- Comment-CTA close (not DM-CTA, not URL-CTA)
- Hindi parity required for any Hindi-target audience format
- SKIP on missing data — no silent fallback

The generator script (`/tmp/gen_content_strategy.py`, not committed) asserts these rules before writing the CSV. Future edits should preserve them.

## What's NOT in this CSV (out of scope)

- **Autoposter code changes** — Phase 2 (separate plan) wires the CSV into the rotation
- **Ken Burns image-render bug fix** — separate ticket; current commit (30c1b911) already half-fixed by killing Pomelli fallback in YT short renderer
- **Asset generation itself** — user runs Co-work with these prompts
- **Removing any of the existing 14 formats** — this CSV ADDS, doesn't replace. We'll see which v1 formats die naturally over 4 weeks of engagement data
- **English-only / Hindi-only routing logic** — the data field `audience_tag` will drive that in Phase 2

## Verification (anyone can re-run)

```bash
cd nakshiq-autoposter/data
python3 -c "
import csv
rows = list(csv.DictReader(open('content_strategy.csv')))
print(f'{len(rows)} rows × {len(rows[0])} cols')

from collections import Counter
pillars = Counter(r['pillar'] for r in rows)
print('pillars:', dict(pillars))

hindi = sum(1 for r in rows if 'Hindi' in r['notes'] or 'Devanagari' in r['pomelli_prompt'])
print(f'Hindi variants: {hindi}')

any_prompt = sum(1 for r in rows if r['pomelli_prompt'] or r['image_prompt'] or r['video_prompt'])
print(f'rows with ≥1 prompt: {any_prompt}/{len(rows)}')
"
```

Expected output: `25 rows × 15 cols / pillars: {verdict:3, verification:5, discovery:6, anti_trap:5, moment:6} / Hindi variants: 13 / rows with ≥1 prompt: 25/25`.

## Next step

Pick 5 rows from the CSV. Generate assets in Co-work. Upload to `social_image_library/` + R2. Post manually (the autoposter's 14-format rotation continues in parallel). After 1-2 weeks of v2 manual posts, measure engagement vs the v1 cohort. If v2 wins, ship Phase 2 (autoposter integration). If not, iterate the CSV.
