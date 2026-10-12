# Ops email triage: 2026-10-12

Founder asked what the ops@nakshiq.com emails were about and to fix them. Three
families arrived on Monday 12 Oct. Each had a different cause. None was a broken job.

## 1. "[NakshIQ ops] cron health DEGRADED, FAILING SILENTLY (freshness-review)"

Daily since 2026-10-07. Not a failure: the Saturday review escalated three pages it
could not queue for one-click approval, and the watchdog re-sent that list every
morning.

| Page | Review's claim | Checked against the source | Outcome |
|---|---|---|---|
| chinnar | `best_months` to Oct–Mar, citing Kerala Tourism | Page says "The best time to visit Chinnar Wildlife Sanctuary is from December to April" and "The monsoon season (June to September)". It does not say Oct–Mar. | Rejected. No content change. |
| dwarka | `avoid_months` to May–Sep, citing a "July 2026 flood" | The cited articles are dated 28 and 29 Aug 2024. Vibes of India, 27 Jul 2026, lists Devbhoomi Dwarka among districts still short of rain. | Rejected. No content change. |
| courtallam | Main Falls closed since 6 Oct, other falls open | IANS wire (socialnews.xyz 2026-10-06, Punjab Kesari): "Tourists have been barred from entering the Main Falls"; "No specific reopening date was provided". The article does not say which other falls are open. | Real. Notice added (below). The "other falls open" line was not written. |

Sources: https://www.keralatourism.org/destination/chinnar-wildlife-sanctuary-idukki/218/ ·
https://english.gujaratsamachar.com/news/gujarat/gomti-ghat-temples-dwarka-heavy-rains-in-gujarat ·
https://www.vibesofindia.com/gujarat-monsoon-rainfall-deficit-turns-excess-dwarka-remains-dry/ ·
https://www.socialnews.xyz/2026/10/06/tn-courtallam-waterfalls-closed-for-public-as-repair-work-resumes/

**Courtallam write** (`destination_months`, courtallam, month 10). The October page's
lead said "Main Falls (₹15 ticket) and Five Falls at full bath-flow".
- `prose_lead`: prefixed with "Notice for October 2026: the Main Falls bathing area is
  closed for repair work (reported 7 Oct 2026). No reopening date has been given;
  officials say bathing will resume once the work is finished, before the northeast
  monsoon sets in. Check locally before you plan a trip around it. What follows
  describes a normal October. "
- `note`: was "NE monsoon arrives. 24-30C. Catchment refills mid-month. Second peak
  window."; suffixed with " Oct 2026: Main Falls bathing closed for repairs, no
  reopening date. Check before you go."
- Undo: strip that prefix and that suffix. Remove both once the falls reopen.

All three destinations stamped via `stamp_destinations_reviewed`, then
`freshness-review.mjs recount --commit` took the run row's open count 3 → 0.
Rendered pages verified with `verify-touched-pages.mjs --revalidate`
(/en/destination/courtallam/october carries the notice).

Left open, not a stale fact: Kerala Tourism calls December to April best for
Chinnar; our month scores rate March 2/5 and April 1/5 and list both under
`avoid_months`. Worth one editorial look, with climate normals, not a tourism-board line.

## 2. "[NakshIQ · SOS] 4 numbers changed at source"

No number had changed. Four source pages did not load for the cloud checker.

- **bandhavgarh, kanha, jabalpur** (helpline 1800-233-7777, source mptourism.com):
  the site's TLS certificate expired 10 Oct 2026 17:51 GMT. Fetched ignoring the
  certificate, the page still prints the number twice. These rows had been in
  `needs_source` for weeks (other local numbers have no recorded source), so their
  fail streak was already 9–10 and they escalated on the first failed load, although
  the email says "three weeks running". Rows set back to `needs_source`, streak 0,
  note explains. `verified_date` untouched.
- **auroville** (auroville.org/page/emergency-numbers-and-services): loads from this
  Mac in 1.4s with both numbers on it; refuses Vercel. Confirmed by the new local
  re-check using the same `verifyRow()` as the cloud route.

