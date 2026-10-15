#!/usr/bin/env node
/**
 * snow-outlook-selftest.mjs — offline tests for the snow outlook's honesty rules.
 *   node scripts/snow-outlook-selftest.mjs        (exit 1 on any failure)
 *
 * Every case below is a failure the 2026-10-16 review found or one we hit while
 * building. If one of these ever passes wrongly, the site or a reel overclaims.
 */
import { snowSentences, issueDate, imdForPoint, sentenceDates } from "./_lib/imd-bulletins.mjs";
import { namesPlace } from "./_lib/snow-districts.mjs";
import { dailyByModel, dayVotes, outlookFor } from "./_lib/snow-engine.mjs";

let fail = 0;
const t = (name, got, want) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (!ok) fail++;
  console.log(`${ok ? "ok  " : "FAIL"} ${name}${ok ? "" : `  got=${JSON.stringify(got)} want=${JSON.stringify(want)}`}`);
};

// IMD sentences: negations and titles are not forecasts.
t("negation: no snowfall", snowSentences("No snowfall is likely during the next 5 days.").length, 0);
t("negation: not likely", snowSentences("Rain/snow is not likely over the state during next 3 days.").length, 0);
t("negation: decrease", snowSentences("Snowfall activity is likely to decrease from 17th October 2026.").length, 0);
t("title is not a forecast", snowSentences("Impact Based Forecast for Heavy rainfall / Snowfall Warnings over J&K (District wise) likely.").length, 0);
t("past weather is not a forecast", snowSentences("Light snowfall at isolated places was observed over the state during past 24 hours, likely.").length, 0);
t("real forecast kept", snowSentences("Light rain/snow likely at isolated places over the state on 16th and 17th October 2026.").length, 1);
t("PDF bullet glyph stripped", snowSentences(" Very light to light rain/ snowfall likely at isolated places in Chamoli district.")[0]?.text.startsWith("Very"), true);

// Dates in sentences.
t("dates: 16th and 17th October 2026", sentenceDates("on 16th and 17th October 2026", 2026), ["2026-10-16", "2026-10-17"]);
t("dates: numeric table dates ignored (cell bleed)", sentenceDates("valid 18.10.2026", 2026), []);
t("dates: 17/18 October", sentenceDates("on 17/18 October", 2026), ["2026-10-17", "2026-10-18"]);
t("negation only near snow", snowSentences("Light snowfall likely over Lahaul-Spiti on 17th October 2026 with no large change in temperatures.").length, 1);

// Issue date: explicit label beats weekday table; old letterhead date loses to the real one.
t("issue: Srinagar letterhead", issueDate("Report Dated 29.10.2024 ... Dated: 15-10-2026 Time of issue", "2026-10-16"), "2026-10-15");
t("issue: weekday table does not make an old bulletin fresh", issueDate("Bulletin. Saturday 11-10-2026 Sunday 12-10-2026 Wednesday 15-10-2026", "2026-10-16"), "2026-10-11");
t("issue: Gangtok header", issueDate("Weather Forecast Bulletin | Thursday, 15th October 2026 ... FRI, OCT 16, 2026", "2026-10-16"), "2026-10-15");

