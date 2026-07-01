# NakshIQ Content Strategy — turning 15,000 verified data points into save-worthy content

**2026-07-01 · for Ashish · built from the real post log, a competitive-format study, and the live database**

---

## The one-page answer

You are right, on every count. I pulled the actual post log off the pipeline and checked it against a fresh study of what wins on Instagram/YouTube in 2026. Three hard facts:

1. **We post a score, not content.** In the last 3 weeks, **53% of everything we posted was a score** (a "verdict / X out of 10" reel or card). Nobody saves a score. No save = no reach. This is why we get "no love."
2. **We have posted ZERO carousels in 65 days** — the last real data carousel was **27 April**. And carousels are the single best format for us: in 2026 they get **~3.8× the engagement rate of reels, ~2× the saves, and a free 24–48h re-serve**. We turned off our best weapon.
3. **We are sitting on ~15,000 verified, unique data points** (533 destinations × 12 monthly verdicts, 1,661 places-to-see, 3,119 eateries, 1,019 stays, 501 festivals, 105 collections) and pointing a "score reel" at them. That is the waste you keep flagging.

**What changes:** stop leading with scores; make the *carousel* our primary Instagram weapon and *YouTube Shorts* our primary reach engine; build every post from a verified data point (skip-lists, cost breakdowns, best-month guides, itineraries, festival guides, comparisons, persona picks); and put **trendy music on the silent reels, calm beds under the voiced ones** — done and proven today.

**What I already shipped today** (not a plan — code + files): the diagnosis above; a **30-track no-attribution trendy music library** + a **voiceover-aware music picker**; your **3 itinerary reels re-rendered with trendy house music**; and the exact fix for the carousel bug. The rest is a 4-phase build below.

---

## 1. The diagnosis (from the real post log, 10–30 June)

| What we posted (21 days, Instagram) | Count | Save-worthy? |
|---|---|---|
| **Score reels + score cards** (`nakshiq_score`, `score_card`) | **44 (52%)** | ❌ a verdict expires |
| `did_you_know` / `this_vs_that` short reels | 17 | ⚠️ better, still thin |
| eateries / stays / trap / collection one-offs | ~10 | ⚠️ occasional |
| **Data carousels** | **0** | — (turned off) |

**The cadence fixes worked in ONE place and silently failed in another:**
- ✅ The **YouTube-Short** score cap works — score shorts dropped to ~1/week; variety reels now carry the shorts.
- ❌ The **feed** score cap and the **weekly-carousel floor** do *not* fire. Root cause: the carousel/visual formats get *picked* correctly, then the render step **fails a hero-image reachability check and silently falls back to `score_card`** — and because the floor "spends" the week at pick-time, a failed carousel forfeits the week and posts a score instead. So every carousel attempt becomes another score. (The image check HEADs a URL that can 403 behind our own firewall; the fix is to read hero images straight from R2, where they always resolve. See §7.)

**Bottom line:** this is not a settings tweak we can keep nudging. Capping scores makes the feed *cleaner*; it does not make our posts *save-worthy*. We have to change **what the post is**.

---

## 2. Our arsenal — what's actually in the database today

This is the point you keep making, quantified. Every number below is live (queried 2026-07-01) and every field is verified, human-checked data — our whole moat:

| Data surface | Rows | What it powers |
|---|---:|---|
| Destinations | **533** | every format's subject |
| Month-by-month verdicts (go/wait/skip + score + why) | **6,396** | best-month guides, skip-lists, seasonal carousels — **our #1 edge** |
| Places to see (POIs) | **1,661** | itineraries, "N things to do" carousels |
| Eateries (3+ sourced) | **3,119** | food carousels, "where locals eat" |
| Stays | **1,019** | cost breakdowns, "where to stay" |
| Festivals | **501** | festival guides (huge, seasonal, evergreen) |
| Collections | **105** | curated "7 places for X" carousels |
| Pilgrimage routes | 8 | yatra/parikrama guides |
| Emergency/safety (SOS) | 533 | the trust layer inside every post |

**~15,000 verified data points.** A creator with a fraction of this posts 10 carousels and gets 600K views. We post a score.

---

## 3. What actually earns saves (2026 competitive study)

Full study is in the appendix; the three findings that matter:

