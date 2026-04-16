# Nakshiq — Visual Identity System

**Status:** Locked v1  
**Date:** April 2026  
**Owner:** Ashish Taneja / Impresa de Artiste Pty Ltd

---

## Philosophy: Cartographic Sovereign

Nakshiq's visual identity is built on a single principle: **restraint is the distinction**. In a category (Indian travel media) where every brand shouts with saturated photography, bright colors, and hype-driven headlines, Nakshiq speaks quietly. The calm voice stands out precisely because nothing around it is calm. This is the same strategy Criterion Collection uses against the Hollywood blockbuster market, the same strategy Monocle uses against the glossy lifestyle magazine market, and the same strategy Aesop uses against the mass beauty market.

Every visual decision in this system reinforces that restraint. The wordmark is classical italic, not branded sans. The color palette is earth tones, not vivid gradients. The icon is a single letter and a single dot, not a pictographic scene. The layout is hairline-flanked and framed in whitespace, not dense and maximalist. When the reader encounters Nakshiq, their first impression should be *premium editorial publication*, not *another travel startup*.

---

## 1. The Wordmark

**Primary lockup:** `Naksh.iq` set in Crimson Pro italic, with a small vermillion period dot at the baseline between `Naksh` and `iq`. Beneath the wordmark sits the tagline `TRAVEL WITH IQ` in Instrument Sans Bold, tracked out, flanked by hairline rules on either side.

**Typographic logic:** The dot at the baseline reads as a period, making the wordmark legible as `Naksh.iq` (a single word with a file-extension-style split) rather than as `Naksh • iq` (two separate words joined by a bullet). This tight spacing is deliberate — it creates a single typographic unit that reads as one identity.

**The wordmark/tagline rhyme:** The `.iq` in the wordmark and the `IQ` in the tagline are the same two letters doing double duty. The wordmark uses them as a lowercase suffix (a file extension, a second syllable); the tagline uses them as an uppercase concept (intelligence, the capacity for judgment). This rhyme is the core typographic joke of the brand — it rewards readers who linger on the composition for half a second longer than average.

**File references:**
- `final/nakshiq-lockup-final-dark.svg` / `.png` — dark mode, 2000px and 2400px
- `final/nakshiq-lockup-final-light.svg` / `.png` — light mode, 2000px and 2400px

**Clear space requirement:** The wordmark must have clear space equal to at least the cap-height of the `N` on all four sides. No text, graphics, or edges may intrude into this zone.

**Minimum size:** The primary lockup should not be reproduced below 40mm wide in print or 300 pixels wide on screen. Below this, use the app icon or monogram instead.

---

## 2. The App Icon

**Primary mark:** Crimson Pro italic uppercase `N.` with a vermillion period dot at the baseline, rendered on an Ink Deep (`#161614`) background with the iOS squircle applied.

**Why uppercase N:** Early exploration considered lowercase `n.`, which reads as a quiet typographic accent. The uppercase `N.` has significantly more visual weight and presence at home-screen sizes, and survives the 29pt notification test more robustly. At the small sizes that matter most, weight becomes legibility.

**Why Crimson Pro:** The icon matches the exact typeface of the wordmark. This is the tightest possible form of brand consistency — the icon and wordmark are literally the same typeface, so the brand system has no typographic seams. A user who sees the icon and later sees the wordmark will experience them as continuous rather than related.

**iOS compliance:** The App Store master file is 1024×1024 pixels with **square corners**. Apple applies the squircle mask at the OS level automatically — submitting a pre-rounded icon will produce rendering artifacts. All other iOS sizes (from 20pt to 180pt) are pre-rendered with the squircle applied for marketing and documentation purposes.

**Size system — iOS:**
| Size | Use |
|------|-----|
| 1024×1024 | App Store submission (square corners) |
| 180×180 | iPhone home screen @3x |
| 167×167 | iPad Pro home screen |
| 152×152 | iPad home screen |
| 120×120 | iPhone home screen @2x / spotlight @3x |
| 87×87 | iPhone settings @3x |
| 80×80 | Spotlight @2x |
| 60×60 | Notification @3x |
| 58×58 | Settings @2x |
| 40×40 | Spotlight |
| 29×29 | Settings |
| 20×20 | Notification |

