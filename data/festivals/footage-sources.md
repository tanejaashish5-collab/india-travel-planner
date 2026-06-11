# Festival hero footage — sources, licences & provenance

Real festival footage that replaced the old location-only "landscape B-roll" hero
clips on `/festivals/[slug]`. Each clip is an authentic, free-licensed video of the
festival **type**, mapped to festival slugs by visual family in
`apps/web/src/lib/festival-footage-map.ts` (one real clip serves every festival in
its family). Clips are stored on R2 (`nakshiq-videos/fam-<family>.mp4`); the binaries
are gitignored (`data/festivals/footage/`).

Every clip below was **verified frame-by-frame** (ffmpeg contact sheet) at source to
confirm it genuinely depicts the festival before use — per the project's
no-fabrication rule. Normalisation: muted, ~8 s, ≤1600 px wide, H.264 crf 26, 30 fps,
faststart.

## Pexels (Pexels Licence — free for commercial use, **no attribution required**)

| family | festivals served | Pexels video ID | what it shows |
|---|---|---|---|
| `holi` | 11 | 31320449 | aerial — ground drenched in pink colour, Holi crowds |
| `diwali` | 7 | 34579325 | rows of lit diyas glowing at night |
| `ganesh` | 19 | 5234413 | Ganesha idol in red cloth + marigold garlands |
| `shivaratri` | 21 | 30874378 | Varanasi Ganga aarti — priests with flame lamps, night ghat crowd (generic temple-aarti; represents the Shivaratri night vigil) |
| `durga-navratri` | 9 | 34732242 | illuminated Durga Puja pandal at night |
| `onam-boatrace` | 4 | 34685187 | Kerala snake-boat race, rowers passing under a bridge |
| `kumbh-snan` | 7 | 31094211 | devotee applying tilak, sadhu + oceanic Kumbh crowd |
| `bathukamma` | 2 | 34439719 | the conical marigold Bathukamma flower-stack + Gauri idol |

Pexels download pattern used: `https://www.pexels.com/download/video/<ID>/` 302-redirects
to the direct `videos.pexels.com` file (filename encodes resolution; landscape clips
chosen). Page HTML is Cloudflare-gated (403) but the download endpoint is open.

## Wikimedia Commons (CC BY-SA — **attribution required**, shown as a caption on the hero)

| family | festivals served | file | author / licence |
|---|---|---|---|
| `monastery-cham` | 26 | `Cham dance at Leh Palace, 13 February 2018.webm` | Sumita Roy Dutta — CC BY-SA 3.0 |

Credit string rendered on the page (`FOOTAGE_CREDIT` in the map): *"Cham dance: Sumita
Roy Dutta / Wikimedia Commons, CC BY-SA 3.0"*. Alternate verified Cham clip held in
reserve: `V Cham dance during Dosmoche festival 20180213 131349.webm` (same author, CC BY-SA 3.0).

## Coverage (as of 2026-06-11)

- **105 / 501 festivals** now carry real festival footage (9 families above).
- **396** fall back to the destination hero image (obscure/regional festivals with no
  authentic free footage, or visually-distinct subtypes held for specific sourcing).
- Pipeline to add more: source → frame-verify → `data/festivals/footage/fam-<family>.mp4`
  → `node scripts/_gen-festival-footage-map.mjs` → `node scripts/_upload-festival-footage.mjs`.
  Classification families live in `scripts/_lib/festival-footage-rules.mjs`.

### Still to source (next batches — validated as available)
flower-bloom (9), harvest-sankranti (10), islamic (7), colonial-christian (7),
chhath (3), camel-fair (2, generic decorated-camel), goa-carnival (2), newyear-harvest (4),
rath-yatra (1), bihu (1), hornbill (1), thrissur-pooram (2), dasara-mysore (2),
litfest (2), folk-women (2), and the held SUBTYPEs (bonalu, theyyam, kullu/bastar dussehra).
