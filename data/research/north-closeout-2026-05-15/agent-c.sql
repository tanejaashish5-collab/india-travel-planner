-- Agent C — Punjab Damdama + J&K/Ladakh HS audit 2026-05-15
-- Scope: damdama-sahib (+3 eats), sinthan-top (HS confirm), bangus-valley (HS confirm + dupe),
--        tosamaidan (data debt audit), umlingla (data debt audit)
-- APPLIED 2026-05-15

INSERT INTO local_eateries (
  destination_id, name, area, category, cuisine, signature_dish, must_try,
  price_range, price_per_head_inr, why_it_matters, insider_tip,
  signature_address, source_urls, vegetarian, is_legendary, established_year
) VALUES
  ('damdama-sahib','Guru Ka Langar (Takht Sri Damdama Sahib)','Takht Sri Damdama Sahib Complex, Talwandi Sabo','casual',ARRAY['Punjabi','Sikh Langar'],'Daal, sabzi, roti, kheer — community-cooked rotation',ARRAY['Daal','Roti','Sabzi','Kheer'],'₹',int4range(0, 1),'Free 24-hour community kitchen at the 5th Takht of Sikhism (1706).','Cover head; sit pangat; carry thali to wash.','Takht Sri Damdama Sahib, Talwandi Sabo, Bathinda 151302',ARRAY['https://en.wikipedia.org/wiki/Takht_Sri_Damdama_Sahib'],'pure-veg',true,1706),
  ('damdama-sahib','Amrik Dhaba','Mehna Chowk, Bathinda (28 km)','casual',ARRAY['Punjabi','Tandoori'],'Daal makhani with malai paratha',ARRAY['Daal makhani','Paneer makhani'],'₹',int4range(150, 401),'Bathinda pure-veg dhaba on the Damdama-Bathinda taxi loop.','Morning paratha 8-11am; white butter.','Mehna Chowk, Bathinda 151001',ARRAY['https://www.tripadvisor.com/Restaurant_Review-g1023971-d5017910-Reviews-Amrik_da_Dhaba-Bathinda_Bathindar_District_Punjab.html'],'pure-veg',false,NULL),
  ('damdama-sahib','Pappu Dhaba (Pappu Vaishno Dhaba)','Railway Road, Bathinda (28 km)','casual',ARRAY['Punjabi'],'Daal makhani with butter naan',ARRAY['Daal makhani','Malai kofta'],'₹',int4range(150, 401),'Railway Road dhaba 700m from Bathinda Junction — train pilgrim stop.','Say "Pappu Dhaba near station"; two Pappus in city.','Railway Road, Bathinda 151001',ARRAY['https://www.tripadvisor.in/Restaurant_Review-g1023971-d4105117-Reviews-Pappu_Dhaba-Bathinda_Bathindar_District_Punjab.html'],'pure-veg',false,NULL);

-- HS CONFIRM: sinthan-top, bangus-valley
-- DATA DEBT DROPS (4 tosamaidan + 4 umlingla + 1 bangus dupe = 9 rows) applied via DELETE statements
-- Then 2 REAL tosamaidan stays inserted (HangulHut Heritage + Kastoorwan Cottage by Homeyhuts)

-- DELETE FROM destination_stay_picks WHERE destination_id = 'tosamaidan' AND name IN (...);
-- DELETE FROM destination_stay_picks WHERE destination_id = 'umlingla' AND name IN (...);
-- DELETE FROM destination_stay_picks WHERE destination_id = 'bangus-valley' AND slot = 'value';
-- INSERT INTO destination_stay_picks tosamaidan x2 (HangulHut + Kastoorwan);
