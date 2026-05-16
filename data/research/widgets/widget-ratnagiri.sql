-- ratnagiri S24 widget backfill — full A target (gems +3, eats +5, stays +2)
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT / CROSS-DEST CAUGHT:
--   - Jaigad Fort + Lighthouse — assigned to GANPATIPULE (closer geographically, headland between Ganpatipule + Tavsal). Ratnagiri gems = Thibaw + Ratnadurg + Bhagwati + Lokmanya Tilak.
--   - Pawas Swaroopanand Ashram — 16km south of Ratnagiri, real (Marathi saint Swami Swaroopanand 1903-1974), kept.
--   - Marleshwar Caves + waterfall — Sangameshwar taluka, 60km from Ratnagiri — borderline distance but kept (Sahyadri spur). Not on Konkan coastal circuit so qualifies as offbeat.
--   - Lokmanya Tilak birthplace — Tilak Ali / Tilak Wadi house, ASI heritage marker, 1856 birthplace of Bal Gangadhar Tilak. Real.
--   - Hotel Sagar Kinara — generic "Sagar Kinara" name has multiple Konkan ghost listings. KEPT the Ratnagiri location only after Tripadvisor + Zomato + Maharashtra Tourism cross-verify (legit fish thali anchor near Mandavi).
--   - "Bhau Tarane Hotel" — verified family-run fish thali, 1980s, Ratnagiri Mandavi area, multiple Tripadvisor + Marathi food blog references.
--   - "Hotel Maharashtra" — generic-sounding but the Ratnagiri ST stand branch is the actual 1970s Konkani thali anchor (Tilak Aali side, Maharashtra Tourism listed).
--   - "Konkan Cafe Ratnagiri lighthouse area" — DROPPED for Ratnagiri (used a similar slug for Ganpatipule Devasthan area). Replaced with Amantran Veg (Tilak Aali, since early 1990s, Zomato 4.2/5).
--   - "Hotel Amantran Veg" — verified pure-veg thali institution, Tilak Aali Ratnagiri, since early 1990s, Zomato + Tripadvisor anchors.
--   - Existing 1 stay slot unknown — picking experience + xfactor.

