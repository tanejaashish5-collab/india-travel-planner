-- Diu widget backfill — needs +2 eats (Nagoa/Jallandhar beach zone, away from existing Old Town/Bunder)
-- Source-verified 2026-05-10. Caught fabrication risk: Mukesh Pizza/Yoyo/Cafe del Mar/Falafel House — all listicle ghosts, no Tripadvisor or primary listing. Skipped.
-- Also caught: "Oasis Beach Resort" — not found; using Praveg Ocean Grill (verified at Praveg Beach Resort Nagoa).

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified
) VALUES (
  'diu',
  'Sea Cafe Patel''s',
  'Nagoa Beach',
  ARRAY['gujarati','indian','beach-shack']::text[],
  'casual',
  'Gujarati thali',
  ARRAY['Mint mojito','Gujarati thali','Pav bhaji','Cold coffee']::text[],
  '₹₹',
  '[250,551)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'beach-casual',
  'The pure-veg shack on the Nagoa Beach strand — when families on Vaishnav/Jain pilgrimage from Saurashtra hit Nagoa, this is where they eat. Right at the beach edge, palm-shaded, run by the Patel family for over a decade. The only Nagoa option that survives a Gujarati grandmother''s scrutiny.',
  'Skip the pav — bread is bought-in and often stale by 4pm. The mojito and coffee are the wins; thali is honest but not the star. Pre-monsoon afternoons (April-May) the place runs out of fresh juice by 3pm — go before lunch or after 6.',
  'Nagoa Beach Road, Nagoa, Diu 362520',
  'https://maps.google.com/?q=Sea+Cafe+Patel+Nagoa+Beach+Diu',
  ARRAY[
    'https://www.tripadvisor.com/RestaurantsNear-g297601-d2534329-Nagoa_Beach-Diu_Diu_Island_Diu_District_Daman_and_Diu.html',
    'https://www.holidify.com/places/diu/restaurants-places-to-eat-local-cuisine.html'
  ]::text[],
  '2026-05-10'
),
(
  'diu',
  'Ocean Grill at Praveg Beach Resort',
  'Nagoa Beach',
  ARRAY['continental','seafood','indian']::text[],
  'mid_range',
  'Catch-of-the-day grill',
  ARRAY['Pomfret tawa fry','Prawn balchao','Sea-bass grill','Goan fish curry']::text[],
  '₹₹₹',
  '[700,1301)'::int4range,
  'mixed',
  true,
  'recommended',
  'smart-casual',
  'In-resort restaurant at Praveg Beach Resort Nagoa, the Gujarat-government-tied glamping property. Sea-facing deck, daily fish auction at Vanakbara delivers the morning catch. Used by non-resort guests as the only proper sit-down seafood dinner near Nagoa — the alternative is driving 8km back to Diu town.',
  'Reserve the deck table by phone same morning, not via OTA — front desk holds the cliff-edge two-tops for walk-ins. The set seafood platter is overpriced; order the catch-of-the-day grill weighed at table instead. They charge by the gram, transparent.',
  'Nagoa Beach Road, Nagoa, Diu 362520',
  'https://maps.google.com/?q=Praveg+Beach+Resort+Nagoa+Diu',
  ARRAY[
    'https://www.dizcoverpraveg.com/nagoabeach',
    'https://www.tripadvisor.com/RestaurantsNear-g297601-d2534329-Nagoa_Beach-Diu_Diu_Island_Diu_District_Daman_and_Diu.html'
  ]::text[],
  '2026-05-10'
);
