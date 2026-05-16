-- Agent C — Manipur+Mizoram+Nagaland+Sikkim 2026-05-15
-- Scope: tamenglong, moreh, phawngpui-peak, pfutsero, gurudongmar-lake, khangchendzonga-np, tsomgo-lake, zuluk
-- Tally: 6 eats + 5 stays
-- HS B-locks declared: 7
--   - moreh stays (+2 needed, 0 verifiable beyond existing Elora) → 2 HS-stays
--   - phawngpui-peak eats (+3 needed, NP-core no commerce) → 3 HS-eats
--   - pfutsero eats (+2 needed, only 1 verifiable anchor) → 1 HS-eat
--   - gurudongmar-lake eats (+3 needed, no village/commerce at 5430m) → 3 HS-eats
--   - gurudongmar-lake stays (+0 needed; day-trip from Lachen 121km) → covered by note
--   - tsomgo-lake stays (+3 needed, restricted area no overnight) → 3 HS-stays
--   - zuluk eats (+1 needed, all homestay-attached, no standalone) → 1 HS-eat
-- Dests delivered with rows: tamenglong (3e+2s), pfutsero (1e), khangchendzonga-np (1s + via Tshoka), tsomgo-lake (1e), gurudongmar-lake (eats-only fallback note)
--
-- NOTE: khangchendzonga-np stays = trekkers' huts inside park boundary. These are run by Sikkim Forest Dept,
--       not commercial properties. The brief asked +3 stays but Yuksom (separate dest) handles gateway lodging.
--       I'm inserting 3 stays anchored to Tshoka/Dzongri/Bakhim trekkers' huts as verified KNP-interior options.
-- NOTE: tsomgo-lake eats: brief says +1 eat (already has Lucky 7 + Food Court). Adding 1 more verifiable cafeteria.

-- ============================================================================
-- HIDDEN GEMS
-- ============================================================================
-- None for this batch — brief is eats+stays-only topup.


-- ============================================================================
-- LOCAL EATERIES
-- ============================================================================

INSERT INTO local_eateries (destination_id, name, area, category, cuisine, signature_dish, must_try, price_range, price_per_head_inr, why_it_matters, insider_tip, signature_address, source_urls, vegetarian, is_legendary, established_year) VALUES

-- ============================================================================
-- tamenglong eats (3) — district HQ pop ~30k, Zeliangrong Naga heartland
-- ============================================================================

('tamenglong', 'Tamenglong District Tourist Lodge — Dining Hall', 'Tamenglong town centre', 'casual',
 ARRAY['Naga','Indian','Meitei'],
 'Naga thali (smoked pork + rice + boiled greens)',
 ARRAY['Smoked pork (Zeliangrong style)','Bamboo-shoot fish curry','Boiled greens with axone','Black rice kheer'],
 '₹', int4range(140, 280),
 'The dining hall attached to the District Tourist Lodge is the most-cited sit-down option in Tamenglong town — Naga thali cooked Zeliangrong-style (smoked rather than fresh pork) with rice from the Barak valley. Functional rather than scenic, but the only place in town with a printed menu and a kitchen that holds stock through the day. The lodge sits in the centre of Tamenglong, walking distance from the orange-festival grounds at Buongpui.',
 'Order ahead by 11 AM for lunch and 5 PM for dinner — they cook to numbers, not to menu. Vegetarians should specifically ask for "Naga veg thali" with boiled greens and dal; the default plate is pork-heavy. Coffee from Tamenglong''s own orchards (the district is part of Manipur''s coffee-revival map) is served only by request.',
 'Tamenglong District Tourist Lodge, Tamenglong, Manipur 795141',
 ARRAY['https://tamenglong.nic.in/tourist-places/','https://www.tourmyindia.com/states/manipur/tamenglong.html'],
 'mixed', false, NULL),

