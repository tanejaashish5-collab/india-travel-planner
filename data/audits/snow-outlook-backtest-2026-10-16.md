# Snow outlook backtest, 2026-10-16

Re-run: `node --env-file=apps/web/.env.local scripts/snow-outlook-backtest.mjs [--sweep]`

## Question

On 15 Oct 2026 the season's first snow fell at Sissu and Keylong (IMD Shimla measured
Gondhla 5 cm, Keylong 3 cm in the 24 h to 08:30 IST). Could we have called it, and how
often would the same method call snow that nobody reported?

## Method

- Six global models via Open-Meteo's archived runs (previous-runs API): ECMWF IFS, NOAA
  GFS, DWD ICON, Canada GEM, UK Met Office, Météo-France ARPEGE. All six had archived
  runs for the whole period.
- Each watch point (destinations at 1,800 m+ in the snow states, plus 12 road passes)
  gets the forecast at its TRUE elevation. Precipitation at a 2 m temperature of 1°C or
  below counts as snow. A model votes for a day at 2 mm or more (about 2 cm of snow).
- "Likely" = at least two-thirds of answering models vote; "possible" = at least half;
  fewer than four models answering = no call.
- Ground truth: dated, sourced snow reports in `road_updates` plus the IMD Shimla
  bulletin. An event counts as caught if any watch point in the affected area is called
  on the event day, give or take one day.
- Period: 10 Sep to 16 Oct 2026. Leads: forecasts issued 1, 2 and 3 days before.

## What the first version got wrong

1. The models' own `snowfall` field read about 0 cm at Sissu on the day it snowed: a
   10-25 km model cell sits lower and warmer than the valley. Fix: compute snow from
   precipitation + temperature corrected to the true elevation.
2. Watching only destinations caught 3 of 8 events. In the 13-14 Oct Kashmir spell the
   models forecast 10-26 mm, but at Gulmarg/Sonamarg town level it was +3 to +9°C
   (rain); the snow fell on Zoji La, Razdan Top and Affarwat. Fix: add 12 road passes
   (coordinates and heights from Wikidata / Wikipedia, source per row in
   `snow_watch_passes`).
3. Most "flagged, no report" days were trekking summits stored at peak height (Kinner
   Kailash 6,055 m, Adi Kailash, Roopkund, Shrikhand, Manimahesh), where any
   precipitation is snow and nobody reports it. Removed from the watch list.

## Result (final settings: 1°C, 2 mm, two-thirds)

| Event (date, source in road_updates) | 1 day ahead | 2 days ahead | 3 days ahead |
|---|---|---|---|
| 27 Sep North Sikkim roads blocked by snow | likely | likely | likely |
| 5 Oct Mana Pass / Deotal heavy snow | missed | missed | missed |
| 7 Oct fresh snow Zojila and Gulmarg belt | missed | missed | missed |
| 7 Oct Sach Pass closed, 5-6 in | possible | possible | likely |
| 9 Oct Sach Pass 8-10 in | possible | possible | likely |
| 11 Oct Kunzum, Baralacha La, Shinku La, Rohtang | missed | missed | missed |
| 13 Oct Razdan Top 5 in | likely | likely | likely |
| 14 Oct Gulmarg, Zoji La, Peer Ki Gali | likely | likely | likely |
| 15 Oct Sissu/Keylong first snow; Batal, Shinkula, Baralacha shut | likely | likely | likely |
| **Caught** | **6/9 (4 likely)** | **6/9 (4 likely)** | **6/9 (6 likely)** |

(The 17 Sep Manimahesh event left the test with the summit.)

The three misses had every model dry at those points: light, local, high snow the
global models did not resolve. No threshold in the sweep caught them.

False alarms, as an upper bound: at 2 days ahead there were 25 "likely" point-days;
12 had no snow report anywhere in that state within a day (Nathu La, Hemkund Sahib,
Gurudongmar, Khardung La, Sach Pass). All sit at 4,000-5,400 m where unreported snow is
common, so the true false-alarm rate is lower than 12/25, by an amount we cannot measure.

## What this means for what we publish

- Say "likely", never "will". About half of "likely" calls in the test had no report.
- The 15 Oct Sissu snow: Rohtang Pass was "likely" 2 days out (5 of 6 models); Sissu
  itself only came in at 1 day out. The pass is the earlier warning.
- Amounts are rough. The 13 Oct run had Rohtang at 2-26 cm across the agreeing models.
- After every window, `snow-outlook.mjs verify` scores the call from evidence; the
  running tally is public on /road-conditions.

## Data licence

Open-Meteo free tier = non-commercial only (no ads, no subscriptions). NakshIQ qualifies
on 2026-10-16 (no ads; membership is a waitlist). The day ads or paid membership go
live, this needs Open-Meteo's commercial plan. Data CC BY 4.0, credited on the page.
