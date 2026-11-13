# Freshness Review — 2026-11-14

Batch: 41 destinations · Wave 1: 6 Sonnet sub-agents (chunks of ≤7) · Wave 2: 3 Sonnet sub-agents (source re-research for 19 dropped entries) · Validator: `freshness-review.mjs apply` — no `--commit`

**Final:** confirmed=27 · corrections=14 · skipped=0

---

## Destination table

| id | verdict | sources | what was checked |
|---|---|---|---|
| adilabad | confirmed | deccanchronicle.com · wildlifenavigator.com | Access, Kawal Tiger Reserve season, HYD airport, Adilabad railway — no closures in 90 days |
| basara | confirmed (notice renewal) | thehansindia.com · deccanchronicle.com | Notice expires 2026-11-18; Sweekaram ritual (1 Nov) confirms reconstruction underway, garbhagriha still closed, Balalayam darshan continues |
| chaukori | confirmed | pithoragarh.nic.in · uttarakhandtourism.gov.in | Road access, no disasters in 90 days, Pantnagar airport and Kathgodam railhead unchanged |
| chopta | needs_correction | uttarakhandtourism.gov.in · freepressjournal.in | Tungnath Temple closed for winter from 6 Nov 2026; idol moved to Makkumath; trek trail remains open → notice_text queued |
| daringbadi | confirmed | odishatourism.gov.in · ommcomnews.com | Cyclone Arnab Gajalbadi Ghat road restriction (light vehicles only since 7 Nov) confirmed by regional outlets only — not in NEWS_HOSTS, cannot queue; BBI airport and Berhampur railhead unaffected |
| dudhsagar-falls | confirmed | dip.goa.gov.in · dudhsagarwaterfallsgoa.com | Jeep safari reopened 4 Oct 2026, online booking active, 8AM-3PM gate hours; no active closure orders |
| hanle | confirmed | leh.nic.in · discoverwithdheeraj.com | In avoid_months (Nov); permit_type: none maintained (Ladakh EDF is an environmental fee, not border-area ILP/PAP per schema); no source change to PAP status |
| imphal | needs_correction | eastmojo.com · tribuneindia.com | Four civilians killed in NH-202 ambush 13 Nov 2026; curfew across 7 Manipur districts; notice updated to Nov 13 escalation |
| jaisalmer | needs_correction | freepressjournal.in · etvbharat.com | Forest Dept night ban on Sam/Kanoi dunes from 13 Oct 2026; India-Pakistan border belt night restriction until 30 Nov 2026 → notice_text queued |
| jibhi | confirmed | himachaltourism.gov.in · jibhi.in | Aut-Banjar-Jibhi road open in Nov; all 2026 NH5 landslides in Kinnaur (different highway) |
| jodhpur | confirmed | aninews.in · offbeatpeak.com | New Jodhpur Airport terminal opened 4 Jul 2026 (PM Modi inauguration); all airlines operating from new terminal; Mehrangarh Fort open |
| kalpa | confirmed | tribuneindia.com · travelcoffee.in | NH-5 Kinnaur closures Jul-Sep all cleared; no November closure; avoid_months accurate |
| kaza | confirmed | tribuneindia.com · himtrails.in | Kunzum Pass (Manali side) closes Oct/Nov; Shimla-Kinnaur route accessible in Nov |
| khonoma | needs_correction | newsonair.gov.in · ilp.nagaland.gov.in | MHA reinstated PAP for foreign nationals from Dec 2024; online-only ILP since Jan 2025; permit_required updated |
| kullu | needs_correction | tribuneindia.com (×2) | Direct Delhi-Bhuntar flights suspended after 24 Oct 2026 (Alliance Air sole operator) → notice_text queued |
| leh | confirmed | happyfares.in · etvbharat.com | Kushok Bakula Airport year-round; Manali-Leh highway closes ~Nov 20 (consistent with avoid_months) |
| loktak-lake | needs_correction | manipurilponline.mn.gov.in · northeastindiaconnect.com | Old domain manipurilp.nic.in replaced by manipurilponline.mn.gov.in; kiosks at Imphal Airport, Mao Gate, Jiribam |
| machilipatnam | needs_correction | thehansindia.com · aninews.in | Cyclone Murasu 3 Nov 2026: 1,302 km AP roads damaged; VGA airport resumed ~10 Nov; local roads may still be affected → notice_text queued |
| manali | needs_correction | tribuneindia.com (×2) | Direct Delhi-Bhuntar flights suspended after 24 Oct 2026; limited weekly connections until at least Mar 2027 → notice_text queued |
| mathura | confirmed | uptourism.gov.in · vrindavanmathuraguide.com | Agra airport (AGR) operational (IndiGo active 13-14 Nov); all temples open with standard timings |
| medak | confirmed | telanganatourism.gov.in · wikipedia | Cathedral open daily 6AM-6PM; HYD airport and Medak railway unchanged |
| moreh | needs_correction | tribuneindia.com · manipurilponline.mn.gov.in | NH-102 contested, Kuki-Zomi blockades ongoing; India-Myanmar border crossing closed; US Level 4 → notice_text queued |
| morgaon | needs_correction | maharashtratourism.gov.in · trainspy.com | Nearest airport null — Maharashtra Tourism cites Pune ~80km → queued; railhead not corrected (no official source) |
| nagarjuna-sagar | confirmed | telanganatourism.gov.in · trawell.in | Museum open (closed Fridays); boat service active; dam levels normal |
| nubra-valley | confirmed | leh.nic.in · travelcoffee.in | Khardung La closes Nov-Apr; in avoid_months; permit_type: none (EDF, not border-area permit) |
| old-goa | confirmed | wikipedia (Dabolim Airport) · goatourism.gov.in | Dabolim ~25km correct (closer than Mopa ~41km); Basilica and Se Cathedral open; Karmali station unchanged |
| pangong-lake | confirmed | leh.nic.in · travelcoffee.in | Chang La closes Nov; in avoid_months; ILP abolished 2021 for Indians, EDF not in border-permit schema |
| satara | confirmed | satara.gov.in · punenow.com | Satara railway on Pune-Miraj line; Pune airport normal; Kas Plateau season closed Oct 19 (seasonal) |
| shnongpdeng | confirmed | eastmojo.com · theshillongtimes.com | Jun 2026 Shillong-Dawki landslide confirmed reopened Aug 2026; Nov is peak clarity season |
| solan | confirmed | tribuneindia.com · amarujala.com | Diwali-period restriction on Solan Mall Road only (local street, not NH5); no highway closure |
| tamenglong | needs_correction | eastmojo.com · tribuneindia.com | Convoy-only travel advisory active; 4 killed in Manipur ambush 13 Nov 2026; curfew across districts → notice_text queued |
| tawang | needs_correction | eilp.arunachal.gov.in · northeasttourspackages.in | Sela Tunnel open; active ILP portal URL corrected from generic description to eilp.arunachal.gov.in |
| tirthan-valley | needs_correction | tribuneindia.com (×2) | Direct Delhi-Bhuntar flights suspended after 24 Oct 2026 → notice_text queued (same text as kullu/manali) |
| tso-moriri | confirmed | leh.nic.in · discoverwithdheeraj.com | Taglang La closes Nov-Apr; in avoid_months; permit_type: none maintained |
| tsomgo-lake | confirmed | sikkimtourism.gov.in · gangtokian.com | PAP still required via registered Gangtok operator; Nov accessible; permit_lead_days 30 noted but cannot correct without official source |
| turtuk | confirmed | leh.nic.in · discoverwithdheeraj.com | Road via Khardung La closes Nov-May; in avoid_months; nearest_airport null — Leh ~205km but no official distance source |
| udaipur | confirmed | tourism.rajasthan.gov.in · udaipurtourism.co.in | Maharana Pratap Airport operational; City Palace and Lake Pichola open; no disruptions |
| ujjain | confirmed | ujjain.nic.in · tribuneindia.com | Mahakal Lok Corridor operational; sanctum access ban for non-priests is a standing 2023+ policy (not a new change) |
| ukhrul | needs_correction | eastmojo.com · sentinelassam.com | Four civilians killed on NH-202 (Imphal-Ukhrul) 13 Nov 2026; main highway severely disrupted; 7-hour alternative routes → notice_text queued |
| varanasi | confirmed | varanasi.nic.in · aninews.in | LBS International Airport fully operational; KVT Corridor open; Namo Ghat IAF show closure (Oct 16-26) has ended |
| zanskar | confirmed | kargil.nic.in · tribuneindia.com | Pensi La closes Oct/Nov (consistent with avoid_months); Zanskar new district (27 Apr 2026) administrative only; Chadar Trek Jan 2026 suspension was temporary and resolved |

