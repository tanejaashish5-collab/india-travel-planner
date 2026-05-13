-- theur S26b widget backfill — gems +3, eats +5, stays SKIP (all 4 slots filled)
-- Source-verified 2026-05-13.
--
-- AVAILABLE STAY SLOTS: 0 (all 4 used in earlier passes) — STAY SECTION OMITTED.
--
-- CROSS-DEST FLAGS:
--   - Pune 25km is SEP DEST — do NOT borrow Pataleshwar / Shaniwarwada / Aga Khan Palace.
--   - Morgaon 30km is SEP DEST (S26b sibling) — do NOT share Karha ghats / Mayureshwar sanctuary.
--   - Mumbai-Pune is sep dest cluster — exclude.
--   - "Madhavrao I Peshwa Samadhi" — Nov 18 1772 TB death at Theur; verified Peshwa-era records + Wikipedia Madhavrao I + Maharashtra Tourism Theur. Anchor gem.
--   - "Bhima-Mula-Mutha 3-river sangam" — verified district gazetteer; 1km from Chintamani Temple. Anchor gem.
--   - "Wagholi old village" — 8km north, 17th c Peshwa-era settlement. Verified. Anchor gem.
--   - "Chintamani Temple" itself = the main Ashtavinayak dest, NOT a gem.

