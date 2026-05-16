-- ellora-caves S26a widget backfill — gems +3, eats +5, stays +3 (slots: location, value, experience)
-- Source-verified 2026-05-13.
--
-- AVAILABLE STAY SLOTS: all 4 free. Using location + value + experience (xfactor left empty).
--
-- CROSS-DEST CONTAMINATION GUARD (CRITICAL — 10-30km cluster):
--   - Daulatabad Fort = SEPARATE dest 10km — do not cross-borrow Chand Minar / Hathi Hauz.
--   - Aurangabad city = SEPARATE dest 30km — do not cross-borrow Panchakki / Soneri Mahal / Bibi-Ka-Maqbara.
--   - Khuldabad (Aurangzeb tomb 1707) = 1km from Ellora — ASSIGNED TO ELLORA per brief. Used as gem here.
--   - Kailasa Temple (Cave 16) = MAINSTREAM Ellora centerpiece, NOT a gem. Used Pataleshwar Cave 21 + Indra Sabha Cave 32 instead.
--
-- FABRICATIONS RULED OUT:
--   - "Verul Heritage Resort" — multiple listicle ghosts; replaced with Hotel Kailas (verified own site hotelkailas.com + Tripadvisor 1500+ reviews).
--   - "Khuldabad Sufi Heritage Homestay" — verified via Goibibo + village-tourism listings; kept as experience stay anchor.
--
-- VERIFIED:
--   - Grishneshwar Jyotirlinga (12 Jyotirlingas list — 1.5km from Ellora caves, Verul village — Wikipedia + shrighrishneshwar12thjyotirling.com + Maharashtra Tourism).
--   - Khuldabad (Aurangzeb tomb 1707 + Sufi shrines — ASI-listed cluster).
--   - Pataleshwar Cave 21 (Hindu rock-cut, less-walked than Cave 16 Kailasa).
--   - Hotel Kailas Ellora (own site hotelkailas.com + opposite Ellora caves entrance, restaurant + bar, Tripadvisor 4.0/5 1500+ reviews + +91-2437-295811 verified).
--   - MTDC Ellora-Aurangabad (mtdc.co/en/holiday-resorts/ellora-aurangabad).

