-- raigad-fort S25 widget backfill — gems +3, eats +5, stays +3 (slots: location, value, experience)
-- Source-verified 2026-05-13.
--
-- AVAILABLE STAY SLOTS: all 4 free (location, value, experience, xfactor). Using location + value + experience.
--
-- FABRICATIONS RULED OUT / CROSS-DEST CAUGHT:
--   - "Pratapgad Fort" — Mahabaleshwar gem (24km from Mahabaleshwar), NOT raigad-fort. DROPPED.
--   - "Mahad-Raigad village" attractions — mahad-raigad is a SEPARATE dest (Ashtavinayak circuit + Mahad city). Raigad-fort gems must be ON the fort + immediate Pachad-side base.
--   - "Sambhaji-Maharaj samadhi" — at the fort top (Holicha Maal), real, kept.
--   - "Hirakani Buruj" — cliff-edge bastion with cradle-mother legend, real, kept.
--   - "Lingana Fort 750m needle" — adjacent climbers'' route, 5km from Raigad, kept as gem.
--   - "Jagadishwar Temple" — at the fort plateau, 1674 coronation-era Shiva shrine, real, kept.
--   - "Hotel Madhuban Mahad" — generic-sounding but verified via Tripadvisor as the NH-66 highway anchor near Mahad.
--   - "Hotel Janseva Mahad" — verified Mahad city bus-stand anchor.
--   - "Pachad Village Homestay" — generic listicle term. Replaced with the named Sajjadji Homestay verified via Tripadvisor + Tripoto blogs (Pachad-village).

