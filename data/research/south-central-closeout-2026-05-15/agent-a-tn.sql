-- Agent A — Tamil Nadu widget topup (5 dests, +12 eats)
-- Targets: anamalai 2→5 (+3), meghamalai 2→5 (+3), point-calimere 3→5 (+2),
--          valparai 3→5 (+2), vedanthangal 3→5 (+2)

BEGIN;

-- ============================================================
-- ANAMALAI (+3) — Pollachi/Valparai gateway eateries
-- ============================================================

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'anamalai',
  'The Palm — Multicuisine Restaurant (Coco Lagoon, Pollachi 35km gateway)',
  'Coco Lagoon by Great Mount Resort, Vazhaikombu Nagoor, Meenkarai Road',
  ARRAY['multi-cuisine','indian','continental','pan-asian'],
  'fine_dining',
  ARRAY['Hyderabadi biryani','wood-fired pizza','grilled river fish','South Indian thali','filter coffee'],
  '₹₹₹',
  int4range(700, 1201),
  'veg-friendly',
  'recommended',
  NULL,
  'Pool-and-pond facing all-day diner at Coco Lagoon resort, Tripadvisor-ranked #1 of 17 in Pollachi Town with 104 reviews. Useful pre-Topslip dinner stop if you are staying in the Pollachi coconut-grove belt rather than driving the 40 km uphill to Valparai. Standalone diners welcome, but pricing is resort-grade — expect ₹700-1200 per head versus ₹200 at town messes. Kitchen runs 08:00-23:00 daily including barbecue nights on weekends.',
  'Best after the morning Topslip safari slot — drive down by 13:00 for the lunch buffet. Call +91 94890 46013 ahead; non-resident covers fill on weekends. UPI/cards work; no need to carry cash.',
  'Vazhaikombu Nagoor, Meenkarai Road, Pollachi 642103, Tamil Nadu',
  'https://maps.google.com/?q=The+Palm+Coco+Lagoon+Pollachi',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g2282363-d10802322-Reviews-The_Palm_Multicuisine_restaurant-Pollachi_Town_Pollachi_Coimbatore_District_Tam.html','https://www.greatmount.in/'],
  false,
  true
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'anamalai',
  'Shree Anandhaas (Sundarapuram, Coimbatore — Pollachi-Coimbatore corridor 35km)',
  'Sundarapuram, Pollachi Main Road, Podanur',
  ARRAY['south-indian','tamil','vegetarian','chettinad'],
  'casual',
  ARRAY['ghee podi dosa','filter coffee','mini tiffin','curd rice','sweet jangri'],
  '₹',
  int4range(150, 251),
  'pure-veg',
  'walk-in',
  NULL,
  'Pure-veg South-Indian breakfast and meals chain anchored at the Pollachi-Coimbatore corridor junction at Sundarapuram. Tripadvisor 4.6 with hundreds of reviews; cost-for-two ~₹220. Most travellers driving NH948 toward the Anamalai/Topslip gate stop here for the early-morning tiffin window when town messes inside Pollachi (Hotel Aishwarya, Sakthi) are still ramping up. AC dining hall on first floor; non-AC ground floor.',
  'Hit 06:30-08:30 for the freshest dosa-vada flow before the office-commuter rush at 09:00. Cash or UPI only; do not expect alcohol or non-veg. Parking is easy on the Pollachi Main Road side, not Avinashi Road.',
  '177, Pollachi Main Road, Sundarapuram, Podanur, Coimbatore 641024, Tamil Nadu',
  'https://maps.google.com/?q=Shree+Anandhaas+Sundarapuram+Coimbatore',
  ARRAY['https://shreeanandhaas.com/','https://www.zomato.com/coimbatore/shree-anandhaas-sundarapuram-town-hall'],
  false,
  true
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'anamalai',
  'The Slaves (Pollachi 35km gateway)',
  'Near Durais Theatre, Venkatasa Colony, Pollachi',
  ARRAY['multi-cuisine','indian','continental','grills'],
  'mid_range',
  ARRAY['grilled fish','french fries','mojito','peri-peri chicken','butter chicken'],
  '₹₹',
  int4range(400, 701),
  'mixed',
  'walk-in',
  NULL,
  'Themed multi-cuisine diner on Kamaraj Road near Durais Theatre — the closest Pollachi option for travellers who want grills and non-veg before or after a Topslip safari, since Topslip core has only the TNFD canteen. Tripadvisor 4.6 / 115 reviews; Justdial 4.0 / 2495 reviews. Owner-run, casual seating, popular with Coimbatore weekend day-trippers. Open 10:00-22:00 daily.',
  'Grilled river fish and peri-peri chicken are the calls — skip the Chinese section. Tables fill 19:30-21:00 on Saturdays; walk-ins before 19:00 are smooth. UPI and cards work; +91 94882 54204 for take-away.',
  '10 Mall Road, Near Durais Theatre, Pollachi 642001, Tamil Nadu',
  'https://maps.google.com/?q=The+Slaves+Pollachi',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g2282363-d3576174-Reviews-The_Slaves-Pollachi_Town_Pollachi_Coimbatore_District_Tamil_Nadu.html','https://www.facebook.com/pollachislaves/'],
  false,
  true
);

