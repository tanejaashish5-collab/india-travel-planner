-- chandratal — widget backfill (HONEST SCARCITY: 4300m alpine moraine lake, Jun-Oct only, no permanent infra)
-- Reality: Lake itself has ZERO infra. All "Chandratal" tourism happens at Batal village (14km away on Manali-Kaza highway, 3900m).
-- Eats = seasonal Batal dhabas. Stays = seasonal Batal tent camps. Confidence ≤0.65 to flag honest scarcity.
-- Existing gems (2): Kunzum La pass, Suraj Tal Lake. Eats (0). Stays (0).

-- =========================================================
-- gems (+1)
-- =========================================================

INSERT INTO hidden_gems (id, near_destination_id, name, distance_km, drive_time, why_unknown, why_go, difficulty, confidence_score, tags, translations) VALUES
('chandratal-bara-shigri', 'chandratal', 'Bara Shigri Glacier viewpoint',
  18, '45 min from Batal via Kaza road',
  'Most Chandratal day-trippers turn around at the lake without driving the extra 4km past Batal toward the glacier snout. The viewpoint is a roadside pull-out with no signage.',
  'Bara Shigri is the longest glacier in Himachal at roughly 30km, second-longest in the Indian Himalayas. The pull-out 4km past Batal on the Kaza road gives an uninterrupted view of the glacier tongue with Papsura (6451m) and Dharamsura (6446m) above. Go early — by mid-morning the wind funnels through the Chandra valley and standing photography becomes hard. June-October only; rest of year the road is closed.',
  'easy', 4,
  ARRAY['glacier','viewpoint','seasonal','high-altitude'],
  '{}'::jsonb);

-- =========================================================
-- eats (+2 of needed 5 — HONEST SCARCITY, only 2 verifiable seasonal dhabas exist near the lake)
-- =========================================================

INSERT INTO local_eateries (destination_id, name, area, cuisine, category, signature_dish, must_try, price_range, price_per_head_inr, vegetarian, kid_friendly, reservation, dress_code, why_it_matters, insider_tip, signature_address, google_maps_url, source_urls, last_verified) VALUES
('chandratal', 'Chacha Chachi Dhaba (Chandra Dhaba)', 'Batal',
  ARRAY['Indian','Himachali'], 'casual',
  'Rajma Chawal',
  ARRAY['Rajma Chawal','Maggi','Kadak chai','Aloo paratha'],
  '₹', '[80,200)'::int4range,
  'veg-friendly', true, 'walk-in', 'casual',
  'Run 45+ years by Dorje Bodh and Hishey Chhomo (locally Chacha-Chachi) at 3900m on the Kaza road, 14km from Chandratal Lake. Stone-walled with tarpaulin roof, mattresses-on-stone-bed dorm for 8-10 truckers and stranded travelers. Famously sheltered tourists trapped in the June 2010 snowfall.',
  'Open mid-June to mid-October only — buried in snow rest of year. Cash only, no signal. Bring your own toilet paper. If you want to overnight on a stone-cot mattress, ask early — they fill up by 7pm.',
  'Batal village, Manali-Kaza road, Lahaul-Spiti, HP 175132',
  NULL,
  ARRAY['https://travelshoebum.com/2015/12/05/sleepless-in-spiti/','https://www.brightcast.news/articles/meet-the-couple-behind-ladakhs-chacha-chachi-dhaba-a-lifeline-in-snowstorms-at-11000-feet'],
  '2026-05-10');

INSERT INTO local_eateries (destination_id, name, area, cuisine, category, signature_dish, must_try, price_range, price_per_head_inr, vegetarian, kid_friendly, reservation, dress_code, why_it_matters, insider_tip, signature_address, google_maps_url, source_urls, last_verified) VALUES
('chandratal', 'Kangri Dhaba', 'Batal',
  ARRAY['Indian','Himachali'], 'casual',
  'Maggi and chai',
  ARRAY['Maggi','Chai','Dal chawal','Eggs'],
  '₹', '[80,200)'::int4range,
  'veg-friendly', true, 'walk-in', 'casual',
  'The second of two seasonal dhabas at Batal — operates the same June-October window as Chacha Chachi, often takes overflow when the older dhaba is full. Same stone-and-tarp construction, same trucker-mattress dorm option for 200-300 rupees.',
  'If Chacha Chachi is packed (common in July-August), walk 50m further. Same food, same prices. They keep going slightly later into October some years if snow holds off.',
  'Batal village, Manali-Kaza road, Lahaul-Spiti, HP 175132',
  NULL,
  ARRAY['https://travelshoebum.com/2015/12/05/sleepless-in-spiti/','https://vargiskhan.com/log/accommodation-at-chandratal/'],
  '2026-05-10');

-- =========================================================
-- stays (+2 of needed 3 — HONEST SCARCITY, only seasonal tent camps exist, all at Batal not at lake)
-- =========================================================

INSERT INTO destination_stay_picks (destination_id, slot, name, property_type, price_band, why_nakshiq, source, confidence, published) VALUES
('chandratal', 'experience', 'Parasol Camps Chandratal',
  'Seasonal Swiss tent camp',
  '₹2,000–₹2,500 per person with meals',
  'The longest-running camp operator at Chandratal, set up at Batal each season (June-October only). Two tent grades — twin-cot Swiss and smaller alpine — with shared dry toilets. Booking via Bishan (09418845817 / parasolcamps@gmail.com) is essential since on-arrival walk-ins are rare.',
  'web_search', 0.65, true);

INSERT INTO destination_stay_picks (destination_id, slot, name, property_type, price_band, why_nakshiq, source, confidence, published) VALUES
('chandratal', 'value', 'Batal PWD Rest House',
  'Govt rest house',
  '₹400–₹800 per night (caretaker-dependent)',
  'A Public Works Department guesthouse at Batal village, 14km from the lake. Walls instead of canvas, no electricity, no TV. Caretaker is often absent — call the dhaba satellite phone (08991722020) ahead. Realistically you will still eat at Chacha Chachi next door.',
  'web_search', 0.55, true);
