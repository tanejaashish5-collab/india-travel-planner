# WIDGET TOPUP BRIEF — Telangana + A&N (2026-05-15)

Region-sweep continuation. Goal: flip B-tier destinations to A-tier by filling missing widget slots (hidden_gems / local_eateries / destination_stay_picks). Each agent owns a fixed dest list and writes ONE SQL file with all INSERTs/DELETEs/UPDATEs for those dests.

---

## Tier thresholds (B → A)

Per dest: A = **`gems ≥ 3` AND `eats ≥ 5` AND `stays ≥ 3`** AND prose filled. You only need to push counts to threshold — don't pad. **Eats threshold is 5, not 3** — if you HS-skip below 5, dest stays B (genuine scarcity is honored but doesn't flip the tier).

---

## SCHEMA — copy-paste exact (failure to follow this WILL cause apply rollback)

### `hidden_gems` (3 gems per dest unless g already ≥ 3)

**PK is `id` text NOT NULL — agent supplies it as `<dest-slug>-<slugified-name>` (lower-kebab, ascii-only).**
**`coords` is `geography` not `point` — use `NULL` if unknown, OR `ST_SetSRID(ST_MakePoint(<lng>, <lat>), 4326)::geography`.**
**No description / category / source / source_url columns. Don't invent them.**

Canonical INSERT:
```sql
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'warangal-kakatiya-rock-garden',
  'warangal',
  'Kakatiya Rock Garden',
  NULL,
  3.5,
  '10 min drive from Warangal Fort',
  'Built 2008 by Telangana State Tourism on a discarded granite quarry — most Warangal Fort day-trippers skip it because it isn''t on the heritage-circuit tourist taxi route.',
  'A 4-acre landscaped garden of sculpted granite boulders, illustrating Kakatiya stonemasonry techniques (12th-13th c) with bilingual signage. ₹20 ticket, open 9am-6pm.',
  'easy',
  'Telangana Tourism listed property; Tripadvisor 4.0/5 across 90+ reviews.',
  4,
  ARRAY['gardens','heritage','kakatiya','sculpture']::text[],
  '{}'::jsonb
);
```

Required: id, name, near_destination_id.
NULL OK: coords, distance_km, drive_time, social_proof, difficulty, why_unknown, why_go.

### `local_eateries` (5 eats per dest unless e already ≥ 3)

**`id` is `uuid` DEFAULT `gen_random_uuid()` — DO NOT include `id` in INSERT column list. Postgres generates it.**
**`price_per_head_inr` is `int4range` — write as `'[200,401)'::int4range` (or `int4range(200, 401)`).**
**`price_range` is text — values: `'₹' | '₹₹' | '₹₹₹' | '₹₹₹₹'`. NEVER `'$'`.**
**`vegetarian` is text enum — values: `'pure-veg' | 'veg-friendly' | 'meat-heavy' | 'mixed'`. NEVER boolean.**
**`category` CHECK enum — values: `'casual' | 'mid_range' | 'cafe' | 'fine_dining' | 'street_food' | 'sweet_shop' | 'bar'` or NULL. NEVER `sweet-shop` / `tiffin` / `bakery` / `dhaba`.**
**`reservation` CHECK enum — values: `'walk-in' | 'recommended' | 'required'` ONLY. NEVER `'none'` / `'not_required'` / `'not-required'` / `'optional'`. For casual / dhaba / temple-prasadam / street-food → use `'walk-in'`.**
**`source_urls` is `text[]` — write as `ARRAY['https://...','https://...']::text[]`.**
**No hours / contact_phone / voice_flags / refreshed_at columns. Don't invent them.**

Canonical INSERT:
```sql
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'hyderabad',
  'Paradise Biryani (Secunderabad outlet)',
  'Sarojini Devi Road, Secunderabad',
  ARRAY['hyderabadi','biryani','mughlai']::text[],
  'casual',
  'Mutton dum biryani',
  ARRAY['Mutton dum biryani','Haleem','Mirchi ka salan','Double ka meetha']::text[],
  '₹₹',
  '[280,521)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Founded 1953 by A. Krishna Reddy — the original Paradise that grew into a 10-outlet chain. The Secunderabad flagship still uses the 90-litre handi method (lamb marinated 12h, sealed with wheat-dough lid, slow-cooked over coal).',
  'Order the mutton (not chicken) at lunch — coal stocks are fresh; afternoon shifts use lower-flame backup pots. Cash and UPI both accepted.',
  '7-1-272, Sarojini Devi Rd, Secunderabad 500003',
  'https://maps.google.com/?q=Paradise+Biryani+Secunderabad',
  ARRAY['https://www.paradisefoodcourt.com/our-restaurants/','https://www.tripadvisor.in/Restaurant_Review-Paradise-Secunderabad.html']::text[],
  '2026-05-15',
  1953
);
```

