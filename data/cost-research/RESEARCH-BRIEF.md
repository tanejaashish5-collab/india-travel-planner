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
