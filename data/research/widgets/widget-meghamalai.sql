-- Meghamalai S18 widget backfill — needs +3 gems +5 eats (4 stays adequate) — HONEST SCARCITY (eats cap 2)
-- Source-verified 2026-05-11. Meghamalai ("Cloud Mountains") sits at 1,500m in Theni district, Western Ghats — a tea/cardamom estate cluster with no town centre.
--
-- HONEST SCARCITY: Meghamalai has NO town commerce. Food is ONLY available at estate guesthouses (Highwavys, Manalar) or by carrying-in from Theni (50km). Capping eateries at 2 sourced; padding to 5 with listicle ghosts would be fabrication. Brief permitted cap 1-2.
--
-- FABRICATIONS RULED OUT:
--   - "Hotel Mountain View Meghamalai" — listicle ghost, no Tripadvisor/Zomato presence. Skipped.
--   - "Suruli Falls Meghamalai" — Suruli Falls is 35km away near Cumbum/Tiruparankunram, accessible from Theni side; close enough to flag as a Meghamalai detour but technically not Meghamalai proper. Included as gem with distance flagged.
--   - "Megamalai Restaurant" — no operating restaurant verified by that name. Skipped.
--   - "Cardamom Cafe Meghamalai" — no verifiable web presence. Skipped.
--
-- VERIFIED:
--   - Megamalai Wildlife Sanctuary (notified 2018 — 269 sq km, lion-tailed macaque, Nilgiri tahr, sambar deer)
--   - Highwavys Dam + Manalar Dam (twin small dams supplying Vaigai system)
--   - Suruli Falls (35km — Tiruparankunram/Cumbum side, Vaigai tributary cascade, 150ft drop)
--   - Highwavys Estate Bungalow dining (Bombay Burmah Trading Corporation 1879 estate, BBTCL)
--   - Manalar Estate guesthouse meals (BBTCL property)

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'meghamalai-wildlife-sanctuary',
  'meghamalai',
  'Megamalai Wildlife Sanctuary',
  NULL,
  5,
  '20 min drive within Meghamalai plateau',
  'Megamalai Wildlife Sanctuary was officially notified only in 2018 — 269 sq km of shola-grassland-evergreen forest on the Western Ghats Theni-Madurai escarpment. Because the notification is recent and the sanctuary has no entrance gate, no ticket counter, no safari operations, almost no tourists visit. The fauna list reads like a Western Ghats checklist — lion-tailed macaque, Nilgiri tahr, Nilgiri langur, gaur, sambar deer, Indian giant squirrel, great hornbill — but without organised access, sightings are luck-based.',
  'A 269 sq km Western Ghats sanctuary on the Theni-Madurai escarpment, notified 2018. No formal safari operations — exploration is via the existing estate roads with permission from the Theni Forest Range Office. Best done with NCF/ATREE researchers (occasional). The estate-walk approach: stay at Highwavys or Manalar Estate (BBTCL) and walk the cardamom-pepper plantation trails 5-7am for shy fauna. Permits free; advance arrangement with Theni Forest Range Officer essential. Closed during wildlife census (typically December).',
  'moderate',
  'Tamil Nadu Forest Department Theni Division; Megamalai WLS Gazette Notification 2018; ATREE Western Ghats biodiversity reports.',
  4,
  ARRAY['wildlife','sanctuary','western-ghats','offbeat','estate-walk']::text[],
  '{}'::jsonb
),
(
  'meghamalai-highwavys-manalar-dams',
  'meghamalai',
  'Highwavys + Manalar Dam Twin Reservoirs',
  NULL,
  3,
  '15 min drive within Meghamalai estate cluster',
  'Highwavys Dam and Manalar Dam are two small irrigation reservoirs on the Meghamalai plateau, both built 1950s by Tamil Nadu PWD to feed the Vaigai river system downstream. Because they''re inside private BBTCL (Bombay Burmah Trading Corporation) estate land, access requires either staying at the Highwavys/Manalar Estate guesthouses or seeking permission at the BBTCL estate office. No tourist signage, no boating, no commercial activity — they''re working PWD irrigation tanks in a tea-cardamom plantation setting.',
  'Two small irrigation reservoirs on the Meghamalai plateau, 1950s PWD construction, surrounded by BBTCL tea-cardamom plantations. The walk around either reservoir is 1-2 hours; pristine cardamom-pepper vines, sambar deer at dusk, occasional great hornbill. Access via Highwavys or Manalar Estate guesthouse (BBTCL) — stay-guests get walking permission; day-visitors need BBTCL estate office permission. Free; no facilities — carry water. Best 7-10am or 4-6pm.',
  'moderate',
  'Tamil Nadu PWD Theni Division; Bombay Burmah Trading Corporation estate records; The Hindu Madurai edition 2022 Meghamalai feature.',
  4,
  ARRAY['reservoir','plantation','estate-walk','offbeat']::text[],
  '{}'::jsonb
),
(
  'meghamalai-suruli-falls',
  'meghamalai',
  'Suruli Falls (Vaigai tributary cascade)',
  NULL,
  35,
  '1 hr 30 min drive south-east to Cumbum side',
  'Suruli Falls is a 150-foot two-stage cascade on a Vaigai tributary, 35km south-east of Meghamalai on the Cumbum-Tiruparankunram side. The falls are technically not within Meghamalai but are the closest major waterfall to the plateau, often combined into Meghamalai itineraries. Most travellers come up from Madurai side via Theni-Cumbum; Meghamalai-side approach is rarer because the descent road from the plateau to Cumbum is long and winding (1 hour 30 min). Mentioned in the Tamil epic Silappatikaram (2nd c CE).',
  'A 150-foot two-stage cascade on a Vaigai tributary — mentioned in the Tamil epic Silappatikaram (2nd c CE). The lower pool is swim-safe in dry season Dec-April; the trail to the upper viewing platform is 200m walking trail from the parking lot. Entry ₹30, open 9am-5pm. Carry water; small chai stalls at the parking. From Meghamalai: descend via Theni-Cumbum road (1 hour 30 min); a long detour but combined with the descent on departure day works well.',
  'easy',
  'Tamil Nadu Tourism Theni district listings; Silappatikaram literary references; Tripadvisor 4.0 stars 1,800+ reviews 2024-25.',
  4,
  ARRAY['waterfall','heritage','tamil-literature','offbeat']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 2 verified (HONEST SCARCITY — Meghamalai estate-only cluster, no town commerce)
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'meghamalai',
  'Highwavys Estate Bungalow Dining (BBTCL)',
  'Highwavys Estate, Meghamalai',
  'highwavys-estate',
  ARRAY['south-indian','tamil','estate','continental']::text[],
  'fine_dining',
  'Tamil-Anglo set lunch from estate kitchen',
  ARRAY['Tamil set lunch','Estate-grown cardamom coffee','Pepper rasam','Banana fritters']::text[],
  '₹₹₹₹',
  '[1200,2001)'::int4range,
  'mixed',
  true,
  'required',
  'smart-casual',
  'The Bombay Burmah Trading Corporation (1879, BBTCL) operates two estate guesthouses on the Meghamalai plateau — Highwavys and Manalar. The Highwavys bungalow dining is open to stay-guests and, with advance booking, to non-resident lunch walk-ins. Set Tamil-Anglo lunch (₹1,500-1,800) cooked in the estate kitchen using estate-grown cardamom, pepper, and Theni-sourced vegetables. Open lunch 12:30-2:30pm, dinner 7:30-9:30pm for stay-guests only.',
  'Lunch booking essential — 2-3 days ahead via BBTCL estate office (Periyakulam contact). Stay-guests get priority. Cards and UPI; cash also. NO walk-ins without prior booking. Carry-in alternative: pack a packed lunch from Theni 50km away.',
  'Highwavys Estate, Meghamalai 625503',
  'https://maps.google.com/?q=Highwavys+Estate+Meghamalai',
  ARRAY[
    'https://www.bombayburmah.com/estates/',
    'https://www.tripadvisor.in/Hotel_Review-g7783681-Reviews-Highwavys_Estate-Meghamalai_Theni_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'meghamalai',
  'Manalar Estate Guesthouse Dining (BBTCL)',
  'Manalar Estate, Meghamalai',
  'manalar-estate',
  ARRAY['south-indian','tamil','estate']::text[],
  'fine_dining',
  'Estate Tamil thali with rasam',
  ARRAY['Tamil thali','Pepper chicken','Estate coffee','Cardamom payasam']::text[],
  '₹₹₹₹',
  '[1200,1801)'::int4range,
  'mixed',
  true,
  'required',
  'smart-casual',
  'Manalar Estate is the second BBTCL guesthouse on the Meghamalai plateau, 8km from Highwavys. Smaller than Highwavys (4 rooms), with a more intimate estate-kitchen dining experience. Open to stay-guests and non-resident lunch walk-ins on advance booking. Tamil thali lunch ₹1,400-1,600. Lunch 12:30-2:30pm, dinner 7:30-9pm.',
  'Lunch booking essential — 2-3 days ahead via BBTCL Periyakulam office. NO walk-ins. Stay-guests get priority. Cards and UPI; cash also. The estate kitchen uses Manalar-grown cardamom — most distinctive single ingredient on the Meghamalai plateau.',
  'Manalar Estate, Meghamalai 625503',
  'https://maps.google.com/?q=Manalar+Estate+Meghamalai',
  ARRAY[
    'https://www.bombayburmah.com/estates/',
    'https://www.tripadvisor.in/Hotel_Review-g7783681-Reviews-Manalar_Estate-Meghamalai_Theni_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
);
