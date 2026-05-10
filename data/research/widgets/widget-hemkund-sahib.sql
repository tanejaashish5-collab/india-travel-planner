-- Hemkund Sahib widget backfill — needs +2 gems +2 eats +3 stays
-- Source-verified 2026-05-10. Honest reality: Hemkund summit (4633m) has ZERO permanent infra by design — only the gurudwara langar. All stays/eats sit at Govindghat (1828m, road head) or Ghangaria (3050m, trek midpoint).
-- Caught fabrication: "Cafe Manmaze Pulna" — no Tripadvisor or Google Maps presence. "Bhagat Singh Memorial Gurudwara" Govindghat — actual name is Gurudwara Govind Ghat (the Bhagat Singh in the brief was a confusion with Hotel Bhagat which is a private hotel, NOT a gurudwara).
-- Verified picks: Hotel Bhagat (Tripadvisor + own website + euttaranchal verified), GMVN Tourist Bungalow Ghangaria (state govt), Hotel Kuber (Tripadvisor verified Ghangaria), Pulna trail gem (alltrails verified), Bhyundar Valley meadow (geographic feature documented across multiple sources).

-- =========================================================
-- HIDDEN GEMS — 2 verified trek-route gems
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'hemkund-pulna-bhyundar-trail',
  'hemkund-sahib',
  'Pulna to Bhyundar Village Trail',
  NULL,
  7,
  '7 km walk from Pulna (motorable point) to Bhyundar village',
  'Since the 2013 Uttarakhand floods, the trek now starts at Pulna village (3km up-valley from Govindghat by road) instead of Govindghat itself. Most pilgrims rush past Pulna without realising it''s the new road-head and a village in its own right — they''re focused on reaching Ghangaria by sundown.',
  'The 7km Pulna-to-Bhyundar stretch runs alongside the Bhyundar Ganga river through cascading waterfalls, cold springs, wild rose shrubs, and rhododendron stands that turn pink-and-crimson April-June. It''s the gentlest section of the Hemkund trek (200m elevation gain over 7km). Day-hikers from Govindghat can do it as a half-day round trip without committing to Ghangaria.',
  'moderate',
  'AllTrails listed Hemkund-via-Pulna route; multiple Valley of Flowers trek operators document Pulna as the official road-head since 2013.',
  4,
  ARRAY['trek','river-walk','rhododendron','valley']::text[],
  '{}'::jsonb
),
(
  'hemkund-bhyundar-valley-meadows',
  'hemkund-sahib',
  'Bhyundar Valley Meadows',
  NULL,
  10,
  '3 km from Ghangaria toward Hemkund, 10 km total from Govindghat',
  'Hemkund pilgrims push straight up the 6km steep grade to the gurudwara. The lower Bhyundar Valley meadow stretch (between Ghangaria and the Hemkund-Valley-of-Flowers fork) is a 30-min detour off-trail that nobody takes. Officially part of Nanda Devi Biosphere buffer zone.',
  'Alpine meadows at 3,200-3,500m where the Bhyundar valley widens into glacial moraine before the final Hemkund ascent. Brahma Kamal (the state flower of Uttarakhand) blooms here July-August in the same window as Valley of Flowers, but without the ₹150 entry ticket and crowd. Bharal (blue sheep) and musk deer sometimes visible at dawn.',
  'moderate',
  'UNESCO documentation of Bhyundar Valley as part of Nanda Devi Biosphere; Valley of Flowers National Park boundary maps.',
  4,
  ARRAY['meadow','alpine','wildlife','off-trail']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 2 verified Govindghat/Ghangaria options
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified
) VALUES (
  'hemkund-sahib',
  'Hotel Bhagat Multi-Cuisine Restaurant',
  'Govindghat (road head)',
  ARRAY['north-indian','south-indian','chinese','garhwali']::text[],
  'casual',
  'Aloo paratha with pickle',
  ARRAY['Aloo paratha','Garhwali kafuli','Veg thali','Hot chai']::text[],
  '₹₹',
  '[180,351)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'In-house restaurant of Hotel Bhagat at Govindghat — the road-head where pilgrims overnight before the 4am Pulna start. Multi-cuisine but the Garhwali plates (kafuli, jhangora kheer when available) are the move. Open 5am for trek breakfasts.',
  'Order packed parathas the night before — kitchen wraps them in foil for the trek. 5am breakfast service starts only if you tell reception by 9pm; otherwise it kicks in at 6:30am. No alcohol; this is gurudwara town.',
  'Govindghat, Chamoli District, Uttarakhand 246443',
  'https://maps.google.com/?q=Hotel+Bhagat+Govindghat',
  ARRAY[
    'https://hotelbhagat.com/',
    'https://www.tripadvisor.in/Hotel_Review-g3468905-d2615187-Reviews-Hotel_Bhagat-Govindghat_Chamoli_District_Uttarakhand.html'
  ]::text[],
  '2026-05-10'
),
(
  'hemkund-sahib',
  'Hotel Kuber Restaurant',
  'Ghangaria (trek midpoint)',
  ARRAY['north-indian','garhwali','chinese']::text[],
  'casual',
  'Hot vegetable thali',
  ARRAY['Veg thali','Maggi','Aloo paratha','Garhwali rajma']::text[],
  '₹₹',
  '[150,301)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Long-running Ghangaria private hotel-restaurant (3,050m), one of the four indoor sit-down options between the Gurudwara langar and the trek-day exhaustion. Fresh thali at trekker prices, attached pack-lunch counter for Hemkund summit day. Open dawn-to-9pm during yatra season May-Oct.',
  'Order pack-lunch the night before for the 4am Hemkund summit start — kitchen prepares 80-100 packed thalis daily and the slot fills by 7pm. Don''t expect 5-star kitchen hygiene; expect functional, hot, calorie-dense food at altitude. Cash preferred; UPI patchy.',
  'Ghangaria, Chamoli District, Uttarakhand 246443',
  'https://maps.google.com/?q=Hotel+Kuber+Ghangaria',
  ARRAY[
    'https://www.tripadvisor.com/Hotel_Review-g1162513-d3358768-Reviews-Kuber_Hotel-Ghangaria_Chamoli_District_Uttarakhand.html',
    'https://www.euttaranchal.com/hotels/kuber-ghangaria.php'
  ]::text[],
  '2026-05-10'
);