('tamenglong', 'Buongpui Orange Festival Food Court (seasonal Dec)', 'Buongpui festival grounds', 'street_food',
 ARRAY['Naga','Zeliangrong','Tribal'],
 'Smoked pork with bamboo shoot rice',
 ARRAY['Naga rice with axone','Boiled wild greens','Tamenglong oranges (peeled fresh)','Black rice porridge'],
 '₹', int4range(80, 200),
 'During the December Orange Festival (running annually since 2001 — 18th edition in Dec 2024 at Tamenglong) the Buongpui ground hosts a community-cooked food court where Zeliangrong, Rongmei, Liangmei, Zemei and Pumei kitchens serve their version of smoked-pork-and-rice side by side. The most efficient way to taste 5 sub-tribal Naga cuisines in one afternoon. Outside festival weeks the ground is empty.',
 'Festival runs the third week of December (17-19 Dec in 2025). Eat early — most stalls clear stock by 3 PM and the cultural performances start at 4. Tamenglong oranges peak at this exact festival window — buy a kilo from the growers'' competition booths, not the roadside touts.',
 'Buongpui festival ground, Tamenglong, Manipur 795141',
 ARRAY['https://northeasttoday.in/northeast/18th-state-level-orange-festival-concludes-in-tamenglong-celebrated-as-beacon-of-peace-and-unity/','https://tamenglong.nic.in/festivals-of-tamenglong/'],
 'mixed', false, 2001),

('tamenglong', 'Tamenglong Bazaar Rice Hotels', 'Tamenglong town main bazaar', 'casual',
 ARRAY['Naga','Tribal'],
 'Rice with pork and boiled greens',
 ARRAY['Smoked pork with rice','Beef thali','Boiled wild greens (siking)','Black tea'],
 '₹', int4range(100, 180),
 'A cluster of 4-5 small unnamed "rice hotels" (the Naga term for basic dhabas) along Tamenglong main bazaar serving rice with pork/beef/chicken and seasonal wild greens. None have stable Tripadvisor listings or printed menus — this is honest-scarcity infrastructure rather than curated dining. The Zeliangrong axone-fermented-soybean garnish is the regional marker absent from neighbouring districts.',
 'Walk the main bazaar between 12-2 PM and pick the rice hotel with the highest local-foot-traffic — that''s the freshest stock. Vegetarian options run thin; ask for "dal-bhat with siking" (wild greens). The bazaar shuts by 6 PM, so dinner means returning to the Tourist Lodge.',
 'Main Bazaar, Tamenglong town, Manipur 795141',
 ARRAY['https://www.tourmyindia.com/states/manipur/tamenglong.html','https://nexplore.org/destinations/manipur/tamenglong.php'],
 'meat-heavy', false, NULL),

-- ============================================================================
-- pfutsero eats (1) — Mini Tourist Lodge canteen. Other rice hotels too thin to anchor as named.
-- ============================================================================

('pfutsero', 'Pfutsero Mini Tourist Lodge — Dining', 'Pfutsero town', 'casual',
 ARRAY['Naga','Chakhesang','Indian'],
 'Smoked pork with rice (Chakhesang style)',
 ARRAY['Smoked pork with rice','Pork with bamboo shoot','Dal-rice combo with boiled greens','Hot tea (sub-zero winter staple)'],
 '₹', int4range(120, 250),
 'The community-owned Mini Tourist Lodge canteen is the only printed-menu eatery in Pfutsero town outside Cafe 4Zero — meals at ~₹120 breakfast / ₹200 lunch-dinner per traveller accounts. Pfutsero sits at 2,133m (highest inhabited town in Nagaland, pop 10,371 per 2011 census) and winter nights drop below 0°C — the kitchen pivots to hot smoked-pork thalis Nov-Feb when the cold-storage stalls outside shut early. Cherry-blossom season (Nov-Dec) drives the most footfall outside the Cosmos Zenith Festival weekend (Nov 8 in 2024).',
 'Book your room and your meals at the same time — the canteen runs to lodge numbers and won''t reliably feed walk-ins. The Chakhesang smoked-pork preparation uses bamboo-shoot ferment (different from the Sema axone you''ll find in Kohima) — ask for it with chokri-style chilli paste. Avoid post-7 PM dinner; the kitchen winds down for the cold.',
 'Mini Tourist Lodge, Pfutsero, Phek District, Nagaland 797108',
 ARRAY['https://footloosedev.com/pfutsero-nagaland/','https://travellingslacker.com/pfutsero-phek-nagaland/','https://en.wikipedia.org/wiki/Pf%C3%BCtsero'],
 'mixed', false, NULL),

-- ============================================================================
-- khangchendzonga-np eats (1) — Tshoka trekkers'' hut kitchen. Other interior huts (Dzongri/Bakhim) covered as same-network — listing 1 anchor.
-- ============================================================================

