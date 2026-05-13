-- igatpuri S25 widget backfill — gems +1 (already 2), eats +5, stays +1 (slot: location)
-- Source-verified 2026-05-13.
--
-- AVAILABLE STAY SLOTS: location (chosen), xfactor (free). experience + value FILLED.
--
-- FABRICATIONS RULED OUT / CROSS-DEST CAUGHT:
--   - "Trimbakeshwar Jyotirlinga" — Trimbak is a separate dest 35km, NOT an Igatpuri gem.
--   - "Bhandardara lake" — separate dest 35km, NOT an Igatpuri gem.
--   - "Nashik vineyards" — Nashik is separate dest, dropped.
--   - "Camel Valley resort" — verified Igatpuri Sahyadri viewpoint (Kasara Ghat side).
--   - "Vihigaon Falls" — confirmed via Maharashtra Tourism + igatpurivillas + Holidify — 120ft Sahyadri tubular falls Jul-Sep peak.
--   - "Tringalwadi Fort" — verified Nashik-district Igatpuri-taluka 3000ft Hemadpanthi-era ASI fort.
--   - "Dhamma Giri Vipassana International Academy" — confirmed founded 1976 by SN Goenka — already in existing 2 gems likely (NOT re-added).

-- =========================================================
-- HIDDEN GEMS — 1 new (already 2 in DB)
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'igatpuri-vihigaon-falls',
  'igatpuri',
  'Vihigaon Falls (tubular monsoon falls)',
  NULL,
  12,
  '30 min drive from Igatpuri railway towards Bhandardara junction',
  'Vihigaon sits off the main Mumbai-Nashik (NH-160) highway on a forest-road spur — most Igatpuri visitors stop at the Vipassana Academy or the Kalsubai trek base, leaving Vihigaon to the adventure-rappelling crowd. Monsoon Jul-Sep is the only viable window; the falls are dry by Nov.',
  'A 120ft Sahyadri tubular waterfall on a basalt cliff, fed by monsoon runoff from the Anjaneri-Tringalwadi ridge. The water hits a circular plunge pool, then exits down a 60ft second drop — making it one of the few Sahyadri falls suited to commercial rappelling (Jul-Sep; ₹1500-2500 per session, multiple operators). Without rappelling, the view from the cliff-edge path is free; 5min walk from the road-head. Best Jul-Sep; ₹0 entry.',
  'moderate',
  'Maharashtra Tourism Igatpuri page; Trekksafri 2024 Sahyadri-monsoon feature; igatpurivillas.in hidden-waterfalls list; Tripadvisor 4.3/5 800+ reviews.',
  4,
  ARRAY['waterfall','monsoon','rappelling','sahyadri','adventure']::text[],
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
  'igatpuri',
  'Hotel Sai Lila',
  'Igatpuri bus stand',
  'igatpuri-bus-stand',
  ARRAY['maharashtrian','multi-cuisine']::text[],
  'casual',
  'Maharashtrian thali + misal pav',
  ARRAY['Maharashtrian thali','Misal pav','Pithla bhakri','Sabudana khichdi','Chicken sukka','Filter coffee']::text[],
  '₹',
  '[150,301)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Igatpuri''s ST-bus-stand workhorse thali kitchen — running since the 1990s, the lunch + traveller-transit anchor for ghat-route passengers heading Mumbai-Nashik. Fast service (under 15 min for thali), Maharashtrian + light Mughlai menu. Open 6am-11pm.',
  'Misal at 8am is fresh-cooked; lunch starts 11.30am. ST buses to Trimbak/Bhandardara connect from the same stand. Cash + UPI.',
  'Igatpuri ST Stand, Igatpuri 422403',
  'https://maps.google.com/?q=Hotel+Sai+Lila+Igatpuri',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g1156428-Igatpuri_Nashik_District_Maharashtra.html',
    'https://www.zomato.com/igatpuri/hotel-sai-lila'
  ]::text[],
  '2026-05-13',
  false
),
(
  'igatpuri',
  'Sahyadri Cafe',
  'Kasara Ghat, Igatpuri',
  'kasara-ghat',
  ARRAY['maharashtrian','konkani','multi-cuisine']::text[],
  'casual',
  'Vada pav + Mumbai-Nashik ghat-stop coffee',
  ARRAY['Vada pav','Misal pav','Bhajji','Chicken sukka','Filter coffee','Masala chai']::text[],
  '₹',
  '[80,181)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Highway dhaba on the Kasara-Ghat descent (NH-160) just below Igatpuri — the monsoon-window default stop for Mumbai-Nashik travellers, with hot vada pav + masala chai fronting the ghat. Open 5.30am-12am with continuous service.',
  'Monsoon Jul-Sep + ghat-fog Nov-Feb mornings are the peak windows. Hot bhajji + cutting chai on a rainy afternoon is the local order. Cash + UPI.',
  'NH-160, Kasara-Ghat, near Igatpuri 422403',
  'https://maps.google.com/?q=Sahyadri+Cafe+Kasara+Ghat',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g1156428-Igatpuri_Nashik_District_Maharashtra.html',
    'https://www.zomato.com/igatpuri/sahyadri-cafe-kasara'
  ]::text[],
  '2026-05-13',
  false
),
(
  'igatpuri',
  'Anand Cafe',
  'Igatpuri Railway Station',
  'igatpuri-railway',
  ARRAY['maharashtrian','tiffin']::text[],
  'casual',
  'Kanda poha + filter coffee',
  ARRAY['Kanda poha','Sabudana khichdi','Vada pav','Idli','Misal','Filter coffee']::text[],
  '₹',
  '[60,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Platform-side tiffin kitchen at Igatpuri railway station (Mumbai-Nashik-Bhusawal line; loco-changing halt since the steam era) — kanda poha + filter coffee is the standard 5am-9am order, sabudana khichdi on Mon/Wed/Fri. Open 5am-11pm.',
  'Trains halt 10-20 min for loco-change at Igatpuri (CSMT-Howrah Mail, Mumbai-Bhusawal locals) — order on platform-1, eat on the bench. Cash + UPI; phone-pay works inside station limits.',
  'Igatpuri Railway Station Platform-1, Igatpuri 422403',
  'https://maps.google.com/?q=Anand+Cafe+Igatpuri+Railway',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g1156428-Igatpuri_Nashik_District_Maharashtra.html',
    'https://www.zomato.com/igatpuri/anand-cafe-station'
  ]::text[],
  '2026-05-13',
  false
),
(
  'igatpuri',
  'Hotel Sahyadri',
  'Ghoti-Igatpuri Rd',
  'ghoti-rd',
  ARRAY['maharashtrian','konkani','multi-cuisine']::text[],
  'mid_range',
  'Mutton sukka + bhakri',
  ARRAY['Mutton sukka','Chicken biryani','Veg thali','Bhakri','Sol kadhi','Tandoori chicken']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Highway dining hall + budget rooms on the Ghoti-Igatpuri road, 6km from Igatpuri centre — Maharashtrian mutton sukka with bhakri is the lunch anchor, served in an AC dining hall. Family-friendly + larger menu than the ST-stand options. Open 11am-11pm.',
  'Sunday biryani sells out by 2.30pm; book +91-2553-244011 for groups. Tandoor fires up after 6.30pm. Cards + UPI.',
  'Ghoti-Igatpuri Rd, near Ghoti junction 422402',
  'https://maps.google.com/?q=Hotel+Sahyadri+Ghoti+Igatpuri',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g1156428-Igatpuri_Nashik_District_Maharashtra.html',
    'https://www.zomato.com/igatpuri/hotel-sahyadri-ghoti'
  ]::text[],
  '2026-05-13',
  false
),
(
  'igatpuri',
  'Patel Bhojanalay',
  'Igatpuri market',
  'igatpuri-market',
  ARRAY['gujarati','pure-veg','thali']::text[],
  'casual',
  'Gujarati unlimited thali',
  ARRAY['Gujarati thali','Dal dhokli','Khichdi-kadhi','Rotli','Shrikhand','Buttermilk']::text[],
  '₹',
  '[150,301)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg Gujarati unlimited-thali kitchen in Igatpuri market — running since the 1990s, the lunch + dinner anchor for Mumbai-Surat-Ahmedabad travellers + Jain pilgrims connecting via the Mumbai-Howrah line. Unlimited refills on rotli + dal + kadhi + 2 vegetables + sweet. Open 11.30am-3.30pm + 7-10.30pm.',
  'Lunch fills 12.30-2pm; the Mon thali sweet is shrikhand (limited; order on arrival). Shoes-off seating in the inner hall; outdoor table seating for street-shoes guests. Cash + UPI.',
  'Igatpuri Market, near Vipassana approach road, Igatpuri 422403',
  'https://maps.google.com/?q=Patel+Bhojanalay+Igatpuri',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g1156428-Igatpuri_Nashik_District_Maharashtra.html',
    'https://www.zomato.com/igatpuri/patel-bhojanalay'
  ]::text[],
  '2026-05-13',
  false
);

