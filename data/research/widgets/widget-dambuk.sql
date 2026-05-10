-- dambuk — widget backfill (Lower Dibang Valley, "Orange Country", festival-driven Dec tourism)
-- Reality: Dambuk village has 13+ official tourism-dept-listed homestays. Off-festival eateries are thin.
-- Existing gems (2): Mayodia Pass, Sally Lake (Roing). Eats (0). Stays (0).

-- =========================================================
-- gems (+1)
-- =========================================================

INSERT INTO hidden_gems (id, near_destination_id, name, distance_km, drive_time, why_unknown, why_go, difficulty, confidence_score, tags, translations) VALUES
('dambuk-bhismaknagar-fort', 'dambuk', 'Bhismaknagar Fort',
  60, '2.5 hr Dambuk–Roing–Bhismaknagar via Sally Lake road',
  'On the Dibang Valley tourist itinerary the fort sits in the shadow of the Mayodia Pass and Mehao Lake routes. ASI signage is faded and the access track is rough — most Orange Festival travelers skip it entirely.',
  'India''s oldest archaeological site in the eastern Himalayas, tentatively 8th century, with brick-built ruins of three halls, two extension rooms, and six entrances across 1860 sq m. For the Idu Mishmi tribe the fort is sacred — they trace descent from Rukmini, daughter of King Bhismaka, who married Krishna in the Mahabharata. ASI-protected since 1995.',
  'moderate', 4,
  ARRAY['heritage','archaeology','idu-mishmi','asi-protected','offbeat'],
  '{}'::jsonb);

-- =========================================================
-- eats (+1 of needed 5 — HONEST SCARCITY: Dambuk is festival-only town, off-Dec near-empty)
-- =========================================================
-- Most "Dambuk eateries" surfaced via tourism listicles either don't exist year-round or are pop-up festival stalls.
-- Roing town dhabas are 30km away — they belong to Roing destination not Dambuk.
-- The one verifiable category is the Idu Mishmi homestay-meal model (host-cooked smoked meat + bamboo shoot + apong).
-- This is captured better as homestay food than as a standalone restaurant. Better to ship 1 honest entry than fabricate 5.

INSERT INTO local_eateries (destination_id, name, area, cuisine, category, signature_dish, must_try, price_range, price_per_head_inr, vegetarian, kid_friendly, reservation, dress_code, why_it_matters, insider_tip, signature_address, google_maps_url, source_urls, last_verified) VALUES
('dambuk', 'Idu Mishmi homestay kitchens', 'Dambuk village',
  ARRAY['Idu Mishmi','Tribal','Northeast Indian'], 'casual',
  'Smoked pork with bamboo shoot',
  ARRAY['Smoked pork','Bamboo shoot curry','Apong rice beer','Sticky rice in leaf'],
  '₹', '[200,500)'::int4range,
  'meat-heavy', true, 'required', 'casual',
  'Off Orange Festival season (Dec) Dambuk has effectively no standalone restaurants — all hot meals run through the homestay network. Hosts cook traditional Idu Mishmi: smoked pork from above-the-hearth racks, bamboo-shoot curry with mustard leaf, apong (millet beer) in bamboo cups, sticky rice steamed in leaves. Booked through the homestay, not a la carte.',
  'Ask your homestay host the previous evening if you want a full Idu Mishmi spread — most cook simpler day-to-day fare unless you flag it. December festival pricing doubles; Jan-Nov stays at the ₹200-300 per meal mark.',
  'Dambuk village, Lower Dibang Valley, Arunachal Pradesh',
  NULL,
  ARRAY['https://arunachaltourism.com/homestays-in-lower-dibang-valley/','https://breakbag.com/blogs/inside-india-s-coolest-offbeat-festival-the-orange-celebration-of-dambuk'],
  '2026-05-10');

-- =========================================================
-- stays (+3)
-- =========================================================

INSERT INTO destination_stay_picks (destination_id, slot, name, property_type, price_band, why_nakshiq, source, confidence, published) VALUES
('dambuk', 'experience', 'Agam Gamni Homestay',
  'Idu Mishmi homestay',
  '₹2,000–₹3,500 per night with meals',
  'Diamond-grade homestay (highest tier on the Arunachal Tourism homestay register) run by Mido Pertin in Dambuk village. The Pertin family also hosts the Orange Festival cultural showcases. Off-festival you get a quiet orchard stay; festival week (mid-Dec) it is the most-booked Dambuk address.',
  'web_search', 0.70, true);

INSERT INTO destination_stay_picks (destination_id, slot, name, property_type, price_band, why_nakshiq, source, confidence, published) VALUES
('dambuk', 'value', 'Poblung Homestay',
  'Silver-grade homestay',
  '₹1,200–₹2,000 per night with meals',
  'Run by Iki Apum (contact 8787645080) in Poblung within Dambuk panchayat — listed on the Arunachal Pradesh Tourism homestay portal as Silver grade. Standard Idu Mishmi homestay model: bedroom in the family house, shared bath, three meals included.',
  'web_search', 0.65, true);

INSERT INTO destination_stay_picks (destination_id, slot, name, property_type, price_band, why_nakshiq, source, confidence, published) VALUES
('dambuk', 'xfactor', 'The Sikang Homestay',
  'Silver-grade homestay',
  '₹1,500–₹2,500 per night with meals',
  'Run by Bomhin Tayeng (contact 9862145705), Silver-grade on the official Arunachal Tourism homestay register. The Tayeng family operates a working orange orchard — Nov-Jan you eat fruit straight off the trees, off-season they pivot to citrus farm work and adventure-river guiding for Dibang rafting trips.',
  'web_search', 0.65, true);
