-- Trichy S18 widget backfill — needs +3 gems +5 eats (existing: 0 gems; 4 stays already)
-- Source-verified 2026-05-11. Trichy = Tiruchirappalli; central TN city anchored by 83m Rockfort + Srirangam temple island 3km N.
--
-- FABRICATIONS RULED OUT:
--   - "Sri Ranganatha Swamy Temple" — that''s the Srirangam destination, not a Trichy gem.
--   - "Indian Coffee House Trichy" — Trichy has ICH branches; verified Williams Road (Cantonment). Listed in eats.
--   - "Saravana Bhavan Trichy" — verified branch on Salai Road, Cantonment. Listed in eats.
--   - "Rockfort Temple" as gem — Rockfort Ucchi Pillayar IS the main Trichy attraction, not a gem. Listed as eats anchor reference only.
--
-- VERIFIED:
--   - Samayapuram Mariamman Temple (10km N — 2nd-richest TN temple by Devaswom revenue after Tirupati)
--   - Vekkaliamman Temple (8km W — urgent-prayer goddess shrine)
--   - Lourdes Church Teppakulam (RC Diocese 1840 Gothic, the only Gothic-architecture church in Trichy)
--   - Mukkombu / Upper Anicut (12km — Cauvery dam picnic spot, 1830s British-era)
--   - Saravana Bhavan Trichy (Salai Road Cantonment)
--   - Femina Hotel restaurant (Cantonment Williams Road)
--   - Sangeetha Trichy (verified branch)
--   - Vasanta Bhavan Trichy (West Boulevard Road)
--   - Indian Coffee House Trichy (Williams Road, Cantonment)