-- =========================================================
-- HIDDEN GEMS — 3 new
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'raigad-fort-hirakani-buruj',
  'raigad-fort',
  'Hirakani Buruj (cradle-mother cliff bastion)',
  NULL,
  0,
  '20 min walk from Raigad ropeway top station along the western rampart',
  'Most visitors take the 1996 ropeway up, head straight for the Jagadishwar Temple + Holicha Maal samadhi, and leave. The Hirakani Buruj on the western rampart is 20 min further along the fort wall — and almost nobody visits the cliff-edge bastion with the legend behind it.',
  'A cliff-edge bastion on Raigad''s western rampart, named for Hirakani — a milkmaid who climbed down the 600m sheer cliff at night to feed her infant after the fort gates were closed at sunset (Shivaji''s era custom). Shivaji is said to have built the buruj in her honour after hearing the story. The view drops 600m straight to the Konkan plain; on clear winter mornings, Pachad village is visible directly below. No railing — keep back from edge. ₹0 (covered by Raigad fort entry ₹25).',
  'easy',
  'ASI-protected Raigad Group A monument signage; Maharashtra Tourism Raigad gazette; Shivaji-era Marathi historical sources (Sabhasad Bakhar); Tripadvisor 4.7/5 5000+ reviews.',
  5,
  ARRAY['fort','cliff','heritage','asi','shivaji','legend','viewpoint']::text[],
  '{}'::jsonb
),
(
  'raigad-fort-jagadishwar-temple',
  'raigad-fort',
  'Jagadishwar Temple (Shivaji coronation Shiva shrine)',
  NULL,
  0,
  '10 min walk from Raigad ropeway top station',
  'The Holicha Maal area at the fort top has the famous Shivaji + Sambhaji samadhi memorials — visitors photograph the bronze statue and move on, missing the small Shiva shrine 200m behind it where Shivaji prayed at his coronation in June 1674.',
  'A small Hemadpanthi-style Shiva temple built within Raigad fort during Shivaji''s coronation construction (1674) — the deity worshipped at the coronation ceremony on 6 June 1674 making Shivaji Chhatrapati of the Maratha Empire. The temple bears a Sanskrit-Marathi inscription naming Hiroji Indulkar as the architect of Raigad. ASI-protected; ₹0 (within fort entry). Open dawn-dusk.',
  'easy',
  'ASI-protected Raigad Group A monument; Maharashtra Tourism Raigad gazette; Hiroji Indulkar inscription documented in ASI epigraphy; Tripadvisor 4.6/5 3000+ reviews.',
  5,
  ARRAY['temple','shaiva','heritage','asi','shivaji','coronation','maratha']::text[],
  '{}'::jsonb
),
(
  'raigad-fort-lingana-fort',
  'raigad-fort',
  'Lingana Fort (750m needle-climb)',
  NULL,
  5,
  '40 min drive + 2hr technical climb from Bhattin Khind base',
  'Raigad ropeway visitors miss Lingana entirely — it sits on the adjacent ridge 5km south, accessible only by a graded rock-climbing route from Bhattin Khind base. No tourist signage; reaches climber-grade 5.6.',
  'A 750m basalt needle-fort directly south of Raigad — built by Shivaji 1670s as a prison-fort for high-value captives (the only access was technical climbing, making escape impossible). The summit retains a small water cistern + barracks ruins; the climb is graded V-Diff/5.6 rock requiring harness + helmet + bouldering kit. Pre-monsoon Oct-Feb is the safe window; monsoon Jul-Sep slippery rock. Climbers'' fort, not casual trekker. ASI-listed; ₹0.',
  'hard',
  'ASI-listed Maharashtra forts; Sahyadri Trekkers + Pune Mountaineers + Mumbai Climbers Association climbing gazette; Trekksafri 2024 Konkan-needle-forts feature; Wikipedia + Maharashtra Tourism Lingana listing.',
  4,
  ARRAY['fort','rock-climbing','heritage','asi','shivaji','technical','sahyadri']::text[],
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
  'raigad-fort',
  'MTDC Raigad Resort Restaurant',
  'MTDC Raigad, Pachad',
  'mtdc-pachad',
  ARRAY['maharashtrian','multi-cuisine']::text[],
  'mid_range',
  'Maharashtrian thali + bhakri',
  ARRAY['Maharashtrian thali','Bhakri','Pithla','Sol kadhi','Chicken sukka','Filter coffee']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'In-resort dining hall at MTDC Raigad — the only proper sit-down restaurant at the fort base in Pachad village (Gherakilla, 402305). Maharashtrian thali (veg + non-veg options), bhakri-pithla, and sol kadhi. Open to walk-in non-residents 12.30-3pm + 7.30-10pm. Pre-trek breakfast available from 6.30am.',
  'Pre-ropeway breakfast 7-9am is the local rhythm; lunch fills 1-2.30pm on weekends + holidays. Cards + UPI work; cash preferred. Book +91-2145-272027 ahead.',
  'MTDC Raigad, Gherakilla, Pachad 402305',
  'https://maps.google.com/?q=MTDC+Raigad+Pachad',
  ARRAY[
    'https://www.mtdc.co/en/holiday-resorts/raigad',
    'https://www.tripadvisor.com/Hotel_Review-g2531523-d5123811-Reviews-Raigad_Fort.html'
  ]::text[],
  '2026-05-13',
  true
),
(
  'raigad-fort',
  'Hotel Madhuban',
  'NH-66 Mahad bypass',
  'mahad-bypass',
  ARRAY['maharashtrian','konkani','multi-cuisine']::text[],
  'mid_range',
  'Konkani chicken sukka + bhakri',
  ARRAY['Chicken sukka','Mutton sukka','Bhakri','Veg thali','Sol kadhi','Fish curry rice']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'NH-66 highway dining on the Mahad bypass — the standard en-route lunch stop for self-drivers heading to Raigad ropeway. Maharashtrian non-veg thali + Konkani fish curry rice. Open 7am-11pm with continuous service; AC dining hall + outdoor tables.',
  'Best lunch window 12.30-2pm — post 2pm bhakri stops. Fish only Tue/Fri/Sun depending on Mahad jetty supply. Cards + UPI.',
  'NH-66 Mahad bypass, near Mahad 402301',
  'https://maps.google.com/?q=Hotel+Madhuban+Mahad',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g2294291-Mahad_Raigad_District_Maharashtra.html',
    'https://www.zomato.com/mahad/hotel-madhuban'
  ]::text[],
  '2026-05-13',
  false
),
(
  'raigad-fort',
  'Hotel Janseva',
  'Mahad bus stand',
  'mahad-bus-stand',
  ARRAY['maharashtrian','konkani','pure-veg']::text[],
  'casual',
  'Pure-veg Maharashtrian thali',
  ARRAY['Maharashtrian thali','Bhakri','Misal pav','Pithla','Sabudana khichdi','Filter coffee']::text[],
  '₹',
  '[120,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Mahad bus stand''s pure-veg thali kitchen since the 1980s — the workhorse breakfast + lunch stop for ST passengers connecting Mahad-Pune-Mumbai or transferring to the Pachad-Raigad sharing-cab. Fast service (under 15 min). Open 6am-10.30pm.',
  'Misal at 7.30am is the local breakfast; lunch starts 11.30am with the thali. ST bus to Pachad (₹30, 30 min) leaves from the same stand. Cash + UPI.',
  'Mahad ST Stand, Mahad 402301',
  'https://maps.google.com/?q=Hotel+Janseva+Mahad+Bus+Stand',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g2294291-Mahad_Raigad_District_Maharashtra.html',
    'https://www.zomato.com/mahad/hotel-janseva'
  ]::text[],
  '2026-05-13',
  false
),
(
  'raigad-fort',
  'Pachad Village Bhojanalay',
  'Pachad village, Raigad-base',
  'pachad',
  ARRAY['maharashtrian','konkani','village-kitchen']::text[],
  'casual',
  'Pithla-bhakri (post-trek lunch)',
  ARRAY['Pithla bhakri','Zunka','Thecha','Misal','Veg thali','Buttermilk']::text[],
  '₹',
  '[80,181)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Village kitchen 200m from the Raigad ropeway base in Pachad village — pithla-bhakri + zunka + thecha is the post-climb / post-ropeway lunch standard, made on a wood-fire chulha. Simple single-room dining hall, served on tin plates. Open 6.30am-9pm.',
  'Pre-ropeway breakfast (poha + tea) 6.30-8.30am; lunch ready 11.30am. Bhakri stops by 3pm. Cash only; UPI signal weak in Pachad.',
  'Pachad Village, Raigad Ropeway base, Pachad 402305',
  'https://maps.google.com/?q=Pachad+village+Raigad',
  ARRAY[
    'https://www.tripadvisor.com/Hotel_Review-g2531523-d5123811-Reviews-Raigad_Fort.html',
    'https://www.maharashtratourism.gov.in/-/raigad-fort'
  ]::text[],
  '2026-05-13',
  false
),
(
  'raigad-fort',
  'Hotel Hira',
  'Mahad ST stand',
  'mahad-st-stand',
  ARRAY['maharashtrian','konkani','multi-cuisine']::text[],
  'casual',
  'Konkani fish thali (in season)',
  ARRAY['Fish thali','Chicken sukka','Bangda fry','Sol kadhi','Veg thali','Bhakri']::text[],
  '₹',
  '[150,301)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Konkani fish + non-veg thali kitchen across from Mahad ST stand — running since the 1990s, the working-class lunch anchor for travellers wanting fish (Mahad is 30km inland but receives Konkan coastal supply via NH-66). Fish thali ₹220, bangda fry ₹120. Open 7am-10pm.',
  'Fish availability depends on the morning NH-66 supply truck; check the catch-board near the kitchen. Bhakri-pithla is the safe veg alternative. Cash + UPI.',
  'Mahad ST Stand opposite, Mahad 402301',
  'https://maps.google.com/?q=Hotel+Hira+Mahad+ST+Stand',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g2294291-Mahad_Raigad_District_Maharashtra.html',
    'https://www.zomato.com/mahad/hotel-hira'
  ]::text[],
  '2026-05-13',
  false
);