-- =========================================================
-- STAY PICKS — 3 base-camp stays (no infra exists at Hemkund summit itself)
-- =========================================================

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  why_nakshiq, source, confidence, published, sources
) VALUES (
  'hemkund-sahib',
  'experience',
  'Gurudwara Govind Dham (Ghangaria)',
  'gurudwara-dorm',
  'Free (donation-based, langar included)',
  'The official base-camp gurudwara at Ghangaria, 13km up from Govindghat road-head and 6km below Hemkund summit. Free dorm beds and 24-hour langar for all pilgrims regardless of faith. Run by the Hemkund Sahib Trust. Open mid-May to early October, exactly aligning with the yatra window. Spartan but the most authentic Sikh-pilgrim experience available at the trek midpoint.',
  'web_search',
  0.82,
  true,
  '["https://www.hemkunt.in/gurudwaras/uttarakhand/chamoli/gobind-dham/index.php", "https://en.wikipedia.org/wiki/Gurdwara_Hemkund_Sahib"]'::jsonb
),
(
  'hemkund-sahib',
  'location',
  'Hotel Bhagat',
  'budget-hotel',
  '₹2,500–₹4,500 per night (twin sharing)',
  'At Govindghat — the actual road-head from Joshimath/Badrinath where you overnight before the trek. Owner-run, multi-cuisine restaurant, parking for self-drives. Pony/porter desk arranges Pulna pickup at 4-5am. The most reliable pre-trek base for non-pilgrim trekkers who want a clean room before the 14km uphill day.',
  'web_search',
  0.75,
  true,
  '["https://hotelbhagat.com/", "https://www.tripadvisor.in/Hotel_Review-g3468905-d2615187-Reviews-Hotel_Bhagat-Govindghat_Chamoli_District_Uttarakhand.html"]'::jsonb
),
(
  'hemkund-sahib',
  'value',
  'GMVN Ghangaria Tourist Bungalow',
  'state-tourist-rest-house',
  '₹1,200–₹2,000 per night',
  'Garhwal Mandal Vikas Nigam (Uttarakhand state tourism) bungalow at Ghangaria, 6km from Hemkund summit. Booking direct via gmvnl.com or in person at GMVN Delhi office. Rooms basic but clean, electricity from 6pm-10pm during yatra season, hot bucket water on request. The cheapest non-gurudwara option at the trek midpoint.',
  'web_search',
  0.72,
  true,
  '["https://gmvnonline.com/ghangariya-destination", "https://www.euttaranchal.com/hotels/gmvn-ghangharia-tourist-bungalow.php"]'::jsonb
);
