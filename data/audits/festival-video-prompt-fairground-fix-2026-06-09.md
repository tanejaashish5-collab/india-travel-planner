# Festival video-prompt fix — human-venue subjects rendered crowds (2026-06-09)

## What broke
The 2026-06-09 2 PM festival B-roll run (Veo 3.1 Lite, 16:9, via Google Flow) caught
that the **"empty fairground" prompt template reliably renders the festival *with crowds***,
defeating the whole point of the pipeline (LOCATION-ONLY B-roll, never the ritual/people).

Verified live during the run — 3 clips rendered crowds and were deleted, 2 more skipped to
avoid burning credits:
- `prashar-mela-parashar-fair` — crowds + tents + flags
- `mitthe-shah-dargah-urs-fair` — crowds at the fair
- `nagdwari-mela` — tents + flags + crowds

## Root cause
`scripts/_gen-festival-video-prompts.mjs` had 4 keyword rules whose `subject` described a
**human-activity venue** and relied on **negation** to keep people out:

| keyword | subject (removed) |
|---|---|
| `carnival\|mela\|fair` | "empty fairground wide shot — tents, flags, dusty paths, **no crowds**" |
| `food\|cuisine\|gastronom` | "empty market street — clay pots and steam, **no vendors or customers**" |
| `craft\|weave\|textile\|…` | "empty workshop interior — looms, dye-pots, **no figures**" |
| `tribal\|adivasi\|bastar haat` | "forest-village clearing, **no figures**, smoke from distant hearths" |

AI video models cannot honour negation: "tents/flags/market/workshop" prime the gathering,
and "no crowds / no vendors" *names the very concept it's trying to suppress*, so the model
renders it. By contrast the `boat` subject ("distant lantern-lit boats, no occupants")
rendered **clean** in the same run — because **water dominates the frame, not people**.

**Discriminator:** a subject is safe when its core noun is a *place/structure* that is
inherently figure-free (river, ridge, temple exterior, empty beach). It is fragile when its
core noun is a *human gathering* (fairground, market, workshop, village clearing).

## Blast radius
50 of 331 festivals carried a fragile subject in the old CSV:
**44 fairground + 1 food + 2 craft + 3 tribal.** All 50 would have rendered crowds/figures —
i.e. fabricated the event, violating the founder "no fake data, ever" rule.

## Fix
1. **`scripts/_gen-festival-video-prompts.mjs`** — removed the 4 human-venue keyword rules +
   added a `HUMAN-VENUE EXCLUSION` policy comment. Those festivals now fall through to the
   terrain default (`<terrain_anchor> establishing wide shot — no figures, no signage`) or a
   later place-based keyword (temple/river/lake), which is the LOCATION-ONLY B-roll the
   generator was always meant to produce.
2. **`data/festivals/video-prompts.csv`** — regenerated from the fixed script.
   - Note: the committed CSV was stale at 331 rows; the DB catalog is now **501 festivals**
     (the worklist builder docstring already expects 501). Regeneration brings the CSV current
     *and* applies the fix. 0 fragile subjects / 0 fragile full_prompts remain; 501 rows,
     every row has a full_prompt + negative_prompt.
3. **`data/festivals/video-prompts-missing-2026-06-03.csv` / `.xlsx`** — rebuilt via
   `scripts/_build-festival-video-backfill-worklist.py` (181 missing: A 20 / B 7 / C 154).
   0 fragile prompts; the 6 rolled-over festivals now carry clean prompts.

## Result — the 5 rolled-over fragile festivals, after fix
| slug | new subject (location-only) |
|---|---|
| prashar-mela-parashar-fair | Himalayan ridges, deodar slopes (Prashar Lake, HP) |
| mitthe-shah-dargah-urs-fair | Thar desert dunes, fort silhouettes (Rajasthan) |
| nagdwari-mela | Vindhya plateau, sandstone outcrops, sal forest (MP) |
| nrusingha-chaturdasi-baisakh-mela | Chilika lagoon, coastal dunes (Odisha) |
| poush-mela | Bengal delta, mangrove waterways (WB) |

(`panguni-uthiram-pazhamudircholai` also rolled over but is unaffected — it kept its correct
Coromandel temple-exterior subject; it failed on a Veo retry stall, not a prompt issue.)

## Not done here
- No git commit (data/script change left in the working tree for founder review).
- No R2 upload / redeploy (separate step per `data/festivals/` README).
- Lesson carried into the script as a permanent policy comment so fragile subjects can't be
  re-introduced.
