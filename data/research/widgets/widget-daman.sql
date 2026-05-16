-- Daman widget backfill — needs +1 eat (non-Devka, ideally heritage Moti Daman or Nani Daman fish-jetty zone)
-- Source-verified 2026-05-10. Existing 4 eats all sit at Devka Beach; this fills Moti Daman fort heritage gap.

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified
) VALUES (
  'daman',
  'The Backyard Cafe',
  'Moti Daman Fort',
  ARRAY['continental','fusion','coffee']::text[],
  'cafe',
  'Wood-fired pizza',
  ARRAY['Espresso','Wood-fired pizza','Pasta arrabbiata','Bombay sandwich']::text[],
  '₹₹',
  '[400,701)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Inside the Portuguese-era ramparts of Moti Daman fort, a few minutes from the Dominican Monastery ruins. The only sit-down cafe inside the heritage zone; everything else in fort area is takeaway snack stalls or hotel restaurants. Tripadvisor #5 of 40 in Daman, 4.3 rating.',
  'Sunset terrace fills 6:30-7:30pm — arrive by 6 to claim a fort-wall-facing seat. Coffee is the actual draw, not the food; pizza takes 25-30 min on weekend evenings. Cash works but UPI is faster than waiting for card-machine signal inside the fort walls.',
  'G-1, Radhe Radhe Apartment, Lane 1, near Ashok Dhanwani Hospital, Dilip Nagar, Daman 396210',
  'https://maps.google.com/?q=The+Backyard+Cafe+Daman',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297600-d20035292-Reviews-The_Backyard_Cafe-Daman_Daman_and_Diu.html',
    'https://www.facebook.com/TheBackyardCafe.Daman/'
  ]::text[],
  '2026-05-10'
);