-- ============================================================
-- MEGHAMALAI (+3) — Theni/Bodinayakanur/Cumbum base-town eateries
-- ============================================================

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'meghamalai',
  'Bodi Iyer Hotel (Cumbum 14km gateway)',
  'L.F. Main Road, Bharathiyar Nagar, Cumbum',
  ARRAY['south-indian','tamil','vegetarian','iyer-style'],
  'casual',
  ARRAY['ghee idli','filter coffee','mini tiffin','sambar rice','curd rice'],
  '₹',
  int4range(120, 201),
  'pure-veg',
  'walk-in',
  NULL,
  'Pure-veg Iyer-mess on Cumbum L.F. Main Road, the closest reliable tiffin stop before the ascent to the High Wavy Mountains — Meghamalai itself has only the BBTCL estate bungalow kitchens. Tripadvisor 4.9 / 8 reviews, ranked #1 of 2 in Cumbum; Sabarimala pilgrims call it out by name on the Tamil-side route. Serves all three meals including a quick mini-tiffin window in the morning.',
  'Idli-vada-pongal slot is 07:00-10:00; the meals plate (sambar-rasam-poriyal-curd) lands at 12:30. Pure-veg only — no eggs. UPI works; phone +91 99941 66000 for parcel orders before driving up the Meghamalai ghat.',
  'L.F. Main Road, Bharathiyar Nagar, Cumbum 625516, Theni district, Tamil Nadu',
  'https://maps.google.com/?q=Bodi+Iyer+Hotel+Cumbum',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g12312153-d10521630-Reviews-Bodi_Iyer_Hotel-Cumbum_Theni_District_Tamil_Nadu.html','https://www.indiainfo.net/place/bodi-iyer-hotel-4443375'],
  false,
  true
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'meghamalai',
  'Green Kitchen Family Restaurant (Theni-Thekkady NH183, 45km gateway)',
  'NH183 Theni-Thekkady road, 9km from Theni toward Thekkady',
  ARRAY['south-indian','tamil','vegetarian','chinese','continental'],
  'mid_range',
  ARRAY['masala dosa','chettinad chapathi','tandoori paneer','Indo-Chinese gobi 65','South Indian thali'],
  '₹₹',
  int4range(250, 451),
  'pure-veg',
  'walk-in',
  NULL,
  'Highway veg multi-cuisine on NH183 (Theni-Thekkady-Madurai axis) — the biggest service-grade restaurant on the road that any Meghamalai-bound traveller passes through. Tripadvisor 4.6 / 167 reviews; Sluurpy 77 / 2598 ratings; Justdial 3.9 / 2424 ratings. Banquet capacity 1000+ makes it the go-to convoy stop for Kerala-Madurai tour buses. Ample parking, clean toilets — useful before the Meghamalai ascent.',
  'Best at 12:00-14:00 for the South Indian thali; the Chinese counter is patchy. Avoid the 19:00-20:30 tour-bus rush — convoys from Madurai-Thekkady stop here for dinner. Cards and UPI both work; no liquor.',
  'NH183, between Theni and Thekkady, Theni district 625531, Tamil Nadu',
  'https://maps.google.com/?q=Green+Kitchen+Family+Restaurant+Theni',
  ARRAY['https://www.tripadvisor.in/Restaurants-g1603630-Theni_Theni_District_Tamil_Nadu.html','https://restaurant-guru.in/Green-Kitchen-Family-Restaurant-Theni-5'],
  false,
  true
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'meghamalai',
  'SRII Ashok Bhavan Hotel (Bodinayakanur 35km gateway)',
  'Main Bazaar, Bodinayakanur town',
  ARRAY['south-indian','tamil','vegetarian'],
  'casual',
  ARRAY['ghee podi idli','meals plate','rava dosa','sambar vada','sweet pongal'],
  '₹',
  int4range(120, 201),
  'pure-veg',
  'walk-in',
  NULL,
  'Pure-veg South Indian mess inside Bodinayakanur Main Bazaar — Bodinayakanur is the rail/road junction (cardamom and mango trade hub at 4500ft) most travellers route through before the Meghamalai-Highwavys ghat road. Restaurant-Guru 3.9 / 29 votes with a "best vegetarian food" review pull-quote. Open until 23:00, useful for late dinners returning from the hills.',
  'Town power-cuts are common 14:00-15:00; if the AC is off, sit outside under the awning. UPI works but keep ₹500 cash for late-night meals. Skip the Chinese section — the South Indian thali is the order.',
  'Main Bazaar, Bodinayakanur 625513, Theni district, Tamil Nadu',
  'https://maps.google.com/?q=SRII+Ashok+Bhavan+Hotel+Bodinayakanur',
  ARRAY['https://restaurant-guru.in/Bodinayakanur','https://www.justdial.com/Bodinayakanur/Restaurants/nct-10408936'],
  false,
  true
);

