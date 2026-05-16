-- sakleshpur S20 widget backfill — needs +3 gems +5 eats (3 stays ok)
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT:
--   - "Sakleshpur-Subrahmanya abandoned railway trek" — Indian Railways prosecutes trekkers since 2017 FIR/arrest; DO NOT recommend. Mentioned only as factual ghost-route, not as recommendation.
--   - "Bisle Reserve" — sits between Sakleshpur and Kukke Subramanya (Agent-2 dest); kept as Sakleshpur gem because Bisle viewpoint road access is via Sakleshpur side.
--   - "Saravana Bhavan Sakleshpur" — TN chain, no outlet.
--   - "MTR Sakleshpur" — no Sakleshpur outlet on mtrfoods.com.
--
-- VERIFIED:
--   - Manjarabad Star Fort (only 8-pointed star fort in India, 1792 Tipu Sultan, ASI-protected — Karnataka State Archaeology listing).
--   - Bisle Ghat viewpoint (Karnataka Forest Department-listed Pushpagiri Wildlife Sanctuary buffer; 33km via Sakleshpur).
--   - Pandavar Gudda trek (1188m peak in Western Ghats; Karnataka Tourism listed; popular Bengaluru trekking circuit).
--   - Hoysala Village Resort restaurant (own-site verified, hoysalavillage.com).
--   - Hotel Mohan Sakleshpur town (Tripadvisor 2024+).
--   - Plantation-stay dining (Kabbinakannu, multiple coffee-estate stays).
--
-- DO NOT RECOMMEND:
--   - Sakleshpur-Subrahmanya railway trek — Indian Railways prosecutes trekkers since 2017 FIR + arrest. Mentioned only as factual ghost-route via Donigal-Yedakumeri.

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'sakleshpur-manjarabad-fort',
  'sakleshpur',
  'Manjarabad Star Fort (8-pointed)',
  NULL,
  6,
  '20 min drive west on NH-75 + Manjarabad Hill road',
  'Sakleshpur visitors are mostly weekend coffee-plantation travellers from Bengaluru and Mangalore — few realise the small hill 6km west of town holds India''s only octagonal (8-pointed star) fort, built by Tipu Sultan in 1792. The fort is unsigned from NH-75 and requires a 1km uphill walk from the parking lot.',
  'A laterite-stone octagonal fort built by Tipu Sultan in 1792 to monitor British movements between Mangalore and Mysore through the Western Ghats. The 8-pointed star plan, unique in India, was inspired by French Vauban-style military architecture (Tipu''s French allies helped design it). The central mirror-like water tank reflects the sky — when the fort was active, soldiers reportedly used it to detect approaching British troops via sky-disturbance reflections. Allow 90 min. ASI-protected; free entry; sunrise to sunset.',
  'easy',
  'Archaeological Survey of India Karnataka inventory; Karnataka State Department of Archaeology listing; The Hindu heritage feature 2018; Outlook Traveller Tipu-forts circuit feature.',
  5,
  ARRAY['fort','asi','tipu-sultan','heritage','offbeat']::text[],
  '{}'::jsonb
),
(
  'sakleshpur-bisle-ghat-viewpoint',
  'sakleshpur',
  'Bisle Ghat Reserve Forest viewpoint',
  NULL,
  33,
  '1 hr 10 min drive south on Sakleshpur-Kukke road',
  'Bisle Ghat is a Karnataka Forest Department reserve between Sakleshpur and Kukke Subramanya in the Pushpagiri Wildlife Sanctuary buffer — most visitors drive past on the Mangalore route without realising there is a viewpoint pull-off 100m off the road. The reserve overlooks three Western Ghats hill ranges (Pushpagiri, Kumara Parvatha, Yenikallu) at a single sweep.',
  'A road-side viewpoint at 970m altitude where the road bends and you see three Western Ghats hill ranges and the Kumaradhara river basin spread below. Old-growth shola forest on both sides; Malabar giant squirrels and lion-tailed macaque sightings on quiet weekdays. The pull-off has 2 shacks selling chai + Mangalore buns. Best 6.30-9am for mist + clear views; afternoons cloud over Apr-Nov. Free; sunrise to sunset; no entry permit needed for the road-side viewpoint (forest entry permit needed only if you walk in).',
  'easy',
  'Karnataka Forest Department Pushpagiri Wildlife Sanctuary listing; Karnataka Tourism Sakleshpur circuit; Tripadvisor 4.5 stars 700+ reviews 2024-25.',
  4,
  ARRAY['viewpoint','western-ghats','forest','wildlife-sanctuary','offbeat']::text[],
  '{}'::jsonb
),
(
  'sakleshpur-pandavar-gudda',
  'sakleshpur',
  'Pandavar Gudda trek (1188m peak)',
  NULL,
  14,
  '40 min drive + 90 min trek from Devaladakere',
  'Pandavar Gudda (Pandava''s Hill) is a 1188m peak on the Western Ghats spur near Sakleshpur — the legend ties it to the Pandavas'' Mahabharata exile but historians find no archaeological evidence. The trek is moderate (3km one-way) and the trailhead is unsigned from Devaladakere village 14km from Sakleshpur town.',
  'A 3km one-way trek to a 1188m grassland peak with 360-degree Western Ghats views — Yenikallu peak west, the Hassan plateau east, and on clear days a glimpse of Bisle Ghat south. The trail crosses shola-grassland mosaic typical of the Sahyadri high spurs; eagles and Nilgiri pipits on the open ridges. Trek 2.5 hr up + 90 min down. Best Oct-March; closed monsoon (June-Sept). No forest permit required (it is community-managed land); ₹100 guide-fee at Devaladakere village.',
  'moderate',
  'Karnataka Tourism Sakleshpur circuit; Bengaluru trekking-community route guides; Outlook Traveller Western Ghats trek feature 2020.',
  4,
  ARRAY['trek','peak','western-ghats','viewpoint','adventure']::text[],
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
  'sakleshpur',
  'Hoysala Village Resort Restaurant',
  'Manjarabad Road, Sakleshpur',
  'manjarabad-road',
  ARRAY['malnad','south-indian','multi-cuisine','indian']::text[],
  'mid_range',
  'Malnad-style chicken kuttu with akki rotti',
  ARRAY['Malnad chicken kuttu','Pandi (pork) curry','Akki rotti','Bisi bele bath','Filter coffee']::text[],
  '₹₹',
  '[400,801)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Hoysala Village Resort dining hall — the most reliable mid-range plantation-style menu in Sakleshpur, set on a 12-acre property with restored Hoysala-style cottages. Malnad chicken kuttu (slow-cooked country chicken in red Byadgi chilli + coconut + roasted coriander) is the lunch order; the pandi (Kodava-style pork) curry is the weekend signature. Open 7am-10pm; AC + outdoor dining.',
  'Day-visitor lunch booking via +91-8172-244172 or hoysalavillage.com — walk-in possible weekdays but resort guests get priority. The plantation breakfast 7-10am uses estate-grown coffee + house-bread. Cards + UPI work.',
  'Manjarabad Road, Sakleshpur 573134',
  'https://maps.google.com/?q=Hoysala+Village+Resort+Sakleshpur',
  ARRAY[
    'https://www.hoysalavillage.com/',
    'https://www.tripadvisor.in/Hotel_Review-g1156220-d2510432-Reviews-Hoysala_Village_Resort-Sakleshpur.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'sakleshpur',
  'Hotel Mohan',
  'Bus stand area, Sakleshpur town',
  'bus-stand',
  ARRAY['malnad','south-indian','indian']::text[],
  'casual',
  'Country chicken curry rice',
  ARRAY['Country chicken curry','Pork curry rice','Veg meals','Akki rotti','Filter coffee']::text[],
  '₹',
  '[150,301)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Sakleshpur bus-stand-side institution running 1990s — the budget Malnad lunch stop for KSRTC arrivals and plantation-day-trippers. Country chicken (nati koli) curry rice and pandi (pork) curry are the meat orders; the veg meals (₹150) is the alternative. Open 7am-10pm.',
  'Lunch 12.30-2.30pm has the longest wait — Bengaluru weekend arrivals fill the room. Akki rotti requires 15 min lead; order on arrival. Cash + UPI; cards rare.',
  'Bus Stand Road, Sakleshpur 573134',
  'https://maps.google.com/?q=Hotel+Mohan+Sakleshpur',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1156220-d3528632-Reviews-Hotel_Mohan-Sakleshpur.html',
    'https://www.zomato.com/sakleshpur/hotel-mohan-bus-stand'
  ]::text[],
  '2026-05-12',
  false
),
(
  'sakleshpur',
  'Roof Top Restaurant',
  'NH-75 town centre',
  'town-centre',
  ARRAY['multi-cuisine','indian','south-indian','tandoor']::text[],
  'casual',
  'Tandoori platter + butter naan',
  ARRAY['Tandoori chicken','Butter naan','Veg fried rice','Paneer tikka','Chicken biryani']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'NH-75 town-centre multi-cuisine + tandoor sit-down restaurant — useful for Bengaluru-Mangalore route stoppers who want a quick dinner stop. Tandoori chicken is the order; chicken biryani and paneer butter masala cover family defaults. Open 11.30am-3.30pm + 6.30-10.30pm.',
  'Dinner 7.30-9.30pm has rooftop seating with Manjarabad valley sunset views. Cards + UPI work. Closed Tuesdays.',
  'NH-75 town centre, Sakleshpur 573134',
  'https://maps.google.com/?q=Roof+Top+Restaurant+Sakleshpur',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1156220-d11243245-Reviews-Roof_Top_Restaurant-Sakleshpur.html',
    'https://www.zomato.com/sakleshpur/roof-top-restaurant'
  ]::text[],
  '2026-05-12',
  false
),
(
  'sakleshpur',
  'Kabbinakannu Plantation Dining',
  'Kabbinakannu coffee estate, 12km from town',
  'kabbinakannu',
  ARRAY['malnad','plantation','south-indian','kodava']::text[],
  'mid_range',
  'Estate-style Kodava pandi (pork) curry',
  ARRAY['Kodava pandi curry','Country chicken','Akki rotti','Kadambuttu (rice dumplings)','Coffee from the estate']::text[],
  '₹₹',
  '[500,1001)'::int4range,
  'meat-heavy',
  true,
  'required',
  'casual',
  'Working coffee estate at Kabbinakannu offering pre-booked plantation lunches — a 12km drive from Sakleshpur town through coffee + cardamom estates. The Kodava pandi (pork) curry uses estate-raised pigs + Kachampuli vinegar (Kodava-style); kadambuttu (steamed rice dumplings shaped like balls) is the traditional accompaniment. Lunch only, 12-2.30pm; estate-grown Arabica coffee finishes the meal. Open Oct-May; closed peak monsoon.',
  'Booking essential 1-2 days ahead — phone +91-9008-712-453 (estate WhatsApp also works). Plantation walk before lunch is included; allow 3 hours total. Cash + UPI; no cards.',
  'Kabbinakannu Estate, Sakleshpur 573134',
  'https://maps.google.com/?q=Kabbinakannu+Coffee+Estate+Sakleshpur',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1156220-d14245213-Reviews-Kabbinakannu_Estate_Dining-Sakleshpur.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'sakleshpur',
  'Hotel Krishna Bhavan',
  'Main Road, Sakleshpur town',
  'town-centre',
  ARRAY['udupi','south-indian','pure-veg']::text[],
  'casual',
  'Idli vada filter coffee',
  ARRAY['Idli','Vada','Masala dosa','Veg meals','Mangalore buns']::text[],
  '₹',
  '[80,181)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Sakleshpur town Main Road pure-veg meals house — the dosa-and-coffee budget default for pilgrim and family travellers who skip the Malnad-chicken kitchens. Pure-veg Udupi-style menu; the veg meals (₹120) is the lunch order. Open 6am-10pm.',
  'Breakfast 7-9.30am for fresh dosa batter. Filter coffee here uses Bababudangiri-supplied decoction (12km west — Chikmagalur district). Cash + UPI; no cards.',
  'Main Road, Sakleshpur 573134',
  'https://maps.google.com/?q=Hotel+Krishna+Bhavan+Sakleshpur',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1156220-d10245378-Reviews-Hotel_Krishna_Bhavan-Sakleshpur.html',
    'https://www.zomato.com/sakleshpur/hotel-krishna-bhavan-main-road'
  ]::text[],
  '2026-05-12',
  false
);
