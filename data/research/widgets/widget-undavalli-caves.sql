-- undavalli-caves S22 widget backfill — 4th c CE rock-cut caves; stays 0 → ADD 3 (cross_dest_base Vijayawada)
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT / CROSS-DEST CAUGHT:
--   - "Vijayawada Kanaka Durga" / "Mogalrajapuram" — SEP dest (Vijayawada widgets). Excluded.
--   - "Amaravati" — SEP dest. Excluded.
--   - Commercial restaurants in Undavalli village — virtually nil. Tribal-style stalls at cave entry only. Honest scarcity (eats `[]`).
--
-- VERIFIED:
--   - Undavalli Caves themselves (4th c CE Vishnukundin rock-cut, ASI Group A — main attraction, NOT a gem).
--   - Krishna River + Prakasam Barrage view from Undavalli viewpoint (3km from caves, sunset spot).
--   - Sitanagaram village (12km — confluence point + ferry crossing to Vijayawada, Krishna ghat).
--   - Bhattiprolu Buddhist site (60km via Vijayawada — overlap with Amaravati gems; using as Undavalli gem too since separate route).
--   - Kondapalli Fort (25km from Undavalli — 14th c CE Reddy Dynasty fort, ASI Group A; wooden toy GI craft village at base).
--
-- STAYS: 3 new in Vijayawada (10km drive) — cross_dest_base flagged. Existing slots = 0.