-- ============================================================
-- POINT-CALIMERE (+2) — Vedaranyam town add-ons
-- ============================================================

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'point-calimere',
  'Aananthaa A/C Restaurant (Vedaranyam 10km gateway)',
  'East Main Street, North Madavilagam, near Bus Stand, Vedaranyam',
  ARRAY['south-indian','tamil','indo-chinese','multi-cuisine'],
  'casual',
  ARRAY['South Indian meals','tandoori chicken','veg fried rice','paneer butter masala','filter coffee'],
  '₹',
  int4range(150, 301),
  'mixed',
  'walk-in',
  2012,
  'AC multi-cuisine restaurant near the Vedaranyam bus stand — the only AC sit-down option in the only base town for Kodiakkarai/Point Calimere (the sanctuary itself has tea stalls only). Justdial 3.9 / 231 ratings, in operation since 2012. Both veg and non-veg under one roof, which is rare on this coast where the rest of Vedaranyam is pure-veg-mess-only. Open until 22:30.',
  'Order the South Indian unlimited meals (₹120-150) at lunch; tandoori is on but quality is hit-and-miss. UPI works, cash backup advisable — power-cuts on the Vedaranyam line knock the POS offline. Wheelchair accessible per Justdial listing.',
  'East Main Street, North Madavilagam, Vedaranyam 614810, Nagapattinam district, Tamil Nadu',
  'https://maps.google.com/?q=Aananthaa+AC+Restaurant+Vedaranyam',
  ARRAY['https://www.justdial.com/Nagapattinam/Aananthaa-AC-Restaurant-Near-Bus-Stand-Vedaraniam/9999P4365-4365-190719200335-D6M9_BZDET','https://in.worldorgs.com/catalog/vedaranyam/amusement-park/aananthaa-ac-restaurant'],
  false,
  true
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'point-calimere',
  'Veda Mess (Vedaranyam 10km gateway)',
  'East Main Street, near Bus Stand, Vedaranyam',
  ARRAY['south-indian','tamil','vegetarian'],
  'casual',
  ARRAY['idli','sambar rice','rasam rice','curd rice','filter coffee'],
  '₹',
  int4range(80, 151),
  'pure-veg',
  'walk-in',
  NULL,
  'Tripadvisor lists this explicitly as "the only pure vegetarian restaurant in Vedaranyam" — material for travellers driving from Tiruchirappalli or Thanjavur to the Point Calimere sanctuary, since the coast itself flips entirely to seafood/fish-curry economics and most pilgrims to the Vedaranyam temple expect a Saiva-veg meal. Very small, very basic, very clean per Tripadvisor reviewer language; not a destination restaurant — a working mess.',
  'Breakfast tiffin lands 07:00-10:30; meals 12:00-15:00; closes early at 21:00. Cash preferred. The bus-stand frontage makes it easy to combine with a 06:00 onward bus to Kodiakkarai (9 km south) for the sunrise blackbuck slot at the sanctuary.',
  'East Main Street, near Vedaranyam Bus Stand, Vedaranyam 614810, Nagapattinam district, Tamil Nadu',
  'https://maps.google.com/?q=Veda+Mess+Vedaranyam',
  ARRAY['https://www.tripadvisor.com/Restaurant_Review-g7908989-d23825332-Reviews-Veda_Mess-Vedaranyam_Nagapattinam_District_Tamil_Nadu.html','https://www.tripadvisor.in/Restaurants-g7908989-Vedaranyam_Nagapattinam_District_Tamil_Nadu.html'],
  false,
  true
);