('khangchendzonga-np', 'Tshoka Trekkers'' Hut Kitchen', 'Tshoka village, KNP buffer (Day-2 night halt on Goecha La route)', 'casual',
 ARRAY['Sikkimese','Tibetan','Nepali','Indian'],
 'Dal-bhat-tarkari with momos',
 ARRAY['Dal-bhat-tarkari','Vegetable momos','Thukpa','Wai-Wai noodles + boiled eggs','Salt-butter tea'],
 '₹₹', int4range(400, 800),
 'The only commercial kitchen between Yuksom road-head and the Goecha La pass — Tshoka sits at ~3,000m, the only major night halt on the upward Khangchendzonga National Park climb, and the trekkers'' hut accommodates ~24 people. Run by a handful of resident Tibetan families with no electricity, the kitchen serves hot dal-bhat at ₹1,200-1,500/day-rate (food + hut + caretaker) — expensive for what it is, but the only option for trekkers inside the UNESCO Mixed Heritage zone. Kitchen at Bakhim (Day-1 lunch stop) and Dzongri (Day-3 night) operate on the same Sikkim Forest Dept model.',
 'Cook quality is variable trip-to-trip — some seasons the caretaker is a Goecha La veteran and the dal is good; other seasons it''s rationed Wai-Wai. Carry instant coffee, dry fruits, and ORS for back-up. Booking is through your registered tour operator (mandatory for Goecha La permit) — you cannot turn up freelance. Salt-butter tea is the high-altitude staple; sweet tea is poured for guests on request.',
 'Tshoka trekkers'' hut, Khangchendzonga National Park, Yuksom-Goecha La trail, West Sikkim',
 ARRAY['https://www.darjeeling-tourism.com/darj_0000b5.htm','https://himalayatrekker.com/tours/goecha-la-trek/','https://www.gio.in/trips/treks/dzongri-goecha-la'],
 'veg-friendly', false, NULL),

-- ============================================================================
-- tsomgo-lake eats (1) — already has Lucky 7 + Food Court. Adding one more cafeteria-cluster anchor.
-- ============================================================================

('tsomgo-lake', 'Tsomgo Lake Cafeteria Cluster (Yak Stall row)', 'Tsomgo Lake parking arc — yak-ride stalls', 'casual',
 ARRAY['Sikkimese','Tibetan','Indian'],
 'Hot maggi + tea (high-altitude staple)',
 ARRAY['Maggi noodles','Veg momos','Hot ginger-lemon tea','Aloo paratha','Salt-butter tea'],
 '₹', int4range(80, 220),
 'A row of 6-8 plywood cafeterias lining the Tsomgo Lake parking arc just behind the yak-ride stalls — the cluster that follows the Lucky 7 + main Food Court and serves day-trippers between 9 AM and 3 PM (the lake is day-trip-only; no overnight stay is permitted at 3,753m by Indian Army permit rules). All cafeterias serve the same template — instant noodles, momos, ginger-lemon tea — at near-identical pricing controlled by the cab-driver collective. Walk to the second or third stall from the lake edge for shorter queues.',
 'Carry your own water bottle — the bottled-water markup at 12,300 ft hits ₹40/litre. The cafeteria you eat at is usually determined by your driver''s commission arrangement, not by quality; if you have a clear preference, walk past the first stall to the cluster''s back end. The chowmein looks tempting but the maggi is the safer bet at altitude.',
 'Tsomgo Lake parking arc, East Sikkim 737101',
 ARRAY['https://www.thestreetfoodguy.com/lucky-7-restaurant-lake-tsomgo/','https://sikkim.ch/en/blog-post/day-trip-to-tsomgo-lake-in-east-sikkim/','http://www.sikkimstdc.com/GeneralPages/Details/Tsomgo-Lake/20/'],
 'veg-friendly', false, NULL);

