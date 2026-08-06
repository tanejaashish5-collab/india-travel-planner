---
type: source
sources: [data/research/SANSONI-FUNNEL-TEARDOWN-2026-08-06.md]
updated: 2026-08-06
---

# src — Empire Mastery / DealGPS funnel teardown (2026-08-06)

Founder brief: *"uncover the business model and build our own — the goal is not to buy the course."*
Follow-up to [[src-aaron-sansoni-verdict]] (the should-I-buy question, answered **no**). This one
ignores the man and dissects the **machine**.

**Method:** live pages parsed, the 29-min VSL downloaded and transcribed **locally** (faster-whisper
`small.en`, $0, no metered API — consistent with the standing zero-metered-AI rule),
Meta Ad Library read directly, market stats checked against Productivity Commission + ABS, and our
**own** GA4 + Supabase numbers pulled for comparison. **No form submitted** — that would seed their
CRM and trigger a sales call.

## The model in one line

**He sells the gap between knowing a system exists and having it.** The free 29-min "masterclass"
names all 15 DealGPS steps and teaches none — every step resolves to *"I'll show you how"*. You
finish knowing there IS a process and that you don't have it. **That gap is the product.**

## The machine

4 ad angles → ClickFunnels page + Wistia VSL → **captures first name, last name, email, PHONE** →
"see if you **qualify**" call → free 2-hr local room (fronted by CEO Dave Cervelli, *not* Aaron;
Ballarat pop. 110k, Melbourne suburb clubs) → Deal Mastery / Empire Mastery → $30k mentoring
(one reviewer) → Inner Circle. Stack: ClickFunnels + Wistia + GTM + Meta pixel + Google Ads + **Hyros**.

**One back-end, many front-ends.** Identical testimonial wall and About block across every page;
only the hero swaps. `/free-training` targets *existing* 6-figure owners; `/free-training-2` targets
people with **no business, "No Experience Needed"**. Opposite audiences, same product.

**It's a template and they got sloppy:** `/melbourne` and `/ballarat` still contain leftover
**"GOLD COAST"** and **"CURRUMBIN"** copy; `/webinar` is stock ClickFunnels with Lorem ipsum and
*"© 2023 YourName.com"*. The advertised **"1 DAY IN-PERSON EVENT"** is two hours on the page.

## The claim stack does not survive checking

| His claim | Reality | |
|---|---|---|
| "$10 trillion in 10 years" (AU) | **$3.5T by 2050** (Productivity Commission); JBWere ~$5.4T | 2–3× inflated |
| "65% of businesses owned by 65+" | **~22%** owned by 60+ (ABS) | ~3× over |
| "800/day retiring" | his own other figure implies ~427/day | self-contradictory |
| "Forbes' #1 Business Mentor" | forbes.com.au/**brand-voice**/, labelled **"BRANDVOICE – PARTNER CONTENT"**, by a "Brand Contributor" | **paid placement** |
| AFR Young Rich 2024 #45, $124m | confirmed | **true** |

**He contradicts his own marketing on camera:** VSL says *"over 130 transactions"* / *"about 85
investments"* / *"almost 30 industries"*; his pages say *"over 200 companies"* / *"150 industries"*;
ads say *"80+ companies"*; `/free-training` says *"90+ active"*; LinkedIn says *"300m PE"*; AFR says
$124m. Nobody reconciled them **because nobody expects anyone to check** — reinforces
[[receipts-over-content]].

## The transferable blueprint (items 1–6 cost only writing)

1. A **named, trademarked system with a fixed step count** ("DealGPS, 15 steps, only one in the world")
2. A free artefact that gives the **MAP** and withholds the **TERRITORY**
3. **One capture, placed BEFORE the value** — not after
4. **Named proof with numbers** ("Keoni, naturopath, $0 down"), never "a client of mine"
5. **External urgency** — a real dated trend, not a countdown timer
6. A **qualification frame** — "see if you qualify" turns selling into selection
7. Escalating commitment (ad → email → 29 min → phone → free room → paid room) — costs a sales function
8. Ad-layer attribution (Hyros) — costs money

**Best single move in the VSL, at 1:23:** he names the sale in the first 90 seconds and frames it as
qualification. You spend the next 27 minutes hoping to be chosen.

## Why this mattered — our own numbers, pulled live

| NakshIQ, 7 days to 2026-08-06 | |
|---|---:|
| Human sessions | **918** |
| `destination_alert_view` | **775** |
| `save_destination` | **3** |
| `save_prompt_view` (the ask fires) | **3** |
| `save_prompt_success` (**email captured**) | **0** |

| All-time (Supabase) | |
|---|---:|
| `newsletter_subscribers` total ever | **13** (8 confirmed) |
| `membership_waitlist` / `social_dm_leads` | **0** / **0** |
| `newsletter_issues` **written and published** | **16** |

**We have written 16 newsletter issues since April. They go to 8 people.**

**And this was already diagnosed.** [[reach-before-monetisation]] (2026-06-21) states the blocker as
*"~10-11K visits/mo but ~6 emails"* and puts *lead magnet → 600–1,000 emails* as step 3. **Six emails
in June, eight in August** — the binding constraint on the whole monetisation plan moved by two
people in seven weeks. This teardown is not new information; it is the **mechanic** for a fix already
agreed and not built. Same shape as the standing "verified content is not self-distributing" rule
(project memory `feedback_verified_content_is_not_self_distributing.md`).

## What we build (and explicitly don't)

**The tension:** the obvious copy — gate the content — is wrong here. 918 sessions/week are organic
and gating destination pages is SEO self-harm. Adapted rule: **do not gate what ranks; build one
thing worth an email that is not a page.** Which is exactly his structure — his VSL is ungated, his
*method* is.

1. 🟢 **Move the ask in front, one step.** Today it needs *two* saves; it fired 3× in 7 days and
   converted 0. Same class of bug as the 06-10 `peakMonth && score >= 4` mount gate.
   **Pre-registered Northstar** (per the measurement rule): 0/wk now → **≥10 confirmed emails/wk
   within 3 weeks, or the ask was not the problem.**
2. 🟢 **One named artefact that is not a web page** — the decision *system* behind the GO/WAIT
   verdicts, as a PDF, emailed. Pages are the map; we've never built the territory. Run honestly:
   we'd actually give the territory, because there's no $30k back-end behind it.
3. 🟡 **Name the method.** The scoring engine is live and nameless. Cheapest item here.
4. 🟡 **Named proof with numbers** — `trip_reports` exist, zero social proof surfaced.
5. 🔴 **Do NOT copy the paid-ads/phone/high-ticket engine.** Needs spend, a sales team and a
   high-ticket product; money is tight and there are 101 ideas at 0 GREEN. His own model proves the
   sequence — **list first, sell second**.

**Worth stating plainly:** the persuasion architecture (1–6) is legitimate and none of it is what
made his customers angry — that was clause 5 of the contract (see [[src-aaron-sansoni-verdict]]).
We can take the whole structure and still write a refund policy we'd be happy to read aloud.

Related: [[src-aaron-sansoni-verdict]], [[owned-audience-funnel]], [[reach-before-monetisation]],
[[receipts-over-content]], [[map-not-territory-lead-magnet]], [[test-cheap-before-build]].