## 3. "[NakshIQ · Roads] 6 drifted · 0 unsourced"

A timing race. On 10-05 the weekly road agent set five passes to expire in exactly
7 days (10-12 11:31 AEDT). On 10-12 it ran at 11:20, nine minutes early, saw
nothing expired, and skipped them. The 13:00 sweep email then listed them.

Re-verified all six plus the Badrinath highway row (14 days old the next day).
Old rows: `data/backups/road-reports-before-2026-10-12.json` (local, untracked).

Worse than drift: four of the old rows said the passes "closed around 13 Sep 2026"
(the Tribune source is dated 2 Jan 2026) and that traffic was "normal by 17 Sep"
(the Amar Ujala piece reports snowfall and says nothing about traffic). Both claims
are gone.

| Row | Status | Basis |
|---|---|---|
| Keylong to Sarchu via Baralacha La | risky → **blocked** | Lahaul-Spiti Police restriction from Darcha, 11 Oct 2026 (ETV Bharat: 4x2 and two-wheelers barred; Amar Ujala: all vehicles) |
| Rishikesh to Joshimath (Badrinath) | blocked → **risky** | 27 Sep rockfall cleared the same day (Amar Ujala, 27 Sep 2026); no later blockage report found |
| Manali to Kaza via Kunzum La | risky | Snow reported 11 Oct (Amar Ujala); no order found for Kunzum; says so |
| Manali to Rohtang Pass | risky | Snow reported 11 Oct; permit figures re-read off rohtangpermits.hp.gov.in on 12 Oct |
| Sarchu to Leh via Tanglang La | risky | No Ladakh-side notice found; Baralacha restriction on the Manali side |
| Sonamarg to Zoji La | risky | J&K Traffic Police advisory for 12 Oct (as republished by JKAdworld): time-bound, cut-off 1:00 PM |
| Leh to Tso Moriri via Chumur | risky | Nothing found for 2026. Text hedged to say exactly that; unconfirmed specifics removed |

Region pages verified after revalidation (himachal-pradesh, uttarakhand,
jammu-kashmir, ladakh).

## 4. Changes so this does not recur

On main (no web build):
- `scripts/freshness-review.mjs recount`: after settling open items by hand, corrects
  the newest run row so the watchdog stops alerting the same day.
- `scripts/sos-recheck-unreachable.mjs` + a call from `sos-backlog-weekly.sh`: a
  weekly local second opinion on rows the cloud checker could not load. TLS stays strict.
- `ops/road-sweep/SKILL.md`: pull rows expiring within a day (not "already expired"),
  never set `expires_at` more than 6 days out, quote the dated sentence for every claim.
- `.claude/commands/freshness-review.md`: seasonality changes need an advisory in force
  and the exact sentence; read the year on every article; temporary closures use the
  field name `temporary_closure` and state only what the source states.

Parked on `parked/ops-email-honesty-2026-10-12` (ships with the next web push):
- watchdog: freshness-review past its fuse is described as open items, not "FAILING
  SILENTLY"; an unchanged list is emailed once, then left to the Monday digest.
- SOS: the fail streak restarts when a row first becomes unreachable; the subject no
  longer says "numbers changed at source" when none did.

## 5. Still open

- Nothing from section 1: the banner (section 6) shipped the same day and the
  hand-written prefix and suffix were stripped from October's month text.
- MP Tourism's certificate: if it is still expired in three weeks the SOS email will
  say so, correctly this time.
- Chinnar March/April scores (above).

## 6. Closure notice slot (built the same day, at the founder's request)

Number named before building: a temporary closure turned up in 1 of 4 weekly review
runs (about 164 pages checked), so roughly one a month. It will not move traffic.
Success is that the next one reaches the founder as one Approve click and takes itself
down, with no "cron health" email and no hand-edit to remember.

