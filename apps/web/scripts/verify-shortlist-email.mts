/**
 * verify-shortlist-email.mts — render the month-shortlist email and assert it
 * actually contains the data. RENDER ONLY: nothing is ever sent from here.
 *
 * WHY THIS EXISTS
 * ---------------
 * The shortlist email is now the entire payoff of the capture offer — someone
 * hands over an email specifically to receive it. A template that compiles but
 * renders an empty list, or drops a state, or leaks "undefined" into the body,
 * would fail silently and invisibly: the subscriber row still gets written, the
 * route still returns ok, and the only person who sees the broken email is the
 * reader we just asked to trust us.
 *
 * That is the same failure shape as the 2026-06-10 confidence_cards incident
 * (data written, renderer not null-safe, nobody checked the rendered output) —
 * so this checks the RENDERED artefact, not the data.
 *
 * USAGE
 *   cd apps/web && npx tsx scripts/verify-shortlist-email.mts
 *   Writes a previewable HTML file so the result can be eyeballed in a browser.
 */
import { render } from "@react-email/render";
import { writeFileSync } from "node:fs";
import * as MonthShortlistMod from "../src/emails/month-shortlist.js";
import shortlist from "../src/data/month-shortlist.json" with { type: "json" };

// Interop: under tsx this TSX module arrives DOUBLE-wrapped — the namespace has
// a `default` which itself has a `default` holding the component. Unwrap until
// we reach a function rather than guessing a fixed depth.
function unwrapDefault(mod: unknown, depth = 5): unknown {
  let cur = mod;
  for (let i = 0; i < depth && typeof cur !== "function"; i++) {
    if (cur && typeof cur === "object" && "default" in cur) {
      cur = (cur as { default: unknown }).default;
    } else break;
  }
  return cur;
}

const MonthShortlist = unwrapDefault(MonthShortlistMod) as
  | ((props: Record<string, unknown>) => React.ReactElement)
  | undefined;

if (typeof MonthShortlist !== "function") {
  console.error("✗ could not resolve the MonthShortlist component from its module export");
  process.exit(1);
}

const OUT = "/tmp/nakshiq-shortlist-email.html";

type Dest = { id: string; name: string; tagline: string | null };
type State = { state: string; destinations: Dest[] };

// The data file carries all 12 months (2026-10-10); MONTH=1..12 picks one, default = current IST month.
const raw = shortlist as unknown as {
  destinations: Record<string, { name: string; tagline: string | null; state: string }>;
  months: Record<string, {
    monthLong: string;
    monthSlug: string;
    totals: { destinations: number; atTheirBest: number; inAMonthToAvoid: number; listed: number };
    top: { id: string; score: number }[];
  }>;
};
const monthNum = Number(process.env.MONTH) ||
  Number(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata", month: "numeric" }));
const picked = raw.months[String(monthNum)];
const { monthLong, monthSlug, totals } = picked;
const top = picked.top.map(({ id }) => ({ id, ...raw.destinations[id] }));

const html = await render(MonthShortlist({ monthLong, monthSlug, totals, top }));
writeFileSync(OUT, html);

const names = top.map((d) => d.name);
const linkCount = (html.match(/https:\/\/www\.nakshiq\.com\/en\/destination\//g) ?? []).length;

/**
 * Present-in-HTML test that accounts for entity escaping. A naive
 * `html.includes(name)` reports a FALSE FAILURE for anything containing `&`,
 * `'` or `"` — "Jammu & Kashmir" and "Mount Kailash & Mansarovar" both render
 * correctly as `&amp;` and would otherwise look like dropped rows. Escaping is
 * the CORRECT behaviour here, so the check has to match on the escaped form.
 */
const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
   .replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
const rendered = (s: string) => html.includes(s) || html.includes(escapeHtml(s));

const missingNames = names.filter((n) => !rendered(n));
const missingStates = top.map((d) => d.state).filter((s) => !rendered(s));

const checks: [string, boolean][] = [
  ["renders non-trivial HTML", html.length > 2000],
  [`month "${monthLong}" present`, html.includes(monthLong)],
  [`listed count ${totals.listed} present`, html.includes(String(totals.listed))],
  [`avoid count ${totals.inAMonthToAvoid} present`, html.includes(String(totals.inAMonthToAvoid))],
  [`total ${totals.destinations} present`, html.includes(String(totals.destinations))],
  [`all ${names.length} destination names rendered`, missingNames.length === 0],
  [`all ${top.length} state labels rendered`, missingStates.length === 0],
  [`exactly 10 picks`, top.length === 10],
  [`no state more than twice`, Object.values(top.reduce((a: Record<string, number>, d) => ({ ...a, [d.state]: (a[d.state] ?? 0) + 1 }), {})).every((n) => n <= 2)],
  [`links go to the ${monthSlug} pages`, (html.match(new RegExp(`/en/destination/[a-z0-9-]+/${monthSlug}"`, "g")) ?? []).length === top.length],
  [`full-month link present`, html.includes(`/en/where-to-go/${monthSlug}`)],
  [`under Gmail's ~102 KB clip`, html.length < 100_000],
  [`one link per destination (${linkCount}/${names.length})`, linkCount === names.length],
  ["no undefined/null leaked into the body", !/>\s*(undefined|null)\s*</.test(html)],
  ["no [object Object]", !html.includes("[object Object]")],
  ["top list is not empty", names.length > 0],
];

let failed = 0;
for (const [label, ok] of checks) {
  if (!ok) failed++;
  console.log(`${ok ? "\x1b[32m✓\x1b[0m" : "\x1b[31m✗\x1b[0m"} ${label}`);
}
if (missingNames.length) console.error("  missing destinations:", missingNames);
if (missingStates.length) console.error("  missing states:", missingStates);

console.log(
  `\n${html.length} bytes · ${names.length} destinations` +
    `\npreview → ${OUT}`,
);

if (failed) {
  console.error(`\n✗ ${failed} check(s) failed — do NOT ship this email.`);
  process.exit(1);
}
console.log("\n✓ all checks passed");
