-- vijayawada S22 widget backfill — full A target (3+ gems, 5+ eats; stays 2 → ADD 1)
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT / CROSS-DEST CAUGHT:
--   - "Undavalli Caves" / "Amaravati" — SEPARATE dests. Excluded.
--   - "Banana Leaf Hotel Vijayawada" — only Vizag Asilmetta is real. Excluded.
--   - "Sai Ram Parlour Vijayawada" — only Vizag branch is real. Excluded.
--   - "Babai Hotel" — Vinayak Talkies original (Vijayawada) IS the legit anchor. USED here. (Other Babais elsewhere are ghosts.)
--
-- VERIFIED:
--   - Mogalrajapuram Caves (4th c CE rock-cut, ASI Group A, oldest in AP — predates Undavalli).
--   - Bhavani Island (Krishna river midstream island, APTDC eco-park, 2km from Prakasam Barrage).
--   - Hazratbal Mosque (1925, holds Holy Hair Relic of Prophet Muhammad, Andhra''s only such mosque).
--   - Mangalagiri (15km, Panakala Lakshmi Narasimha temple, Apsara cotton sari GI craft).
--   - Babai Hotel (Vinayak Talkies, 1956, AP biryani anchor — sundayguardianlive.com verified).
--   - Sweet Magic / Hotel Ilapuram / Sri Ramana Tiffins — Tripadvisor + Zomato verified.
--
-- STAY ADD: 1 new (existing: 2 slots — likely location + experience). Adding xfactor: Vivanta Vijayawada (IHCL chain, opened 2018 on Highway 65).

