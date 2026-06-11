# Destination Page — Localhost vs Production Audit & Fix Spec

**Date:** 2026-05-06
**Pages compared:** `localhost:3000/en/destination/manali` vs `nakshiq.com/en/destination/manali`
**Goal:** Get the new editorial design to a "100% sexy, viral, magazine-style editorial travel intelligence" bar without losing the conversion mechanics production already has.

The new layout is a massive aesthetic upgrade — full-bleed cinematic hero, "DISPATCH · ISSUE Nº 47", roman-numeral chapters, sticky right-rail TOC with editorial vocabulary (VERDICT / FIELD BRIEF / ATLAS / CODA / VOICE), pull quotes with ledger bars, the 12-month 0–10 grid, the strikethrough "Everyone goes to ~~Manali~~" hook, the closing "Go with confidence." bookend. That work is keeper-grade.

The deltas below are what's missing or weak.

---

## PART 1 — Features missing from localhost that production has (must port over)

### 1.1 Above-the-fold utility row (CRITICAL — conversion impact)
Production has a sticky/visible row above the hero with: **Compare · Share · Copy link · Share on WhatsApp · Saved (♥)**.

Localhost has the WhatsApp / Share / Copy link buttons rendered, but they're buried at DOM Y ≈ 21,085 of a 23,702-px-tall page — that's inside section **"XI · THE CODA"**, basically invisible. By the time a reader reaches them, the share intent has already cooled.

**Fix:**
- Surface a compact share/save bar near the top of the page (right-aligned, just under the breadcrumb or floated in the top-right of the hero).
- Keep it ultra-minimal in the editorial design: small icons, no chunky pill-buttons. Think NYT-style icon strip, not Bootstrap social buttons.
- Sticky on scroll on desktop, collapsible on mobile.
- Order: ♥ Save · Share · WhatsApp · Copy link · Compare.
- The Coda-level WhatsApp callout can stay (as a "share this issue" closer), but it cannot be the first place a reader sees it.

### 1.2 Breadcrumb (Explore → Himachal Pradesh → Manali)
Production has it, localhost is missing it. Breadcrumbs are SEO-positive and orient first-time visitors.

**Fix:**
- Render a tiny breadcrumb above the hero, set in tracking-wide all-caps coral or muted cream, e.g. `EXPLORE / HIMACHAL PRADESH / MANALI`. Editorial, not generic.

### 1.3 Live alerts banner (road-blocked, advisories)
Production shows a coral "Road blocked: Manali to Rohtang Pass (old road)" alert with timestamp/dismiss. This is high-utility, real-time data — the whole point of NakshIQ is "go with confidence" so live blockers should be loud.

**Fix:**
- Render real-time advisories as a thin horizontal coral band immediately under the hero label row (above or just under the destination name).
- Use a subtle siren glyph + "ALERT · {short headline}" + expandable detail.
- Multiple alerts → carousel or stack, max 2 visible.
- Pull from same data source production uses.

### 1.4 Persistent "Plan My Trip · AI" CTA
Production has a permanent dark pill bottom-right. That's the conversion driver — without it, the editorial layout has no "do something" moment.

**Fix:**
- Add a floating bottom-right "Plan with AI" pill, but redesign it to match the editorial aesthetic: small, no shadow, thin border, all-caps tracked label like `↗ PLAN THIS TRIP · AI`. Coral on cream, not white-on-black.
- Pair with the existing SOS button on the bottom-left.
- Hide on the closing "Go with confidence." card so the bookend feels final.

### 1.5 "At a glance" sticky reference panel
Production's "MAY AT A GLANCE" floating card (WAIT 3/5, Doable, Kids: Family-friendly, Solo female: With care, Crowd: Peak, with Build route / Ask AI / vs Sissu buttons) is intrusive but functionally useful — readers can always see the verdict.

**Fix (compromise):**
- Don't replicate as a permanent floating card — that ruins the cinematic flow.
- Instead, add a tiny sticky strip that appears only after the user scrolls past the hero: a single line at the bottom edge of the viewport: `WAIT · 3/5 · MAY · MANALI` with three inline ghost links: `Build route · Ask AI · vs Sissu`.
- Hide on hover-away, show on scroll. Or auto-hide after 8s.

### 1.6 Section-by-section data callouts production has
Production exposes more granular data inline that localhost hides behind chapter prose. Specifically:
- **Compact 5-cell scorecard** (Kids · Solo F · Crowd · Cost · Effort) under the verdict
- **Off-season vs Peak price strip** (₹500-1500/night · Peak ₹2000-6000)
- **Stay-type chips** (Homestay · Guesthouse · Hotel · Hostel · Campsite)
- **Crowd timeline bar** (12-month J F M A M J J A S O N D color strip)
- **Best for {persona}** mini-cards (Best for families / backpackers / peace & quiet / Think twice)
- **Day-cost cards** (Budget ₹1,100 · Mid-range ₹3,600 · Luxury ₹10,000 with line-items)

