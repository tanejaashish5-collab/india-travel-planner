# NAKSHIQ — MASTER PLAYBOOK

**One document. Every decision. Every action.**

Version 1.0 · April 10, 2026
Prepared for Ashish Taneja · Impresa de Artiste Pty Ltd

---

## How to use this document

This playbook replaces all previous strategy documents. It reconciles two independent analyses of Nakshiq into a single source of truth. When this document and a previous plan disagree, this document wins.

**Structure:**
- Part 1 — What Nakshiq is (locked decisions)
- Part 2 — Where we are today (current state audit)
- Part 3 — Who we're competing against (competitive landscape)
- Part 4 — How we make money (monetization)
- Part 5 — How we grow (marketing + SEO)
- Part 6 — What to build (product roadmap)
- Part 7 — The 90-day execution plan (week by week)
- Part 8 — Metrics dashboard
- Part 9 — Decisions deferred (don't think about these yet)

---

## PART 1 — WHAT NAKSHIQ IS

### 1.1 The product in one sentence

Nakshiq is an editorial travel intelligence platform that scores Indian destinations month-by-month so travelers can decide where to go, when, and whether it's safe for their family — with the methodology published and no paid placements.

### 1.2 The brand (locked — do not change)

- **Name:** Nakshiq (pronounced NAK-shik)
- **Wordmark:** `Naksh.iq` in Crimson Pro italic, vermillion baseline dot
- **Tagline:** TRAVEL WITH IQ
- **Brand closing:** Go with confidence.
- **App icon:** Crimson Pro italic uppercase `N.` with vermillion dot on Ink Deep (#161614)
- **Layout rule:** Traditional v3 = wordmark + dot + hairline-flanked tagline + breathing room. Nothing else unless explicitly approved.
- **Voice:** Declarative, first-person plural, 70% natural / 30% editorial. No hidden gems, no breathtaking, no must-visit, no bucket list, no curated, no elevated.
- **Sacred rule:** No paid placements. No sponsored content. No tourism board promotion packages. Ever. This is the brand's trust mechanism and the single most important strategic decision we've made.

### 1.3 The positioning

Nakshiq answers the four questions nobody else in Indian travel owns:

1. Is this destination worth visiting?
2. When specifically should I go (which month)?
3. Is it safe (roads, weather, medical, infrastructure)?
4. Can my family handle it (kids, elderly, altitude)?

Competitors own questions 5 (where to stay) and 6 (how to book). We don't compete there — we route users to booking platforms via affiliate links.

**The one-line pitch:** "Stop cross-referencing five websites. Nakshiq tells you whether to go, when to go, whether it's safe, and whether your kids will survive — all in one place."

### 1.4 Target audiences (5 segments)

| Segment | Profile | What they need from Nakshiq |
|---|---|---|
| Weekend Warriors | Urban 25-35, Delhi/Mumbai/Bangalore | Quick getaway planning, 3-day routes, seasonal scores |
| Family Planners | Parents 30-45, kids under 12 | Safe kid-friendly destinations, infrastructure data, hospital distance |
| Adventure Seekers | Solo/group 20-35, trek-curious | Trek info, road conditions, permit requirements |
| Solo Female Travelers | Women 22-35, safety-conscious | Safety collections, vetted destinations, honest reviews |
| International Travelers | The Lonely Planet successor audience | Cultural context, safety reassurance, month-by-month planning |

---

## PART 2 — WHERE WE ARE TODAY

### 2.1 What's live on nakshiq.com (as of April 10, 2026)

- 133 destinations on the explore page (homepage says 143, About says 105 — data sync bug, see 2.3)
- 398+ places, 168 festivals, 43 tourist traps exposed, 20 collections, 19 routes, 25+ treks
- Monthly suitability scores (0-5) for every destination for every month
- Kids ratings with infrastructure-aware methodology
- Vehicle suitability (SUV vs hatchback), family difficulty notes, elevation data
- AI trip planner (basic — origin + date)
- Bilingual English/Hindi
- Regional navigation: HP, Uttarakhand, J&K, Ladakh, Rajasthan, Northeast, UP
- Blog (limited — appears to have few articles)
- Non-affiliate booking links to MakeMyTrip, Booking.com, Google Hotels labelled "Not sponsored"
- Destination-month URLs already exist in sitemap (e.g., `/destination/agra/january`)

### 2.2 What's been set up (today)

- ✅ Google Search Console verified (April 10, 2026)
- ✅ Sitemap submitted — 4,010 URLs discovered, status: Success
- ✅ robots.txt exists and is correctly configured
- ✅ Brand identity fully locked (wordmark, icon, colors, typography, social assets)
- ✅ Social avatars and covers built for Instagram, X, Facebook, YouTube, LinkedIn
- ✅ YouTube banner sized for 1546×423 safe area
- ⏳ Booking.com + Agoda affiliate applications submitted (awaiting approval)

### 2.3 Known bugs and issues (Priority 0 — fix before any growth push)

| # | Issue | Impact | Fix |
|---|---|---|---|
| P0.1 | Stats inconsistency: homepage says 143 destinations, explore says 133, About says 105 | Google sees unreliable data; users see carelessness | Centralize all counts in one database query, no hardcoded numbers |
| P0.2 | Destination page rendering bug: bottom 60% of content may be invisible (CSS/animation issue) | The deepest, most differentiated content is hidden from users and Google | Debug CSS/JS rendering; verify all sections load without scroll-triggered animation failures |
| P0.3 | Collections page: only 1 of 20 collections reportedly loads | 19 collection pages return no content | Debug Supabase query or component rendering |
| P0.4 | 503 server errors on RSC prefetch (930 network requests on page load) | Server overload, poor Core Web Vitals, potential crawl failures | Implement viewport-based prefetching, add caching layer, rate-limit prefetch |
| P0.5 | Duplicate destination URLs: `/chopta`, `/chopta-tungnath`, `/tungnath` as separate pages | Link equity split, duplicate content penalty risk | Merge into canonical URLs, 301-redirect duplicates |
| P0.6 | Booking links have no affiliate tags | Revenue leak on every booking click | Update template with affiliate IDs once approved (1-day task) |
| P0.7 | Missing legal pages: Terms of Service, Privacy Policy, Cookie Policy | Trust and compliance gap | Write and publish (can use standard templates) |
| P0.8 | Hindi translation incomplete — half-translated is worse than English-only | Confuses users and dilutes content quality signal | Either complete full i18n or hide the toggle until complete |
| P0.9 | Treks count mismatch (25 vs 49 across pages) | Same category as P0.1 — inconsistent data | Centralize with P0.1 fix |
| P0.10 | Meta tag issues: duplicate "NakshIQ" in page titles | Wastes title tag character space, looks unprofessional | Fix title tag template |

### 2.4 SEO baseline (to be verified in 3-5 days via GSC)

| Metric | Expected baseline | Target by day 90 | Target by day 365 |
|---|---|---|---|
| Monthly organic clicks | Near zero | 5,000 | 50,000+ |
| Monthly organic impressions | Unknown | 100,000 | 1,000,000+ |
| Keywords ranking | Unknown | 500 | 5,000+ |
| Indexed pages | Unknown (4,010 discovered) | 2,000+ | 4,000+ |
| Referring domains | Likely <20 | 50 | 200+ |

---

## PART 3 — COMPETITIVE LANDSCAPE

### 3.1 The four tiers

**Tier 1 — Transactional Giants (own booking, not planning)**

| Competitor | Monthly visits | Model | Nakshiq relationship |
|---|---|---|---|
| MakeMyTrip (+Goibibo) | 36M | OTA, 60%+ market share, $9.8B FY2025 bookings | Not a competitor — they're our affiliate partner. We're upstream of them. IMPORTANT: active trust crisis (Morpheus Research March 2026 allegations of hotel price manipulation). |
| Booking.com / Agoda | 60% of Google Hotels sponsored results in India | Global booking platform | Affiliate partner for international travelers |

**Tier 2 — Content Giants (the actual competitive set)**

| Competitor | Monthly visits | Model | Key weakness Nakshiq exploits |
|---|---|---|---|
| Holidify | 5.5M | SEO-driven destination guides, 76% organic | Shallow content, no monthly scoring, no infrastructure data, generic prose. MOST DIRECT competitor. |
| Tripoto | 2-3M | User-generated trip stories | Variable quality, no structured data, compromised by own package sales |
| Thrillophilia | 2.6M | Adventure packages + blog, 2M Instagram followers | Reviews show poor post-booking support ("they only care until you book"). Package-sales bias. |
| Lonely Planet | Legacy brand, declining | Guidebooks + web | Stale listings (18-month update cycle), aging audience, travelers openly asking "is there an alternative?" — HUGE opportunity for Nakshiq as the successor for international travelers. |

**Tier 3 — Community trust layer (partner, don't compete)**

Reddit (r/IndiaTravel, r/Himachal, r/Uttarakhand), YouTube travel creators, IndiaMike.com

Strategy: become the most-recommended resource in these communities through genuine helpfulness, not self-promotion.

**Tier 4 — Experience sellers (future competitive set)**

WanderOn, JustWravel, TravelTriangle, Thomas Cook India, SOTC. All have the same incentive problem: their content pushes you toward their packages.

### 3.2 The moat — three layers

**Layer 1 (data):** 133+ destinations × 12 months × 6 dimensions = 10,000+ proprietary data points that cannot be scraped from elsewhere because they don't exist elsewhere.

**Layer 2 (editorial authority):** Every month of publishing adds to a compounding content library. Competitors starting today are 2+ years behind from day one.

**Layer 3 (trust brand):** The willingness to say "don't go" (Skip List, low scores, honest warnings) is the ultimate trust accelerator. Takes 3-5 years to fully compound. Once established, it's the most defensible layer.

### 3.3 The gap nobody owns

| Decision question | Who owns it today | Nakshiq opportunity |
|---|---|---|
| 1. Is this destination worth visiting? | Nobody (Holidify is shallow) | PRIMARY MOAT |
| 2. When specifically should I go? | Nobody (all competitors give season-level, not month-level) | PRIMARY MOAT |
| 3. Is it safe (roads, medical, infrastructure)? | Nobody | PRIMARY MOAT |
| 4. Can my family handle it? | Nobody | PRIMARY MOAT |
| 5. Where should I stay? | Booking.com, MakeMyTrip | Not our play (affiliate through) |
| 6. How do I book? | MakeMyTrip, Booking.com | Not our play (affiliate through) |

---

## PART 4 — HOW WE MAKE MONEY

### 4.1 The sacred rule

**No paid placements. No sponsored content. No tourism board promotion packages.** This is non-negotiable and it's the reason Nakshiq exists. Breaking this rule destroys the trust layer before it compounds. Don't take the short-term revenue.

### 4.2 Year 1 revenue streams (Path A — Purist)

| Stream | How it works | Revenue potential Y1 | Status |
|---|---|---|---|
| Booking affiliates | Booking.com (4-8% commission), Agoda (3-7%), MakeMyTrip (2-5%) on existing booking links | ₹6-10 lakh/year at 100K monthly visitors | Applied, awaiting approval |
| Paid newsletter | "The Window Premium" — ₹299/month or ₹2,499/year for premium editorial (Skip List deep dives, early access, monthly intelligence reports) | ₹2-5 lakh/year at 50K subscribers with 2% conversion | Not started — launch month 3-4 |
| Premium content products | "Nakshiq Field Notes" — ₹1,999 one-time digital guides for specific regions (Spiti, Ladakh, Northeast) | ₹2-4 lakh/year | Not started — launch month 6+ |

**Year 1 total realistic range: ₹10-20 lakh (~AUD 18-36K)**

This is modest and that's honest. Year 1 is about building the editorial moat, not maximizing revenue.

### 4.3 Year 2-3 revenue expansion (Path B — Hybrid)

| Stream | How it works | Revenue potential |
|---|---|---|
| Nakshiq Intelligence (B2B SaaS) | Data dashboard for hotels, tourism boards, operators — crowd intelligence, seasonal demand, infrastructure scoring. Priced ₹15K-5L/month per client. | ₹45 lakh - ₹4.5 crore/year at 50-500 clients |
| Nakshiq API | Developers and apps pay per API call for scoring data | ₹5-20 lakh/year |
| Curated marketplace (Year 3+) | Editorially-approved stays and experiences, 8-12% commission per booking | ₹20-200 crore/year at scale |

**Path B ceiling: ₹100-200 crore/year ARR → $200-400M acquisition valuation**
**Path C (marketplace) ceiling: ₹400-800 crore/year → $550M-$1.5B valuation (unicorn-eligible)**

### 4.4 What we explicitly reject

- ❌ Sponsored content or advertorials
- ❌ Tourism board promotion packages
- ❌ Paid placement in scores or recommendations
- ❌ Display advertising (degrades editorial experience)
- ❌ Feature-gating premium subscriptions (offline maps, GPS routes) — wrong model for an editorial brand; if we do subscriptions, they're content-based, not tool-based

### 4.5 Affiliate disclosure policy

Every booking link gets this disclosure:

> *We don't accept money to recommend destinations, hotels, or operators. We earn a small commission if you book through the link above — at no cost to you. This never affects our scores or recommendations. See our editorial policy.*

Write and publish a `/editorial-policy` page explaining the Chinese wall between editorial and affiliate revenue. This turns disclosure into a trust signal.

---

## PART 5 — HOW WE GROW

### 5.1 Channel allocation

| Channel | Effort allocation | Primary purpose | Y1 target |
|---|---|---|---|
| SEO (long-tail content) | 60% | Organic discovery via "[destination] in [month]" queries | 50,000 monthly organic visitors |
| Reddit / Quora | 15% | Trust-building via genuine community participation | Known as the default recommendation for India travel questions |
| YouTube | 10% | Trust + branded search via "Honest [Destination] Guide" series | 10,000 subscribers |
| Instagram | 10% | Visual discovery via Reality Check reels + seasonal content | 25,000 followers |
| Email newsletter | 5% | Retention + premium conversion via "The Window" weekly | 10,000 subscribers |

### 5.2 The SEO attack plan (the core growth engine)

#### The core insight

Every competitor writes "best time to visit Chopta: March to May" as generic prose. Nakshiq can publish dedicated pages for every destination × month with specific scores, data, and honest prose. Nobody else does this. It's the single biggest traffic opportunity in Indian travel content.

#### Campaign 1 — The destination-month assault (PRIORITY 1)

**What:** 240 pages covering top 20 destinations × 12 months each.
**URL structure:** `/en/destination/[name]/[month]`
**Note:** These URLs already exist in the sitemap (confirmed 4,010 discovered pages in GSC). The pages exist; the content needs to be enriched.

**Top 20 destinations to attack first (by search volume):**

1. Manali
2. Shimla
3. Nainital
4. Darjeeling
5. Ladakh / Leh
6. Mussoorie
7. Srinagar
8. Rishikesh
9. Gulmarg
10. Spiti Valley
11. Jaipur
12. Udaipur
13. Jaisalmer
14. Dharamshala
15. Kasol
16. Varanasi
17. Agra
18. Amritsar
19. Chopta
20. Tirthan Valley

**Writing batch schedule (solo founder, 4 pages/day, 5 days/week):**

| Week | Destinations (2 per week = 24 pages) |
|---|---|
| 1 | Chopta, Tirthan Valley |
| 2 | Manali, Shimla |
| 3 | Nainital, Mussoorie |
| 4 | Srinagar, Dharamshala |
| 5 | Kasol, Rishikesh |
| 6 | Darjeeling, Agra |
| 7 | Ladakh/Leh, Spiti Valley |
| 8 | Gulmarg, Jaipur |
| 9 | Udaipur, Jaisalmer |
| 10 | Varanasi, Amritsar |

**Traffic potential:** 60,000-200,000 monthly visits from this campaign alone after 6-month ranking window.

#### Campaign 2 — Seasonal intelligence pages

**What:** 84 pages — "Where to go in [month]" × 12 months + regional variants (6 regions × 12 months).
**URL structure:** `/en/where-to-go/[month]` and `/en/where-to-go/[region]-in-[month]`
**Traffic potential:** 30,000-100,000 monthly visits.

#### Campaign 3 — Skip List + comparison pages

**What:** ~60 pages — the Tourist Traps master list, top 10 individual trap deep dives, and top 10 head-to-head destination comparisons (Shimla vs Manali, Nainital vs Bhimtal, etc.).
**URL structure:** `/en/skip-list`, `/en/skip-list/[trap-slug]`, `/en/vs/[dest-1]-vs-[dest-2]`
**Traffic potential:** 15,000-50,000 monthly visits + high backlink generation.

#### Campaign 4 — Trust anchor content

**What:** ~50 pages — safety clusters ("/is-it-safe/kashmir"), family clusters ("/with-kids/ladakh"), permit guides.
**Traffic potential:** 10,000-40,000 monthly visits. Entry point for international travelers.

#### Total Wave 1: ~434 pages over 12 weeks

Expected traffic ceiling once ranked: 115,000-390,000 monthly visits.

### 5.3 Technical SEO requirements

#### Meta tags (every destination page)

```html
<title>{{name}} — {{region}} Travel Guide · When to Visit | Nakshiq</title>
<meta name="description" content="{{name}} scored {{score}}/5 for {{month}}. {{one_line}}. Monthly scores, kids ratings, road and safety data. No paid placements.">
<meta property="og:title" content="{{name}} — When to Visit | Nakshiq">
<meta property="og:description" content="{{month}}: {{score}}/5. {{one_line}}">
<meta property="og:image" content="{{hero_image_1200x630}}">
<meta property="og:url" content="https://www.nakshiq.com/en/destination/{{slug}}">
<meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="https://www.nakshiq.com/en/destination/{{slug}}">
<link rel="alternate" hreflang="en" href="https://www.nakshiq.com/en/destination/{{slug}}">
<link rel="alternate" hreflang="hi" href="https://www.nakshiq.com/hi/destination/{{slug}}">
```

#### Schema.org structured data (every destination page)

Add JSON-LD in `<head>` for:
- `TouristDestination` — name, description, geo coordinates, region, attractions
- `BreadcrumbList` — Home → Destinations → [Region] → [Destination]
- `FAQPage` — "Best time to visit?", "Is it safe for families?", "How to reach?", "What altitude?", "Do I need a permit?"
- `Article` — on destination-month pages (headline, author, publisher, dates)
- `Organization` — on homepage only (name, logo, social links, founding date)

Full copy-paste schema specifications are in the SEO Attack Plan document (Section 5). Hand these to your developer.

#### Internal linking architecture

Every destination page must link to:
- Its region page
- All 12 of its month pages
- Every collection it appears in
- Every route that includes it
- 5-10 nearby destinations (by geographic proximity)
- 5-10 related destinations (by category tags)
- The methodology page (from every score)
- The Skip List

Target: 30-50 internal links per page.

#### Core Web Vitals targets

- LCP (Largest Contentful Paint): < 2.5 seconds
- FID (First Input Delay): < 100 milliseconds
- CLS (Cumulative Layout Shift): < 0.1
- Network requests on page load: < 100 (currently reportedly 930 — critical fix)
- Image format: WebP/AVIF with responsive srcset
- Above-fold images: eager load (not lazy)

### 5.4 Content marketing calendar

| Cadence | Content type | Channel |
|---|---|---|
| Daily (Mon-Fri) | 4 destination-month pages published | Website (SEO) |
| Daily | 1 Instagram reel or post | Instagram |
| Daily | 5 Reddit/Quora answers (no self-promotion months 1-3) | Reddit, Quora |
| Weekly (Sunday) | "The Window" newsletter — where to go this week, seasonal picks | Email |
| Monthly | "Monthly Travel Report" — which destinations peaked, which to avoid, upcoming festivals | Blog + email + social |
| Quarterly | 1 viral contrarian piece ("We scored every destination in Himachal. Here's the one you should actually visit.") | Blog + Reddit + social |
| Evergreen | Destination comparisons, family guides, budget breakdowns, tourist trap expositions | Blog (SEO) |

### 5.5 Reddit trust-building protocol

**Months 1-3:** Answer 5 questions/day on r/IndiaTravel, r/india, r/Himachal, r/Uttarakhand, r/solotravel. Zero self-promotion. Zero Nakshiq links. Just be genuinely helpful. Build karma and post history.

**Months 4-6:** Start selectively linking to Nakshiq when (and only when) the link is genuinely the best answer to the question asked. Example: someone asks "is Kasol worth visiting in July?" and you link to the Kasol-in-July page because it's the most specific, data-backed answer available anywhere.

**Ongoing:** Never spam. Never promote. Never astroturf. Reddit trust takes months to build and seconds to destroy. This channel is the single most effective trust-builder for editorial brands — treat it with respect.

### 5.6 YouTube strategy

**Channel name:** Nakshiq
**Format:** "Honest [Destination] Guide" series — 10-15 minute deep dives using Nakshiq data as the backbone.
**Shorts:** 40-60 second "Score Check" format — one destination, one month, one score, the reason why. "Everyone says Manali in December. We gave it a 2/5. Here's why..."
**Pace:** 1 Short per week minimum, 1 long-form per month.
**Target:** 10K subscribers in 12 months.

### 5.7 Founder as content creator (Model A — years 1-2)

You appear on camera as "the person behind Nakshiq." Your personal travel content creates the trust layer for the brand. You are "Editor, Nakshiq" in your bio on every platform. Every personal travel reel can reference Nakshiq scores. You're the top-of-funnel.

**In years 3+:** Transition to Model B (silent operator). Hire an editor-in-chief, step back to chairman/founder role. Nakshiq scales independent of your identity. This is critical for exit preparation.

---

## PART 6 — WHAT TO BUILD (PRODUCT ROADMAP)

### Phase 1: Fix foundations (Weeks 1-4)

**Goal:** Make the existing product actually work end-to-end.

1. Fix destination page rendering bug (CSS/animation hiding bottom 60% of content)
2. Fix Collections page (19 of 20 not loading)
3. Resolve 503 server errors / reduce 930 network requests to <100
4. Fix stats inconsistency (centralize all counts in one data source)
5. Merge duplicate destination URLs, add canonical tags
6. Add legal pages (Terms of Service, Privacy Policy, Cookie Policy)
7. Fix Hindi translation (complete it or hide the toggle)
8. Fix meta tag issues (duplicate NakshIQ in titles, treks count mismatch)
9. Add affiliate tags to all booking links (once approved)
10. Write and publish `/editorial-policy` page

### Phase 2: SEO engine (Months 2-4)

**Goal:** Build organic discovery from zero to 50K monthly visitors.

1. Add OG tags + Twitter Card markup to all page templates
2. Add schema.org structured data (TouristDestination, FAQ, Breadcrumb, Article)
3. Fix heading hierarchy (H1 → H3 skip, missing H2s)
4. Optimize page titles and meta descriptions for target keywords
5. Enrich 240 destination-month pages with human-written prose (Wave 1)
6. Create 84 seasonal intelligence pages (Wave 2)
7. Build the Skip List landing page
8. Create 10 destination comparison pages
9. Build internal linking modules (nearby, related, collections, regional)
10. Launch blog with 2-3 articles/week

### Phase 3: Distribution + monetization (Months 4-8)

**Goal:** Generate first revenue and build audience.

1. Launch Instagram with "Reality Check" reel format
2. Launch YouTube with "Score Check" Shorts
3. Launch "The Window" weekly newsletter
4. Activate affiliate revenue tracking and optimization
5. Start Reddit/Quora trust-building (link phase)
6. Publish first viral contrarian piece
7. Partner with 5-10 regional YouTube creators
8. Launch "The Window Premium" paid newsletter tier
9. Reach out to 5 travel micro-influencers

### Phase 4: Platform + community (Months 8-14)

**Goal:** Build network effects and defensibility.

1. Add lightweight user reviews (star ratings + text) to destination pages
2. PWA optimization for mobile experience (not a native app yet)
3. AI trip planner v2 (budget input, style preferences, multi-destination routing)
4. Trip sharing and collaboration features
5. Notification system (peak season alerts, road condition changes, festival reminders)
6. Photo galleries (5-10 images per destination)
7. Prominent site-wide search bar
8. Sticky table of contents on destination pages
9. Comparison tool (side-by-side destination scoring)

### Phase 5: Scale (Months 14-24)

**Goal:** Category leadership.

1. Expand beyond North India (South, East, Central) — target 500+ destinations
2. Launch Nakshiq Intelligence B2B data dashboard
3. Launch Nakshiq API
4. Explore curated marketplace for editorially-approved stays
5. GPS + offline maps for treks (partner with OpenStreetMap)
6. Community events / curated group trips

### What we explicitly defer to year 2+

- ❌ Native mobile app (PWA first in Phase 4, native app only if PWA proves insufficient)
- ❌ Feature-gating subscription (if subscriptions, content-based only)
- ❌ Tourism board partnerships (never as paid promotion; potentially as B2B data licensing in year 2)
- ❌ Sponsored content (never)

---

## PART 7 — THE 90-DAY EXECUTION PLAN

### Week 1 (April 10-16): Foundation

| Day | Task | Time | Status |
|---|---|---|---|
| Thu Apr 10 | Verify GSC, submit sitemap | 30 min | ✅ Done |
| Thu Apr 10 | Apply for Booking.com + Agoda affiliate | 30 min | ✅ Done |
| Fri Apr 11 | Request indexing for 10 priority URLs in GSC | 15 min | ⬜ |
| Fri Apr 11 | Set up Google Analytics 4, link to GSC | 1 hour | ⬜ |
| Sat-Sun | File P0.1 (stats inconsistency) and P0.2 (rendering bug) as developer tasks | 30 min | ⬜ |
| Mon Apr 14 | Check GSC Performance tab for first data | 15 min | ⬜ |
| Mon Apr 14 | Begin writing Chopta × 12 months (first batch) | 3 hours | ⬜ |
| Tue Apr 15 | Continue writing: Tirthan Valley × 12 months | 3 hours | ⬜ |
| Wed Apr 16 | Review + publish first 24 destination-month pages | 2 hours | ⬜ |

### Week 2 (April 17-23): Content production begins

| Task | Time/week |
|---|---|
| Write Manali × 12 months + Shimla × 12 months | 6 hours |
| Review and publish 24 pages | 2 hours |
| Answer 5 Reddit/Quora questions per day (zero self-promotion) | 5 hours |
| Check GSC metrics + affiliate dashboard | 1 hour |
| File remaining P0 bug tickets to developer | 1 hour |

### Weeks 3-4 (April 24 — May 7): Content + bug fixes

| Task | Time/week |
|---|---|
| Write 2 destinations × 12 months per week (48 pages total) | 6 hours/week |
| Review and publish | 2 hours/week |
| Reddit/Quora daily | 5 hours/week |
| Developer ships P0.1, P0.2, P0.3 fixes | (developer time) |
| Add OG tags + schema markup to destination template | (developer time) |
| Write Terms of Service + Privacy Policy + Editorial Policy pages | 3 hours total |

### Weeks 5-8 (May 8 — June 4): Content + distribution launch

| Task | Time/week |
|---|---|
| Continue writing 24 pages/week (destination-month) | 6 hours/week |
| Launch Instagram: first 10 "Reality Check" reels | 5 hours first week, 2 hours/week after |
| Launch "The Window" newsletter (weekly, Sundays) | 2 hours/week |
| Build Skip List landing page | 4 hours (one-time) |
| Write first viral contrarian piece | 6 hours (one-time) |
| Continue Reddit/Quora daily | 5 hours/week |
| Check GSC + affiliate metrics weekly | 1 hour/week |

### Weeks 9-12 (June 5 — July 2): Amplification

| Task | Time/week |
|---|---|
| Finish top 20 destinations (240 pages total live) | 6 hours/week |
| Begin seasonal intelligence pages (Wave 2) | 3 hours/week |
| Write 10 destination comparison pages | 4 hours/week |
| Launch YouTube: first 3 "Score Check" Shorts | 3 hours first week |
| Reddit: begin selective Nakshiq linking (month 4 of trust-building) | 5 hours/week |
| Reach out to 5 travel micro-influencers | 3 hours (one-time) |
| First monthly metrics review | 2 hours (one-time) |

### Week 13: 90-day review

**Stop everything and measure:**
- How many organic clicks does GSC show?
- How many pages are indexed?
- What keywords are we ranking for?
- What's the newsletter subscriber count?
- What's the affiliate revenue to date?
- What's the Instagram follower count?
- Which content performed best? Which flopped?

**Then decide:** continue current pace, hire a content writer, adjust channel allocation, or pivot priorities based on what the data says.

---

## PART 8 — METRICS DASHBOARD

### Check weekly (every Tuesday morning)

| Metric | Source | Day 30 target | Day 90 target | Day 365 target |
|---|---|---|---|---|
| Organic clicks | GSC Performance | 500 | 5,000 | 50,000/month |
| Organic impressions | GSC Performance | 10,000 | 100,000 | 1,000,000/month |
| Keywords ranking | GSC Performance | 200 | 1,000 | 5,000+ |
| Pages indexed | GSC Coverage | 500 | 2,000 | 4,000+ |
| Referring domains | GSC Links | 10 | 50 | 200+ |
| Newsletter subscribers | Email platform | 200 | 2,000 | 10,000 |
| Instagram followers | Instagram | 500 | 5,000 | 25,000 |
| YouTube subscribers | YouTube Studio | — | 1,000 | 10,000 |
| Affiliate revenue (monthly) | Booking.com dashboard | ₹5K | ₹50K | ₹8 lakh |
| Paid newsletter MRR | Payment platform | — | — | ₹2.5 lakh |

### Check daily (30 seconds)

- GSC Coverage: any new errors?
- Any pages dropped from index?
- Any manual actions?
- Any sudden traffic drop >30%?

If any of these fire, stop everything and investigate.

---

## PART 9 — DECISIONS DEFERRED

These are questions that don't need answers now. Don't let them distract you from the 90-day execution plan.

| Decision | When to revisit | Why not now |
|---|---|---|
| Mobile app (native) | Month 12, after 100K monthly actives | PWA is sufficient for year 1; app development diverts resources from SEO/content |
| B2B data product (Nakshiq Intelligence) | Month 12-18, after editorial authority is established | Need the brand moat before selling data |
| Curated marketplace (Nakshiq Stays) | Month 18-24 | Needs 2 years of editorial trust before launching a transactional layer |
| VC fundraising | Month 8-12, after proving traction | Raise on real numbers (50K visitors, ₹1cr revenue), not projections |
| Hiring a content writer | Month 3-4, based on 90-day review | See if solo pace is sustainable first |
| Expand beyond North India | Month 12-18 | Dominate North first, then expand |
| Premium subscription pricing | Month 6-8, after newsletter has 5K+ subscribers | Need audience before pricing |
| GPS / offline maps | Month 14+ | Engineering-heavy, not a content play |
| Community events / group trips | Month 18+ | Need brand recognition first |

---

## PART 10 — THE SINGLE MOST IMPORTANT THING

If you remember nothing else from this document:

**The 1,716 destination-month pages are sitting in your database as structured rows, and they're one template enrichment away from being 1,716 ranked SEO pages. Nobody else in India has this data. Every week you delay publishing is a week a competitor could notice the gap.**

The window is open. The work is straightforward. The main blocker is execution velocity.

Ship the P0 fixes this week. Start Campaign 1 next week. By day 90 you should have 400+ pages live. By day 180 you should see compounding traffic returns.

Go with confidence.

---

*Nakshiq Master Playbook v1.0 · April 10, 2026*
*Next review: July 2, 2026 (90-day mark)*
