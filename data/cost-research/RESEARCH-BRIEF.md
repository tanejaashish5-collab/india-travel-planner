# Cost research brief (NakshIQ destination costs)

Why this exists: `destination_costs` was a formula, not observations. The founder wants stay, local taxi and
food prices that a traveller would actually pay, per destination. A sample of 33 places showed the formula
is ~10-20% high on average but wrong by 1.5-2.5x for individual places, and invents hotel rows where no
lodging exists. This research replaces the formula place by place.

Hard rules
- Report a number ONLY if you saw it on a page you fetched (or in a search-result snippet) and can give the URL.
  Never use memory for a price. `null` + an entry in `unverified` is a good answer. Fabricated data is the
  worst outcome: it ships to a public travel site.
- Do NOT bypass bot blocks or access-denied pages. Pace yourself at about 1 request per second. If a site
  blocks you, switch to another source.
- Prices are INR, per night for a double room (2 adults, 1 room), pre-tax as listed unless stated. State the stay
  date or season if the page shows it.
- If a place has no real lodging (pass, trek camp, uninhabited, temple with only dharamshala), say
  `no_lodging: true` with a source, and name the nearest base.
- Use medians of the listed properties, not the cheapest or the dearest. 4 to 6 properties for 3-star, 3 to 5 for
  budget, 2 to 4 for homestay. Fewer is fine for tiny places: state n.

Definitions (must be consistent across all destinations)
- `mid_median_inr`: 3-star / well-reviewed private AC (or heated) room, double occupancy.
- `budget_hotel_median_inr`: basic hotel / guesthouse private room.
- `homestay_median_inr`: homestay or home-run guesthouse private room.
- `dorm_median_inr`: hostel dorm bed per night (1 bed).
- `taxi_day`: a private cab (sedan or SUV, up to 4 people) for one day of LOCAL sightseeing, about 8 hours / 80 km,
  as quoted by taxi unions, tourism departments or operators. Where unions fix point-to-point fares instead
  (hill stations), give the union's full-day or "sightseeing package" rate and list 2 to 3 typical point-to-point
  fares. Also give `outstation_per_km_inr` if shown. If a town is walkable and cabs are not how people see it
  (e.g. Hampi, old city Varanasi), say so and give auto-rickshaw day rate instead with `vehicle: "auto"`.
- `food_per_person_day`: per person for 3 meals with no alcohol.
  - `budget_inr`: dhaba, thali, street food, small local cafes.
  - `standard_inr`: casual sit-down restaurants and a decent cafe breakfast.
  Derive from menu prices, thali prices, or Zomato / Swiggy / Tripadvisor "cost for two" of 4 to 6 typical places
  (cost for two / 2 = per person for one meal). Show the basis.

Sources that worked in testing
- 3-star hotel lists with dated prices: `https://www.cleartrip.com/hotels/3-star-hotels-in-<city>` (also
  `/hotels/india/<city>/budget-hotels`, `/hotels/homestays-in-<city>`). Pre-tax, discounted sale price.
- Kayak India city pages `https://www.kayak.co.in/<City>-Hotels.<id>.hotel.ksp` (tax-inclusive "from").
- Booking.com `/threestars|budget|homestay/city/in/<city>.html` (USD "price from"; convert at a stated rate).
- Hostelworld `https://www.hostelworld.com/hostels/<City>?currency=INR` for dorm beds.
- Operator and state tourism sites (JKTDC, HPTDC, GMVN, KMVN, UPSTDC) for govt properties and tariffs.
- Taxi: taxi union rate lists, state tourism taxi tariffs, Savaari / MakeMyTrip / Zoomcar / local operators, and
  Tripadvisor / blog posts quoting a union rate card (say the date).
- Food: Zomato / Swiggy / Tripadvisor restaurant pages, menu photos quoted in blogs, thali prices.

Output
Write ONE JSON file (path given in your task) with this shape, then reply with a brief (under 200 words)
summary: how many destinations, confidence mix, anything surprising, anything you could not find.

```json
{
  "batch": "B1",
  "researched_on": "2026-10-09",
  "destinations": {
    "<destination id>": {
      "stay": {
        "no_lodging": false,
        "nearest_base": null,
        "mid_median_inr": 3200, "mid_n": 5, "mid_sources": ["url", "url"],
        "budget_hotel_median_inr": 1400, "budget_n": 4, "budget_sources": ["url"],
        "homestay_median_inr": 1800, "homestay_n": 3, "homestay_sources": ["url"],
        "dorm_median_inr": 500, "dorm_n": 2, "dorm_sources": ["url"],
        "price_basis": "Cleartrip 12-13 Nov 2026 pre-tax; Kayak tax-incl; say which per figure",
        "notes": ""
      },
      "taxi_day": {
        "local_sightseeing_8h_inr": 3200, "vehicle": "sedan",
        "outstation_per_km_inr": 14,
        "point_to_point": [{"route": "A to B", "inr": 1800}],
        "basis": "Manali taxi union rate list (blog dated 2025-11)", "sources": ["url"], "notes": ""
      },
      "food_per_person_day": {
        "budget_inr": 450, "standard_inr": 900,
        "basis": "5 restaurants, cost for two 500-900, thali 150-250", "sources": ["url"], "notes": ""
      },
      "confidence": "high | medium | low",
      "unverified": ["what you could not find"]
    }
  }
}
```

