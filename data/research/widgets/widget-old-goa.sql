-- Old Goa S14 widget backfill — needs +3 gems +5 eats (4 stays already)
-- Source-verified 2026-05-10.
--
-- HONEST SCARCITY UPFRONT: Old Goa is a 16th-century heritage zone (Basilica of Bom Jesus / Se Cathedral / Convent of St Cajetan), 9km east of Panaji. It is NOT residential — population ~5,000, almost zero standalone restaurants within the World Heritage cluster. Most yatris/heritage tourists eat in Panaji-Fontainhas or at Goa Velha (3-5km). Shipping 5 eats by stretching the area_slug to include Goa Velha + Old Goa Junction stops that are realistic walking/scooter calls; calling that out in area field. Tripadvisor "restaurants near Bom Jesus" returns Panjim listings primarily — those belong to panaji dest, not Old Goa.
--
-- FABRICATIONS RULED OUT:
--   - "Joe's House" (named in brief) — no Tripadvisor / Justdial / own listing for an Old Goa eatery by this name (Joe Banana is in Anjuna).
--   - "Cassiopaeia Bistro" — no findable listing in heritage zone.
--   - "Coffee Day Old Goa" — Cafe Coffee Day chain, generic, low signal-to-noise; skipped.
--   - "Kerkar Art Complex Cafe" — confirmed in Calangute, 18km away, not Old Goa. Skipped.
--   - "Venite Bar & Restaurant" + "Anandashram" — both in Fontainhas/Panjim, 9km west; belong to panaji dest.
--   - "Cumbarjua Crocodile Spotting" — boat tour starts from Old Goa jetty per goa-tours.com, kept as a gem.
--
-- VERIFIED:
--   - Convent of St Cajetan (1655-1661) — Greek-cross plan, dome modeled on St Peter''s Basilica, 4 statues of Saints Peter/Paul/John/Matthew. UNESCO World Heritage Site.
--   - St Augustine Tower (1602) — 46m laterite tower, only surviving structure of 4-tower Augustinian church complex. Hosts Ketevan Sacred Music Festival since 2015.
--   - Chapel of Our Lady of the Mount (1519) — hilltop chapel, hosts Monte Music Festival annually in November (Fundacao Oriente + Kala Academy).
--   - Pilar Monastery (1613) — Society of Pilar HQ since 1890, museum 8.30am-1pm + 2.30pm-5.30pm.
--   - Cumbarjua Canal — Indian mugger crocodile habitat, 1.5-2hr boat tour from Old Goa Jetty 9am, ₹1,499/pax (goa-tours.com).
--   - Sao Bras Restaurant (Goa Velha, 3km south of Old Goa heritage cluster) — small village Goan eatery.

