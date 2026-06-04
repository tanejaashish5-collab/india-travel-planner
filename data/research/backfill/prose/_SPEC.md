# NakshIQ — destination_months prose fill (why_go / why_not)

You write SHORT month-by-month rationale prose for India travel destinations. Each
assignment names a destination, a month (integer 1=Jan … 12=Dec), the month's verdict
(`go`/`wait`/`skip`), and which field(s) to write. Write ONLY the requested field(s).

## What each field means
- **why_go** — the honest case FOR visiting that month.
  - On a `wait` month: why someone might still choose it despite it not being peak —
    e.g. far fewer crowds, lower room rates, lush post-rain scenery, a narrow window
    when conditions are tolerable. Frame as "worth it if…", never "best time".
  - On a `go` month: why the month is genuinely good — pleasant weather, clear
    conditions, the ideal window for the destination's main draw.
- **why_not** — the honest reason the month is NOT ideal: the real seasonal downside
  (monsoon rain / rough seas / flooded or closed park zones / peak heat / cold / fog)
  and its practical impact on an actual visit. On a `skip` month this should clearly
  justify avoiding it.

## Grounding (no fabrication)
- Base EVERY claim on the destination's REAL climate/seasonality for that month.
  Standard India seasonality to reason from:
  - Jun–Sep = SW monsoon: rain + humidity, heaviest on the west coast, Konkan, Western
    Ghats and the NE; rivers/waterfalls swell; some hill roads risk landslips.
  - Apr–May = peak heat across the plains, Deccan and Gujarat (often 38–44°C territory —
    but do NOT cite exact numbers).
  - Oct–Mar = the pleasant travel window for most of India; Dec–Feb is cold in the
    north and high Himalaya (passes/high lakes can be snowbound).
  - Goa/Konkan beaches: monsoon shuts swimming, water sports and most shacks; seas turn
    rough and red-flagged.
  - Wildlife parks (Bandipur, Nagarhole, Pench, Tadoba, Mudumalai, Gir, Velavadar):
    core/safari zones often close or flood in monsoon; sightings are best in the dry,
    hotter months when animals gather at water.
  - Hill stations (Saputara, Kodaikanal, Ooty, Kotagiri, Igatpuri, Meghamalai,
    Panchgani): summer is their peak; monsoon brings fog, leeches and landslip risk.
  - Temple/pilgrimage towns: open year-round, but heat/monsoon affect comfort, queues
    and connecting travel; some hill shrines (Hemkund, high Himalaya) close in winter.
- Use the SPECIFIC place's character (beach, temple town, fort, stepwell, salt desert,
  tiger reserve, hill station, pilgrimage trek) and what a visitor actually does there.
- NO invented specifics: no made-up temperatures, rainfall figures, exact festival
  dates, or visitor counts. Only general, accurate, verifiable statements.
- Be consistent with the verdict. Do not contradict it.

## Length (HARD — a DB CHECK constraint rejects anything shorter)
- `wait` why_go and `wait`/`skip`(when wait) why_not: **130–280 characters** each.
- `go` why_go and `skip` why_not: **165–300 characters** each.
Count characters. Never go under the minimum. Stay concise — do not pad with filler.

## Voice
Factual, plain, specific — a knowledgeable local trip advisor, not a brochure. Third
person / neutral. No exclamation marks. BANNED words (never use): hidden gem,
must-visit, must visit, paradise, ultimate, unforgettable, breathtaking, amazing,
stunning, nestled, bucket list, magical, majestic, jaw-dropping, gem of, oasis.

## Output
Write a JSON array to the ABSOLUTE path given in your task. Each element:
`{"destination_id":"<slug>","month":<int>,"why_go":"…","why_not":"…"}` — include ONLY
the requested field(s) per row. After writing, use the Read tool on that exact path to
confirm the file exists and is valid JSON; report the byte count and number of pieces.

## Worked examples (for voice + length — do not copy verbatim)
- candolim, m7 (skip), why_not: "July is the height of the southwest monsoon here:
  persistent rain and rough, red-flagged seas rule out swimming and water sports, most
  beach shacks are shut, and Candolim's sands stay wet and largely empty."
- mandrem, m5 (wait), why_go: "May is the pre-monsoon lull — the sea is still swimmable
  and Mandrem's beach is at its quietest before the rains, with room rates well below
  the December peak; reasonable if you can take the building heat and humidity."
- tadoba, m12 (wait), why_not: "December safaris run, but winter mornings are cold and
  the dense, well-watered forest disperses animals, so tiger sightings are less reliable
  than in the hot, dry months when wildlife concentrates around shrinking waterholes."
