# Page-fix queue cleared 2026-10-29

Founder asked to review, approve and publish the 25 fixes in the 28 Oct approval email,
and to make the queue autonomous from the next run ("check twice and then approve if all looked good").

Method for every fix still pending (16; the other 9 had been approved by the founder on 28 Oct):
check 1 = an independent Sonnet verifier that opened every cited source itself;
check 2 = this session re-fetching the official pages and named news reports.
Only claims both checks confirmed were published.

## Cyclone Arnab notices

Cyclone Arnab crossed the Andhra Pradesh–Yanam coast on 28 Oct 2026, about 300 km south of
Gopalpur (DT Next, OdishaTV live blog, IMD bulletin as reported). Every queued or live notice
said "forecast to make landfall near Gopalpur on 28 Oct".

- Rejected (forecast already past or superseded): konark, puri, gopalpur-on-sea, chandipur, bhubaneswar, puducherry (its warning ran "through 26 Oct").
- Taken down (approved 28 Oct, now out of date, would have shown until 18 Nov): deomali, dhauli, raghurajpur, talasari, taptapani, vijayawada.
- Simlipal / Baripada: closure notice "until 1 November" now expires 2 Nov 00:00 IST instead of 18 Nov.

## The other 10

| Page | Outcome | What the checks found |
|---|---|---|
| kalimpong | applied as proposed; expires 6 Nov 00:00 IST | NH-10 Sevoke–Rangpo night closure 9 pm–6 am, phase 2 26 Oct–5 Nov (Voice of Sikkim, 4 Oct 2026) |
| aizawl | applied, corrected | portal ilp.mizoram.gov.in and "fee applies" confirmed (serchhip.nic.in); foreigners need PAP, not RAP (MHA reimposed the Protected Area Regime 17 Dec 2024: Business Standard / PTI) |
| dirang | applied, corrected | "Aadhaar required since May 2026" unsupported (cabinet approved guidelines only); Tezpur centre unsupported. Kept: eilp.arunachal.gov.in, tourist eILP up to 14 days, foreigners PAP/RAP (arunachaltourism.com/ilp) |
| dzukou-valley | applied, corrected | proposed portal eilp.nagaland.gov.in wrong (official is ilp.nagaland.gov.in); "free" wrong (₹200 domestic, 30 days: ilp.nagaland.gov.in/fees); PAP for foreigners confirmed |
| havelock-island, neil-island | applied, corrected | 2027 date in the proposal belongs to the 11 day-visit islands, not the 29 excluded islands; Havelock and Neil are among the 29 (Business Standard / PTI 2018 list); PRC exception kept |
| imphal | applied, corrected | "curfews through October" unsupported. Notice now states the 19 Oct ambush near the Imphal East–Kangpokpi border, 48-hour shutdown and tear-gas protests (The Week, Nagaland Post). Permit: portal and kiosks confirmed; ₹100 not confirmed on the portal, so no amount; foreigners PAP, not RAP |
| kavaratti | applied, corrected | proposed "Bangaram, Agatti and Thinnakara" contradicted: official lakshadweeptour.in lists Kadmat, Minicoy and Thinnakara for foreign tourists. PCC and sponsor removal confirmed on epermit.utl.gov.in |
| minicoy | applied, corrected | proposed "Foreigners cannot access Minicoy" contradicted by the same official page; "90–120 days ahead" unsupported |
| warangal | applied, corrected | no scheduled flights at Warangal confirmed; "~150 km" understated, now "about 165 km by road" |

Result: queue empty (53 applied, 21 rejected all-time). 32/32 en+hi pages PASS (`verify-touched-pages`).
The double check found an error in 9 of the 10 proposed wordings. The one-click email would have
published all of them.

## From the next run

`scripts/corrections-autoverify.mjs`, called by `scripts/freshness-review-weekly.sh` after the stamp
step. Dry-run tests on 2026-10-29: a true notice renewal was APPROVED (9/11 quotes machine-found on
the source); a false Havelock permit claim was REJECTED by both verifiers; two test changes that
dropped useful information were HELD by both. Two bugs found by those tests and fixed: the date gate
treated "since 5 July" as an end date, and verifier answers were not matched to items (long ids).
