# Agent A — UP Buddhist + wildlife closeout notes (2026-05-15)

## Rows delivered

| Dest | Gems | Stays | Eats |
|---|---|---|---|
| kushinagar | 3 | 0 | 0 |
| sarnath | 3 | 0 | 0 |
| sravasti | 3 | 2 (location + value) | 0 |
| dudhwa-national-park | 3 | 0 | 0 |
| **Total** | **12** | **2** | **0** |

## HS B-locks
None. All 4 dests delivered full gem thresholds. Sravasti stays: 2 slots filled (location: Hotel Platinum Shravasti; value: Tulip Inn Shravasti / Sarovar Hotels). xfactor slot intentionally left open — no verified Buddhist monastery pilgrim lodge with consistent open-to-non-monastic-guests policy emerged in research; Wat Thai Sravasti exists but I could not confirm a public-bookable lodge component. Better to leave slot open than fabricate.

## Top 3 factual corrections (vs. agent brief)

1. **Mahaparinirvana Temple sculptor**: Brief said "5th c. CE by sculptor Haribala." The inscription actually attributes the donation/commission to monk Haribala but names **Dinna** as the sculptor. Both named in the 5th c. CE platform inscription. Fixed in why_go.

2. **Wat Thai Kushinara Chalermaraj**: Brief said "1995, gifted by Thai King Bhumibol." Actual: construction inaugurated **21 Feb 1999** by Somdej Phra Yansangvara, Thai Supreme Patriarch; **completed and opened 2001**; built in honour of King Bhumibol Adulyadej's golden jubilee. (Did not include in final SQL — picked Matha Kuar instead since dates more historic-anchored.)

3. **Tara reintroduction by Billy Arjan Singh**: Brief said "1977 reintroduction." Actual: Tara was **acquired July 1976** from **Twycross Zoo, England** (not "UK" vaguely); Dudhwa NP was declared 1977 separately. Tara was raised without confinement at Tiger Haven and released at age 2 (so circa 1978). The "1977 reintroduction" date conflates the NP declaration with the Tara release. Fixed in why_go.

## Top 3 fabrications / risks caught (in brief or research)

1. **Matha Kuar "black-stone Buddha"**: Brief said "3.05m black-stone Buddha." Multiple authoritative sources (kushinagar.nic.in district govt + Trawell + Tripadvisor descriptions) all describe the statue as carved from **a single block of blue stone from the Gaya region** — not black. The shrine itself was built **1927** as a protective enclosure over the existing 10-11th c. CE Pala-period statue. Fixed in why_go.

2. **Mulagandha Kuti Vihara 1931 founder**: Brief said "Anagarika Dharmapala." Correct. But the temple was completed and opened in **November 1931** specifically (not just "1931") — Dharmapala died in April 1933, so this was his late-life crowning work after founding the Maha Bodhi Society in **1891** (40 years of campaigning). The Bodhi tree was also planted by Dharmapala himself in 1931 (the brief had this correct but I confirmed the same-year detail).

3. **Sravasti rainy seasons accounting**: Brief said "Buddha spent 25 monsoons" implying all at Jetavana. Pali Canon sources clarify: **Buddha spent 25 of his 45 post-enlightenment rainy seasons in the city of Sravasti** — but split between **Jetavana (19) and Pubbarama (6)**. Both monasteries are in Sravasti. Fixed in Jetavana why_go to attribute correctly.

## Schema discipline notes

- All hidden_gems INSERTs use **only the 12 allowed columns** (id, near_destination_id, name, why_go, why_unknown, social_proof, distance_km, drive_time, difficulty, confidence_score, coords, tags). No description/slug/type/source/source_url/best_months/created_at fabrications.
- `coords` always written as `ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography` per S39 baked-in lesson.
- `id` format: `<near_destination_id>-<slugified-name>`, slug derived from gem name. Confidence scores 4 or 5 (1-5 scale per CHECK constraint).
- `destination_stay_picks` uses 12 allowed columns (no id/description/address_line/slug/source_url singular). `source` is enum value `web_search`, `source_ref` is free text citation, `sources` and `voice_flags` are JSONB wrapping ARRAY[...]. price_band uses correct enum values.
- All `destination_id` / `near_destination_id` written as literal slugs ('kushinagar', 'sarnath', 'sravasti', 'dudhwa-national-park') — never `(SELECT id FROM destinations WHERE slug=X)`.

## Sources used (anchor-tier)

- ASI / Monument of National Importance designations (Dhamek, Chaukhandi, Ramabhar, Matha Kuar, Mahaparinirvana, Jetavana, Pakki Kuti)
- Government district sites: kushinagar.nic.in, kheri.nic.in
- UP State Tourism Development Corp (upstdc.co.in)
- UP Forest Dept / UP Ecotourism (upecotourism.in)
- Sanctuary Nature Foundation (Billy Arjan Singh)
- Maha Bodhi Society (Dharmapala / Mulagandha Kuti Vihara)
- Wikipedia long-form entries (cross-checked against multiple sources)
- Outlook Traveller, Tripadvisor with 100+ reviews, Booking.com 8+ ratings (for stays only)

## Output paths

- SQL: `/Users/ashishtaneja/Desktop/India Travel Planner/data/research/north-closeout-2026-05-15/agent-a.sql`
- Notes: `/Users/ashishtaneja/Desktop/India Travel Planner/data/research/north-closeout-2026-05-15/agent-a-notes.md`