---

## Corrections

### 1. basara — notice_text renewal
- **current:** "The main sanctum (garbhagriha) of Gnana Saraswati Temple has been closed since 5 July 2026 for a Rs 354-crore redevelopment expected to take about two years. Darshan continues at the temporary Balalayam on site."
- **proposed:** same (renewal for 21 days)
- **source:** https://www.thehansindia.com/news/cities/adilabad/ritual-marks-beginning-of-gnana-saraswati-temple-reconstruction-at-basara-1138003 — "reconstruction formally commenced with the Sweekaram ritual" (1 Nov 2026, within 3 weeks)

### 2. imphal — notice_text
- **current:** "Three people were killed in an ambush near the Imphal East-Kangpokpi border on 19 Oct 2026..."
- **proposed:** "Four civilians were killed in a militant ambush on the Imphal-Ukhrul highway (NH-202) on 13 Nov 2026; curfew was imposed across seven Manipur districts and internet services suspended for two days. The UK and US advise against all but essential travel to Manipur. Check the security situation before travel."
- **source:** https://eastmojo.com/manipur/2026/11/13/manipur-four-including-mother-and-son-killed-in-nh-202-ambush/ — "four killed in NH-202 ambush 13 Nov 2026"

### 3. loktak-lake — permit_required
- **current:** "Inner Line Permit (ILP) required for all Indian citizens (Manipur entry). Apply online at manipurilp.nic.in — free."
- **proposed:** "Inner Line Permit (ILP) required for all Indian citizens from outside Manipur. Apply online at manipurilponline.mn.gov.in or at self-service kiosks at Imphal Airport, Mao Gate and Jiribam Gate — free."
- **source:** https://manipurilponline.mn.gov.in/ — confirmed active official Manipur ILP portal (mn.gov.in)

