# Freshness review — 2026-11-18

Batch picked: 2026-11-17T20:00:09Z · 1 destination · run completed 2026-11-18

## Results

| id | verdict | sources | what was checked |
|----|---------|---------|-----------------|
| basara | needs_correction (notice_text renewal) | [Deccan Chronicle 5 Jul 2026](https://www.deccanchronicle.com/southern-states/telangana/basar-temple-shifts-darshan-to-balalayam-for-redevelopment-works-1968593) · [The Hans India 1 Nov 2026](https://www.thehansindia.com/news/cities/adilabad/ritual-marks-beginning-of-gnana-saraswati-temple-reconstruction-at-basara-1138003) | notice_text expires 2026-11-18; temple closure confirmed still in force (construction commenced 1 Nov 2026, no reopening announced); darshan at Balalayam confirmed active through Navaratri (13 Oct 2026); no road closures or flooding in Oct–Nov 2026; Nanded Airport (Star Air) and Mudkhed railhead both operating normally; no permit changes |

## Corrections

### basara — notice_text renewal

**Field:** `notice_text` (and `notice_source_url`)

**Current:** "The main sanctum (garbhagriha) of Gnana Saraswati Temple has been closed since 5 July 2026 for a Rs 354-crore redevelopment expected to take about two years. Darshan continues at the temporary Balalayam on site."

**Proposed:** Same wording (renewal for 21 days)

**Source:** https://www.thehansindia.com/news/cities/adilabad/ritual-marks-beginning-of-gnana-saraswati-temple-reconstruction-at-basara-1138003
> "Special Vedic rituals were performed for the Krishna Shila (black stone) selected for the sanctum sanctorum" — 1 November 2026, confirming physical reconstruction is actively underway. No reopening date announced; two-year estimate from July 2026 remains in force.

**Rationale:** The notice expires today. The closure is confirmed still in force by a source dated 17 days ago (within the 3-week window). Same wording retained as it accurately describes visitor impact. `notice_source_url` updated to the more recent Hans India article.

## Skipped

None — all 1 destination in the batch is accounted for.

## Validator output

```
would queue basara: notice_text [renewal, same text]; notice_source_url → thehansindia.com article
RESULT stamped=0 valid=0 corrections=1 queued=0 queueable=1 escalated=0 dropped=0 unreviewed=0
```

## Wrapper outcome

```
queued basara: notice_text "The main sanctum (garbhagriha) of Gnana Saraswati Temple has been closed since 5 July 2026 for a Rs 354-crore redevelopment expected to take about two years. Darshan continues at the temporary Balalayam on site." → "The main sanctum (garbhagriha) of Gnana Saraswati Temple has been closed since 5 July 2026 for a Rs 354-crore redevelopment expected to take about two years. Darshan continues at the temporary Balalayam on site."; notice_source_url "https://www.deccanchronicle.com/southern-states/telangana/basar-temple-shifts-darshan-to-balalayam-for-redevelopment-works-1968593" → "https://www.thehansindia.com/news/cities/adilabad/ritual-marks-beginning-of-gnana-saraswati-temple-reconstruction-at-basara-1138003"
stamped 0: 
RESULT stamped=0 valid=0 corrections=1 queued=1 queueable=1 escalated=0 dropped=0 unreviewed=0
```
