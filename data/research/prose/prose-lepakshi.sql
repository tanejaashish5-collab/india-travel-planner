-- Lepakshi destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S21 Andhra Pradesh batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: lepakshi

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'lepakshi', 1, 5, 'go',
  'Peak Rayalaseema window. 17-28C, dry. Veerabhadra Temple fresco ceiling at full clarity. Hanging Pillar inspection.',
  'January is when Lepakshi runs at year-best. Daytime 26-28C, nights 17-19C, sub-15mm rain. Veerabhadra Temple (1530s, Vijayanagara) — the Hanging Pillar, Pancha Maha Yantra fresco ceiling, monolithic Nandi (4.5m × 8m, India''s largest) — at full inspection comfort. Sankranti Jan 14-16.',
  NULL,
  'Lepakshi in January is the version Vijayanagara-art scholars book first. Daytime 26-28C, nights 17-19C, rainfall under 15mm, humidity at 55 percent — Rayalaseema''s semi-arid winter sits dramatically drier and cooler than the AP coast. The Veerabhadra Temple — built circa 1530s during the Vijayanagara reign of Achyuta Deva Raya by the temple-treasurer brothers Virupanna and Veeranna (legend places construction during a single night though structural reality required years) — runs at full ritual hours 5:30am-1pm and 4pm-9pm. The Hanging Pillar (the 70-pillar Kalyana Mandapa''s southwest corner pillar that does not touch the ground — visible gap between pillar base and floor, conservators allow thin cloth or paper-pass demonstration at peak visitor times) at full inspection comfort. The Pancha Maha Yantra fresco ceiling of the main mandapa — the finest surviving Vijayanagara mural cycle, panels of Shiva-Parvati wedding, the gana wedding processions, Veerabhadra avatars — visible cleanly under January morning light. Hotel options thin in Lepakshi village — most travelers day-trip from Bengaluru (130km, 3 hours) or Anantapur (105km, 2.5 hours).'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'lepakshi', 2, 5, 'go',
  'Driest stretch. 18-30C. Fresco ceiling at peak light. Hanging Pillar pass-cloth demo through afternoon.',
  'February holds January cleanliness. Rainfall under 10mm, daytime 28-30C, nights 18-20C. Veerabhadra Temple frescoes at peak light. Hanging Pillar inspection works through afternoon. Hotel rates ease 15 percent off January.',
  NULL,
  'February in Lepakshi is the technical peak for Vijayanagara art viewing. Rainfall under 10mm, daytime 28-30C, nights 18-20C, humidity at 50 percent — the lowest of the year on the Rayalaseema plateau. The Pancha Maha Yantra fresco ceiling of the Veerabhadra Temple mandapa — the finest surviving Vijayanagara mural cycle in India, executed in mineral pigments on lime-plaster — visible at year-peak clarity. ASI conservators time their inspection windows for late-February to early-March when both the temperature and the dryness optimise photographic and academic documentation work. The Hanging Pillar — Kalyana Mandapa southwest corner — at full inspection comfort, conservators permit the thin-cloth pass demonstration during peak visitor afternoons. The monolithic Nandi (4.5m × 8m, India''s largest) at year-peak photographic light through the afternoon. Naga Linga and Sita''s Footprint accessible. Veerabhadra Temple full ritual hours; the Hanuman Jayanti and Veerabhadra Festival cluster typically falls March-April but February still brings regional pilgrim traffic. Madhavaraya Heritage Resort and Lepakshi Tourist Lodge (basic, ₹1,200-2,000) the local options.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'lepakshi', 3, 4, 'go',
  'Last cool month. 21-33C. Veerabhadra & Hanuman Jayanti festival cluster. Heat builds last fortnight.',
  'March brings the Veerabhadra and Hanuman Jayanti festival cluster (typically Mar-Apr). Heat builds last fortnight — Rayalaseema runs hotter than the AP coast. Veerabhadra Temple full ritual hours. Frescoes still clear under cooler morning light.',
  NULL,
  'March in Lepakshi is the transition month carrying the Veerabhadra Festival and Hanuman Jayanti cluster. Daytime 31-33C, nights 21-22C, humidity climbing to 55 percent, rainfall under 15mm. The Veerabhadra Festival and Hanuman Jayanti (typically falls March-April on Telugu lunar calendar — verify 2026 panchang) bring regional pilgrim traffic from Andhra and Karnataka through the cluster; the temple''s annual chariot procession and the special-occasion rituals at the main shrine elevate the visitor density above the normal February-November flow. The Pancha Maha Yantra fresco ceiling visible cleanly under March morning light — the cooler-light hours (6-9am and 5-7pm) the best photography slots before the granite-floor heat retention through midday. The Hanging Pillar inspection at peak comfort. The monolithic Nandi (4.5m × 8m) and Naga Linga at full photographic access. Sita''s Footprint walkable. The Rayalaseema heat builds through the last fortnight — March 25 onward Daytime regularly crosses 33C and outdoor work compresses to 6-10am and 5-8pm. Last clean-value window before April heat.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'lepakshi', 4, 2, 'wait',
  'Rayalaseema heat builds. 24-37C, humidity 50 percent. Hanuman Jayanti tail. Outdoor walks dawn-only.',
  'April pushes the trip into Rayalaseema heat. Outdoor walks 10am-5pm unsafe. Hanuman Jayanti tail in early April. Veerabhadra Temple inner sanctum (semi-shaded) viable mornings only. Wait for October.',
  'April pushes Lepakshi into Rayalaseema heat dome. Daytime 35-37C, the temple precinct granite floors retain heat through afternoon. Outdoor walks impossible 10am-5pm. October is dramatically better.',
  'April in Lepakshi is the start of the Rayalaseema heat dome. Daytime 35-37C, nights 24-25C, humidity 50 percent (low absolute humidity but high temperature — Rayalaseema runs hot and dry, the inverse of the coastal AP humidity pattern). The Pancha Maha Yantra fresco-viewing window narrows to 5:30-9am and 5-7pm — outside this, the temple courtyard granite floors retain heat past 50C surface temperature, making barefoot temple entry (required) painful. The Hanging Pillar and monolithic Nandi visits compress to dawn only. Veerabhadra Temple inner sanctum and the main mandapa stay partially shaded but the outer pradakshina circuit through the natural-rock outcrops becomes unsafe. Hanuman Jayanti tail typically falls in early-to-mid April — regional pilgrim traffic continues but in compressed time windows. Sita''s Footprint and Naga Linga (open-rock access) close to noon visits. Hotel rates ease 25 percent off February: Bengaluru base options ₹3-5k, local Lepakshi lodges ₹800-1,400. The October-March window is dramatically better. Most heritage travelers reschedule April plans to October-February.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'lepakshi', 5, 1, 'skip',
  'Peak Rayalaseema heat. 26-39C, humidity 45 percent. Pre-monsoon thunderstorms. Outdoor walks impossible.',
  NULL,
  'May is the Rayalaseema heat dome peak. Daytime 37-39C, occasionally 40-42C. The temple precinct granite floors at 55C surface — barefoot entry dangerous. Outdoor walks impossible 8am-7pm. Skip — push to October.',
  'May in Lepakshi is the brutal Rayalaseema heat. Daytime 37-39C, occasional 40-42C peaks the second-third week, nights 26-27C, humidity 45 percent. The semi-arid Rayalaseema plateau runs at year-extreme — Anantapur district consistently records 41-44C peaks in May, and Lepakshi (in the southernmost edge of Anantapur near the Karnataka border) is no exception. Pre-monsoon thunderstorms hit the third and fourth week — short violent squalls that drop temperatures 4-5 degrees temporarily but with high winds and dust storms. The Veerabhadra Temple precinct granite floors at 55C surface temperature through midday — barefoot entry (required) becomes painful within seconds. The Hanging Pillar, monolithic Nandi, Naga Linga, Sita''s Footprint all close to comfortable visits except 5:30-7:30am and 7:30-8:30pm. The fresco ceiling of the main mandapa stays cooler (partially-shaded high-roof) but the visitor approach through the temple courtyard becomes the challenge. ASI conservation works pause for the month. The trip you came for — frescoes, Hanging Pillar inspection, monolithic Nandi, temple-precinct walks — is functionally closed.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'lepakshi', 6, 2, 'wait',
  'SW monsoon arrives light. 24-34C, 80-120mm. Rayalaseema rain-shadow — lighter than coast. Walks return last week.',
  'June is the SW monsoon arrival on the Rayalaseema plateau. Lepakshi sits in the rain-shadow of the Western Ghats — rainfall 80-120mm (vs Kerala''s 600+ same month). Outdoor walks return cleaner the last week. Veerabhadra darshan continues.',
  'June is the lighter SW monsoon on Rayalaseema. Some rain but Lepakshi sits in the rain-shadow — much drier than the coast. Walks possible in clear windows. October is still the cleaner trip.',
  'June in Lepakshi is the southwest monsoon arrival on the Rayalaseema plateau but the rain-shadow geography keeps rainfall significantly lighter than the AP coast. The semi-arid Rayalaseema region (Anantapur, Kurnool, Kadapa districts) sits in the rain-shadow of the Western Ghats — the SW monsoon clouds drop most moisture on Karnataka''s Western Ghats slope before reaching the eastern plateau. Lepakshi gets 80-120mm rainfall across June (vs Kerala''s 600-700mm same month). Daytime 31-34C, nights 24-25C, humidity climbing to 65 percent — meaningfully cooler than May but not yet October-clean. Outdoor walks return cleaner the last week as ground stays mostly dry. Veerabhadra Temple darshan continues full hours. The Hanging Pillar, monolithic Nandi and Pancha Maha Yantra frescoes accessible in clear windows. ASI conservation work returns mid-month. Hotel rates at low-season: Bengaluru base ₹3-4.5k, local Lepakshi lodges ₹600-1,200. The October-March window remains dramatically better. June functions for tolerance-builders willing to accept partial walking weather.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'lepakshi', 7, 2, 'wait',
  'SW monsoon. 23-31C, 100-150mm. Rayalaseema light rain. Walks possible in clear windows. Cool by Rayalaseema standards.',
  'July is the wettest stretch for Rayalaseema — but only 100-150mm vs the coast''s 700mm. Daytime 28-31C, the coolest stretch of the year. Walks possible in clear windows. Temple full hours.',
  'July is light monsoon on Rayalaseema. Cooler temps but unpredictable rain windows. October is the cleaner shape. Hotel rates at year-low but the trip shape collapses.',
  'July in Lepakshi is the wettest stretch for the Rayalaseema plateau but light by national-monsoon standards. Rainfall 100-150mm across 12-14 wet days (vs Kerala/coastal-AP 300+). Daytime 28-31C, nights 23-24C, humidity 70 percent — the coolest stretch of the year. The rain-shadow protection of the Western Ghats keeps the moisture lighter and the rain windows more intermittent than coastal patterns. Outdoor walks possible in clear 4-6 hour windows. Veerabhadra Temple darshan continues full hours. The Pancha Maha Yantra fresco ceiling viewing slightly affected by humidity in the mandapa during sustained wet stretches — ASI conservation work focuses on humidity-control through the month. The Hanging Pillar and monolithic Nandi accessible. Hotel rates at low-season: Bengaluru base ₹3-4.5k, local Lepakshi lodges ₹600-1,200. The October-March window remains dramatically better for the full heritage circuit. July works for those who want quieter visitor density at the temple — most visitor traffic shifts to October-March cycle.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'lepakshi', 8, 2, 'wait',
  'Late SW monsoon. 24-31C, 100-150mm. Light rain windows. Janmashtami nearby. Cool by season standards.',
  'August holds July''s pattern. 100-150mm rain. Cool by Rayalaseema standards. Walks possible in clear windows. October is the cleaner shape.',
  'August is light monsoon continuation. Cooler than April-May but unpredictable rain. October is materially cleaner. Hotel rates at year-low but the trip shape collapses.',
  'August in Lepakshi holds July''s rain-shadow monsoon pattern. Rainfall 100-150mm across 12-14 wet days, daytime 29-31C, nights 24-25C, humidity 72 percent. The Rayalaseema plateau stays meaningfully cooler and drier than the coastal AP — Lepakshi sits at ~580m elevation in the Karnataka-AP border which gives an additional 2-3C cooler base versus the coast. Outdoor walks possible in clear 4-6 hour windows. Veerabhadra Temple darshan continues full hours. The Pancha Maha Yantra fresco ceiling viewing in stable-weather days through the month. Krishna Janmashtami (typically mid-to-late August) brings regional pilgrim traffic to the broader Andhra-Karnataka temple circuit; Lepakshi sees some Janmashtami overlap traffic but Krishna temples in Vijayawada and Tirupati hold the main draw. Hotel rates at low-season: Bengaluru base ₹3-4.5k, local Lepakshi lodges ₹600-1,200. The October-March window remains dramatically better. August works for academic visits and quiet-traffic temple appreciation when the visitor density drops below year-average.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'lepakshi', 9, 3, 'go',
  'SW monsoon retreat. 22-30C, 80-120mm. Veerabhadra Festival run-up. Walks return mid-month.',
  'September is the late-monsoon transition. Rain eases through the second half. Outdoor walks return mid-month. Veerabhadra Festival run-up — regional pilgrim traffic builds. Hotel rates 20 percent above August low.',
  NULL,
  'September in Lepakshi is the recovery month. Rainfall 80-120mm across 10-12 wet days, daytime 28-30C, nights 22-23C, humidity 70 percent dropping through the month. The southwest monsoon retreats from Rayalaseema around September 25-30. Outdoor walks return cleanly through the second half as the rain-shadow plateau dries out. Veerabhadra Temple darshan at full ritual hours. The Pancha Maha Yantra fresco ceiling viewing returns to year-peak clarity through the second half. The Hanging Pillar inspection comfortable. The monolithic Nandi (4.5m × 8m) photographable through the afternoon as temperatures stay below 30C. The Veerabhadra Festival (chitra-purnima cluster in Telugu lunar calendar — verify 2026 panchang) run-up brings regional pilgrim traffic through the late second half. Hotel rates climb 20 percent versus August lows: Bengaluru base ₹4-6k, local Lepakshi lodges ₹800-1,400. Cycle call — a 2-day Lepakshi visit late September works for monsoon-tolerant heritage travelers, with October-March being the dramatically cleaner peak window for first-time visits.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'lepakshi', 10, 4, 'go',
  'Season opens. 20-29C. Rayalaseema clear weather. Frescoes at peak. Karthika run-up.',
  'October is the proper season opener for the Rayalaseema heritage trip. Daytime 27-29C, sub-50mm rain through the second half. Veerabhadra Temple at full schedule. Pancha Maha Yantra frescoes at year-peak clarity. Rates 25 percent below January.',
  NULL,
  'October in Lepakshi is the proper return to coherent. Rainfall drops to 50-80mm with the bulk falling in the first ten days; from October 15 onward the Rayalaseema plateau flips into clean heritage-walk mode. Daytime 27-29C, nights 20-21C, humidity falling from 70 to 55 percent. The Rayalaseema rain-shadow keeps October among the most reliable months in India for clear-weather heritage viewing. Veerabhadra Temple at full ritual hours. The Pancha Maha Yantra fresco ceiling at year-peak clarity — ASI conservation documentation prefers October-November for the optimal balance of weather, humidity and visitor density. The Hanging Pillar inspection at peak comfort. The monolithic Nandi (4.5m × 8m, India''s largest) at year-peak photographic light. Naga Linga and Sita''s Footprint at full walking access. Karthika Masam run-up through the last week — the November Karthika Pournami deepam cluster begins to draw pilgrim traffic. Hotel rates run 25-30 percent below January peak in Bengaluru base: SAB-area hotels ₹4-7k mid-bracket. Local Lepakshi lodges ₹1,000-1,800. Strong call for first-time visitors who want full heritage circuit minus December-January peak crunch.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'lepakshi', 11, 5, 'go',
  'Peak window opens. 19-28C, sub-25mm rain. Karthika Pournami deepam lighting at Veerabhadra mid-month.',
  'November is the year''s second-peak month. Rainfall under 25mm. Veerabhadra Temple at full schedule. Karthika Pournami mid-month brings mass deepam lighting across the temple precinct — thousands of oil lamps. Hotel rates 25 percent below December-January.',
  NULL,
  'November in Lepakshi is the year''s second-peak month behind January. Rainfall under 25mm, daytime 26-28C, nights 19-20C, humidity dropping below 55 percent — peak Rayalaseema clarity. Karthika Masam (mid-November to mid-December) brings mass deepam (oil-lamp) lighting at Shiva temples across South India; Karthika Pournami (full moon, mid-month) is the year''s biggest temple-lighting night at Veerabhadra — thousands of oil lamps line the courtyard, the Kalyana Mandapa with the Hanging Pillar, the path to the monolithic Nandi, and the natural-rock outcrops around the temple precinct. The Pancha Maha Yantra fresco ceiling at year-peak clarity through the day. The Hanging Pillar, monolithic Nandi, Naga Linga, Sita''s Footprint all at full access. Veerabhadra Temple at full ritual hours. Hotel rates climb to 80 percent of January peak in Bengaluru base: SAB-area hotels ₹5-8k mid-bracket. Local Lepakshi lodges ₹1,200-2,000. Strong call for first-time visitors — full heritage circuit, peak weather, lower visitor density than the December-January peak. Day-trip from Bengaluru (130km, 3 hours via NH-44) works as a 7am-7pm shape.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES (
  'lepakshi', 12, 5, 'go',
  'Peak season. 17-27C, dry. Christmas-NYE rates 1.5-2x in Bengaluru base. Karthika tail.',
  'December is when Lepakshi runs at full capacity. Rainfall under 15mm, daytime 25-27C — among the coolest months. Karthika Pournami tail through first week. Christmas-NYE corridor rates 1.5-2x in Bengaluru base hotels.',
  NULL,
  'December in Lepakshi is the operational peak for Vijayanagara art viewing. Daytime 25-27C, nights 17-18C, rainfall under 15mm — the year''s coolest and driest stretch on the Rayalaseema plateau. Veerabhadra Temple (1530s Vijayanagara — built by Virupanna and Veeranna brothers per legend in service of Achyuta Deva Raya) at peak ritual hours. The Pancha Maha Yantra fresco ceiling at peak clarity under the December morning low-angle light. The Hanging Pillar (Kalyana Mandapa southwest corner — visible gap between pillar base and floor, conservators permit the cloth-pass demonstration during peak afternoons) at peak inspection comfort. The monolithic Nandi (4.5m × 8m, India''s largest single-stone Nandi) at year-peak photographic light through the afternoon. Naga Linga (5-hooded single-rock Shivlinga, 5m tall) at full walking access. Sita''s Footprint sacred depression accessible. Karthika Masam tail through the first week brings continued deepam lighting at temple precincts. The first three weeks of December are the better-value window — peak weather minus peak Bengaluru-base chaos.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