-- ============================================================================
-- HONEST-SCARCITY EAT B-LOCKS (no INSERT):
--   - moreh: brief asked stays only, eats already at 5 (no action)
--   - phawngpui-peak (+3 eats requested): NP-core, all dining is homestay/lodge-attached. Sangau gateway (3-4k pop fringe village) has no standalone eateries verifiable via 2024+ Tripadvisor/state tourism. HONEST SCARCITY DECLARED.
--   - pfutsero (+2 eats requested, 1 delivered above): town pop 10,371 but commercial dining beyond Cafe 4Zero + Mini Tourist Lodge canteen is unnamed "rice hotels" with no stable listings. 2nd named anchor refused. HONEST SCARCITY DECLARED for slot #2.
--   - gurudongmar-lake (+3 eats requested): 5,430m alpine lake, Inner Line Permit zone, no village, no commerce. Day-trip from Lachen only (121km, 6 hrs from Gangtok). All meals at Lachen (separate dest). HONEST SCARCITY DECLARED — full 3-eat lock.
--   - khangchendzonga-np: 1 eat delivered (Tshoka). Dzongri + Bakhim are same network, deliberately not duplicated (each entry would be ghost-redundant). Could expand to 3 if user wants — flagging as 2 additional possible-but-redundant.
--   - tsomgo-lake (+1 eat requested, 1 delivered above)
--   - zuluk (+1 eat requested): all dining is homestay-attached (Dil Maya + Zuluk Sojourn already listed as eat entries). No standalone non-homestay eateries exist per 2024 review evidence (Better India, Sikkim Silk Route, Discover Zuluk). HONEST SCARCITY DECLARED.
-- ============================================================================


-- ============================================================================
-- DESTINATION STAY PICKS
-- ============================================================================

INSERT INTO destination_stay_picks (destination_id, slot, name, property_type, signature_experience, why_nakshiq, price_band, confidence, source, source_ref, sources, voice_flags) VALUES

-- ============================================================================
-- tamenglong stays (2) — district HQ; Tourist Lodge already in DB as experience
-- ============================================================================

('tamenglong', 'value', 'Tamenglong PWD Inspection Bungalow', 'guesthouse',
 'Government inspection bungalow with basic rooms, hot-water bucket, and on-call kitchen — the budget fall-back when the Tourist Lodge is festival-booked.',
 'The PWD I.B. is the established budget option in Tamenglong town confirmed by the district administration website as one of the two settlement-grade accommodations (Forest Rest House being the other). It''s a working govt bungalow rather than a hotel — bookings go through the PWD Sub-Divisional office and rooms are released to travellers on availability. The standard for a small Manipur hill-district HQ where private mid-range inventory is thin.',
 'value', 4, 'web_search',
 'https://tamenglong.nic.in/tourist-places/',
 to_jsonb(ARRAY['https://tamenglong.nic.in/tourist-places/', 'https://www.tourmyindia.com/states/manipur/tamenglong.html']),
 to_jsonb(ARRAY['govt-inventory','budget-only','book-via-pwd','no-online-booking'])),

('tamenglong', 'location', 'Tamenglong Forest Rest House', 'forest_resthouse',
 'Forest-department rest house with verandah views over the orange orchards and Barak valley — closest formal stay to the orange-festival grounds.',
 'The Forest Rest House is one of two government-listed accommodation options in Tamenglong (confirmed by district tourism page and Manipur tourism). It sits on the edge of the orange-growing belt and is the closest formal stay to the Buongpui festival ground. Walking access to the bazaar (5-10 min) and the Tourist Lodge dining hall. Forest-dept caretaker handles the keys; booking through Tamenglong DFO office.',
 'value', 4, 'web_search',
 'https://tamenglong.nic.in/tourist-places/',
 to_jsonb(ARRAY['https://tamenglong.nic.in/tourist-places/', 'https://www.travelworldplanet.com/national-parks-and-wildlife-sanctuaries-in-manipur/']),
 to_jsonb(ARRAY['govt-inventory','forest-dept','book-via-dfo','no-online-booking','orange-festival-adjacent'])),

-- ============================================================================
-- khangchendzonga-np stays (3) — KNP interior trekkers' huts, Sikkim Forest Dept
-- ============================================================================

('khangchendzonga-np', 'experience', 'Tshoka Trekkers'' Hut (KNP Day-2 night halt)', 'character_lodge',
 'Wooden trekkers'' hut at ~3,000m inside Khangchendzonga National Park — the night halt on the Goecha La climb, run by Sikkim Forest Dept with a Tibetan caretaker family.',
 'Tshoka is the only major night halt on the upward Goecha La route through the UNESCO Mixed Heritage zone and the trekkers'' hut accommodates ~24 people in a single hall + a couple of small rooms. The closest you can sleep to Khangchendzonga without a private tent. No electricity. The caretaker family is one of a handful of Tibetan households resident in Tshoka. Booked through registered Goecha La trek operators only — Indian Mountaineering Foundation permit mandatory.',
 'experience', 5, 'web_search',
 'https://www.darjeeling-tourism.com/darj_0000b5.htm',
 to_jsonb(ARRAY['https://www.darjeeling-tourism.com/darj_0000b5.htm','https://himalayatrekker.com/tours/goecha-la-trek/','https://www.gio.in/trips/treks/dzongri-goecha-la']),
 to_jsonb(ARRAY['trekkers-hut','park-interior','permit-required','operator-only-booking','no-electricity','tibetan-caretaker'])),

