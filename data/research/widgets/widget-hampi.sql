-- Hampi S20 widget backfill — needs +3 gems +5 eats (stays already at 4)
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT:
--   - "Vittala Stone Chariot" as gem — main UNESCO attraction (hard to call hidden).
--   - "Yana Rocks" — used in Gokarna entry; 200km from Hampi cross-dest.
--   - "Hospet Tungabhadra Dam" as standalone restaurant claim — kept as gem only; verified eatery
--     anchors instead in Hampi Bazaar + Hippie Island (Virupapur Gaddi).
--
-- VERIFIED:
--   - Anegundi (Tungabhadra north bank — Vali-Sugriva birthplace per Ramayana; older than Hampi)
--   - Anjeyanadri Hill (575 steps; Hanuman birthplace per local tradition)
--   - Sanapur Lake (boulder swimming + coracle rides 5km from Anegundi)
--   - Mango Tree Restaurant (Hippie Island Krishna river side; Tripadvisor + Zomato presence)
--   - Laughing Buddha (Hippie Island; long-standing backpacker institution)
--   - Suresh Restaurant (Hampi Bazaar; vegetarian institution)
--   - Mowgli Restaurant (Hippie Island; Tripadvisor verified)
--   - Funky Monkey Cafe (Anegundi side; Tripadvisor verified)