**Size system — Android:**
- Adaptive icon foreground (432×432, transparent background)
- Adaptive icon background (432×432, Ink Deep flat color)
- Legacy launcher icons: mdpi 48, hdpi 72, xhdpi 96, xxhdpi 144, xxxhdpi 192

**Size system — Web:**
- `favicon.svg` (modern browsers, scales to any size)
- `favicon-16.png`, `favicon-32.png`, `favicon-64.png`, `favicon-96.png`, `favicon-128.png`, `favicon-256.png`
- `apple-touch-icon.png` (180×180)
- `android-chrome-192.png`, `android-chrome-512.png`
- `mstile-144.png` (Windows tile)

**File references:** `icon-system/ios/`, `icon-system/android/`, `icon-system/web/`

---

## 3. The Monogram

**When to use:** The monogram is the icon *without its background* — just the `N.` glyph and the vermillion dot, as a standalone mark. Use it for:
- Watermarks on photographs and articles
- Letterpress and foil stamping for print materials
- Secondary brand contexts where the full wordmark would be too much and the app icon would be too contextual (it reads as "an app" rather than "a mark")
- Editorial signatures at the end of long-form content

**Three approved variants:**
1. **Monogram Dark** (`monogram/nakshiq-monogram-dark.svg`) — Ink `N.` on transparent. Use on light backgrounds (Bone, white, cream paper).
2. **Monogram Light** (`monogram/nakshiq-monogram-light.svg`) — Bone `N.` on transparent. Use on dark backgrounds (Ink Deep, Ink, deep photography).
3. **Monogram Vermillion** (`monogram/nakshiq-monogram-vermillion.svg`) — Vermillion `N.` on transparent. Use for special editorial moments — year-end reviews, Founder's Letter, manifesto pieces. This variant should be rare.

---

## 4. Color Palette

The palette is earth-toned, restrained, and deliberately limited. Six colors total: two core tones (Ink and Bone), two accents (Vermillion in two calibrations), and two editorial supports (Topographic Green and Saffron Gold).

| Role | Name | Hex | RGB | Usage |
|------|------|-----|-----|-------|
| Primary dark | **Ink** | `#0E0E0C` | 14, 14, 12 | Body text on light backgrounds, primary dark surfaces |
| Primary dark (icon) | **Ink Deep** | `#161614` | 22, 22, 20 | App icon background, dark-mode surfaces |
| Primary light | **Bone** | `#F5F1E8` | 245, 241, 232 | Body backgrounds, cream paper surfaces |
| Accent (light) | **Vermillion** | `#D43F2A` | 212, 63, 42 | The dot on light backgrounds, accents in print |
| Accent (dark) | **Vermillion Bright** | `#E55642` | 229, 86, 66 | The dot on dark backgrounds, accents on dark UI |
| Editorial support | **Topographic Green** | `#2F4F3F` | 47, 79, 63 | Score accents, secondary UI highlights, data visualization |
| Editorial support | **Saffron Gold** | `#C8932F` | 200, 147, 47 | Rare editorial accents, cover illustrations, occasional highlights |

**Color calibration rules:**
- Vermillion `#D43F2A` is for light backgrounds. Vermillion Bright `#E55642` is for dark backgrounds. Never swap them. The two values are calibrated for perceptual brightness equivalence across the two backgrounds.
- Topographic Green and Saffron Gold are *editorial supports*, not brand colors. They appear in content (chart accents, Score badges, section headers) but never in the wordmark, icon, or primary lockup.
- Absolute black (`#000000`) and absolute white (`#FFFFFF`) are not part of the system. Ink and Bone replace them.

---

## 5. Typography

Three fonts do the work. Each has a single clearly defined role and is never used outside it.

