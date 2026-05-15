# Agent A — AP widget topup notes 2026-05-15

## Tally

| Dest | Need | Delivered | Result |
|---|---|---|---|
| undavalli-caves | +3 eats | 3 eats | B → A (flip pending Agent B's other 5) |
| lepakshi | +1 eat | 1 eat | B → A |
| ahobilam | +1 eat | 0 — **HS LOCK** | stays B (pre-flagged HS-RISK confirmed) |
| amaravati | +1 eat | 1 eat | B → A |
| belum-caves | +1 eat | 1 eat | B → A |

**Net: 4 of 5 B → A flips. 1 HS lock (ahobilam) — matched brief pre-flag.**

## Anchor URLs verified

### undavalli-caves
- Babai Hotel — https://www.tripadvisor.in/Restaurant_Review-g303876-d2669888-Reviews-Babai_Hotel_Restaurant-Vijayawada_Krishna_District_Andhra_Pradesh.html · https://www.zomato.com/vijayawada/babai-hotel-gandhi-nagar · https://pandareviewz.com/babai-hotel-vijayawada-lip-smacking-food-babai-idly/ (est 1942, NTR/ANR/Savitri celeb history, "Babai idli" became eponym for the dish)
- Southern Spice — https://www.tripadvisor.in/Restaurant_Review-g303876-d3667538-Reviews-Southern_Spice-Vijayawada_Krishna_District_Andhra_Pradesh.html (4.0 / 6091 reviews — robust footprint)
- Andhra Tiffins Tadepalli — https://www.zomato.com/vijayawada/andhra-tiffins-tadepalli (Tadepalli Mandal — same as Undavalli; only verifiable Tadepalli-side anchor)

### lepakshi
- Sri Saila Mallikarjuna Swamy Hotel — https://www.justdial.com/Hindupur/Sri-Saila-Mallikarjuna-Swamy-Hotel-Opposite-To-Ysr-Statue-Lepakshi/9999P8556-8556-230831001604-G2E5_BZDET (3.0/2 reviews, opposite YSR statue Lepakshi main road)
- Restaurant Guru cross-ref — https://restaurant-guru.in/Lepakshi

### amaravati
- Hamsa Restaurant — https://www.tripadvisor.in/Restaurant_Review-g1219610-d19414989-Reviews-Hamsa_Restaurant-Amaravathi_Guntur_District_Andhra_Pradesh.html (claimed business, full address, hours, contact verified) · https://www.justdial.com/Guntur/Amaravati-Hamsa-Restaurant-Opposite-Apsrtc-Bus-Stand-Amaravathi/9999PX863-X863-200203223854-A1A2_BZDET

### belum-caves
- Guruvayur Tadipatri — https://www.tripadvisor.in/Restaurant_Review-g9706817-d10801826-Reviews-Guruvayur-Tadipatri_Anantapur_District_Andhra_Pradesh.html (4.5/5, #1 in Tadipatri, Kerala-managed pure-veg, full address SH 30 Gandhi Katta)

## Top factual corrections / verifications

1. **Babai Hotel founded 1942 (not 1937)** — multiple sources (Panda Reviewz, Tripadvisor) align on 1942; brief had no year, locked it at 1942 with 79-year legacy framing. Celebrity patrons NTR + ANR + Savitri all verified across two independent sources.

2. **Hamsa Restaurant is in Kalachakra Museum Compound** — not just "opposite RTC bus stand" as JustDial says. Tripadvisor adds the museum-compound detail which is non-obvious and significant for trip planning (it's literally inside the Buddhist-circuit zone). This is the dest-level differentiator vs a generic biryani place.

3. **Guruvayur Tadipatri is Kerala-managed, not Andhra** — important distinguishing trait: mild non-Rayalaseema cooking which matters for Belum-Caves-trippers coming from cooler climates / first-time-Andhra visitors. Krishna idol at the entrance is the local navigation landmark (confirmed by Tripadvisor reviewer quote).

## Top fabrications / weak anchors rejected

1. **Ahobilam Natural Food's** — Tripadvisor listing exists but is **unclaimed, zero reviews, zero photos, no hours, no description**. Classic listicle-template ghost per brief detection rule #2. REJECTED. Triggered HS lock for ahobilam.

2. **Sri Guru Raghavendra Udipi Brahmana Hotel Ahobilam** — appears only on mindtrip.ai (aggregator with AI-generated content, NOT a primary review source). Zero Tripadvisor/Zomato/JustDial/restaurant-guru footprint. UNVERIFIABLE. REJECTED.

3. **Sri Raghavendra Tiffin Center Lepakshi** — brief candidate. Search returned only Bengaluru/Hyderabad/Bhadrachalam locations; **no Lepakshi/Hindupur instance exists**. This is a chain-name-collision risk (multiple cities have Sri Raghavendra branded tiffin joints but no Lepakshi one). REJECTED, switched to Sri Saila Mallikarjuna Swamy Hotel instead.

4. **Murugan Mess Tadepalli** — Tripadvisor listed but zero reviews, zero photos. Pattern matches the existing S22 AP debt (Village Tiffin Stalls etc). REJECTED in favor of Zomato-verified Andhra Tiffins.

5. **Lotus The Food City / Hotel Anjaneya Vilas / Paradise Biriyani Point / Star Biryani / Comesum / Shirdi Canteen** — all Vijayawada-side Tripadvisor listings with very low review counts (2-22 each) and generic chain-style branding. Too thin to anchor a "near Undavalli" recommendation; bypassed for the higher-evidence Babai + Southern Spice combo.

## Cross-dest / cross-state contamination checks

- **Undavalli-caves vs Vijayawada (8km)**: The 3 existing stays in DB are ALL central-Vijayawada hotels (Fortune Murali Park, Treebo Trend Krishna Inn, Vivanta Vijayawada). The existing data pattern accepts the 8km radius. I held to that pattern + added 1 actual Tadepalli-side Mandal eatery (Andhra Tiffins) so we have BOTH the local + the legendary anchors. Documented in why_it_matters fields.
- **Belum-caves vs Tadipatri (30km)**: APTDC's own pilgrim-circuit literature lists Tadipatri as the gateway accommodation/dining town. The brief anchored Hotel Krishna Inn at this distance; Guruvayur is at the same 30km. Pattern-consistent.
- **Belum vs Banganapalle**: Banganapalle famous for the Banganapalli mango, not for any specific eatery — search confirmed no restaurant-anchor in Banganapalle proper. Skipped Banganapalle as eatery source; chose Tadipatri instead.
- **Amaravati**: Two Amaravatis exist — (a) Maharashtra's "Amravati district" (returned by Tripadvisor cross-state search) vs (b) AP's "Amaravathi Guntur district" (correct one). All my source URLs are g1219610 (correct AP Guntur). NOT contaminated.

## HS-lock evidence — ahobilam

- Population per 2011 census: ~5,000 (Diguva + Eguva combined)
- Economy: 100% pilgrim-driven, dominated by Ahobila Mutt annadanam (free meals service)
- Existing DB eats already cover annadanam (Ahobila Mutt Annadanam + APTDC Haritha Cafeteria — exactly the 2 verifiable food sources)
- Closest standalone Tripadvisor restaurant entry (Natural Food's) is an unclaimed zero-review template ghost
- 22km away in Allagadda there's footprint but cross-dest distance exceeds the existing-pattern radius (existing stays are all in-Ahobilam or Diguva). Adding Allagadda would be a new cross-dest precedent inconsistent with the dest's curation.
- **Conclusion: 2 eats is the honest ceiling for ahobilam. B-tier hold is correct.**

## Schema discipline applied

- `destination_id` = literal slug (no SELECT subquery) ✓
- `vegetarian` = text enum ('mixed' / 'veg-friendly' / 'pure-veg') ✓
- `category` = underscored enum ('casual', 'mid_range') ✓
- `price_range` = ₹ rupee symbol (1-4) ✓
- `price_per_head_inr` = int4range(lo, hi) ✓
- `source_urls` = text[] ✓
- `is_legendary` = boolean ✓
- `established_year` = NULL when no anchored citation (3 of 6 rows) ✓
- No forbidden columns (no hours/contact_phone/source/voice_flags/confidence/refreshed_at) ✓

## SQL file path

`/Users/ashishtaneja/Desktop/India Travel Planner/data/research/ap-widget-2026-05-15/agent-a.sql`
