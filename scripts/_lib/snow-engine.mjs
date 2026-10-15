/**
 * snow-engine.mjs — the scoring core of the snow outlook, shared by the live
 * run (scripts/snow-outlook.mjs) and the backtest (scripts/snow-outlook-backtest.mjs)
 * so the numbers we publish come from exactly the code we tested.
 *
 * Source: Open-Meteo (CC-BY 4.0), six global models from six national weather
 * services. Free tier = non-commercial only: NakshIQ qualifies while it has no
 * ads and no paid subscription (membership is a waitlist, 2026-10-16). The day
 * either goes live, this needs Open-Meteo's commercial plan.
 *
 * Why we do NOT read the models' own `snowfall` field: at Sissu on 15 Oct 2026
 * (IMD measured 3-5 cm in the valley) every model's snowfall field read ~0,
 * because a 10-25 km model cell sits lower and warmer than the real valley.
 * Instead we pass the destination's true elevation (Open-Meteo lapse-rate
 * corrects temperature to it) and count precipitation falling at or below
 * SNOW_TEMP_C as snow. Backtested in scripts/snow-outlook-backtest.mjs.
 */

export const MODELS = [
  { id: "ecmwf_ifs025", label: "ECMWF (Europe)" },
  { id: "gfs_seamless", label: "NOAA GFS (USA)" },
  { id: "icon_seamless", label: "DWD ICON (Germany)" },
  { id: "gem_seamless", label: "GEM (Canada)" },
  { id: "ukmo_seamless", label: "Met Office (UK)" },
  { id: "meteofrance_seamless", label: "Météo-France ARPEGE" },
];

// Tuned by the backtest; change them only with a backtest run that shows why.
export const SNOW_TEMP_C = 1.0;   // precipitation at <= this 2 m temperature counts as snow
export const VOTE_MM = 2.0;       // a model "votes snow" for a day at >= 2 mm water (~2 cm snow)
export const LIKELY_RATIO = 0.66; // >= 2/3 of models agree -> "likely"
export const POSSIBLE_RATIO = 0.5; // >= half -> "possible"
export const MIN_MODELS = 4;      // fewer models answering than this -> no outlook at all
export const HORIZON_DAYS = 4;    // today + 3

const LIVE = "https://api.open-meteo.com/v1/forecast";
const PREV = "https://previous-runs-api.open-meteo.com/v1/forecast";
const UA = { "User-Agent": "NakshIQ-snow-outlook/1.0 (+https://www.nakshiq.com/en/road-conditions)" };

// Free tier: 600 weighted calls/minute. A 20-point x 6-model batch is weighted
// heavily, so a 429 means "wait out the minute", not "fail".
async function getJSON(url, tries = 5) {
  let last;
  for (let i = 0; i < tries; i++) {
    let wait = 2000 * (i + 1);
    try {
      const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(60_000) });
      if (r.ok) return await r.json();
      last = new Error(`HTTP ${r.status} ${(await r.text()).slice(0, 200)}`);
      if (r.status === 429) wait = 65_000;
    } catch (e) { last = e; }
    await new Promise((res) => setTimeout(res, wait));
  }
  throw last;
}

function chunk(arr, n) { const out = []; for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n)); return out; }

/**
 * Fetch hourly precipitation + temperature for every point and model.
 * opts.lead: undefined -> live forecast; N -> the run issued N days before each hour (backtest).
 * Returns Map<pointId, { time: string[], models: { [modelId]: { p: number[], t: number[] } } }>
 */
export async function fetchHourly(points, opts = {}) {
  const out = new Map();
  const modelIds = MODELS.map((m) => m.id).join(",");
  const sfx = opts.lead ? `_previous_day${opts.lead}` : "";
  for (const batch of chunk(points, 20)) {
    const q = new URLSearchParams({
      latitude: batch.map((p) => p.lat).join(","),
      longitude: batch.map((p) => p.lng).join(","),
      elevation: batch.map((p) => p.elevation_m).join(","),
      hourly: `precipitation${sfx},temperature_2m${sfx}`,
      models: modelIds,
      timezone: "Asia/Kolkata",
    });
    if (opts.start) { q.set("start_date", opts.start); q.set("end_date", opts.end); }
    else q.set("forecast_days", String(HORIZON_DAYS));
    const json = await getJSON(`${opts.lead ? PREV : LIVE}?${q}`);
    const arr = Array.isArray(json) ? json : [json];
    arr.forEach((loc, i) => {
      const h = loc.hourly ?? {};
      const models = {};
      for (const m of MODELS) {
        const p = h[`precipitation${sfx}_${m.id}`];
        const t = h[`temperature_2m${sfx}_${m.id}`];
        if (Array.isArray(p) && Array.isArray(t)) models[m.id] = { p, t };
      }
      out.set(batch[i].id, { time: h.time ?? [], models });
    });
  }
  return out;
}

/**
 * Per IST day, per model: precip, snow-water and min temperature.
 * fromTs ("YYYY-MM-DDTHH:00", IST): hours before it are ignored, so a 17:00 run
 * never "forecasts" snow that fell (or didn't) at 09:00 the same day (review 2026-10-16).
 */