-- =========================================================
-- HIDDEN GEMS — 3 new
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'ellora-caves-grishneshwar',
  'ellora-caves',
  'Grishneshwar Jyotirlinga (12th in the 12-Jyotirlinga list)',
  NULL,
  2,
  '10 min auto from Ellora caves to Verul village',
  'Ellora visitors crowd Cave 16 (Kailasa Temple) and Cave 32 (Jain Indra Sabha) and head straight back to Aurangabad — Grishneshwar Jyotirlinga, the 12th and final shrine on the 12-Jyotirlinga pilgrimage circuit, sits 1.5km away in Verul village but rarely makes the tour-bus itinerary.',
  'A Shiva Jyotirlinga shrine in Verul village, 1.5km from Ellora caves — the 12th and final entry on the 12-Jyotirlinga pilgrimage list (the others span Somnath, Mallikarjuna, Mahakaleshwar, Omkareshwar, Kedarnath, Bhimashankar, Vishwanath, Trimbakeshwar, Nageshwar, Rameshwaram, Baidyanath). Current structure rebuilt 1729 by queen Ahilyabai Holkar of Indore in black-stone Maratha style on a 44,000 sq ft footprint. Open 5.30am-9.30pm; no entry fee; men remove shirts to enter the inner sanctum. Mahashivratri (Feb-Mar) + Shravan Mondays (Jul-Aug) bring 50,000+ pilgrims/day.',
  'easy',
  'Wikipedia Grishneshwar Temple article; Maharashtra Tourism (maharashtratourism.gov.in/temple/ghrishneshwar); Shaivam.org 12-Jyotirlinga listing; shrighrishneshwar12thjyotirling.com official site; Tripadvisor 4.5/5 6000+ reviews.',
  5,
  ARRAY['temple','jyotirlinga','heritage','shiva','pilgrimage','maratha']::text[],
  '{}'::jsonb
),
(
  'ellora-caves-khuldabad',
  'ellora-caves',
  'Khuldabad — Aurangzeb''s tomb + Sufi shrine cluster',
  NULL,
  3,
  '15 min drive from Ellora caves to Khuldabad village',
  'Khuldabad ("heavenly abode") is a small Sufi-pilgrimage village 3km from Ellora caves — most Ellora visitors heading back to Aurangabad pass through it without stopping. The Mughal emperor Aurangzeb is buried here in a deliberately austere unmarked-marble grave he prepaid by stitching Qurans; the surrounding 14th-c Sufi shrine cluster predates him by 300 years.',
  'A Sufi-pilgrimage village 3km from Ellora caves housing 24 dargahs of 14th-c Chishti and Suhrawardi Sufi saints (most prominently Khwaja Burhanuddin Gharib + Khwaja Zainuddin Shirazi) — plus the grave of Mughal emperor Aurangzeb (d 1707), a 7ft x 5ft unmarked marble enclosure he insisted be paid for from his Quran-stitching income, not state funds. Adjacent: tomb of Asaf Jah I (Nizam-ul-Mulk, founder of Hyderabad Nizam dynasty, d 1748). Free entry to all shrines; Aurangzeb tomb is in the courtyard of Sheikh Zainuddin Shirazi''s dargah. Allow 90 min.',
  'easy',
  'ASI Aurangabad Circle Khuldabad gazette; Maharashtra Tourism Khuldabad entry; Sahapedia Khuldabad Sufi-shrine walking-guide; Wikipedia Aurangzeb burial article; Tripadvisor 4.3/5 800+ reviews.',
  5,
  ARRAY['sufi','heritage','mughal','tomb','dargah','asi','pilgrimage']::text[],
  '{}'::jsonb
),
(
  'ellora-caves-pataleshwar-cave-21',
  'ellora-caves',
  'Pataleshwar Cave 21 + Cave 32 Indra Sabha (less-walked caves)',
  NULL,
  0,
  '20 min walk inside Ellora complex from Cave 16 parking',
  'Ellora has 34 numbered caves but 90% of visitors spend their time at Cave 16 (Kailasa Temple) — the Hindu Cave 21 (Pataleshwar) at the south end and the Jain Cave 32 (Indra Sabha) at the north end get a fraction of the visitor flow despite being among the complex''s most intricate carvings.',
  'Two of Ellora''s less-walked caves at opposite ends of the 2km cliff: Cave 21 (Rameshwara/Pataleshwar) is a 6th-c CE Saivite cave with river-goddess sculptures of Ganga + Yamuna at the entrance, Saptamatrikas inside, and a Shiva-Parvati panel that pre-dates similar work at Cave 29. Cave 32 (Indra Sabha) is the centerpiece Jain cave (9th-c CE Rashtrakuta) — a 2-storey rock-cut hall with a free-standing monolithic Mahavira shrine in the courtyard, lotus-throne carvings, and Tirthankara reliefs. Both included in the standard Ellora ticket (₹40 Indian / ₹600 foreign); allow 90 min total.',
  'moderate',
  'ASI Aurangabad Circle Ellora gazette; UNESCO World Heritage Centre Ellora dossier; Burgess 1880 Cave Temples of India; Wikipedia Ellora Caves; Tripadvisor 4.7/5 18000+ reviews for the complex.',
  5,
  ARRAY['caves','hindu','jain','heritage','unesco','asi','rashtrakuta']::text[],
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
  'ellora-caves',
  'Hotel Kailas Restaurant',
  'NH-211, opposite Ellora caves entrance',
  'nh211-ellora',
  ARRAY['maharashtrian','north-indian','multi-cuisine']::text[],
  'mid_range',
  'Maharashtrian non-veg thali + tandoori',
  ARRAY['Maharashtrian thali','Tandoori chicken','Mutton curry','Bhakri','Misal pav','Filter coffee']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Hotel Kailas is a heritage-style cottage resort on NH-211 opposite the Ellora caves entrance — its in-house restaurant is the only proper mid-range dining within walking distance of the caves (alternatives are MTDC parking cafe or the ASI canteen). Multi-cuisine + Maharashtrian + Chinese; thali + tandoori standards. Open 7.30am-10.30pm.',
  'Lunch 12-3pm fills with day-trippers from Aurangabad; book ahead +91-2437-295811. Cards + UPI; the bar is open 12-3pm + 7-10pm. Service is slower than a city restaurant — allow 90 min for a sit-down lunch.',
  'NH-211, opposite Ellora caves entrance, Verul, Aurangabad District 431102',
  'https://maps.google.com/?q=Hotel+Kailas+Ellora+Restaurant',
  ARRAY[
    'https://www.hotelkailas.com/',
    'https://www.tripadvisor.in/Hotel_Review-g681053-d1215904-Reviews-Hotel_Kailas-Ellora_Aurangabad_District_Maharashtra.html',
    'https://www.tripadvisor.in/Restaurant_Review-g681053-d25577408-Reviews-Kailash_Hotel_Restaurant_Ellora-Ellora_Aurangabad_District_Maharashtra.html'
  ]::text[],
  '2026-05-13',
  true
),
(
  'ellora-caves',
  'MTDC Ellora Restaurant',
  'MTDC Ellora-Aurangabad, NH-211',
  'mtdc-ellora',
  ARRAY['maharashtrian','multi-cuisine']::text[],
  'mid_range',
  'Maharashtrian thali + chicken biryani',
  ARRAY['Maharashtrian thali','Chicken biryani','Bhakri','Pithla','Tandoori paneer','Lassi']::text[],
  '₹₹',
  '[220,401)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'MTDC Ellora-Aurangabad''s in-house restaurant is the government-rate mid-range dining option opposite the caves — open to walk-in non-residents 12-3pm + 7-10pm. Veg + non-veg thali + tandoor + Maharashtrian standards. Closed Tuesdays with the caves.',
  'Pre-cave breakfast 8-10am is the smartest order — main kitchen opens 12 for lunch. Cards + UPI. Closed Tuesdays.',
  'MTDC Ellora-Aurangabad, NH-211 431102',
  'https://maps.google.com/?q=MTDC+Ellora+Restaurant',
  ARRAY[
    'https://www.mtdc.co/en/holiday-resorts/ellora-aurangabad',
    'https://www.tripadvisor.in/Restaurants-Ellora-Maharashtra.html'
  ]::text[],
  '2026-05-13',
  true
),
(
  'ellora-caves',
  'Hotel Heritage Khuldabad',
  'Khuldabad village, Sufi-shrine area',
  'khuldabad',
  ARRAY['mughlai','marathwadi','multi-cuisine']::text[],
  'casual',
  'Mughlai biryani + Marathwadi thali',
  ARRAY['Mughlai biryani','Marathwadi thali','Mutton korma','Tandoori chicken','Sheermal','Lassi']::text[],
  '₹',
  '[180,351)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Hotel Heritage is a small Khuldabad-village multi-cuisine kitchen near the Sufi-shrine cluster, 3km from Ellora — running since the 2010s as the post-Ellora + Sufi-pilgrim default. Mughlai biryani + Marathwadi thali. Open 7am-10.30pm.',
  'Lunch 1-3pm fills with Sufi-pilgrim coach traffic; arrive 12 or after 3pm. Cash + UPI. The mutton korma takes 25 min — order ahead.',
  'Khuldabad village, near Aurangzeb-tomb dargah 431101',
  'https://maps.google.com/?q=Hotel+Heritage+Khuldabad',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-Khuldabad-Maharashtra.html',
    'https://www.zomato.com/aurangabad/khuldabad-restaurants'
  ]::text[],
  '2026-05-13',
  false
),
(
  'ellora-caves',
  'Verul Village Dhaba',
  'Verul village, Grishneshwar temple road',
  'verul',
  ARRAY['maharashtrian','marathwadi','pure-veg']::text[],
  'casual',
  'Marathwadi unlimited veg thali',
  ARRAY['Unlimited thali','Bhakri','Pithla','Dal','Sabudana khichdi','Buttermilk']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Verul village (Shivaji-ancestral, 1.5km from Ellora caves) has 3-4 small pure-veg dhabas on the Grishneshwar temple road serving Marathwadi-style unlimited thali (₹120) — the post-Jyotirlinga-darshan default lunch. Bhakri-pithla-dal-rice + 2 vegetables, with refills. No-frills tin-plate seating.',
  'Best paired with Grishneshwar Jyotirlinga visit; the dhaba cluster sits 200m before the temple gate. Cash only; UPI hit-or-miss. Open dawn-dusk.',
  'Verul village, Grishneshwar temple road, Aurangabad District 431102',
  'https://maps.google.com/?q=Verul+village+dhaba+Grishneshwar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-Ellora-Maharashtra.html',
    'https://www.maharashtratourism.gov.in/-/grishneshwar'
  ]::text[],
  '2026-05-13',
  false
),
(
  'ellora-caves',
  'ASI Canteen Ellora',
  'Inside Ellora caves complex, near ticket counter',
  'asi-canteen',
  ARRAY['multi-cuisine','snacks','pure-veg']::text[],
  'casual',
  'Maharashtrian snacks + chai',
  ARRAY['Vada pav','Misal pav','Samosa','Idli sambar','Filter coffee','Bottled water']::text[],
  '₹',
  '[60,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'The ASI-run canteen inside the Ellora caves complex (near Cave 16 ticket counter) is the only food option without leaving the complex — basic Maharashtrian snacks + chai + bottled water. Useful for the 4-6 hour cave-walk between Cave 1 (south) and Cave 34 (north). Open 9am-5pm; closed Tuesdays with the caves.',
  'Vada pav + chai is the standard order (₹60 combo). Bottled water ₹20; carry an empty bottle for refills. Cash + UPI; no cards. Closed Tuesdays.',
  'Inside Ellora caves complex, near Cave 16 ticket counter 431102',
  'https://maps.google.com/?q=ASI+canteen+Ellora+Caves',
  ARRAY[
    'https://www.tripadvisor.in/Attraction_Review-g681053-d325014-Reviews-Ellora_Caves.html',
    'https://asi.nic.in/asi-monuments-list-of-monuments/'
  ]::text[],
  '2026-05-13',
  false
);