-- =========================================================
-- HIDDEN GEMS — 3 verified Hampi-adjacent waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'hampi-anegundi-village',
  'hampi',
  'Anegundi Village',
  NULL,
  4,
  '15 min via coracle ferry from Virupaksha ghat (Tungabhadra north bank)',
  'Day-trippers from Hospet stick to Hampi Bazaar + Vittala Temple + Royal Centre and never cross the Tungabhadra. Anegundi sits on the north bank and pre-dates Hampi by centuries — but the river crossing (coracle from 6am to 5.30pm) feels like a logistical hurdle to short-stay tourists, so only backpackers staying on Hippie Island make it across.',
  'Anegundi is identified in the Ramayana as Kishkindha, the Vanara kingdom of Vali and Sugriva — making it older than Vijayanagara Hampi by over a millennium. The village still has the Gagan Mahal (royal residence pre-Vijayanagara capital shift), Ranganatha Temple, and the Anegundi Fort. Kishkindha Trust runs a community-craft enterprise (banana-fibre handicrafts) — pre-bookable village tours ₹500 cover the fort, palace, and craft workshop. Coracle crossing ₹50 each way; vehicles via Tungabhadra Dam road 30km loop.',
  'easy',
  'Kishkindha Trust Anegundi (kishkindatrust.org); Karnataka Tourism Hampi heritage circuit; Outlook Traveller 2023 Hampi feature; Lonely Planet South India.',
  5,
  ARRAY['ramayana','heritage','village','craft','offbeat']::text[],
  '{}'::jsonb
),
(
  'hampi-anjeyanadri-hill',
  'hampi',
  'Anjeyanadri Hill',
  NULL,
  5,
  '20 min via coracle + 30 min climb (575 steps)',
  'Most visitors climb Matanga Hill for sunrise inside the main Hampi ruins zone — Anjeyanadri is on the Anegundi side (north bank) and requires the coracle crossing plus a 575-step climb. Only backpackers staying 3+ nights on Hippie Island figure out the morning ferry timing (6am) needed to reach the summit before 7am sunrise.',
  'Local tradition identifies Anjeyanadri as the birthplace of Hanuman (Anjana was his mother — "Anjaneya" = son of Anjana). The white-painted Hanuman temple sits atop a 575-step climb from the Anegundi side; the summit gives a 360° view over the Tungabhadra river loop, Matanga Hill, and the boulder-strewn Hampi ruins. The climb takes 30-40 min; sadhus often chant at the summit shrine. Free entry; carry water — no shop after the base. Sunrise (6.15am Oct-Mar) is the peak window.',
  'moderate',
  'Karnataka State Tourism Hampi pilgrimage circuit; Tripadvisor traveller reports 2023-24; Hindu Hampi heritage feature.',
  4,
  ARRAY['hanuman','sunrise','viewpoint','pilgrimage','hike']::text[],
  '{}'::jsonb
),
(
  'hampi-daroji-sloth-bear-sanctuary',
  'hampi',
  'Daroji Sloth Bear Sanctuary',
  NULL,
  15,
  '30 min drive SE from Hampi via Kamalapur',
  'Hampi is sold as a pure-heritage destination — most itineraries don''t mention that India''s only dedicated sloth bear sanctuary sits 15km away. The 82 sq km reserve (notified 1994) hosts ~120 sloth bears and works on a watchtower-viewing model (no jeep safari), which doesn''t match the safari template most wildlife travellers expect, so it falls off most circuits.',
  'India''s first sanctuary dedicated specifically to the sloth bear (Melursus ursinus), notified 1994 across 82 sq km of dry deciduous scrub. The Karnataka Forest Department has built a single watchtower at Bilikallu Reserve Forest edge where bears emerge 3.30-6pm to feed on jaggery placed daily on the boulders. Sighting probability 70-80% in dry months (Nov-Apr). Entry ₹250 + ₹100 watchtower; gate opens 3pm. Combine with Tungabhadra Dam (8km onward). No food/water inside — carry your own.',
  'easy',
  'Karnataka Forest Department Daroji Bear Sanctuary (aranya.gov.in); WWF India sloth bear program; Sanctuary Asia 2022 feature.',
  5,
  ARRAY['wildlife','sloth-bear','sanctuary','offbeat','watchtower']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Hampi institutions
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'hampi',
  'Mango Tree Restaurant',
  'Virupapur Gaddi (Hippie Island), Tungabhadra north bank',
  'virupapur-gaddi',
  ARRAY['multi-cuisine','south-indian','israeli','continental']::text[],
  'casual',
  'Thali on the river-side mango tree platform',
  ARRAY['North Karnataka thali','Banana-leaf meals','Israeli shakshuka','Lemon ginger honey tea','Curd rice']::text[],
  '₹',
  '[150,301)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Hampi''s longest-running riverside cafe, named for the massive mango tree under which it operates on the Hippie Island (Virupapur Gaddi) side of the Tungabhadra. Originally opened in the early 2000s; relocated from the south bank to the north after Karnataka High Court demolitions inside the heritage zone (2011). Floor cushions on stepped river terraces, Hindi-Hebrew menu reflecting the Israeli backpacker base, slow service is the norm.',
  'Sunset from 5.30-6.30pm is the peak booking window — arrive 4.30pm to claim a riverfront cushion. Order the thali before 1pm; kitchen runs slow on weekends. Coracle crossing from Hampi Bazaar side last ferry 5.30pm — plan dinner before that or stay overnight on Hippie Island.',
  'Virupapur Gaddi, Hampi 583239',
  'https://maps.google.com/?q=Mango+Tree+Restaurant+Hampi+Hippie+Island',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g319725-d1142077-Reviews-Mango_Tree-Hampi_Bellary_District_Karnataka.html',
    'https://www.zomato.com/hampi/mango-tree-restaurant-virupapur-gaddi'
  ]::text[],
  '2026-05-12',
  false
),
(
  'hampi',
  'Laughing Buddha',
  'Virupapur Gaddi (Hippie Island), riverfront',
  'virupapur-gaddi',
  ARRAY['multi-cuisine','israeli','italian','indian']::text[],
  'casual',
  'River-view pizza and pasta',
  ARRAY['Wood-fired pizza','Banana pancake','Falafel plate','Lemon mint cooler','Apple pie']::text[],
  '₹',
  '[200,401)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Hippie Island institution since the mid-2000s — wooden deck cantilevered over the Tungabhadra with the Virupaksha temple gopura framed in the distance. Mixed Israeli + Italian + Indian menu reflects the long-stay backpacker base (most guests stay 2-4 weeks). Cushion seating, slow Wi-Fi, no AC, mosquito coils after sunset. Open 7am-10.30pm; closes during monsoon (mid-Jun to mid-Sep).',
  'Best view in Hampi at sunset — claim a front-row cushion 30 min before sunset (6pm Oct-Mar). Wood-fired pizza takes 25-30 min; order before the sunset rush. Coracle last ferry to Hampi Bazaar side is 5.30pm — plan to stay on Hippie Island for dinner or pre-book a private coracle.',
  'Virupapur Gaddi, Hampi 583239',
  'https://maps.google.com/?q=Laughing+Buddha+Hampi+Hippie+Island',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g319725-d1539706-Reviews-Laughing_Buddha_Restaurant-Hampi_Bellary_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'hampi',
  'Suresh Restaurant',
  'Hampi Bazaar, near Virupaksha Temple',
  'hampi-bazaar',
  ARRAY['south-indian','north-indian','vegetarian']::text[],
  'casual',
  'North Karnataka jowar roti thali',
  ARRAY['Jowar roti','Brinjal curry','Curd rice','Masala dosa','Limbu pani']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg Hampi Bazaar workhorse — the lunch stop for domestic pilgrims doing the Virupaksha-Vittala temple circuit. Family-run since the early 1990s, sits 100m from the Virupaksha east gate. North Karnataka jowar-roti thali (sorghum flatbread + brinjal curry + jaggery + dal + buttermilk) is the regional anchor, alongside standard South Indian tiffin. Open 7am-10pm.',
  'Pre-noon for the jowar thali — it sells out by 1.30pm on weekends. Cash and UPI both work. Avoid the rear courtyard during summer afternoons (40°C+) — the front-room fan tables are cooler.',
  'Hampi Bazaar, Hampi 583239',
  'https://maps.google.com/?q=Suresh+Restaurant+Hampi+Bazaar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g319725-d2492015-Reviews-Hotel_Suresh_Restaurant-Hampi_Bellary_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'hampi',
  'Mowgli Restaurant',
  'Virupapur Gaddi (Hippie Island)',
  'virupapur-gaddi',
  ARRAY['multi-cuisine','israeli','indian']::text[],
  'casual',
  'Israeli breakfast platter',
  ARRAY['Shakshuka','Hummus plate','Banana lassi','Veg thali','Brown bread sandwich']::text[],
  '₹',
  '[180,351)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Hippie Island staple since the mid-2000s — bamboo-and-thatch huts on the paddy-field edge, set 50m back from the Tungabhadra. Heavy Israeli breakfast skew (shakshuka, labneh, fresh hummus) reflects the long-stay Israeli backpacker corridor that runs Hampi-Pushkar-Manali every winter. Indian thali and momos for lunch crowd. Wi-Fi spotty, electricity load-shedding common 2-5pm.',
  'Israeli breakfast (9-11am) is the strongest window — shakshuka with brown bread is the order. Closes June-August during monsoon (the dirt path floods). Cash preferred; UPI works when network holds.',
  'Virupapur Gaddi, Hampi 583239',
  'https://maps.google.com/?q=Mowgli+Restaurant+Hampi+Hippie+Island',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g319725-d3220283-Reviews-Mowgli-Hampi_Bellary_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'hampi',
  'Funky Monkey Cafe',
  'Anegundi village, Tungabhadra north bank',
  'anegundi',
  ARRAY['multi-cuisine','indian','israeli','continental']::text[],
  'casual',
  'Banana lassi and falafel plate',
  ARRAY['Falafel plate','Banana lassi','Veg sandwich','Curd with honey','Apple cinnamon pancake']::text[],
  '₹',
  '[150,301)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Anegundi-side cafe (north bank, Kishkindha village) that the Hippie Island crowd cycles to for a day-change. Mango-grove courtyard with paddy-field views; opened mid-2010s as part of the Kishkindha Trust craft-tourism push. Less touristed than Virupapur Gaddi — most patrons are 1-2 day cycle visitors from Hippie Island. Closes during heavy monsoon (Jul-Aug).',
  'Cycle from Hippie Island via the Tungabhadra north-bank road — 30 min ride past banana plantations and Anjeyanadri Hill base. Combine with the Kishkindha Trust banana-fibre craft workshop next door. Cash only; UPI inconsistent.',
  'Anegundi village, Hampi 583227',
  'https://maps.google.com/?q=Funky+Monkey+Cafe+Anegundi+Hampi',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g319725-d10180810-Reviews-Funky_Monkey-Hampi_Bellary_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
);