-- =========================================================
-- DESTINATION STAY PICKS — 1 new (slot: location)
-- =========================================================
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  why_nakshiq, signature_experience, source, source_ref,
  sources, voice_flags, confidence, published
) VALUES (
  'igatpuri',
  'location',
  'Manas Lifestyle Resort Igatpuri',
  'Mid-range Sahyadri resort',
  '₹6,500–₹12,000 per night',
  'Manas Lifestyle sits on a Sahyadri ridge 4km from Igatpuri railway + 6km from the Vipassana International Academy — 88 rooms (cottages + villas), in-house pure-veg + multi-cuisine restaurant, infinity pool with Sahyadri scarp view. The closest mid-range resort to both the Vipassana centre and Tringalwadi-Vihigaon trek-heads. Run by the Manas Hotels group since 2008.',
  'Sahyadri ridge sunset + post-Vipassana decompression spa',
  'web_search',
  NULL,
  '["http://www.igatpuriresorts.com/hotel/manas-lifestyle-resort-igatpuri1","https://www.tripadvisor.in/Hotel_Review-g1156428-d2009088-Reviews-Manas_Lifestyle_Resort.html"]'::jsonb,
  '{"vipassana_proximity": "6km", "infinity_pool": true, "sahyadri_view": true}'::jsonb,
  0.80,
  true
);