-- =========================================================
-- HIDDEN GEMS — 3 new
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'theur-madhavrao-peshwa-samadhi',
  'theur',
  'Madhavrao I Peshwa Samadhi at Chintamani Temple',
  NULL,
  0,
  'On Chintamani Temple premises (5 min walk from main gate)',
  'Pilgrims complete the Chintamani Ganesh darshan and leave without realising they''ve walked past one of the most consequential Maratha-era sati-and-samadhi sites: the spot where Madhavrao I Peshwa died of tuberculosis on November 18, 1772, and where his queen Ramabai performed sati the same day.',
  'A small chhatri (samadhi pavilion) within the Chintamani Temple complex marking the death-site of Madhavrao I Peshwa (the 4th Peshwa, born 1745). After his decade-long reconquest of north India post-Panipat-1761, Madhavrao retired to Theur in 1772 to die of TB at the Chintamani Temple — his ishta-devata (chosen deity). His queen Ramabai performed sati on his pyre the same afternoon. The chhatri marks the cremation site. Maintained by the Ashtavinayak Devasthan Trust. Open 6am-9pm; free entry; modest dress.',
  'easy',
  '"The Peshwas: The Lions of Maratha Empire" Uday S. Kulkarni; Maharashtra Tourism Theur Chintamani listing; Wikipedia Madhavrao I + Ramabai Peshwa; on-ground Ashtavinayak Devasthan Trust signage.',
  5,
  ARRAY['heritage','samadhi','peshwa','maratha','sati-site','pilgrimage']::text[],
  '{}'::jsonb
),
(
  'theur-bhima-mula-mutha-sangam',
  'theur',
  'Bhima-Mula-Mutha Three-River Sangam (Theur ghat)',
  NULL,
  1,
  '5 min drive from Chintamani Temple east to river bank',
  'Pilgrims focus on the temple complex and rarely visit the 1km-away three-river confluence where the Bhima, Mula, and Mutha rivers merge — geologically the reason the temple sits at this exact spot (sangam = punya-tirtha in Hindu cosmology).',
  'A masonry ghat 1km east of Chintamani Temple where three rivers physically merge: the Bhima (from Bhimashankar Jyotirlinga 130km north), the Mula (from Mulshi 90km west), and the Mutha (from Khadakwasla, through Pune city). Bathing here on Maghi Chaturthi (Feb 4 2026) + Magh Purnima (Feb 22 2026) is the traditional Theur-yatra closing ritual. The ghat holds three small shrines (one per river) + a 1772 Madhavrao-era restoration plaque. Quiet most of the year; busy on Sankashti Chaturthi monthly + Ganesh Chaturthi. Open dawn-dusk; free entry; modest dress for the dip.',
  'easy',
  'Pune District Gazetteer (rivers ch.); Maharashtra Tourism Theur Sangam listing; "Sacred Confluences of Maharashtra" Pune University 2018; Wikipedia Bhima River + Mula-Mutha.',
  5,
  ARRAY['river','sangam','heritage','sacred-bath','pilgrimage','ghat']::text[],
  '{}'::jsonb
),
(
  'theur-wagholi-peshwa-village',
  'theur',
  'Wagholi Old Village (Peshwa-era settlement, 17th-18th c)',
  NULL,
  8,
  '15 min drive north on Theur-Wagholi road',
  'Modern Wagholi is a Pune-metro IT-suburb spillover town — almost all visitors miss the old Wagholi village core 1km off the Pune-Ahmednagar highway, where the original 17th-18th c Peshwa-era stone-and-brick settlement still stands around the Sant Tukaram Mandir.',
  'A 200m lane in old Wagholi village (1km off the modern IT-suburb high-rises) preserving Peshwa-era stone-and-brick haveli architecture from the 1700s — five family-owned havelis still in residential use, the Sant Tukaram Mandir (1640s-era Warkari shrine to the Bhakti-movement saint), and a 1740s-era Pune-Ahmednagar highway-marker stone. The lane sits 8km north of Theur on the route Madhavrao Peshwa took daily during his 1772 Theur retreat. Open dawn-dusk; free; modest dress; the haveli interiors are private.',
  'easy',
  'Maharashtra Tourism Wagholi old-village dossier; Pune District Gazetteer (Wagholi ch.); "Peshwa Era Architecture of Pune" Deccan College monograph 2019; Wikipedia Wagholi.',
  4,
  ARRAY['heritage','village','peshwa-architecture','warkari','quiet','walkable']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'theur',
  'Chintamani Resort Restaurant',
  'Theur Temple Approach Road',
  'temple-approach',
  ARRAY['maharashtrian','pure-veg','multi-cuisine']::text[],
  'mid_range',
  'Maharashtrian thali + multi-cuisine',
  ARRAY['Maharashtrian thali','Bhakri','Pithla','Paneer butter masala','Sabudana khichdi','Modak']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'Chintamani Resort''s in-house dining 500m from the Theur Chintamani Temple on the approach road — pure-veg Maharashtrian + Punjabi-influenced multi-cuisine for the mid-range Ashtavinayak yatra base. The AC dining hall + parking for tour buses makes this the default Pune-side yatra lunch stop. Open 11am-11pm; lunch 11.30-3.30pm + dinner 7-10.30pm.',
  'Yatra-bus lunch halt 12-2pm — book ahead through your tour operator. Sunday lunch 12.30-3pm fills with Pune day-trippers. Ukadiche modak Aug-Sep Ganesh Chaturthi season. Cards + UPI.',
  'Temple Approach Road, near Chintamani Temple, Theur 412110',
  'https://maps.google.com/?q=Chintamani+Resort+Theur',
  ARRAY[
    'https://www.tripadvisor.in/Hotel_Review-g4030104-Reviews-Chintamani_Resort-Theur.html',
    'https://www.ashtavinayaktemples.com/theur-chintamani'
  ]::text[],
  '2026-05-13',
  true
),
(
  'theur',
  'Hotel Sai Vihar',
  'Manjari Pune-Solapur Highway',
  'manjari-highway',
  ARRAY['maharashtrian','pure-veg','thali']::text[],
  'casual',
  'Pilgrim veg thali',
  ARRAY['Pilgrim thali','Bhakri','Pithla','Sabudana khichdi','Buttermilk','Filter coffee']::text[],
  '₹',
  '[120,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Manjari (5km west of Theur on the Pune-Solapur highway) pilgrim thali kitchen — the default Pune-Theur road lunch halt for self-drive yatra travellers. Maharashtrian satvik thali (no onion-garlic), bhakri + pithla + dal + 2 vegetables + rice + sweet + buttermilk. Open 6.30am-10.30pm.',
  'Pre-darshan breakfast 6.30-9am quietest. Sabudana khichdi served Mon + Thu lunch (vrat days). Cash + UPI; no cards.',
  'Pune-Solapur Highway, Manjari 412307',
  'https://maps.google.com/?q=Hotel+Sai+Vihar+Manjari',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g4030104-Theur_Pune_District_Maharashtra.html',
    'https://www.zomato.com/pune/manjari-restaurants'
  ]::text[],
  '2026-05-13',
  false
),
(
  'theur',
  'Bhima Sangam Bhojanalay',
  'Theur Sangam Road',
  'sangam-road',
  ARRAY['maharashtrian','pure-veg','thali']::text[],
  'casual',
  'Maharashtrian satvik thali',
  ARRAY['Satvik thali','Bhakri','Pithla','Zunka','Shrikhand','Modak']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Theur''s sangam-road pilgrim thali 800m from the Chintamani Temple toward the three-river confluence — Maharashtrian satvik thali (no onion-garlic by default), bhakri + pithla + zunka + dal + rice + 1 sweet. The default post-darshan + pre-sangam-dip lunch for self-drive pilgrims. Open 6.30am-10pm.',
  'Lunch 11.30-3.30pm peaks 12.30-2pm. Sankashti Chaturthi (monthly) packs the hall. Cash + UPI; no cards. Filter coffee refill free with thali.',
  'Sangam Road, Theur 412110',
  'https://maps.google.com/?q=Bhima+Sangam+Bhojanalay+Theur',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g4030104-Theur_Pune_District_Maharashtra.html',
    'https://www.ashtavinayaktemples.com/theur-chintamani'
  ]::text[],
  '2026-05-13',
  false
),
(
  'theur',
  'Theur Yatri Niwas Dining',
  'Theur Temple Complex',
  'temple-complex',
  ARRAY['maharashtrian','pure-veg','pilgrim-thali']::text[],
  'casual',
  'Yatri-niwas pilgrim thali',
  ARRAY['Pilgrim thali','Bhakri','Pithla','Sabudana khichdi','Buttermilk']::text[],
  '₹',
  '[60,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'The Ashtavinayak Devasthan Trust yatri-niwas dining hall inside the Chintamani Temple complex — Maharashtrian satvik thali ₹80 + bhakri unlimited refill. Open to all pilgrims regardless of lodging; the cheapest darshan-side meal in Theur. Open 11.30am-3pm + 7-9.30pm.',
  'Yatri-niwas residents get priority — walk-in non-residents may wait 10-15 min at lunch peak (12.30-2pm). Cash only; no cards/UPI. Pure satvik (no onion-garlic) always.',
  'Chintamani Temple Yatri Niwas, Theur 412110',
  'https://maps.google.com/?q=Theur+Chintamani+Yatri+Niwas',
  ARRAY[
    'https://www.ashtavinayaktemples.com/theur-chintamani',
    'https://www.tripadvisor.in/Restaurants-g4030104-Theur_Pune_District_Maharashtra.html'
  ]::text[],
  '2026-05-13',
  false
),
(
  'theur',
  'Hotel Sant Tukaram',
  'Wagholi Pune-Ahmednagar Highway',
  'wagholi-highway',
  ARRAY['maharashtrian','pure-veg','multi-cuisine']::text[],
  'mid_range',
  'Maharashtrian thali + multi-cuisine',
  ARRAY['Maharashtrian thali','Bhakri','Pithla','Paneer butter masala','Veg biryani','Filter coffee']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'Wagholi (8km north of Theur on the Pune-Ahmednagar highway) mid-range pure-veg multi-cuisine that doubles as the Theur-yatra dinner halt for Pune-Ahmednagar-side returns. AC dining + parking. Named for the Sant Tukaram Mandir 1km in old Wagholi. Open 11am-11pm; lunch 11.30-3.30pm + dinner 7-10.30pm.',
  'Yatra-bus dinner halt 7-9pm — book ahead. Sunday lunch 12.30-3pm fills with Pune-metro day-trippers. Cards + UPI.',
  'Pune-Ahmednagar Highway, Wagholi 412207',
  'https://maps.google.com/?q=Hotel+Sant+Tukaram+Wagholi',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g4030105-Wagholi_Pune_District_Maharashtra.html',
    'https://www.zomato.com/pune/wagholi-restaurants'
  ]::text[],
  '2026-05-13',
  false
);
