# The Window — Design Brief for External AI Agents

> Copy this entire document into V0, Claude Design, Cursor Agent, ChatGPT, Gemini, Perplexity Labs, or any design-capable AI. Instruct it to generate a single self-contained dark-theme editorial HTML email, 600px max width, using the content model, sample data, brand tokens, safety rules, and editorial patterns below. Read to the deliverable checklist at the end before submitting work.

---

## 1. Product context

**NakshIQ** is a travel confidence engine for India — 480 destinations, 36 states, every destination-month scored 1–5 for weather + road + crowd + festival fit. Deployed at [nakshiq.com](https://www.nakshiq.com). Voice is Monocle-adjacent: calm, data-over-adjectives, hairlines not borders, restraint is the distinction.

**"The Window"** is the weekly Sunday newsletter aligned with the landing-page bento hero ([/where-to-go/april](https://www.nakshiq.com/en/where-to-go/april)) and the autoposted YouTube Short. One weekly story, three channels, same 5 picks.

**Reader job-to-be-done** — plan this week's India trip in two minutes. They open Sunday morning, commit to one destination by Monday, travel Friday. They don't want essays. They don't want dashboards. They want a calm, authoritative voice saying "this is where you should be this week."

**Voice rules:**
- Numbers over adjectives. `22–30°C` beats `pleasantly cool`.
- Hairlines not borders. Thin 1px rules at 15–20% opacity, never thick outlines.
- No exclamation points. Never "amazing!", "must-visit!", "incredible!".
- **Banned-word list** (hard no): hidden gem, unforgettable, stunning, must-visit, bucket list, breathtaking, magical, incredible, authentic, curated, elevated, immersive, paradise, pristine.
- First-person OK when signed ("— Ashish"). Third-person plural ("we think") is a lie because there is no "we" yet.
- Italic serif for editorial touches (headlines, captions, pull-quotes). Mono sans for metadata (datelines, scores, tags). Body sans for longer prose.

---

## 2. Brand tokens (locked)

**Dark palette — non-negotiable:**
```
Canvas         #0B0B0C   (near-black, not #000000 — Gmail re-inverts true black)
Surface        #141416   (one step up, for cards and callouts)
Rule hairline  #2A2A28   (borders, dividers, section stops)
Text primary   #E7E4DE   (warm off-white — not #FFFFFF, reduces glare)
Text muted     #9A9A95   (captions, metadata, muted line)
Text very muted #6A6A65   (footer text, deep background)
```

**Accent ladder (editorial signals):**
```
Vermillion  #E55642   — editorial hook, month-name landmark, "why this week"
Emerald     #34D399   — 5/5 peak score signal (= "go")
Saffron     #C8932F   — 4/5 good-time score signal (= "works")
Bone cream  #E8E2D6   — for oversized numerals / display accents
```

Vermillion is the spice, not the main dish. Use it for 2–3 elements per email, not everywhere. When everything is an accent, nothing is.

**Typography — target + fallback stack (critical):**

Serif target: **Fraunces** (Google Fonts, variable weight + italic). Fallback stack:
```css
font-family: 'Fraunces', 'Didot', 'Bodoni 72', 'Hoefler Text', Georgia, 'Times New Roman', serif;
```

Sans target: **Geist** (Vercel). Fallback stack:
```css
font-family: 'Geist', -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

Mono target: **Geist Mono**. Fallback:
```css
font-family: 'Geist Mono', 'SF Mono', 'Menlo', 'Monaco', 'Consolas', monospace;
```

Web fonts via `<link>` load in Apple Mail / iOS / Samsung / new Outlook only. Gmail + Outlook Windows will fall back — your stack must be stylistically similar at the fallback tier.

---

## 3. Content model (what the newsletter has access to)

```json
{
  "issueNumber": 16,
  "month": 4,
  "monthName": "April",
  "week": 3,
  "year": 2026,
  "dateRange": "April 15-21, 2026",
  "opening": "Short 1-2 sentence voice-driven opener.",
  "picks": [
    {
      "id": "barot-valley",
      "name": "Barot Valley",
      "state": "Himachal Pradesh",
      "tagline": "The valley that Google Maps forgot — no ATM, no hospital, no Mall Road, just the Uhl river and you.",
      "score": 5,
      "elevation_m": 1820,
      "difficulty": "easy",
      "position": 1,
      "why_this_week": "Barot Trout Festival this month.",
      "image": "https://pub-d8970c901de34c218926ebf4be1ed09a.r2.dev/destinations/barot-valley.jpg",
      "monthly_scores": [2, 2, 4, 5, 5, 4, 2, 2, 5, 5, 3, 2]
    }
    // ... 4 more positions, same shape
  ],
  "skip": {
    "trapName": "Kolkata",
    "trapReason": "Kolkata in April is 38°C humidity, crowded trams, and no Bengal you came for.",
    "alternativeName": "Shantiniketan",
    "alternativeReason": "Tagore's Visva-Bharati campus — Baul music in the fields, Kala Bhavana art, the intellectual Bengal with 85% less traffic."
  },
  "road": {
    "title": "Chandigarh → Shimla (NH5) — open",
    "body": "Well-maintained highway. 115km, ~3.5 hours. Narrow and winding after Solan with hairpin bends. Heavy weekend traffic can stretch to 5+. Fuel at Parwanoo, Solan, Shimla. Shimla parking scarce — use public transport from Tutikandi."
  },
  "changes": {
    "scoresUpdated": 0,
    "notesEdited": 0,
    "destinationsAdded": 251
  },
  "closing": "Go with confidence.",
  "unsubscribeUrl": "https://www.nakshiq.com/api/newsletter/unsubscribe?token={RESOLVED_TOKEN}",
  "webViewUrl": "https://www.nakshiq.com/en/the-window/2026-04-w3"
}
```

Use **all 5 picks** — the alignment contract requires every pick ID to be present somewhere in the email (as a link, thumbnail, or full treatment). You can vary *editorial prominence* — one or two picks get a full hero + editorial paragraph, rest get smaller teases — but all 5 IDs must be clickable to `/en/destination/{id}/april`.

---

## 4. Dark-theme email safety card (15 hard rules)

Non-negotiable. A mockup that violates these will fail in Gmail, Outlook, or Apple Mail, or will be force-inverted into something unusable.

1. Use `<meta name="color-scheme" content="light dark">` + `<meta name="supported-color-schemes" content="light dark">` + CSS `:root { color-scheme: light dark }` — prevents Apple Mail + new Outlook force-invert.
2. Canvas color `#0B0B0C` or `#141416`, never `#000000` — Gmail re-inverts true black.
3. Body text `#E7E4DE`, not `#FFFFFF` — reduces glare, survives Gmail contrast tweaks.
4. Tables for layout, NOT CSS Grid or Flexbox — Outlook Windows and Gmail strip both. Use `<table role="presentation">`.
5. **Max width 600px.** Past 600px Outlook Windows clips.
6. VML buttons for Outlook (`<!--[if mso]>...<v:roundrect>...<![endif]-->`) — `border-radius` is ignored otherwise.
7. Inline styles on every element, not a `<style>` block alone — Gmail strips `<style>` in forwarded messages.
8. PNG/JPG only, not SVG — Gmail strips inline SVG, Outlook rejects external.
9. Bake a 24px dark-canvas padding around every image inside its container — eliminates Outlook's "halo" around transparent corners.
10. Dual-logo approach with `@media (prefers-color-scheme: dark)` — a transparent logo disappears in Gmail's partial invert.
11. Fallback font stack on every text block — Gmail and Outlook Windows won't load Google Fonts.
12. Unicode arrow glyphs `→` `↗`, never emoji arrows — emoji render inconsistently across platforms.
13. Descriptive alt text on every content image — alt IS the fallback when Outlook blocks images by default. Make the alt readable as a headline.
14. Wrap images in `<a>` with `style="display:block; border:0; text-decoration:none"` — the most survivable click pattern, and the alt text remains clickable when images fail.
15. `loading="lazy"` on non-hero images + explicit `width` and `height` HTML attributes on every `<img>` — Outlook needs the attrs to reserve space.

**Client compatibility verdict (what to AVOID):**
- CSS Grid ❌ (unsupported in Gmail, Outlook Windows, Yahoo)
- Flexbox ❌ (unless purely progressive enhancement with table fallback)
- `mask-image`, `backdrop-filter` ❌ (Apple Mail only)
- `aspect-ratio` as sole sizer ❌ — use HTML width/height attrs
- `@supports` ✅ (progressive enhancement)
- `<picture>` with `media="(prefers-color-scheme: dark)"` ✅ (Gmail falls back to inner `<img>`)
- `loading="lazy"` ✅ (harmless where unsupported)

---

## 5. Editorial patterns library (12 moves to mix + match)

Sourced from Monocle Minute / Weekly, Condé Nast Traveler, Afar, NYT Surfacing, Airmail, Cereal, Kinfolk, Dense Discovery, Six Degrees, Sidewalk Tokyo, Flaneur's World.

1. **Signed dateline lede** — city + date stamp + editor intro before any image. `CANBERRA, 19 APRIL` in 14px tracked small-caps, followed by 16–18px italic serif lede, signed "— Ashish".

2. **Full-bleed hero with bottom-left caption block** — 1200×800 image (2× retina for 600px body), 40% bottom-to-top gradient scrim, Fraunces italic 40–48px headline overlaid bottom-left, 10px tracked kicker above ("DISPATCH 01 · UTTARAKHAND").

3. **Numbered pick list** — 64–96px display numerals (Fraunces italic) in bone `#E8E2D6` as the primary visual anchor for each section. Renders crisp even when photos are muted.

4. **Arrow-glyph inline CTAs** — "Read the April guide →" rather than buttons. `↗` for external, `→` for on-site. Underline with 1-2px offset in a muted accent color.

5. **Sidebar pull-quote** — 25–36px Fraunces italic, 4px vermillion left rule, ~40px vertical padding. Breaks the rhythm between sections.

6. **Photo credit + dateline metadata** — 9–11px tracked small-caps caption below every hero: `Photograph · Barot Valley, Himachal Pradesh · April 2026`. This single move separates "newsletter" from "marketing."

7. **Two-column card grid for secondary items** — 260×180 images, 14–22px italic serif title, 10px tracked small-caps meta. 20px gutter between cards.

8. **Closing ritual section** — same-named block every week ("From the Notebook", "Window Seat", "Station of the Week"). Creates reader anticipation.

9. **Minimalist masthead with issue number** — wordmark centered, hairline rule, `ISSUE 16 · 19 APRIL 2026 · THE WINDOW`. No nav bar — email is not a website.

10. **Desaturated hero images** — 85% saturation, subtle 8–10% inner vignette so edges blend into `#0B0B0C` canvas. Photography forward, but muted so type stays king.

11. **Footer as editorial colophon** — "The Window is published weekly by NakshIQ. Edited by Ashish Taneja. Written in Canberra." Small-caps text links, no social icons.

12. **Double hairline rule above sections** — two stacked 1px `<table>` rows with a 4px gap. Works in Outlook, unlike CSS `hr` with margins.

**Patterns that survive Outlook + Gmail:**
- Dashed dividers via `border-top: 1px dashed #3A3A3C` on a table cell (not CSS `hr`)
- Asymmetric left gutter (28px hero / 40px body) for Kinfolk-style rhythm
- Drop-cap opening via nested table + larger-font initial character (NOT CSS `:first-letter` — Outlook strips pseudo-elements)

---

## 6. Click-through URL template (mandatory UTM conventions)

Every link, every image wrapper, every CTA. No exceptions.

```
/en/where-to-go/{monthSlug}          ← primary CTA · landing bento
/en/destination/{id}                 ← destination detail (evergreen)
/en/destination/{id}/{monthSlug}     ← destination-month detail (preferred — more context)
/en/collection/{slug}                ← curated collections (use sparingly)
/en/the-window/{issueSlug}           ← this issue's web archive
```

UTM template (append to every link):
```
?utm_source=newsletter&utm_medium=email&utm_campaign=weekly-{year}-{month}-w{week}&utm_content={slot}
```

`{slot}` examples: `hero`, `pick-01-image`, `pick-01-name`, `pick-01-cta`, `skip-trap`, `skip-alt`, `road`, `secondary-2`, `cta-hero`, `masthead`, `open-on-web`.

**Top-right "↗ Open on web" micro-link**: include at the very top of every newsletter — gives a guaranteed click path when email content gets clipped by Gmail.

**Image click pattern (locked code):**
```html
<a href="{URL}?utm_source=newsletter&utm_medium=email&utm_campaign={slug}&utm_content={slot}"
   style="display:block; text-decoration:none; color:#E7E4DE;"
   target="_blank" rel="noopener">
  <img src="{CDN_URL}"
       width="552" height="368"
       alt="Descriptive alt that doubles as a clickable headline if images are blocked"
       style="display:block; width:100%; max-width:552px; height:auto; border:0; outline:none; text-decoration:none;"
       loading="lazy" />
</a>
```

---

## 7. The four format archetypes

Pick ONE archetype per mockup. Each is a different editorial strategy, not a color variation.

**A. The Spread** (Condé Nast Traveler + Afar DNA)
Visual drama. One full-bleed hero, one editorial pull-quote, a 2-col secondary row with 2 picks, supporting blocks (skip, road), and the remaining 2 picks as a teased pair. Best for readers who want one clear recommendation + supporting context.

**B. The Index** (Monocle Weekly + Dense Discovery DNA)
Ruthlessly scannable. 64–96px numbered picks, each with its own image, caption, and individual CTA. 5 exit points to web. Between picks, thin dashed dividers. Closing ritual block with skip + road + changes compressed. Best for click-through.

**C. The Letter** (Airmail + Cereal DNA)
Long-form, signed, first-person. Editor's letter with mid-piece pull-quote, inline destination links woven into prose, one photo interlude. Bottom 4-up thumbnail strip keeps alignment contract. Best for loyalty + perceived premium.

**D. Picture Postcards** (Cereal + Kinfolk DNA)
Mood board. 5 full-bleed postcard tiles stacked, each with minimal overlay text and one editorial line below. Skip / road / changes compressed to a 3-line footer ticker. Maximum photo, minimum friction. Best for forwarding + inspiration.

---

## 8. Output spec (what the AI must produce)

A **single self-contained HTML file** that:

- Starts with `<!doctype html>`, contains `<html lang="en">` + `<head>` + `<body>`.
- Includes `color-scheme` + `supported-color-schemes` meta tags.
- Uses inline CSS only (no external stylesheets EXCEPT the Google Fonts `<link>`).
- Wraps all layout in nested `<table role="presentation" cellpadding="0" cellspacing="0" border="0">`.
- Body content max-width 600px, centered on a `#060606` or similar outer canvas.
- Uses the exact palette hex values above, not close approximations.
- Uses the Fraunces/Geist fallback stacks, not Fraunces/Geist alone.
- Renders the five real destination images from R2 (URLs in the sample data).
- Every image wrapped in `<a>` with UTM-tagged href.
- Every destination name linked.
- Includes signed dateline, editorial content, issue number + date, colophon footer, unsubscribe link.
- No external JS, no SVG, no CSS Grid, no Flexbox.
- Under 500KB total HTML size (exclude image bytes).

Additionally: produce at the top of the file, **as a short HTML comment**, a 3-line explanation of which editorial moves (from the 12 above) you used and why. Helps downstream review.

---

## 9. Deliverable checklist (the AI self-verifies before returning)

- [ ] Opens with `<!doctype html>` + `color-scheme` meta tags.
- [ ] Max body width 600px.
- [ ] Background `#0B0B0C` or `#141416`, never `#000000`.
- [ ] All text `#E7E4DE` or lighter muted values, never pure `#FFFFFF`.
- [ ] Uses inline styles, not just a `<style>` block.
- [ ] Uses `<table>` layout, not grid/flex.
- [ ] All 5 pick IDs appear as clickable elements somewhere.
- [ ] Every `<img>` has explicit `width` + `height` attrs + descriptive alt.
- [ ] Every `<a>` has a UTM-tagged href.
- [ ] Contains signed dateline (city + date + editor).
- [ ] Contains `→` or `↗` arrow glyph CTAs — not emoji arrows.
- [ ] Contains colophon footer with Archive / Visit / Unsubscribe links.
- [ ] Fraunces/Geist fallback stacks used consistently.
- [ ] Vermillion, emerald, saffron accents used with restraint (≤3 of each per email).
- [ ] No banned words (hidden gem, must-visit, magical, etc.) anywhere.

---

## 10. Reference — the four completed previews

For shape-of-solution reference, see these four reference mockups (same data as the content model above):

- [The Spread](./newsletter-magazine.html) — visual drama, one hero + supporting picks
- [The Index](./newsletter-the-index.html) — numbered scannable, 5 exit points
- [The Letter](./newsletter-letter.html) — long-form signed editorial
- [Picture Postcards](./newsletter-postcards.html) — mood board, minimal text

These are the baseline — your submission should propose an editorial strategy distinct from these four, or execute one of them more strongly than the reference.

---

*This brief is authoritative. If anything in your output contradicts a numbered rule above, the rule wins.*
