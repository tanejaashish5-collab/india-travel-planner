#!/usr/bin/env node
/**
 * Sprint 4 — Phase A: collection editorial framing.
 * Writes strategy_intro ("why this collection exists") and
 * connector_notes ("how the stops connect") for all 91 collections.
 *
 * strategy_intro adds the WHY framing the description doesn't carry —
 * what got cut, who it's for, what the picking criterion was.
 *
 * connector_notes adds the HOW — sequencing, pairing, season pattern.
 *
 * Voice rules: sentence case, no influencer words, citation-first,
 * declarative. Each field 100-220 chars.
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
config({ path: "apps/web/.env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const F = {
  // === ACTIVITIES & SEASONS ===
  "adrenaline-rush": {
    si: "Activity-led, not destination-led. Each entry earned the listing because it operates a verifiable adventure with established safety protocols — not because it's photogenic.",
    cn: "Pick the activity first, then the destination. Several stops appear on multiple lines (Manali for paragliding and rafting, Rishikesh for bungee and rafting) — they're worth a separate trip per pursuit, not a checklist run.",
  },
  "after-dark-experiences": {
    si: "The most-published India travel content goes silent after sunset. This list maps the cities, beaches, and high-altitude towns where the best experience genuinely happens between 8 pm and dawn.",
    cn: "Each pick names a specific window — full-moon Hampi, post-aarti Varanasi, Khajuraho's light-and-sound hour. Plan one night around the experience; don't try to fit two cities in a single evening.",
  },
  "andaman-diving-snorkeling": {
    si: "Ranked by water clarity, reef health, and operator safety record — not by Instagram visibility. North Bay reefs are beginner territory; Havelock and Neil need open-water certification.",
    cn: "Sequence by skill level — start at North Bay, progress to Elephant Beach, finish at Havelock's Lighthouse and Neil's Bharatpur. PADI dive shops cluster at Havelock; book direct, not through a Port Blair tour desk.",
  },
  "autumn-destinations": {
    si: "Autumn is the underbooked window — September skies clear by mid-month, the monsoon has refilled the rivers, and tourists haven't returned. The list is built off destination-month scores of 5/5 across these three months.",
    cn: "Most picks reach peak readability in late September through early November. Pair lower-altitude valleys (Tirthan, Barot) with high-altitude lakes (Tso Moriri) — the former hold their colour longer; the latter ice over by November.",
  },
  "ayurveda-wellness": {
    si: "Kerala has more verified Ayurvedic centres than the rest of India combined. The list strips out tourist-spa rebrands — every entry has a registered vaidya on staff and runs the full panchakarma protocol.",
    cn: "Most centres ask for 7–14 day stays for genuine treatment outcomes; weekend visits are ineffective and usually decline. Plan around June–November when the body responds best to oil therapies (per traditional Ayurveda calendar).",
  },
  "best-beaches-india": {
    si: "Goa is the country's most-searched beach but it's not the country's best. Each pick on this list outscores Goa on water quality, low-crowd reading, or unique geography — turtle nesting, sacred cliffs, or live coral.",
    cn: "Cluster by region — Andaman + Lakshadweep need separate flights; Konkan, Karnataka and Kerala beaches connect by road; Odisha and the Tamil coast are their own routes. Don't try a national beach circuit; pick one stretch.",
  },
  "best-dhabas-on-highways": {
    si: "Highway-stop journalism, not foodie tourism. Each dhaba has been audited for the dish it's known for, the price band that holds, and whether it still cooks for the trucker line — the test of a real dhaba.",
    cn: "Listed roughly along the major highway corridors (NH 44 Murthal stretch, NH 7 Punjab, NH 1 Delhi-Amritsar). Use as roadside checkpoints, not destinations. Most don't take reservations and turn over fast.",
  },
  "best-family-destinations": {
    si: "Filter applied: medical access within 30 minutes, kid-rated activities (not just \"kids welcome\"), and infrastructure that handles strollers and tantrums. Hill stations make the list only when they offer genuinely interesting things for children.",
    cn: "Sequence by child age — pre-school stops (Coorg, Munnar, Lonavala) are different from teen stops (Manali, Spiti, Andaman). The full list isn't designed as one trip; pick three destinations that match the child's age and a parent's tolerance for road hours.",
  },
  "best-honeymoon": {
    si: "Privacy-rated, infrastructure-rated, and decisively pulled away from the Shimla–Manali default. Each pick scored ≥4/5 on couple-suitability, holds the silence for at least 48 hours, and has a registered romantic-stay option.",
    cn: "Sequence — fly into the nearest hub, drive once, then stay still. The biggest mistake on Indian honeymoons is over-routing; pick two destinations maximum, give each four nights.",
  },
  "best-motorcycle-routes": {
    si: "Every route has been scored on road condition, fuel-stop spacing, mechanic availability, and weather windows — not on the photogenic stretches alone. Most are seasonally locked; check the listed window before booking.",
    cn: "Designed to be ridden in the season-window stated, not opportunistically. The Spiti loop and Leh-Manali highway are the only routes that work in July-September; the rest reward October-March riding.",
  },
  "budget-under-1000": {
    si: "Audited daily-spend cap including stay, two meals, local transit, and one paid attraction. Doesn't include long-distance bus or train tickets in. The list cuts destinations where the cap technically holds but the experience visibly degrades.",
    cn: "Pair shorter stays (3–4 days) so the per-day budget covers the rare splurge — a Kashmiri houseboat, a Hampi sunset boat. Backpacker hostels with shared rooms hold the budget; private rooms break it.",
  },
  "budget-under-2000": {
    si: "The middle band — clean rooms, restaurants over street food, occasional taxi over public transport. The list excludes places where ₹2,000/day forces uncomfortable trade-offs (winter Manali, peak Goa).",
    cn: "Roughly the cap most domestic Indian travelers actually spend. Sequence by region; transit between regions (flights) sits outside the daily budget and adds ₹4,000–8,000 per leg.",
  },
  "budget-under-5000": {
    si: "The sweet spot for most domestic travelers — boutique homestay or 3-star hotel, sit-down meals, private cab when needed, and the occasional adventure activity. Not luxury, but no compromise on the experience that drew you.",
    cn: "Pair one urban hub with one quiet destination; cities push the daily spend higher, valleys pull it down. A two-week trip across this list averages out to the listed cap.",
  },
  "photography-spots": {
    si: "Curated by light, layering, and access window — not by social-media virality. Each pick names a specific golden-hour or blue-hour vantage and a season when the layered landscape actually appears.",
    cn: "Pair coastal entries with morning shoots, Himalayan entries with afternoon and dawn. Most stops need 36+ hours to wait out one bad weather window; a single-night stop rarely yields the keeper frame.",
  },
  "best-stargazing-spots": {
    si: "Bortle Class 1–2 sky verified — near-zero light pollution, Milky Way visible to the naked eye. Most are above 3,000 m, where atmospheric thickness drops out of the equation.",
    cn: "Plan around the new-moon window — mid-cycle moonlight kills the Milky Way. October–February is peak; summer monsoon clouds out most high-altitude skies.",
  },
  "best-winter": {
    si: "Score-curated for December-February only. Each destination earned the listing on a winter-specific draw — fresh snow, frozen lakes, clear Himalayan air, or a winter festival the rest of the year doesn't carry.",
    cn: "Cluster by altitude band — sub-2,000 m stays comfortable; 2,000-3,500 m needs cold-weather layering and chains; above 3,500 m many roads close. Match your tolerance to the band.",
  },
  "birding-hotspots": {
    si: "India's 1,300+ species cluster around specific wetlands, forests, and ridges. The list maps the most reliable sighting hotspots — each entry comes with a peak-month range and the headline species worth the trip.",
    cn: "Plan around the specific bird's calendar — Siberian cranes at Bharatpur (Nov-Mar), western tragopans (Mar-May, Himalayan ridges), oriental dwarf kingfishers (Jun-Sep, Western Ghats). A single trip rarely covers more than two zones.",
  },
  "borders-worth-visiting": {
    si: "The land borders India shares are seven, and most carry visible cultural overlay from the neighbour. The list pulls border crossings or near-border districts where the geography genuinely shifts the experience — not military checkposts.",
    cn: "Most need permits (Inner Line or Protected Area). Apply 4–6 weeks ahead. Sequencing is regional — Leh's borders, the Northeast belt, the Gujarat-Pakistan stretch and the Tamil-Sri Lanka coast each anchor a separate trip.",
  },
  "coffee-tea-plantations": {
    si: "Plantation stays are a different category from heritage hotels — most are working estates that take guests as a side line. Each pick is verified active production, registered with the Coffee or Tea Board, and runs walk-throughs as part of the stay.",
    cn: "Coffee plantations cluster in the southern Western Ghats (Coorg, Chikmagalur, Wayanad); tea estates cluster in Darjeeling, Munnar and Assam. Pair one of each on a longer trip — the morning routines are completely different.",
  },
  "eastern-ghats-adventure": {
    si: "Andhra Pradesh's wild side, regularly missed because the Eastern Ghats sit in the shadow of the Western. Each pick — coffee hills, sub-zero hamlets, tribal forests, the canyon — runs underbooked despite scoring 4-5/5 in season.",
    cn: "Cluster by district — Visakhapatnam interior (Araku, Lambasingi) is one trip; Kurnool-Anantapur (Belum, Gandikota) is another. Don't attempt the full list in one circuit; the Ghats fold internal travel times beyond what the map suggests.",
  },
  "french-india-trail": {
    si: "Three hundred years of French colonial layer survives along a thin strip of the Tamil and Kerala coasts — Puducherry, Karaikal, Mahé, Yanam. The list reads as one cultural arc rather than four scattered points.",
    cn: "Sequence by drive — Puducherry → Karaikal (130 km) is the natural pairing on the Tamil coast; Mahé and Yanam need separate flights and don't connect by road. Most travelers do the Tamil-coast pair only.",
  },
  "frozen-wonders": {
    si: "Lakes that ice over and rivers that freeze enough to walk on — every entry is a January-February-only experience. The list excludes places where ice is occasional or partial; only locked-in freezes make the cut.",
    cn: "All require thermal gear rated for -25°C. Pangong, Tso Moriri and the Chadar trek run different protocols — the trek demands fitness and a guide; the lakes are roadside-accessible day-trips from Leh.",
  },
  "glamping-north-india": {
    si: "Tents with real beds, hot showers, and infrastructure that holds in shoulder season. The list cuts the \"glamping\" rebrands of basic homestays — every entry has flooring, attached toilet, and verified power backup.",
    cn: "Most run May–October only; winter tents close. Cluster by route — Spiti glamps (Kaza, Tabo, Langza) on one trip; Rajasthan luxury camps (Jaisalmer dunes) on another; Uttarakhand riverside (Rishikesh, Tehri) on a third.",
  },
  "goa-beyond-beaches": {
    si: "Goa is 3,702 km² — beaches account for less than 10%. The list maps the spice plantations, Latin Quarter back-streets, Western Ghats interior, and Hindu temple belt that most package itineraries skip.",
    cn: "Pair a beach base in the south (Agonda, Patnem) with day trips inland — Dudhsagar Falls (June-September), Old Goa, the spice farms around Ponda. Avoid trying to cross between north and south coasts twice; the inland traffic is brutal.",
  },
  "highest-passes-india": {
    si: "Ranked strictly by altitude, with opening dates verified against the Border Roads Organisation's annual update. Each pass has a different opening-window risk — some shut as early as October; the highest don't open before July.",
    cn: "Plan around the opening calendar — Khardung La and Chang La open earliest; Umlingla, Marsimik, Photi La open last. Acclimatise two days in Leh before crossing 5,000 m. AMS is a real risk; the highest passes have no oxygen at the top.",
  },
  "highest-places-you-can-drive": {
    si: "Roads, not summits. Each entry is the highest point you can legally and physically reach by vehicle — the BRO's signed altitudes, verified against the latest road conditions, not Wikipedia averages.",
    cn: "Most demand a 4WD beyond 5,000 m, especially after September. Sequence acclimatisation correctly: don't go from Delhi to Khardung La in one day. Three days of buffer at 3,500 m is the standard protocol.",
  },
  "best-food-cities": {
    si: "Cities worth visiting for the food alone — Lucknow's Awadhi, Hyderabad's Hyderabadi, Amritsar's Punjabi, Kolkata's Bengali. Each city anchors a coherent culinary culture, not a fusion-restaurant scene.",
    cn: "Spend three full days minimum per city — most signature kitchens take preparation hours that lunch tourists miss. Pair with a regional museum or fort visit; the food makes more sense after the historical context.",
  },
  "india-wildlife-safari": {
    si: "Park-by-park sighting odds, not generic \"India tiger tour\" packaging. Each entry includes the species the park is genuinely best for, the season window, and the booking lead time.",
    cn: "Plan around the species — tigers at Bandhavgarh and Tadoba (March-May, hot-water-hole pattern); rhinos at Kaziranga (Nov-Apr); snow leopards at Hemis (Jan-Feb). One park per trip; jumping parks burns the buffer needed for repeat sightings.",
  },
  "waterfall-circuit-india": {
    si: "From India's widest (Chitrakote) to the world's tallest plunge (Nohkalikai). Each falls comes with a peak-flow window — most run heaviest June-September; the Western Ghats coast and Meghalaya hold their flow longest.",
    cn: "Cluster by region — Western Ghats falls connect along NH 66 between Goa and Mangalore; Meghalaya falls cluster in Cherrapunji-Mawsynram; central-Indian falls (Chitrakote, Tirathgarh, Pachmarhi) run their own circuit. Don't national-tour them.",
  },
  "stepwell-circuit": {
    si: "Stepwells are India's pre-pump engineering — Rani-ki-Vav (UNESCO), Adalaj, Toorji, Chand Baori. Each pick is structurally complete, freely accessible, and worth the detour from the nearest larger destination.",
    cn: "Cluster in Gujarat and Rajasthan — most sit on the Ahmedabad-Jodhpur-Jaipur arc. Pair with the regional fort or palace circuit; stepwells make sense as half-day stops, not as a standalone itinerary.",
  },
  "andaman-island-hopping": {
    si: "The essential 5-island sequence — Port Blair, Havelock, Neil, Ross, North Bay. Each ferry leg, lodging cluster, and snorkel-vs-dive call has been timed against actual ferry schedules, not the brochure version.",
    cn: "Sequence: Port Blair (1 night) → Havelock (3) → Neil (2) → back to Port Blair (Ross + North Bay day trips). The reverse loop also works. Book inter-island ferries 2 weeks ahead; same-day tickets often sell out.",
  },
  "jyotirlinga-pilgrimage": {
    si: "Three of the twelve Shiva Jyotirlingas in our coverage area — Somnath (Gujarat), Mahakaleshwar (Madhya Pradesh), Omkareshwar (Madhya Pradesh). The list is partial because the other nine sit outside India's most-visited travel circuits.",
    cn: "Pilgrimage sequence usually starts at Somnath (sea), moves inland to Mahakaleshwar (Ujjain) and Omkareshwar (Narmada island). Mondays and Maha Shivaratri (February-March) bring crowds; weekday off-season visits get the experience.",
  },
  "backwater-experiences": {
    si: "Beyond the Alleppey houseboat — Kuttanad's below-sea-level paddy farming, canoe-only villages, and Ashtamudi's fishing-canoe routes. The list includes operators verified for waste management, not just photo ops.",
    cn: "Sequence by water type — start with a houseboat overnight (Alleppey or Kumarakom), then switch to a smaller canoe village stay. Don't book back-to-back houseboats; the experience flattens after night one.",
  },
  "lakshadweep-coral-paradise": {
    si: "India's smallest UT and its most restricted — only Bangaram, Agatti and Kadmat are open to non-resident Indians; foreign visitors need an additional permit. The reefs are India's densest live coral.",
    cn: "Reach via Agatti's airstrip (Kochi flights) or by ship from Kochi (18-20 hours). All-inclusive packages handle the permits; independent travel is not feasible. Plan one island per trip — inter-island transfers are slow and weather-dependent.",
  },
  "last-villages-of-india": {
    si: "The literal end-of-road villages — Chitkul, Mana, Turtuk, Dhanushkodi, Dong. Each sits where the asphalt becomes a footpath or a checkpost. The list cuts villages that are simply remote; only the geographic end-point qualifies.",
    cn: "Most need 2-3 days of arrival buffer; weather and military closures shut access at short notice. Sequence within each region (Himachal end-points, Ladakh end-points, Northeast end-points) — don't try to do them across regions in one trip.",
  },
  "craft-heritage-india": {
    si: "Working ateliers — Kalamkari pen-painting in Srikalahasti, ikat in Pochampally, bandhani in Bhuj, Pashmina in Kanihama. Each entry has been verified to still produce by hand; machine-tagged \"craft\" tourist stops were dropped.",
    cn: "Buy at source if you can — markup on craft elsewhere is steep. Plan around the workshop's open hours (most close 1-3 pm) and the master artisan's session times. Some accept commissions for visitors who stay 4+ days.",
  },
  "living-root-bridges-meghalaya": {
    si: "Khasi-grown bridges of fig roots, 100-200 years in the making, 20-30 m spans. The double-decker at Nongriat is the celebrity, but Mawlynnong, Padu, Burma, Riwai and Nongthymmai each carry a different geometry.",
    cn: "Reach Nongriat by 3,500 stone steps down (and back up) from Tyrna village. Most other bridges are gentler walks. October-April is the dry-walk window; monsoon access turns the steps into a streambed.",
  },
  "luxury-heritage-stays": {
    si: "Former royal residences operated as hotels — most by descendants of the original ruling family. The list cuts heritage-themed new builds. Each entry is a structure pre-dating 1947 with the original layout, art and furnishing largely intact.",
    cn: "Cluster around Rajasthan (Jaipur, Udaipur, Jodhpur, Bikaner palaces), with anchors elsewhere (Mysuru, Hyderabad, the Wadiyars and Nizams). Pair two heritage stays per trip — three is usually one too many; the architecture starts to blur.",
  },
  "fort-trail-maharashtra": {
    si: "Maharashtra has 350+ forts — more than any other Indian state. The list takes the 6 that survived: Raigad, Pratapgad, Sinhagad, Lohagad, Shivneri, Vijaydurg. Each played a documented role in Shivaji's military strategy.",
    cn: "Pair sea forts (Vijaydurg, Sindhudurg) with hill forts (Raigad, Pratapgad). The trek to most hill forts takes 1-2 hours up; do them in October-February. Monsoon turns the trails dangerous; summer brings sun-stroke risk on exposed ramparts.",
  },
  "ancient-monasteries": {
    si: "Buddhist monasteries founded before 1500 CE that still operate as living religious communities — not museum sites. Tabo, Lamayuru, Hemis, Tawang, Rumtek and others; each holds wall murals and sacred objects continuously cared for since the founding century.",
    cn: "Pre-clear visit timing with the monastery — most have specific gompa-open hours; some host morning prayer sessions visitors can quietly attend. Photography rules vary; check at the entrance, not on Instagram.",
  },
  "monsoon-south": {
    si: "While most travelers flee June-September, the Western Ghats and Konkan coast peak. The waterfalls run, the forest steams, and the heat breaks. The list focuses on Kerala, Karnataka and Goa stops where rain is the experience, not the obstacle.",
    cn: "Pack waterproofs and wait out the heaviest hours (typically 3-7 pm). Pair a hill station (Munnar, Coorg, Wayanad) with a coast stop (Kannur, Gokarna) — the rainfall pattern differs by 2-3 hours, and you can chase the breaks.",
  },
  "monsoon-magic": {
    si: "The destinations that depend on the monsoon for their best version — Coorg, Wayanad, Konkan, the Western Ghats falls, and the high-altitude valleys (Lahaul, Spiti) that finally open as the southern monsoon detours away from them.",
    cn: "Different monsoon strategies — Western Ghats sees heavy rain (pack accordingly); Lahaul-Spiti sees light rain because they sit in the rain shadow (the only India destinations where June-September is also the only season). Don't confuse the two.",
  },
  "most-beautiful-villages": {
    si: "Curated for traditional architecture intact, working agriculture, and absence of resort overlay. Mawlynnong, Khonoma, Pragpur, Malana — each maintains its original village fabric, not a rebuilt heritage simulation.",
    cn: "Plan a 2-3 night stay rather than a drive-by — most villages reveal themselves after the day-trippers leave. Most have one homestay with capacity under 10 rooms; book direct, well in advance.",
  },
  "most-dangerous-roads": {
    si: "Cliff-edge, single-lane, often unpaved — and worth the ride for what they reach. Each road has been scored on accident-rate data, BRO closure history, and the experiential payoff at the destination.",
    cn: "Match the season strictly — most are open June-October only. Don't drive at night; don't drive in rain on the high-altitude stretches. Ride pillion or hire a local driver if you're not used to mountain driving.",
  },
  "new-years-eve-destinations": {
    si: "Not Goa, not Bangkok, not Manali. The list pulls north-Indian alternatives where December 31 is celebrated meaningfully — frozen lakes, winter festivals, or winter-only access — instead of just bumping room rates.",
    cn: "Book by mid-November; rates climb 2-3x in the last fortnight. Most picks need warm-weather gear (sub-zero at altitude). Pair with the destination's January 1 morning experience — frozen Pangong sunrise, Manali fresh-snow morning.",
  },
  "rivers-and-lakes": {
    si: "From the Umngot at Dawki (transparent enough to see boats hover) to Pangong (saline, blue, Indo-China shared) — water bodies where the geography or the chemistry creates a one-of-a-kind reading. Not every Indian lake makes the list.",
    cn: "Plan the visit around the water's peak-clarity window — Umngot in February-March; Dal Lake in October-November; Pangong in June-September; Tso Moriri before September. Most hold their water year-round; clarity and access vary sharply.",
  },
  "northeast-first-timer-circuit": {
    si: "Two weeks, eight states, one circuit — the logical sequence for a first-time Northeast trip. Built on actual flight schedules, road conditions, and the Inner Line Permit windows that change state-by-state.",
    cn: "Sequence: fly into Guwahati → Kaziranga → Shillong → Mawlynnong → Cherrapunji → Tawang (long road day) → Bomdila → back to Guwahati → fly out via Imphal or Kolkata. ILPs needed for Arunachal, Nagaland, Mizoram. Apply 6 weeks ahead.",
  },
  "andaman-offbeat-islands": {
    si: "Beyond Havelock and Neil — Long Island, Rangat, Diglipur, Little Andaman. Each has limited connectivity, basic stays, and the marine experience the popular islands had a decade ago.",
    cn: "Plan with buffer — ferries to the offbeat islands run on weather-dependent schedules and the GPS infrastructure is patchy. Most need 2 nights minimum; same-day round-trips don't make sense.",
  },
  "offbeat-romantic": {
    si: "If your romantic ideal is not a Mall Road traffic jam, the list pulls the alternatives — Tirthan, Yusmarg, Doodhpathri, Munsiyari. Each scored 4-5/5 on couple-suitability and quiet-rating in season.",
    cn: "Most are 6-12 hour drives from the nearest airport; the inaccessibility is part of the privacy. Skip the long-circuit instinct — pick one valley, stay six nights, walk daily.",
  },
  "zero-signal-zones": {
    si: "Destinations where your phone genuinely stops working — not patchy, but properly off. The list takes places where the absence is the experience: high-altitude monasteries, deep-jungle stays, no-tower zones.",
    cn: "Tell someone your itinerary before going off-grid. Pre-load offline maps. Most signal-zones have at least one BSNL pocket; learn where it is on arrival. Plan emergencies around the nearest signal point, not from the zone itself.",
  },
  "portuguese-india-trail": {
    si: "450 years of Portuguese rule (1510-1961) along the west coast, now compressed into three districts — Goa, Daman, Diu. The list traces what survived: church architecture, Catholic feasts, and the Indo-Portuguese kitchen.",
    cn: "Goa carries the bulk — Old Goa (UNESCO), Latin Quarter Panaji, the spice-coast belt. Daman and Diu are short-trip add-ons (2-3 nights each). Most travelers do the full trail in 8-10 days; rushing it loses the cuisine.",
  },
  "proposal-worthy-spots": {
    si: "Locations chosen for a single quiet hour at a specific spot — Udaipur's Jag Mandir at sunset, the Khardung La signpost at first light, Tso Moriri's south shore in late afternoon. Pre-arranged setups noted where they exist.",
    cn: "Pre-coordinate with the property — most resorts in the listed destinations have proposal packages. The high-altitude picks (Khardung, Tso Moriri) need warm gear and altitude buffer; don't propose with a dehydration headache.",
  },
  "fuel-stop-critical-routes": {
    si: "Stretches where the gap between petrol pumps can leave you stranded — Manali-Leh, Spiti loop, Tawang-Bomdila, Banihal-Srinagar in winter. Each route lists the exact pump locations and the distance between them.",
    cn: "Carry an extra 5-10 litres on the listed routes (in proper jerrycans, not water bottles). Top up at every pump regardless of meter; some stretches add 100+ km between operating pumps. Confirm pump status the same morning — many close in winter.",
  },
  "sacred-lakes-impossible-altitudes": {
    si: "High-altitude lakes the local communities consider sacred — Manasarovar (Tibet, restricted), Pangong, Tso Moriri, Suraj Tal, Hemkund. Each list-entry above 4,000 m has its own pilgrimage protocol; respect them at the shore.",
    cn: "Acclimatise in Leh or Manali before driving up. Most lakes ice over by November and stay locked through April. Pilgrimage seasons (Hemkund in summer, Manimahesh in August) bring crowds; outside those windows the lakes belong to themselves.",
  },
  "solo-female-safe": {
    si: "Solid infrastructure, welcoming locals, active tourism presence, registered emergency contacts. Each pick scored 4-5/5 on the solo-female-safety dimension — based on hospital access, 4G, police presence and reported incidents.",
    cn: "Pair stays at NakshIQ-listed homestays where female hosts run the property — explicit in the listing. Avoid arrival between 8 pm and 6 am at any picked destination, regardless of safety score; transit-time risk is the consistent gap.",
  },
  "snow-leopard-territory": {
    si: "An estimated 700 snow leopards in India, 90% in Hemis, Kibber, and the Spiti high meadows. The list narrows to the three best probability zones; sightings still need 7-10 day patience and a registered tracker-guide.",
    cn: "Season is January-February only — when ungulate prey moves down to lower meadows, the leopards follow. Below-zero gear required; most operators include cold-weather kit. Fly to Leh or drive into Kibber 2-3 days before the tracking starts to acclimatise.",
  },
  "spring-destinations": {
    si: "March-May scoring 5/5 — the under-talked shoulder season. Snow recedes from the ridges, rhododendrons bloom, the high-altitude passes start to reopen. Each pick had to score peak in this specific window.",
    cn: "Match altitude to month — March picks are sub-2,500 m (Almora, Tirthan); April-May open up to 3,000-3,500 m (Tabo, Sangla); late-May handles up to 4,000 m once the passes clear. Don't push higher than the pass-opening calendar.",
  },
  "summer-escapes": {
    si: "When the plains hit 45°C, hill stations and mountain towns hold 18-22°C. The list focuses on April-June destinations — those where May-June is genuinely peak, not a fallback.",
    cn: "Book 6-8 weeks ahead — May-June is school-holiday peak in India and rates triple. The high-altitude picks (Spiti, Lahaul) only become accessible mid-May once Rohtang and Kunzum clear; don't plan them for April.",
  },
  "temple-trail-south": {
    si: "South Indian temple architecture is its own school — Pallava, Chola, Hoysala, Vijayanagara. Each pick is a structurally complete temple still in active worship, with the original sculpture, gopurams and inscriptions readable.",
    cn: "Cluster by dynasty — Pallavas in Kanchipuram and Mahabalipuram; Cholas in the Thanjavur belt (Brihadeeswarar UNESCO); Hoysalas in Belur and Halebidu; Vijayanagaras at Hampi. Don't national-tour them; pick one school per trip.",
  },
  "ap-buddhist-trail": {
    si: "Mahayana Buddhism's cradle — Andhra Pradesh's Buddhist heritage runs 2,200 years, anchored at Amaravati (now submerged near the new state capital), Nagarjunakonda and Anupu. The list pulls what's still visitable.",
    cn: "Plan around Nagarjunakonda's island access (boat-only, weather-dependent). Pair with Amaravati and the Krishna delta; the full circuit takes 4-5 days. Most monuments have minimal interpretation on-site — read up before going.",
  },
  "char-dham-circuit": {
    si: "The four most sacred Hindu shrines in the Himalayas — Yamunotri, Gangotri, Kedarnath, Badrinath — connected by a 1,500 km circuit. Each shrine sits above 3,000 m; the trail's altitude and seasonality make it a genuine pilgrimage, not a holiday.",
    cn: "Open mid-April to early November only. Sequence: Yamunotri → Gangotri → Kedarnath → Badrinath, west-to-east. Helicopter shuttles available for Kedarnath and Yamunotri (book 4-6 months ahead). Walk the last 14 km to Kedarnath if able — the experience compresses the others.",
  },
  "buddhist-circuit-complete": {
    si: "Siddhartha's life path — birthplace (Lumbini, Nepal), enlightenment (Bodh Gaya), first sermon (Sarnath), death (Kushinagar) — plus the Mahayana sites (Nalanda, Vaishali, Rajgir, Sravasti). The circuit covers Bihar, UP and a stretch into Nepal.",
    cn: "Cluster the Bihar sites (Bodh Gaya, Nalanda, Rajgir) over 4-5 days; the UP belt (Sarnath, Kushinagar, Sravasti) over 3-4 days; Lumbini needs a separate day with the Nepal border crossing. November-February is the only sensible window.",
  },
  "spiritual-circuit": {
    si: "Cross-faith and cross-region — temples, monasteries, ashrams, and sacred confluences. The list cuts the famous-only stops; entries earn the listing on continued ritual practice and accessibility, not architectural fame.",
    cn: "No single sequence — pick by belief or by river. The Ganga circuit (Rishikesh, Haridwar, Varanasi, Gaya) reads in one arc; the Krishna-Yamuna belt (Mathura, Vrindavan, Govardhan) reads in another; the Buddhist and Sikh circuits each stand alone.",
  },
  "deccan-food-trail": {
    si: "Hyderabadi haleem (GI-tagged), Guntur chilli biryani, Araku coffee, Bobbili veena cuisine — Deccan food is its own school, distinct from both north and south Indian kitchens. The list maps the dishes worth the city.",
    cn: "Plan around the food calendar — haleem is Ramzan-month only (typically March-April); biryani every day, but the best shops sell out by 8 pm. Pair Hyderabad (3 days) with Vijayawada or Vizag (2 days each) for the full trail.",
  },
  "godavari-trail": {
    si: "India's second-longest river — and its most under-traveled travel corridor. The list runs from sacred-ghat country (Rajahmundry, Bhadrachalam) into the delta backwaters (East Godavari) where Kerala-style houseboats run on Telugu water.",
    cn: "Sequence upstream-to-delta: Bhadrachalam → Rajahmundry → Papikondalu (boat-only) → Konaseema delta. Most travel happens by ferry and houseboat; road infrastructure is sparser than Kerala. Plan 5-7 days minimum.",
  },
  "haveli-trail-rajasthan": {
    si: "The merchant havelis of the Shekhawati region — built between 1750 and 1900, painted across every interior surface with frescoes that haven't been restored or whitewashed. Each pick is privately owned, walk-in accessible, and architecturally complete.",
    cn: "Cluster in Mandawa, Nawalgarh, Fatehpur and Dunlod — all within 50 km of each other. A 3-day Shekhawati base (in a haveli-converted hotel) covers the trail comfortably. Avoid summer; the painted interiors aren't air-conditioned.",
  },
  "kakatiya-heritage-circuit": {
    si: "The Kakatiya dynasty (1083-1323) ruled Telangana from Warangal — and left the Ramappa Temple (UNESCO 2021), Thousand-Pillar Temple, and Khammam fort as the surviving anchors. Lesser-known than the Cholas, but architecturally singular.",
    cn: "Sequence: Warangal (2 days) → Ramappa (1 day) → Khammam (1 day). All connect by road; Hyderabad airport is the entry. Pair with the Thousand-Pillar Temple in Warangal city — it's a 15-minute stop most travelers miss.",
  },
  "konkan-coast": {
    si: "India's most scenic coastal drive — 600 km of sea forts, fishing villages, Konkani-speaking interior, and beach stretches that aren't Goa. The list runs Mumbai → Goa via the back roads, not NH 66.",
    cn: "Sequence: Mumbai → Alibaug → Murud-Janjira → Ratnagiri → Tarkarli → Sindhudurg → Goa. 4-5 days minimum. Time it for October-March (October avoids monsoon traffic; March beats summer humidity).",
  },
  "mughal-trail": {
    si: "The arc of the Mughal Empire — Delhi (Red Fort, Humayun's Tomb), Agra (Taj, Fatehpur Sikri), Lahore (across the border, not visitable), Shahjahanabad. Each stop carries a structurally complete, UNESCO-listed Mughal monument.",
    cn: "Sequence: Delhi (3 days) → Agra (2 days) → Fatehpur Sikri (half day from Agra). The Golden Triangle adds Jaipur (Mughal-Rajput overlap). Plan winter (October-March); summer turns the marble unbearable to walk on.",
  },
  "odisha-golden-triangle": {
    si: "Bhubaneswar (Temple City) — Konark (Sun Temple, UNESCO) — Puri (Jagannath). The essential Odisha circuit, geographically tight (60 km between corners), each anchor entirely different in temple style.",
    cn: "Sequence: Bhubaneswar (2 days) → Puri (3 days, includes Konark day-trip) → return via Pipili appliqué village. November-February is peak; Puri's Rath Yatra (June-July) is the spectacular but logistically chaotic alternative.",
  },
  "panch-kedar-trail": {
    si: "Five ancient Shiva temples in the Garhwal Himalayas — Kedarnath, Madhyamaheshwar, Tungnath, Rudranath, Kalpeshwar. Each is the site where a body part of the Pandavas' bull (Shiva-incarnate) is said to have surfaced.",
    cn: "Plan as a connected pilgrimage (3 weeks for all five) or as separate visits — Tungnath is the easiest day trek (3.5 km from Chopta); Rudranath the hardest (24 km return). Open May-October; high-monsoon weeks dangerous on the trekking sections.",
  },
  "rajasthan-fort-circuit": {
    si: "Six fortress cities along desert highways — Jaipur (Amber), Jodhpur (Mehrangarh), Chittorgarh, Kumbhalgarh, Jaisalmer (still inhabited), Bikaner (Junagarh). Each fort is structurally intact and walk-through accessible.",
    cn: "Sequence in a loop — Jaipur → Bikaner → Jaisalmer → Jodhpur → Kumbhalgarh → Chittorgarh → back to Jaipur. 12-14 days. October-March only; summer heat at the desert forts (Jaisalmer, Bikaner) makes daytime walking dangerous.",
  },
  "sikh-heritage-trail": {
    si: "Five hundred years of Sikh history across Punjab, Haryana and Himachal — birthplace gurdwaras (Nankana Sahib in Pakistan, not visitable), the five Takhts of Sikhism (three on Indian soil), and the Anandpur Sahib battle sites.",
    cn: "Sequence: Amritsar (Golden Temple, Wagah) → Anandpur Sahib (Hola Mohalla in March) → Patiala → Kiratpur Sahib → Damdama Sahib. 7-10 days. The Hola Mohalla festival (March) is the most spectacular window if you can plan around it.",
  },
  "odisha-turtle-trail": {
    si: "The world's largest mass-nesting event — 600,000+ Olive Ridley turtles arriving on Gahirmatha and Rushikulya beaches between November and March. The list covers the three reliable nesting beaches plus the protected hatchery zones.",
    cn: "Plan visit-times around the arribada window (November-March, peak January-February). Independent access is restricted; you need a permit or a registered ecotourism operator. Don't disturb nesting females or hatchlings.",
  },
  "tiger-safari-circuit": {
    si: "Five national parks, five different ecosystems, five different sighting probabilities — Bandhavgarh (highest density), Kanha (largest area), Tadoba (most reliable summer sightings), Pench (forest depth), Ranthambore (most photographed).",
    cn: "Sighting odds are season-dependent — March-May (water-hole pattern) gives the best probability; October-February gives better weather. Don't park-jump within a single trip; 4-5 nights at one park yields more reliable sightings than 1-2 nights at three.",
  },
  "tribal-cultures-ethically": {
    si: "Tribal communities that welcome visitors on their own terms — the Apatani in Ziro, the Bonda in Odisha (with caveats), the Konyak in Mon, the Toda in the Nilgiris. Each entry includes the appropriate permit and the ethical gating.",
    cn: "Visit on community-published dates; don't show up unannounced. Pay direct to the host community, not via intermediaries. Photograph people only with explicit consent — the answer in many tribal communities is genuinely no, regardless of price offered.",
  },
  "odisha-tribal-circuit": {
    si: "Odisha holds 62 distinct tribal communities — the largest concentration in India. The list opens up the Dongria Kondh markets, Kutia Kondh hamlets, Bonda hill-stays, and the Saora craft villages. Tourism here remains light and ethically sensitive.",
    cn: "Travel only with a Koraput- or Rayagada-based registered guide who has community relationships. Most entries don't run on a fixed schedule — the markets rotate weekly, festivals run lunar calendars. Plan 7-10 days for any meaningful exposure.",
  },
  "offbeat-hidden": {
    si: "Skip the Instagram defaults. Each entry on this list has been verified for low search volume in NakshIQ's own analytics — destinations most Indians haven't visited, but where the experience meets or exceeds the famous ones.",
    cn: "Sequence not implied — pick by region or vibe. Most picks need 6-12 hours of road from the nearest hub; the inaccessibility is the gating function. Don't expect chain-hotel infrastructure; budget for homestays and dhabas.",
  },
  "unesco-south-west": {
    si: "From Vijayanagara's granite ruins (Hampi) to the rock-cut caves of Ajanta and Ellora — South and West India hold some of the world's most singular UNESCO inscriptions. The list pulls the structurally complete and visitor-accessible ones.",
    cn: "Cluster by region — Maharashtra (Ajanta, Ellora, Elephanta) on one trip; Karnataka (Hampi, Pattadakal) on another; Goa Old Goa as a separate stop. Don't try to do them all in one circuit — the architectural traditions are distinct schools.",
  },
  "unesco-north-india": {
    si: "India has 42 UNESCO inscriptions. This list takes the 20 in the north covered by NakshIQ — the structurally complete, visitor-accessible ones, ranked by the depth of pre-departure context they reward.",
    cn: "Don't UNESCO-tour them. Pair monuments with adjacent state experience — Sundarbans with Kolkata; Khajuraho with Orchha; Fatehpur Sikri with Agra. Most need a half day minimum; rushed UNESCO visits flatten the architecture.",
  },
  "weekend-from-bengaluru": {
    si: "Bengaluru's IT crowd doesn't want a 6-hour drive on Friday night — every pick on this list is reachable in under 6 hours, and worth the entire weekend. Coffee hills, wildlife, heritage anchors all qualify.",
    cn: "Friday-evening departure (7 pm) lands at most picks by 11 pm. Avoid Bandipur road after dark (animal crossings); the Coorg-Mysuru NH 275 is your safer late-evening route. Sunday return by 3 pm to dodge the city traffic.",
  },
  "weekend-from-chandigarh": {
    si: "Chandigarh sits at the gateway between plains and Himalayas — within 6 hours, you can reach Shimla, Manali (just), Kasol, the Renuka Lake belt or the Pinjore-Kalka stretch. The list excludes anything that pushes a full 7+ hour drive.",
    cn: "Most picks work as 2-night trips (Friday evening to Sunday late afternoon). Avoid mid-summer Manali traffic; the standard Chandigarh-Manali route can stretch to 10+ hours on long weekends. Pinjore and Kasauli are the no-fail closer alternatives.",
  },
  "weekend-from-delhi": {
    si: "Under 8 hours by road — Rajasthan forts, hill-station Himachal foothills, ridgeline Uttarakhand, and the ravine wildlife reserves of Madhya Pradesh. Each pick gives 36+ hours on the ground if you depart by 6 pm Friday.",
    cn: "Avoid the Delhi-Jaipur NH 48 on Sunday evenings (5-9 pm choke point); leave by 2 pm or after 9 pm. The Himalayan picks (Mussoorie, Shimla, Lansdowne) all require winter chains November-March; the Rajasthan picks need 5 am summer departures.",
  },
  "weekend-from-hyderabad": {
    si: "Quick escapes within 4 hours of Hyderabad — the Kakatiya temple-belt (Warangal, Pakhal), the Deccan plateau forts (Bidar, Gulbarga), and the Nallamala forest stretch. Most are under-traveled despite the proximity.",
    cn: "Short driving distances allow late departures — leave Hyderabad by 4 pm Friday and arrive by 8 pm. Pair two destinations on a 3-day weekend (Warangal + Pakhal Lake, or Bidar + Basara). Summer (April-June) is brutal; aim October-February.",
  },
  "weekend-from-jaipur": {
    si: "Within 5 hours of Jaipur — the Shekhawati haveli circuit, the Ranthambore tiger reserve, Pushkar, the Sariska and Bharatpur reserves. Each pick rewards a 2-night stay; day-trippers miss the early-morning experience.",
    cn: "Tiger picks (Ranthambore, Sariska) need 5 am safari departures; book 2 weeks ahead. Bharatpur is best November-February for migratory birds. Sequence based on direction — Pushkar-Ajmer is the western anchor; the Shekhawati havelis sit to the north.",
  },
  "weekend-from-kochi": {
    si: "Kerala's commercial capital is the gateway — the backwaters (Alleppey, Kumarakom), hill stations (Munnar, Vagamon), wildlife (Periyar), and the tea estates of the Western Ghats. All within 4 hours.",
    cn: "Friday-night departure to most picks works; the Periyar drive is the only one needing daylight (forest stretch). Pair a hill-station with a backwater stay for a 3-day weekend; same-elevation pairings flatten the experience.",
  },
  "weekend-from-kolkata": {
    si: "Kolkata is the gateway to three distinct ecosystems — the Eastern Himalayan hill belt (Darjeeling, Kalimpong), the Sundarbans mangroves, and the Shantiniketan-Bishnupur Bengal interior. Each is a different category of weekend.",
    cn: "Hill-station picks need an overnight train (NJP) or flight (Bagdogra) plus 3 hours of driving — true 3-day weekends only. Sundarbans and Bishnupur work as 2-day road trips. Avoid mid-summer for the hills (closed-monsoon roads).",
  },
  "weekend-from-lucknow": {
    si: "UP's capital sits in the geographic heart — within 6 hours by road you can reach the Himalayan foothills (Naini Tal), the Buddhist circuit (Sarnath, Sravasti), and the wildlife reserves (Dudhwa, Pilibhit). The list cuts congested-route picks.",
    cn: "Avoid the Lucknow-Naini Tal route on long weekends (10+ hour creep). The Sarnath-Allahabad-Buddhist trail loops through historical anchors; pair with Lucknow's own kebab circuit on Sunday return. Best months October-March.",
  },
  "weekend-from-mumbai": {
    si: "Maximum City escapes — the Konkan coast (Alibaug, Murud), the Sahyadris (Lonavala, Karjat, Matheran), the wine country (Nashik), the historical anchors (Aurangabad, Ajanta-Ellora). All under 6 hours by road.",
    cn: "Time around the Mumbai-Pune Expressway window — leaving by 5 am or after 9 pm Friday saves 2 hours. Konkan picks reward October-March; the Sahyadris peak in monsoon (June-September) when the cliffs run with waterfalls.",
  },
  "wettest-places-on-earth": {
    si: "Mawsynram (11,872 mm/year) and Cherrapunji (11,777 mm/year) trade the world rainfall record annually. The list pulls the Northeast belt where rain is the experience — Sohra plateau, Mawlynnong, Nongriat root bridges, Garo hills.",
    cn: "Visit at the edges of the monsoon — late April-May or late September-early October — to see waterfalls running and trails still walkable. Peak July-August is dramatic but most trails close. Bring proper waterproofs; cheap raincoats fail in the first hour.",
  },
  "biker-friendly-stays": {
    si: "Not luxury hotels. The list takes dhabas with covered parking, homestays that let you wash the bike, and routes where the host has already mapped the next-day's good road. Bike-aware accommodation, audited on actual rider feedback.",
    cn: "Most picks sit on the Manali-Leh, Spiti loop, Kashmir Great Lakes, and Tawang routes. Confirm parking with the host before booking; a few \"biker-friendly\" listings are technically inside the building, with stairs. Pre-arranged mechanic contacts at most stops.",
  },
};

// Sanity check: 91 collections expected, this object should match
const expected = 91;
const provided = Object.keys(F).length;
console.log(`Provided: ${provided} / Expected: ${expected}`);

// Check for missing IDs
const { data: collections } = await supabase.from("collections").select("id").order("id");
const dbIds = new Set((collections ?? []).map(c => c.id));
const fIds = new Set(Object.keys(F));
const missingFromF = [...dbIds].filter(id => !fIds.has(id));
const missingFromDb = [...fIds].filter(id => !dbIds.has(id));
if (missingFromF.length) console.log("In DB but missing from F:", missingFromF);
if (missingFromDb.length) console.log("In F but not in DB:", missingFromDb);

// Apply
let updated = 0;
const errors = [];
const tooLong = [];
for (const [id, { si, cn }] of Object.entries(F)) {
  if (!dbIds.has(id)) continue;
  if (si.length > 320) tooLong.push({ id, type: "si", len: si.length });
  if (cn.length > 320) tooLong.push({ id, type: "cn", len: cn.length });
  const { error } = await supabase
    .from("collections")
    .update({ strategy_intro: si, connector_notes: cn })
    .eq("id", id);
  if (error) { errors.push({ id, error: error.message }); continue; }
  updated++;
}

console.log(`\nupdated: ${updated}`);
if (errors.length) console.log("errors:", errors);
if (tooLong.length) console.log("over 320 chars:", tooLong);