**Fix:**
- Audit which of these are already in the editorial layout and which are missing.
- Where missing, integrate them inside the existing chapters as "data sidebars" — small typeset boxes with a coral chapter rule, not full-width dashboard cards. Editorial doesn't mean data-light.

### 1.7 Reviews & Q&A inline previews (localhost only shows submission forms)
Production has visible existing reviews + Q&A entries. Localhost goes straight to "Share your experience" / "Ask a question" forms without showing what others have already said.

**Fix:**
- Above each form, show the 3 most recent published reviews / Q&A items, each as a typeset blockquote with byline (anonymous OK). "VOICE · Field reports" chapter could be the home for this.
- Star-rating distribution sparkline (e.g. "4.2 average from 47 travelers — 1★ 1, 2★ 3, 3★ 7, 4★ 14, 5★ 22").

### 1.8 Cross-link "vs {neighbor}" comparison
Production's panel exposes "vs Sissu" — comparison is a high-engagement pattern (`Manali vs Sissu`, `Manali vs Kasol`, etc.).

**Fix:**
- Add a dedicated chapter or chapter-end card: `IX · THE COMPARE · How Manali stacks against neighbours` — 3 small comparison cards (Sissu, Kasol, Old Manali area) with one-line verdicts.

### 1.9 Methodology / "How we score" link
Production exposes "HOW WE SCORE →" near the verdict cards. Critical trust signal.

**Fix:**
- Surface this in the editorial layout under the 0–10 grid. Small coral link: `Read our scoring methodology →`. Adds editorial integrity.

### 1.10 "Reviewed" / verification timestamp
Production shows "REVIEWED 2026-04" near the verdict. Localhost has it only in the closing card ("VERIFIED APR 2026"). Should appear earlier.

**Fix:**
- Render `VERIFIED APR 2026 · ISSUE Nº 47` directly under the hero name as a quiet kicker line. Helps trust + SEO.

---

## PART 2 — Enhancements to push localhost to "100% sexy viral magazine"

### 2.1 Hero & first-impression polish

**2.1.1 Kill the onboarding modal on first load.**
The "Who's traveling? Step 1 of 3" dialog blocks the page before the hero can sell itself. Defer it: trigger on scroll past 40% OR after 30s OR on intent-to-leave; never on initial render. Or move to a slim drawer that slides up from bottom-right after the user has seen the hero.

**2.1.2 Hero motion / parallax.**
Photo currently sits flat. Add a subtle 3% parallax on the hero photo so the snow line drifts as the user scrolls — think NYT scroll-driven longform.

**2.1.3 Rotating hero photos (Ken Burns).**
3–5 photos for each destination, slow auto-cross-fade with subtle Ken Burns zoom. Photo credit byline in bottom-right of the photo (`PHOTO · {credit}`). Pulls in the IG-aesthetic crowd.

**2.1.4 Score reveal animation.**
The "6.0 / DOABLE · MAY" big number could count up from 0 on viewport entry. Tiny detail, makes the page feel alive.

**2.1.5 Hero overlay strip.**
At the bottom of the hero photo, run a thin tracking-wide marquee of live data: `LIVE · 11°C · BROKEN CLOUDS · WIND 11 KM/H · AQI 42 · CROWDS PEAK · UPDATED 2 HRS AGO`. This is both gorgeous AND high-utility.

### 2.2 Typography & rhythm

**2.2.1 Drop caps on chapter openers.**
Each roman-numeral chapter (II · THE VERDICT, III · THE WINDOW…) starts with a drop-cap on the first paragraph. Pure Esquire/Atlantic energy.

**2.2.2 Variable font weights for emphasis.**
Use the CrimsonPro variable axis to shift weights mid-sentence for editorial emphasis instead of bold/italic. Subtle but premium.

**2.2.3 Smart hyphenation + widow control.**
`hyphens: auto` + `text-wrap: pretty` (Chrome supports it now). No widow words on chapter titles.

**2.2.4 Hairline rules between sections.**
Right now chapters separate by whitespace + chapter number. Add ultra-thin coral rules (1px or 0.5px on retina) that span 30% width, centered, between major sections. Magazine plate-rule energy.