// Per-point IMD verdict.
const bulletins = { "himachal-pradesh": { centre: "IMD Shimla", url: "https://x/shimla.pdf", issued: "2026-10-15", fresh: true, sentences: [
  { text: "Light to moderate rain/snow likely at many places over the state on 15th October 2026.", dates: ["2026-10-15"] },
  { text: "Light snow likely at isolated places in Lahaul & Spiti on 17th October 2026.", dates: ["2026-10-17"] },
] } };
const win = { window_start: "2026-10-16", window_end: "2026-10-18" };
t("agrees: Sissu, Lahaul named + date in window", imdForPoint({ id: "sissu", region_id: "himachal-pradesh" }, win, bulletins).status, "agrees");
t("not agrees: Shimla from a Lahaul-only line", imdForPoint({ id: "shimla", region_id: "himachal-pradesh" }, win, bulletins).status !== "agrees", true);
t("not agrees: yesterday's state-wide line", imdForPoint({ id: "kufri", region_id: "himachal-pradesh" }, { window_start: "2026-10-18", window_end: "2026-10-19" }, bulletins).status !== "agrees", true);
const uk = { uttarakhand: { centre: "IMD Dehradun", url: "https://x/d.pdf", issued: "2026-10-15", fresh: true, sentences: [
  { text: "Light rain/snowfall (at places with the elevation of 3800 meter and above) likely in Chamoli district on 17th October 2026.", dates: ["2026-10-17"] },
] } };
t("altitude floor: Joshimath 1,875 m is not 'agrees'", imdForPoint({ id: "joshimath", region_id: "uttarakhand", elevation_m: 1875 }, win, uk).status, "mentions");
t("altitude floor: Hemkund 4,633 m agrees", imdForPoint({ id: "hemkund-sahib", region_id: "uttarakhand", elevation_m: 4633 }, win, uk).status, "agrees");
const hr = { "himachal-pradesh": { centre: "IMD Shimla", url: "https://x/s.pdf", issued: "2026-10-15", fresh: true, sentences: [
  { text: "Snowfall likely in higher reaches of Kullu and Chamba on 17th October 2026.", dates: ["2026-10-17"] }] } };
t("'higher reaches' never agrees for Manali", imdForPoint({ id: "manali", region_id: "himachal-pradesh", elevation_m: 2050 }, win, hr).status, "mentions");
t("stale bulletin", imdForPoint({ id: "sissu", region_id: "himachal-pradesh" }, win, { "himachal-pradesh": { ...bulletins["himachal-pradesh"], fresh: false } }).status, "stale");
t("no bulletin wired", imdForPoint({ id: "darjeeling", region_id: "west-bengal" }, win, bulletins).status, "not-covered");

// verify place matching.
t("Leh not in Manali–Leh", namesPlace("Manali–Leh highway closed by snow", "Leh"), false);
t("Kaza not in Manali-Kaza road", namesPlace("Manali-Kaza road shut by snowfall", "Kaza"), false);
t("Spiti not in Lahaul-Spiti", namesPlace("Lahaul-Spiti administration", "Spiti"), false);
t("Mana not in management", namesPlace("district disaster management", "Mana"), false);
t("Leh not in Leh-Manali road", namesPlace("Leh-Manali road closed by snow", "Leh"), false);
t("Lahaul in 'Lahaul-Spiti admin'", namesPlace("Lahaul-Spiti admin closes roads after snow", "Lahaul"), true);
t("Gulmarg in 'Gulmarg—Affarwat'", namesPlace("Gulmarg—Affarwat got fresh snow", "Gulmarg"), true);
t("Keylong matches", namesPlace("Keylong received 3 cm of snow", "Keylong"), true);

// Engine: hours already gone today are not forecast.
const hours = Array.from({ length: 48 }, (_, i) => `2026-10-16T${String(i % 24).padStart(2, "0")}:00`.replace("2026-10-16", i < 24 ? "2026-10-16" : "2026-10-17"));
const snowMorning = (i) => (i < 9 ? 1 : 0); // 9 mm of snow before 09:00 on the 16th, then dry
const models = Object.fromEntries(["ecmwf_ifs025", "gfs_seamless", "icon_seamless", "gem_seamless", "ukmo_seamless", "meteofrance_seamless"]
  .map((m) => [m, { p: hours.map((_, i) => snowMorning(i)), t: hours.map(() => -2) }]));
const series = { time: hours, models };
t("morning snow counted from midnight", outlookFor(dayVotes(dailyByModel(series)), "2026-10-16")?.confidence, "likely");
t("morning snow NOT forecast by a 17:00 run", outlookFor(dayVotes(dailyByModel(series, undefined, "2026-10-16T17:00")), "2026-10-16"), null);

console.log(fail ? `\n${fail} FAILED` : "\nall passed");
process.exit(fail ? 1 : 0);