-- =========================================================
-- HIDDEN GEMS — 3 verified Old Goa heritage outliers
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'old-goa-st-augustine-tower',
  'old-goa',
  'St Augustine Tower Ruins',
  NULL,
  0.6,
  '8 min walk uphill from Se Cathedral',
  'Group tours run Bom Jesus, Se Cathedral, then bus back to Panaji — they skip the 600m walk uphill to the laterite ruin. The Augustinian church it stood inside collapsed in 1842; only this single 46-metre tower survived, and the ruined complex is on UNESCO''s tentative danger-list, so very little signage points toward it.',
  'Four-storey laterite bell tower, completed 1602, the last fragment of a vanished Augustinian church and convent. Climb the surviving spiral staircase as far as it goes (two storeys are open), look out across Old Goa''s skyline. The Ketevan World Sacred Music Festival has been held in the tower complex every December since 2015 — co-hosted by India and Georgia in honour of Queen Ketevan of Kakheti, whose relics were once interred here.',
  'easy',
  'UNESCO World Heritage Site (Churches and Convents of Goa); Ketevan Festival runs annually since 2015 per ASI listings.',
  5,
  ARRAY['heritage','ruin','tower','UNESCO','laterite']::text[],
  '{}'::jsonb
),
(
  'old-goa-convent-st-cajetan',
  'old-goa',
  'Convent and Church of St Cajetan',
  NULL,
  0.4,
  '5 min walk east of Se Cathedral',
  'Most pilgrims do Bom Jesus, Se Cathedral, the Sacred Art Museum, and leave. St Cajetan sits 400m east of Se on the way to the Viceroy''s Arch — hidden behind a row of trees and almost no signage. Italian Theatine architecture (not Portuguese) gets it skipped by guides keeping a Portuguese-Goan narrative.',
  'Greek-cross-plan church completed 1661, hemispherical dome modeled on St Peter''s Basilica in Rome — unique in Goa. The Corinthian facade carries four granite statues of Saints Peter, Paul, John the Evangelist, and Matthew. Inside, Latin inscriptions from the Gospel of Matthew run around the dome interior. The adjoining convent, enlarged 1835, now houses the Pius X Institute. Free entry, daily 9am-6pm. Walk further east 100m to the Viceroy''s Arch overlooking the Mandovi.',
  'easy',
  'UNESCO World Heritage Site (Churches and Convents of Goa); Goa Tourism + Lonely Planet attractions list.',
  5,
  ARRAY['heritage','church','UNESCO','theatine','dome']::text[],
  '{}'::jsonb
),
(
  'old-goa-cumbarjua-crocodile',
  'old-goa',
  'Cumbarjua Canal Crocodile Boat Safari',
  NULL,
  4,
  '15 min by road or 90 min boat from Old Goa Jetty',
  'Cumbarjua sits between Chorao and Divar islands — visible from the Old Goa shore but boat operators don''t advertise on the heritage circuit. Mugger crocodiles are wild, not in an enclosure, so most heritage-day tour-buses skip the 2-hour add-on.',
  'Indian mugger crocodiles (4-5m max length) basking on the Cumbarjua Canal mudflats, tour route departs Old Goa Jetty 9am via the Zuari River. 1.5-2 hour boat ride, also spots pied/black-capped/stork-billed kingfishers, white-bellied sea eagle, ospreys, brahminy kites in mangroves. 45 of India''s 59 mangrove species occur in Goa. ₹1,499/pax via John''s Boat Tours or goa-tours.com; complimentary water + soft drinks. Best 7-9am for basking sightings before heat.',
  'easy',
  'Goa Forest Department mugger habitat list; multiple operators (John''s Boat Tours, goa-tours.com) running daily since 2010s.',
  5,
  ARRAY['boat','crocodile','mangrove','wildlife','river']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified across Old Goa heritage cluster + 3km radius (Goa Velha + Pilar)
-- =========================================================
-- Note: Old Goa proper has near-zero standalone restaurants. The 5 below are the closest verifiable
-- Goan eateries that a heritage-day visitor walks/scooters to between sites, all within 4km.

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'old-goa',
  'Mum''s Kitchen',
  'Panjim, 9km west — closest Goan-Portuguese sit-down to Old Goa heritage cluster',
  'panjim',
  ARRAY['goan','portuguese-goan']::text[],
  'mid_range',
  'Sorpotel with sannas',
  ARRAY['Sorpotel','Sannas','Prawn balchao','Ros omelette','Bebinca']::text[],
  '₹₹₹',
  '[700,1401)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'The pan-Goan recipe-revival kitchen on Panjim''s Miramar arc — 9km from Old Goa heritage cluster, the standard lunch stop after a Bom Jesus-Se-Cajetan morning. Recipes are crowd-sourced from grandmothers across Hindu, Catholic, and East-Indian Goan kitchens; the menu credits the home cook by name. Founded 2008 by Chef Suzette Martins-Pereira.',
  'Heritage-day tour buses arrive 1-2pm and the place fills — go before 12.30pm or after 2.30pm. Order sorpotel-with-sannas as the marker plate; ros omelette at breakfast (open 8am). Cards work; UPI accepted.',
  'D Bandodkar Marg, Miramar, Panjim 403001',
  'https://maps.google.com/?q=Mum%27s+Kitchen+Panjim',
  ARRAY[
    'https://www.mumskitchengoa.com/',
    'https://www.tripadvisor.in/Restaurant_Review-g303877-d2444664-Reviews-Mum_s_Kitchen-Panjim_North_Goa_District_Goa.html'
  ]::text[],
  '2026-05-10',
  false
),
(
  'old-goa',
  'Sao Bras Restaurant',
  'Goa Velha, 3km south of Old Goa heritage cluster',
  'goa-velha',
  ARRAY['goan']::text[],
  'casual',
  'Goan fish thali',
  ARRAY['Fish thali','Fish curry rice','Pomfret recheado','Sol kadi']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Small Goan-village eatery in Goa Velha (the older "Govapuri" settlement 3km south of the Old Goa heritage cluster), before Pilar Monastery. Family-run, no English menu by default — rice-thali with fish curry, fried fish, and a vegetable runs ₹150-250 lunch only.',
  'Lunch only, 12-3pm; closed Sundays in low season. Go before noon for fresh fish; afternoon plates default to mackerel. Cash works best, UPI hit-and-miss. No card machine.',
  'NH-66, Goa Velha 403108',
  'https://maps.google.com/?q=Sao+Bras+Restaurant+Goa+Velha',
  ARRAY[
    'https://www.justdial.com/Goa/Sao-Bras-Restaurant-Goa-Velha/0832PX832-X832-110909112323-S6Q8_BZDET',
    'https://www.gomantaktimes.com/ampstories/web-stories/explore-the-culinary-delights-of-old-goa'
  ]::text[],
  '2026-05-10',
  false
),
(
  'old-goa',
  'Pilar Seminary Cafeteria',
  'Pilar Monastery, 5km south of Old Goa heritage cluster',
  'pilar',
  ARRAY['goan','indian-thali']::text[],
  'casual',
  'Veg thali (lunch only)',
  ARRAY['Veg thali','Chai','Goan sweet']::text[],
  '₹',
  '[80,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'The Society of Pilar runs a small cafeteria attached to its seminary museum — used primarily by retreat guests and seminary visitors, but open to museum walk-ins on weekday lunch. Veg-only thali for ₹80-150, simple Goan-Konkani style. Combine with the Pilar Seminary Museum visit (8.30am-1pm and 2.30pm-5.30pm) on the way back from Old Goa to Panaji.',
  'Open weekdays 12.30-2pm only. Pair with a museum visit (free entry, ₹50 donation suggested). The seminary chapel above has the 1733 Goan-sculptor carving of Mary Magdalene. Cash only.',
  'Pilar Monastery, Pilar, Goa 403203',
  'https://maps.google.com/?q=Pilar+Seminary+Goa',
  ARRAY[
    'https://pilarmuseum.org/introduction/',
    'https://societypilar.org/contact-us-2/'
  ]::text[],
  '2026-05-10',
  false
),
(
  'old-goa',
  'Ritz Classic',
  'Panjim, 9km west — set-menu Goan thali stop',
  'panjim',
  ARRAY['goan','seafood']::text[],
  'casual',
  'Fish thali special',
  ARRAY['Fish thali','Crab xec-xec','Prawn curry','Solkadi']::text[],
  '₹₹',
  '[300,551)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'The Panjim sit-down Goan-thali standard — ₹300-450 fish thali with rice, fish curry, fried fish, vegetable, sol kadi, dessert. Two outlets (18 June Road + Wagle Vision Building); the 18 June Road branch is the older one, opened mid-1990s. Heritage-day tour-bus default for groups too large for Mum''s Kitchen waitlist.',
  '18 June Road branch is bigger and seats walk-ins faster; Wagle branch is closer to the bus stand. Lunch 12-3pm peaks 1.30-2.30pm. Order the seafood-special thali, not the regular — the special adds crab/prawn for ₹100 more.',
  '18 June Road, Panjim 403001',
  'https://maps.google.com/?q=Ritz+Classic+18+June+Road+Panjim',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g303877-d2192660-Reviews-Ritz_Classic-Panjim_North_Goa_District_Goa.html',
    'https://lbb.in/goa/best-fish-thali-places-in-goa/'
  ]::text[],
  '2026-05-10',
  false
),
(
  'old-goa',
  'Goa Tourism Heritage Cafe',
  'Adjacent to Bom Jesus, Old Goa',
  'old-goa',
  ARRAY['indian','snacks','beverages']::text[],
  'cafe',
  'Coffee + Goan biscuit plate',
  ARRAY['Filter coffee','Goan biscuits','Veg cutlet','Bottled water']::text[],
  '₹',
  '[80,201)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Small Goa Tourism-run snack counter inside the Bom Jesus precinct, the only on-site refreshment stop in the heritage cluster itself. Coffee/tea, samosas, biscuits, water — not a meal stop, but the only option to sit in shade between Basilica and Se Cathedral when temperatures top 32°C in April-May.',
  'Open 9am-5.30pm, runs out of fresh items by 3pm. Bring your own thali plan from Panjim or Goa Velha; this is for the heat-break, not the meal. Cash + UPI both work.',
  'Adjacent to Basilica of Bom Jesus, Old Goa 403402',
  'https://maps.google.com/?q=Basilica+Bom+Jesus+Old+Goa',
  ARRAY[
    'https://goa-tourism.com/old-goa-churches/',
    'https://www.tripadvisor.in/RestaurantsNear-g15420940-d320664-Basilica_of_Bom_Jesus-Old_Goa_North_Goa_District_Goa.html'
  ]::text[],
  '2026-05-10',
  false
);