### `destination_stay_picks` (3 stays per dest unless s already ≥ 3)

**NO `id` column — PK is composite `(destination_id, slot)`. NEVER include id in INSERT column list.**
**Column names are `name` / `signature_experience` / `why_nakshiq` — NOT property_name / why_pick / why_pick_extended.**
**`slot` CHECK: `'experience' | 'value' | 'location' | 'xfactor'`.**
**`source` CHECK: `'local_stays' | 'web_search' | 'manual'`.**
**`sources` and `voice_flags` are `jsonb` — wrap as `to_jsonb(ARRAY['url1','url2'])`.**
**For REPLACING existing fabricated stays: use `INSERT ... ON CONFLICT (destination_id, slot) DO UPDATE SET name = EXCLUDED.name, property_type = EXCLUDED.property_type, ...` (upsert pattern).**
**Use `confidence` numeric 0.50–0.95 (NOT 1-5).**

Canonical INSERT (new slot):
```sql
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'hyderabad', 'experience', 'Taj Falaknuma Palace',
  'Heritage palace hotel',
  '₹35,000–₹80,000 per night',
  '1893 Nizam-era palace 2,000 ft above Hyderabad, restored by Taj 2010 — guests arrive by horse-drawn carriage, dine in the Jade Room (longest dining table in India, seats 101).',
  'Only stay in India offering full Nizam-court-style royal experience — no chain alternative even at 5x the price.',
  to_jsonb(ARRAY['https://www.tajhotels.com/en-in/hotels/taj-falaknuma-palace-hyderabad/','https://www.cntraveler.com/hotels/india/hyderabad/taj-falaknuma-palace']),
  to_jsonb(ARRAY['heritage-palace','nizam-restored']),
  'web_search', 0.92
);
```

Canonical UPSERT (replace existing fabricated stay):
```sql
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'pochampally', 'experience', 'Park Hyatt Hyderabad',
  'Luxury hotel',
  '₹14,000–₹25,000 per night',
  'Closest 5-star to Pochampally weavers village (38 km / 60 min via Outer Ring Road).',
  'Replaces fabricated "Oberoi Amarvilas Hyderabad" (Amarvilas is in Agra, not Hyderabad).',
  to_jsonb(ARRAY['https://www.hyatt.com/park-hyatt/hydph-park-hyatt-hyderabad']),
  to_jsonb(ARRAY['nearest-5star','outer-ring-road']),
  'web_search', 0.85
) ON CONFLICT (destination_id, slot) DO UPDATE SET
  name = EXCLUDED.name,
  property_type = EXCLUDED.property_type,
  price_band = EXCLUDED.price_band,
  signature_experience = EXCLUDED.signature_experience,
  why_nakshiq = EXCLUDED.why_nakshiq,
  sources = EXCLUDED.sources,
  voice_flags = EXCLUDED.voice_flags,
  source = EXCLUDED.source,
  confidence = EXCLUDED.confidence,
  refreshed_at = NOW();
```

DELETE pattern (when removing fabrication WITHOUT replacement — honest scarcity):
```sql
DELETE FROM destination_stay_picks WHERE destination_id = 'north-bay-island' AND slot = 'experience';
```

---

## DENIAL LIST (columns that DO NOT exist — agents have invented these before)

- `hidden_gems`: NO description, NO category, NO source, NO source_url, NO created_at/updated_at on INSERT (auto)
- `local_eateries`: NO hours, NO contact_phone, NO source (use `source_urls` text[]), NO voice_flags, NO refreshed_at (auto), **NO `id` in INSERT column list**
- `destination_stay_picks`: NO `id` column AT ALL, NO property_name, NO why_pick, NO why_pick_extended, NO created_at/updated_at on INSERT (auto)

