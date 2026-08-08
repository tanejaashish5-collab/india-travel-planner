# SOS backlog discovery: blocked by a WebFetch outage — nothing written

**Date:** 2026-08-02
**Trigger:** scheduled `/sos-backlog` run, 1h before the Monday `sos-auto-reverify` cron
**Outcome:** **0 numbers sourced. 0 rows changed.** Discovery ran; the mandatory personal-verification
step could not, because the fetch tool was down for the entire session. Per the non-negotiable
"never write a number you haven't personally seen on a live page" rule, that means nothing gets
written this run — a blocked verification step is not a substitute for one that passed.

## What happened

Backlog pulled per `.claude/commands/sos-backlog.md`: 293 `needs_source` rows, 239 distinct
numbers after excluding the 3 known dead ends (`03803-222253`, `04545-240581`, `04172-232538` —
not re-attempted, per standing instruction). `number_changed` and `source_unreachable` were both
empty this week, so there was no live safety signal to triage — pure backlog work.

Dispatched round 1: 3 parallel Haiku discovery agents (the repo's max), 20 numbers each, numbers
0–59 of the sorted backlog. All 3 returned — see candidate table below.

Before touching round 2, I went to do the required independent re-fetch of the candidates myself
and hit `HTTP 403` on every single URL, including the westkameng.nic.in / tawang.nic.in ones the
agents themselves reported as fetched. That's the "1 in 4 fails" pattern the skill warns about,
except total, so I widened the check to control URLs with no reason to fail:

| URL | Result |
|---|---|
| `https://cgpolice.gov.in/important-telephone-numbers` | 403 |
| `https://vaishali.nic.in/disaster-management/` | 403 |
| `https://police.ddd.gov.in/helpline/daman-police-control-room/` | 403 |
| `https://budgam.nic.in/public-utility-category/hospitals/` | 403 |
| `https://en.wikipedia.org/wiki/India` | 403 |
| `https://www.wikipedia.org/` | 403 |
| `https://example.com` | 403 |

`example.com` failing rules out a `.gov.in`/geo-block explanation — WebFetch itself was non-functional
for the whole session, on any host. Confirmed it wasn't the org egress proxy either: `$HTTPS_PROXY/__agentproxy/status`
shows Bash/curl attempts logged as `connect_rejected` (proxy-side policy denials), which is a
different failure signature from WebFetch's 403s (real HTTP responses from the destination, via
WebFetch's own fetch path — separate infra from the local proxy). `WebSearch` worked normally
throughout, which is how the discovery agents produced candidates at all — several of them noted
in their own output that they could not fetch pages either and were reporting from search snippets,
which is explicitly not permitted as evidence.

No MCP-provided fetch alternative was available (checked `ToolSearch` for `fetch url html page
content` — only `WebFetch` itself, Supabase, GitHub, and design-sync tools are connected this
session, none of which fetch arbitrary URLs).

**Decision:** with the one tool capable of independent verification down, continuing to round 2/3/4
would only have produced more unverifiable candidates. Stopped after round 1 rather than manufacture
false progress. No `source_map` writes, no `emergency_sos` writes — the database is untouched.

## Candidates for next run (UNVERIFIED — do not write without a personal re-fetch)

Round 1 covered numbers 0–59 (Andaman & Nicobar Islands, Andhra Pradesh, Arunachal Pradesh, Assam,
Bihar, Chandigarh, Chhattisgarh, Daman & Diu, Goa, and part of Gujarat). 52 of 56 attempts came back
`found: true` with a candidate URL + quote; these are agent claims only, unconfirmed by direct fetch.
4 came back `found: false` (no acceptable source located): `03192232102`, `08772236007`,
`18004253077`, and — separately — `03780242703` could not be independently distinguished from its
sibling `03780242707` on the ITBP Dirang line.

The next run should start by re-fetching these 52 URLs (once WebFetch is confirmed working — try a
control URL like `example.com` first) before spending agent budget on rediscovery, then resume
discovery at number 60 of the sorted, dead-end-excluded backlog.

| number | candidate URL | candidate quote (unverified) |
|---|---|---|
| 03192238881 | https://northmiddle.andaman.nic.in/ddm-control-room/ | "EOC phone number is 03192-262960. Additional phone numbers for the EOC are 1070, 273138, 262960, 273537 (F)..." |
| 03192239247 | https://police.andaman.gov.in/index.php/en/public-information/emergency-helpline-numbers.html | "Marine Police Control Room in Andaman can be reached at 03192 - 239247" |
| 03192262960 | https://northmiddle.andaman.nic.in/ddm-control-room/ | "The EOC phone number is 03192-262960..." |
| 08912501233 | https://visakhapatnam.ap.gov.in/district-helpline/covid19-call-center/ | "COVID19 Control Room for Visakhapatnam district... 08912501233, 08912501244, 08912501255" |
| 03780242707 | https://westkameng.nic.in/helpline/ | "ITBP Commandant Dirang: 03780-242707 / 03780-242703" |
| 03794222221 | https://tawang.nic.in/helpline/ | "Tawang DC Control Room: 03794-222221" |
| 9436238317 | https://shiyomi.nic.in/police/ | "SP (Superintendent of Police) for Shi Yomi District - mobile number 9436238317" |
| 03780242221 | https://westkameng.nic.in/helpline/ | "Addl. Deputy Commissioner, Dirang: 03780-242221" |
| 03782222021 | https://westkameng.nic.in/helpline/ | "West Kameng District Control Room: 03782-222136 / 03782-222021 / 03782-222036" |
| 03782222036 | https://westkameng.nic.in/helpline/ | (same line as above) |
| 03782222136 | https://westkameng.nic.in/helpline/ | (same line as above) |
| 03783222252 | https://arunpol.nic.in/districts/westsiang.html | "West Siang District Police Control Room: 03783222252" |
| 03794224432 | https://tawang.nic.in/public-utility/district-hospital-tawangkhan-drowa-zangmo-tawang/ | "District Hospital Tawang contact number is 03794-224432" |
| 03807222227 | https://changlang.nic.in/police/ | "Miao Police Station in Changlang District" (STD 03807) |
| 7641840788 | https://lowersubansiri.nic.in/ | "Fire Service Ziro contact number +91-7641840788" |
| 8730848380 | https://lowersubansiri.nic.in/ | "Fire Service Ziro contact number +91-8730848380" |
| 9402278747 | https://shiyomi.nic.in/police/ | "Deputy SP Shi Yomi: 9402278747" |
| 9436229607 | https://arunachalpradesh.gov.in/ | "ADC Miao mobile: 9436229607" — weak, state homepage not a facility page; re-verify domain before trusting |
| 03665236085 | https://barpeta.assam.gov.in/all-helplines-numbers | "Barpeta Disaster Management helpline: 03665-236085" |
| 03672283463 | https://forest.assam.gov.in/portlets/national-park | "Range Officer Bagori (Western) 03672-283463" |
| 03673236324 | https://dimahasao.assam.gov.in/departments/ddma-district-disaster-management-authority | "Dima Hasao Disaster Management Authority: 03673-236324" |
| 03776262428 | https://forest.assam.gov.in/portlets/national-park | "Range Officer Kohora 03776-262428" |
| 03776268007 | https://forest.assam.gov.in/portlets/national-park | "DFO Eastern Assam Wildlife Division 03776-268007" |
| 03776268095 | https://forest.assam.gov.in/portlets/national-park | "Park Director Kaziranga: 03776-268095" |
| 8486280037 | https://sivasagar.assam.gov.in/ | "SDRF Sivasagar: 8486280037" |
| 06224260220 | https://vaishali.nic.in/disaster-management/ | "Vaishali District Disaster Management Control Room: 06224-260220" |
| 06312222900 | https://gaya.nic.in/district-contact-directory/ | "Gaya District Magistrate (Collectorate): 0631-2222900" |
| 01722749194 | https://chandigarh.gov.in/sites/default/files/updation2024/tele24-dprdirect.pdf | "Chandigarh Police PCR: 0172-2749194" |
| 07723223305 | https://cgpolice.gov.in/important-telephone-numbers | "Mahasamund District Disaster Control Room: 07723-223305" |
| 07727222102 | https://cgpolice.gov.in/important-telephone-numbers | "Balodabazar Police Control Room: 07727-222102" |
| 07782222170 | https://cgpolice.gov.in/important-telephone-numbers | "Bastar Police Control Room: 07782-222170" |
| 02602220444 | https://police.ddd.gov.in/helpline/daman-police-control-room/ | "Daman Police Control Room: 0260-2220444" |
| 08322229701 | https://forest.goa.gov.in/node/1187 | "Deputy Conservator of Forest, Wildlife and Eco-tourism (North), phone 0832-2229701" |
| 08322428400 | https://www.goa.gov.in/wp-content/uploads/2016/05/OfficerTelNos.pdf | "State Police Control Room, Panaji - Office: 2428400" |
| 08322750246 | https://forest.goa.gov.in/ | "South Goa wildlife rescue helpline: 0832-2750246" |
| 08322794100 | https://southgoa.nic.in/ | "South Goa Collectorate Control Room - Citizen's Helpline: 0832-2794100" |
| 7875756000 | https://www.goa.gov.in/wp-content/uploads/2020/10/GP-telephone-directory-30-Sept-2020.pdf | "Goa Police Control Room mobile number: 7875756000" |
| 02631220201 | https://dangs.nic.in/contact-us/ | "District Collector Office, Dang-Ahwa, Gujarat, phone +91 02631 220201" |
| 02640224001 | https://narmada.nic.in/helpline/ | "District Emergency Response Centre: 02640-224001" |
| 026721077 | https://panchmahals.nic.in/helpline/ | "Panchmahal District Helpline: +91 2672 1077" |
| 02681077 | https://kheda.nic.in/helpline/ | "District Emergency Response Center: +91 268 1077" |
| 027661077 | https://patan.nic.in/helpline/ | "District Helpline: +91 2766 1077" |
| 02781077 | https://bhavnagar.nic.in/helpline/ | "Bhavnagar District Helpline: +91 278 1077" |
| 02811077 | https://rajkot.nic.in/helpline/ | "District EOCs Helpline No.: +91 281 1077" |
| 02812471573 | https://rajkot.nic.in/helpline/ | "District Helpline Call: +91 281 2471573" |
| 028321077 | https://kachchh.nic.in/helpline/ | "Kachchh District Helpline Call: +91 2832 1077" |
| 028322231733 | https://kachchh.nic.in/disaster-management/ | "Kachchh District Disaster Management contact available at 02832-2231733" |
| 028331077 | https://devbhumidwarka.nic.in/helpline/ | "Devbhumi Dwarka District Helpline: 02833 1077" |
| 02852633446 | https://junagadh.nic.in/helpline/ | "Junagadh District Helpline: 0285-2633446" |
| 02861077 | https://porbandar.nic.in/helpline/ | "Porbandar District Emergencies Helpline: +91 286 1077" |
| 028761077 | https://girsomnath.nic.in/helpline/ | "Gir Somnath district 24x7 disaster helpline: 02876-1077" |
| 02882553404 | https://jamnagar.nic.in/helpline/ | "Jamnagar District Disaster Management control room: 0288-2553404" |

`found: false` this round, no acceptable source located by any agent: `03192232102` (Chidiya Tapu
ambulance), `08772236007` and `18004253077` (Tirupati Collectorate Control Room, both forms of the
same number), and `03780242703` (ITBP Dirang — a candidate exists but couldn't be pinned to this
number specifically vs. its sibling `03780242707`).

## Numbers

| | |
|---|---|
| `needs_source` rows in backlog | 293 |
| Distinct numbers (after dedup, dead-ends excluded) | 239 |
| `number_changed` / `source_unreachable` this week | 0 / 0 |
| Numbers where a discovery agent proposed a candidate | 52 |
| Numbers independently verified and written | **0** |
| Rows changed | **0** |
| Backlog remaining | 293 (unchanged) |

## Recommendation

Re-run `/sos-backlog` once WebFetch is confirmed working again (check with a control URL first).
The round-1 candidate table above should let that run skip straight to verification for ~50 numbers
before resuming discovery at number 60.