-- ============================================================
-- VALPARAI (+2) — Valparai town additions
-- ============================================================

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'valparai',
  'Sree Sabari Mess',
  '9/111 Main Road, Valparai town centre',
  ARRAY['south-indian','tamil','vegetarian','home-style'],
  'casual',
  ARRAY['idli-vada','poori-pongal','sambar rice','filter coffee','chapathi-noodles dinner'],
  '₹',
  int4range(100, 181),
  'pure-veg',
  'recommended',
  NULL,
  'Tripadvisor #1 of 1 listed restaurant in Valparai (4.7 / 18 reviews) — a family-run home-mess on Main Road, run as a household kitchen with a maximum capacity of about 8 diners at a time. Reviewers consistently describe it as "homely" and "the only pure vegetarian mess" in Valparai. Has served the town for 15+ years and is the default lunch stop for tea-estate workers and budget travellers.',
  'Call +91 89039 51996 ahead — only 8 seats, no walk-in guarantee at meal-time. Idli-vada-pongal 07:00-09:30; meals 12:30-14:30; dinner is chapathi/noodles only after 19:30. Cash only, no UPI.',
  '9/111 Main Road, Valparai 642127, Coimbatore district, Tamil Nadu',
  'https://maps.google.com/?q=Sree+Sabari+Mess+Valparai',
  ARRAY['https://www.tripadvisor.com/Restaurant_Review-g3149947-d10830719-Reviews-Sree_Sabari_Mess-Valparai_Coimbatore_District_Tamil_Nadu.html','https://www.sluurpy.in/valparai/restaurant/4506050/sree-sabari-mess'],
  false,
  true
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'valparai',
  'Hotel Saravana Grand (in-house restaurant)',
  '9/73 State Bank Road, Valparai town',
  ARRAY['south-indian','tamil','vegetarian','indo-chinese'],
  'mid_range',
  ARRAY['Chettinad veg meals','masala dosa','paneer dishes','filter coffee','sambar rice'],
  '₹₹',
  int4range(250, 451),
  'pure-veg',
  'recommended',
  NULL,
  'Multi-cuisine pure-veg in-house restaurant at Hotel Saravana Grand on State Bank Road — Valparai town centre, 1 km from the bus station. Reviewers note the rooftop has a clean view of the surrounding tea estates; useful as a sit-down dinner option in a town where most evening dining shuts by 21:00 outside hotel restaurants. Open to non-residents. Rooms operate year-round but the restaurant is the more reliable resource.',
  'Rooftop seating fills at 18:30-20:00 for the sunset over the Anaimalai range — get there by 18:00. Chettinad meals are the call; the Indo-Chinese is forgettable. UPI and cards both work. Phone +91 94872 22466.',
  'No 9/73 State Bank Road, Valparai 642127, Coimbatore district, Tamil Nadu',
  'https://maps.google.com/?q=Hotel+Saravana+Grand+Valparai',
  ARRAY['https://www.tripadvisor.in/Hotel_Review-g3149947-d10278668-Reviews-Hotel_Saravana_Grand-Valparai_Coimbatore_District_Tamil_Nadu.html','https://www.hotelsaravanagrand.com/index.html'],
  false,
  true
);

