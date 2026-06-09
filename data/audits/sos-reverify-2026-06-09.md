# SOS re-verification + smart cadence — 2026-06-09

## Trigger
Weekly `sos-verify-reminder` email listed **469 emergency_sos rows need re-verification**
(out of 525). Diagnosis showed this was **not a data problem** — it was a
freshness-stamp treadmill: 468 of the 469 were stamped on the **same day,
2026-05-04** (the `sos-research-sweep-2026-05-04` pass), so they all crossed the
uniform 30-day staleness line together and the reminder re-listed almost the whole
table. Left unchanged it would re-fire ~500 rows every month forever.

Field shape (525 rows): the user-facing emergency numbers are overwhelmingly
**national constants** — fire 101 (×525), police 100/112 (×519), ambulance 108
(×509), road 1073 (×488), women 1091/181, tourist 1363 / 1800-111-363. Only
**44 rows** carry an actual volatile district desk / hospital phone.

## Actions

### 1. Constants re-confirmed against the authoritative source
Re-confirmed every national emergency constant is still current today against:
- Ministry of Tourism — https://www.incredibleindia.gov.in/en/emergency
- MHA ERSS — https://112.gov.in/
All match (112 / 100 / 101 / 102+108 / 1091 / 1073 / 1363).

### 2. 458 constants-only stale rows bumped
Rows whose emergency content is national-constants-only (no district desk/hospital
phone) had `verified_date → CURRENT_DATE`, `last_verified_attempt_at → now()`,
`verified_by → 'constants-reverify-2026-06-09'`. (456 first pass + 2 pincode
false-positives — kushinagar "…274304", sravasti "…271831" — that an earlier
`[0-9]{6,}` heuristic mis-read as desk lines.)

### 3. 10 volatile district-phone rows re-fetched against live .gov.in sources
**8 confirmed unchanged** (verified_date bumped, `verified_by='district-reverify-2026-06-09'`):
| dest | line | re-confirmed value | source |
|---|---|---|---|
| doodhpathri | P/S Khansahib | 01951-277540 | budgam.nic.in/police |
| tosamaidan | P/S Khansahib | 01951-277540 | budgam.nic.in/police |
| yusmarg | P/S Charisharief | 01951-253223 | budgam.nic.in/police |
| gulmarg | P/S Gulmarg | 9596767715 | baramulla.nic.in/police |
| pahalgam | P/S Pahalgam | 01932-243228 | anantnag.nic.in/police-info |
| verinag | P/S Dooru | 01932-230221 | anantnag.nic.in/police-info |
| patnitop | P/S Kud | 01992-288105 | udhampur.nic.in/police |
| sonamarg | P/S Sonamarg | 9797117797 | ganderbal.nic.in/police-directory |

**2 NOT bumped — could not re-confirm (honest):** kabini, nagarhole both reference
"Taluk Health Office, H.D. Kote (08228-257625)". The Mysuru gov contact directory
+ hospitals page no longer surface that number (only PHC emails). Left at their
2026-05-04 date with `last_verified_attempt_at` stamped; under the new 45-day
district window they are still in-window (36d) and will re-surface ~2026-06-18.

**katra — stays honest-scarcity:** Reasi district helpline page lists only national
numbers (no district desk). `verified=false`, no source_url — correctly the 1
remaining flagged row. Matches the deliberate 2026-06-04 decision.

### 4. Smart cadence (migration 069 + cron + script)
Replaced the uniform 30-day window with a per-row classifier:
- **district-line** rows (real STD-hyphen / 10-digit-mobile / "Tel:" phone in
  local_police_station or nearest_hospital) → **45-day** window.
- **constants-only** rows → **180-day** window (MHA/MoT constants don't change).
- Classifier excludes bare 6-digit PINCODEs.
Applied to: `emergency_sos_stale` view (also recreated `security_invoker=true`,
clearing Supabase advisor ERROR `security_definer_view_public_emergency_sos_stale`),
`api/cron/sos-verify-reminder/route.ts`, `scripts/audit-emergency-numbers.mjs`.

## Result
Flagged rows: **469 → 1** (katra, honest). View `SELECT count(*) FROM
emergency_sos_stale` = 1. Zero fabrication; every bump backed by a re-confirmed
source or an honest national-constant.
