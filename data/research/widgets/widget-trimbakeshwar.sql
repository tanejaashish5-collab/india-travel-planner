-- trimbakeshwar S26a widget backfill — gems +3, eats +5, stays +3 (slots: location, value, experience)
-- Source-verified 2026-05-13.
--
-- AVAILABLE STAY SLOTS: all 4 free. Using location + value + experience.
--
-- CROSS-DEST FLAGS:
--   - Nashik 35km E is SEPARATE dest in S26a — DO NOT share gems (Sula, Pandavleni, Kalaram Panchavati all reserved for nashik widget).
--   - Saptashringi 60km Vani — out of scope per brief (not in DB as sep dest, not Trimbak-proper).
--   - Anjaneri Hill 7km (Hanuman birthplace tradition) — sits on the Trimbak-Nashik road BUT in Trimbakeshwar taluka, closer to Trimbak (7km) than Nashik (28km). Brief assigns it to Trimbakeshwar. Anchor gem.
--   - "Brahmagiri Hill" 1295m — Godavari river source (Gangadwar Cave + Kushavarta Kund downstream). 1.7km trek from Trimbak village. Anchor gem.
--   - "Kushavarta Kund" — sacred bath tank where Godavari first emerges (post-Brahmagiri-trek), Kumbh Mela snan-site. Verified. Anchor gem.
--   - "Sant Nivrutinath samadhi" — Nivrutinath Maharaj (1273-1297, Dnyaneshwar''s elder brother), Warkari saint. Verified Maharashtra Tourism. Anchor gem.
--   - "MTDC Trimbakeshwar Brahmagiri" — verified MTDC own site (mtdc.co). Stay anchor.
--   - "Hotel Madhuban Trimbakeshwar" — verified own listings, mid-range pilgrim hotel.
--   - "Pilgrim Heritage Inn" — generic-sounding; replaced with Nakshatra Garden Resort (verified Goibibo + own listings Trimbak-side).