For destinations flagged `stay_observed: true` in `_scope.json`, OMIT the `stay` object: stay prices for them were
already measured. Research only taxi and food for those.

Lessons from the North India pass (apply to every later region)
- `taxi_day.local_sightseeing_8h_inr` is a LOCAL day only. Never put a long return fare there (Leh to Pangong,
  Jaipur to Ranthambore, Mumbai to Lonavala). Anything over about ₹7,000 is an outstation fare: put it in
  `point_to_point` with the route named, and leave the local figure `null` if no local rate was found.
- Do not cite national template cab sites (hurryupcabs, bookurtaxi, trivenicabs, solocabs and lookalikes): they
  show one rate card for every town. A figure from one of them is dropped at audit. Use union rate cards, state
  tourism tariffs, Savaari / MakeMyTrip city pages, local operators with a real address, or dated blog quotes.
- Do not cite price-band aggregators (Restaurant Guru "₹₹", Tripadvisor "$$-$$$") as a food basis. Use rupee
  figures: menus, thali boards, Zomato / Swiggy / Tripadvisor "cost for two" with the number shown.
- Every figure is audited in a fresh context against its URL before it loads. A number the URL does not show
  is dropped. If a page shows a range, give the range in `basis` and the median as the figure.
- Searches may run out mid-batch; fall back to fetching the listing URLs directly (Cleartrip, Kayak, Booking,
  Hostelworld, Savaari) rather than guessing.

East and North-East pass (2026-10-09)
- Stay date: Wed 18 Nov to Thu 19 Nov 2026, 1 room, 2 adults. It sits between Chhath Puja (13-16 Nov 2026) and Kartik
  Purnima / Guru Nanak Jayanti / Majuli Raas (24 Nov), and before Hornbill (1-10 Dec, Kohima). Never price 7-16 Nov.
- Cleartrip's city list pages (`/hotels/3-star-hotels-in-<city>`) are locked to 13-14 Nov and ignore date
  parameters. Use them only to find hotels. Then open each hotel's detail page with the date in the URL, e.g.
  `https://www.cleartrip.com/hotels/details/<slug-id>?c=18112026|19112026&r=2,0`, and record that page's pre-tax
  price. Put "18-19 Nov 2026" in `price_basis` for every tier priced this way, tier by tier ("Mid: ... Homestay: ...").
- If a detail page will not load a dated price, you may fall back to the list price, but write its real date
  ("13-14 Nov 2026") in `price_basis`. The loader holds those rather than guessing a holiday premium.
- Homestays and guesthouses in the hills and the North-East are often missing from OTAs. A state tourism
  department or registered-homestay list with a printed tariff is a good source: say "tariff card, undated".
  Hostelworld dorm prices are undated: say so.