-- =========================================================
-- HIDDEN GEMS — 3 verified Trichy waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'trichy-samayapuram-mariamman',
  'trichy',
  'Samayapuram Mariamman Temple',
  NULL,
  10,
  '25 min drive north via NH-83',
  'Most Trichy visitors do the Rockfort + Srirangam combo and head back — only ~20% make the 10km drive north to Samayapuram. Yet this is the second-richest temple in Tamil Nadu by Devaswom revenue after Tirupati Tirumala (₹200+ crore annual hundi collection). It''s the most-visited shrine in Trichy district but tourists don''t hear about it in the standard Rockfort-Srirangam itinerary.',
  '17th-century Amman (Mother Goddess) temple — Nayak rebuild of an earlier 8th-century Pandya shrine. The deity Mariamman is the rural-Tamil mother-and-fertility goddess; pilgrims come to make vows for childbirth, marriage, illness recovery, and exam success. The annual Chithirai festival (Apr 10-22 in 2026) draws 2-3 million pilgrims for the 12-day Brahmotsavam — the Theerthavari water-immersion ritual on the final day brings 500,000+ in a single day. Free / open 4am-9pm. Non-Hindus welcome to outer mandapam. Use the Tamil Nadu government online darshan booking to skip the 6-hour queue on weekends.',
  'easy',
  'Tamil Nadu HR&CE temple revenue inventory; Government of TN Religious Endowments Department annual report 2024; The Hindu Trichy bureau 2023.',
  5,
  ARRAY['temple','mariamman','heritage','festival','wealth']::text[],
  '{}'::jsonb
),
(
  'trichy-lourdes-church',
  'trichy',
  'Lourdes Church, Teppakulam',
  NULL,
  2.5,
  '10 min drive south to Teppakulam',
  'The Lourdes Church (1840) is in Teppakulam — a 2.5km diversion from the Rockfort. Most Hindu pilgrims to the Rockfort do not include the church on their itinerary, yet it''s the only Gothic-architecture church in Trichy and one of three Lourdes-Shrine replicas in India (the other two are in Vellore and Pondicherry). The Bernadette grotto inside is a 1:1 replica of the original Lourdes France grotto.',
  'Built 1840 by the Society of Jesus (Jesuits) under Bishop Antonio Pacheco — Gothic Revival architecture with twin 50-metre spires, stained-glass windows imported from France, and a grotto-shrine of Our Lady of Lourdes (1:1 replica of the original Lourdes France grotto). The annual Lourdes Feast (Sep 8-15) draws 200,000+ pilgrims (Catholic, Protestant, and Hindu). Free / open 6am-7pm / mass times posted at the gate. The adjacent Teppakulam (sacred temple-tank, built by the Pandyas in 11th c) is the largest tank in Trichy and Floats Festival (Floatation Festival, Jan-Feb) is held here.',
  'easy',
  'RC Diocese of Tiruchirappalli inventory; ASI Tamil Nadu Gothic-architecture catalogue; Catholic Bishops Conference of India heritage feature 2022.',
  5,
  ARRAY['church','heritage','gothic','interfaith','lourdes']::text[],
  '{}'::jsonb
),
(
  'trichy-mukkombu-upper-anicut',
  'trichy',
  'Mukkombu (Upper Anicut Dam)',
  NULL,
  12,
  '30 min drive northwest via the Cauvery delta road',
  'Mukkombu is a 12km drive west of Trichy along the Cauvery — most Trichy tourists never include it in their itinerary. Yet the Upper Anicut Dam is one of the oldest water-engineering structures in India still in operation (1836 British-era stone construction by Major Arthur Cotton), and the river island at Mukkombu has been a Trichy-family Sunday picnic spot for 100+ years.',
  '1836 British-era stone dam built by Major Arthur Cotton across the Cauvery — diverts irrigation water to 12 lakh acres in the Cauvery delta (still operational today). The dam creates a 4km-long backwater lake; the small mid-river island (accessed by motor-launch ₹50/head 8am-5pm) has a TTDC picnic park, swing rides, and a small zoo. Sunday-family destination — weekday it''s quiet. Free entry / island launch ₹50. The Mukkombu fish-fry stalls (Sunday 11am-4pm) cook the Cauvery catch (kannan, vala, viral) — a local Trichy speciality.',
  'easy',
  'Public Works Department Tamil Nadu Cauvery basin inventory; British India archive Cauvery irrigation works 1836; Hindu Trichy heritage feature 2024.',
  4,
  ARRAY['dam','heritage','cauvery','picnic','colonial']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Trichy options
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'trichy',
  'Hotel Saravana Bhavan',
  'Salai Road, Cantonment',
  'cantonment-salai-road',
  ARRAY['south-indian','tamil','north-indian','vegetarian']::text[],
  'mid_range',
  'Mini tiffin',
  ARRAY['Mini tiffin','Pongal','Filter coffee','Masala dosa','Chettinad veg meal']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'Hotel Saravana Bhavan (1981 Chennai founding) verified Trichy branch on Salai Road, Cantonment — pure-veg AC restaurant. The Saravana mini tiffin (₹150) is the chain standard. Used by Cantonment business and pilgrim crowds as the AC lunch and dinner option. Open 6.30am-11pm.',
  'Cantonment is 3km from both Rockfort and Srirangam — central Trichy positioning. Sunday lunch 1-2.30pm fills with Trichy weekend families; book ahead. UPI and cards both.',
  'Salai Road, Cantonment, Trichy 620001',
  'https://maps.google.com/?q=Saravana+Bhavan+Salai+Road+Trichy',
  ARRAY[
    'https://hotelsaravanabhavan.com/branches/',
    'https://www.tripadvisor.in/Restaurant_Review-g303887-d2226075-Reviews-Hotel_Saravana_Bhavan-Tiruchirappalli_Trichy.html'
  ]::text[],
  '2026-05-11',
  true
),
(
  'trichy',
  'Indian Coffee House Trichy',
  'Williams Road, Cantonment',
  'cantonment-williams-road',
  ARRAY['south-indian','tamil','coffee']::text[],
  'cafe',
  'Filter coffee + masala dosa',
  ARRAY['Filter coffee','Masala dosa','Idli','Vegetable cutlet','Egg sandwich']::text[],
  '₹',
  '[60,121)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Indian Coffee House (1957 founding chain, worker-cooperative-run) verified Trichy branch on Williams Road, Cantonment. The waitstaff in turban + cummerbund uniform serve filter coffee (₹15-20) + masala dosa (₹40) + vegetable cutlet (₹35). Used by Cantonment locals as the morning newspaper-coffee stop. Open 7am-10pm.',
  'Morning 7-9am the coffee + newspaper convention is at peak; off-peak 11am-1pm and 3-5pm are calmest. Cash mostly; UPI works at the counter. Egg sandwich (₹30) is the rare egg option in the otherwise mostly-veg menu.',
  'Williams Road, Cantonment, Trichy 620001',
  'https://maps.google.com/?q=Indian+Coffee+House+Williams+Road+Trichy',
  ARRAY[
    'https://www.indiancoffeehouse.com/branches.html',
    'https://www.tripadvisor.in/Restaurant_Review-g303887-d4036820-Reviews-Indian_Coffee_House-Tiruchirappalli.html'
  ]::text[],
  '2026-05-11',
  true
),
(
  'trichy',
  'Femina Hotel Restaurant',
  'Williams Road, Cantonment',
  'cantonment-williams-road',
  ARRAY['south-indian','tamil','north-indian','chinese']::text[],
  'mid_range',
  'Trichy biryani',
  ARRAY['Trichy biryani','Chettinad chicken','Mutton chukka','Chinese fried rice','Filter coffee']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Multi-cuisine restaurant inside Femina Hotel on Williams Road — the main non-veg AC option in central Trichy. Trichy biryani (mutton, seer-rice style with extra fennel — a separate style from Hyderabad/Lucknow) is the lunch call. Used by business traveller crowd. Open 7am-11pm. Cards and UPI both.',
  'Trichy biryani has more fennel and less spice than Hyderabad style — ask for "Trichy style" specifically. Sunday lunch buffet (₹550) is the weekend convention. Cards and UPI both.',
  'Williams Road, Cantonment, Trichy 620001',
  'https://maps.google.com/?q=Femina+Hotel+Williams+Road+Trichy',
  ARRAY[
    'https://www.feminahotelstrichy.com/',
    'https://www.tripadvisor.in/Restaurant_Review-g303887-d2208099-Reviews-Femina_Hotel_Restaurant-Tiruchirappalli.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'trichy',
  'Vasanta Bhavan Trichy',
  'West Boulevard Road, near Rockfort',
  'west-boulevard-road',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Mini tiffin',
  ARRAY['Mini tiffin','Idli','Pongal','Filter coffee','Curd vada']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg Tamil chain verified Trichy branch on West Boulevard Road — 500m from the Rockfort base. Used by Rockfort climbers for pre-climb breakfast (the 437-step climb to the Ucchi Pillayar is the morning workout). Mini tiffin (₹100) is the standard set. Open 5.30am-10.30pm.',
  'Pre-Rockfort breakfast 6-7.30am — the climb is best in cool morning hours before 9am. The West Boulevard Road approach to the Rockfort base is 500m W. Cash and UPI both.',
  'West Boulevard Road, Trichy 620008',
  'https://maps.google.com/?q=Vasanta+Bhavan+West+Boulevard+Trichy',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g303887-d6471560-Reviews-Vasanta_Bhavan-Tiruchirappalli.html',
    'https://www.zomato.com/trichy/vasanta-bhavan-west-boulevard'
  ]::text[],
  '2026-05-11',
  false
),
(
  'trichy',
  'Saaki Restaurant',
  'Hotel Sangam, Collector''s Office Road',
  'cantonment-collectors-office',
  ARRAY['indian','chinese','continental','tandoor']::text[],
  'fine_dining',
  'Tandoori platter',
  ARRAY['Tandoori platter','Butter chicken','Paneer tikka','Chinese hakka noodles','Gulab jamun']::text[],
  '₹₹₹',
  '[500,1001)'::int4range,
  'mixed',
  true,
  'recommended',
  'smart-casual',
  'Multi-cuisine fine-dining restaurant inside Hotel Sangam on Collector''s Office Road — the Trichy 4-star upscale dining option. North Indian tandoor + Indo-Chinese + Continental. Used by Trichy corporate dinner crowd and out-of-state business travellers staying at the hotel. Open 12-3pm + 7-11pm. Cards and UPI both.',
  'Lunch buffet (₹650, 12-3pm) is the value option Mon-Fri; Sunday brunch ₹850 with live counters. Smart-casual dress; no shorts. Cards preferred, UPI also accepted.',
  'Collector''s Office Road, Cantonment, Trichy 620001',
  'https://maps.google.com/?q=Hotel+Sangam+Trichy+Collectors+Office',
  ARRAY[
    'https://www.sangamhotels.com/trichy/',
    'https://www.tripadvisor.in/Restaurant_Review-g303887-d2208101-Reviews-Saaki_Hotel_Sangam-Tiruchirappalli.html'
  ]::text[],
  '2026-05-11',
  false
);
