# emergency_sos structured-columns audit — 2026-06-10 (4th phone surface)

## How this surfaced
After the confidence_cards purge deployed, a live-verify of the deployed pages showed great-himalayan-np
clean BUT ahmedabad still rendered the fabricated `1800-200-5252` "Gujarat Tourism". Root cause: the SAME
fabricated numbers also live in the **`emergency_sos`** table's structured columns — a 4th surface the
108-number SOS audit + the confidence_cards purge never touched. The earlier SOS purge (PR #24) only cleaned
`emergency_sos.local_helpers`; the structured columns (`tourist_helpline`, `rescue_contact`, etc.) were
assumed "~100% verified" — they were not.

## Scope found
~415 distinct ≥10-digit numbers across columns: rescue_contact (325), mountain_rescue (25), nearest_hospital
(20), tourist_helpline (13), police_address (12), local_police_station (7), embassy_emergency_line (5),
police (5), women_helpline (2), english_speaking_doctor (1).

## tourist_helpline (13 distinct) — fully audited
- CORRECT (already double-verified in the confidence_cards purge): Gujarat `1800-200-5252`→`1800-203-1111` (×31),
  Maharashtra `1800-599-0019`→`1800-267-1975` (×15), Jharkhand `0651-2400073`→`0651-2331828` (×1).
- MP `1800-233-3333` (unverifiable) → `1800-233-7777` (MP's verified helpline, mpstdc.com) on MP dests (×3).
- Goa carried the misattributed MP number `1800-233-7777` → corrected to Goa's official `1364` (goatourism.gov.in) (×8).
- Unverifiable state numbers (`1800-425-5555` Karnataka, `1800-233-3333` Jharkhand/Rajasthan, `1800-425-1111`,
  `1800-180-1116`, `1800-345-3006`, `0260-264-2222`, `0413-2336025`) → national MoT helpline `1800-111-363`
  (the column's existing national-fallback convention) (×14).
- KEPT verified: national `1800-111-363` (248), MP `1800-233-7777`, A&N `03192-232694`, Lakshadweep `04896-262258`.
- Result: 0 fabricated tourist_helpline numbers remain.

## rescue_contact + mountain_rescue + nearest_hospital — adversarial workflow (wf_f1f08a66-701, 22 Haiku agents)
560 landline/mobile verdicts: **266 confirmed · 276 unverifiable(plausible) · 16 wrong · 2 fabricated.**
This data is GENUINE district research (3.2% problematic vs confidence_cards' 80% fake) — so the bar was
"remove demonstrable fabrications, KEEP verified+plausible" (national short codes always render anyway, so a
dropped landline never creates a safety gap). Dropping 276 plausible-real district numbers would have gutted a
working feature with zero integrity justification.

### ⚠️ KEY LESSON — the agent "wrong"/"fabricated" verdicts had a HIGH false-positive rate
Independently verifying every proposed change against the ACTUAL DB value + official sources caught:
- `rajgir`, `bodh-gaya`, `chandigarh`: flagged numbers **don't exist** in the DB (hallucinations) → no change.
- `1800-425-3077` (Tirupati ×6): flagged "wrong" but is the **real** AP Collectorate Control Room toll-free
  (on many .ap.gov.in helpline pages) → reverted.
- `040-24745243` ("Blood Bank" ×2): flagged "wrong" but is a **real** Hyderabad blood bank (Lions Club Bhanji
  Kheraj) → reverted.
- `unakoti` `03824-222147`: flagged "wrong" but is the **correct** official EOC (unakoti.nic.in) → no change.
- `warangal` proposed "correction" `080-…` was a Bangalore STD for a Telangana control room → rejected.
- `sundarbans` `03218-255280`: agent wanted `256159`, but `255280` was double-verified in the SOS recorrect → held.

### Net genuine changes applied (each independently verified vs official source)
- CORRECT `har-ki-doon` `01374-226126`→`01374-222722` (DDMA Uttarkashi; corroborated by a 2nd agent + ddmauttarkashi.in).
- CORRECT `kolhapur` `0231-2545473`/`0231-2659232`→`0231-2662333` (kolhapurpolice.gov.in).
- CORRECT `kalimpong` `03552-256942`→`03552-255264` (kalimpong.gov.in DM office).
- DROP `ravangla` `03595-2607827` "Fire Ravangla" (malformed/undialable digit count; kept the 3 valid Namchi numbers).
- CORRECT `police` `0260-264-2222`→`0260-2642033` (Daman police, ddd.gov.in, double-verified).

## local_helpers — schema-bug survivors from PR #24
PR #24's purge filtered only the `phone` key, so older entries using the `contact` key with fabricated numbers
survived. Found exactly 2: `0141-5110598` "Rajasthan Tourism" (×3: gagron-fort/ranakpur/sariska) and
`0651-2400073` "Jharkhand Tourism" (shikharji — the correct `0651-2331828` already existed alongside it).
Removed both (filter now keys on `phone` AND `contact`). Every other local_helpers number resolved to a verified
keep (the SOS-recorrect numbers + the `+91`-prefixed variants of the keep-18).

## Minor columns — spot-checked, genuine
embassy_emergency_line (US/UK/Australia/Canada Delhi missions — real), local_police_station (J&K P/S with correct
STDs), police_address (Arunachal district police — sequential OC/Duty/Women-PS extensions are normal), mountain_rescue
(ABVIMAS Manali — the real official rescue institute; wildlife wardens with correct Kerala/AP STDs), women_helpline
(1091 + real landlines). No fabrications.

## Result
emergency_sos contains no provably-fabricated number. tourist_helpline 0 fakes; rescue/mtn/hosp genuine + 4 verified
fixes; local_helpers contact-key fakes removed; police 1 fix. Plausible-but-unconfirmable district numbers KEPT
(they are genuine research, not fabrication, and national short codes always render). All 4 phone surfaces
(confidence_cards.emergency, confidence_cards.people_who_help, emergency_sos.local_helpers + structured columns,
destinations.deep_dive) are now clean.
