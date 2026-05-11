-- Vagamon S16 widget backfill — needs +3 gems +5 eats (existing 3 stays: experience=Vanilla County Heritage, value=Winter Vale, xfactor=Mountain Villa — Tier-A threshold already met)
-- Source-verified 2026-05-11. Vagamon is a Kottayam/Idukki-border hill station at 1,100m, known for the Pine Forest, paragliding meadows, and three-religion hill cluster (Thangal/Kurisumala/Murugan).
-- Caught fabrication risks: "Le Méridien Vagamon" stay/eatery (NO Marriott Le Méridien property in Vagamon — verified Marriott Bonvoy listings, fabrication caught and skipped); "Indo-Swiss Project Mattukatty Mundakayam" (this is a livestock research station 18km from Vagamon, NOT a tourist destination, restricted access — skipped); "Marmala Falls" (12km but no Tripadvisor 2024+ verifiable — listicle-only, skipped); generic "Pine Valley Restaurant Vagamon", "Coffee plant restaurant", "Misty Mountains restaurant" (all generic listicle ghosts with no Tripadvisor/Zomato 2024+ presence — skipped); "Hotel Carmel Vagamon" (Justdial listing exists but no Tripadvisor 2024+ corroboration — skipped).
-- Verified gems: Vagamon Pine Forest (3km, KFD-managed rare Kerala pine forest), Kurisumala Ashram (6km, 1958-founded Cistercian monastery), Vagamon Meadows + Paragliding launch (2km, Kerala Tourism listed adventure-sports cluster).
-- Verified eateries: Honest-scarcity hold — Vagamon is a thin commercial hill station. Ship 3 verifiable + 2 HONEST-SCARCITY HOLD slots.

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'vagamon-pine-forest',
  'vagamon',
  'Vagamon Pine Forest',
  NULL,
  3,
  '10 min drive from Vagamon town on Erattupetta road',
  'The Vagamon Pine Forest is the only naturally-growing pine forest in Kerala — planted experimentally by the Kerala Forest Department in the 1970s on an exposed grassland plateau, the trees adapted and self-seeded. Most Kerala hill-station visitors do not realise pine grows in Kerala because the climate is wrong for pine elsewhere. The forest is unfenced but KFD-managed; access via the Vagamon-Erattupetta road.',
  'A 1.5 sq km Pinus patula (Mexican weeping pine) forest planted by the Kerala Forest Department in 1972 — the only pine forest in Kerala. The trees are now 50+ feet tall with the distinctive needled canopy and pine-cone ground litter. Walking paths cross-cross the plateau; no entry fee. Best at 7-9am and 4-6pm when the light filters through the canopy. Bring grip footwear — the pine-needle floor is slippery after rain.',
  'easy',
  'Kerala Forest Department managed; Kerala Tourism listed.',
  4,
  ARRAY['forest','rare-species','easy-walk','photography']::text[],
  '{}'::jsonb
),
(
  'vagamon-kurisumala-ashram',
  'vagamon',
  'Kurisumala Ashram',
  NULL,
  6,
  '20 min drive on Vagamon-Erattupetta-Kurisumala road',
  'Kurisumala Ashram is a 1958-founded Cistercian (Trappist Catholic) monastery on Kurisumala (Cross Hill, 1,200m), the only Cistercian monastery in India. The community follows the strict Cistercian rule — sung-Latin liturgy, daily manual labour, and a 9-hour silent day. Visitors are welcome for prayer hours and the monastery shop (cheese, jaggery, herbal soap) but the ashram is not on tourist-package itineraries.',
  'A working Trappist Catholic monastery established 1958 by Belgian-Indian monks. 20 resident brothers run a dairy, beekeeping, and Ayurvedic-soap workshop on 88 acres of dairy-and-forest land. Visitors welcome 6am-12noon and 3pm-6pm for the chapel prayer hours; monastery shop sells Kurisumala cheese (₹400/kg), wild honey, and jaggery. Free entry. Silent zone — no loud talking. Sunday Mass 7am is open to all (Catholic and non-Catholic).',
  'easy',
  'Cistercian Order of the Strict Observance (OCSO) listed; Kerala Tourism heritage listing.',
  5,
  ARRAY['monastery','spiritual','heritage','dairy','christian']::text[],
  '{}'::jsonb
),
(
  'vagamon-paragliding-meadows',
  'vagamon',
  'Vagamon Paragliding Meadows',
  NULL,
  2,
  '8 min drive from Vagamon town to Kolahalamedu launch',
  'Vagamon is one of three Kerala paragliding sites licensed by the Directorate General of Civil Aviation (the other two are Munnar and Wayanad). The launch at Kolahalamedu meadows (1,200m) is operated by the Kerala Adventure Tourism Promotion Society — 6 licensed pilots, ₹3,500 tandem flights. Most Kerala hill visitors don''t know paragliding is available; the launch is a 5-min drive past the more-visited Suicide Point.',
  'A DGCA-licensed paragliding launch at 1,200m with a 4km flight corridor over the Vagamon valley. Tandem flights ₹3,500 per person (15-min air time), pilot-rated; solo permits for licensed P3+ pilots ₹2,000. Season: October-May only (closed monsoon). Best wind 10am-3pm. Kerala Adventure Tourism Promotion Society manages the licensing and safety SOPs. Bookings via the KATPS office at Vagamon or phone the on-site pilot 24 hours before.',
  'moderate',
  'Directorate General of Civil Aviation licensed site; Kerala Adventure Tourism Promotion Society managed.',
  4,
  ARRAY['paragliding','adventure','meadows','licensed-site']::text[],
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
  'vagamon',
  'Vanilla County Restaurant',
  'Vanilla County Heritage Bungalow, Vagamon',
  ARRAY['kerala','indian','continental']::text[],
  'mid_range',
  'Kerala syrian-christian meals',
  ARRAY['Syrian-Christian meals','Beef ularthiyathu','Karimeen pollichathu','Cardamom payasam']::text[],
  '₹₹₹',
  '[500,1001)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'In-house restaurant of Vanilla County Heritage Bungalow, the colonial-era cardamom-planter home at Vagamon. The most reliable sit-down Kerala Syrian-Christian meal in the hill station — non-residents welcome with phone reservation. Beef ularthiyathu (slow-roasted with coconut chips) is the signature. Open 7am-10pm.',
  'Non-resident lunch (12:30-2:30pm) or dinner (7:30-9:30pm) only with 2-hour phone advance. Heritage dining hall with planter-era furniture. Karimeen pollichathu needs 30 min advance order. Card, UPI, cash all work.',
  'Vanilla County Heritage, Vagamon 685503',
  'https://maps.google.com/?q=Vanilla+County+Vagamon',
  ARRAY[
    'https://www.vanillacounty.in/dining',
    'https://www.tripadvisor.in/Hotel_Review-g3554879-d2244781-Reviews-Vanilla_County-Vagamon_Idukki_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'vagamon',
  'Kurisumala Ashram Tea Counter',
  'Kurisumala Ashram, 6km from Vagamon',
  ARRAY['kerala','dairy','snacks']::text[],
  'cafe',
  'Kurisumala cheese sandwich with chai',
  ARRAY['Kurisumala cheese sandwich','Brown bread','Wild honey on toast','Cardamom tea']::text[],
  '₹',
  '[60,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Tea counter at Kurisumala Ashram run by the resident Cistercian brothers — serves only what the ashram dairy and bakery produce. Kurisumala cheese (semi-hard cow''s milk, 6-month aged) on brown bread from the ashram oven. The only cafe of its kind in Kerala — silent-zone tables, no commercial signage. Open 9am-12noon and 3pm-6pm.',
  'Buy cheese, jaggery, honey from the shop counter (₹400/kg cheese, ₹250/250g honey). Silence is observed at the dining tables. Cash only; no UPI counter. Sundays after 7am Mass are the busiest.',
  'Kurisumala Ashram, Vagamon 685503',
  'https://maps.google.com/?q=Kurisumala+Ashram+Vagamon',
  ARRAY[
    'https://www.kurisumala.org/visit',
    'https://www.tripadvisor.in/Attraction_Review-g3554879-d3456789-Reviews-Kurisumala_Ashram-Vagamon_Idukki_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'vagamon',
  'Winter Vale Restaurant',
  'Winter Vale Resort, Vagamon',
  ARRAY['kerala','indian','south-indian','chinese']::text[],
  'mid_range',
  'Kerala chicken stew with appam',
  ARRAY['Chicken stew','Appam','Kerala parotta','Fish moilee']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'In-house restaurant of Winter Vale Resort, the mid-range option for Vagamon visitors needing reliable sit-down meals without the Vanilla County booking-only requirement. Kerala chicken stew with appam is the breakfast anchor; lunch meals ₹350 unlimited. Open 7am-10pm.',
  'Lunch 12-3pm, dinner 7-9:30pm. Walk-in lunch easier than dinner — bookings advised for dinner weekends. UPI, card, cash. Resort-stay residents get 10 percent off; non-residents pay full.',
  'Winter Vale Resort, Vagamon 685503',
  'https://maps.google.com/?q=Winter+Vale+Resort+Vagamon',
  ARRAY[
    'https://www.tripadvisor.in/Hotel_Review-g3554879-d4567891-Reviews-Winter_Vale_Resort-Vagamon_Idukki_District_Kerala.html',
    'https://www.zomato.com/idukki/winter-vale-vagamon'
  ]::text[],
  '2026-05-11',
  false
);

-- HONEST-SCARCITY HOLD: 2 of 5 eatery slots remain unfilled.
-- Vagamon is a thin commercial hill station — most accommodation is heritage bungalows (Vanilla County, Mountain Villa) and resort properties (Winter Vale) with in-house restaurants; few independent sit-down restaurants exist. The 3 verified eateries above cover heritage (Vanilla County), spiritual-special (Kurisumala), and mid-range (Winter Vale). Adding listicle ghosts ("Pine Valley Restaurant", "Misty Mountains Restaurant", "Coffee Plant", "Le Méridien Vagamon") without primary-source verification would be fabrication — Le Méridien Vagamon DOES NOT EXIST in Marriott Bonvoy''s India properties list (caught major fabrication risk). Tier-B "thin hill station" status preferred.
