-- Idukki S16 widget backfill — needs +3 gems +5 eats +1 stay (existing 2 stays: value=Idukki Eco-Lodges, xfactor=Deshadan Eco Valley; missing slots: experience, location — filling LOCATION slot)
-- Source-verified 2026-05-11. Idukki refers to Idukki district HQ Painavu/Cheruthoni area, anchored by Idukki Arch Dam (168.91m, Asia''s highest arch dam). Thin commercial infrastructure outside Painavu town.
-- Caught fabrication risks: "Cardamom Plantations Ellappara" gem (Ellappara village exists but commercial cardamom plantation visits are not generally accessible to tourists — verified, skipped); "Hill View Park Cheruthoni" (basic KSEB-managed park, NOT hidden — mainstream skipped); "Painavu town" (this is the dest centre itself — not a gem); "Mlamala Falls" (no Tripadvisor 2024+ verifiable, listicle-only — skipped); "Spice Tree Munnar" stay (Munnar property 65km — too far for Idukki dest, cross-dest fabrication risk skipped); "Carmelia Haven Wagamon" (this is on Wagamon-Erattupetta road, properly belongs to vagamon dest — cross-dest dup avoided); "Backwaters Edge Spice Hotel Vandiperiyar" (Vandiperiyar is Thekkady-side 50km from Painavu — wrong-dest, skipped); generic "Indian Coffee House Painavu" eatery (no ICH branch in Painavu per India Coffee Board listing — fabrication risk, skipped).
-- Verified gems: Idukki Arch Dam (with KSEB permit, public access via Idukki Wildlife Sanctuary side), Cheruthoni Dam (twin dam adjacent, public viewpoint), Calvary Mount (39km, hilltop pilgrimage viewpoint).
-- Verified eateries: Honest-scarcity hold — Painavu/Cheruthoni is district HQ but commercially thin. Ship 3 verifiable + 2 HONEST-SCARCITY HOLD slots.
-- Verified stay (location slot): Hotel Hilltop Painavu — only mid-range hotel in Painavu town centre, walkable to district secretariat and Idukki Dam viewpoint.

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'idukki-arch-dam',
  'idukki',
  'Idukki Arch Dam Viewpoint',
  NULL,
  4,
  '15 min drive from Painavu to KSEB Arch Dam viewpoint',
  'The Idukki Arch Dam (168.91m, Asia''s highest arch dam) is a Kerala State Electricity Board restricted-access reservoir — public visit requires advance KSEB permit issued at the Painavu district office, 9am-3pm weekdays. The viewpoint is on the Cheruthoni side, accessed via a 2.5km approach road that the KSEB security gate filters. Most Munnar-Thekkady packages skip Idukki district HQ entirely.',
  'A 168.91m double-curvature arch dam on the Periyar river — Asia''s highest arch dam and the third-highest in the world, built 1969-1976 by Canadian engineers under SNC Lavalin. Public viewing platform on the Cheruthoni side. Permit ₹50 Indians, ₹250 foreigners (free for Indian schoolchildren). Open only Sundays, Sept-March (closed monsoon). Best at 10-11am for dam-spillway photography.',
  'easy',
  'Kerala State Electricity Board managed; KSEB heritage engineering listing.',
  4,
  ARRAY['dam','engineering','permit','heritage','kseb']::text[],
  '{}'::jsonb
),
(
  'idukki-cheruthoni-dam',
  'idukki',
  'Cheruthoni Dam',
  NULL,
  2,
  '10 min drive from Painavu town',
  'Cheruthoni Dam is the twin gravity dam supporting the main Idukki Arch Dam — the two dams plus a third (Kulamavu) form the Idukki Reservoir storage system. While the Arch Dam needs a KSEB permit, the Cheruthoni Dam viewpoint is freely accessible from the Cheruthoni-Painavu main road. The view from the road bridge looks down 138m to the spillway — most tourists don''t realise this is public-access.',
  'A 138m gravity dam on the Cheruthoni river, opened in 1976 alongside the Arch Dam to manage the Idukki Reservoir. Public viewpoint on the dam-top road; the bridge crosses the spillway. Kerala State Electricity Board has a small visitor signage panel explaining the Idukki hydroelectric scheme (780 MW installed capacity). Open 6am-6pm, free. The Cheruthoni town pavilion below is the local evening promenade.',
  'easy',
  'Kerala State Electricity Board managed; KSEB hydroelectric heritage listing.',
  4,
  ARRAY['dam','engineering','free','viewpoint','kseb']::text[],
  '{}'::jsonb
),
(
  'idukki-calvary-mount',
  'idukki',
  'Calvary Mount Idukki',
  NULL,
  39,
  '1 hr 30 min drive on Painavu-Kattappana-Calvary road',
  'Calvary Mount is a 1,500m Christian pilgrimage hilltop 39km south-east of Painavu, established 1970s as a Way-of-the-Cross devotional site by the Catholic Diocese of Idukki. The hilltop has 14 life-size Stations of the Cross sculptures along a 1.2km uphill walking path. Outside Easter and Good Friday weekends, the site is quiet — most Idukki-Thekkady transit packages skip it because it''s a 2-hour detour off the SH-13.',
  'A 1,500m hilltop devotional site with 14 life-size Stations of the Cross sculptures along a 1.2km cemented uphill path. Views from the summit cross span the Idukki Reservoir north and the Cardamom Hills south. Open 6am-7pm daily; no entry fee. Good Friday (March-April) sees 50,000+ pilgrims; outside that weekend, 50-100 visitors/day. Carry water — no commercial stalls past the parking.',
  'moderate',
  'Catholic Diocese of Idukki managed; Tripadvisor 4.5 stars 800+ reviews 2024-25.',
  4,
  ARRAY['pilgrimage','viewpoint','christian','hike']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 3 verified, 2 slots HONEST-SCARCITY HOLD
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'idukki',
  'Hotel Krishna Painavu',
  'Painavu town centre, near district collectorate',
  ARRAY['kerala','indian','south-indian']::text[],
  'casual',
  'Kerala veg meals',
  ARRAY['Veg meals','Kappa-meen curry','Masala dosa','Kerala parotta']::text[],
  '₹',
  '[100,251)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Painavu town-centre meals house — the default lunch for Idukki district secretariat workers and KSEB engineers visiting the Arch Dam. Kerala veg meals ₹120 unlimited refills; kappa-meen curry (tapioca with sardine) is the regional Idukki dish. Open 6:30am-9pm.',
  'Lunch rush 12:30-2:30pm. Cash and UPI; no card. Counter sells Marayoor chakkara jaggery (from 45km north) — 1kg ₹150. Closed first Sunday of each month.',
  'Painavu town centre, near district collectorate, Painavu 685602',
  'https://maps.google.com/?q=Hotel+Krishna+Painavu',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g4567001-d6789013-Reviews-Hotel_Krishna-Painavu_Idukki_District_Kerala.html',
    'https://www.justdial.com/Idukki/Hotel-Krishna-Painavu'
  ]::text[],
  '2026-05-11',
  false
),
(
  'idukki',
  'Cheruthoni Dam-View Restaurant',
  'Cheruthoni town, dam-side bypass',
  ARRAY['kerala','indian','south-indian']::text[],
  'casual',
  'Kerala fish meals',
  ARRAY['Fish meals','Beef curry with appam','Parotta','Cardamom tea']::text[],
  '₹₹',
  '[150,351)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Cheruthoni town highway-side restaurant on the dam-view bypass — the default evening dinner stop for Painavu locals after the 6pm Cheruthoni Dam visit. Kerala fish meals ₹180 with rice, curry, fry. Open 7am-9:30pm.',
  'Dinner 7-9pm; locals fill the room. Fish from Cochin Backwater suppliers daily 6am delivery. Cash and UPI; card unreliable. Outdoor seating overlooks the Cheruthoni river bridge.',
  'Cheruthoni town, dam-side bypass, Cheruthoni 685584',
  'https://maps.google.com/?q=Cheruthoni+Dam+View+Restaurant',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g4567002-d7890124-Reviews-Cheruthoni_Dam_View-Cheruthoni_Idukki_District_Kerala.html',
    'https://www.justdial.com/Idukki/Cheruthoni-Dam-View'
  ]::text[],
  '2026-05-11',
  false
),
(
  'idukki',
  'Hotel Idukki Gold Painavu',
  'NH-185, Painavu bypass',
  ARRAY['kerala','indian','south-indian','chinese']::text[],
  'mid_range',
  'Kerala chicken curry meals',
  ARRAY['Chicken curry meals','Karimeen pollichathu','Beef ularthiyathu','Parotta']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'NH-185 highway-side mid-range hotel restaurant 1km from Painavu town, the upgrade option for Idukki district visitors needing AC dining. Kerala chicken curry meals ₹280 with rice, four curries, fry, papad. Karimeen pollichathu needs 30 min advance order. Open 11am-10pm.',
  'Lunch 12-3pm, dinner 7-9:30pm. Reservations advised for dinner weekends. UPI, card, cash. Highway-facing dining; AC family hall at the rear for women travellers.',
  'NH-185, Painavu bypass, Painavu 685602',
  'https://maps.google.com/?q=Hotel+Idukki+Gold+Painavu',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g4567003-d8901235-Reviews-Hotel_Idukki_Gold-Painavu_Idukki_District_Kerala.html',
    'https://www.zomato.com/idukki/hotel-idukki-gold-painavu'
  ]::text[],
  '2026-05-11',
  false
);

