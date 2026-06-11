# Nakshiq.com re-audit: the canary is still dead

**Bottom line up front.** This is theatre with a real stage underneath. Ashish has visibly expanded the editorial inventory (491 destinations, 325 festivals, 109 "tourist traps exposed", 91 collections, an AI Plan feature, a Cost Index page, a Route Builder, a Window newsletter destination, Hindi URL scaffolding) — but the **single most embarrassing finding from the previous audit is still on the page, verbatim**. The Mahabaleshwar/May canary still reads "Hot and humid. Pre-monsoon. Not ideal" with one extra sentence prepended, totalling ~20 words of body prose. The legal/trust footer is still empty. Image alt text is still 0%. Social handles are still zero across eight platforms. The author byline shipped on exactly one of four sampled pages. Translation is metaphorical: the site is much bigger and slightly more credible, but the foundations the previous audit said to fix first are largely unfixed. Net delta: **+0.7 of 10**, from 4.3 to ~5.0. Movement, not transformation.

## Executive scorecard: before vs after

| # | Dimension | Old | New | Δ | Verdict |
|---|---|---|---|---|---|
| 1 | UI/UX | 5 | 6 | +1 | Partially fixed — better IA, alt text still 0% |
| 2 | Content depth | 6 | 6 | 0 | Hero pages strong; long-tail stubs persist |
| 3 | Content breadth | 5 | 7 | +2 | Real expansion: festivals, collections, road trips |
| 4 | Features | 4 | 5 | +1 | AI Plan, Route Builder, Cost Index live; UGC absent |
| 5 | Functions | 4 | 4 | 0 | Search UI present; nav still partly theatrical |
| 6 | Premium feel | 4 | 4 | 0 | One byline; no headshots, no press, no awards |
| 7 | Competitive position | 3 | 4 | +1 | Wedge sharpened ("we don't sell bookings") |
| 8 | Gap inventory (legal/trust) | 2 | 3 | +1 | Team page exists; footer still empty |
| 9 | Improvement readiness | 7 | 6 | −1 | Slower than runway implies |
| 10 | Enhancement ambition | 6 | 7 | +1 | Cost Index, NakshIQ 100, Tourist Traps, festivals |
| 11 | Monetisation viability | 3 | 3 | 0 | WIP — assessment deferred |
| 12 | GEO/AEO readiness | 3 | 4 | +1 | Inconsistent template upgrade; controls unverified |
| | **Total /120** | **52** | **59** | **+7** | |
| | **Overall /10** | **4.3** | **4.9** | **+0.6** | |