---

## QUALITY RULES (non-negotiable — Ashish CANNOT verify, all fabrications make it to prod)

1. **Every fact anchored** — establishment year, exact distance km from dest (not "near"), specific street/area, named owner/family/founder when relevant.
2. **Source URLs required** — minimum 1 per row in `source_urls` (eats) / `sources` (stays). Use real verifiable URLs (Tripadvisor, Booking.com, state tourism boards, Tripoto, LBB, Inditales, Zomato, official property sites). No `example.com`.
3. **No cross-dest contamination** — verify every property/restaurant is in the CORRECT DESTINATION. If it's in a different town/island, mark it explicitly with "Replaces fabricated X" in `why_nakshiq` and use the upsert pattern.
4. **No cross-state contamination** — Watch for: "Oberoi Amarvilas" (= Agra, not Hyderabad), "Kaziranga" (= Assam), "Pochampally" inside Tirupati, "Nagarjunasagar Homestay (Hajipur)" (Hajipur = Bihar), "Hyderabad House" (= Delhi PM enclave).
5. **No listicle ghosts** — if Tripadvisor/Booking yields zero 2024-2026 reviews, it's likely a generic template name → SKIP (honest scarcity preferred over fabrication).
6. **No "Not applicable" placeholders** — if the slot can't be filled honestly, DELETE the row (or skip + flag in your summary as HS-confirmed).
7. **Use real coordinate-anchored properties** — Taj Exotica is on Havelock (NOT chidiya-tapu, NOT north-bay). Barefoot is on Havelock only. SeaShell has Havelock + Neil branches only. Symphony Samudra is on Havelock.
8. **Day-trip-only islands** (Ross, North Bay, Barren) — these have NO overnight stays. Replace ANY existing stays at these dests with Port Blair-side properties (the actual base for day-trip ferries) using the upsert pattern, OR DELETE if no good Port Blair substitute exists in that slot.
9. **Barren Island** is uninhabited active volcano — 0 stays. ALL 3 stay slots should remain empty (honest scarcity). DO NOT add stays for Barren.

---

## AUDIT — known suspect existing stays (verify + replace using upsert)

### Telangana
- **hyderabad/location** "Hyderabad House" → cross-state Delhi (PM residence area). Replace with a real Hyderabad property like Marriott Hyderabad Convention Centre / Trident Hyderabad / Park Hyatt / The Lalit.
- **adilabad/xfactor** "Nagarjunasagar Homestay (Hajipur)" → Hajipur is BIHAR, Nagarjunasagar is 400km from Adilabad. DELETE (or replace with real Adilabad-district property).
- **ananthagiri-hills/value** "Srisailam Nature Homestay (Ananthagiri branch)" → Srisailam is in AP 400km away. Likely fabrication. Replace or DELETE.
- **ananthagiri-hills/experience** "Ananthagiri Hills Resort" → verify; if not findable on Booking/Tripadvisor, replace with Haritha Hill Resort (state tourism, real).
- **basara** all 4 stays — Basara is small temple town; verify all 4 against Booking/Tripadvisor. Likely 2-3 are template ghosts. Replace fabrications.
- **kolanupaka/xfactor** "Not applicable" → DELETE (placeholder).
- **laknavaram/experience** AND **laknavaram/location** both = "Laknavaram Lake Resort" → duplicate. Keep experience slot; replace location with a verified Govindarao Pet / Eturnagaram property.
- **nagarjuna-konda/location** "Manakonda Resort" → Manakonda is Hyderabad suburb 130km away. Replace with real Nagarjuna Sagar-side property (Vijaya Vihar TG Tourism, etc).
- **nagarjuna-konda/xfactor** "Srisailam Houseboats (Nagarjuna Sagar Lake)" → Srisailam is a DIFFERENT dam in AP. Confusion. Replace with the actual Nagarjuna Sagar Sound & Light / TG-Tourism boat option, or DELETE.
- **pillalamarri** all 4 stays — Pillalamarri is a 800yr banyan near Mahbubnagar. Verify; likely 2-3 template ghosts.
- **pochampally/experience** "Oberoi Amarvilas Hyderabad" → **Amarvilas is in AGRA**. Replace with Park Hyatt Hyderabad / Trident or ITC Kohenur (nearest 5-stars, 35-40 km from Pochampally).
- **warangal/xfactor** "Kaziranga Jungle Homestay (Pakhal satellite property)" → **Kaziranga is ASSAM, 1500 km from Warangal**. Pure cross-state ghost. Replace with a real Pakhal Lake stay (TS Forest Dept Pakhal rest house exists) or DELETE.
- **warangal/experience** "The Warangal Fort Resort" — verify on Booking; if ghost, replace.