**2.2.5 Chapter dot ornament.**
The little coral dot before each `II · THE VERDICT` is great but could be replaced per chapter with a thematic glyph (compass for ATLAS, ledger for COST, etc.). Sets it apart from every Notion-clone travel site.

### 2.3 The 12-month grid (currently great, can be greater)

**2.3.1 Hover/tap → tooltip with the month verdict.**
Right now the grid is informational-only. Hover a cell → small typeset card: `MAY · 6.0/10 · "Peak crowds, prices double, road still chaos but not landslides yet."` with a "READ THE FULL MAY READ →" link.

**2.3.2 Annotations layer.**
Tiny marginalia next to specific cells: a `↑` tag pointing to MAY saying `WHERE YOU ARE`, a `★` next to OCT/SEP saying `BEST WINDOW`, a `⚠` next to JUL/AUG saying `MONSOON LANDSLIDE RISK`. Magazine annotation style.

**2.3.3 Score × event histogram below the grid.**
A horizontal timeline strip showing festivals, road closures, weather windows: e.g. coral bar JUL–AUG `MONSOON · ROAD RISK`, green bar SEP–OCT `KULLU DUSSEHRA`, pink bar APR `APPLE BLOSSOM`. One row, very thin.

### 2.4 Editorial copy enhancements

**2.4.1 Pull-quote variations.**
The current pull-quote ("The Goa of the mountains…") is a banger. Add one per chapter — short, opinionated, in italic serif with a coral ledger bar on the left. Don't put them all at the top of the chapter; vary placement (left margin, mid-flow, full-width separator).

**2.4.2 Margin notes / footnotes.**
Editorial marginalia in the right margin (or below paragraphs on mobile) for asides: `[¹] Mall Road specifically; Old Manali is fine.` Sets the page apart from every other travel site.

**2.4.3 "Field notes" voice.**
The Field Brief chapter currently reads like prose. Punch it up with dated journal entries: `2026-04-18 · Mall Road, 7pm. Counted 47 cars in 200m. Two near-misses with kids on the kerb.` Reads like Anthony Bourdain field notes.

**2.4.4 Inline quote attribution from locals.**
Sprinkle `— Tashi, runs the chai shack at Hadimba` style attributions after specific claims. Builds authority + visual rhythm.

### 2.5 Interactive / data-viz enhancements

**2.5.1 Animated scroll-in for chapter dividers.**
When a chapter rule scrolls into view, the coral dot pulses once and the line draws in left-to-right. Half a second, no more. Pure delight.

**2.5.2 Sticky chapter indicator on the left rail.**
Right-rail TOC is great. Add a slim left rail with just the current roman numeral (II, III, IV…) so the reader always knows what chapter they're in. Disappears at top and bottom.

**2.5.3 Reading progress.**
Thin coral line at the very top edge of the page, fills as the reader scrolls. Magazine longform standard.

**2.5.4 "Estimated read time" + skim mode.**
Below the hero: `12 MIN READ · OR SKIP TO THE VERDICT ↓`. Click → smooth-scroll to chapter II. Respects busy readers.

**2.5.5 The Atlas chapter → real interactive map.**
The current map is a static-looking leaflet. Make it a Mapbox or D3 piece with: pulse animations on key POIs, hover → photo + verdict, draw-mode for "things within 3hrs" radius, a toggle for crowd density / road conditions / festival overlays. This alone is shareable on Twitter.

**2.5.6 Cost-of-day comparator slider.**
"What a day actually costs" could be a slider: drag traveler-type (Backpacker / Mid-range / Family of 4 / Couple-luxury) → live updates the line items. Tiny but addictive.

### 2.6 Voice & sharing virality

**2.6.1 Quote-share on text selection.**
Highlight any sentence → small coral popover: `Share this line ↗`. Renders an OG-image with the quoted line in serif over a Manali photo, branded `NAKSHIQ · MANALI`. WhatsApp + X + IG Stories share.

**2.6.2 "Issue Nº 47" download as PDF.**
Add a tiny button: `↓ DOWNLOAD ISSUE Nº 47 · 8 PAGES` — generates a beautifully laid out magazine-style PDF of the destination. Travelers offline-save it. Massive shareability.

**2.6.3 IG-Stories generator.**
"Create a story from this issue" → preset of 5 vertical 9:16 cards (verdict, 12-month, costs, top 3 places, editor pick) ready to download/share.

**2.6.4 OG / Twitter card.**
The OG image should mirror the hero composition: photo + huge serif "Manali." with a coral period + score badge. Right now it's probably a generic stock card. This single fix changes share CTR dramatically.

### 2.7 The closing "Coda" — keep but power up

The current closer (`Manali. / ISSUE Nº 47 · VERIFIED APR 2026 / Go with confidence.`) is *gorgeous* and is currently the best moment on the page. Keep it. Add:

- The buried share/WhatsApp row should sit *just before* this Coda, not inside or after it. So the sequence is: end of "Voice" chapter → editorial share row → quiet whitespace → the Coda card.
- A tiny editor signature: `— THE NAKSHIQ EDITORS · APRIL 2026` under "Go with confidence."
- A "next issue" teaser: `NEXT ISSUE · KASOL · DROPS 2026-05-13` linking to a related destination.
- A tiny "What changed in this issue" toggle revealing the changelog (`+ Updated road status 2026-04-29 · + New stay added: Snow Valley Resort`).

### 2.8 Mobile-specific polish

**2.8.1 Hero hierarchy on mobile.**
The "DISPATCH · ISSUE Nº 47" line and the "6.0 / DOABLE · MAY" score badge both fight for attention on mobile. Stack them: kicker row → photo → name → score badge as a single inline strip below name.

**2.8.2 Sticky bottom action bar (mobile only).**
Replace the desktop floating Plan-My-Trip pill with a thin three-button strip pinned to the bottom edge: `↗ Plan AI · ♥ Save · WhatsApp`. Standard mobile pattern, doesn't break the editorial feel.

**2.8.3 Larger-tap chapter TOC.**
Right-rail TOC on desktop should become a swipeable horizontal pill row at the top of the page on mobile, sticky, scroll-to-section on tap.

### 2.9 Performance & technical polish

**2.9.1 Image priorities.**
The hero photo should be `priority` + `fetchpriority="high"` + AVIF/WebP. Below-fold photos lazy.

**2.9.2 Font preload.**
CrimsonPro Italic 700 needs to be preloaded — the destination name flashes from sans on first load.

**2.9.3 Kill the "Compiling" pill before deploy.**
Dev artifact, currently visible on localhost.

**2.9.4 View-transitions.**
Use Next.js 16's view-transitions API on month-card → month-detail navigation. Cinematic page-to-page feel.

---

## PART 3 — Quick-fix checklist (ordered by impact)

| # | Fix | Impact | Effort |
|---|---|---|---|
| 1 | Move share/WhatsApp/Save row from Coda (Y=21k) to under hero | 🔴 Critical | S |
| 2 | Defer onboarding modal (don't block first paint) | 🔴 Critical | S |
| 3 | Add breadcrumb above hero | 🟠 High | XS |
| 4 | Surface live "Road blocked" alert near top | 🟠 High | S |
| 5 | Add persistent Plan-AI CTA (editorial style) | 🟠 High | S |
| 6 | OG image — match hero composition | 🟠 High | S |
| 7 | Mini "verdict at a glance" sticky strip on scroll | 🟡 Medium | M |
| 8 | Reading-progress thin line + chapter indicator left rail | 🟡 Medium | S |
| 9 | Hero photo carousel + Ken Burns | 🟡 Medium | M |
| 10 | 12-month cell hover tooltips | 🟡 Medium | S |
| 11 | Quote-share popover on text selection | 🟢 Polish | M |
| 12 | Issue PDF download | 🟢 Polish | L |
| 13 | IG Stories pack generator | 🟢 Polish | L |
| 14 | Atlas → real interactive map | 🟢 Polish | L |
| 15 | Drop caps + hairline section rules + variable-weight emphasis | 🟢 Polish | S |
| 16 | Annotations / margin notes / dated field-note style | 🟢 Polish | M |
| 17 | "vs neighbour" comparison cards | 🟢 Polish | M |
| 18 | "Reviewed" + "How we score" trust signals near verdict | 🟢 Polish | XS |
| 19 | Inline reviews/Q&A above submission forms | 🟢 Polish | M |
| 20 | Mobile bottom action bar + horizontal TOC pills | 🟢 Polish | M |

---

## PART 4 — Notes for Claude Code

- **Don't refactor the editorial design.** Localhost's chapter system, typography, sticky right-rail TOC, hero composition, closing Coda card — all keep. Additions slot inside the existing structure.
- **Never use the cinematic-rollout branch** (per existing repo memory). Land changes on `main`.
- **Keep all data real and verifiable** (per `CLAUDE.md` data conventions). No fabricated reviews or stats in any of the polish features above.
- **Verify each addition against `apps/web/AGENTS.md`** voice rules before shipping.
- **Force-deploy to Vercel after each push** (per `CLAUDE.md` deployment rule).
- For new components, follow the flat `apps/web/src/components/` convention — one file per component, no nested folders.
- All copy strings should land in both `apps/web/src/messages/en.json` and `hi.json`.

End of spec.