-- ============================================================
-- VEDANTHANGAL (+2) — Madurantakam base-town add-ons
-- ============================================================

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'vedanthangal',
  'Hotel Vasantha Bhavan (Madurantakam 12km gateway)',
  'Car Street, near Madurantakam Bus Stand',
  ARRAY['south-indian','tamil','vegetarian','indo-chinese'],
  'casual',
  ARRAY['Madurantakam-style mini tiffin','ghee podi dosa','sambar rice','full meals plate','filter coffee'],
  '₹',
  int4range(150, 301),
  'pure-veg',
  'walk-in',
  NULL,
  'Pure-veg South Indian mess on Car Street near the Madurantakam bus stand — Madurantakam is the closest taluk town (12km) and the natural breakfast stop for sanctuary visitors who drive out from Chennai at 04:30 to catch the dawn-arrival bird sightings at Vedanthangal between 06:00-08:00. Justdial 4.0 / 164 reviews, 9 years in business. Average ₹350 for two. Open until 22:30.',
  'Hit it 06:00-07:30 if you are catching the early-morning bird window — idli-vada-pongal is fresh, post-08:00 the rush from buses thickens. UPI and cash both work. Skip the Chinese section.',
  'Car Street, near Bus Stand, Madurantakam 603306, Chengalpattu district, Tamil Nadu',
  'https://maps.google.com/?q=Hotel+Vasantha+Bhavan+Madurantakam',
  ARRAY['https://www.justdial.com/Kanchipuram/Hotel-Vasantha-Bhavan-Near-Bus-Stand-Madurantakam/9999PXX44-XX44-170427193509-G3V3_BZDET','https://www.vasantabhavan.in/branch'],
  false,
  true
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category, must_try, price_range, price_per_head_inr,
  vegetarian, reservation, established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, is_legendary, is_active
) VALUES (
  'vedanthangal',
  'JP Punjabi Dhaba (Madurantakam NH45/NH32, 12km gateway)',
  'Near Madurantakam Court, NH45 (Chennai-Trichy-Kanyakumari Road)',
  ARRAY['north-indian','punjabi','tandoor','mixed','dhaba'],
  'mid_range',
  ARRAY['butter chicken','tandoori chicken','tandoori naan','dal makhani','chicken fried rice'],
  '₹₹',
  int4range(300, 601),
  'mixed',
  'walk-in',
  NULL,
  'Punjabi-style highway dhaba on NH45 (renumbered NH32, Grand Southern Trunk Road) diagonally opposite Manoj Bhavan near Madurantakam court — about 100 km from Chennai and the obvious non-veg stop for travellers returning from Vedanthangal to Chennai or onwards to Pondicherry. Justdial 4.0 / 1529 reviews; Restaurant-Guru 4.0 / 1477 reviews. Open 12:00-24:00 daily, ample roadside parking for cars and tour buses.',
  'Tandoori chicken is the call (large pieces flagged by reviewers); skip the south Indian side of the menu — go to Vasantha Bhavan for that. Dinner crowd peaks 20:00-22:00. Cash and UPI; cards reliable on this stretch.',
  '21, NH45 (Grand Southern Trunk Road), near Madurantakam Court, opposite Manoj Bhavan, Madurantakam 603306, Chengalpattu district, Tamil Nadu',
  'https://maps.google.com/?q=JP+Punjabi+Dhaba+Madurantakam',
  ARRAY['https://www.justdial.com/Kanchipuram/Jp-Punjabi-Dhaba-Near-Madurantakam-Court-Diagonally-Opp-to-Manoj-Bhavan-NH-45-Madurantakam/9999PXX44-XX44-171128002734-F2G7_BZDET','https://restaurant-guru.in/JP-Punjabi-Dhaba-Madurantakam'],
  false,
  true
);

COMMIT;
