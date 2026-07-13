# NEW-2026-07-09-001 — Destination hero tagline + "why special" body copy render in English on /hi despite translated data existing in the DB

## Discovery path
Section C (Hindi parity) only checks `html lang="hi"` + Devanagari `<title>` — both passed 10/10 as usual. A live Chrome DOM read of wayanad/hi (today's random sample) during Section K showed the visible H1, tagline, and "WHY SPECIAL" body text rendering in English despite `htmlLang: "hi"` being correct. Investigated further because this looked like a real content gap, not a harness artifact.

## Live DOM proof (https://www.nakshiq.com/hi/destination/wayanad)
```
htmlLang: "hi"                                     <- correct
h1: "Wayanad."                                      <- WRONG, should be "वायनाड."
tagline shown: "Prehistoric caves, heart-shaped lake, and the Western Ghats at their wildest"   <- WRONG (English)
breadcrumb: "खोजें/KERALA/WAYANAD"                   <- nav chrome translated, slug labels not
"WHY SPECIAL" section header + body: fully English   <- WRONG
```
Browser tab title WAS correctly Devanagari: "वायनाड, केरल: सर्वोत्तम यात्रा समय और मौसम | NakshIQ" — confirms `generateMetadata` uses a different, correctly-localized code path than the page body.

## DB proof — translated content exists and is unused
`destinations.translations->'hi'` for wayanad:
```json
{"name": "वायनाड", "tagline": "प्राचीन गुफाएं, दिल के आकार की झील और पश्चिमी घाट अपने सबसे जंगली रूप में",
 "why_special": "केरल का एडवेंचर जिला। एडक्कल गुफाएं जिनमें 8,000 साल पुराने पेट्रोग्लिफ़्स हैं। ..."}
```
Same pattern confirmed for bidar, dalhousie, medak, mokokchung, old-goa, tura, netarhat, yusmarg, gahirmatha (9 of today's other 9 sample destinations) — all have complete `name`/`tagline`/`why_special` Hindi translations sitting in the DB, none rendered.

## Scope (DB aggregate, all 533 destinations)
```
total=533, has_hi_key=525, has_hi_tagline=525, has_hi_why_special=525, has_hi_name=525
```
525/533 (98.5%) of destinations have complete Hindi translations ready and unused. The only 8 without (`aritar, dzongu, mangan, nathu-la, phodong, rinchenpong, tashiding, yumthang-valley`) are exactly the 8 Sikkim destinations added 2026-06-14 — honest scarcity (same known lag as their missing /cost/ pages), not part of this bug.

## Root cause (pinpointed in source)
`apps/web/src/components/destination-detail-cinematic.tsx`:
- Line 131 — the CORRECT pattern, applied only to `name`:
  ```js
  (locale !== "en" && dest.translations?.[locale]?.name) || dest.name;
  ```
- This same fallback is **not** applied to `tagline` or `why_special` anywhere in the file. Raw `dest.tagline` / `dest.why_special` are read directly at (at least): lines 161/163 (memoized fields), 274, 297, 376 (hero component props), 473/486 (tagline display), 593/594 (`PullQuote`), 607/624 ("WHY SPECIAL" card), 1082/1084 (prose block), 3025/3029 (share text).
- The component already has a `localizeRow(row, locale, [...fields])` helper in active use for sub-objects (eateries at line 144, stays at line 195, editor stay picks at line 2325) — so the localization infrastructure and pattern both exist in this exact file, they're just not wired to the two most prominent top-level fields.

## Not a new regression
`git log -3 -- apps/web/src/components/destination-detail-cinematic.tsx`:
```
fe1fb12d8 2026-07-04 fix(seo): with-kids null-crash 500s + gate /cost links on cost data
4c8d93c3d 2026-06-10 feat(web): cross-family internal links + itinerary sitemap/hub wiring
f8c226c29 2026-06-03 fix(safari): add /safari inbound link to the cinematic destination hub
```
None touch translation wiring — this looks like a long-standing gap (present since translations data was populated), never caught because Section C's harness check only verifies `lang` attribute + title, not body copy. Not touched by today's deploy (f7fab29b2, image-only).

## Recommendation
Apply the same `(locale !== "en" && dest.translations?.[locale]?.tagline) || dest.tagline` / `...why_special...` pattern used for `name` (line 131) to every `dest.tagline` / `dest.why_special` read site in this file. High-value, low-risk fix — the data is already there for 525/533 destinations.

## Severity
HIGH — silently wrong-language content on the primary editorial "verdict" copy (tagline + why-special) across 525/533 (98.5%) destination pages when viewed in Hindi, directly undermining the "bilingual (en/hi)" product claim. Not a crash/5xx; page still renders and is readable (English fallback), so not CRITICAL.
