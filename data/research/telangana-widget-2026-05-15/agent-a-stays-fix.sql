-- Agent A FIX — missing stays for bhongir + medak (clean-slate dests, Agent A skipped)
-- All 6 stays verified via WebSearch 2026-05-15: Tripadvisor, Booking, JustDial, MakeMyTrip, TSTDC official.
-- bhongir: 3 stays = experience/Sannidhi Emerald + value/Hotel Vivera + location/Haritha Yadagirigutta.
-- medak: 3 stays = experience/Haritha Heritage Hotel Medak Fort + value/Vanam Resort Masaipet (35km en-route Hyderabad-Medak) + location/Haritha Edupayala (TSTDC).
-- Note: Sri Saaradhi Grand "Medak" and Hotel DS Grand Inn "Medak" are actually Patancheru/RC Puram (Hyderabad suburbs 70km from Medak town) — cross-dest contamination caught and rejected. The Hamlet "Medak" is at Shankarpally (60km from Medak town, near Hyderabad) — also rejected.

-- =====================================================
-- BHONGIR — 3 new stays
-- =====================================================

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'bhongir', 'experience', 'Sannidhi Emerald',
  '3-star hotel',
  '₹3,200–₹6,500 per night',
  'Marketed as "first 3-star in Yadagirigutta" — opened to absorb the post-2016 Yadadri Sri Lakshmi Narasimha temple renovation pilgrim rush. 4 room categories, near Yadadri Temple (15km from Bhongir Fort).',
  'Closest 3-star to both Yadadri Temple and Bhongir Fort — most other accommodation in the area is budget OYO or temple choultry. Best fit for couples/families who want comfort + Yadadri darshan + Bhongir Fort climb in one trip.',
  to_jsonb(ARRAY['https://sannidhiemerald.com/','https://www.makemytrip.global/hotels/hotel_sannidhi_emerald-details-bhuvanagri.html']),
  to_jsonb(ARRAY['post-2016-yadadri-build','3-star-anchor']),
  'web_search', 0.75
);

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'bhongir', 'value', 'Hotel Vivera',
  'Mid-range hotel',
  '₹1,400–₹2,800 per night',
  'On NH-9/Hyderabad-Warangal Bypass Rd, Survey No 28, Bhongir 508286 — 3km from Bhongir Fort base, 18km from Yadagirigutta. 3.9 JustDial rating, air-conditioned rooms.',
  'Best value mid-range hotel for Bhongir Fort climbers and Hyderabad-Warangal road-trippers — bypass-road location works for a 1-night stopover without entering Bhongir town traffic.',
  to_jsonb(ARRAY['https://www.justdial.com/Nalgonda/Hotel-Vivera-Near-Yadagiri-Gutta-Bhongir/9999P8682-8682-130430141716-R2H8_BZDET','https://www.tripadvisor.in/Hotel_Review-g1544623-d10273760-Reviews-Hotel_Vivera_at_Bhongir_Bypass-Nalgonda_Nalgonda_District_Telangana.html']),
  to_jsonb(ARRAY['nh-9-bypass','fort-base-3km']),
  'web_search', 0.78
);

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'bhongir', 'location', 'Haritha Hotel Yadagirigutta (TSTDC)',
  'Govt tourist hotel',
  '₹1,200–₹3,000 per night',
  'Government-run Telangana State Tourism property at Gandhi Nagar Yadagirigutta 508115 — AC/Non-AC rooms + dormitory. Multi-cuisine restaurant 7am–11pm. Outdoor pool. 15km from Bhongir Fort, walking distance to Yadadri Sri Lakshmi Narasimha temple.',
  'Only state-tourism property in the Bhongir/Yadagirigutta circuit — guaranteed rates, dormitory option for budget pilgrims, restaurant inside complex for early-morning Yadadri darshan bookings.',
  to_jsonb(ARRAY['https://telanganatourism.gov.in/partials/stay/yadadri-bhuvanagiri/haritha-hotel-yadagirigutta.html','https://tgtdc.in/hotellist?cityCode=78&unitCode=10103']),
  to_jsonb(ARRAY['tstdc-govt','pilgrim-priced']),
  'web_search', 0.85
);