### Andaman & Nicobar
- **chidiya-tapu/experience** "Taj Exotica Resort & Spa, Havelock Island" → Taj Exotica is on Havelock, 35km ferry + 30km drive from Chidiya Tapu. Replace with a Port Blair-side property (chidiya-tapu is south Port Blair, accessible by road).
- **chidiya-tapu/value** "Barefoot at Havelock" → cross-dest Havelock. Replace.
- **chidiya-tapu/xfactor** "Andaman Jungle Camp, Neil Island" → cross-dest Neil. Replace with real Chidiya Tapu / Wandoor side property (Lalaji Bay or Sea Princess Munda Pahar).
- **chidiya-tapu/location** "Sea Princess Resort, Port Blair" — Port Blair-side is correct; verify it's not too distant from chidiya-tapu.
- **north-bay-island** ALL 4 → North Bay is uninhabited day-trip island. NO overnight stays allowed. DELETE all 4, OR upsert with "Replaces fabricated <name>; book Port Blair stay <X> for North Bay day-trip" pointing to a real Port Blair property.
- **ross-island/location** "Ross Island Cottage, Forest Department (on Ross Island itself)" → Ross Island = day-trip only, no overnight. DELETE.
- **ross-island/experience+value+xfactor** all at Havelock/Port Blair — cross-dest; replace with Port Blair-side real options (since Ross is reached from Port Blair).
- **havelock-island** verify all 4 (Taj Exotica, SeaShell, Barefoot, Symphony Samudra) — all should be real; just confirm names and slot fit.
- **baratang-island** all 4 → audit; Baratang has limited stays (most visitors day-trip from Port Blair, some stay at Govt Tourist Lodge / Coconut Grove Beach Resort / Dew Dale Resort or similar small properties).
- **barren-island** 0 stays expected — uninhabited active volcano. Do NOT add stays. HS-confirmed.

---

## OUTPUT — write ONE SQL file per agent

Path: `data/research/<state>-widget-2026-05-15/agent-<x>.sql` (specified in agent prompt)

Top of file should include a header comment:
```
-- Agent <X> — <dest list>
-- Strategy: <2-line summary of approach + any HS-confirmed dests + any DELETE/upsert decisions>
-- Source verification: 2026-05-15
```

End with a summary comment block listing per-dest: dest → +Xg +Ye +Zs (or HS-confirmed if not filled).

---

## PRE-APPLY VALIDATIONS YOU MUST PASS (your SQL gets rejected if any fail)

I will run these greps on your output:
1. `grep -c "INSERT INTO local_eateries (id" agent-*.sql` → must be 0
2. `grep -c "INSERT INTO destination_stay_picks (id" agent-*.sql` → must be 0
3. `grep -c "property_name\|why_pick" agent-*.sql` → must be 0
4. `grep -c "gen_random_uuid()" agent-*.sql` → must be 0
5. `grep -E "SELECT id FROM destinations WHERE slug" agent-*.sql` → must be empty (destinations table has NO slug column; use the literal slug as the id)
6. `grep -cE "price_per_head_inr (=|VALUES)?\s*'?\\\$" agent-*.sql` → must be 0 (no $ for price)
7. `grep -cE "category\s*[=,]\s*'(sweet-shop|tiffin|bakery|dhaba)'" agent-*.sql` → must be 0
8. `grep -cE "'sweet-shop'" agent-*.sql` → must be 0 (it's `sweet_shop` underscore)
9. `grep -c "vegetarian.*true\b\|vegetarian.*false\b" agent-*.sql` → must be 0 (vegetarian is text enum, not boolean)
10. `grep -cE "  '(none\|not_required\|not-required\|optional\|no-reservation)',$" agent-*.sql` → must be 0 (reservation CHECK only allows walk-in/recommended/required)
