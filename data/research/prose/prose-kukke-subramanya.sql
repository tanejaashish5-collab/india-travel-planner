-- Kukke Subramanya destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S19 Karnataka batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: kukke-subramanya | best 10-3 | avoid 6-8 | type pilgrimage/temple/trekking

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kukke-subramanya', 1, 5, 'go',
  'Peak window. 16-28C dry. Sarpa Dosha rituals at full schedule. Kumara Parvatha trek dry, safe, 13km one-way.',
  'January is when Kukke Subramanya runs at its strongest. Daytime 18-28C, nights 16C, humidity 65 percent. Sarpa Dosha rituals (Ashlesha Bali, Sarpa Samskara, Nagaprathishta) at full daily schedule. Kumara Parvatha trek (1712m, 13km one-way) at year-clearest weather.',
  NULL,
  'Kukke Subramanya in January is the version pilgrim regulars and Western Ghats trekkers choose for the cool-temple-and-trail combination. Daytime 18-28C, nights 16C, humidity 65 percent. The Sri Subrahmanya Temple (one of the seven Mukti Sthalas of Karnataka, dedicated to Lord Subrahmanya/Kartikeya/Murugan — the deity invoked for Sarpa Dosha — snake-affliction — remedy rituals) at full daily schedule (6.30am-1pm/4-8.30pm). The Sarpa Dosha ritual cluster — Ashlesha Bali (performed on Ashlesha-nakshatra days), Sarpa Samskara (a full snake-image consecration and immersion ceremony), and Nagaprathishta — runs daily; advance booking through the temple devotee office at kukke.org or the on-site Sankalpa counter, ₹250-2,500 depending on ritual complexity. Adi Subramanya cave shrine 6km out (the original cave-temple site, where Skanda is believed to have hidden from demons per local Subrahmanya legend).'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kukke-subramanya', 2, 5, 'go',
  'Driest month. 18-29C. Kumara Parvatha trek at year-best. Sarpa Dosha rituals full schedule.',
  'February is the cleanest weather window. Rainfall under 5mm. Kumara Parvatha trek (1712m) at year-best for sustained dry-trail conditions. Sarpa Dosha rituals daily.',
  NULL,
  'Kukke Subramanya in February is the technical peak window for the temple-and-trek combination. Rainfall under 5mm, daytime 19-29C, nights 16C, humidity 60 percent — the lowest of the year. Sri Subrahmanya Temple (one of the seven Mukti Sthalas of Karnataka, dedicated to Lord Subrahmanya — Skanda/Kartikeya/Murugan, the deity invoked for Sarpa Dosha remedy rituals) at full daily darshan (6.30am-1pm/4-8.30pm). The Sarpa Dosha ritual cluster runs daily — Ashlesha Bali on Ashlesha-nakshatra days, Sarpa Samskara as a full snake-image consecration ceremony, Nagaprathishta. ₹250-2,500 depending on ritual complexity, advance booking through kukke.org or the on-site Sankalpa counter. Champa Shashti — the temple''s annual Skanda festival celebrating Subrahmanya''s victory over the demon Tarakasura — falls in November-December typically; outside that window February is the cleanest weather window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kukke-subramanya', 3, 4, 'go',
  'Last cool month. 20-31C, humidity 70 percent. Kumara Parvatha trek workable dawn-only. Rates 25 percent off February.',
  'March extends February''s pattern with humidity creep. Kumara Parvatha trek workable but heat past 28C from 10am brutal — dawn start critical. Sarpa Dosha rituals full schedule.',
  NULL,
  'Kukke Subramanya in March is the soft-landing month before pre-monsoon humidity. Daytime 21-31C, nights 18C, humidity climbing to 70 percent in the last fortnight, rainfall under 25mm. Sri Subrahmanya Temple (the Sarpa-Dosha pilgrimage anchor — the deity invoked for snake-affliction remedy rituals) holds full daily schedule (6.30am-1pm/4-8.30pm). The Sarpa Dosha ritual cluster — Ashlesha Bali, Sarpa Samskara, Nagaprathishta — daily; ₹250-2,500, booking through kukke.org. The Kumara Parvatha trek (1712m, 13km one-way through Pushpagiri Wildlife Sanctuary — one of South India''s toughest day-hikes, 3,500ft elevation gain, Karnataka Forest Department permit ₹250 plus registered guide ₹2,000-3,500) workable but the dawn-start window is critical — past 9am the shola-grassland sections lose shade and the climb past Bhattru Mane (mid-point) becomes brutal under 28C-plus sun. Dawn start 5.30am mandatory; expect to summit 11.30-12pm at latest, return by 5-6pm. Adi Subramanya cave shrine 6km out at year-cleanest weekday visitor load. Holi long weekend brings a 3-day domestic pilgrim bump.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kukke-subramanya', 4, 3, 'wait',
  'Pre-monsoon heat. 24-33C, humidity 78 percent. Kumara Parvatha trek brutal. Temple darshan dawn-and-dusk.',
  'April still works for darshan-and-ritual-only pilgrims. Kumara Parvatha trek possible but punishingly hot. Hotel rates 30 percent off February.',
  'April pushes Kukke Subramanya into pre-monsoon stress. Kumara Parvatha trek (1712m, 13km one-way) workable only on the dawn-and-summit-by-10am schedule, descent under 30C+ sun brutal. Wait for late October.',
  'April in Kukke Subramanya is when the temple-and-trek combination narrows. Daytime 25-33C, nights 23C, humidity 78 percent. Sri Subrahmanya Temple (one of the seven Mukti Sthalas of Karnataka, the Sarpa Dosha pilgrimage anchor — the deity invoked for snake-affliction remedy rituals) holds full daily schedule but pilgrim queues collapse 11am-3pm. The 6.30am Nirmalya darshan and 7.30pm Maha Mangalarati are the workable windows. The Sarpa Dosha ritual cluster — Ashlesha Bali, Sarpa Samskara, Nagaprathishta — continues daily inside the AC ritual halls. The Kumara Parvatha trek (1712m, 13km one-way, 3,500ft elevation gain, one of South India''s toughest day-hikes — Karnataka Forest Department permit ₹250 plus registered guide ₹2,000-3,500) possible only on the strict dawn-start-and-summit-by-10am schedule; the descent under 30C-plus sun is brutal. Trek registration office at the Forest Range office opens 5am for early start. Adi Subramanya cave shrine 6km out at 6.30-9am only. Vishu (April 14, Kerala spillover) brings a 2-3 day domestic pilgrim bump. Hotel rates 30 percent below February peak: temple-trust guesthouses ₹400-1000, Hotel Kukke Royale ₹1.4-2.2k, homestays ₹1-1.8k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kukke-subramanya', 5, 2, 'wait',
  'Peak pre-monsoon. 25-33C humidity 82 percent. Pre-monsoon thunderstorms. Kumara Parvatha trek closes mid-month.',
  'May functions only for ritual-anchored pilgrims. Kumara Parvatha trek closes mid-month as Forest Department prepares for monsoon closure. Hotel rates at year-low.',
  'May runs hot, sticky, with pre-monsoon thunderstorms hitting Kumara Parvatha trail. Forest Department closes the trek by mid-month for the Jun-Sep monsoon period. October-March is dramatically better for the temple-and-trek trip.',
  'May in Kukke Subramanya is the closing pre-monsoon month before the southwest current arrives around June 1. Daytime 26-33C, nights 24C, humidity 82 percent. Pre-monsoon thunderstorms hit the third and fourth weeks — afternoon squalls that knock grid power 1-2 hours daily. The Kumara Parvatha trek (1712m, 13km one-way through Pushpagiri Wildlife Sanctuary) closes by mid-month — Karnataka Forest Department''s standard practice closes the trek route for the southwest monsoon (June-September, sometimes extending into early October) for trekker safety on the wet laterite-and-shola sections that turn lethally slippery. Sri Subrahmanya Temple (the Sarpa Dosha pilgrimage anchor — Lord Subrahmanya/Kartikeya/Murugan, the deity invoked for snake-affliction remedy rituals) holds full daily schedule. The Sarpa Dosha rituals — Ashlesha Bali, Sarpa Samskara, Nagaprathishta (₹250-2,500, booking through kukke.org or the on-site Sankalpa counter) — continue inside the AC ritual halls. Adi Subramanya cave shrine 6km out workable only 6.30-9am. Hotel rates at year-low: temple-trust guesthouses ₹400-900, Hotel Kukke Royale ₹1.3-2k, homestays ₹900-1.6k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kukke-subramanya', 6, 1, 'skip',
  'SW monsoon onset. 20-26C, 1000-1200mm rainfall. Kumara Parvatha trek closed. Skip.',
  NULL,
  'June is when the southwest monsoon hits Kukke Subramanya with peak Western Ghats force. Rainfall 1000-1200mm, Kumara Parvatha trek closed by Forest Department, town roads landslide-watch. Temple operations continue but standard temple-plus-trek trip impossible. Skip.',
  'June in Kukke Subramanya is the southwest monsoon''s arrival point on the Western Ghats wet zone. The temple town sits at the foot of the Sahyadri rain-belt — annual rainfall over 5,000mm. Rainfall jumps to 1000-1200mm across 25-27 wet days. Daytime 21-26C feels mild but constant rain and 95 percent humidity strip outdoor activity. The Kumara Parvatha trek is closed for the monsoon (Karnataka Forest Department standard practice — June through September minimum, sometimes extending into early October depending on rainfall). Sri Subrahmanya Temple (one of the seven Mukti Sthalas of Karnataka, the Sarpa Dosha pilgrimage anchor) continues full daily operations — 6.30am-1pm/4-8.30pm darshan. The Sarpa Dosha ritual cluster — Ashlesha Bali, Sarpa Samskara, Nagaprathishta — runs inside the AC ritual halls regardless of weather (₹250-2,500, booking through kukke.org). Town roads (Mangalore-Kukke 110km via NH-275 + state roads) at peak landslide-watch — multiple cancellation events through the month. Adi Subramanya cave shrine 6km out closed to walking pilgrims on heavy-rain days.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kukke-subramanya', 7, 1, 'skip',
  'Peak monsoon. 20-25C, 1200-1500mm rainfall. Kumara Parvatha closed. Roads landslide-watch. Skip.',
  NULL,
  'July is the wettest month at Kukke Subramanya. Rainfall 1200-1500mm — among the wettest Western Ghats stations. Kumara Parvatha closed, roads landslide-watch, only temple-and-ritual indoor shape possible. Skip.',
  'July in Kukke Subramanya is the year''s wettest stretch. Rainfall 1200-1500mm across 27-29 wet days at the Western Ghats wet zone elevation — Kukke sits in the rain-shadow of Agumbe and the Pushpagiri shola-grassland, registering among Karnataka''s wettest July stations. Daytime 21-25C, humidity 96 percent. The Kumara Parvatha trek (1712m, 13km one-way) closed by Karnataka Forest Department for monsoon. Sri Subrahmanya Temple (the Sarpa Dosha pilgrimage anchor — Lord Subrahmanya/Kartikeya/Murugan, the deity invoked for snake-affliction remedy rituals — 6.30am-1pm/4-8.30pm darshan) holds full daily operations. The Sarpa Dosha ritual cluster — Ashlesha Bali (on Ashlesha-nakshatra days), Sarpa Samskara (full snake-image consecration), Nagaprathishta — runs inside AC ritual halls regardless of weather. ₹250-2,500, booking through kukke.org or the on-site Sankalpa counter. Mangalore-Kukke 110km drive (NH-275 + state roads) at peak landslide-watch — multiple cancellation events through the month, the Kemphole stretch (state road climbing into the Western Ghats wet zone) particularly prone. Adi Subramanya cave shrine 6km out closed to walking pilgrims.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kukke-subramanya', 8, 1, 'skip',
  'Monsoon continues. 20-26C, 900-1100mm rainfall. Kumara Parvatha closed. Skip.',
  NULL,
  'August holds July''s pattern. Kumara Parvatha closed, roads landslide-watch. Temple operations continue but standard trek-plus-temple trip impossible. Skip.',
  'August in Kukke Subramanya holds the July monsoon pattern with marginally fewer extreme-rain days. Rainfall 900-1100mm across 24-26 wet days. Daytime 21-26C feels mild but constant rain and 94 percent humidity strip outdoor activity. The Kumara Parvatha trek closed by Karnataka Forest Department through end-September minimum. Sri Subrahmanya Temple (one of the seven Mukti Sthalas of Karnataka, the Sarpa Dosha pilgrimage anchor) continues full daily operations — 6.30am-1pm/4-8.30pm darshan. The Sarpa Dosha ritual cluster — Ashlesha Bali, Sarpa Samskara, Nagaprathishta — runs inside the AC ritual halls regardless of weather. ₹250-2,500, booking through kukke.org. Mangalore-Kukke 110km drive (NH-275 + state roads) landslide-watch but cancellation events ease in the second half. Adi Subramanya cave shrine 6km out closed on heavy-rain days. The Karnataka government''s monsoon-tourism advisory keeps the Pushpagiri Wildlife Sanctuary perimeter closed. Hotel rates year-low: temple-trust guesthouses ₹400-900, Hotel Kukke Royale ₹1.4-2.1k, homestays ₹950-1.7k. The next clean window for the full temple-plus-trek shape is mid-October. Pilgrim-only visits remain workable.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kukke-subramanya', 9, 2, 'wait',
  'Monsoon retreat. 20-27C, 400-600mm rain. Kumara Parvatha still closed. Trek reopens October.',
  'September is the recovery month. SW monsoon retreats around Sep 25, roads stabilise. Kumara Parvatha trek typically reopens October 1-15. Late September workable for temple-only, but October is the proper restart.',
  'September is on the way back but Kumara Parvatha trek still closed by Forest Department, first fortnight roads still landslide-watch. Push to mid-October — same Western Ghats temple-plus-trek aesthetic at materially cleaner trail conditions.',
  'September in Kukke Subramanya is the trickle back from monsoon. Rainfall drops to 400-600mm across 18-20 wet days, mostly the first fortnight. Daytime 21-27C, humidity easing to 85 percent in the second half. The southwest monsoon retreats from the Karnataka Western Ghats around September 25-30 (IMD declares formal withdrawal). NH-275 Mangalore-Kukke 110km stabilises — landslide cancellation events drop to rare. The Kumara Parvatha trek (1712m, 13km one-way through Pushpagiri Wildlife Sanctuary) remains closed by Karnataka Forest Department through September; the standard reopening is October 1-15 depending on residual rainfall and trail-safety assessment by the Forest Range office. Sri Subrahmanya Temple (Sarpa Dosha pilgrimage anchor) at full daily operations — pilgrim flow recovering after monsoon. The Sarpa Dosha ritual cluster — Ashlesha Bali, Sarpa Samskara, Nagaprathishta — runs daily inside the ritual halls. ₹250-2,500, booking through kukke.org. Adi Subramanya cave shrine 6km out returns to walkable conditions from mid-month. Hotel rates climb 15-20 percent versus August lows: temple-trust guesthouses ₹500-1100, Hotel Kukke Royale ₹1.5-2.4k, homestays ₹1.1-1.9k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kukke-subramanya', 10, 4, 'go',
  'Season opens. 19-29C, 200-300mm spillover. Kumara Parvatha reopens mid-month. Pilgrim flow returning.',
  'October is the season opener. Late-monsoon residue first 10 days, then full temple-plus-trek mode. Kumara Parvatha trek typically reopens Oct 1-15. Hotel rates 25 percent below January.',
  NULL,
  'October in Kukke Subramanya is the proper return to coherent. Rainfall drops to 200-300mm with the bulk falling in the first ten days; from October 15 onward Kukke flips into clean temple-plus-trek mode. Daytime 20-29C, nights 18C, humidity falling from 85 to 75 percent. The Kumara Parvatha trek (1712m, 13km one-way through Pushpagiri Wildlife Sanctuary shola-grassland, 3,500ft elevation gain — one of South India''s toughest day-hikes) typically reopens between October 1 and October 15 based on Karnataka Forest Department''s trail-safety assessment. Once reopened, the trek runs at year-greenest post-monsoon visibility — the shola-grassland in flush. Forest Department permit ₹250 plus registered guide ₹2,000-3,500, dawn start mandatory. Sri Subrahmanya Temple (one of the seven Mukti Sthalas of Karnataka, the Sarpa Dosha pilgrimage anchor — Lord Subrahmanya/Kartikeya/Murugan, the deity invoked for snake-affliction remedy rituals) at recovering full pilgrim flow. The Sarpa Dosha ritual cluster — Ashlesha Bali, Sarpa Samskara, Nagaprathishta — daily, ₹250-2,500, booking through kukke.org. Adi Subramanya cave shrine 6km out at full operations.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kukke-subramanya', 11, 5, 'go',
  'Peak builds. 17-28C, rainfall under 70mm. Champa Shashti festival 6-day cluster. Rates climb 20 percent.',
  'November is the proper pivot to peak. Champa Shashti (the temple''s annual festival commemorating Skanda''s victory over Tarakasura — 6-day cluster, variable Nov-Dec date — verify against lunar calendar) brings 50,000-100,000 pilgrims. Trek at year-greenest.',
  NULL,
  'November in Kukke Subramanya is the year''s second-peak window with the Champa Shashti festival. Rainfall drops under 70mm, daytime 18-28C, nights 16C, humidity dropping below 70 percent. The defining annual event is Champa Shashti — the temple''s 6-day festival commemorating Lord Subrahmanya''s victory over the demon Tarakasura. The festival falls on Margashirsha Shukla Shashti (typically late November or early December — 2026 verify against the lunar calendar). 50,000-100,000 pilgrims attend the 6-day festival. The procession on the final day, Madhuvana Mahotsava, brings the year''s largest single-day pilgrim crowd at the temple. Special all-night darshan windows. Sri Subrahmanya Temple (one of the seven Mukti Sthalas of Karnataka — 6.30am-1pm/4-8.30pm darshan, extended through Champa Shashti) at peak operational tempo. The Sarpa Dosha ritual cluster — Ashlesha Bali, Sarpa Samskara, Nagaprathishta — daily, but Champa Shashti-week bookings tight (₹250-2,500, kukke.org or on-site Sankalpa counter, advance 4-6 weeks for festival days). The Kumara Parvatha trek (1712m, 13km one-way) at year-greenest post-monsoon visibility.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kukke-subramanya', 12, 5, 'go',
  'Peak season. 16-27C dry. Champa Shashti tail. Kumara Parvatha at year-cleanest. Lock beds 4-6 weeks ahead.',
  'December is when Kukke Subramanya runs at full capacity. Champa Shashti tail (the festival often extends into early Dec depending on lunar calendar). Kumara Parvatha trek at year-cleanest. Sarpa Dosha rituals daily. Lock beds 4-6 weeks ahead.',
  NULL,
  'December in Kukke Subramanya is the operational peak for the temple-plus-trek combination. Daytime 17-27C, nights 16C, rainfall under 30mm. The Champa Shashti tail (the temple''s 6-day festival around Margashirsha Shukla Shashti — verify exact 2026 date, the festival often extends into early December depending on lunar calendar) keeps pilgrim flow elevated through the first 10 days. Sri Subrahmanya Temple (one of the seven Mukti Sthalas of Karnataka, the Sarpa Dosha pilgrimage anchor — Lord Subrahmanya/Kartikeya/Murugan, the deity invoked for snake-affliction remedy rituals) at year-busiest pilgrim flow ahead of January peak. 6.30am-1pm/4-8.30pm darshan windows; men remove upper garments to enter sanctum. The Sarpa Dosha ritual cluster — Ashlesha Bali on Ashlesha-nakshatra days, Sarpa Samskara as full snake-image consecration ceremony, Nagaprathishta — daily, ₹250-2,500, booking through kukke.org. The Kumara Parvatha trek (1712m, 13km one-way through Pushpagiri Wildlife Sanctuary — one of South India''s toughest day-hikes, 3,500ft elevation gain, Karnataka Forest Department permit ₹250 plus registered guide ₹2,000-3,500, dawn start mandatory) at year-cleanest weather.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