### 4. tawang — permit_required
- **current:** "Inner Line Permit (ILP) MANDATORY for all Indian citizens and foreigners. Apply online via Arunachal Pradesh government portal or get at Guwahati/Tezpur facilitation centers. Process takes 24-48 hours."
- **proposed:** "Inner Line Permit (ILP) MANDATORY for all Indian citizens and foreigners. Apply online at eilp.arunachal.gov.in (official Government of Arunachal Pradesh portal) or at facilitation centres in Guwahati and Tezpur. Online processing takes 24-72 hours on working days."
- **source:** https://eilp.arunachal.gov.in/ — "Developed by Dept. of Information Technology and Communication, Government of Arunachal Pradesh. Launched for State wide roll out w.e.f. 17th November 2022"

### 5. tirthan-valley — notice_text (new)
- **current:** null
- **proposed:** "Direct Delhi flights to Bhuntar (Kullu-Manali) airport suspended after 24 Oct 2026; only limited weekly connections remain. Most travellers arriving from Delhi must connect via Chandigarh or drive from Delhi."
- **source:** https://www.tribuneindia.com/news/himachal/direct-delhi-kullu-flights-suspended-after-october-24/ — "Alliance Air, the sole operator at Bhuntar's Kullu-Manali airport, has suspended its direct flight operations between Delhi and Kullu after October 24"

### 6. ukhrul — notice_text (new)
- **current:** null
- **proposed:** "Four civilians were killed in a militant ambush on NH-202 (Imphal-Ukhrul highway) on 13 Nov 2026. The US, UK and Australian governments advise against travel to Manipur. Travel to Ukhrul is not recommended at this time."
- **source:** https://eastmojo.com/manipur/2026/11/13/manipur-four-including-mother-and-son-killed-in-nh-202-ambush/ — "four civilians killed in NH-202 ambush 13 Nov 2026"