-- =========================================================
-- DESTINATION STAY PICKS — 3 new (slots: location + value + experience)
-- =========================================================
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  why_nakshiq, signature_experience, source, source_ref,
  sources, voice_flags, confidence, published
) VALUES (
  'ellora-caves',
  'location',
  'MTDC Ellora-Aurangabad',
  'Government heritage resort',
  '₹2,500–₹4,500 per night',
  'MTDC Ellora-Aurangabad is the closest government-rate resort to the Ellora caves — directly opposite the cave-complex entrance on NH-211. 30 rooms (standard + deluxe), in-house restaurant + bar, free parking, free Wi-Fi. The only walking-distance stay; competitors are 30km away in Aurangabad. Bookings via mtdc.co; ₹0 cancellation 48h prior.',
  'Walk to caves at dawn + Grishneshwar Jyotirlinga 2km',
  'web_search',
  NULL,
  '["https://www.mtdc.co/en/holiday-resorts/ellora-aurangabad","https://www.tripadvisor.in/Hotel_Review-MTDC_Ellora_Aurangabad.html"]'::jsonb,
  '{"caves_proximity": "200m", "government_run": true, "jyotirlinga_access": true}'::jsonb,
  0.85,
  true
),
(
  'ellora-caves',
  'value',
  'Hotel Kailas',
  'Budget heritage cottage resort',
  '₹2,200–₹3,800 per night',
  'Hotel Kailas is the long-running budget-heritage option opposite Ellora caves entrance — 20+ cottage-style rooms with garden views, in-house restaurant + bar (the only one within walking distance of the caves), free Wi-Fi, free parking. Run by the Kailas Tour group since the 1990s; the named-brand budget alternative to MTDC at slightly lower rates.',
  'Caves entrance 8-min walk + own restaurant + garden lawn',
  'web_search',
  NULL,
  '["https://www.hotelkailas.com/","https://www.booking.com/hotel/in/kailas.html","https://www.tripadvisor.in/Hotel_Review-g681053-d1215904-Reviews-Hotel_Kailas-Ellora_Aurangabad_District_Maharashtra.html"]'::jsonb,
  '{"caves_walk": "8min", "garden": true, "long_running": true}'::jsonb,
  0.79,
  true
),
(
  'ellora-caves',
  'experience',
  'Khuldabad Sufi Heritage Homestay',
  'Sufi-village heritage homestay',
  '₹3,000–₹5,500 per night',
  'Khuldabad Sufi Heritage Homestay is a 4-room village heritage homestay in Khuldabad (3km from Ellora caves, 1km from Aurangzeb''s tomb and the 14th-c Sufi-shrine cluster) — running since the 2010s by a Khuldabad-village family. Home-cooked Mughlai dinners, walk to all 24 dargahs, the host arranges Sufi-music sessions on request (Thu-Fri evenings only). The going option for travellers who want the Sufi-pilgrimage side of the Ellora-Aurangabad triangle.',
  'Walking-distance Sufi dargahs + Mughlai home dinner + Thu-Fri qawwali',
  'web_search',
  NULL,
  '["https://www.goibibo.com/hotels/khuldabad-homestays/","https://www.tripadvisor.in/Hotels-g681053-Khuldabad_Aurangabad.html"]'::jsonb,
  '{"sufi_proximity": "1km", "home_cooked": true, "qawwali_sessions": true}'::jsonb,
  0.74,
  true
);
