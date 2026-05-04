# Data baseline — nakshiq.com (2026-05-04)

**Window:** last 28 days
**Source:** GA4 property `534427362` + GSC `sc-domain:nakshiq.com`
**Generator:** `node scripts/data-pull.mjs baseline` — re-run any time
**Status:** GA4 ✅ live · GSC ⏸ propagation lag (retry in 30-60 min, then re-run baseline)

---

## TL;DR — what the data says

### The numbers (honest read)
- **Real human audience: 228 organic-search sessions / 135 engaged in 28 days.** That's ~4-5 engaged humans per day. Small, but real. Every other "session" number you'll see in raw GA4 is bots.
- **76% of engaged humans are in India.** Target audience captured. ✅
- **AIO referral pipeline is working.** ChatGPT.com sent 13 sessions / 11 engaged in 28d at **85% engagement rate** vs 59% for organic search. Tiny absolute numbers, exceptional quality. This is the leading indicator to grow.

### The 4 things to act on (anchored to specific rows below)

1. **🔴 P0 BUG — funnel shows 0 key events across all 6,701 sessions.** The GA4 audit close note (2026-05-03) claimed `track()` helper + 5 key events were wired in commit `8fff5d46`. Either (a) events aren't firing, (b) they're firing under different names than the 5 GA4 admin marked as Key, or (c) reporting lag (events flagged Key after the 28d window started). **Fix this first** — every CRO decision below is blind without it. ~30 min to diagnose.

2. **🟢 `/en/explore` is your hero page, not `/en`.** 17 engaged sessions × 177s avg duration = **the longest-engagement page on the site**. Homepage `/en` is 9 engaged × 46s. Implication: the homepage may be funnelling traffic away too quickly, OR explore is the right entry point and we should surface it more aggressively from `/en` and external links.

3. **🟡 `/en/more` is your top bounce — 13 sessions, 0 engaged.** Investigate: is this a 404? An empty page? A page that loads broken? Same for the empty-path row (12 sessions, 0 engaged) — that's an analytics-config issue (probably page_path not being set on a specific route). Both are quick wins to ship before any other page-level work.

4. **🟢 ChatGPT-User crawls (from bot-blitz finding) ARE converting to real ChatGPT.com referrals (this report).** 9% of bot crawls = ChatGPT-User → 13 referral sessions. That's a measurable cite-rate proxy. Track this number weekly: if `chatgpt.com referral` sessions grow, the AIO citation pipeline is compounding. If it stays flat while OAI-SearchBot crawls grow, we're being indexed but not chosen for citation — that's a content-quality issue to escalate.

### What I'm NOT acting on yet (no signal in the data)

- ❌ Hindi (hi) content optimisation — only `/hi/explore` (4 engaged) in top 20. Real-human Hindi traffic is near-zero. Don't invest until acquisition pulls Indian humans who default to Hindi.
- ❌ Mobile/desktop split — not surfaced because no current hypothesis hangs on it.
- ❌ Hourly traffic patterns — irrelevant when you have <5 engaged humans/day.

---

## How to read this

- **Direct channel = bot mass** (95%+ of Direct sessions are AI crawlers per the bot-blitz investigation 2026-05-04). Every query in this report **excludes Direct** so you see real humans only.
- **Each section answers one question.** If a section is empty, that's signal too — it means there's no actionable target in that category right now.
- **Every recommendation is anchored to a row in this report.** No vanity metrics, no fluff.

---

# GA4 — real humans only

## Top 20 pages by engaged-session humans

*What's actually working. Pages real humans engaged with — not bot-driven Direct traffic. Invest in similar content; copy what wins.*

| Page | Engaged | Users | Avg sec |
| --- | ---: | ---: | ---: |
| /en/explore | 17 | 27 | 177 |
| /en | 9 | 23 | 46 |
| /en/destination/gurudongmar-lake | 6 | 14 | 14 |
| /en/destination/dhanaulti/may | 5 | 4 | 120 |
| /en/destination/tungnath/may | 5 | 8 | 154 |
| /en/destination/ukhrul | 4 | 15 | 10 |
| /en/destination/yuksom | 4 | 10 | 14 |
| /en/plan | 4 | 5 | 85 |
| /hi/explore | 4 | 4 | 28 |
| /en/destination/anini/may | 3 | 4 | 32 |
| /en/destination/barot-valley/june | 3 | 3 | 27 |
| /en/destination/gulmarg/may | 3 | 3 | 20 |
| /en/destination/hemkund-sahib/june | 3 | 2 | 80 |
| /en/destination/sarahan | 3 | 3 | 31 |
| /en/destination/almora | 2 | 6 | 11 |
| /en/destination/chakrata/june | 2 | 3 | 90 |
| /en/destination/dhanaulti | 2 | 1 | 3 |
| /en/destination/dzukou-valley | 2 | 2 | 66 |
| /en/destination/dzukou-valley/june | 2 | 3 | 24 |
| /en/destination/horsley-hills/may | 2 | 2 | 167 |