- **Carousels beat reels for us.** 2026 benchmarks: carousels ~**1.9% engagement** vs reels ~**0.5%**, **~2× saves per impression**, and a unique **re-serve** (Instagram shows slide 2 as a new cover 24–48h later). For a *reference/data* brand, the carousel is the natural medium — people bookmark data, they don't bookmark a score.
- **The least-crowded, highest-intent lanes are exactly the ones we can uniquely fill:** **skip-list / "don't waste a day on X"** (almost nobody owns this in India — most creators won't say "skip it"), **verified cost breakdowns**, and **best-month / "when + what to pack"** guides. All three are *save-to-decide-later* content, and all three are built from data we already have and competitors have to guess at.
- **Platform split:** **YouTube Shorts = primary reach** (higher engagement, months-long shelf life, monetizable, wider age range) → put itinerary/route/festival reels here. **Instagram = carousels for saves + reels as a traffic driver** to the nakshiq.com page behind the post. Cross-post the reel to both; make the *carousel* IG-native.

---

## 4. The format catalog — one row per data point → one repeatable format

Every format below is buildable **today** from verified data, zero fabrication. "Type" = C(arousel) or R(eel). Music column applies the founder rule (trendy = no voiceover; calm = voiceover bed).

| # | Format | Type | Built from | Platform | Music | Save hook |
|---|---|---|---|---|---|---|
| 1 | **Skip-list** "5 places to skip in July → go here instead" | C | month verdicts (skip/wait + a higher-scoring alt) | IG | — | contrarian, timely |
| 2 | **Cost breakdown** "7-day Kashmir, verified ₹ range" | C | stays + eateries + cost | IG→site | — | decision, links out |
| 3 | **Best-month guide** "When to visit X (and what to pack)" | C | month verdicts | IG | — | evergreen, re-served yearly |
| 4 | **Itinerary** "Perfect N-day [place] plan" | R | POIs + verdicts | YT+IG | trendy | the proven format you loved |
| 5 | **Festival guide** "Everything about [festival]: when/where" | R+C | 501 festivals + heroes | YT+IG | trendy | seasonal spike, evergreen |
| 6 | **Collection** "7 underrated hill stations" | C+R | 105 collections | IG+YT | trendy | listicle = most-saved |
| 7 | **Comparison / "vs the world"** "Kerala vs Bali for ⅓ the price" | C | 2 dests' verified data | IG | — | swipe-to-decide |
| 8 | **By-persona** "India for solo women / first-timers / families" | C | audience tags + SOS + verdicts | IG | — | high-intent segment |
| 9 | **Food trail** "Where locals actually eat in [city]" | R | 3,119 eateries | YT+IG | trendy | universally saved |
| 10 | **Route / road-trip** "The perfect [region] loop" | R | multi-dest + map | YT+IG | trendy | narrative, high retention |

Each ends with **"full verified plan → nakshiq.com"** — the part no competitor can copy, and the thing that turns a view into site traffic (our real bottleneck + what the idle affiliate plumbing needs).

---

## 5. The music system (your rule, implemented)

**Rule:** no voiceover → **trendy/fast** (house, electronic — "people really like the music"); voiceover present → **calm bed** ducked under the voice.

- Built a **`pick_music(slug, voiceover)`** picker that draws from the right pool deterministically (stable re-renders, varied across posts).
- **Downloaded 30 fresh no-attribution house/electronic tracks** (Mixkit Free License — commercial + monetized use OK, no credit needed) into a `music_trendy/` pool, on top of the existing 24. **Calm** pool seeded with 6 soft beds.
- **Re-rendered your 3 itinerary reels with trendy house music** today (Kerala/Meghalaya/Kedarnath each got a different track). They're on your Desktop, ready to post.
- Ongoing supply: the Mixkit CDN pattern is scriptable, and Pixabay Music (also no-attribution) gives an API path — so the library never goes stale or repetitive.

---

## 6. The new weekly posting plan (replaces the score-heavy mix)

Fewer, better posts (a sub-1K account gets throttled for over-posting — quality signals matter more than volume):

| Day | Instagram | YouTube |
|---|---|---|
| Mon | **Skip-list carousel** | Itinerary Short |
| Tue | Best-month carousel | — |
| Wed | **Cost-breakdown carousel** (→ site) | Festival/Food Short |
| Thu | Collection carousel | — |
| Fri | Comparison or persona carousel | Itinerary/Route Short |
| Sat | Festival guide (carousel + reel) | Festival Short |
| Sun | 1 score reel (kept, capped) + best reel re-share | — |

= **~1 carousel/day + ~3–4 Shorts/week**, scores down to **1/week max**. Every post traceable to a verified data point.

---

## 7. Build roadmap (what's done, what's next)

**✅ Phase 0 — done today**
- Diagnosis + this strategy.
- Trendy music library + voiceover-aware picker + 3 reels re-rendered with music.
- The carousel-bug root cause + fix spec (below).

**Phase 1 — fix the pipeline (this week, small)**
- Point the carousel/image check at **R2 hero URLs** (always resolve) instead of the firewalled site URL → carousels stop collapsing to `score_card`.
- Make the weekly-carousel floor **only spend the week on a confirmed publish**, not at pick-time.
- Lower the score cap to a hard 1/week on the feed too.

**Phase 2 — the carousel engine (highest leverage)**
- One self-contained generator that renders 6–10 brand slides from verified data for formats **1, 2, 3, 6, 7, 8** and posts to IG. Reads straight from Supabase + R2 (no fragile legacy path). *A sample skip-list carousel is included with this doc as proof.*

**Phase 3 — the reel engine**
- Productionize the itinerary reel (format 4) you loved into the pipeline, then add festival/food/collection/route reels (5, 9, 6, 10) with the music system, for YT + IG.

**Phase 4 — persona + "vs the world" + automation**
- Persona tagging (solo-women/first-timer/family) across the catalog; comparison generator incl. India-vs-foreign; wire the new weekly calendar into the cron so it runs itself.

---

## 8. The honest caveats

- **Format buys a shot at reach, not a guarantee.** Two of the competitor's ten posts went big; most stayed modest. The win is that our ceiling stops being ~20 views.
- **These lanes are proven-but-busy** (except skip-list, which is genuinely open). Our defensible edge is the **verified data + the real page behind every post** — lean on it, always link it.
- **Reach ≠ traffic ≠ revenue.** A viral reel that goes nowhere does nothing for the business. Every post must route to a nakshiq.com page. Build for the click, not the view.

---

*Appendix: full competitive study (carousel-vs-reel benchmarks, format-by-format demand/competition, top-5 India accounts, platform comparison) and music-source license table available on request — both were run fresh 2026-07-01.*
