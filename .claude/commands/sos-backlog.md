---
description: Clear the emergency-SOS provenance backlog. Finds an official source page for every safety number that doesn't have one yet, confirms the digits literally appear there, and records it — so the weekly auto-verifier can re-confirm that number forever without a human. Also triages any number that vanished from its source.
argument-hint: "(no args)  ·  optional: --state=<state-slug> to scope to one state"
---

Clear the NakshIQ emergency-SOS backlog. **$ARGUMENTS**

Ashish never sees this run unless it finds something genuinely wrong. Do not ask him
anything. Do not send him a summary "for review". Finish the work.

## What this is

`emergency_sos` rows are re-verified every Monday by the `sos-auto-reverify` cron. That
cron is deliberately dumb: it fetches each number's recorded source page and checks the
digits are still printed there. It can only do that for numbers that HAVE a recorded
source, in `emergency_sos.source_map`.

Your job is the part a fetch loop can't do: **find the source page in the first place**,
and judge the rows where a number has gone missing. Everything you find becomes a
permanent `source_map` entry, so each number you source is one the robot handles alone
from then on. The backlog shrinks and never grows back.

## Non-negotiables

- **Never write a number you have not seen on a live official page.** Not one you inferred,
  not one an agent reported, not one that "looks right". This database is emergency contact
  data for travellers; a wrong number is worse than no number.
- **An agent's claim is not evidence.** Sub-agents in this repo have a documented history of
  confidently mis-flagging real numbers as fake and vice versa. Every URL a sub-agent returns
  gets re-fetched and re-matched by you before it is written.
- **Default to leaving data alone.** "Could not confirm" is a fine outcome and must never be
  converted into a change. Only replace a stored number when an official page lists a
  different number for the *same named facility* AND the stored one appears nowhere official.
- Acceptable sources: district `.nic.in` / `.gov.in`, state health / police / disaster-management
  departments, official hospital or medical-college sites. **Never** justdial, practo, sulekha,
  medindia, hospitalkhoj, indiacustomercare, news, blogs, or Wikipedia.

## Step 1 — Pull the backlog

```sql
select destination_id, auto_verify_status, auto_verify_note, source_url, source_map,
       local_police_station, nearest_hospital, rescue_contact, mountain_rescue
from emergency_sos
where auto_verify_status in ('needs_source','number_changed','source_unreachable')
order by case auto_verify_status
           when 'number_changed' then 0 when 'source_unreachable' then 1 else 2 end,
         destination_id;
```

`auto_verify_note` already names the exact numbers at issue. Work `number_changed` first —
that's a live safety signal. `needs_source` is routine backlog.

Dedupe by NUMBER, not by row: one hospital line is typically shared by 3–6 destinations, so
sourcing it once clears all of them.

## Step 2 — Discover (max 3 parallel Haiku agents, per the repo's max-3-parallel rule)

Split the distinct numbers into at most 3 batches. Give each agent the number, the facility
name, the district and the state, and an explicit OUTPUT CONTRACT returning JSON only:
`{"number","found":bool,"url","quote","tried":[...]}`. Tell each agent: *find the page that
prints this number — you are not being asked to judge whether the number is correct.*

NIC district sites are templated. Tell the agents to try these directly even when search
doesn't surface them:
`/public-utility/` · `/public-utility-category/hospitals/` · `/public-utility/<facility-slug>/`
· `/helpline/` · `/helpline-no/` · `/telephone-directory/` · `/disaster-management/` ·
`/health/` · and each of those under `/en/`.

## Step 3 — Confirm every candidate YOURSELF

For each `{number, url}` the agents return, fetch it and match with the same rules the cron
uses (`apps/web/src/lib/sos-verify.ts` — `extractPhones` + `numberMatchesPage`):

- extract phone-shaped tokens from the page, don't flatten the whole page to digits
  (flattening runs adjacent numbers together and invents matches)
- district pages frequently print the local part only — `Phone : 240581` for `04545-240581`
  — so compare on the last 8 digits, not just exact equality
- send a real browser User-Agent; several `.gov.in` hosts return nothing useful without one

Expect roughly a quarter of agent-supplied URLs to fail this check. That is the check
earning its keep — discard them, don't argue with them.

## Step 4 — Write

For each number you confirmed, merge into `source_map` on **every** row carrying it:

```sql
update emergency_sos e
set source_map = e.source_map || jsonb_build_object(
      '<digits>', jsonb_build_object('url','<url>','field','<field>','last_seen','<today>'))
where regexp_replace(coalesce(e.nearest_hospital,''),'\D','','g') like '%<digits>%'
   or regexp_replace(coalesce(e.rescue_contact,''),'\D','','g')   like '%<digits>%'
   or regexp_replace(coalesce(e.local_police_station,''),'\D','','g') like '%<digits>%';
```

Do **not** set `verified_date` here — let Monday's cron do that, so the stamp always means
"a fetch confirmed this", never "an agent said so".

For a `number_changed` row where you established the official number really did change:
update the field, record the new number's `source_map` entry, and note the old value in the
commit message. If you could not establish it, leave the row alone — it stays on the digest,
which is the correct outcome.

## Step 5 — Report

Commit any migration/script changes. Then write a short run note to
`data/audits/sos-backlog-<date>.md`: numbers sourced, numbers still unconfirmed and what was
tried, any number changed with before/after and the official page proving it.

Only escalate to Ashish if a stored emergency number turned out to be wrong on a live page —
that's the one case worth his attention. Otherwise finish silently.