### 7. khonoma — permit_required
- **current:** "ILP (Inner Line Permit) required for Nagaland — apply online at ilp.nagaland.gov.in or at Dimapur/Kohima checkpost."
- **proposed:** "ILP (Inner Line Permit) required for Indian citizens — apply online at ilp.nagaland.gov.in (offline applications no longer accepted since Jan 2025). Foreign nationals require a Protected Area Permit (PAP) reinstated by MHA from December 2024."
- **source:** https://www.newsonair.gov.in/mandatory-protected-area-permit-required-for-foreign-visitors-to-nagaland — "Protected Area Permit mandatory for foreign visitors to Nagaland"

### 8. kullu — notice_text (new)
- **current:** null
- **proposed:** "Direct Delhi flights to Bhuntar (Kullu-Manali) airport suspended after 24 Oct 2026; only limited weekly connections remain. Most travellers arriving from Delhi must connect via Chandigarh or drive from Delhi."
- **source:** https://www.tribuneindia.com/news/himachal/direct-delhi-kullu-flights-suspended-after-october-24/ — "Alliance Air, the sole operator at Bhuntar's Kullu-Manali airport, has suspended its direct flight operations between Delhi and Kullu after October 24"

### 9. moreh — notice_text (new)
- **current:** null
- **proposed:** "Manipur is under active ethnic conflict (2023-ongoing). The Imphal-Moreh highway is contested and subject to blockades; the India-Myanmar border crossing at Moreh is closed. The US and UK governments advise against travel to Manipur."
- **source:** https://www.tribuneindia.com/news/nation/manipur-on-edge-as-violence-erupts-near-myanmar-border-529243 — "Manipur on edge as violence erupts near Myanmar border"

### 10. morgaon — nearest_airport
- **current:** null
- **proposed:** "Pune Airport (PNQ) — 80km"
- **source:** https://maharashtratourism.gov.in/ashtavinayak/morgaon/ — Maharashtra Tourism official page listing Pune as nearest airport

### 11. tamenglong — notice_text (new)
- **current:** null
- **proposed:** "Manipur is under active ethnic conflict (2023-ongoing). The Imphal-Tamenglong road passes through conflict-affected territory; the US and UK governments advise against travel to Manipur. Contact Tamenglong district police before attempting this route."
- **source:** https://eastmojo.com/manipur/2026/11/13/manipur-four-including-mother-and-son-killed-in-nh-202-ambush/ — "four killed in Manipur ambush 13 Nov 2026"

### 12. chopta — notice_text (new)
- **current:** null
- **proposed:** "Tungnath Temple (3,680 m) closed for winter from 6 November 2026; the deity idol has moved to Makkumath. The Chopta and Chandrashila summit trek trails remain open."
- **source:** https://www.freepressjournal.in/lifestyle/worlds-highest-shiva-temple-tungnath-closes-for-winter-heres-where-devotees-can-seek-darshan — "doors officially closed...on Friday, November 6, 2026; idol of Baba Tungnath is moved to Makkumath village"

### 13. jaisalmer — notice_text (new)
- **current:** null
- **proposed:** "Forest Dept ban from 13 Oct 2026: no entry to Sam and Kanoi sand dunes after sunset (no night camel safaris or jeep runs; daytime and desert camps unaffected). Night movement in the 5-km India-Pakistan border belt restricted 6 PM–7 AM until 30 Nov 2026."
- **source:** https://www.freepressjournal.in/india/jaisalmers-sam-sand-dunes-face-night-tourism-ban-as-forest-department-restricts-entry-camel-safaris-after-sunset — "Forest Department restricts entry, camel safaris after sunset"; https://www.etvbharat.com/en/state/night-movement-restricted-along-indo-pak-border-till-nov-30-says-jaisalmer-administration-enn26072808361 — "night movement restricted along Indo-Pak border till Nov 30"