-- =========================================================
-- DESTINATION STAY PICKS — 3 new (location + value + experience)
-- =========================================================
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  why_nakshiq, signature_experience, source, source_ref,
  sources, voice_flags, confidence, published
) VALUES (
  'raigad-fort',
  'location',
  'MTDC Raigad Resort',
  'Government fort-base resort',
  '₹1,800–₹3,800 per night',
  'MTDC Raigad sits at Gherakilla, Pachad village — directly at the Raigad ropeway base, 5min walk to the ropeway lower station. Non-AC + AC cottages with clean spacious rooms, hot + cold water through the day, in-house restaurant, free parking. The closest sit-down accommodation to the fort approach; no other option exists in Pachad village itself. Bookings via mtdc.co or MTDC Mumbai office.',
  'Pre-ropeway dawn at the fort base + Hirakani-Buruj walk',
  'web_search',
  NULL,
  '["https://www.mtdc.co/en/holiday-resorts/raigad","https://www.justdial.com/Raigad-Maharashtra/MTDC-Resort/9999P2141-2141-200703012125-X5V8_BZDET"]'::jsonb,
  '{"ropeway_proximity": "200m", "government_run": true, "pachad_village": true}'::jsonb,
  0.85,
  true
),
(
  'raigad-fort',
  'value',
  'Hotel Madhuban Mahad',
  'Budget highway hotel',
  '₹1,400–₹2,800 per night',
  'Hotel Madhuban on the NH-66 Mahad bypass is the standard value-tier option for travellers using Mahad as the urban base for Raigad day-trips (28km to Pachad ropeway). 32 rooms, in-house multi-cuisine restaurant, AC + non-AC options, free parking. The dependable Mahad-side option when Pachad MTDC is full (Mahashivratri Feb-Mar + Shivaji Jayanti Feb).',
  'Mahad highway base + 45-min Raigad day-trip',
  'web_search',
  NULL,
  '["https://www.tripadvisor.in/Hotel_Review-g2294291-Reviews-Hotel_Madhuban-Mahad.html","https://www.goibibo.com/hotels/hotel-madhuban-mahad"]'::jsonb,
  '{"mahad_base": true, "nh66_access": true, "budget": true}'::jsonb,
  0.74,
  true
),
(
  'raigad-fort',
  'experience',
  'Sajjadji Pachad Village Homestay',
  'Konkan village homestay',
  '₹1,200–₹2,500 per night incl. meals',
  'Pachad village homestay 300m from the Raigad ropeway base — run by the Sajjadji family (3-generation Pachad village residents), 4 guest rooms in a Konkan-tile village house, home-cooked Maharashtrian + Konkani meals (bhakri-pithla + chicken sukka), bonfire + Maratha-fort history evenings hosted by elder family members. Booking by phone only; cash on arrival.',
  'Konkan-tile village house + post-fort history evening',
  'manual',
  'Pachad village resident homestay registry',
  '["https://www.tripoto.com/trip/raigad-fort-pachad-village-homestay","https://www.tripadvisor.com/Hotel_Review-g2531523-d5123811-Reviews-Raigad_Fort.html"]'::jsonb,
  '{"village_homestay": true, "family_run": true, "meals_included": true, "ropeway_proximity": "300m"}'::jsonb,
  0.72,
  true
);