export function dailyByModel(series, snowTemp = SNOW_TEMP_C, fromTs = null) {
  const days = {}; // day -> modelId -> {precip, snow, minT, n}
  const expected = {}; // day -> hours on offer after fromTs
  series.time.forEach((ts, i) => {
    if (fromTs && ts < fromTs) return;
    const day = ts.slice(0, 10);
    expected[day] = (expected[day] ?? 0) + 1;
    for (const [mid, { p, t }] of Object.entries(series.models)) {
      const pv = p[i], tv = t[i];
      if (pv == null || tv == null) continue;
      const d = ((days[day] ??= {})[mid] ??= { precip: 0, snow: 0, minT: 99, n: 0 });
      d.precip += pv; d.n += 1;
      if (tv <= snowTemp) d.snow += pv;
      if (tv < d.minT) d.minT = tv;
    }
  });
  // A model that answered for under 3/4 of the hours on offer has not really answered for that day;
  // a day with fewer than 6 hours left is not scored at all.
  for (const day of Object.keys(days)) {
    if (expected[day] < 6) { delete days[day]; continue; }
    for (const mid of Object.keys(days[day])) if (days[day][mid].n < 0.75 * expected[day]) delete days[day][mid];
  }
  return days;
}

/** "YYYY-MM-DDTHH:00" for now in IST: the fromTs for a live run. */
export function istNowHour() {
  return new Date(Date.now() + 5.5 * 3600_000).toISOString().slice(0, 13) + ":00";
}

/** Agreement per day: { day: { votes, total, ratio, detail[] } } */
export function dayVotes(daily, voteMm = VOTE_MM) {
  const res = {};
  for (const [day, byModel] of Object.entries(daily)) {
    const detail = MODELS.filter((m) => byModel[m.id]).map((m) => {
      const d = byModel[m.id];
      return { id: m.id, label: m.label, snow_mm: +d.snow.toFixed(1), precip_mm: +d.precip.toFixed(1), min_temp_c: +d.minT.toFixed(1), vote: d.snow >= voteMm };
    });
    const votes = detail.filter((d) => d.vote).length;
    res[day] = { votes, total: detail.length, ratio: detail.length ? votes / detail.length : 0, detail };
  }
  return res;
}

export function levelFor(v, likely = LIKELY_RATIO, possible = POSSIBLE_RATIO) {
  if (!v || v.total < MIN_MODELS) return null;
  if (v.ratio >= likely) return "likely";
  if (v.ratio >= possible) return "possible";
  return null;
}

/**
 * Turn per-day votes into one outlook for a point, over [fromDay, fromDay+HORIZON-1].
 * Returns null when no day reaches "possible".
 */
export function outlookFor(votes, fromDay) {
  const days = Object.keys(votes).filter((d) => d >= fromDay).sort().slice(0, HORIZON_DAYS);
  const hit = days.filter((d) => levelFor(votes[d]));
  if (!hit.length) return null;
  const peak = hit.reduce((a, b) => (votes[b].ratio > votes[a].ratio || (votes[b].ratio === votes[a].ratio && sumSnow(votes[b]) > sumSnow(votes[a])) ? b : a));
  const confidence = hit.some((d) => levelFor(votes[d]) === "likely") ? "likely" : "possible";
  const pv = votes[peak];
  // Amount: each model that votes on the peak day, summed over the whole window.
  const agreeing = pv.detail.filter((d) => d.vote).map((d) => d.id);
  const totals = agreeing.map((id) => hit.reduce((s, d) => s + (votes[d].detail.find((x) => x.id === id)?.snow_mm ?? 0), 0));
  const detail = MODELS.map((m) => {
    const per = hit.map((d) => votes[d].detail.find((x) => x.id === m.id)).filter(Boolean);
    if (!per.length) return null;
    return {
      id: m.id, label: m.label,
      snow_mm: +per.reduce((s, x) => s + x.snow_mm, 0).toFixed(1),
      precip_mm: +per.reduce((s, x) => s + x.precip_mm, 0).toFixed(1),
      min_temp_c: Math.min(...per.map((x) => x.min_temp_c)),
      vote: agreeing.includes(m.id),
    };
  }).filter(Boolean);
  return {
    window_start: hit[0], window_end: hit[hit.length - 1], peak_date: peak, confidence,
    models_agree: pv.votes, models_total: pv.total,
    // ~10:1 snow-to-water. Rounded to whole cm: the models cannot honestly do better.
    snow_cm_low: totals.length ? Math.round(Math.min(...totals)) : null,
    snow_cm_high: totals.length ? Math.round(Math.max(...totals)) : null,
    model_detail: detail,
  };
}

function sumSnow(v) { return v.detail.reduce((s, d) => s + (d.vote ? d.snow_mm : 0), 0); }

/** IST calendar date, optionally offset by n days. */
export function istDate(offsetDays = 0) {
  return new Date(Date.now() + 5.5 * 3600_000 + offsetDays * 86400_000).toISOString().slice(0, 10);
}
export function addDays(iso, n) {
  const d = new Date(iso + "T00:00:00Z"); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10);
}
