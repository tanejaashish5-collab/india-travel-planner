# Calibration sample, 2026-10-08

33 destinations checked against real listing prices by three Sonnet research agents plus a fourth that measured
peak vs shoulder on the same hotels. Source patterns: Cleartrip 3-star / budget / homestay pages (stay 12-13 Nov 2026,
pre-tax, discounted sale price), Kayak India city pages, Booking.com listing pages, Hostelworld dorm "from" prices,
operator sites (Pangong, Hanle, Leh), JKTDC. Per-property URLs were in the agent reports (not durable); re-derive
with `RESEARCH-BRIEF.md`. Medians INR per night, pre-tax. Dorm = per bed.

| Dest | Mid | Homestay | Dorm | Note |
|---|---|---|---|---|
| jaipur | 3602 | 2640 | 502 | |
| udaipur | 5158 | 1318 | 450 | mid sources disagree 2330-5158; homestay pooled, mixed dates |
| manali | 1755 | 2640 | 410 | model said 4400 |
| rishikesh | 3509 | 2209 | 403 | homestay Cleartrip median 5853 skewed riverside, used Trip.com 2209 |
| darjeeling | 3542 | 2480 | 600 | |
| munnar | 4058 | 2936 | 550 | |
| varanasi | 3228 | 2392 | 400 | |
| ooty | 4432 | 3548 | 664 | |
| hampi | 3930 | 2175 | 742 | homestay low confidence, dorm n=2 |
| pushkar | 2793 | 1357 | 319 | |
| shimla | 2879 | 2008 | 499 | |
| amritsar | 2365 | 1411 | 381 | |
| ajmer | 2234 | 1256 | none | |
| mandu | 3263 | 1805 | none | low confidence |
| khajuraho | 3268 | 1015 | 357 | |
| gokarna | 2979 | 1978 | 511 | |
| kasol | 3851 | 1204 | 575 | |
| chopta | 4700 | 1475 | none | n=3, camps and cottages, low confidence |
| kalpa | 3529 | 1787 | 757 | |
| chitkul | 3063 | 1387 | 604 | low confidence |
| puri | 1958 | 878 | 542 | |
| bodh-gaya | 3094 | 1086 | 511 | |
| kaziranga | 2883 | 1759 | none | off-season snapshot |
| calangute-baga | 4509 | 3150 | 918 | peak measured 7684 |
| palolem | 4050 | 2782 | 635 | peak measured 10650, thin |
| leh | 2730 | 1680 | 552 | model said 6400 |
| hanle | 4349 | 3000 | none | no 3-star, proxy = best private rooms, low confidence |
| pangong-lake | 6000 | 2924 | none | camps with meals; Booking cottages 2646-3150 |
| kaza | 4326 | 2310 | 1076 | |
| tawang | 3093 | 3229 | 945 | model said 6200 |
| gulmarg | 3990 | 2625 | none | |
| pahalgam | 2640 | 2341 | 1172 | |
| srinagar | 3280 | 1575 | 986 | |

No lodging exists: khardung-la (a pass; Leh or Nubra), barren-island (uninhabited sanctuary).
Doodhpathri: almost no private stays; govt huts via JKTDC (tariff not found); excluded from calibration.

Peak vs shoulder, same hotels, Cleartrip dated stays (25-31 Dec 2026 vs 27 Oct-17 Nov 2026), 102 matched pairs:
Jaipur 1.16, Udaipur 1.43, Calangute 1.89, Rishikesh 1.19, Munnar 1.35; median 1.35. Manali Dec 1.57, Shimla Dec 1.33.
Hill summer (May-Jun 2027) and low season (Jul-Aug 2027) are UNVERIFIED: 2027 rates are mostly not loaded.

Model vs observed, shoulder, median ratio over 33: mid 1.22 (pre-tax) / 1.09 (after 12% GST), homestay 1.27 / 1.13,
dorm 1.08. 10 of 33 mid values were outside 0.67x-1.5x of observed (Manali 2.5, Leh 2.3, Tawang 2.0, Ajmer 1.9, Hanle 1.8,
Pahalgam 1.8, Puri 1.6, Amritsar 1.6, Shimla 1.5, Pushkar 1.5).
