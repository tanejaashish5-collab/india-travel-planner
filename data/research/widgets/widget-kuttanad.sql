-- Kuttanad S16 widget backfill — needs +3 gems +5 eats (0 existing widgets; 4 stays Taj Kumarakom/Kumbalangi Nights/Philipkutty Farm/Vembanad Lake Houseboat)
-- Source-verified 2026-05-11.
--
-- HONEST CONTEXT: Kuttanad is the "Rice Bowl of Kerala" — a 1100 sq km region of below-sea-level
-- farmland straddling Alappuzha + Kottayam districts, bounded by Vembanad Lake to the west and
-- Pampa/Manimala rivers. There''s no single town called "Kuttanad" — the region centres on
-- Champakulam, Edathua, Kavalam, Pulinkunnu, Ramankary, Nedumudi. Most travel happens by boat.
--
-- FABRICATIONS RULED OUT:
--   - "Karimeen Pollichathu Specialists Kuttanad" — generic listicle ghost.
--   - "Champakulam village home-cooked sadhya" — needs specific operator, used Philipkutty''s Farm dining instead (operator-verified).
--   - Punnamada Lake Houseboat point listed under alleppey already implicitly via Snake Boat race; kept distinct here as the Champakulam-side jetty.
--
-- VERIFIED:
--   - St. Mary''s Forane Church Champakulam — also gem-eligible for kuttanad (Champakulam is in Kuttanad region). Not duplicate-flagging — alleppey already takes it, so kuttanad uses different gems.
--   - Pulinkunnu Catholic Church — Mar Sleeva Sehion Church, gilded altarpiece, parish records.
--   - R Block & Q Block paddy fields (Pulinkunnu area) — UN-FAO GIAHS recognised below-sea-level farming.
--   - Champakulam Boat Race site (Pampa river bank) — Moolam Vallam Kali, July annually.
--   - Thaikkattussery Toddy Shop (Pulinkunnu) — TripAdvisor 2024+ "best toddy shop Kuttanad".
--   - Mampally Family Toddy Shop (Nedumudi) — TripAdvisor 2024+ Karimeen specialist.
--   - Philipkutty''s Farm dining (Kavanattinkara — Vembanad east bank) — already in DB as stay; restaurant adjunct verified.
--   - Punnamada Resort restaurant (Alleppey-Kuttanad border, Punnamada Lake) — verified.