- Migration 113 (applied 2026-10-12, additive): `destinations.notice_text`,
  `notice_source_url`, `notice_posted_at`, `notice_expires_at`;
  `apply_destination_corrections()` now accepts the two notice fields, sets a 21-day
  life on post, and a null value takes the notice down.
  Tested in a rolled-back transaction: posts with a 21-day life and stamps the row;
  refuses a stale edit, a non-web source, any other field, and a too-short notice;
  takes a notice down cleanly.
- Life-cycle: approve (one click) → shown under the hero on the destination page and
  above it on the month page, with posted date and source link → the weekly review
  pulls the page to the front of its batch when the notice has 5 days left → the
  browser hides it on expiry and the daily watchdog clears it and revalidates.
- `scripts/freshness-review.mjs`: the reviewer sees any notice in force; `notice_text`
  is queueable (same limits as the DB constraint, official or named-news source that
  opens); re-proposing the same wording is a renewal; the source link is queued with it.
  Dry-run on three synthetic proposals: renewal queued, a too-short notice escalated,
  a travel-blog source escalated.
- Courtallam's notice is already in the slot (expires Mon 2 Nov 2026), invisible until
  the web change ships.
- Looked at before calling it done: 375px and 1440px screenshots of both page types,
  English and Hindi. First pass was hard to read over the hero photograph, so the
  destination-page version has its own dark ground; on the month page it moved from
  below the hero image to above it. No hydration errors on a clean dev server.

Shipped 2026-10-12 in 02ec4695 together with the email-wording change (one Vercel
build, founder's go-ahead). Verified live: banner present on /en and /hi
destination/courtallam and on /en/destination/courtallam/october; the hand-written
October notice is gone; sw.js at v66. The 22 Oct follow-up was cancelled, since the
weekly review's re-check and the 21-day expiry now do that job. Not yet seen running
in production: the watchdog's daily clear (first run 13 Oct 02:00 UTC).

## 7. Chinnar, March and April: evidence, then one notch up each

Kerala Tourism contradicts itself: the English page says "best time ... December to
April"; the Malayalam page says November and December are the most suitable months;
its eco-tourism page says "Trekking along the dry forests here in summer is almost
like walking through a desert country" and calls the heat extreme. The Week
(3 Jul 2025) describes a third-week-of-April 2025 stay at the log house in "scorching
heat", so the sanctuary was operating. No summer or fire-season trekking closure was
found for 2024 to 2026, but the Forest Department and Munnar Wildlife Division sites
could not be opened, so that is unchecked at source, not confirmed. No measured
temperatures were found; reanalysis (ERA5, modelled, ESTIMATED) puts mean daily highs
in the low visitor zone near 33–34C in March and 34–35C in April.

What that supports: our direction (hot, go early) matches three of four sources. Not
supported by anything opened: April's "Trails become dangerous past 9am", "wildlife
spotting futile", "Falls reduce to trickles", and the "skip" verdict at 2/10. March at
4/10 "wait" is harsher than any source.

Founder chose option A (one notch up each, unsupported lines out). Applied 2026-10-12;
old rows in `data/backups/chinnar-months-3-4-before-2026-10-12.json` (local, untracked).
- March 4/10 → 6/10, verdict stays "wait". April 2/10 "skip" → 4/10 "wait".
- `destinations.avoid_months` [3,4,5,6,7,8] → [4,5,6,7,8].
- Removed: "Trails become dangerous past 9am", "wildlife spotting futile", "Falls reduce
  to trickles", "hits dangerous heat", the falls-discharge fractions, the dated April
  thunderstorm claim, and the statement that the Forest Department restricts the
  Thoovanam trek to a 6am to 10am window "under safety rules". Kerala Tourism lists
  that trek as 8am to 2pm, about three hours, moderate, with no seasonal rule.
- note / why_go / why_not rewritten to what the sources say; the temperature is given
  as an estimate and labelled as one.
- Left alone and NOT verified: the rest of both month leads (squirrel population,
  sighting odds, room prices, sandalwood reserve hours). The same kind of unsourced
  specific runs through month prose across the catalogue; that is a separate job.
- Verified live: /en/destination/chinnar/march shows 6.0/10, /april shows 4.0/10, and
  none of the removed phrases remain on either page or the destination page.
