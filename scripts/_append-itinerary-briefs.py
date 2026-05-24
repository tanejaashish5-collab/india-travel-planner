"""Append 5 itinerary master-cut briefs to data/luxury/video-production-brief.csv.

Mirrors the row-35 (royal-rajasthan-by-car-master) format: 40 sec, master montage
shot type, 6-8 beats covering each canonical leg of the itinerary's published
route, ending on a hand-drawn map + wordmark end card.

Anti-fabrication ground rules (per data/luxury/anti-fabrication.md spirit):
- Beats are sourced directly from luxury_experiences.editorial + route_legs.
- Each beat names a property/landscape that appears in the published itinerary.
- No invented suite numbers, no fabricated wildlife sightings, no driver scripts.
- Reference URLs point to NakshIQ detail pages (the operator pages aggregate).
"""

import csv
from pathlib import Path

CSV_PATH = Path(__file__).resolve().parent.parent / "data" / "luxury" / "video-production-brief.csv"

ROWS = [
    # Row 36 — Heritage Triangle Luxury
    [
        "36",
        "heritage-triangle-luxury-master",
        "Heritage Triangle Luxury — 6-night Delhi-Agra-Jaipur itinerary master cut",
        "itinerary",
        "ultra_luxury",
        "itinerary master montage",
        "16:9",
        "40",
        "/luxury/heritage-triangle-luxury detail hero · YouTube India Travel pre-roll · LinkedIn-cinematic share asset",
        "40 seconds. A 6-night itinerary master cut tracing Delhi → Agra → Jaipur, two nights per city, refusing to rush the Golden Triangle. Beat 1 (0:00–0:05): The Leela Palace New Delhi domed lobby at first light, a doorman in white sherwani opens the brass doors as a couple steps out toward a waiting car. Beat 2 (0:05–0:10): Chandni Chowk at dawn — a spice market vendor unrolls jute sacks of red chilli and turmeric, steam rising from a kulhad of cutting chai. Beat 3 (0:10–0:16): Oberoi Amarvilas private balcony at sunrise, the Taj Mahal mausoleum fully visible across the garden, masala chai service on a silver tray. Beat 4 (0:16–0:21): macro of marble inlay work at Itimad-ud-Daulah — a finger of a private guide traces a single semi-precious flower set in white marble. Beat 5 (0:21–0:26): Rambagh Palace driveway at golden hour, the chequered marble courtyard and the heritage hotel facade lit warm tungsten through Mughal arches. Beat 6 (0:26–0:32): Jantar Mantar's largest sundial throwing its long noon shadow, a guide in white kurta gestures along the calibrated arc. Beat 7 (0:32–0:36): Nahargarh Fort sunset, the Aravalli ridge dropping into Jaipur's pink-city grid below. End card (0:36–0:40): a hand-drawn map of the 3-city loop fades up, then the wordmark 'Heritage Triangle · 6 nights · curated by NakshIQ'.",
        "Mix: locked-off wides, slow dolly-in (lobby + balcony), macro static (inlay), gimbal walk (market + Jantar Mantar), low-angle silhouettes (Nahargarh). End on locked-off map.",
        "Strict golden / blue / first-light only across all beats. Best filming months: late October to mid-February (cool mornings, clear Taj visibility).",
        "A single santoor + tabla arrangement runs across all 40 seconds, sparse opening at Leela Palace, building through the spice market to full ensemble by Beat 5, dropping out for the end card. Ambient layered (spice-sack rustle, chai pour, distant azaan at 0:13, Jantar Mantar guide's voice low-mixed, evening azaan + fort flag-flap at 0:32) but never dominant.",
        "https://www.nakshiq.com/en/luxury/heritage-triangle-luxury",
        "All 3 cities · Oberoi Amarvilas Taj view (canonical) · the private guide as throughline · the curator-map end card",
        "Featuring property logos in shot · staged 'royal' costumes · drone shots over the Taj (restricted airspace) · monsoon filming · invented Mughal stories from the guide",
        "Use only the route legs published in luxury_experiences.route_legs for this itinerary (Leela Palace night 1-2, Amarvilas night 3-4, Samode/Rambagh night 5-6). The 2 nights/city pacing is canonical — do not collapse cities into single nights for tighter cuts.",
        "Pending"
    ],
    # Row 37 — Himalayan Wellness Triangle
    [
        "37",
        "himalayan-wellness-triangle-master",
        "Himalayan Wellness Triangle — 10-night Wildflower–Ananda–Glenburn itinerary master cut",
        "itinerary",
        "ultra_luxury",
        "itinerary master montage",
        "16:9",
        "40",
        "/luxury/himalayan-wellness-triangle detail hero · YouTube India Travel pre-roll · LinkedIn-cinematic share asset",
        "40 seconds. A 10-night itinerary master cut threading three iconic Himalayan wellness stays — Wildflower Hall Shimla → Ananda Rishikesh → Glenburn Darjeeling. Beat 1 (0:00–0:06): Wildflower Hall's stone terrace at sunset, two figures in white seated cross-legged facing the Himalayan ridge, Lord Kitchener's estate in the background, tea service untouched. Beat 2 (0:06–0:11): forest walk through Wildflower Hall's deodar cedars at first light, footsteps soft on pine needles. Beat 3 (0:11–0:17): Ananda Rishikesh's yoga pavilion above the Ganges at dawn, two figures in white in seated meditation, mist rising off the river below. Beat 4 (0:17–0:22): macro static of an Ayurvedic oil bowl and brass abhyanga vessel on a wooden treatment table, a single steady drop of warm oil falls. Beat 5 (0:22–0:28): Glenburn Tea Estate veranda at dawn, mist clearing over the rolling First Flush bushes, the Kanchenjunga massif catching first light over the horizon. Beat 6 (0:28–0:34): a hand pours brewed First Flush from a porcelain pot into a fine white cup, leaves visible at the bottom, the estate manager's hand offers it forward. End card (0:34–0:40): a hand-drawn map of the 3-region loop (Shimla → Rishikesh → Darjeeling) fades up, then the wordmark 'Himalayan Wellness · 10 nights · curated by NakshIQ'.",
        "Locked-off wides (terrace, pavilion, veranda), gimbal walk (cedar forest), macro static (oil bowl + tea pour), slow drone reveal (Kanchenjunga). No handheld.",
        "Sunset (Beat 1), first light (Beats 2, 3, 5), warm interior tungsten (Beat 4). Strict no mid-day filming. Best filming months: October–November or March–April.",
        "A solo bansuri (bamboo flute) carries the entire 40 seconds, supported by a low tanpura drone, building gently from Beat 1 through the Kanchenjunga reveal then dropping to silence for the tea pour. Ambient: distant temple bell at 0:11 (Ananda), pine wind at 0:08, the soft pour at 0:30, no synthetic sound. No voice-over.",
        "https://www.nakshiq.com/en/luxury/himalayan-wellness-triangle",
        "All 3 properties · the yoga / meditation / tea ceremony progression · Kanchenjunga at Glenburn (canonical) · the curator-map end card",
        "Staged 'spiritual' poses with props · pretend Ayurveda practitioners · drone over Rishikesh ghats during aarti hours (restricted) · monsoon filming · invented health claims about treatments",
        "Treatments named must exist in Ananda's published wellness menu; tea grade shown must be First Flush (matches Glenburn's spring harvest). Do not stage a Kanchenjunga sighting on overcast days — the masseif is not reliably visible; only shoot on cleared mornings.",
        "Pending"
    ],
    # Row 38 — Kerala Backwater Royalty
    [
        "38",
        "kerala-backwater-royalty-master",
        "Kerala Backwater Royalty — 7-night Brunton–houseboat–Kumarakom itinerary master cut",
        "itinerary",
        "ultra_luxury",
        "itinerary master montage",
        "16:9",
        "40",
        "/luxury/kerala-backwater-royalty detail hero · YouTube India Travel pre-roll · LinkedIn-cinematic share asset",
        "40 seconds. A 7-night itinerary master cut anchored on Kerala's backwaters — Brunton Boatyard Fort Kochi → Alleppey kettuvallam houseboat → Kumarakom Lake Resort. Beat 1 (0:00–0:05): Fort Kochi waterfront at golden hour, the silhouettes of three Chinese fishing nets (cheena vala) being lowered by a team of four fishermen pulling in unison on weighted ropes. Beat 2 (0:05–0:10): Brunton Boatyard colonial-era courtyard, white-uniformed staff carrying a brass tray of welcome lime-and-jaggery juice across coir matting. Beat 3 (0:10–0:15): a couple steps aboard a luxury kettuvallam at noon, the curved palm-leaf roof and varnished wooden hull visible, ropes are cast off. Beat 4 (0:15–0:22): the kettuvallam glides through a narrow Alleppey canal at golden hour, coconut-fringed banks pass slowly, a villager bathes a buffalo at the water's edge, a kingfisher hovers and dives. Beat 5 (0:22–0:27): macro on the onboard chef plating a karimeen pollichathu (banana-leaf-wrapped pearl spot fish), the leaf is gently unwrapped to release steam. Beat 6 (0:27–0:33): Kumarakom Vembanad Lake at first light, a country boat poles through reeds toward the bird sanctuary, white egrets lift off the water in soft focus. End card (0:33–0:40): a hand-drawn map of the 3-port loop (Kochi → Alleppey → Kumarakom) fades up, then the wordmark 'Backwater Royalty · 7 nights · curated by NakshIQ'.",
        "Locked-off wides (Chinese nets, courtyard, lake at dawn), gimbal walk (boarding), slow tracking (kettuvallam in canal), macro static (karimeen plating), low-angle from water level (Kumarakom egret lift). No handheld.",
        "Golden hour (Beats 1, 4), warm courtyard tungsten (Beat 2), bright noon overcast acceptable for Beat 3 only, first light (Beat 6). Best filming months: November–February (water levels stable, birds active).",
        "Edakka drum + sopanam vocals (Kerala temple-music tradition) opens at Beat 1, transitions to a single mridangam + chenda pulse during the canal float, drops to ambient water for the chef plating, returns soft for the egret lift, silence for the map end card. Ambient water lapping throughout, distant temple bell at 0:08, kingfisher splash at 0:20.",
        "https://www.nakshiq.com/en/luxury/kerala-backwater-royalty",
        "All 3 stops · the Chinese fishing nets at Fort Kochi (canonical opening) · the kettuvallam canal float at golden hour (canonical signature) · the curator-map end card",
        "Drone over Kumarakom Bird Sanctuary core zone (disturbs species) · staged actors in 'traditional' costumes that aren't Kerala-authentic · invented house-boat suite numbers · monsoon filming (June–September)",
        "Karimeen pollichathu is the canonical Kerala backwater fish course — do not substitute generic 'curry'. Chinese fishing nets are an active working installation, not a tourist prop; film during actual working hours (dawn / evening haul). Kumarakom bird species shown must be October–May residents (egrets, herons, kingfishers).",
        "Pending"
    ],
    # Row 39 — South India Luxury Train Loop
    [
        "39",
        "south-india-luxury-train-loop-master",
        "South India Luxury Train Loop — 7-night Golden Chariot + Falaknuma itinerary master cut",
        "itinerary",
        "ultra_luxury",
        "itinerary master montage",
        "16:9",
        "40",
        "/luxury/south-india-luxury-train-loop detail hero · YouTube India Travel pre-roll · LinkedIn-cinematic share asset",
        "40 seconds. A 7-night itinerary master cut centred on the Golden Chariot luxury train with a Falaknuma Palace heritage-stay insertion. Beat 1 (0:00–0:06): Bengaluru railway platform at evening blue hour, the Golden Chariot's purple-and-gold livery stretches the length of the platform, a uniformed steward stands beside the entrance to the dining car. Beat 2 (0:06–0:11): interior of the dining car as the train moves at night, polished teak panelling, a four-course South Indian thali on a brass tray, the gentle rock of carriage motion visible in the cutlery. Beat 3 (0:11–0:17): morning arrival at Mysuru station, the Mysore Palace's painted gopuram and onion domes visible across the maidan, a private guide in white kurta gestures toward the entrance. Beat 4 (0:17–0:22): Hampi's Virupaksha Temple gopuram at golden hour, the Tungabhadra River boulder-strewn in the foreground, the temple's east-facing tower catching low sun. Beat 5 (0:22–0:28): aerial pull-back from Falaknuma Palace on its 2,000-foot hilltop above Hyderabad at blue hour, the 101-room palace's central scorpion-shaped layout faintly visible, floodlit. Beat 6 (0:28–0:34): the Falaknuma Jade Room (heritage dining hall) by candlelight, a single butler in a white achkan places a silver tureen on the world's longest banquet table. End card (0:34–0:40): a hand-drawn map of the train loop (Bengaluru → Mysuru → Hampi → Hyderabad → Bengaluru) fades up, then the wordmark 'South India Train Loop · 7 nights · curated by NakshIQ'.",
        "Locked-off platform wide (Beat 1), interior dolly + handheld locked-off (dining car, Beat 2), slow gimbal walk (Mysuru gopuram, Beat 3), low-angle wide (Hampi, Beat 4), high-altitude drone descent (Falaknuma, Beat 5), locked-off interior (Jade Room, Beat 6). End on locked-off map.",
        "Evening blue hour (Beat 1), warm interior tungsten with practical lamps (Beats 2, 6), golden morning (Beats 3, 4), blue hour aerial (Beat 5). Best filming months: October–March (train operating season).",
        "A nadaswaram + mridangam arrangement opens at Beat 1 (Bengaluru), shifts to a Carnatic violin melody in the dining car, returns to nadaswaram fanfare at Mysuru, drops to ambient temple bell at Hampi, builds to a regal Hyderabadi qawwali phrase at Falaknuma, silence for the end card. Ambient: brake hiss + platform whistle at 0:04, cutlery and pour at 0:08, temple bell at 0:19, hilltop wind at 0:25.",
        "https://www.nakshiq.com/en/luxury/south-india-luxury-train-loop",
        "Golden Chariot exterior + dining car interior · Mysore Palace · Hampi's Virupaksha gopuram · Falaknuma's hilltop scale · the curator-map end card",
        "Mocking up train interior in a studio (passenger-eye motion is essential) · drone over active Hampi heritage zones without ASI clearance · presenting Falaknuma as an unbroken train stop — it requires a disembark transfer (the brief must show this honestly) · invented royal-family narratives",
        "Golden Chariot operates a fixed published itinerary — Bengaluru embark + Mysuru + Hampi + Hyderabad (Falaknuma night) are canonical. Do not stage a beat that doesn't match the operating route. Falaknuma night is an off-train palace insertion, not an on-board sleeping car — show the transfer honestly in Beat 5's aerial framing.",
        "Pending"
    ],
    # Row 40 — Wildlife Luxury Circuit
    [
        "40",
        "wildlife-luxury-circuit-master",
        "Wildlife Luxury Circuit — 10-night Mahua Kothi–Banjaar Tola–Sher Bagh itinerary master cut",
        "itinerary",
        "ultra_luxury",
        "itinerary master montage",
        "16:9",
        "40",
        "/luxury/wildlife-luxury-circuit detail hero · YouTube India Travel pre-roll · LinkedIn-cinematic share asset",
        "40 seconds. A 10-night itinerary master cut chaining three Taj Safaris properties across three central-Indian tiger reserves — Mahua Kothi (Bandhavgarh) → Banjaar Tola (Kanha) → Suján Sher Bagh (Ranthambore). Beat 1 (0:00–0:06): Mahua Kothi's mud-walled kutiya at pre-dawn, a single hurricane lantern lights the thatched-roof porch, a naturalist in olive uniform straps a camera to a 4x4 jungle gypsy. Beat 2 (0:06–0:12): the gypsy moves slowly through sal-forest dappled morning light in Bandhavgarh, fresh tiger pugmarks in the dust beneath the front tyres, the naturalist holds up a hand for silence. Beat 3 (0:12–0:18): a Bengal tiger drinks at a forest salt lick at golden hour, framed wide, undisturbed, the camera holds at a respectful distance (no zoom-in close-up). Beat 4 (0:18–0:24): Banjaar Tola's riverside tented suite at sunset, canvas walls open to the Banjaar River, a copper bathtub fills, a uniformed butler arranges chai service. Beat 5 (0:24–0:29): Kanha's grasslands at first light, a herd of barasingha (swamp deer) grazes in the meadow, mist clings to the sal canopy behind. Beat 6 (0:29–0:34): Suján Sher Bagh's campaign-style tent at twilight, a long candlelit dinner table is set under a banyan, fireflies in the bougainvillea, a single sitar player tunes. End card (0:34–0:40): a hand-drawn map of the 3-park circuit (Bandhavgarh → Kanha → Ranthambore) fades up, then the wordmark 'Wildlife Luxury Circuit · 10 nights · curated by NakshIQ'.",
        "Locked-off porch wide (Beat 1), low-angle tracking from the gypsy bonnet (Beat 2), long-lens locked-off telephoto at safe distance (Beat 3 — no movement, no proximity), locked-off interior + slow tilt (Beat 4), wide gimbal (Beat 5), candlelit slow dolly (Beat 6). End on locked-off map.",
        "Pre-dawn lantern + first light (Beat 1), dappled morning (Beats 2, 3), golden hour (Beat 4), first light (Beat 5), candlelight only (Beat 6). Best filming months: November–April (parks closed monsoon, June–September).",
        "A single low cello drone underpins all 40 seconds, supported by a santoor melody that builds from Beat 1 through Beat 5, drops out completely at Beat 3 for tiger ambient (no music — only wind, distant alarm call, the lick of water), returns soft at Beat 6 with a sitar fade-in. Ambient: distant sambar alarm call at 0:13, drinking-water lap at 0:15, river gurgle under Beat 4, firefly silence under Beat 6.",
        "https://www.nakshiq.com/en/luxury/wildlife-luxury-circuit",
        "All 3 Taj Safaris properties · the dawn safari rhythm · a tiger seen WITHOUT proximity violation · the curator-map end card",
        "Close-zoom on the tiger (ethics violation — see Taj Safaris guidelines on respectful distance) · staged 'kill' scenes · drones over any active tiger reserve (illegal in core zones, restricted in buffer) · monsoon filming · invented sightings of leopard or sloth bear if the brief asks for tiger-only beat 3",
        "Taj Safaris properties + parks are canonical: Mahua Kothi serves Bandhavgarh (NOT Pench/Tadoba), Banjaar Tola serves Kanha, Suján Sher Bagh serves Ranthambore. Wildlife shown must be the species the parks actually support (Bandhavgarh: tiger + leopard; Kanha: tiger + barasingha; Ranthambore: tiger + leopard + crocodile). Do not stage interactions or feedings.",
        "Pending"
    ],
]

# Read existing rows, append new rows, rewrite with CRLF line endings.
existing = []
with CSV_PATH.open("r", encoding="utf-8", newline="") as f:
    reader = csv.reader(f)
    existing = list(reader)

# Sanity: confirm row 35 is the last
assert existing[-1][0] == "35", f"Expected last row #35, got {existing[-1][0]}"
assert existing[-1][1] == "royal-rajasthan-by-car-master", f"Unexpected last video_id: {existing[-1][1]}"

# Append the 5 new briefs
all_rows = existing + ROWS

with CSV_PATH.open("w", encoding="utf-8", newline="") as f:
    writer = csv.writer(f, quoting=csv.QUOTE_ALL, lineterminator="\r\n")
    writer.writerows(all_rows)

print(f"Appended {len(ROWS)} new itinerary briefs (rows 36-40).")
print(f"Total rows now: {len(all_rows) - 1} (excluding header)")