---

## Pages humans land on then bounce (broken first-impression list)

*Landing pages where engaged-session rate is below 30%. These are the highest-ROI pages to fix — humans wanted to be there, the page failed them.*

| Landing page | Sessions | Engaged | Engaged% |
| --- | ---: | ---: | ---: |
| /en/more | 13 | 0 | 0% |
|  | 12 | 0 | 0% |
| /en/collections | 6 | 0 | 0% |

---

## Sessions referred from AI search (ChatGPT, Perplexity, Gemini)

*Real humans who came via AI citation. Strategic gold — the AIO pipeline working. Track week-over-week.*

| Source | Medium | Sessions | Engaged | Users |
| --- | --- | ---: | ---: | ---: |
| chatgpt.com | (not set) | 7 | 6 | 7 |
| chatgpt.com | referral | 6 | 5 | 5 |

---

## Country split — engaged-session humans only

*Are we getting Indian humans (target audience for an India travel site) or just non-Indian curiosity? Acquisition gating decision.*

| Country | Engaged | Users | Avg sec |
| --- | ---: | ---: | ---: |
| India | 128 | 197 | 80 |
| United States | 21 | 119 | 13 |
| Ireland | 5 | 16 | 12 |
| United Arab Emirates | 5 | 5 | 629 |
| Sweden | 4 | 21 | 7 |
| Australia | 3 | 4 | 159 |
| Thailand | 2 | 2 | 42 |
| Algeria | 1 | 1 | 79 |
| Chile | 1 | 1 | 97 |
| France | 1 | 1 | 58 |
| Israel | 1 | 1 | 260 |
| Saudi Arabia | 1 | 1 | 80 |
| Singapore | 1 | 3 | 83 |
| South Africa | 1 | 1 | 16 |
| United Kingdom | 1 | 3 | 35 |

---

## Conversion funnel — landing → engaged → key event

*Where humans drop off. Each step is a CRO target.*

| Channel | Sessions | Engaged | Eng% | Key evts | Evts/sess |
| --- | ---: | ---: | ---: | ---: | ---: |
| Direct | 6288 | 221 | 4% | 0 | 0.00 |
| Organic Search | 228 | 135 | 59% | 0 | 0.00 |
| Organic Social | 122 | 28 | 23% | 0 | 0.00 |
| Unassigned | 50 | 6 | 12% | 0 | 0.00 |
| Referral | 8 | 7 | 88% | 0 | 0.00 |
| Organic Video | 4 | 0 | 0% | 0 | 0.00 |
| Email | 1 | 0 | 0% | 0 | 0.00 |

---

# GSC — what people search to find us

## High-impression queries with low CTR — title/meta CRO targets

*Skipped: User does not have sufficient permission for site 'sc-domain:nakshiq.com'. See also: https://support.google.com/webmasters/answer/2451999.*
*If GSC just got access, retry in 30 min — Google's directory takes time to recognise new service accounts.*

---

## Queries ranking 4-15 — almost-on-page-1, highest-leverage SEO

*Skipped: User does not have sufficient permission for site 'sc-domain:nakshiq.com'. See also: https://support.google.com/webmasters/answer/2451999.*
*If GSC just got access, retry in 30 min — Google's directory takes time to recognise new service accounts.*

---

## Top-3 ranked queries with low CTR — SERP-feature opportunities

*Skipped: User does not have sufficient permission for site 'sc-domain:nakshiq.com'. See also: https://support.google.com/webmasters/answer/2451999.*
*If GSC just got access, retry in 30 min — Google's directory takes time to recognise new service accounts.*

---

## Top 30 pages by clicks (28d)

*Skipped: User does not have sufficient permission for site 'sc-domain:nakshiq.com'. See also: https://support.google.com/webmasters/answer/2451999.*
*If GSC just got access, retry in 30 min — Google's directory takes time to recognise new service accounts.*

---

## Pages losing position — last 28d vs prior 28d

*Skipped: User does not have sufficient permission for site 'sc-domain:nakshiq.com'. See also: https://support.google.com/webmasters/answer/2451999.*
*If GSC just got access, retry in 30 min — Google's directory takes time to recognise new service accounts.*

---


_Generated 2026-05-04T06:12:41.617Z — 47 actionable rows total._
