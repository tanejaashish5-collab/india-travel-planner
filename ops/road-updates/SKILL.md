---
name: nakshiq-road-updates
description: Daily, autonomous, dated road-status log for Indian mountain and desert corridors. Finds today's verified closures, restrictions and reopenings per region, date-checks every source, and appends one sourced row per event to road_updates. This is the feed behind /road-conditions and the site's first citable data asset.
---

# NakshIQ Road Updates — Skill

`road_reports` is a snapshot (28 corridors, edited in place). `road_updates` is the
log: one row per dated, sourced event. The log is what a journalist or a forum
links to, so the rules below exist to keep every row defensible.

Runs on the Claude Max plan. **No metered API calls.**

**Runner (settled 2026-09-13): a LOCAL LaunchAgent, `com.nakshiq.road-updates`,
not a cloud routine.** The first cloud run proved the cloud sandbox can search
but cannot open a single news or government page (egress policy 403 on Tribune,
ANI, BRO, every state PWD), so it can never date-check a source. The local Mac
has the network. `scripts/road-updates-daily.sh` drives a headless `claude -p`
session with this skill; the session writes `rows.json` and the ONLY write path
into the database is `scripts/road-updates-insert.mjs`, which validates every
row (region, status, URL, source date within 3 days) and refuses the whole
file on any invalid row. The cloud routine `trig_01GE9q728KdmPCnkEy7ctxjs` is
kept disabled as a record.

## Scope: the 8 regions

himachal-pradesh · ladakh · jammu-kashmir · uttarakhand · sikkim ·
arunachal-pradesh · meghalaya · rajasthan (ids = `states.id`, and they are the
only values `road_updates.region_id` accepts). Corridors of interest per region are
listed in `apps/web/src/lib/road-updates.ts` (`ROAD_REGIONS[].blurb`) and in
`road_reports.segment`.

## Procedure (every run, ~09:00 IST)

1. **Collect candidates for the last 48 hours.** Dispatch at most **3 parallel
   Haiku agents** (founder rule), grouped: (a) HP + Uttarakhand, (b) Ladakh + J&K,
   (c) Sikkim + Arunachal + Meghalaya + Rajasthan. Sources, in priority order:
   - Issuing authorities: BRO Project Himank / Deepak / Vartak / Swastik notices,
     state PWD (hppwd.hp.gov.in, jkpcc.nic.in, pwd.uk.gov.in), district
     administration and DDMA/SDMA advisories, traffic police (jkpolice.gov.in
     National-Highway-Travel, Himachal police traffic), NHAI/NHIDCL.
   - Dated news from the last 48 h: The Tribune, Hindustan Times, ANI, PTI,
     Amar Ujala, Dainik Jagran, Greater Kashmir, Kashmir Observer, Sikkim
     Express, Arunachal Times, Shillong Times. Hindi sources are fine.
   Each agent returns rows: `region_id, segment, status, headline (≤120 chars,
   dated, plain), body (1-3 sentences: what, since when, who said it), source_url,
   source_label, source_published_at`.

2. **Date-check every source before you believe it.** This is the step that
   fails. Open the article, read its own dateline, confirm the year is the
   current year and the event is within 48 h. On 2026-08-04 a Tribune piece
   about an NH-5 night-closure order read as current and was from 31 Aug 2025;
   on 2026-08-24 a "death toll 25" Kinnaur landslide result was the 2021
   disaster. Any row whose source date cannot be confirmed is dropped, not
   hedged. A social post with no date is not a source.

3. **Status vocabulary** (the table's CHECK constraint): `open` (reopened after a
   closure, or authority confirms open), `slow` (one-way / convoy / long delays),
   `risky` (open but authority warns: landslide-prone, shooting stones, night ban
   lifted but caution), `restricted` (time windows, permits, vehicle-class bans,
   convoy-only), `blocked` (temporarily cut: landslide, snow, flood, expected to
   reopen), `closed` (seasonal or indefinite closure, pass shut). Pick one.

4. **Write `rows.json`, then run the insert script.** Shape:
   `{ "rows": [ {update_date, region_id, segment, status, headline, body,
   source_url, source_label, source_published_at} ], "run": {candidates,
   dropped_date_check, dropped_unsourced, note} }`. `update_date` is the IST
   date the condition applied (today or yesterday). Then
   `node --env-file=apps/web/.env.local scripts/road-updates-insert.mjs rows.json`.
   It inserts with duplicates ignored, mirrors the status onto the matching
   `road_reports` row so the snapshot agrees with the log, and logs
   `ops_reports`. If it REFUSES, fix the rows it names; never bypass it. A
   reopening is an entry too (`status = 'open'`): reopenings are half the value
   of the feed.

5. **No-news days are normal.** In a quiet week a region may get zero rows. Never
   invent an "all clear" entry to fill the day; the page already explains that
   no entry means no verified change. Do not log weather forecasts, only
   announced or reported road status.

6. **Zero rows is still a run.** Write `rows.json` with an empty `rows` array
   and a `run.note` saying what was searched, and run the insert script so
   `ops_reports` records the day. 0 rows for 7 consecutive days across ALL
   regions during Jun-Oct is a collection failure, not a quiet mountain.

7. Rendered-page check after a non-empty insert:
   `node scripts/verify-touched-pages.mjs --url /en/road-conditions`.

## Escalate by email (taneja.ashish5@gmail.com) only for

- A corridor moving to `closed` or `blocked` on a route with a live `road_reports`
  row that still says `open`, when you could not update the row.
- A source that has gone dark (authority site down 2 runs running).

Everything else is silent. A clean run sends no email.
