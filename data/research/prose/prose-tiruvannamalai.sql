-- Tiruvannamalai destination_months prose — 12 month-rows
-- Generated 2026-05-11 — S17 Tamil Nadu batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: tiruvannamalai

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tiruvannamalai', 1, 5, 'go',
  'Peak window. 19-30C. Pongal cluster + post-Karthigai pilgrim tail. Girivalam full-moon walks year-best.',
  'January is when Tiruvannamalai runs at peak. NE monsoon retreated, daytime 27-30C, sub-40mm rain. Girivalam (full-moon 14km barefoot circumambulation of Arunachala) at year-best comfort. Ramana Maharshi Ashram + Yogi Ramsuratkumar Ashram + Seshadri Swamigal Ashram all peak.',
  NULL,
  'Tiruvannamalai in January is the year''s peak window. The town — built around the 5km-base Arunachala mountain (882m summit) at the southern foot of the Eastern Ghats foothills 185km southwest of Chennai — sits in the dry inland plains. Daytime 27-30C, nights 19-20C, humidity 60 percent, rainfall under 40mm. The Arunachala Temple — one of the five Pancha Bhoota Stalams (Arunachala = fire-element, paired with Chidambaram = space, Jambukeswaram = water, Kalahasti = wind, Kanchipuram = earth) and the 10th largest temple complex in India by footprint — at full ritual tempo. The 14km **Girivalam** (the barefoot full-moon circumambulation around the Arunachala hill) at year-best comfort; the route is the most-walked spiritual circuit in Tamil Nadu outside Madurai. The Ramana Maharshi Ashram (Sri Ramanasramam — where Ramana Maharshi lived 1922-1950 and whose samadhi shrine receives ~3,000 daily visitors) at full programme. The Yogi Ramsuratkumar Ashram and the Sri Seshadri Swamigal Ashram — both major ashrams clustered around the temple''s north-side approach — at full operations.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tiruvannamalai', 2, 5, 'go',
  'Driest month. 20-32C. Girivalam + ashram programmes at year-cleanest. International seekers arrive.',
  'February is the technical peak. Rainfall under 20mm, daytime 28-32C. Girivalam full-moon at year-cleanest. International spiritual-seeker arrivals climb — Ramana Maharshi diaspora globally returns for Feb-Mar.',
  NULL,
  'February in Tiruvannamalai is the dry-quarter technical peak. Rainfall under 20mm, daytime 28-32C, nights 20-21C, humidity 58 percent. The Arunachala Temple at full Pancha Bhoota Stalam fire-element ritual tempo. The 14km Girivalam barefoot circumambulation at year-cleanest pre-dawn comfort — the full-moon Pournami draws 5-10 lakh pilgrims on the night; weekdays around the hill see steady 5,000-10,000 walking the circuit. The Skandashramam and Virupaksha cave trail (Ramana''s 1899-1916 meditation sites, the halfway-up Arunachala mountain trail) at year-best hiking weather. The Ramana Maharshi Ashram at peak programme: 5:15am Vedaparayana, the meditation hall at 6:30am, ashram-bookstore-and-library running 8am-6pm, the samadhi-shrine puja sequences at 5pm-6pm. International spiritual-seekers (the global Ramana Maharshi community — substantial diaspora in Europe, the US, Australia, Israel) arrive in significant numbers Feb-Mar. The Yogi Ramsuratkumar Ashram and Sri Seshadri Swamigal Ashram run their full devotional schedules.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tiruvannamalai', 3, 4, 'go',
  'Last cool month. 22-35C. Girivalam compresses to night-walks. Ashram-stay rates ease 20 percent.',
  'March extends February''s pattern. Daytime climbs past 33C the last fortnight. Girivalam viable as a pre-dawn (3-7am) or night (8pm-1am) walk. Ashram-stay rates ease 20 percent — last value window before April heat.',
  NULL,
  'March in Tiruvannamalai is the transition month. Daytime 32-35C, nights 22-24C, humidity 65 percent, rainfall under 40mm. The Arunachala Temple at full Pancha Bhoota Stalam fire-element ritual tempo. The 14km Girivalam compresses to a pre-dawn (3-7am) or full-night (8pm-1am) walk; the full-moon Pournami still draws massive crowds but the daytime hours are unworkable for barefoot circumambulation in 35C heat. The Skandashramam and Virupaksha cave trail to halfway up Arunachala mountain works 5:30-9am for the climb up, descent by 11am. The Ramana Maharshi Ashram at full programme; international spiritual-seekers continue at peak through March (the global Ramana community has March as one of the two peak return months alongside February). The Yogi Ramsuratkumar Ashram and Sri Seshadri Swamigal Ashram at full operations. Hotel rates ease 20 percent off February: Sparsa Resort ₹3-4,500, Ramana Towers ₹2-3,500, ashram homestays ₹700-1,200, the Ramana Maharshi Ashram guest house at ₹500-1,500 (book 3-4 weeks ahead). Last value window before April pushes the Girivalam, Skandashramam climb, and outdoor ashram circulation past comfort.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tiruvannamalai', 4, 2, 'wait',
  'Heat dome. 25-38C. Girivalam barefoot-impossible mid-day. Wait for October.',
  'April pushes Tiruvannamalai past Girivalam viability. Daytime 36-38C, road surface 44-46C, the barefoot 14km circumambulation becomes hazardous. Skandashramam climb endurance-only. Wait for October.',
  'April in Tiruvannamalai is the inland-plains heat dome. The 14km Girivalam barefoot walk — the trip-defining experience — becomes hazardous (road surface 44-46C). Skandashramam-Virupaksha climb endurance-only. October opens the proper window.',
  'April in Tiruvannamalai is the pre-monsoon heat dome. Daytime 36-38C, nights 25-26C, humidity 65 percent, rainfall under 30mm. The Arunachala Temple''s outer prakaram and Inner Sanctum at full ritual tempo (interior). The 14km Girivalam barefoot circumambulation — the trip''s defining spiritual practice — becomes hazardous: road surface temperature hits 44-46C noon-4pm, and even pre-dawn (4-7am) walks see the road retain 28-30C surface heat from the previous afternoon. The full-moon Pournami still draws devotee crowds despite the heat — many pilgrims now wear thin footwear instead of strict barefoot, a practical accommodation. The Skandashramam and Virupaksha cave climb (3km each way up the Arunachala mountain trail) workable only 5:30-8am — the rocky exposed-stone trail holds 40-42C surface heat by 9am. The Ramana Maharshi Ashram at full programme but international spiritual-seekers thin sharply — the global Ramana community avoids April-June. The Yogi Ramsuratkumar Ashram and Sri Seshadri Swamigal Ashram continue but at thin attendance. Hotel rates at year-low: Sparsa Resort ₹2,500-4k, Ramana Towers ₹1,800-3k, ashram homestays ₹500-900. Wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tiruvannamalai', 5, 2, 'wait',
  'Heat peak. 26-40C. Girivalam impossible. Hotels at year-low.',
  'May is the heat dome peak. Daytime 38-40C, road surface 48-50C, the Girivalam barefoot circumambulation impossible. Skandashramam climb impossible. October opens the proper window.',
  'May in Tiruvannamalai pushes past spiritual-pilgrimage viability. The 14km Girivalam barefoot walk — the trip — cannot happen at 38-40C with road surface 48-50C. Skandashramam-Virupaksha climb impossible. October opens the proper window.',
  'May in Tiruvannamalai is the inland-plains heat peak. Daytime 38-40C, nights 26-27C, humidity 65 percent, rainfall under 50mm but mostly as short pre-monsoon thunderstorm bursts that don''t cool the road or rock surfaces. The Arunachala Temple''s inner sanctum at full Pancha Bhoota Stalam fire-element ritual tempo (and notably, the fire-element resonance feels apt this month). The 14km Girivalam barefoot circumambulation — the trip-defining spiritual practice — is impossible at this temperature: road surface 48-50C, even pre-dawn (3-7am) walks see significant heat retention. Devotees on Pournami nights use full footwear or postpone. The Skandashramam and Virupaksha cave climb (3km up the Arunachala mountain trail) impossible — the rocky exposed-stone trail surface hits 50C+ by 8am. The Ramana Maharshi Ashram at full programme; the air-conditioned hall and the samadhi-shrine interior offer mid-day retreat. International spiritual-seekers near-zero May-August. Hotel rates at year-low: Sparsa Resort ₹2-3,500, Ramana Towers ₹1,500-2,800, ashram homestays ₹500-800. The Ramana Maharshi Ashram guest house (₹500-1,500) at light occupancy.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tiruvannamalai', 6, 2, 'wait',
  'SW spillover eases. 25-37C. Girivalam still endurance. Push to October.',
  'June sees a 1-2C ease as SW spillover reaches inland Tamil Nadu. Daytime 35-37C. Girivalam still endurance-only. Hotels at year-low. October opens the proper window.',
  'June at Tiruvannamalai is SW-spillover ease but the 14km Girivalam barefoot circuit still endurance-only. October opens the proper window — push 16 weeks.',
  'June in Tiruvannamalai is the first easing month. Southwest monsoon spillover reaches inland Tamil Nadu — rainfall 60-80mm across 8-10 wet days, daytime 35-37C, nights 25-26C, humidity 75 percent. The Arunachala Temple''s inner sanctum at full Pancha Bhoota Stalam fire-element ritual tempo. The 14km Girivalam compresses to pre-dawn (3-7am) and full-night (8pm-1am) only — road surface still hits 38-42C noon-4pm even with monsoon spillover. The Skandashramam and Virupaksha cave climb workable 5:30-9am. The Ramana Maharshi Ashram at full programme; international spiritual-seekers thin (the global Ramana community avoids June-August). The Yogi Ramsuratkumar Ashram and Sri Seshadri Swamigal Ashram run their full devotional schedules. Hotel rates remain at off-season: Sparsa Resort ₹2,200-3,800, Ramana Towers ₹1,800-3k, ashram homestays ₹500-900. The Ramana Maharshi Ashram guest house at moderate occupancy. October-March is dramatically better; June is wait-tier.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tiruvannamalai', 7, 3, 'wait',
  'Heat eases. 24-35C. Aadi-month Tamil pilgrim density. Girivalam pre-dawn workable.',
  'July sees a 2-3C ease. Aadi-month (mid-Jul to mid-Aug) brings local Tamil pilgrim density at the Arunachala Temple. Girivalam pre-dawn walks workable. Hotel rates climb 15 percent.',
  'July at Tiruvannamalai is the start of the easing window. Daytime still 33-35C. Girivalam viable pre-dawn only. October opens the proper window.',
  'July in Tiruvannamalai is the first proper ease month. Rainfall 80-100mm across 10-12 wet days, daytime 33-35C, nights 24-25C, humidity 78 percent. The Arunachala Temple at full Pancha Bhoota Stalam fire-element ritual tempo. The 14km Girivalam workable 3-7am pre-dawn and 7pm-12am night; the full-moon Pournami draws regional Tamil-pilgrim density. The Skandashramam and Virupaksha cave climb (3km each way up the Arunachala mountain trail) workable 5:30-9am. Aadi-month (Tamil calendar mid-July to mid-August) brings Aadi-Velli (Aadi Fridays) and Aadi-Amavasai (Aadi new moon) Devi observances at the Apeetha-Kuchamba shrine inside the Arunachala temple — Devi worship is significant at Pancha Bhoota fire-temples in Aadi. The Ramana Maharshi Ashram at full programme; international spiritual-seekers thin. The Yogi Ramsuratkumar Ashram and Sri Seshadri Swamigal Ashram run their schedules. Hotel rates climb 15 percent off June: Sparsa Resort ₹2,500-4k, Ramana Towers ₹2-3,500, ashram homestays ₹600-1,000. The Ramana Maharshi Ashram guest house at moderate occupancy. October-March is dramatically better; July works for Aadi-locked pilgrim itineraries.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tiruvannamalai', 8, 3, 'wait',
  'Aadi tail + ease continues. 24-34C. Aadi-Pooram observances. Hotel rates climb 20 percent.',
  'August continues the ease. Daytime 32-34C. Aadi tail through first fortnight. Hotels climbing 20 percent. October opens the proper window for the full pilgrim experience.',
  'August at Tiruvannamalai sits in the easing tail of the Aadi month. Girivalam works pre-dawn and night. Daytime walks marginal. October is materially better.',
  'August in Tiruvannamalai continues the easing pattern. Rainfall 100-120mm across 12-14 wet days, daytime 32-34C, nights 24-25C, humidity 80 percent. The Arunachala Temple at full Pancha Bhoota Stalam fire-element ritual tempo. The 14km Girivalam workable 3-7am pre-dawn and 7pm-12am night; daytime walks still endurance. Aadi tail runs through the first fortnight; Aadi-Pooram (mid-August in the Tamil calendar) brings additional Devi observances at the Apeetha-Kuchamba shrine. The Skandashramam and Virupaksha cave climb workable 5:30-9am. The Ramana Maharshi Ashram at full programme; international spiritual-seekers thin (some Israeli and European devotees begin arriving in late August for the Sep-Mar long-stay window). The Yogi Ramsuratkumar Ashram and Sri Seshadri Swamigal Ashram run their full schedules. Hotel rates climb 20 percent off June: Sparsa Resort ₹2,800-4,500, Ramana Towers ₹2,200-3,800, ashram homestays ₹700-1,200. The Ramana Maharshi Ashram guest house at moderate occupancy. October-March is dramatically better; August is wait-tier for the trip-defining Girivalam comfort.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tiruvannamalai', 9, 4, 'go',
  'Pre-NE monsoon. 23-32C. Navarathri Devi observances + international long-stay arrivals.',
  'September sees the proper ease arrive. Daytime 30-32C. Navarathri (9 nights, last Sep / first Oct) brings major Devi observances at Arunachala. International spiritual-seekers return for long-stay window.',
  NULL,
  'September in Tiruvannamalai is the pre-NE-monsoon proper ease. Rainfall 100-130mm across 12-14 wet days, daytime 30-32C, nights 23-24C, humidity 80 percent. The Arunachala Temple at full Pancha Bhoota Stalam fire-element ritual tempo. The 14km Girivalam now workable 4-9am and 5pm-12am — daytime sun manageable for the first time since March. The Skandashramam and Virupaksha cave climb workable 5:30am-10am. Navarathri (the nine-night Devi festival, Sukla-Pratipada to Mahanavami of Ashwin month — falls late September into early October 2026) is the year''s most significant Devi observance at the Arunachala Temple''s Apeetha-Kuchamba shrine — the Pancha Bhoota fire-element pairing with Devi-worship gives this festival particular significance here. The Ramana Maharshi Ashram begins its long-stay international-seeker window; bookings at the Ashram guest house climb sharply. The Yogi Ramsuratkumar Ashram and Sri Seshadri Swamigal Ashram run Navarathri programmes. Hotel rates climb 25 percent off June: Sparsa Resort ₹3,500-5k, Ramana Towers ₹2,500-4k, ashram homestays ₹800-1,300.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tiruvannamalai', 10, 5, 'go',
  'NE monsoon arrives mid-Oct. 22-30C. Girivalam returns full daytime. Navarathri tail + Dussehra.',
  'October is the season opener. NE monsoon arrives mid-month as evening showers. Daytime 27-30C, Girivalam workable across all hours. Navarathri tail + Dussehra bring major Devi observances. Karthigai Deepam Dec 4 prep ramps.',
  NULL,
  'October in Tiruvannamalai is the proper return to peak. The northeast monsoon — inland Tamil Nadu''s actual rain season — arrives around October 15, dropping 150-200mm across 8-10 wet days through the back half, mostly as late-afternoon and evening showers. Daytime 27-30C, nights 22-23C, humidity 76 percent. The 14km Girivalam barefoot circumambulation workable across all hours for the first time since November — full-moon Pournami crowds return to 5-10 lakh density. The Skandashramam and Virupaksha cave climb workable through 11am. The Arunachala Temple at full Pancha Bhoota Stalam fire-element ritual tempo. Navarathri tail (running into the first week of October 2026) and Dussehra bring weapon-worship rituals and the Aigiri Nandini-set Devi processions at the Apeetha-Kuchamba shrine. The Ramana Maharshi Ashram at full programme; international spiritual-seeker arrivals at year-best pace. The Yogi Ramsuratkumar Ashram and Sri Seshadri Swamigal Ashram at full operations. Karthigai Deepam (Dec 4 in 2026, the year''s defining festival here) preparation visible — the ghee-cauldron stockpiling and trail-clearing for the summit climb.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tiruvannamalai', 11, 5, 'go',
  'Peak builds + Karthigai Deepam prep peaks last week. 20-29C. Girivalam at year-best comfort.',
  'November is the peak-build month. NE monsoon active 200-250mm in evening showers. Daytime 26-29C. Girivalam at year-best comfort. Karthigai Deepam Dec 4 prep peaks last week. International seekers at year-densest.',
  NULL,
  'November in Tiruvannamalai is the year''s second-peak month behind January. Northeast monsoon active with 200-250mm rainfall across 10-12 wet days — mostly late-afternoon and evening showers that rinse the town and the Arunachala foothills without disrupting morning programmes. Daytime 26-29C, nights 20-21C, humidity 73 percent. The Arunachala Temple at full Pancha Bhoota Stalam fire-element ritual tempo. The 14km Girivalam at year-best comfort. The Skandashramam and Virupaksha cave climb workable through full afternoon. International spiritual-seekers at year-densest — the global Ramana Maharshi diaspora (Europe, US, Australia, Israel substantial communities) at peak return. The Ramana Maharshi Ashram, Yogi Ramsuratkumar Ashram, Sri Seshadri Swamigal Ashram all at full operations. **Karthigai Deepam preparation peaks the last week:** the 30-foot ghee cauldron (the Maha Deepam to be lit at the Arunachala summit at sundown on Dec 4 in 2026) is moved up the mountain trail in late November; the summit-base camp readies for the 11-day burn that follows the lighting; pilgrim accommodation across town books at peak rates from Nov 25 onward.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('tiruvannamalai', 12, 5, 'go',
  'Karthigai Deepam Dec 4 — 30ft ghee cauldron at 882m summit. 10-15 lakh pilgrims. Lock 8-12 weeks ahead.',
  'December is the year''s defining month. Karthigai Deepam Dec 4 — 30-foot ghee cauldron lit at Arunachala summit at sundown, burns 11 days, visible 35km away. 10-15 lakh pilgrims peak day. Christmas-NYE second spike. Lock 8-12 weeks ahead.',
  NULL,
  'December in Tiruvannamalai is the year''s defining month — the Karthigai Deepam fire festival, the Pancha Bhoota fire-element festival at its eponymous mountain. **Karthigai Deepam falls December 4 in 2026** (Karthigai-Krittika full moon — calculated annually against the Tamil calendar; verify against arunachaleswarartemple.tnhrce.in). At sundown on the festival day, the 30-foot ghee cauldron (Mahadeepam) at the Arunachala summit (882m) is lit ceremonially; the flame burns continuously for 11 days, visible from 35km away across the inland plains, and the lighting itself is the spiritual climax of the year for the Pancha Bhoota fire-element tradition. **10-15 lakh pilgrims** converge on Tiruvannamalai on the festival day; the town''s population swells 5-7x. The 14km Girivalam (the barefoot circumambulation) becomes near-impossible due to density. The Arunachala Temple inner sanctum sees queues of 4-8 hours. Karthigai Deepam tradition continues through 11 days of the lit-flame; the post-festival fortnight sees pilgrim numbers fall back to peak-window levels. Christmas-NYE corridor (Dec 22 to Jan 5) brings additional Western and Israeli seeker traffic at the ashrams.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;