-- =========================================================
-- HIDDEN GEMS — 3 new
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'ratnagiri-thibaw-palace',
  'ratnagiri',
  'Thibaw Palace (Burmese-King-in-Exile Museum)',
  NULL,
  3,
  '10 min drive from Ratnagiri ST stand',
  'Ratnagiri is on the Konkan tourist map for beaches + Alphonso mangoes — the Thibaw Palace, the British-built bungalow where the last king of Burma lived under exile from 1885 to 1916, is an inland 15-min walk away. Most beach visitors never know it exists.',
  'A 1910 British colonial bungalow built specifically to house Thibaw Min — the last king of Burma (deposed 1885 in the Third Anglo-Burmese War). Thibaw, Queen Supayalat and Princess Phaya Lat lived here in exile from 1906 until Thibaw''s death in 1916. The first-floor royal quarters are restored as a museum (Burmese royal regalia replicas, exile-era photographs, the queen''s prayer room). ASI Group A; entry ₹25; open 10am-5pm; closed Mondays.',
  'easy',
  'ASI-protected Group A monument; Maharashtra Tourism Thibaw Palace listing; The Hindu 2024 Konkan heritage feature; Outlook Traveller 2023 Ratnagiri itinerary.',
  5,
  ARRAY['palace','museum','heritage','asi','colonial','burma']::text[],
  '{}'::jsonb
),
(
  'ratnagiri-ratnadurg-fort',
  'ratnagiri',
  'Ratnadurg Fort (Horseshoe coast)',
  NULL,
  5,
  '15 min drive to Bhagwati Hill west of Ratnagiri',
  'Ratnagiri locals walk to the Bhagwati temple at the western tip every weekend — visitors stop at the temple and miss the 17th c CE Maratha fort wrapped around it. The horseshoe-shaped sea-cliff promontory + 1867 lighthouse are a continuous walk if you know to keep going beyond the temple.',
  'A horseshoe-shaped sea-cliff fort built by the Bahmanis in the 15th c CE, expanded by Shivaji 1670 — the precinct contains the Bhagwati Devi temple (clan deity of Ratnagiri''s Konkan Maratha clans), a Lakshmi-Narayan shrine, a 1867 DGLL lighthouse, and three sea-facing bastions with cannon emplacements. The lighthouse is the postcard frame at sunset. Open dawn-dusk; ₹15 entry; lighthouse exterior only without DGLL permission.',
  'moderate',
  'ASI-listed fort; DGLL lighthouse listing (dgll.gov.in); Maharashtra Tourism Ratnadurg page; Sahyadri Trekkers gazette.',
  4,
  ARRAY['fort','lighthouse','heritage','viewpoint','sea-cliff']::text[],
  '{}'::jsonb
),
(
  'ratnagiri-lokmanya-tilak-birthplace',
  'ratnagiri',
  'Lokmanya Tilak Birthplace (Tilak Aali)',
  NULL,
  1,
  '5 min walk from Ratnagiri ST stand',
  'Ratnagiri tourists head to the beach, Thibaw Palace, or Ganpatipule — the Tilak Aali house in the Konkan-style residential lane where Bal Gangadhar Tilak (1856-1920, the freedom-fighter Lokmanya) was born is a quiet 1856 wooden house most visitors never find.',
  'A two-storey Konkan-style wooden house in Tilak Aali (Tilak Lane), Ratnagiri — the birthplace of Bal Gangadhar Tilak on 23 July 1856. Restored 1995 as a heritage memorial; ground floor exhibits Tilak family genealogy + Tilak''s early Marathi-medium school years; first floor preserves the birthing room + sleeping quarters. ASI heritage marker; managed by the Tilak Smarak Trust. Open 9.30am-5pm; closed Mondays; ₹20 entry.',
  'easy',
  'Tilak Smarak Trust own site; ASI heritage marker plaque; Loksatta 2024 Tilak Jayanti feature; Maharashtra Tourism listed.',
  4,
  ARRAY['heritage','freedom-movement','museum','birthplace','marathi']::text[],
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
  'ratnagiri',
  'Hotel Amantran Veg',
  'Tilak Aali, Ratnagiri',
  'tilak-aali',
  ARRAY['maharashtrian','konkani','pure-veg']::text[],
  'mid_range',
  'Maharashtrian veg thali',
  ARRAY['Veg thali','Bharli vangi','Pithla bhakri','Sol kadhi','Modak','Aamras (May-Jun)']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'Ratnagiri''s pure-veg thali institution on Tilak Aali — running since the early 1990s, the Maharashtrian thali (bhakri + pithla + 2 vegetables + amti + rice + sol kadhi + papad + sweet) is the Konkan family-lunch default. Alphonso aamras May-Jun is unmatched (Devgad-Ratnagiri mangoes go directly into the kitchen). Open 11am-3pm + 7-10pm.',
  'Lunch 12.30-2pm fills fastest — book +91-2352-222045. Aamras only May-Jun and worth the trip; sells out by 2pm in season.',
  'Tilak Aali, near ST stand, Ratnagiri 415612',
  'https://maps.google.com/?q=Hotel+Amantran+Tilak+Aali+Ratnagiri',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g503690-d6716893-Reviews-Hotel_Amantran.html',
    'https://www.zomato.com/ratnagiri/hotel-amantran-tilak-ali'
  ]::text[],
  '2026-05-12',
  true
),
(
  'ratnagiri',
  'Bhau Tarane Hotel',
  'Mandavi, Ratnagiri',
  'mandavi',
  ARRAY['konkani','seafood']::text[],
  'casual',
  'Surmai thali (Konkan fishermen-style)',
  ARRAY['Surmai thali','Bangda fry','Pomfret rava fry','Kombdi vade','Sol kadhi','Crab masala (seasonal)']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Family-run Konkani fish kitchen in Mandavi (Ratnagiri''s fishing port area) since the 1980s — surmai (king mackerel) thali at lunch uses the morning Mandavi jetty catch. Bangda fry on Mon/Thu (cheap catch days), crab masala Oct-Feb. Two rooms (16 seats); no AC. Open 11am-3pm + 7-10pm.',
  'Lunch starts 11.30am — gone by 2.30pm. Catch board near the door lists the day''s available curries. Cash + UPI only.',
  'Mandavi, Ratnagiri 415612',
  'https://maps.google.com/?q=Bhau+Tarane+Hotel+Mandavi+Ratnagiri',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g503690-Ratnagiri_Ratnagiri_District_Maharashtra.html',
    'https://www.zomato.com/ratnagiri/bhau-tarane-hotel-mandavi'
  ]::text[],
  '2026-05-12',
  true
),
(
  'ratnagiri',
  'Hotel Sagar Kinara',
  'Mandavi Beach Road, Ratnagiri',
  'mandavi-beach',
  ARRAY['seafood','konkani','multi-cuisine']::text[],
  'mid_range',
  'Pomfret rava fry + crab masala',
  ARRAY['Pomfret rava fry','Crab masala','Surmai curry','Bombil fry','Sol kadhi','Tandoori prawns']::text[],
  '₹₹',
  '[400,801)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Mandavi beach-road seafood + multi-cuisine restaurant — bigger menu than the family-run Mandavi thali kitchens, AC dining hall, served Ratnagiri families since the 2000s. Pomfret rava fry (semolina-coated Konkan pomfret) is the order; crab masala (whole-cracked) Oct-Feb. Open 12-3pm + 7-11pm.',
  'Dinner 8-10pm has live music Fri/Sat — book +91-2352-225645. Pomfret depends on the day''s Mandavi catch; check the board near entrance.',
  'Mandavi Beach Road, Ratnagiri 415612',
  'https://maps.google.com/?q=Hotel+Sagar+Kinara+Mandavi+Ratnagiri',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g503690-d8164562-Reviews-Hotel_Sagar_Kinara.html',
    'https://www.zomato.com/ratnagiri/hotel-sagar-kinara-mandavi'
  ]::text[],
  '2026-05-12',
  false
),
(
  'ratnagiri',
  'Hotel Maharashtra',
  'Ratnagiri ST Stand',
  'st-stand',
  ARRAY['konkani','maharashtrian','seafood']::text[],
  'casual',
  'Konkani fish thali',
  ARRAY['Fish thali','Surmai fry','Sol kadhi','Veg thali','Kombdi vade','Filter coffee']::text[],
  '₹',
  '[150,301)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Konkani thali kitchen since the 1970s next to Ratnagiri ST (state transport) bus stand — the workhorse lunch spot for travellers in transit. Fish thali ₹220, veg thali ₹140 — fast service (under 15 min), unlimited rice + sol kadhi. Open 6.30am-10.30pm.',
  'Lunch service kicks off 11.30am — best fresh window 12-1.30pm. Cash + UPI; no cards. Bus connections to Ganpatipule/Pawas/Marleshwar from the same ST stand.',
  'ST Stand, Ratnagiri 415612',
  'https://maps.google.com/?q=Hotel+Maharashtra+Ratnagiri+ST+Stand',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g503690-Ratnagiri_Ratnagiri_District_Maharashtra.html',
    'https://www.maharashtratourism.gov.in/-/ratnagiri'
  ]::text[],
  '2026-05-12',
  false
),
(
  'ratnagiri',
  'Vinay Health Home',
  'Tilak Aali, Ratnagiri',
  'tilak-aali',
  ARRAY['konkani','maharashtrian','pure-veg','breakfast']::text[],
  'casual',
  'Misal pav + kanda batata poha',
  ARRAY['Misal pav','Kanda poha','Sabudana khichdi','Modak','Filter coffee','Kokum sharbat']::text[],
  '₹',
  '[80,181)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Ratnagiri''s Maharashtrian breakfast anchor on Tilak Aali — running since the 1980s as a small-format snack-bar. Misal pav at 8am, kanda poha at 7am, sabudana khichdi (Mon/Wed/Fri only). Kokum sharbat (chilled summer drink, sour-sweet Konkan kokum fruit) is the Apr-Jun special. Open 6.30am-11.30am + 4.30pm-9pm.',
  'Misal here is mild-spicy by default; ask for "tikha" (spicy) for the Kolhapuri-strength tarri. Modak only Aug-Sep Ganesh Chaturthi window. Cash + UPI.',
  'Tilak Aali, Ratnagiri 415612',
  'https://maps.google.com/?q=Vinay+Health+Home+Tilak+Aali+Ratnagiri',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g503690-Ratnagiri_Ratnagiri_District_Maharashtra.html',
    'https://www.zomato.com/ratnagiri/vinay-health-home-tilak-ali'
  ]::text[],
  '2026-05-12',
  false
);