### Crimson Pro Italic — Display

**Use for:** The wordmark, headlines, pull quotes, closing statements, the first letters of featured articles, anything meant to be read as a *typographic event* rather than body content.

**Never use for:** Body copy, UI labels, captions, navigation, forms.

**Style:** Classical book italic. Used at sizes from 32pt (sub-headlines) to 1000pt+ (hero wordmark). Always italic, never roman. Letter-spacing at default (no tracking adjustments).

### Instrument Sans Bold — Labels and Taglines

**Use for:** The tagline `TRAVEL WITH IQ`, section headers, UI labels, metadata, captions, social post headlines, any text that needs to be *functional but punchy*.

**Tracking convention:** All-caps Instrument Sans Bold in this system is always tracked out by 10-50% depending on use. For the tagline itself, use 50% tracking. For UI labels, use 10-15%. For metadata captions, use 20-30%. Tracked-out all-caps is the core brand typography gesture for functional text.

**Never use for:** Body copy, long-form reading, the wordmark itself.

### JetBrains Mono Bold — Data and Scores

**Use for:** The Nakshiq Score (`9.2`, `8.7`, `6.4`), GPS coordinates, dates, monetary figures, any numerical data that needs to read as *measured and precise*. Also used for small technical labels and file-system references.

**Why monospace:** Data deserves a typographic treatment that signals "this is a measurement, not a marketing claim." Monospace numerals are the typographic equivalent of a lab coat.

**Never use for:** Body text, headlines, the wordmark, anything non-numeric that isn't explicitly data.

### Font files
All fonts are open source (SIL Open Font License) and bundled with the brand pack. They can be embedded in any application, website, print production, or vendor delivery without licensing concerns.

---

## 6. Layout Principles

### Restraint first
Whitespace is part of the brand. Layouts should feel *breathable*, not packed. When in doubt, remove an element rather than rearrange it.

### Hairline discipline
Hairlines (1-2pt strokes in a muted gray) are the primary structural element of the brand's layout system. Use them to:
- Separate sections
- Flank taglines and captions
- Border tables and data cells
- Mark page edges in print

Never use thick borders, drop shadows, beveled edges, or other "decoration." The hairline is enough.

### The tagline slot
The tagline `TRAVEL WITH IQ` always appears beneath the wordmark, centered, with hairlines flanking it on both sides. Hairline length should equal roughly half the tagline's width. The gap between the tagline and the hairlines is 40-80px depending on the overall lockup size.

### Grid system
The brand uses a simple 12-column grid at 1440px width for web layouts and a 6-column grid for mobile. Gutters are 24px on desktop, 16px on mobile. Margins are 80px on desktop, 24px on mobile.

### The closing line
`Go with confidence.` — the Crimson Pro italic closing — is the brand's sign-off. Use it at the end of:
- Long-form articles (as the final sentence or the byline footer)
- Email newsletters (as the sign-off)
- Press releases (as the closing paragraph)
- Pitch decks (as the final slide)
- Videos (as the closing card)

Never use the closing line as a primary tagline, in the logo lockup, or as a marketing header. It is specifically a *closing* — it ends things, it doesn't start them.

---

## 7. Voice & Photography

### Voice
Nakshiq writes in a direct, first-person, confident register. It does not use corporate hedging, marketing superlatives, or hype language. When Nakshiq recommends a place, it says so. When Nakshiq advises against a place, it says so more firmly. The writing voice is approximately 70% natural (journalistic, human, unpolished) and 30% editorial (tightened, fact-checked, considered).

**Words to avoid:** hidden gem, unforgettable, stunning, must-visit, bucket list, breathtaking, magical, incredible, authentic, curated, elevated, immersive.

**Words to use:** specific dates, specific prices, specific distances, specific altitudes, named people, named conditions, measured scores, concrete comparisons.