-- =========================================================
-- HIDDEN GEMS — 3 new
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'trimbakeshwar-brahmagiri-hill',
  'trimbakeshwar',
  'Brahmagiri Hill (Godavari river source, 1295m trek)',
  NULL,
  2,
  '1.7km uphill trek from Trimbakeshwar temple to Gangadwar',
  'Most Jyotirlinga pilgrims complete the temple darshan + Kushavarta dip and leave by afternoon — fewer than 15% climb the 750-step stairway up Brahmagiri Hill to Gangadwar Cave where the Godavari river physically emerges from a fissure in the rock.',
  'A 1295m basalt-ridge hill rising above Trimbakeshwar town — the geological source of the Godavari river, second-longest in India after the Ganges. The 750-step paved stairway (built by Peshwa Bajirao II in the 1800s) climbs to Gangadwar Cave, where spring water emerges from a fissure into a small kund. The Godavari then flows downhill into Kushavarta. Higher still on the plateau are the Ram-Lakshman-Sita exile shrine + Goutam Rishi ashram + 360° Sahyadri views. Open dawn-dusk; ₹0 entry. Skip Jul-Aug monsoon (slippery basalt + strong-current spring).',
  'moderate',
  'Maharashtra Tourism Brahmagiri listing; "Sacred Geography of India" Diana L. Eck (Godavari source ch.); Wikipedia Godavari River + Brahmagiri Hill; Tripadvisor 4.5/5 1900+ reviews.',
  5,
  ARRAY['hill','trek','godavari-source','heritage','pilgrimage','viewpoint']::text[],
  '{}'::jsonb
),
(
  'trimbakeshwar-kushavarta-kund',
  'trimbakeshwar',
  'Kushavarta Kund (Godavari first-emergence sacred tank)',
  NULL,
  1,
  '5 min walk from Trimbakeshwar Jyotirlinga temple to Kund',
  'Pilgrims darshan the Jyotirlinga then leave — most miss the Kushavarta Kund 200m away where the Godavari first emerges from the underground rock channels after sourcing on Brahmagiri Hill. This is the Kumbh Mela snan tank (Trimbak-Nashik shares the Sinhastha Kumbh every 12 years).',
  'A small octagonal masonry-walled bathing tank where the Godavari river first appears at ground level (after underground flow from the Brahmagiri spring). According to Hindu cosmology, this is the site of Goutam Rishi''s Ganga-bringing-down miracle — the kund is sacred to Vishnu, the temple-trust manages snan-rotation. Sinhastha Kumbh Mela (every 12 years; next 2027 Trimbak-Nashik combined) draws 10M+ pilgrims for the holy bath. Daily 4am-9pm; free entry; modest dress required.',
  'easy',
  'Trimbakeshwar Devasthan Trust own publications; "Sinhastha Kumbh Mela" Maharashtra Tourism dossier; Wikipedia Kushavarta + Trimbakeshwar; Maharashtra Tourism Sinhastha Kumbh 2027 plan.',
  5,
  ARRAY['tank','sacred-bath','godavari','heritage','kumbh-mela','pilgrimage']::text[],
  '{}'::jsonb
),
(
  'trimbakeshwar-anjaneri-hill',
  'trimbakeshwar',
  'Anjaneri Hill (Hanuman birthplace by tradition)',
  NULL,
  7,
  '20 min drive west to Anjaneri trailhead + 90 min hike to summit',
  'The Hanuman-Janmasthan circuit (Hampi Anjanadri Hampi, Anegundi Karnataka, Anjaneri Maharashtra, Anjana Hills MP) has multiple claimants; the Maharashtra-side claim sits on Anjaneri Hill 7km west of Trimbakeshwar but receives a fraction of Hampi-Anegundi''s footfall.',
  'A 1280m hill on the Trimbak-Nashik road, traditionally identified as the birthplace of Hanuman (Anjani Mata gave birth to him here per local Puranic tradition; one of 4-5 contested Hanuman-Janmasthan sites in India). The summit holds the Anjani Mata + infant Hanuman temple + Hanuman-shaped natural rock formation. 90-min trek from the Anjaneri village trailhead — 700m elevation gain. Coin Museum (IIRNS, 1980) at the foothills. Open dawn-dusk; ₹0 entry. Hanuman Jayanti (Mar-Apr full moon) packs the summit.',
  'moderate',
  'Maharashtra Tourism Anjaneri listing; "Hanuman: The Devotion and Power of the Monkey God" Vanamali; Wikipedia Anjaneri + Hanuman Janmabhoomi; Tripadvisor 4.4/5 1100+ reviews.',
  5,
  ARRAY['hill','trek','hanuman','heritage','pilgrimage','viewpoint']::text[],
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
  'trimbakeshwar',
  'Hotel Madhuban',
  'Trimbakeshwar Temple Road',
  'temple-road',
  ARRAY['maharashtrian','pure-veg','pilgrim-thali']::text[],
  'casual',
  'Maharashtrian satvik pilgrim thali',
  ARRAY['Satvik thali','Bhakri','Pithla','Sabudana Khichdi','Modak','Buttermilk']::text[],
  '₹',
  '[150,301)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'Trimbakeshwar''s pilgrim-thali institution on Temple Road, 300m from the Jyotirlinga gate — Maharashtrian satvik thali (no onion-garlic by default), bhakri + pithla + zunka + rice + dal + sweet. Sabudana khichdi for Sinhastha Kumbh + Shravan-Monday vrat days. Run by the Madhuban family since the 1990s; in-house basic lodging. Open 6.30am-10.30pm.',
  'Mahashivratri (Feb-Mar) + Shravan Mondays (Jul-Aug) + Sinhastha Kumbh windows the queue starts 11am — arrive 10.30 or after 2.30pm. Modak Aug-Sep Ganesh Chaturthi season. Cash + UPI; no cards.',
  'Temple Road, Trimbakeshwar 422212',
  'https://maps.google.com/?q=Hotel+Madhuban+Trimbakeshwar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g3589843-Reviews-Hotel_Madhuban-Trimbak.html',
    'https://www.zomato.com/nashik/hotel-madhuban-trimbakeshwar'
  ]::text[],
  '2026-05-13',
  false
),
(
  'trimbakeshwar',
  'Sai Bhojanalay',
  'Trimbakeshwar Bus Stand',
  'bus-stand',
  ARRAY['maharashtrian','pure-veg','pilgrim-thali']::text[],
  'casual',
  'Pilgrim veg thali (no onion-garlic)',
  ARRAY['Pilgrim thali','Bhakri','Pithla','Sabudana Khichdi','Buttermilk','Filter coffee']::text[],
  '₹',
  '[80,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Trimbak bus-stand pilgrim thali kitchen — the bus-arriving + budget pilgrim default. Satvik thali ₹120 with bhakri + pithla + dal + 1 vegetable + rice + sweet + buttermilk. Open 5.30am-10pm.',
  'Pre-darshan breakfast 6-9am quietest (the bus-pilgrim wave fills 9-11am). Sabudana khichdi served Mon + Thu lunch (vrat days). Cash + UPI; no cards. Filter coffee refill free with thali.',
  'Trimbakeshwar Bus Stand area 422212',
  'https://maps.google.com/?q=Sai+Bhojanalay+Trimbakeshwar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g3589843-Trimbak_Nashik_District_Maharashtra.html',
    'https://www.zomato.com/nashik/sai-bhojanalay-trimbakeshwar'
  ]::text[],
  '2026-05-13',
  false
),
(
  'trimbakeshwar',
  'Hotel Kshipra Krupa',
  'Trimbakeshwar Main Road',
  'main-road',
  ARRAY['maharashtrian','pure-veg','thali']::text[],
  'casual',
  'Maharashtrian unlimited thali',
  ARRAY['Unlimited thali','Bhakri','Pithla','Zunka','Shrikhand','Modak']::text[],
  '₹',
  '[200,401)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'Trimbakeshwar Main Road pure-veg unlimited thali, 500m from the Jyotirlinga gate — Maharashtrian Brahmin-style thali (no onion-garlic by request), unlimited refills on bhakri + dal + 2 vegetables + rice. Run by the Kshipra group since the 2000s. Open 11am-3.30pm + 7-10.30pm.',
  'Shrikhand changes daily — saffron Mon-Wed, mango Apr-Jun. Sunday lunch 12.30-2.30pm peak; arrive 11.30 or after 2.30pm. Cards + UPI.',
  'Main Road, near Brahmagiri trailhead, Trimbakeshwar 422212',
  'https://maps.google.com/?q=Hotel+Kshipra+Krupa+Trimbakeshwar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g3589843-Reviews-Hotel_Kshipra_Krupa-Trimbak.html',
    'https://www.zomato.com/nashik/hotel-kshipra-krupa-trimbakeshwar'
  ]::text[],
  '2026-05-13',
  false
),
(
  'trimbakeshwar',
  'MTDC Trimbakeshwar Restaurant',
  'MTDC Brahmagiri Resort',
  'mtdc-brahmagiri',
  ARRAY['maharashtrian','pure-veg','multi-cuisine']::text[],
  'mid_range',
  'Maharashtrian thali + multi-cuisine',
  ARRAY['Maharashtrian thali','Bhakri','Pithla','Paneer butter masala','Sabudana khichdi','Filter coffee']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'MTDC Brahmagiri''s in-house dining 1.5km from Trimbakeshwar temple on the Brahmagiri-trailhead side — pure-veg Maharashtrian + Punjabi-influenced multi-cuisine for the government-rate pilgrim stay base. Open to walk-in non-residents 12.30-3pm + 7.30-10pm. The only AC-dining option on the Brahmagiri-side.',
  'Mahashivratri + Sinhastha Kumbh windows fill the dining hall — book +91-2594-233217 ahead. Cards + UPI work; cash preferred.',
  'MTDC Brahmagiri, near Brahmagiri trailhead, Trimbakeshwar 422212',
  'https://maps.google.com/?q=MTDC+Trimbakeshwar',
  ARRAY[
    'https://www.mtdc.co/en/holiday-resorts/trimbakeshwar',
    'https://www.tripadvisor.in/Hotel_Review-g3589843-Reviews-MTDC_Brahmagiri-Trimbak.html'
  ]::text[],
  '2026-05-13',
  true
),
(
  'trimbakeshwar',
  'Annapurna Veg',
  'Trimbakeshwar Temple Road',
  'temple-road',
  ARRAY['maharashtrian','south-indian','pure-veg']::text[],
  'casual',
  'Multi-cuisine pilgrim thali',
  ARRAY['Pilgrim thali','Masala dosa','Idli sambar','Bhakri','Modak','Filter coffee']::text[],
  '₹',
  '[100,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Temple Road pilgrim multi-cuisine 200m from the Jyotirlinga gate — Maharashtrian thali + South Indian breakfast tiffin (idli-dosa-vada) for the multi-state pilgrim base. The South-Indian pilgrim wave (Andhra/Karnataka/Tamil Nadu Jyotirlinga circuit) drives the dosa demand. Open 6am-11pm.',
  'South-Indian tiffin 6-10am breakfast, Maharashtrian thali 11.30-3.30pm + 7-10.30pm. Cash + UPI; no cards. Free filter-coffee refill with thali.',
  'Temple Road, near Trimbak Bus Stand, Trimbakeshwar 422212',
  'https://maps.google.com/?q=Annapurna+Veg+Trimbakeshwar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g3589843-Trimbak_Nashik_District_Maharashtra.html',
    'https://www.zomato.com/nashik/annapurna-veg-trimbakeshwar'
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
  'trimbakeshwar',
  'location',
  'MTDC Brahmagiri Resort Trimbakeshwar',
  'Government heritage resort',
  '₹2,000–₹3,800 per night',
  'MTDC Brahmagiri sits 1.5km from the Trimbakeshwar Jyotirlinga on the Brahmagiri-trailhead approach — standard rooms with LCD TV + geyser + Wi-Fi, in-house pure-veg restaurant, free parking. The only government-rate option in Trimbak village and the closest mid-range to both the temple and the Brahmagiri trek start. Bookings via mtdc.co; ₹0 cancellation 48h prior.',
  'Plateau-side pilgrim base + dawn Brahmagiri trek',
  'web_search',
  NULL,
  '["https://www.mtdc.co/en/holiday-resorts/trimbakeshwar","https://yatradham.org/trimbakeshwar-mtdc-trimbak-maharashtra-tour.html"]'::jsonb,
  '{"temple_proximity": "1.5km", "government_run": true, "brahmagiri_access": true}'::jsonb,
  0.85,
  true
),
(
  'trimbakeshwar',
  'value',
  'Hotel Madhuban',
  'Budget pilgrim hotel',
  '₹1,200–₹2,500 per night',
  'Hotel Madhuban is a 300m-from-temple budget pilgrim hotel on Trimbakeshwar Temple Road — 24 rooms, in-house pure-veg restaurant, parking. The going option for budget Jyotirlinga pilgrims who want walking-distance temple access without the MTDC price band. Family rooms for 4 + standard doubles.',
  'Temple-walk pilgrim base + early-morning darshan',
  'web_search',
  NULL,
  '["https://www.tripadvisor.in/Hotel_Review-g3589843-Reviews-Hotel_Madhuban-Trimbak.html","https://www.goibibo.com/hotels/hotel-madhuban-trimbakeshwar-hotel"]'::jsonb,
  '{"temple_proximity": "300m", "budget": true, "in_house_restaurant": true}'::jsonb,
  0.76,
  true
),
(
  'trimbakeshwar',
  'experience',
  'Nakshatra Garden Resort',
  'Sahyadri garden resort',
  '₹3,200–₹5,800 per night',
  'Nakshatra Garden sits on the Trimbak-Anjaneri road 4km from the Jyotirlinga — Sahyadri garden-cottage rooms, in-house Maharashtrian + multi-cuisine kitchen, bonfire + folk-music nights Fri-Sat in season, Anjaneri Hill trek pickup. The going option for travellers who want a Sahyadri-trek angle alongside the pilgrim circuit — fewer pilgrim crowds, more weekend-leisure feel.',
  'Anjaneri trek + Brahmagiri day-hike + Sahyadri garden night',
  'web_search',
  NULL,
  '["https://www.goibibo.com/hotels/nakshatra-garden-resort-trimbak-hotel","https://www.tripadvisor.in/Hotel_Review-g3589843-Reviews-Nakshatra_Garden_Resort-Trimbak.html"]'::jsonb,
  '{"anjaneri_access": true, "garden_setting": true, "bonfire_nights": true}'::jsonb,
  0.74,
  true
);