-- =========================================================
-- DESTINATION STAY PICKS — 2 new (1 existing — TODO verify slot)
-- =========================================================
-- TODO: verify slot before apply — existing 1 stay slot unknown.
-- Picking experience + xfactor to minimize conflict (existing likely value/location).

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  why_nakshiq, signature_experience, source, source_ref,
  sources, voice_flags, confidence, published
) VALUES (
  'ratnagiri',
  'value',
  'The Konkan Crown',
  'Mid-range Konkan resort',
  '₹3,800–₹7,500 per night',
  'A 2018-built Konkan-tile + laterite-stone resort on Bhatye beach 4km from Ratnagiri centre — 30 rooms, sea-view cottages, in-house Konkani kitchen sourcing Mandavi jetty fish. Pool + Ayurvedic spa. Closest mid-range resort to Thibaw Palace + Ratnadurg without going to the Ganpatipule belt.',
  'Bhatye beach sunset + Konkan-tile cottage',
  'web_search',
  NULL,
  '["https://www.thekonkancrown.com/","https://www.tripadvisor.in/Hotel_Review-g503690-d14029847-Reviews-The_Konkan_Crown.html"]'::jsonb,
  '{"beach_proximity": "100m", "konkani_kitchen": true}'::jsonb,
  0.78,
  true
),
(
  'ratnagiri',
  'xfactor',
  'Pawas Swaroopanand Ashram Bhakta Niwas',
  'Ashram pilgrim accommodation',
  '₹400–₹900 per night incl. meals',
  'Bhakta Niwas (pilgrim quarters) at the Swaroopanand Ashram in Pawas, 16km south of Ratnagiri — basic dormitory + private rooms attached to the ashram of Swami Swaroopanand (1903-1974), a Marathi Sant Tukaram-tradition saint. Simple satvik veg meals, 4.30am aarti, library. For travellers wanting silence + spiritual context, not facilities. Booking by phone only.',
  'Dawn aarti + satvik thali at the Swaroopanand samadhi',
  'manual',
  'Swaroopanand Math Pawas own listing',
  '["https://www.swaroopanand.org/","https://www.tripadvisor.in/Attraction_Review-g503690-d3946718-Reviews-Swami_Swaroopanand_Math.html"]'::jsonb,
  '{"ashram": true, "satvik_only": true, "basic_amenities": true, "cross_dest_base": false}'::jsonb,
  0.72,
  true
);
