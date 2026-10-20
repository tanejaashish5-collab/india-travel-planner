# Voiced place reel: the locked structure

Founder, 2026-10-20, after the Chakrata sample: "this is perfect. Happy to finalise this and lock this
structure, the script style, the hooks, the pacing, everything ... all the future reels for YouTube or
Instagram should match this." Reference script: `chakrata__map_reveal.json`. Renderer: `place_voiced.py`.

## What is locked and what is not (founder 2026-10-20, after batch 1 came out identical)

"Lock this structure" meant the PRODUCTION: voice, pacing, cards, subtitles, end screen. It never meant the
script. Every reel belongs to a series (`"series"` in the script: where_is_it, real_cost, sos, swap, eat_here,
and the rest of the 11 in the playbook) and each series has its own opener, scene count, close and music.
No two reels in a row share a series; where_is_it posts at most once a week (scenario_daily enforces both).
A script may open on its own picture with a `"hook"` instead of the map (`"bg"` of scene 1 not `"map"`).
Founder sees every new series' first render before it posts: `place_voiced.py register <script> --hold`.

## The where_is_it series: seven scenes (one Hindi line each, each scene starts as its line starts)

| # | Picture | Line does | Card |
|---|---------|-----------|------|
| 1 | India map, pin, zoom; "Where is <Place>, really?" | Hook: a tension from OUR data (crowd note, a swap, what people get wrong). The place is not named yet. | none |
| 2 | Real Commons photo of the place | "ये है <Place>, …" + ONE distance + one texture fact | place: state, name, height, rail, airport |
| 3 | Veo clip of the good month (from the real photo), or a photo | Why the coming good month: only what that month's note says | The next good window / Month / score / note |
| 4 | Commons photo of the landmark (or scenery b-roll; never a photo claiming to be a place it is not) | "पर जो कोई नहीं बताता …": ONE fact only our research has (hidden_gems logistics, trap_swaps, persona verdict, nearest ER, eatery insider tip) | What nobody tells you + 3 short lines |
| 5 | Veo clip of the skip month (monsoon) | "पर <months> में मत जाइए, क्योंकि …" + the note's reason | Skip / months / score / reason |
| 6 | Another photo | Room price: the coming month vs peak, from `destination_costs` hotel-mid | A good room, per night: two rows |
| 7 | Full Ink end screen (Naksh.iq, Travel with IQ, nakshiq.com, Follow NakshIQ) | "हर महीने का पूरा हाल NakshIQ पर है, और ये उसे भेजिए जो …" (a specific person) | end screen |

## Script rules

- **Language:** everyday spoken Devanagari, talking to the viewer as आप. Write NakshIQ in Latin letters.
- **Flow:** every line joins its fact to a reason or consequence (और / क्योंकि / पर / तो / जबकि), and the next line picks up from it. No clipped fragments.
- **Numbers:** at most THREE spoken: usually the distance in line 2 and the two room prices. Everything else goes on the cards.
- **Scores:** never spoken. They appear on cards only, as the DB value × 2 out of 10.
- **Food:** no food cost, ever. Name researched eateries only on cards or in the caption, never a business name in the voice.
- **Facts:** every claim must trace to the fact pack (`scripts/reel-fact-pack.mjs <slug>`) or `reel-data.json`. List the sources in the script's `facts` block.
  - No superlatives the data does not state, and no stretching. "Shorter" stays shorter.
  - Prices: say the exact ledger value in words (सवा दो हज़ार = 2,250, साढ़े छब्बीस सौ = 2,650).
- **Punctuation:** no em dashes or en dashes.

## Production rules

- **Voice:** ElevenLabs v3, house Hindi voice, one pass, played at 1.2x (about 200 wpm). Cached by exact text, so re-renders are free and any word change is billed again.
- **Music:** chosen per series (`SERIES_MUSIC` in place_voiced.py: pop for where_is_it, light hip-hop for real_cost,
  steady cinematic for sos, EDM with the drop on the reveal for swap, warm acoustic for eat_here), never a track a
  voiced reel used in the last 7 days. Full 2-4 minute tracks, started past slow intros (`music_start`) or with a
  measured drop landed on a scene (`music_drop` + `music_drop_scene`), ducked under the voice, faded on the end screen.
- **Subtitles:** Hinglish for Instagram (`--subs hinglish`), English for YouTube (`--subs en`). Mark keywords with `*word*`.
- **Brand:** Ink cards with a Vermillion Bright rule, accent #E55642. Never yellow.
- **Credits:** on screen "Photos: Wikimedia Commons" only; authors go in the caption, because CC BY-SA requires them.
- **Clip eyeball first:** tile at 1.5 fps.
  - A clip with a glitch is either started past it (`clip:<file>@<seconds>`) or replaced by a photo.
  - Wrong Commons picks (a person, a different place) go into `guide_photo_reject.json`.
- **Caption:** the script's `caption_lead` (English, carries the room prices) and the photo credits. No AI line in the
  caption (founder 2026-10-20); YouTube gets its own AI setting on upload when the reel has Veo clips.
- **Length:** about 50 s. That's fine: the founder approved 50.9 s.