### Photography rules
- **No sponsored or stock travel photography.** All imagery is either (a) taken by the Nakshiq team or commissioned photographers, (b) sourced from a locked short-list of trusted photographer partners with attribution, or (c) not used at all.
- **No sunsets as the primary image for a destination.** Sunsets are the visual equivalent of "incredible" — overused, meaningless, and indistinct. A sunset can appear as one image in a set of eight, never as the hero.
- **No heavily saturated color grading.** Photos are presented with minimal processing, respecting the actual color of the place at the time the photo was taken.
- **No people posing for the camera.** Human subjects should be captured in action (walking, cooking, reading, praying, building) rather than smiling at the lens.
- **No drone shots as the default.** Drone photography is useful occasionally; it should never be the default visual vocabulary of the brand.

---

## 8. The Score System

The Nakshiq Score is the brand's core product and also a visual element. Scores are always displayed in JetBrains Mono Bold, always in Vermillion on light backgrounds and Vermillion Bright on dark backgrounds. The Score is always presented with:
- The destination name
- The month or date range the score applies to
- The specific dimensions that were measured (weather, roads, crowds, safety, family, permits)

**Three sacred rules of the Score:**
1. **No paid scores.** Ever. No agency, no tourism board, no hotel chain, no destination partner can influence a Score. Not with money, not with access, not with hospitality. A Score that has been touched by external interest is a lie, and Nakshiq does not lie.
2. **Date stamps are mandatory.** Every Score must display the month and year it was last verified. Scores are not static — a place that was an 8.9 in March can be a 4.2 in July. Without a date, a Score is just a number; with a date, it becomes a measurement.
3. **Negative scores appear with the same prominence as positive scores.** If Goa in December is a 3.1, Nakshiq publishes `3.1` at the same size and weight as if it were 9.1. The Skip List is as important as the Recommend List. Hiding low scores is a form of paid influence, even if no money changed hands.

---

## 9. Do Not

- Do not use the wordmark in any font other than Crimson Pro italic.
- Do not change the color of the vermillion dot, even for "fun" seasonal variants.
- Do not animate the wordmark, the icon, or the dot.
- Do not use the icon as a background pattern or watermark — it is a mark, not a texture.
- Do not set the wordmark in all caps (`NAKSH.IQ`) or sentence case (`Naksh.Iq`). It is always `Naksh.iq` with a capital N, lowercase `aksh`, vermillion dot, lowercase `iq`.
- Do not modify the hairline-flanked tagline layout. The tagline is always `TRAVEL WITH IQ`, tracked at 50%, flanked by hairlines, positioned below the wordmark.
- Do not combine Nakshiq branding with Chanakya Sutra branding in a single composition. The two brands share an owner but not a visual system.
- Do not add drop shadows, glows, gradients, or bevels to any element of the system.
- Do not use Nakshiq alongside partner logos as a "lockup" — the wordmark stands alone. Partner relationships are acknowledged in text, not in visual co-branding.

---

## 10. Files & References

### Core files
- `final/nakshiq-lockup-final-dark.svg` — primary wordmark, dark mode
- `final/nakshiq-lockup-final-light.svg` — primary wordmark, light mode
- `nakshiq-brand-poster.svg` — full brand system overview
- `icon-system/ios/nakshiq-icon-1024-AppStore.png` — App Store master (square corners)
- `icon-system/marketing/nakshiq-icon-dark.svg` — primary icon, dark
- `icon-system/marketing/nakshiq-icon-light.svg` — primary icon, light
- `monogram/nakshiq-monogram-*.svg` — standalone N. marks

### Supporting documents
- `01_Nakshiq_Brand_Bible.md` — positioning, voice, audiences
- `02_Visual_Identity.md` — this document
- `03_Launch_Playbook.md` — 30-60-90 day plan, channel playbooks
- `04_Tactical_Assets.md` — templates, copy, legal briefs

### Version history
- **v1** (April 2026) — Initial lock after ten rounds of exploration. Locked wordmark, tagline, icon, color palette, typography system, layout principles.

---

*Go with confidence.*