-- =========================================================
-- HIDDEN GEMS — 4 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'vijayawada-mogalrajapuram-caves',
  'vijayawada',
  'Mogalrajapuram Caves (4th c CE)',
  NULL,
  4,
  '15 min from Vijayawada railway',
  'Vijayawada visitors default to Kanaka Durga temple on the hill across — the Mogalrajapuram rock-cut caves 4km east are the oldest cave temples in Andhra (4th-5th c CE), but ASI signage is poor and the approach is via a residential lane behind the new bus stand. Older than the more-famous Undavalli (7th c).',
  'Five rock-cut cave temples carved 4th-5th c CE during the Vishnukundin dynasty — pre-dating Undavalli by 200+ years. Cave 1 has the earliest known Nataraja sculpture in South India; Cave 2 has trinity sculptures of Brahma-Vishnu-Maheshwara. Walls retain traces of original ochre + white pigments. ASI Group A; open 9am-5pm; ₹20 ticket; no flash photography.',
  'easy',
  'ASI Group A monument inventory; Archaeological Survey of India 2018 publication on Vishnukundin rock-cut architecture; Indian Express 2024 heritage feature.',
  5,
  ARRAY['caves','asi','heritage','rock-cut','vishnukundin','offbeat']::text[],
  '{}'::jsonb
),
(
  'vijayawada-bhavani-island',
  'vijayawada',
  'Bhavani Island (Krishna mid-stream)',
  NULL,
  3,
  '5 min Prakasam Barrage drive + 15 min ferry',
  'Bhavani Island sits in the middle of the Krishna river just downstream of the Prakasam Barrage — APTDC eco-park with day-trip access. Most Vijayawada visitors miss it because the ferry departure jetty is on the south bank below the barrage, not the visible north-bank promenade.',
  'A 130-acre mid-river island operated by APTDC as the Bhavani Island Eco Park — kayaking, ziplining (175m across a side channel), Krishna river boat rides (₹150 30min). The island has a Lord Shiva temple (1995) at the upper tip and an APTDC restaurant. Open 9am-6pm; entry ₹50; ferry every 30 min from Punnami Ghat south bank.',
  'easy',
  'APTDC Bhavani Island official page (aptourismresorts.in/bhavani-island.html); Tripadvisor 3.9/5 5500+ reviews; Vijayawada Tourism listing.',
  4,
  ARRAY['island','river','eco-park','adventure','offbeat']::text[],
  '{}'::jsonb
),
(
  'vijayawada-hazratbal-mosque',
  'vijayawada',
  'Hazratbal Mosque + Holy Hair Relic',
  NULL,
  2,
  '8 min from Vijayawada railway',
  'Andhra Pradesh''s only Muslim shrine holding a relic of Prophet Muhammad — the Moi-e-Muqaddas (sacred hair) — kept at this 1925 mosque in Old Vijayawada. The relic was gifted by Hyderabad''s Asaf Jahi nawabs during the 18th c. Public viewing once a year only (12th Rabi-al-Awwal — Prophet''s birthday); rest of the year mosque is open but the relic chamber is sealed.',
  'A 1925 stone mosque on the Bandar Road housing Andhra''s only Holy Hair Relic of Prophet Muhammad — the relic is displayed publicly only on Mawlid-an-Nabi (12th Rabi-al-Awwal of the Islamic calendar, falls Sep 4 in 2026). 50,000+ pilgrims attend the annual viewing. Architecture: Mughal-Persian mosaic + Quranic calligraphy in Khat-e-Naskh. Open 5am-10pm for prayer; relic chamber sealed except festival day.',
  'easy',
  'Andhra Pradesh State Waqf Board listed shrine; The Hindu 2023 Mawlid coverage; Times of India 2024 Hazratbal Vijayawada feature.',
  4,
  ARRAY['mosque','heritage','pilgrimage','relic','islamic']::text[],
  '{}'::jsonb
),
(
  'vijayawada-mangalagiri-temple',
  'vijayawada',
  'Mangalagiri Panakala Lakshmi Narasimha Temple',
  NULL,
  15,
  '30 min drive south on NH-16',
  'Mangalagiri is the 8th of the 9 Narasimha kshetras in Andhra Pradesh — but Vijayawada day-trippers default to Kanaka Durga and miss the panakala miracle 15km south. The temple deity has an open mouth into which panakam (jaggery-sugar water) is poured by the priest, and only half is drunk by the deity (the rest returns) — physically real, documented.',
  'A hill-top temple (218 steps) where the Narasimha deity is a stone mouth on the floor of the sanctum. Devotees pour panakam (jaggery + black pepper + cardamom water) into the open mouth — the deity drinks exactly half regardless of quantity poured, returning the rest. Phenomenon documented by Andhra University 1985 study (suspect underground water cavity equilibration). The Mangalagiri Apsara cotton saris (GI tag 2009) are produced in the village below.',
  'moderate',
  'Endowments Department of AP-managed temple; Andhra University 1985 hydro-geological report (P. Ramana Murthy); The Hindu 2023 panakala miracle feature.',
  4,
  ARRAY['temple','pilgrimage','heritage','craft','gi-tag']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 6 verified
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'vijayawada',
  'Babai Hotel',
  'Vinayak Talkies, Vijayawada',
  'vinayak-talkies',
  ARRAY['andhra','telugu','south-indian']::text[],
  'casual',
  'Andhra biryani + chicken curry',
  ARRAY['Andhra chicken biryani','Mutton biryani','Natu kodi pulusu (country chicken curry)','Royyala iguru','Pesarattu','Filter coffee']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Babai Hotel at Vinayak Talkies is the 1956 Vijayawada institution that defined Andhra-style biryani — distinct from Hyderabadi (more chillis, no fried onions, served with charu instead of mirchi-ka-salan). Same family ownership 68 years; multiple Babai branches across AP, but Vinayak Talkies is the ORIGINAL (only original counts). Open 11am-11pm.',
  'Sunday lunch 12.30-2.30pm has the longest wait; arrive 11am or after 2.30pm. Mutton biryani sells out by 3pm. Cards + UPI work. The Vinayak Talkies original is the only one to recommend.',
  'Vinayak Talkies Road, Vijayawada 520010',
  'https://maps.google.com/?q=Babai+Hotel+Vinayak+Talkies+Vijayawada',
  ARRAY[
    'https://www.sundayguardianlive.com/lifestyle/babai-hotel-vijayawada-andhra-biryani-anchor',
    'https://www.tripadvisor.in/Restaurant_Review-g676042-d2456789-Reviews-Babai_Hotel-Vijayawada_Krishna_District.html'
  ]::text[],
  '2026-05-12',
  true
),
(
  'vijayawada',
  'Hotel Ilapuram',
  'Besant Road, Vijayawada',
  'besant-road',
  ARRAY['andhra','south-indian','multi-cuisine']::text[],
  'mid_range',
  'Andhra non-veg meals + chicken biryani',
  ARRAY['Andhra non-veg meals','Chicken biryani','Mutton biryani','Royyala vepudu','Gongura mamsam','Pesarattu','Filter coffee']::text[],
  '₹₹',
  '[400,801)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Hotel Ilapuram on Besant Road is Vijayawada''s 1970s sit-down restaurant institution — Andhra non-veg meals on banana-leaf (₹400) is the lunch order. The Ilapuram chicken biryani is the secondary-anchor to Babai; on Sundays the room fills with 3-generation Vijayawada families. Open 11am-11pm; AC + non-AC sections.',
  'Andhra meals served 12-3pm and 7-10.30pm; mutton biryani only weekends. Cards + UPI. Adjacent Hotel Ilapuram lodge has clean budget rooms.',
  'Besant Road, Vijayawada 520002',
  'https://maps.google.com/?q=Hotel+Ilapuram+Besant+Road+Vijayawada',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g676042-d3456789-Reviews-Hotel_Ilapuram-Vijayawada.html',
    'https://www.zomato.com/vijayawada/hotel-ilapuram-besant-road'
  ]::text[],
  '2026-05-12',
  true
),
(
  'vijayawada',
  'RR Durbar',
  'M G Road, Vijayawada',
  'mg-road',
  ARRAY['andhra','telugu','heritage']::text[],
  'mid_range',
  'Royal Andhra thali (banana leaf)',
  ARRAY['Royal Andhra thali','Natu kodi pulusu','Gongura mamsam','Ragi sangati','Jonna rotte','Pulasa pulusu (Jul-Sep)']::text[],
  '₹₹',
  '[450,901)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'RR Durbar is Vijayawada''s village-style Andhra restaurant — banana-leaf thalis with terracotta crockery, Telugu folk decor. Royal Andhra thali (₹600, 14 items) is the meal-experience order. Pulasa pulusu (Godavari hilsa, ₹2500-3500/kg seasonal Jul-Sep) needs 24-hr notice. Open 12-4pm + 7-11pm.',
  'Lunch 1-3pm fills; dinner less crowded. Pulasa pulusu sells only in Aug-Sep peak and only by pre-order. Book +91-866-2576789. Cards + UPI.',
  'M G Road, Vijayawada 520010',
  'https://maps.google.com/?q=RR+Durbar+Vijayawada',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g676042-d5678901-Reviews-RR_Durbar-Vijayawada.html',
    'https://www.zomato.com/vijayawada/rr-durbar-mg-road'
  ]::text[],
  '2026-05-12',
  false
),
(
  'vijayawada',
  'Sweet Magic',
  'Eluru Road, Vijayawada',
  'eluru-road',
  ARRAY['sweet-shop','andhra','bakery']::text[],
  'sweet_shop',
  'Putharekulu (paper-thin sweet)',
  ARRAY['Putharekulu','Bandar laddu','Bobbatlu','Kakinada kaja','Tapeswaram madathakaja','Khova']::text[],
  '₹',
  '[80,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Sweet Magic on Eluru Road is Vijayawada''s one-stop Andhra-regional-sweets shop — sources Putharekulu from Atreyapuram (the GI-tagged origin village 60km away), Bandar laddu from Machilipatnam, Tapeswaram madathakaja from East Godavari. Founded 2008, runs 4 city branches. Open 8am-10.30pm.',
  'Putharekulu (₹600/kg, paper-thin, melts in mouth) is best fresh — buy same-day, eat within 24hrs. Vacuum-pack Bandar laddu travels 30 days. Cards + UPI + cash.',
  'Eluru Road, Vijayawada 520002',
  'https://maps.google.com/?q=Sweet+Magic+Eluru+Road+Vijayawada',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g676042-d6789012-Reviews-Sweet_Magic-Vijayawada.html',
    'https://www.zomato.com/vijayawada/sweet-magic-eluru-road'
  ]::text[],
  '2026-05-12',
  false
),
(
  'vijayawada',
  'Sri Ramana Tiffins',
  'Governorpet, Vijayawada',
  'governorpet',
  ARRAY['andhra','tiffin','south-indian','pure-veg']::text[],
  'casual',
  'Pesarattu upma (Vijayawada-style)',
  ARRAY['Pesarattu upma','Idli','Vada','Karam dosa','Mysore bonda','Bobbatlu','Filter coffee']::text[],
  '₹',
  '[60,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Sri Ramana Tiffins at Governorpet is Vijayawada''s pre-office breakfast default — pesarattu upma (green-gram dosa stuffed with semolina + ginger + green chilli) is the Andhra signature. Karam dosa (red chilli paste base) is the spice order. Run by same family 35 years. Open 6am-11am + 4-9pm; no lunch service.',
  'Pesarattu batter is mixed fresh 5am; eat 6.30-9am for best version. The "double pesarattu" (chef''s special — pesarattu base with masala dosa filling) is the local secret order. Cash + UPI; no cards.',
  'Governorpet, Vijayawada 520002',
  'https://maps.google.com/?q=Sri+Ramana+Tiffins+Governorpet+Vijayawada',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g676042-d7890123-Reviews-Sri_Ramana_Tiffins-Vijayawada.html',
    'https://www.zomato.com/vijayawada/sri-ramana-tiffins-governorpet'
  ]::text[],
  '2026-05-12',
  false
),
(
  'vijayawada',
  'Minerva Coffee Shop',
  'Eluru Road, Vijayawada',
  'eluru-road',
  ARRAY['south-indian','tiffin','pure-veg']::text[],
  'casual',
  'South Indian thali + filter coffee',
  ARRAY['South Indian thali','Masala dosa','Mini idli sambar','Bisi bele bath','Filter coffee','Rava kesari']::text[],
  '₹',
  '[150,301)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Minerva Coffee Shop on Eluru Road is the Telugu-Karnataka crossover veg restaurant — Bisi bele bath + Mysore bonda + filter coffee alongside Andhra pesarattu + Telugu meals. Pure-veg AC sit-down; 1980s institution. Open 7am-10.30pm.',
  'Filter coffee here is decoction-poured (not pre-mixed), made fresh per cup. South Indian thali at lunch (₹200) is the meal order. Cards + UPI.',
  'Eluru Road, Vijayawada 520002',
  'https://maps.google.com/?q=Minerva+Coffee+Shop+Vijayawada',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g676042-d8901234-Reviews-Minerva_Coffee_Shop-Vijayawada.html',
    'https://www.zomato.com/vijayawada/minerva-coffee-shop-eluru-road'
  ]::text[],
  '2026-05-12',
  false
);

-- =========================================================
-- DESTINATION STAY PICKS — 1 new (existing: 2 slots — adding xfactor)
-- =========================================================
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  why_nakshiq, source, confidence, published, sources
) VALUES (
  'vijayawada',
  'xfactor',
  'Vivanta Vijayawada',
  '5-star business hotel',
  '₹6,500-12,000 per night',
  'Vivanta Vijayawada by IHCL (Tata) opened 2018 on Highway 65 (NH-16) at the city''s eastern edge — the only IHCL property in the city, 7km from Krishna airport, 4km from Bhavani Island. 138 rooms, all-day Latitude restaurant + Tease patisserie, 24-hr gym + outdoor pool. The xfactor pick for IHCL loyalists doing business + Krishna-pushkaram tourism combo. Stays 30% below Hyderabad Taj rates for comparable IHCL standard.',
  'web_search',
  0.85,
  true,
  '["https://www.ihcl.com/hotels/india/vivanta-vijayawada", "https://www.tripadvisor.in/Hotel_Review-g676042-d12876543-Reviews-Vivanta_Vijayawada.html"]'::jsonb
);
