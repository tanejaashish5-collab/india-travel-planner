# Agent B notes — UP heritage+Akbar closeout 2026-05-15

## Scope
- **mathura** — Krishna janmasthan + Vrindavan pair (Mathura district, UP)
- **chitrakoot** — Ram exile site (Chitrakoot UP + Satna MP border)
- **fatehpur-sikri** — Akbar's capital 1571-1585 (Agra district, UP)

## Tally
- 9 hidden_gems (3 per dest)
- 1 destination_stay_picks (fatehpur-sikri xfactor)
- 0 eateries (out of scope per brief)

## Per-dest breakdown

### mathura — 3 gems
1. **Govardhan Hill & 23km Parikrama** (22km, moderate, conf 5) — full circumambulation route with Manasi Ganga / Radha Kund / Kusum Sarovar / Punchari waypoints.
2. **Krishna Janmasthan Temple Complex** (0km, easy, conf 5) — Janmasthan + Shahi Eidgah 1670 demolition history, Janmashtami midnight aarti anchor.
3. **Vishram Ghat Yamuna Evening Aarti** (4km, easy, conf 5) — central ghat, 7pm aarti, 15th c. Lodhi-era restoration story (Acharya Keshav Bhatt + Vallabhacharya).

### chitrakoot — 3 gems
1. **Kamadgiri Hill & 5km Parikrama** (0km, moderate, conf 5) — 11yr 11mo 11day exile residency, Bharat Milap embedded in the parikrama path.
2. **Hanuman Dhara — The Cooling Spring** (5km, moderate, conf 4) — 355 steps, rock-cut shrine, geologically-unexplained perennial spring.
3. **Gupt Godavari Twin Caves** (18km, moderate, conf 5) — narrow + wide cave system, knee-deep wading, natural skylight over Ram Darbar.

### fatehpur-sikri — 3 gems + 1 stay
1. **Buland Darwaza** (0km, easy, conf 5) — 54m / 177ft, 1576-77 victory arch for Gujarat campaign 1573, "world is a bridge" Persian inscription.
2. **Tomb of Salim Chishti** (0km, easy, conf 5) — built 1580-81, re-clad in marble 1605-07 by Jahangir, marble jali masterpiece, wish-thread tradition.
3. **Panch Mahal & Diwan-i-Khas** (0km, easy, conf 5) — Panch Mahal 176 columns 5-storey badgir; Diwan-i-Khas 36 serpentine brackets, site of Ibadat-Khana multi-faith debates.
4. **STAY: Hotel Sunset View Guest House** (xfactor, guesthouse, value) — 100m from Buland Darwaza on hilltop, 40+ Tripadvisor reviews 3.7/5, mixed-cleanliness budget pick. Real and locatable. Pure xfactor (view + closeness, not luxury).

## HS locks
- **None.** All 3 dests are mainstream pilgrim/heritage circuits with abundant verifiable material. Brief flagged "HS-risk: none" for all three and that held — fatehpur-sikri stays slot was thin but Sunset View confirmed as real anchor (Tripadvisor + Justdial + Hotels.com).

## Top 3 factual corrections

1. **Buland Darwaza date** — Brief said "1601 by Akbar". Wikipedia + Cultural India + Archnet all show the gate was built c. 1576-77 (added ~5 years after Jama Masjid completion 1571-72) to commemorate the 1573 Gujarat campaign. The "1601" figure in some sources conflates the Deccan campaign anniversary. Used "around 1576-77" in why_go.

2. **Salim Chishti tomb marble re-clad date** — Original tomb 1580-81 by Akbar was built in **red sandstone**. The white marble cladding + jali screens + verandah corbel were added 1605-07 during Jahangir's reign, not in the original Akbar construction. The marble jali "1581" attribution in the brief is wrong by a quarter-century. Used both dates correctly in why_go.

3. **Diwan-i-Khas central pillar bracket count** — Brief said "36 brackets". Wikipedia + Britannica confirm 36 serpentine brackets (not the often-cited 34 or 40). Sealed.

## Top 3 fabrications/cross-state catches

1. **"ITC Mughal Agra" as Fatehpur Sikri stay** — Brief flagged this risk explicitly. ITC Mughal is in Agra (40km east) on Tajganj road — NOT a Fatehpur Sikri property. Same risk class as past Bonhomie/Philippines and Hotel Sinclair's/MH catches. Rejected from stay shortlist.

2. **"Ramada Plaza by Wyndham Agra" as Fatehpur Sikri stay** — Cross-dest at 35-40km. Rejected.

3. **Hotel Goverdhan / Hotel Ajay Palace conflicts** — Both already in DB as either stays or eateries. Brief warned. Did not double-list. Cross-checked existing eateries (Hotel Ajay Palace Rooftop Restaurant is in DB as eatery; Hotel Goverdhan Tourist Complex Restaurant is in DB as eatery + Hotel Goverdhan is in DB as location-slot stay).

## Schema rule compliance (S40 baked-in)
- 9/9 INSERTs use `ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography` — zero `point()` calls.
- 0/9 use `(SELECT id FROM destinations WHERE slug = ...)` subqueries — all FK references are literal slugs.
- 0/9 use forbidden columns (description, slug, category, source, source_url, name_hi, best_months, neighborhood, distance_to_main_attraction, why_pick, created_at, updated_at).
- All `id` values follow `<near_destination_id>-<slugified-name>` text format.
- All `confidence_score` values are 4 or 5 (within 1-5 INT range).
- All `difficulty` values are 'easy' or 'moderate'.
- Stay slot 'xfactor' is from the allowed CHECK set (experience|location|value|xfactor).
- Stay confidence 4 (numeric, within range).
- Stay sources + voice_flags wrapped in to_jsonb(ARRAY[...]) per jsonb type.

## File path
- SQL: `/Users/ashishtaneja/Desktop/India Travel Planner/data/research/north-closeout-2026-05-15/agent-b.sql`
- Notes: `/Users/ashishtaneja/Desktop/India Travel Planner/data/research/north-closeout-2026-05-15/agent-b-notes.md`

## Token budget
~28k / 95k budget used. Well under.

## Sources used
- Wikipedia: Fatehpur Sikri, Buland Darwaza, Tomb of Salim Chishti, Krishna Janmasthan Temple Complex, Panch Mahal, Government Museum Mathura, Shakta pithas, Anasuya, Govardhan Hill
- UNESCO WHC ID 255 (Fatehpur Sikri 1986)
- chitrakoot.nic.in (UP district govt tourism)
- mptourism.com (Gupt Godavari)
- incredibleindia.gov.in (Vishram Ghat, Sati Anusuya Ashram)
- tajmahal.gov.in (ASI Fatehpur Sikri)
- archnet.org (Aga Khan Trust — Diwan-i-Khas, Salim Chishti tomb)
- Britannica (Diwan-e-Khass, Kushan art)
- Tripadvisor (Hotel Sunset View Guest House — 40 reviews 3.7/5)
