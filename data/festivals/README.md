# Festival video prompts

`video-prompts.csv` — one row per festival (331 rows). Use it to generate AI
B-roll videos for the per-festival pages at `/festivals/<slug>`.

## Hard rule: location-only, never the ritual

Every prompt asks the AI tool to render **the host destination at the
festival's time of year** — never the festival itself, never figures in
ritual attire, never temple interiors, never specific deity imagery.

Why: AI video models cannot accurately render Indian religious / cultural
specifics (correct sect attire, correct ritual sequence, regional dialect
of festival practice). A wrong-looking Hemis Festival video labelled as
authentic would be brand-poisoning — worse than no video.

So the videos are framed editorially as "evocative footage of the host
place at the time of year", not as documentation of the festival.

The `negative_prompt` column repeats the fabrication-blocking exclusions
on every row.

## Columns

| Column | Description |
|---|---|
| `priority_tier` | A / B / C. A = known high-search festivals (Pushkar Camel Fair, Kumbh, Jaipur Lit Fest, etc.) — produce these first. B = mid-tier (heritage, hill-station). C = long-tail. |
| `festival_id` | UUID from the `festivals` table — links the prompt back to the DB row. |
| `festival_slug` | The slug used at `/festivals/<slug>`. Collision-aware (11 names dup → `-<destination_id>` suffix). |
| `festival_name` | Plain name. |
| `destination_id` | Host destination id (matches `destinations.id`). |
| `destination_name` | Plain name for prompt-writing context. |
| `state` | State name. |
| `month_num`, `month_name` | Festival's month — drives the light + weather layer of the prompt. |
| `approximate_date` | Free-text date label from the DB row (e.g., "January 14", "May (varies)"). |
| `terrain_anchor` | The visual baseline for the destination — city-specific override (Bhubaneswar = temple precincts) when present, otherwise state-level (Rajasthan = Thar dunes), otherwise type-based (beach / mountain / forest). |
| `subject` | The specific thing in frame. From a festival-name keyword match (kite → empty sky with specks; camel → desert dunes with silhouettes) or, when nothing matches, the terrain anchor + "no figures, no readable signage". |
| `shot_type` | Drone push-in / static establishing / ground tracking — picked from the terrain. |
| `time_of_day` | Picked from the month-mood. Rain-shadow (Ladakh/Spiti) and high-altitude (>= 1500m) destinations get a different mood than the plains. |
| `atmosphere`, `palette` | Light + weather + colour story for that month at that elevation. |
| `full_prompt` | **The actual prompt to paste into Runway / Sora / Pika / Veo / Kling.** Composes all of the above into a single instruction. |
| `negative_prompt` | The fabrication-blocking exclusions. Most tools accept this in a separate field; otherwise paste it on a new line after the main prompt with "Negative prompt:" prefix. |
| `reference_image_url` | The destination JPG on R2. Use as the **image-to-video reference** in any tool that supports it — gives the model an architecture/landscape anchor and reduces fabrication risk further. |
| `destination_video_url` | The existing per-destination .mp4 on R2 (where one exists). Tools that support video-to-video can use this as motion reference. |
| `page_url_en`, `page_url_hi` | The festival page the video is destined for. |
| `duration_seconds` | Default 6. Tune per tool. |
| `aspect_ratio` | 16:9 to match the festival-page hero slot. |
| `notes` | Per-festival safety reminders (e.g., "Tribal community — do NOT render figures or attire", "High-altitude — respect actual seasonal access"). |

## Workflow

1. **Sort by `priority_tier`** and generate tier A first (~60 festivals).
   These are the known high-search names. Worth the upfront care.
2. For each row, paste `full_prompt` into your AI video tool. If the tool
   supports image-to-video reference, also paste `reference_image_url`.
3. Paste `negative_prompt` into the negative-prompt field (or append).
4. Review the generated clip against the `notes` column. If the model
   tried to add figures / attire / idol imagery, regenerate with the
   negative-prompt strengthened.
5. Upload to R2 at a stable path (suggested: `festivals/<festival_slug>.mp4`
   in the same `nakshiq-images` bucket the destination images live in).
6. Wire into the festival page — separate code change. The festival
   detail page currently shows a destination hero image; that becomes a
   video tag with the JPG as poster.

## When to re-run

Re-run the generator whenever the `festivals` table changes (new rows,
updated names). The script is idempotent — same input → same output.

```bash
node scripts/_gen-festival-video-prompts.mjs
```

Re-runs read straight from prod via the existing Supabase env keys in
`apps/web/.env.local`. No metered API. No paid sub-agent.

## Customising

The script encodes the templating logic in named constants near the top:

- `MONTH_MOOD` — plains seasonal mood by month.
- `STATE_ANCHOR` — visual baseline by state.
- `CITY_ANCHOR` — overrides for cities whose character diverges from the
  state baseline (Bhubaneswar isn't Chilika, Varanasi isn't UP plains).
- `FESTIVAL_KEYWORDS` — festival-name → subject specificity. Add a new
  pattern if you see a category falling through to the terrain default.
- `HIGH_PRIORITY` — tier-A whitelist.
- `RAIN_SHADOW` / `RAIN_SHADOW_DESTS` — overrides for regions that aren't
  monsoonal during the plains-monsoon months.

Hand-tune the CSV after generation if a specific row needs more care —
the file isn't expected to be regenerated frequently.

## Coverage

Current run: **331 rows · 248 unique host destinations · tier A 63 / B 16
/ C 252 · 45% keyword-matched subjects, 55% fall back to terrain anchor.**