- Sikkim, Darjeeling, Kalimpong and Shillong cabs run on union or syndicate rate charts (e.g. Gangtok "3-point /
  5-point / 7-point" sightseeing, Darjeeling "full-day sightseeing"). A day package FROM a base to a far lake or
  pass (Gangtok to Tsomgo/Nathula, Gangtok to Lachung, Shillong to Dawki) is a `point_to_point` entry, not the
  local day.
- No-lodging candidates need a source: lakes and passes (Tsomgo, Gurudongmar, Zuluk has homestays), archaeological
  sites (Dhauli, Nalanda, Pawapuri, Vaishali, Charaideo, Unakoti), sanctuaries with only a forest rest house. A
  forest or tourism rest house that takes public bookings IS lodging: price it if a tariff is shown.

South India, Central India and Islands pass (2026-10-10)
- Same stay date and method as East: Wed 18 to Thu 19 Nov 2026, hotel detail page `?c=18112026|19112026&r=2,0`,
  "18-19 Nov 2026" written tier by tier in `price_basis`. Never price 7-16 Nov (Diwali week).
- Files are in `data/cost-research/south/` (Andhra Pradesh, Karnataka, Kerala, Puducherry, Tamil Nadu, Telangana)
  and `data/cost-research/central-islands/` (Madhya Pradesh, Chhattisgarh, Andaman, Lakshadweep). Use the
  `_scope.json` and `_batches.json` in the folder named in your task.
- Pilgrim and festival crowding can move prices on 18-19 Nov: Sabarimala's season (Pathanamthitta, Pamba, Erumely),
  Tiruvannamalai's Karthigai Deepam, Tirupati, Kartik Purnima (24 Nov). If a place is affected, say so in `notes`
  and still price 18-19 Nov; do not skip to a different date.
- Andaman and Lakshadweep: lodging is often sold only as a package or through a government tariff. Price a
  room only where a page prints a room rate; a package price is never a room price. Lakshadweep needs a permit:
  record the permit in `notes` if a source shows it.
- Madhya Pradesh tiger reserves (Kanha, Bandhavgarh, Pench, Satpura): lodges are often all-inclusive (meals and
  safaris). Use room-only rates; if only a full-board price exists, say so and leave the 3-star median null.
- Hill and beach places in the South have union or association taxi rate charts (Munnar, Ooty, Kodaikanal,
  Coorg, Varkala, Kovalam). A fare from the base to a far sight is `point_to_point`, not the local day.
- Never reuse one food figure across several places. A state-wide or region-wide blog range is not a place's
  food cost; leave the place null instead.

Season-curve and queue pass (2026-10-10)
- Why: the ledger's low-season prices were never measured (low = shoulder x 0.65), and most places' season months
  are a template (South India: peak Oct-Mar, shoulder Apr/Sep, low May-Aug), so prose that says "Hampi in August"
  or "Manali in June" conflicts with the ledger. This pass measures how one place's prices move across the year.
- Files: `data/cost-research/queue-2026-10-10/` (`_scope.json`, `_batches.json`). Each place lists `probe_nights`
  (always 18-19 Nov 2026 first, then 2-4 more Wed-Thu nights) and `research_categories` (ledger rows that are still
  a model: research those with the normal method above, on 18-19 Nov 2026).
- SEASON PROBE: pick 3 to 5 3-star / well-reviewed mid-range hotels in the place (or nearest base if the scope
  says so). Open EACH hotel's Cleartrip detail page once per probe night, date in the URL:
  `https://www.cleartrip.com/hotels/details/<slug-id>?c=<url_c>&r=2,0`, and record the pre-tax price of the
  cheapest double room. Same hotels on every night: the matched ratio is the point. Sold out or no price = null
  (never estimate). If Cleartrip has fewer than 3 such hotels for a place, use the ones it has and say so. If a
  far-future night will not load (booking window), record null and say "not open for booking" in notes.
- Also probe 2 to 3 homestays or budget guesthouses the same way when Cleartrip lists them (same nights).
- If a probe night falls on a local festival, fair, long weekend or school holiday you can SEE on a source, keep
  the price and name the event + URL in `events` for that night. Do not move the night.
- Output shape (one JSON file per batch, written AFTER EACH PLACE so nothing is lost if you stop):
```json
{"batch": "Q1", "researched_on": "2026-10-10", "destinations": {"<id>": {
  "season_probe": {
    "mid": [{"hotel": "name", "url": "detail url without ?c", "prices": {"18-19 Nov 2026": 3200, "14-15 Jul 2027": 2100}}],
    "homestay_or_budget": [{"hotel": "name", "kind": "homestay|budget", "url": "...", "prices": {"18-19 Nov 2026": 1500}}],
    "events": {"14-15 Jul 2027": "Guru Purnima fair, url"},
    "notes": ""},
  "stay": {"...only if research_categories has hotel-mid / homestay / hostel-dorm, normal shape...": null},
  "taxi_day": {"...only if research_categories has transport-taxi-day...": null},
  "food_per_person_day": {"...only if research_categories has food-per-day...": null},
  "confidence": "high | medium | low", "unverified": []}}}
```

Budget-room pass (2026-10-10, batches C1-C4)
- Why: blogs quote "Rooms: ₹400-1,000" for these places; the ledger had no budget-room price to check them against.
  Files: `queue-2026-10-10/_scope-budget.json` and `_batches-budget.json`. One night for every place: 18-19 Nov 2026.
- Measure, on the SAME night, so the two can be paired: `mid_median_inr` (3 to 5 3-star / well-reviewed hotels) AND
  `budget_hotel_median_inr` (3 to 5 basic hotels / guesthouses, private room), plus `homestay_median_inr` (2 to 4)
  where they exist. Cleartrip detail pages with `?c=18112026|19112026&r=2,0` as in the East pass; write
  "18-19 Nov 2026" tier by tier in `price_basis` ("Mid: ... Budget: ... Homestay: ...").
- The cheap end is often off the OTAs: state tourism rest houses (GMVN, KMVN, HPTDC, JKTDC, MPT, RTDC), temple trust
  or ashram guest houses, dharamshalas with a printed room tariff, registered-homestay lists. These count as budget
  rooms when the page prints a per-room tariff: list them in `budget_sources` and name them in `price_basis` with
  "tariff card, undated" (or its date). A donation-only dharamshala is not a price; mention it in `notes`.
- Places that close for winter (Kedarnath, Chitkul, Nako, Pangong, Zanskar, Roopkund base, Gurez...): if nothing is
  open for 18-19 Nov 2026, say so in `notes`, give any published season tariff with its season, and leave the
  medians null rather than borrowing a nearby town.
- Output: the normal regional shape (`stay`, and no taxi/food unless you happen to have them), one file per batch
  `queue-2026-10-10/C<n>.json`, rewritten after each place.