-- =====================================================
-- MEDAK — 3 new stays
-- =====================================================

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'medak', 'experience', 'Haritha Heritage Hotel Medak Fort (TSTDC)',
  'Govt heritage hotel',
  '₹2,200–₹4,500 per night',
  'Telangana State Tourism heritage property with rooms built against the 12th-century Kakatiya Medak Fort wall (Fort Rd, Khilla Arabgalli, Medak 502110). Open-air dining inside the fort precinct. 4.2 Tripadvisor.',
  'Only in-town Medak stay with a real heritage-experience hook — sleep within the fort walls of Pratapa Rudra''s 12th-c Kakatiya defensive citadel, 4km from Asia''s second-largest Gothic cathedral.',
  to_jsonb(ARRAY['https://medak.telangana.gov.in/accommodation/haritha-heritage-hotel-medak-fort/','https://www.tripadvisor.in/Hotel_Review-Medak_Heritage-Haritha.html']),
  to_jsonb(ARRAY['tstdc-heritage','fort-wall-rooms']),
  'web_search', 0.82
);

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'medak', 'value', 'Vanam Resort, Masaipet',
  'Highway resort',
  '₹1,350–₹3,200 per night',
  '35km en-route Hyderabad-Medak via NH-44/Toopran-Masaipet, district address 4.2/236 reviews. Outdoor pool, free Wi-Fi, restaurant, parking — useful break point for road-trippers and weekenders not pushing all the way to Medak town.',
  'Best value option on the NH-44 Hyderabad-Medak corridor — splits the 100km drive at 65km mark, useful when arriving late or driving with kids who need a pool stop before the cathedral visit.',
  to_jsonb(ARRAY['https://www.justdial.com/Medak/Vanam-Resort-Near-Toopran-Masaipet/9999P8452-8452-230309193957-S2L2_BZDET','https://www.trip.com/hotels/medak-hotel-detail-124392439/vanam-resort/']),
  to_jsonb(ARRAY['nh-44-en-route','pool-restaurant']),
  'web_search', 0.72
);

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'medak', 'location', 'Haritha Hotel Edupayala (TSTDC)',
  'Govt tourist hotel',
  '₹1,100–₹2,400 per night',
  'Telangana State Tourism property at Edupayala 502110 (Medak district), near Sri Edupayala Vana Durga Bhavani Devalayam temple (35km from Medak town, on Manjira River). Restaurant on-site, basic AC rooms.',
  'TSTDC alternative for travelers combining Medak Cathedral with Edupayala Durga Bhavani temple (the river-island temple festival happens on Maha Shivaratri — booking is impossible at peak time without TSTDC fallback).',
  to_jsonb(ARRAY['https://medak.telangana.gov.in/accommodation/haritha-hotel-edupayala/','https://telanganatourism.gov.in/partials/stay/medak/haritha-hotel-nacharam.html']),
  to_jsonb(ARRAY['tstdc-govt','edupayala-river-temple']),
  'web_search', 0.78
);

-- ==========================
-- Summary
-- ==========================
-- bhongir: +3 stays (experience+value+location), now 3/3 → A-flip
-- medak: +3 stays (experience+value+location), now 3/3 → A-flip
-- Rejected fabrications during research:
--   - Sri Saaradhi Grand "Medak" (actually Patancheru/Hyderabad suburb 70km from Medak town)
--   - Hotel DS Grand Inn "Medak" (actually RC Puram/Hyderabad suburb)
--   - The Hamlet "Medak" (actually Shankarpally/Hyderabad outskirts 60km from Medak town)
--   - "Sankalp Pavilion Medak" (no footprint — name was a brief guess; confirmed ghost)