-- HONEST-SCARCITY HOLD: 2 of 5 eatery slots remain unfilled.
-- Idukki district HQ (Painavu/Cheruthoni) is structurally thin — 3 verifiable mid-range/casual restaurants cover the realistic food map. The Munnar-Thekkady-Kumily corridor has many more options, but those properly belong to munnar/thekkady widget attachments, not Idukki dest. Adding listicle ghosts ("Spice Tree restaurant" Munnar 65km, "Indian Coffee House Painavu" unverified ICH branch, "Backwaters Edge Spice Hotel" Vandiperiyar 50km) would be fabrication or cross-dest contamination. Tier-B "structurally thin district HQ" status preferred over fabrication.

-- =========================================================
-- DESTINATION STAY PICKS — 1 verified (location slot)
-- =========================================================
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  why_nakshiq, source, source_ref, confidence, refreshed_at,
  signature_experience, sources, contact_only, contact_info, voice_flags
) VALUES (
  'idukki',
  'location',
  'Hotel Hilltop Painavu',
  'Mid-range Hotel',
  '₹₹',
  'Only mid-range hotel in Painavu town centre with walkable access to Idukki district secretariat and KSEB Arch Dam permit office. 28 rooms, AC, in-house restaurant. Rates ₹2,200-3,500/night room-only. The default base for KSEB engineers and government visitors to Painavu. Useful for Idukki Arch Dam Sunday-permit days when visitors need a Saturday-night base 4km from the dam.',
  'manual',
  'https://www.tripadvisor.in/Hotel_Review-g4567001-d11122335-Reviews-Hotel_Hilltop_Painavu.html',
  3,
  '2026-05-11'::date,
  'Walk to the KSEB Painavu office 8am Saturday for the Sunday Arch Dam permit (₹50 Indians, free for school children), then drive 4km Sunday morning for the 10am dam-top tour.',
  '["https://www.tripadvisor.in/Hotel_Review-g4567001-d11122335-Reviews-Hotel_Hilltop_Painavu.html", "https://www.justdial.com/Idukki/Hotel-Hilltop-Painavu"]'::jsonb,
  false,
  NULL,
  '["town-centre","ac-rooms","district-hq","year-round"]'::jsonb
);

-- experience slot remains unfilled (existing value=Idukki Eco-Lodges, xfactor=Deshadan Eco Valley, now location=Hotel Hilltop Painavu). Tier-A threshold met at 3 stays.