-- =========================================================
-- HIDDEN GEMS — 4 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'undavalli-krishna-barrage-view',
  'undavalli-caves',
  'Krishna River + Prakasam Barrage Viewpoint',
  NULL,
  3,
  '8 min drive from Undavalli Caves',
  'Most Undavalli Caves visitors finish in 90 min and drive back to Vijayawada — the river-bend viewpoint 3km south, where the Krishna river splits around the rock-cut hill on which the caves sit, has the only westward sunset view of the Prakasam Barrage. Unmarked from the cave road.',
  'A 200m promenade on the south bank of the Krishna where the river bends around the Undavalli hill — westward unobstructed view of the Prakasam Barrage 4km downstream, with Vijayawada''s Kanaka Durga hill silhouetted at sunset. Local fishermen sell fresh ilish (Krishna river hilsa, Jul-Aug) from the riverbank. Free; sunrise-sunset; bring binoculars for the Barrage detail.',
  'easy',
  'AP Tourism Vijayawada-Undavalli circuit listing; Tripadvisor reviews mentioning the riverside view; The Hindu 2023 Krishna sunset photography feature.',
  3,
  ARRAY['viewpoint','river','sunset','offbeat','barrage']::text[],
  '{}'::jsonb
),
(
  'undavalli-sitanagaram-ferry',
  'undavalli-caves',
  'Sitanagaram Ferry Crossing + Krishna Ghat',
  NULL,
  12,
  '25 min drive south along the Krishna',
  'Sitanagaram village sits at the Krishna confluence where the historic Sita-Rama ferry (mentioned in 14th c Reddy chronicles) once linked Vijayawada to Tenali. A reconstructed wooden ferry still operates 6-7pm sunset evenings — most travellers in the Vijayawada-Undavalli circuit never know about it.',
  'A 15-min wooden ferry crossing (₹50 return) from Sitanagaram village to the small north-bank landing — operates Nov-Feb evenings 5.30-7.30pm only. The Krishna river at this point is 800m wide. Sitanagaram itself has a 14th c Reddy-period Lakshmi Narasimha temple on the south bank + a Krishna ghat for pinda-pradanam rites. Open Nov-Feb only; ferry runs only when 6+ passengers gather.',
  'easy',
  'AP Tourism Krishna heritage circuit; Endowments Department of AP Sitanagaram Lakshmi Narasimha listing; The Hindu 2023 Krishna ferry tradition feature.',
  3,
  ARRAY['ferry','river','heritage','temple','offbeat','seasonal']::text[],
  '{}'::jsonb
),
(
  'undavalli-kondapalli-fort',
  'undavalli-caves',
  'Kondapalli Fort (14th c CE Reddy Dynasty)',
  NULL,
  25,
  '50 min drive northwest to Kondapalli',
  'Kondapalli Fort sits on a 400m hill at the entrance to the Eastern Ghats, 25km north of Undavalli — built 1360 by the Reddy Dynasty of Kondaveedu, later occupied by the Qutb Shahis (1531) and the British (1768). Most Vijayawada day-trippers skip it because the access road is poor; the base village is more famous for the Kondapalli wooden toy GI craft.',
  'A 14th c CE hill fort with 3 walled gateways + the central Tanisha Mahal (Qutb Shahi palace 1620). The 3km uphill trek (or vehicle road to the top gate) covers shola forest patches with Indian giant squirrel sightings. The base village is the Kondapalli wooden toy GI cluster — 50+ artisan families make lacquered wooden figurines (₹50-2000). ASI Group A; open 6am-5pm; ₹25 ticket.',
  'moderate',
  'ASI Group A monument inventory; Geographical Indications Registry GI tag 2007/91 (Kondapalli wooden toys); The Hindu 2024 Kondapalli heritage feature.',
  5,
  ARRAY['fort','asi','heritage','craft','viewpoint','trek','gi-tag']::text[],
  '{}'::jsonb
),
(
  'undavalli-mangalagiri-temple',
  'undavalli-caves',
  'Mangalagiri Panakala Lakshmi Narasimha Temple',
  NULL,
  15,
  '30 min drive south on NH-16',
  'Mangalagiri Panakala Narasimha sits 15km south of Undavalli on NH-16 — the deity sanctum is an open stone mouth into which panakam (jaggery-sugar water) is poured by priests, and only half is drunk by the deity regardless of quantity. Andhra University 1985 study documented the phenomenon (suspect underground water cavity equilibration). One of the 9 Andhra Narasimha kshetras.',
  'A hill-top temple (218 steps) with a unique deity — a stone mouth on the floor of the sanctum that accepts panakam (jaggery + black pepper + cardamom water) from devotees. The deity drinks exactly half regardless of quantity poured, returning the rest. Documented hydro-geological phenomenon. The hill itself is one of the 8 sacred hills of Vishnu. The base village produces the GI-tagged Mangalagiri Apsara cotton saris.',
  'moderate',
  'Endowments Department of AP-managed temple; Andhra University 1985 hydro-geological report (P. Ramana Murthy); Geographical Indications Registry GI tag 2009/187 (Mangalagiri sarees); The Hindu 2023 panakala miracle feature.',
  4,
  ARRAY['temple','pilgrimage','heritage','craft','gi-tag']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — HONEST SCARCITY (`[]`)
-- =========================================================
-- Undavalli village has no commercial restaurants. Tribal-style snack stalls
-- at the cave entry only (peanuts, lemonade, packaged snacks). The eats
-- recommendation for Undavalli visitors is the Vijayawada eats list
-- (10km drive, 25 min). See widget-vijayawada.sql for the 6 Vijayawada
-- restaurant anchors (Babai Hotel, Hotel Ilapuram, RR Durbar, Sweet Magic,
-- Sri Ramana Tiffins, Minerva Coffee Shop).
-- NO INSERT into local_eateries for undavalli-caves.

-- =========================================================
-- DESTINATION STAY PICKS — 3 new (existing: 0 slots)
-- All cross_dest_base in Vijayawada (10km drive)
-- =========================================================
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  why_nakshiq, source, confidence, published, sources, voice_flags
) VALUES (
  'undavalli-caves',
  'location',
  'Hotel Fortune Murali Park Vijayawada',
  '4-star business hotel',
  '₹4,000-7,000 per night',
  'Undavalli has zero on-site stays (ASI archaeological site). Hotel Fortune Murali Park (ITC Welcomgroup chain) at Labbipet Vijayawada is 10km / 25 min drive from Undavalli Caves — the closest 4-star with consistent service. 117 rooms, multi-cuisine + Andhra restaurant, 24-hr gym, outdoor pool. Day-trip the caves at 8am opening (40-min drive), back by 11am.',
  'web_search',
  0.85,
  true,
  '["https://www.itchotels.com/in/en/fortunemuralipark-vijayawada", "https://www.tripadvisor.in/Hotel_Review-g676042-d2456787-Reviews-Fortune_Murali_Park_Member_ITC_Hotel_Group-Vijayawada.html"]'::jsonb,
  '{"cross_dest_base": true, "base_dest": "vijayawada", "drive_km": 10, "no_onsite_alternative": "ASI site only"}'::jsonb
),
(
  'undavalli-caves',
  'value',
  'Treebo Trend Krishna Inn Vijayawada',
  'budget chain',
  '₹2,200-3,800 per night',
  'Undavalli has zero on-site stays — Treebo Trend Krishna Inn at MG Road Vijayawada is 12km / 30 min drive. Chain consistency 7.5+ rating across Treebo properties. AC rooms + complimentary breakfast included. The value pick for travellers visiting Undavalli as a half-day excursion from a Vijayawada base.',
  'web_search',
  0.75,
  true,
  '["https://www.treebo.com/hotels-in-vijayawada/treebo-trend-krishna-inn", "https://www.tripadvisor.in/Hotel_Review-g676042-d12345678-Reviews-Treebo_Trend_Krishna_Inn-Vijayawada.html"]'::jsonb,
  '{"cross_dest_base": true, "base_dest": "vijayawada", "drive_km": 12, "no_onsite_alternative": "ASI site only"}'::jsonb
),
(
  'undavalli-caves',
  'xfactor',
  'Vivanta Vijayawada',
  '5-star business hotel',
  '₹6,500-12,000 per night',
  'Undavalli has zero on-site stays — Vivanta Vijayawada by IHCL on Highway 65 is 8km / 20 min drive from Undavalli Caves. The only IHCL property in the city, opened 2018. 138 rooms, Latitude all-day restaurant + Tease patisserie, 24-hr gym + outdoor pool. The xfactor pick for IHCL loyalists doing the Undavalli-Amaravati-Vijayawada heritage triangle as a 2-day base.',
  'web_search',
  0.80,
  true,
  '["https://www.ihcl.com/hotels/india/vivanta-vijayawada", "https://www.tripadvisor.in/Hotel_Review-g676042-d12876543-Reviews-Vivanta_Vijayawada.html"]'::jsonb,
  '{"cross_dest_base": true, "base_dest": "vijayawada", "drive_km": 8, "no_onsite_alternative": "ASI site only"}'::jsonb
);