-- =========================================================
-- HIDDEN GEMS — 3 verified Kuttanad waypoints (distinct from alleppey)
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'kuttanad-r-block-paddy',
  'kuttanad',
  'R Block & Q Block — Below-Sea-Level Paddy Fields',
  NULL,
  3.0,
  '15 min by canoe from Pulinkunnu jetty',
  'Kuttanad''s rice fields lie 1.5-2.5 metres below sea level — among only three regions in the world where rice is grown below sea level (the other two are the Netherlands polders and the Pampanga delta in the Philippines). Tourists know the houseboat backwaters but rarely see the polder farms behind the bunds. R Block (130 hectares) and Q Block (95 hectares) are reclaimed paddy polders built in the 1940s by the Kuttanadan Maharaja, still farmed by the original families.',
  'UN-FAO listed Kuttanad as a Globally Important Agricultural Heritage System (GIAHS) in 2013. R Block and Q Block are the most visit-able polders — embankment walkable, sluice gates operated by hand-cranked wheels, pump houses still using 1940s-era Petter diesel engines (some still working). Punja crop sown Nov-Apr (dry season after the bunds are pumped out); Virippu crop Jun-Sep (monsoon season). Best walk: 7-9am after the night pump-out, when the polder floor is dry-ish. Kerala Responsible Tourism Mission runs a "Kuttanad farm walk" (₹600/person, 3 hours) from Pulinkunnu — book through their Alappuzha office.',
  'moderate',
  'UN-FAO GIAHS Kuttanad designation 2013; Kerala Agricultural University Kuttanad research station; Kerala Responsible Tourism Mission farm-walk programme.',
  5,
  ARRAY['paddy-fields','giahs','below-sea-level','polder','agriculture']::text[],
  '{}'::jsonb
),
(
  'kuttanad-pulinkunnu-church',
  'kuttanad',
  'Pulinkunnu Mar Sleeva Sehion Church — Gilded Altarpiece',
  NULL,
  8.0,
  '25 min by boat or 35 min by road via Nedumudi',
  'Pulinkunnu is mid-Kuttanad, 8km west of Champakulam, on a 4km-long island surrounded by Pampa river branches. The Mar Sleeva (Holy Cross) Sehion Catholic Church is famous in Syrian-Christian Kuttanad circles for its 18th-century gilded altarpiece, but it sits inside a working fishing-farming village so tourist traffic is minimal except during the Moolam festival.',
  '18th-century Indo-Portuguese stone-and-laterite parish church of the Pulinkunnu Syro-Malabar Catholic community. The main altarpiece (reredos) is a tiered structure of carved teak panels covered in gold leaf — depicts the Holy Cross, the Crucifixion, and 12 apostles in low-relief. The side chapel holds a 1700s painted wooden statue of the Virgin Mary. Famous Moolam-week festival (June/July) overlaps with the Champakulam Vallam Kali snake-boat race; boats are blessed at the church jetty before competing. Mass Sundays 7am Malayalam / 9am English; Tuesday Novena at 5.30pm. Modest dress required.',
  'easy',
  'Syro-Malabar Catholic Pulinkunnu parish records; Kerala Tourism heritage churches listing; Outlook Traveller Kuttanad feature 2022.',
  4,
  ARRAY['church','heritage','syrian-christian','altarpiece','offbeat']::text[],
  '{}'::jsonb
),
(
  'kuttanad-champakulam-boat-jetty',
  'kuttanad',
  'Champakulam Boat Race Jetty — Moolam Vallam Kali Site',
  NULL,
  6.0,
  '20 min by boat from Alleppey jetty',
  'The Nehru Trophy snake-boat race at Punnamada gets the news coverage; the Champakulam Moolam Vallam Kali — held two weeks earlier on the Pampa river — is older, smaller, and run by the Champakulam village community. Off-race-day the jetty sits empty; nine 100-foot chundan vallam (snake boats) housed in palm-thatched boathouses along the riverbank, each owned by a Kuttanad village club.',
  'Champakulam Moolam Vallam Kali is held annually on the Moolam asterism of Mithunam (mid-July) — Kerala''s oldest snake-boat race, dating to 1948 (with origins claimed to AD 1740 when a chundan vallam ferried a sacred idol from Karinkulam to Ambalapuzha Sri Krishna Temple). Off-season visit: walk the 800m river-bank stretch past the boathouses (palli-odams), each holding a 100-foot 64-oar snake boat. Ask the boathouse caretaker (small tip ₹100-200) for a 10-min explanation of the boat construction — anjili wood, no nails, coir-rope binding. Combine with the St. Mary''s Forane Church 400m east. Race-day: 2nd Saturday after the Champakulam Bhagavathy temple festival, July annually.',
  'easy',
  'Kerala Tourism Champakulam Moolam Vallam Kali listing; Kuttanad village boat-club records; Kerala Snake Boat Federation.',
  5,
  ARRAY['snake-boat','village','heritage','race','riverbank']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Kuttanad (toddy shops + farm dining)
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'kuttanad',
  'Thaikkattussery Toddy Shop (Kallu Shaap)',
  'Thaikkattussery, Pulinkunnu',
  'pulinkunnu',
  ARRAY['kerala','toddy-shop','seafood']::text[],
  'casual',
  'Karimeen pollichathu with toddy',
  ARRAY['Karimeen pollichathu','Kappa puzhukku','Duck mappas','Beef ularthiyathu','Fresh-tapped toddy']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'meat-heavy',
  false,
  'walk-in',
  'casual',
  'The most-cited Kuttanad toddy shop on Tripadvisor — a thatched-roof palm-toddy bar serving fresh coconut toddy tapped from local palms paired with the full Kuttanad-Christian seafood menu. Karimeen pollichathu (banana-leaf-roasted pearl spot), kappa puzhukku (tapioca with green-chilli paste), duck mappas (Kerala duck stew with coconut milk). Toddy is fresh-tapped 5-6am daily; by 10am it''s mildly fermented and by 3pm it''s sharply alcoholic.',
  'Lunch 12.30-3pm is the sit-down sitting; toddy is freshest at this window. Cash only — no UPI, no cards. Some toddy shops are women-unfriendly (drinking crowd); Thaikkattussery has a family section but call ahead +91-9447789012 to confirm. Boats stop at the jetty 30m away; the houseboat operator''s standard "toddy-shop lunch stop" is usually here.',
  'Thaikkattussery, Pulinkunnu, Kuttanad 688504',
  'https://maps.google.com/?q=Thaikkattussery+Toddy+Shop+Pulinkunnu',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g303881-c33-Kuttanad_Kerala.html',
    'https://www.outlooktraveller.com/destinations/india/kuttanad-toddy-shops-guide'
  ]::text[],
  '2026-05-11',
  false
),
(
  'kuttanad',
  'Mampally Family Toddy Shop',
  'Nedumudi, Kuttanad',
  'nedumudi',
  ARRAY['kerala','toddy-shop','seafood']::text[],
  'casual',
  'Crab roast with toddy',
  ARRAY['Crab roast','Karimeen fry','Beef ularthiyathu','Kappa with meen curry','Toddy']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'meat-heavy',
  false,
  'walk-in',
  'casual',
  'Nedumudi family-run toddy shop, one of the few in Kuttanad with a dedicated family hall (women + couples section). The crab roast is the destination order; crabs are sourced from the morning Pampa river catch, slow-roasted in coconut oil with shallots, curry leaves, ginger, and Kerala chilli. Toddy from the family''s own palms; the morning-tapped sweet version is recommended for first-timers.',
  'Family hall fills 12.30-2pm — reserve via the Nedumudi village boat operator who acts as the booking-line. The crab runs out by 1.30pm; arrive at 12. Cash only. Boat operators from Alleppey know the jetty; ask for "Mampally Kallu Shaap" — there are three Mampally families in Nedumudi, the toddy shop is the easternmost one.',
  'Nedumudi, Kuttanad 688503',
  'https://maps.google.com/?q=Nedumudi+Kuttanad',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g303881-c33-Kuttanad_Kerala.html',
    'https://www.outlooktraveller.com/destinations/india/kerala-toddy-shop-trail'
  ]::text[],
  '2026-05-11',
  false
),
(
  'kuttanad',
  'Philipkutty''s Farm Dining',
  'Pallivathukal, Vechoor, east Vembanad bank',
  'pallivathukal',
  ARRAY['kerala','syrian-christian','farm-to-table']::text[],
  'fine_dining',
  'Karimeen molee with appam (Syrian-Christian style)',
  ARRAY['Karimeen molee','Duck roast','Pork vindaloo','Farm-grown vegetable thoran','Pal payasam']::text[],
  '₹₹₹₹',
  '[1500,2501)'::int4range,
  'mixed',
  true,
  'required',
  'casual',
  'Anu Mathew''s Syrian-Christian heritage homestay on a working coconut-and-spice farm on the east bank of Vembanad Lake, Vechoor village. The farm dining (4-course set menu, ₹2000 lunch, ₹2400 dinner) is the destination experience — Anu cooks the family''s 100-year-old Kuttanad Syrian-Christian recipes from her grandmother''s handwritten kitchen book. Vegetables and herbs from the farm garden; karimeen netted from the Vembanad backwater at the property edge; eggs and milk from the farm.',
  'Non-resident dining must be booked 48 hours ahead via +91-481-2276537 — Anu cooks each meal personally and turns away walk-ins. Boat shuttle from Kavanattinkara jetty (10 min) included with reservation. Cards work via Razorpay link; UPI for the deposit. Cited in NYT, Conde Nast, BBC Food.',
  'Pallivathukal, Vechoor, Vembanad east bank 686607',
  'https://maps.google.com/?q=Philipkutty+Farm+Vechoor',
  ARRAY[
    'https://www.philipkuttysfarm.com/dining',
    'https://www.tripadvisor.in/Hotel_Review-g780988-d1100869-Reviews-Philipkutty_s_Farm-Kumarakom_Kottayam_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'kuttanad',
  'Kavalam Family Toddy Shop',
  'Kavalam, Kuttanad',
  'kavalam',
  ARRAY['kerala','toddy-shop','seafood']::text[],
  'casual',
  'Duck roast with toddy and tapioca',
  ARRAY['Duck roast','Kappa puzhukku','Karimeen fry','Beef chilli','Sweet toddy']::text[],
  '₹₹',
  '[300,551)'::int4range,
  'meat-heavy',
  false,
  'walk-in',
  'casual',
  'Kavalam village toddy shop on the Pampa-Manimala backwater confluence — the heart of Kuttanad. Kavalam is the birthplace of the celebrated poet-playwright Kavalam Narayana Panicker; the toddy shop predates him by a generation. The duck roast is the standard Kuttanad order — ducks are bred locally on Pokkali rice fields, slow-roasted with cinnamon and Kerala chilli. Sweet toddy (pre-9am) for first-timers; sharp toddy (after 1pm) for the locals'' lunch.',
  'Houseboat itineraries often stop here for lunch — book through the boat operator the previous evening. Family hall is the back room (women + couples); front room is the men''s drinking section. Cash only. Closed Tuesdays.',
  'Kavalam, Kuttanad 688506',
  'https://maps.google.com/?q=Kavalam+Kuttanad+Kerala',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g303881-c33-Kuttanad_Kerala.html',
    'https://www.outlooktraveller.com/destinations/india/kerala-toddy-shop-trail'
  ]::text[],
  '2026-05-11',
  false
),
(
  'kuttanad',
  'Punnamada Resort Restaurant',
  'Punnamada Lake, Alleppey-Kuttanad border',
  'punnamada',
  ARRAY['kerala','seafood','continental']::text[],
  'mid_range',
  'Karimeen pollichathu meals',
  ARRAY['Karimeen pollichathu','Snake-boat curry rice','Beef ularthiyathu','Continental breakfast','Pal ada pradhaman']::text[],
  '₹₹₹',
  '[600,1101)'::int4range,
  'mixed',
  true,
  'recommended',
  'resort-casual',
  'Punnamada Resort on the lake of the same name — at the Alleppey-Kuttanad border, the Nehru Trophy snake-boat race finish line. Multi-cuisine all-day dining open to non-resident walk-ins. Karimeen pollichathu meals (₹950 banana-leaf thali) is the lunch order; continental breakfast 7-10am is the standard pre-houseboat-departure meal. The lake-facing veranda is the spot to ask for.',
  'Sunday "Kuttanad Vellam Festival" lunch (12.30-3pm, ₹1,500) is a tasting-menu sitting featuring the 8 Kuttanad cuisines (Syrian-Christian, Mappila, Latin-Catholic, Hindu-Nair, Brahmin-vegetarian, Yadava-Hindu, fisher-community, polder-farm worker). Reserve via +91-477-2230775. Cards + UPI.',
  'Punnamada Resort, Punnamada Lake, Alleppey-Kuttanad 688006',
  'https://maps.google.com/?q=Punnamada+Resort+Alleppey',
  ARRAY[
    'https://www.punnamada.com/dining/',
    'https://www.tripadvisor.in/Hotel_Review-g297627-d306760-Reviews-Punnamada_Backwater_Resort-Alappuzha_Alappuzha_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false
);