### 14. machilipatnam — notice_text (new)
- **current:** null
- **proposed:** "Cyclone Murasu (3 Nov 2026) damaged roads and caused power outages across coastal Andhra Pradesh. Vijayawada airport resumed normal operations from 10 Nov. Some local roads may still be affected; check conditions before travel."
- **source:** https://www.thehansindia.com/news/cities/amaravati/cyclone-murasu-batters-coastal-ap-1138993 — "Cyclone Murasu batters coastal AP, 1,302 km of roads damaged"

### 15. manali — notice_text (new)
- **current:** null
- **proposed:** "Direct Delhi flights to Bhuntar (Kullu-Manali) airport suspended after 24 Oct 2026; only limited weekly connections remain. Most travellers arriving from Delhi must connect via Chandigarh or drive from Delhi."
- **source:** https://www.tribuneindia.com/news/himachal/direct-delhi-kullu-flights-suspended-after-october-24/ — "Alliance Air has suspended its direct flight operations between Delhi and Kullu after October 24"

---

## Notes on daringbadi road restriction (not queued)
Cyclone Arnab (27 Oct 2026) damaged Gajalbadi Ghat road; Kandhamal Collector restricted it to light vehicles only from 7 Nov 2026 (heavy vehicles still banned). Confirmed by ommcomnews.com and odishabytes.com — both are regional Odisha outlets not in NEWS_HOSTS. No coverage found in qualifying national outlets. Cannot queue without an authoritative or named-news source; logged here for manual review if a qualifying source becomes available.

## Wrapper outcome