('khangchendzonga-np', 'location', 'Dzongri Trekkers'' Hut (Goecha La Day-3 camp)', 'character_lodge',
 'Trekkers'' hut at ~4,030m on the Dzongri plateau — closest legal sleep to the Kabru viewpoint inside KNP.',
 'Dzongri is the high-camp on the Goecha La route, sitting on a windswept plateau at ~4,030m where most trekkers spend a rest-and-acclimatisation day before pushing to Lamuney. Overnight is in the Forest Department trekkers'' hut + tents pitched outside; the hut provides a small bunk room and a kitchen-cum-dining hall. The 4:30 AM walk-up to Dzongri-La viewpoint for the Kanchenjunga sunrise is the trek''s signature moment. Operator-booked only; permit + IMF clearance mandatory.',
 'experience', 5, 'web_search',
 'https://www.visithimalayastrek.com/dzongri-goecha-la-trek',
 to_jsonb(ARRAY['https://www.visithimalayastrek.com/dzongri-goecha-la-trek','https://himalayatrekker.com/tours/goecha-la-trek/','https://taleof2backpackers.com/dzongri-goechala-trek/']),
 to_jsonb(ARRAY['trekkers-hut','high-altitude','plateau-camp','permit-required','kanchenjunga-sunrise','operator-only-booking'])),

('khangchendzonga-np', 'value', 'Bakhim Trekkers'' Hut (KNP Day-1 lunch + overflow)', 'character_lodge',
 'Lower-altitude trekkers'' hut at ~2,750m — the Day-1 lunch stop and overflow night halt when Tshoka is full.',
 'Bakhim sits at ~2,750m between Sachen and Tshoka on the Yuksom-Goecha La trail — the standard Day-1 lunch stop where most operators serve hot dal-bhat before the steep push to Tshoka. The trekkers'' hut here is the budget option for groups whose Tshoka night-allocation slipped, and the only KNP-interior hut at a comfortable altitude. Same Sikkim Forest Dept caretaker network; same operator-only booking pathway. Cheaper because the demand pattern is lighter.',
 'value', 4, 'web_search',
 'https://www.darjeeling-tourism.com/darj_0000b5.htm',
 to_jsonb(ARRAY['https://www.darjeeling-tourism.com/darj_0000b5.htm','https://indiatravelogue.com/adve/trek/trek1.html']),
 to_jsonb(ARRAY['trekkers-hut','park-interior','permit-required','operator-only-booking','lunch-stop','overflow-night-option']));


-- ============================================================================
-- HONEST-SCARCITY STAY B-LOCKS (no INSERT):
--   - moreh (+2 stays requested): Tengnoupal District govt page lists ONLY Elora Hotel (already in DB).
--                                  Tampha Hotel & Hotel Tampha Tripadvisor listings turned out to be IMPHAL.
--                                  Hotel Soyba / AR Inn / Border Trade Inn — zero verifiable evidence.
--                                  HONEST SCARCITY DECLARED for both moreh stay slots.
--   - phawngpui-peak (+3 stays requested): Existing 3 stays cover the verified inventory
--                                           (Far Pak FRH, Sangau Tourist Lodge — note Far Pak listed twice as
--                                           experience+xfactor is a DUPLICATE pre-existing data debt, flagged
--                                           in agent-c-notes.md for separate cleanup). HONEST SCARCITY DECLARED.
--   - gurudongmar-lake (+0 stays requested, all stays at Lachen 121km / 6hr away — separate dest)
--   - tsomgo-lake (+3 stays requested): 3,753m lake under Indian Army permit control. No overnight
--                                        accommodation permitted at lake itself or at Kupup village (border zone).
--                                        Day-trip-only from Gangtok per Sikkim STDC + STDC official pages.
--                                        HONEST SCARCITY DECLARED for all 3 stay slots.
-- ============================================================================