**One-paragraph verdict:** The implementation has addressed the *easy, ambitious, fun* parts of the previous audit (more destinations, more verticals, more shiny features, an editor's name on one page) and skipped the *boring, embarrassing, compliance-grade* parts (rewrite the 8-word canary, ship the legal layer, fix image alt text, claim the social handles, wire FAQPage schema). Strategically the wedge has sharpened — Nakshiq is now visibly an *editorial* product that "doesn't sell bookings" rather than a generic travel site — and that's a real upgrade. Tactically, the most damning specific findings of the previous audit are still right there in the HTML waiting to embarrass the founder in front of any investor, journalist, or partner who reads the audit twice. **Cosmetic expansion, foundational neglect.**

---

## 1. UI/UX

**Before:** 5/10. Clean template, theatrical nav, no funnel, empty alt text, autoplay MP4 hero performance risk.

**After:** The IA is genuinely improved. Footer now advertises a real taxonomy: Discover (Destinations / Collections / Road Trips / Treks / Records / Camping), Plan & Build (AI Trip Planner, Route Builder, By Persona, Permits, Road Status, Saved), Regions (Browse All States with state-level hubs for HP, Uttarakhand, Rajasthan, J&K, Ladakh), and "Other" (The Window, About, Masthead, How We Score, Cost Index, NakshIQ 100, Press, Corrections, Editorial Policy, Contact). State-month browsers like `/en/explore/state/meghalaya/november` exist with real filter UX (difficulty, kids friendly, solo-female friendly, sort by score/elevation/kid rating). Per-destination MP4 heroes are now served from Cloudflare R2 — better delivery economics. **However: image alt attributes are still 0% non-empty across the four sampled destination pages**, the previous audit's exact finding.

**Verdict:** Partially fixed. **New score: 6/10.**

**Specific gaps that remain:** Empty image alts sitewide. Theatrical nav items (Sign in, Ask NakshIQ, and dropdown labels Explore/Plan/Discover) still render without hrefs. Inconsistent nav across pages — Vrindavan/June shows a *different* reduced nav than Jodhpur/October, indicating an unsupervised template fork.

**Recommendations:** Run a single bulk-pass over the image library to write 12-word alt strings ("Mehrangarh Fort ramparts at dusk, Jodhpur, Rajasthan"). Pick one nav and roll it sitewide. Decide whether "Sign in" and "Ask NakshIQ" are real or are footer-only and stop bluffing in the header.

## 2. Content depth

**Before:** 6/10. Best pages above Lonely Planet; worst literally 8 words.

**After:** Hero pages got *better*, not worse. Jodhpur/October now reads as ~370 words of voice-rich prose with a 7-item packing list, 5-item things-to-do list, sub-₹25k heritage rate examples, named festivals (RIFF, Sharad Purnima), named neighbourhoods (Zenana Deodi), and named birds (demoiselle cranes). Vrindavan/June carries the only verified author byline and the strongest editorial voice ("The town survives on devotion and air conditioning"). Drass/June (Hindi locale) is intel-dense at ~280 words with named distances and ₹800–2,500 room rates. Leh/December is a confident 1/5 SKIP with ~430 words. **But the long-tail rewrite project did not happen.** Mahabaleshwar/May still contains the verbatim 7-word phrase "Hot and humid. Pre-monsoon. Not ideal" plus exactly one prepended descriptor sentence. Total body prose: ~20 words. Other suspected stubs: Gokarna/May, Maredumilli/November, Mawsynram/April, Mahabaleshwar/April. With ~491 destinations × 12 months × 2 locales, the catalogue is plausibly 11,000+ pages — the long tail is enormous and editorially un-staffed.

**Verdict:** Not fixed at the long-tail layer. **New score: 6/10** (no change — heroes up, tail flat, net zero).

**Specific gaps that remain:** The canary. A logic bug on Mahabaleshwar/May where the page rates the month 2/5 SKIP yet recommends it for "First-time travelers, Senior citizens, Families with children" — directly contradicting the score. The internal inconsistency is more damaging than the word count.

**Recommendations:** Set a hard floor of 200 words for any month-page that scores ≥3, and a 120-word minimum for SKIP months that explicitly says *why* and *what month to choose instead*. Run a sitemap-scrape script to flag every page under the floor, then commission ~2,000 stub rewrites at ~$3 each via a vetted writer pool. This is the highest-ROI editorial spend on the site.

## 3. Content breadth

**Before:** 5/10. Deep India matrix, narrow footprint, no thematic hubs, only EN+HI.

**After:** Real expansion. The footer counters claim **491 Destinations, 1,060+ Places, 325 Festivals, 109 Tourist Traps Exposed, 91 Collections**. New surfaces visible: a Festivals calendar (with month-keyed pages including a July festival page), Road Trips (`/en/routes`), Treks (`/en/treks`), Camping, Records (Superlatives), state hubs with filterable destination grids, Collections, and "Tourist Traps Exposed" as a distinctive category. Hindi `/hi/` URLs exist and are indexed in Google.

**Verdict:** Materially better — but not in the dimensions the previous audit specifically requested. **New score: 7/10.**

**Specific gaps that remain:** No solo / family / wellness / honeymoon / pilgrimage / adventure / budget / luxury / food / weddings / groups *editorial hub pages* — these were substituted with a persona-filter widget at `/en/explore-by-persona`, which is functionally narrower (a filter is not a hub; a hub has prose, voice, links into sub-content, and ranks on its own). Hindi parity is **structural only** — `/hi/destination/drass/june` returned English body content with only nav chrome translated to Hindi. The WhatsApp share link on the Hindi Drass page hardcodes the English URL — i18n is incomplete.

**Recommendations:** Build five real thematic hubs first (Honeymoon India, Solo female travel India, Family with kids India, Pilgrimage India, Adventure India), each 1,200+ words with embedded month-by-month decision matrices and ten anchor destinations. Hire one Hindi editor to translate the top 100 EN destination bodies before claiming a Hindi product.

## 4. Features

**Before:** 4/10. Three innovations (1–5 score, WhatsApp share, intel layer) + twelve absences.

**After:** Three new feature surfaces are now visibly live: **AI Plan** (`/en/plan`, badged "NEW" in the global nav), **Route Builder** (`/en/build-route`), and **Cost Index** (footer-linked). The score badge, WhatsApp share, and "Who should go / think twice" patterns are now consistently present across all four sampled destination pages. A "Share your trip" UGC submission stub appeared on the Nashik page ("No traveler reports yet for Nashik. Have you visited?"). Per-destination MP4 hero videos are now standard.

**Verdict:** Partially fixed. **New score: 5/10.**

**Specific gaps that remain:** No comments, no published reviews, no community page, no app, no loyalty, no concierge other than the AI chat surface, no podcast, no maps embedded on retrieved pages, and the AI Plan UX could not be inspected — its real behaviour (true itinerary builder vs. chat-into-void) is unverified. The "20 pre-built itineraries" promised in the 30–90 day plan does not exist as a named hub; Collections (91), Routes, and Treks substitute for it but lack the TouristTrip schema wrapper that was the entire point.

**Recommendations:** Put 20 named, schema-wrapped itineraries at `/en/itineraries/` with TouristTrip JSON-LD. Publish three real user trip reports as the seed for the UGC layer. Make the AI Plan output bookable-link-aware once commerce ships — otherwise it's a parlour trick.

## 5. Functions

**Before:** 4/10. Search untestable, no filters, no payment, no social auth, no third-party APIs.

**After:** State-level browsers now expose real filters (difficulty, kids-friendly, solo-female-friendly, sort by score/elevation/kid rating/name). A Search element is visible in the global nav. "Sign in" still has no href in the static HTML — likely client-side, but it has not gained the social-auth options the previous audit recommended. No third-party APIs (Booking, Agoda, MakeMyTrip, Viator, GetYourGuide) are wired — confirmed by the absence of any `aid=`, `clickref=`, `awinmid=`, `ranid=`, `ts.viator.com`, or `getyourguide.com` link patterns in inspected HTML.

**Verdict:** Marginally improved at discovery, unchanged elsewhere. **New score: 4/10.**

**Recommendations:** Decide whether Sign In is shipping in 2026 or being removed. If the site truly "doesn't sell bookings," replace third-party API integration with a single CTA per destination ("Plan a tailored trip") routed to a lead-gen form — that's a function, not theatre.

## 6. Premium feel

**Before:** 4/10. Premium intent, mid-market execution.

**After:** One author byline shipped — Ashish Taneja, "Editor, NakshIQ", with a "Reviewed 24 April 2026" timestamp on Vrindavan/June. The byline links to `/en/about/team#ashish-taneja`. **There is no headshot image** in the byline area (only a two-letter "AT" monogram), no inline bio, and no LinkedIn link. The byline appears on Vrindavan/June but **not** on Jodhpur/October (the flagship 5/5 page), Mahabaleshwar/May, or Drass/June. The previous audit's exact recommendation — "Byline every article with Person schema, headshot, 200-word bio, LinkedIn link" — is implemented at roughly 25% coverage and 20% completeness per implemented page. Original photography for top destinations is not visibly shipped; hero videos exist, but the still imagery quality and provenance is not declared anywhere.

**Verdict:** Partially fixed in concept, mostly unfixed in execution. **New score: 4/10.**

**Recommendations:** Roll the byline template to all 5/5 and 4/5 pages this week. Add the headshot — even a phone selfie at the desk is more premium than initials. Add a 50-word inline bio with the LinkedIn icon. Then write the longer bio at `/en/about/team`.

## 7. Competitive position

**Before:** 3/10 vs current; 8/10 on the wedge of honest-skip scoring + structured intel.

**After:** The wedge has *sharpened* in a meaningful way. The Nashik page explicitly states "**We don't sell bookings**" and "Vetted stays, operators, and local businesses — not a booking site, just honest recommendations." This is now a positioned identity, not a quiet absence. "109 Tourist Traps Exposed" is a confident editorial brand-mark. The 1/5 SKIP rating on Vrindavan/June and the 2/5 caution on Mahabaleshwar/May are exactly the kind of counter-positioning that MakeMyTrip and Holidify will never do. **However, none of this translates to traffic for the queries that matter.** A direct test of "best month to visit jodhpur" returns Surpurabagh, Holidify, MakeMyTrip, TravelTriangle, FindingOurAdventure, SOTC, TripCrafters, IndiaSomeday, BajajFinserv, TourMyIndia in the top ten — Nakshiq is nowhere in that result set.

**Verdict:** Wedge clarified, distribution still absent. **New score: 4/10.**

**Recommendations:** Pick five competitive head-term queries ("best month to visit goa", "best month to visit kerala", etc.), rewrite those specific destination/month pages to a 1,200-word standard with FAQPage schema and answer-first TL;DRs, and run a focused PR push on those five pages. Distribution beats inventory.

## 8. Gap inventory (legal & trust layer)

**Before:** 2/10. Missing Privacy, T&Cs, Cookie, Contact, About, Editorial Policy, masthead, author bios, last-updated stamps, schema.

**After:** The footer of inspected destination pages — current as of 24 April 2026 review-stamped Vrindavan content — contains **no Privacy link, no Terms link, no Cookie notice, no Contact link, no Editorial Policy link, no Masthead link, no copyright line, no legal entity name (no "Nakshiq Pty Ltd" or equivalent), no ABN, no registered address, no contact email**. The site's footer is currently a newsletter CTA, prev/next pagination, and internal cross-links to other guide pages. The previous audit's *most actionable, lowest-cost, highest-priority* recommendation has not shipped. Google's index does not surface any about / privacy / terms / contact / editorial / masthead pages despite indexing thousands of destination pages — the inference that these pages do not exist as live URLs is robust. The footer IA *does* now advertise links to Editorial Policy, Corrections, Press, Methodology, How We Score, Cost Index, NakshIQ 100, Masthead, and Contact via the broader site shell on some pages — but on the destination pages directly inspected, those footer items are not rendered into the bottom of the page.

**Verdict:** Marginally improved by the apparent existence of `/en/about/team` (referenced by the Vrindavan byline anchor). Functionally unfixed. **New score: 3/10.**

**Recommendations:** This is the cheapest 90 minutes of work in the entire backlog. Buy a Termageddon or iubenda subscription, paste the generated Privacy and T&Cs, write a 400-word Contact page with a real email, write a 600-word Editorial Policy citing fact-checking and corrections, and link all five from the footer of every page in the same release.

## 9. Improvement readiness

**Before:** 7/10. Clear prioritised path.

**After:** The path was clear. The path was not followed. Of the 11 specific 0–30-day items from the previous audit (Privacy/T&Cs/Cookie/Contact/About, byline with Person schema/headshot/bio/LinkedIn, Published+Last-updated stamps, rewrite-or-delete sub-150-word pages, JSON-LD chain, robots.txt allow-list, sitemap submission, llms.txt + llms-full.txt, image alt text, affiliate stitching, social handles), the verifiable shipped count is **roughly 1.5** — a partial author byline on one in four pages and an apparent team page anchor. The other 9.5 items either did not ship or could not be verified.

**Verdict:** Readiness is fine; execution discipline is not. **New score: 6/10** (downgraded — the issue was never knowing what to do).

**Recommendations:** Pick three items from the unfinished 0–30-day list this week and ship them with screenshots. Stop building new features (NakshIQ 100, Tourist Traps, Cost Index) until the legal footer ships.

## 10. Enhancement ambition

**Before:** 6/10.

**After:** Ambition is the strongest signal of progress. The site has spawned a Festivals calendar, a Cost Index page, a NakshIQ 100 (presumed top-100 destinations ranking), a Tourist Traps Exposed series, a Records / Superlatives section, a Camping vertical, a Treks vertical, Road Trips, and Collections (91 of them). These are real product extensions, not vapourware — most are footer-linked from indexed pages. The "AI Plan" feature has visible NEW-badge promotion. The editorial brand is more clearly differentiated than at the time of the previous audit.

**Verdict:** Ambition is up materially. **New score: 7/10.**

**Recommendations:** Decide which of these ten verticals are flagship and which are sidebars. A site this small cannot have 10 flagship products. Pick 3 (suggest: destination/month matrix, Festivals, Tourist Traps) and demote the rest to footer-only.

## 11. Monetisation viability

**Before:** 3/10. Zero revenue rails live.

**After (per client direction — assessment deferred, no score penalty):** No affiliate links, no booking CTAs, no partner logos in the footer, no affiliate-disclosure page visible. The Nashik page actively de-positions affiliate revenue ("we don't sell bookings"). Visible revenue staging consists of: the weekly Window newsletter signup (potential paid-tier upsell), the "Plan a trip" / "Ask NakshIQ" surfaces (potential lead-gen for tailored-trip sales), and the editorial inventory itself (potential sponsorship / branded-content revenue). **What's notably *not* staged:** no "supporters" / "members" page, no Patreon / Substack-paid signal, no sponsorship inquiry page, no media-kit page, no advertise-with-us page.

**Verdict:** WIP — assessment deferred. **Score held at 3/10**, no penalty applied. The strategic posture ("editorial product, not booking middleware") is coherent and defensible if the lead-gen and sponsorship rails ship within 90 days.

**Recommendations:** Stage at least three revenue-rail pages within 30 days even if commerce isn't live: an Advertise-with-NakshIQ media kit, a Sponsorship inquiry page, and a Members / Supporters tier with a coming-soon waitlist. Letting future advertisers and sponsors *see* the runway buys credibility.

## 12. GEO/AEO readiness

**Before:** 3/10. robots.txt unverified, sitemap.xml unverified, llms.txt absent, no schema, no FAQPage on the bullets that were ready-made for it.

**After:** Direct verification of robots.txt, sitemap.xml, llms.txt, llms-full.txt, and `/.well-known/ai-plugin.json` was **blocked at the fetcher layer in this audit**, so the technical control files cannot be confirmed either way and the lead engineer must run direct `curl` checks (see canary recommendations below). The strongest available indirect signal is negative: **nakshiq.com is not listed in the major public llms.txt registries** (llmstxt.site, llmstxthub.com), which is consistent with the file being absent. JSON-LD blocks could not be inspected directly because the fetcher's markdown extractor strips `<script type="application/ld+json">` blocks; however, the rendered DOM evidence is mixed — Vrindavan/June carries author + reviewed-date metadata in the visible template, while Jodhpur/October and Mahabaleshwar/May do not, indicating a partial template upgrade that has not propagated. The "Who should go / think twice" bullets remain plain `<ul>` lists — not Question/acceptedAnswer Q&A — which means **even if FAQPage JSON-LD has been added, Google would reject it as misuse** because the content is declarative ("First-time travelers", "Senior citizens"), not interrogative. This is the rare case where the previous audit's FAQPage recommendation should be downgraded: reframe as TouristDestination `audience` and `touristType` properties, not FAQPage.

**Verdict:** Probably partially shipped, not verifiable in this re-audit, materially below where it should be 12 weeks after the original recommendation. **New score: 4/10.**

**Recommendations:** Run, today: `curl -sI https://www.nakshiq.com/robots.txt && curl -s https://www.nakshiq.com/robots.txt`; `curl -sI https://www.nakshiq.com/sitemap.xml`; `curl -sI https://www.nakshiq.com/llms.txt`; `curl -sI https://www.nakshiq.com/llms-full.txt`; `curl -s https://www.nakshiq.com/en/destination/vrindavan/june | grep -A 500 'application/ld+json'`. Paste the outputs into the next review. Until then this score does not move.

---

## Canary report: did the embarrassing failures get fixed?

**Canary 1 — the 8-word Mahabaleshwar/May page.** **Status: STILL DEAD.** Fetched verbatim, the page's entire body prose reads: *"Pre-monsoon heat and humidity make hiking the hill stations uncomfortable in May. Hot and humid. Pre-monsoon. Not ideal."* That is approximately 20 words, of which 7 are the original canary phrase. The page rating moved 1/5 → 2/5 and one additional sentence was prepended. No "May story", no things-to-do list, no packing list, no festival block — every other structural element that exists on Jodhpur/October and Vrindavan/June is missing. Worse, a logic bug was introduced: the page rates May 2/5 SKIP but recommends it for "First-time travelers, Senior citizens, Families with children." This is the canary that died, came back as a zombie, and now contradicts itself. **This is the single most damning finding of the re-audit.**

**Canary 2 — missing legal pages.** **Status: STILL MISSING in the destination-page footer**. No Privacy, T&Cs, Cookie, Contact, About, Editorial Policy, ABN, entity name, or email rendered at the bottom of the inspected pages. A team page anchor (`/en/about/team#ashish-taneja`) is referenced by the Vrindavan byline, suggesting *some* About surface exists, but the legally-required pages are not visibly linked from the footer of live content. The previous audit's exact recommendation was "Ship Privacy, T&Cs, Cookie notice, Contact, About pages" in the 0–30-day window. Twelve weeks later, the footer is still empty.

**Canary 3 — empty image alt text.** **Status: STILL 0%.** Every hero image on the four sampled destination pages renders with empty `alt`. Sample: `![](https://pub-d8970c901de34c218926ebf4be1ed09a.r2.dev/destinations/jodhpur.jpg)`. The previous audit recommended "Add image alt text across the site." This is a one-script-and-one-deploy job. It did not happen.

**Canary 4 — missing schema.** **Status: PARTIALLY ATTEMPTED, NOT VERIFIED, AND THE FAQPage RECOMMENDATION SHOULD BE WITHDRAWN.** Author + dateModified template additions exist on Vrindavan/June only; FAQPage on the "Who should go / think twice" bullets cannot legitimately ship because the content isn't Q&A. Direct JSON-LD inspection is needed to confirm Organization, BreadcrumbList, Article, Person, and TouristDestination types.

---

## What improved

The site has visibly grown. The destination/month inventory is plausibly 11,000+ pages across 491 destinations × 12 months × 2 locales, with 325 festival pages, 91 collections, 109 tourist-trap pages, road trips, treks, camping, and a NakshIQ 100 ranking. New product surfaces shipped: AI Plan, Route Builder, Cost Index, the Window newsletter destination, persona filters, and state-level browsers with real filter UX (kids-friendly, solo-female-friendly, difficulty, sort-by-score). The strategic positioning is meaningfully sharper — "we don't sell bookings" and "109 Tourist Traps Exposed" are confident editorial brand-marks that competitors won't replicate. Hero pages are stronger than before: Jodhpur/October, Vrindavan/June, Drass/June, Leh/December all read as 250–500-word voice-rich pieces with structured intel, packing lists, weather rationale, and 12-month comparison tables. One author byline (Ashish Taneja, Editor) and one "Reviewed 24 April 2026" stamp now exist as a template seed. Hindi `/hi/` URL scaffolding is live and indexed. Per-destination MP4 heroes are served from Cloudflare R2. Google indexation is strong — well-formed titles, descriptive meta, distinct URL patterns. **The product is more confident, more differentiated, and more inventoried than it was at the previous audit.**

## What's still broken

The Mahabaleshwar/May canary is unfixed and now logically self-contradicting. The legal/trust footer is empty across every inspected destination page — no Privacy, T&Cs, Cookie notice, Contact, Editorial Policy, ABN, or entity name. Image alt text is 0% non-empty across the sample. The author byline shipped on one of four sampled pages; the headshot, inline bio, and LinkedIn link did not ship at all. Hindi parity is structural only — `/hi/` URLs serve English body content. Social handles remain at zero of eight platforms (Instagram, LinkedIn, YouTube, X, Pinterest, Threads, Facebook, TikTok), with no defensive squatting either. Earned media is at zero — no press mentions in Outlook Traveller, Condé Nast, YourStory, ET Travel, Skift, or any travel-tech publication. No Wikipedia or Wikidata entry exists. No Reddit or Quora discussion exists. No backlinks from third-party directories. The site does not rank in the top ten for "best month to visit jodhpur" — the most obvious head-term query for its core wedge. The "Who should go / think twice" bullets are still not Q&A-shaped, so FAQPage schema cannot legitimately wrap them. The robots.txt, sitemap.xml, llms.txt, and llms-full.txt status remains unverified in this audit and is unconfirmed in any public llms.txt registry. The "20 pre-built itineraries" promised in the 30–90-day plan does not exist as a named hub. Thematic editorial hubs (Solo, Family, Wellness, Honeymoon, Pilgrimage, Adventure, Budget, Luxury) do not exist as ranked, prose-rich landing pages — they are persona filters instead.

## What's newly broken

A logic bug appeared on Mahabaleshwar/May where the 2/5 SKIP rating recommends the month for "First-time travelers, Senior citizens, Families with children," directly contradicting the page's own warning. Nav inconsistency emerged across pages — Vrindavan/June shows a reduced three-item nav (Explore / Plan / Discover) while Jodhpur/October shows the larger nine-item nav, suggesting an unsupervised template fork. The WhatsApp share link on the Hindi Drass page hardcodes the English URL, sending Hindi readers to the English version — an i18n regression. Two distinct newsletter cadence claims appear on different pages ("every Sunday" on most, "once a month" on others) — internal inconsistency in the most sensitive trust artefact on the site. The byline on Vrindavan/June links to an About-Team anchor that may or may not load with substantive bio, headshot, and LinkedIn data — the previous audit's specific deliverable for the byline component is half-implemented in a way that is *worse* than not having a byline at all (it suggests editorial transparency without delivering it).

---

## Updated 30 / 60 / 90-day plan

**0–30 days — finish what was started.** Rewrite the Mahabaleshwar/May page to the 200-word minimum *today* and use it as a template for the long-tail rewrite project — every SKIP page should follow the same structure (why this month is bad, who should still consider, what month to choose instead, named alternatives with internal links). Run a sitemap script to flag every (city, month) page under 200 words and commission rewrites at scale. Ship Privacy, T&Cs, Cookie notice, Contact (with a real email), and Editorial Policy in one release; link all five from the footer sitewide. Fix the footer to render legal entity name, ABN, registered address, and copyright on every page. Roll the Vrindavan byline template to all 5/5 and 4/5 destination pages with a real headshot, 50-word inline bio, and LinkedIn link. Run the bulk image-alt-text pass. Claim the eight social handles defensively even if you don't post yet. Run the five `curl` checks on robots.txt, sitemap.xml, llms.txt, llms-full.txt, and JSON-LD blocks; if the AI-crawler allow-list and llms.txt are missing, ship them this week. Pick one nav layout and roll it sitewide. Fix the WhatsApp share URL bug on Hindi pages. Reconcile the newsletter cadence to one claim across all pages.

**30–60 days — distribution and credibility.** Ship five thematic editorial hubs (Honeymoon India, Solo Female India, Family India, Pilgrimage India, Adventure India) at 1,200+ words each with embedded month-by-month decision tables and ten anchor destinations linked. Ship 20 named TouristTrip-schema-wrapped itineraries at `/en/itineraries/`. Translate the top 100 destination bodies into actual Hindi. Publish 8 issues of The Window weekly newsletter as standalone web pages so the archive becomes a content asset. Submit five HARO/Qwoted responses per week. Pitch three Indian travel publications (YourStory, ET Travel, Outlook Traveller) with the Tourist Traps Exposed angle. Apply for CNT India Readers' Choice. Stage three revenue-rail pages even if commerce isn't live — Advertise-with-NakshIQ media kit, Sponsorship inquiry, Members waitlist.

**60–90 days — earn the third-party signal.** Create the Wikidata entry. Write the Wikipedia stub once enough press coverage exists. Run an original survey ("How Indians plan domestic trips, 2026") and publish the dataset. Launch the Cost Index 2026 with downloadable CSV. Get one CEO interview placed (YourStory or ET Travel). Open the Reddit and Quora content cadence — three answers per week on r/IndiaTravel, r/india, r/solotravel, plus three Quora answers per week on India travel topics. Start the YouTube channel with one video per destination/month for the top 50 pages, transcripts auto-published. Apply for one travel-tech award. By day 90 the site should have at least three earned-media mentions, one award nomination, claimed social presence on five platforms, and ranking on at least 10 head-term queries.

---

## Final scorecard

| Dimension | Old | New | Δ |
|---|---|---|---|
| UI/UX | 5 | 6 | +1 |
| Content depth | 6 | 6 | 0 |
| Content breadth | 5 | 7 | +2 |
| Features | 4 | 5 | +1 |
| Functions | 4 | 4 | 0 |
| Premium feel | 4 | 4 | 0 |
| Competitive position | 3 | 4 | +1 |
| Gap inventory | 2 | 3 | +1 |
| Improvement readiness | 7 | 6 | −1 |
| Enhancement ambition | 6 | 7 | +1 |
| Monetisation viability (WIP — deferred) | 3 | 3 | 0 |
| GEO/AEO readiness | 3 | 4 | +1 |
| **Total** | **52/120** | **59/120** | **+7** |
| **Overall** | **4.3/10** | **4.9/10** | **+0.6** |

**Closing line.** Ashish has built a bigger, more confident, more differentiated travel product than the one the previous audit reviewed. He has not built the boring foundation underneath it. The 8-word page that was supposed to be the smoking gun is still on the page, now with one extra sentence and a logic contradiction. The footer is still legally bare. The image alts are still empty. The social handles are still unclaimed. The next 30 days decide whether this re-audit's findings are the launchpad for a serious editorial brand or the second draft of a notice that the founder reads strategy memos as inspiration rather than as instructions.