```
queued imphal: notice_text "Three people were killed in an ambush near the Imphal East-Kangpokpi border on 19 Oct 2026, followed by a 48-hour shutdown and protests in Imphal where police used tear gas. Check the current security situation before travel." → "Four civilians were killed in a militant ambush on the Imphal-Ukhrul highway (NH-202) on 13 Nov 2026; curfew was imposed across seven Manipur districts and internet services suspended for two days. The UK and US advise against all but essential travel to Manipur. Check the security situation before travel."; notice_source_url "https://www.theweek.in/news/india/2026/10/19/manipur-violence-angry-protesters-leave-bodies-outside-cms-residence-after-militants-kill-two-men.html" → "https://eastmojo.com/manipur/2026/11/13/manipur-four-including-mother-and-son-killed-in-nh-202-ambush/"
queued loktak-lake: permit_required "Inner Line Permit (ILP) required for all Indian citizens (Manipur entry). Apply online at manipurilp.nic.in — free." → "Inner Line Permit (ILP) required for all Indian citizens from outside Manipur. Apply online at manipurilponline.mn.gov.in or at self-service kiosks at Imphal Airport, Mao Gate and Jiribam Gate — free."
queued tawang: permit_required "Inner Line Permit (ILP) MANDATORY for all Indian citizens and foreigners. Apply online via Arunachal Pradesh government portal or get at Guwahati/Tezpur facilitation centers. Process takes 24-48 hours." → "Inner Line Permit (ILP) MANDATORY for all Indian citizens and foreigners. Apply online at eilp.arunachal.gov.in (official Government of Arunachal Pradesh portal) or at facilitation centres in Guwahati and Tezpur. Online processing takes 24-72 hours on working days."
queued tirthan-valley: notice_text null → "Direct Delhi flights to Bhuntar (Kullu-Manali) airport suspended after 24 Oct 2026; only limited weekly connections remain. Most travellers arriving from Delhi must connect via Chandigarh or drive from Delhi."; notice_source_url null → "https://www.tribuneindia.com/news/himachal/direct-delhi-kullu-flights-suspended-after-october-24/"
queued ukhrul: notice_text null → "Four civilians were killed in a militant ambush on NH-202 (Imphal-Ukhrul highway) on 13 Nov 2026. The US, UK and Australian governments advise against travel to Manipur. Travel to Ukhrul is not recommended at this time."; notice_source_url null → "https://eastmojo.com/manipur/2026/11/13/manipur-four-including-mother-and-son-killed-in-nh-202-ambush/"
queued khonoma: permit_required "ILP (Inner Line Permit) required for Nagaland — apply online at ilp.nagaland.gov.in or at Dimapur/Kohima checkpost." → "ILP (Inner Line Permit) required for Indian citizens — apply online at ilp.nagaland.gov.in (offline applications no longer accepted since Jan 2025). Foreign nationals require a Protected Area Permit (PAP) reinstated by MHA from December 2024."
queued kullu: notice_text null → "Direct Delhi flights to Bhuntar (Kullu-Manali) airport suspended after 24 Oct 2026; only limited weekly connections remain. Most travellers arriving from Delhi must connect via Chandigarh or drive from Delhi."; notice_source_url null → "https://www.tribuneindia.com/news/himachal/direct-delhi-kullu-flights-suspended-after-october-24/"
queued moreh: notice_text null → "Manipur is under active ethnic conflict (2023-ongoing). The Imphal-Moreh highway is contested and subject to blockades; the India-Myanmar border crossing at Moreh is closed. The US and UK governments advise against travel to Manipur."; notice_source_url null → "https://www.tribuneindia.com/news/nation/manipur-on-edge-as-violence-erupts-near-myanmar-border-529243"
queued morgaon: nearest_airport null → "Pune Airport (PNQ) — 80km"
queued tamenglong: notice_text null → "Manipur is under active ethnic conflict (2023-ongoing). The Imphal-Tamenglong road passes through conflict-affected territory; the US and UK governments advise against travel to Manipur. Contact Tamenglong district police before attempting this route."; notice_source_url null → "https://eastmojo.com/manipur/2026/11/13/manipur-four-including-mother-and-son-killed-in-nh-202-ambush/"
queued chopta: notice_text null → "Tungnath Temple (3,680 m) closed for winter from 6 November 2026; the deity idol has moved to Makkumath. The Chopta and Chandrashila summit trek trails remain open."; notice_source_url null → "https://www.freepressjournal.in/lifestyle/worlds-highest-shiva-temple-tungnath-closes-for-winter-heres-where-devotees-can-seek-darshan"
queued jaisalmer: notice_text null → "Forest Dept ban from 13 Oct 2026: no entry to Sam and Kanoi sand dunes after sunset (no night camel safaris or jeep runs; daytime and desert camps unaffected). Night movement in the 5-km India-Pakistan border belt restricted 6 PM–7 AM until 30 Nov 2026."; notice_source_url null → "https://www.freepressjournal.in/india/jaisalmers-sam-sand-dunes-face-night-tourism-ban-as-forest-department-restricts-entry-camel-safaris-after-sunset"
queued machilipatnam: notice_text null → "Cyclone Murasu (3 Nov 2026) damaged roads and caused power outages across coastal Andhra Pradesh. Vijayawada airport resumed normal operations from 10 Nov. Some local roads may still be affected; check conditions before travel."; notice_source_url null → "https://www.thehansindia.com/news/cities/amaravati/cyclone-murasu-batters-coastal-ap-1138993"
queued manali: notice_text null → "Direct Delhi flights to Bhuntar (Kullu-Manali) airport suspended after 24 Oct 2026; only limited weekly connections remain. Most travellers arriving from Delhi must connect via Chandigarh or drive from Delhi."; notice_source_url null → "https://www.tribuneindia.com/news/himachal/direct-delhi-kullu-flights-suspended-after-october-24/"
stamped 27: basara, shnongpdeng, solan, tsomgo-lake, udaipur, ujjain, hanle, leh, nubra-valley, pangong-lake, tso-moriri, turtuk, zanskar, kaza, chaukori, daringbadi, mathura, satara, varanasi, dudhsagar-falls, jibhi, jodhpur, kalpa, adilabad, medak, nagarjuna-sagar, old-goa
RESULT stamped=27 valid=27 corrections=14 queued=14 queueable=14 escalated=0 dropped=0 unreviewed=0
```

## Open items settled

```
RESULT confirmed=0 needs_correction=1 unresolved=0
for email sundarbans: permit_required (permit_required: source sundarbantigerreserve.org is not official or named news)
RESULT stamped=0 queued=0 founder_only=1 left=0 written
```
