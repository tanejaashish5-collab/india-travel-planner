#!/usr/bin/env node
/**
 * adversarial-ui-verify.mjs — adversarial verification of NakshIQ's interactive
 * surfaces AGAINST PRODUCTION, verifying the EFFECT (DB row, confirmed_at,
 * non-empty payload), never just the UI's success state.
 *
 * Born 2026-08-23 from three independent corroborations of the same failure
 * class (Herk study #12, TLDR 08-05 computer-use-verification, Skool corpus
 * voice agents saying "cancelled" while the calendar is unchanged): a UI that
 * reports success is not evidence the effect happened. The existing e2e
 * conversion suite STUBS /api/newsletter/subscribe — this script is the
 * unstubbed counterpart.
 *
 * Run:  node --env-file=apps/web/.env.local scripts/adversarial-ui-verify.mjs
 *
 * What it does, and why it's safe to run against prod:
 * - All HTTP goes through a real Chromium page (Vercel firewall 403s bare curl).
 * - Writes use TEST_EMAIL (founder's +advtest alias) and a marker string; every
 *   row it creates is deleted at the end (path-scoped deletes on TEST_EMAIL /
 *   marker only). The newsletter test row is confirmed then deleted in the same
 *   run so it can NEVER contaminate the pre-registered Northstar count.
 * - It DOES send real emails (confirmation + saved-alert + contact-suggestion
 *   admin note) — all to the founder's own inboxes. That is the point: proof
 *   of delivery, not a stub.
 */

import { chromium } from "@playwright/test";
import { createClient } from "@supabase/supabase-js";

const BASE = "https://www.nakshiq.com";
const TEST_EMAIL = "taneja.ashish5+advtest@gmail.com";
const MARKER = "ADVERSARIAL-VERIFY test row — safe to delete";
const HP_MARKER = "ADVERSARIAL-VERIFY-HONEYPOT — this row must never exist";

const SUPA_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPA_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPA_URL || !SUPA_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY — run with --env-file=apps/web/.env.local");
  process.exit(2);
}
const db = createClient(SUPA_URL, SUPA_KEY);

const results = [];
function record(surface, check, status, note = "") {
  results.push({ surface, check, status, note });
  const icon = status === "PASS" ? "✅" : status === "FLAG" ? "🟡" : "❌";
  console.log(`${icon} [${surface}] ${check}${note ? ` — ${note}` : ""}`);
}

/** In-page fetch so every request carries a real browser fingerprint. */
async function apiFetch(page, path, init) {
  return page.evaluate(
    async ({ path, init }) => {
      const res = await fetch(path, init);
      const text = await res.text();
      let json = null;
      try { json = JSON.parse(text); } catch { /* html or plain text */ }
      return { status: res.status, contentType: res.headers.get("content-type") || "", text, json };
    },
    { path, init },
  );
}

function post(body) {
  return { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) };
}

/**
 * Isolate each section: one surface crashing must not abort the rest of the
 * pass (v1 lost sections 5-7 to a single click timeout, silently).
 */
async function section(name, fn) {
  try { await fn(); }
  catch (e) { record(name, "section crashed", "FAIL", String(e?.message || e).slice(0, 200)); }
}

const deepText = (v) => JSON.stringify(v ?? "");
function textLeaks(v) {
  const s = deepText(v);
  return ["undefined", '"null"', "NaN", "[object Object]"].filter((leak) => s.includes(leak));
}

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  // Same overlay-dismissal seeds the e2e config uses — tour/quiz/PWA prompts
  // otherwise intercept pointer events on every page.
  await context.addInitScript(() => {
    try {
      localStorage.setItem("quizSeen", "true");
      localStorage.setItem("pwa-install-dismissed", "9999999999999");
      localStorage.setItem("nakshiq_tour_v2", "dismissed");
    } catch {}
  });
  const page = await context.newPage();

  try {
    // ── 0. Reachability ────────────────────────────────────────────────────
    const resp = await page.goto(`${BASE}/en`, { waitUntil: "domcontentloaded", timeout: 45_000 });
    if (!resp || resp.status() !== 200) {
      record("prod", "homepage reachable", "FAIL", `status ${resp?.status()}`);
      throw new Error("prod unreachable — aborting");
    }
    record("prod", "homepage reachable", "PASS");

    // ── 1. Search index (feeds all 3 search surfaces) ─────────────────────
    await section("search-index", async () => {
      const r = await apiFetch(page, "/api/search-index", { method: "GET" });
      let count = 0;
      if (Array.isArray(r.json)) count = r.json.length;
      else if (r.json && typeof r.json === "object")
        count = Object.values(r.json).filter(Array.isArray).reduce((n, a) => n + a.length, 0);
      if (r.status === 200 && count >= 400) record("search-index", `non-empty (${count} entries)`, "PASS");
      else record("search-index", "non-empty", "FAIL", `status ${r.status}, count ${count}`);
    });

    // ── 2. Itinerary — the 107-days-of-empty-200s scar ────────────────────
    await section("itinerary", async () => {
      const r = await apiFetch(page, "/api/itinerary", post({ month: 11, days: 5, travelerType: "family" }));
      const it = r.json?.itinerary;
      const days = it?.days;
      const leaks = textLeaks(it);
      const daysOk = Array.isArray(days) && days.length === 5 &&
        days.every((d) => d && Object.values(d).filter((v) => typeof v === "string" && v.trim().length > 0).length >= 4);
      if (r.status === 200 && daysOk && leaks.length === 0 && (it.title || "").length > 10)
        record("itinerary", "happy path: 5 real days, no string leaks", "PASS");
      else
        record("itinerary", "happy path", "FAIL", `status ${r.status}, days ${days?.length}, leaks [${leaks}]`);

      const bad1 = await apiFetch(page, "/api/itinerary", post({ month: 13, days: 5, travelerType: "solo" }));
      record("itinerary", "month=13 rejected", bad1.status === 400 ? "PASS" : "FAIL", `status ${bad1.status}`);
      const bad2 = await apiFetch(page, "/api/itinerary", post({ month: 5, days: 0, travelerType: "solo" }));
      record("itinerary", "days=0 rejected", bad2.status === 400 ? "PASS" : "FAIL", `status ${bad2.status}`);

      // Unknown destination ids: does it 200 with pure filler? (empty-200 class)
      const ghost = await apiFetch(page, "/api/itinerary", post({ month: 5, days: 3, travelerType: "solo", destinationIds: ["zz-not-a-real-destination-zz"] }));
      const ghostDays = ghost.json?.itinerary?.days ?? [];
      const looksGeneric = ghostDays.length > 0 && deepText(ghostDays).includes("Pause for chai");
      if (ghost.status >= 400) record("itinerary", "unknown destinationIds rejected", "PASS", `status ${ghost.status}`);
      else if (looksGeneric) record("itinerary", "unknown destinationIds → 200 with generic filler days", "FLAG", "empty-200 class: caller asked for a specific place, got placeholder content");
      else record("itinerary", "unknown destinationIds behaviour", "FLAG", `status ${ghost.status}, days ${ghostDays.length}`);
    });

    // ── 3. Newsletter — full funnel, REAL, then cleaned up ────────────────
    await section("newsletter", async () => {
      // Pre-clean any leftover from an earlier run so insert-vs-update is known.
      await db.from("newsletter_subscribers").delete().eq("email", TEST_EMAIL);

      // Real UI submit (cinematic form, /en/explore).
      await page.goto(`${BASE}/en/explore`, { waitUntil: "domcontentloaded", timeout: 45_000 });
      const input = page.locator('input[aria-label="Email address"]').first();
      await input.click({ timeout: 20_000 }); // auto-waits + scrolls; scrollIntoViewIfNeeded races React re-renders
      await input.pressSequentially(TEST_EMAIL, { delay: 15 });
      await input.press("Enter");
      // Subscribe route awaits Resend sends before responding — allow a slow
      // cold path. Two components own this surface with different success copy:
      // cinematic-newsletter says "Almost there…", newsletter-signup (the
      // /en/explore instance) says "shortlist is on its way… confirmation link".
      const success = page.getByText(/almost there|on its way to|check your inbox/i).first();
      let uiOk = true;
      let uiNote = "";
      try { await success.waitFor({ state: "visible", timeout: 35_000 }); }
      catch {
        uiOk = false;
        // Diagnose: what does the form region actually show, and did the
        // component think it submitted (sessionStorage sentinel)?
        uiNote = await page.evaluate(() => {
          const sentinel = sessionStorage.getItem("nq_newsletter_submitted");
          const el = document.querySelector('input[aria-label="Email address"]');
          const region = el ? (el.closest("form")?.parentElement?.innerText || "input still present") : "input GONE";
          return `sentinel=${sentinel}; region="${region.slice(0, 160).replace(/\s+/g, " ")}"`;
        });
      }
      record("newsletter", "UI submit shows success state", uiOk ? "PASS" : "FAIL", uiNote);

      // EFFECT: row actually exists, correct source, unconfirmed.
      const { data: row } = await db
        .from("newsletter_subscribers")
        .select("id, email, source, tags, confirmed_at, confirmation_token")
        .eq("email", TEST_EMAIL)
        .maybeSingle();
      if (row && !row.confirmed_at && row.confirmation_token)
        record("newsletter", `DB row created (source=${row.source}, unconfirmed, token present)`, "PASS");
      else record("newsletter", "DB row created", "FAIL", row ? "row malformed" : "NO ROW — UI success was a lie");

      // EFFECT: confirm link actually confirms.
      if (row?.confirmation_token) {
        const conf = await apiFetch(page, `/api/newsletter/confirm?token=${row.confirmation_token}`, { method: "GET" });
        const { data: after } = await db
          .from("newsletter_subscribers").select("confirmed_at").eq("id", row.id).maybeSingle();
        if (conf.status === 200 && after?.confirmed_at)
          record("newsletter", "confirm link sets confirmed_at", "PASS");
        else record("newsletter", "confirm link sets confirmed_at", "FAIL", `status ${conf.status}, confirmed_at ${after?.confirmed_at}`);
      }

      // Fail-closed: bogus token must NOT confirm.
      const bogus = await apiFetch(page, "/api/newsletter/confirm?token=00000000-0000-0000-0000-000000000000", { method: "GET" });
      const bogusOk = !/confirmed|you're in|subscribed/i.test(bogus.text) || /invalid|expired|not find/i.test(bogus.text);
      record("newsletter", "bogus confirm token rejected", bogusOk ? "PASS" : "FAIL");

      // API rejects garbage email.
      const junk = await apiFetch(page, "/api/newsletter/subscribe", post({ email: "not-an-email" }));
      record("newsletter", "garbage email rejected", junk.status === 400 ? "PASS" : "FAIL", `status ${junk.status}`);

      // ADVERSARIAL UI: when the API is down, the form must show an error, not success.
      const page2 = await context.newPage();
      await page2.route("**/api/newsletter/subscribe", (route) => route.abort());
      await page2.goto(`${BASE}/en/explore`, { waitUntil: "domcontentloaded", timeout: 45_000 });
      const input2 = page2.locator('input[aria-label="Email address"]').first();
      await input2.click({ timeout: 20_000 });
      await input2.pressSequentially("failure-path@nakshiq.test", { delay: 15 });
      await input2.press("Enter");
      let honest = false;
      try {
        await page2.getByText(/network error|try again/i).first().waitFor({ state: "visible", timeout: 10_000 });
        honest = true;
      } catch {}
      const fakeSuccess = await page2.getByText(/almost there|on its way to|check your inbox/i).count();
      record("newsletter", "API failure shows ERROR in UI (not fake success)", honest && fakeSuccess === 0 ? "PASS" : "FAIL");
      await page2.close();
    });

    // ── 4. Destination alerts — subscribe → row → confirm → row ───────────
    await section("dest-alerts", async () => {
      await db.from("destination_alerts").delete().eq("email", TEST_EMAIL);
      const r = await apiFetch(page, "/api/destination-alerts/subscribe", post({ email: TEST_EMAIL, destination_id: "tungnath", source: "adversarial-verify" }));
      const { data: row } = await db
        .from("destination_alerts")
        .select("id, confirmation_token, confirmed_at, target_month_num")
        .eq("email", TEST_EMAIL).maybeSingle();
      if (r.status === 200 && row?.confirmation_token)
        record("dest-alerts", `subscribe creates row (peak month ${row.target_month_num})`, "PASS");
      else record("dest-alerts", "subscribe creates row", "FAIL", `status ${r.status}, row ${!!row}`);

      if (row?.confirmation_token) {
        await apiFetch(page, `/api/destination-alerts/confirm?token=${row.confirmation_token}`, { method: "GET" });
        const { data: after } = await db.from("destination_alerts").select("confirmed_at").eq("id", row.id).maybeSingle();
        record("dest-alerts", "confirm link sets confirmed_at", after?.confirmed_at ? "PASS" : "FAIL");
      }
      const ghost = await apiFetch(page, "/api/destination-alerts/subscribe", post({ email: TEST_EMAIL, destination_id: "zz-not-real-zz" }));
      record("dest-alerts", "unknown destination rejected", ghost.status === 404 || ghost.status === 422 ? "PASS" : "FAIL", `status ${ghost.status}`);
    });

    // ── 5. Save CTA — localStorage effect survives reload ─────────────────
    await section("save-cta", async () => {
      await page.goto(`${BASE}/en/destination/tungnath/may`, { waitUntil: "domcontentloaded", timeout: 45_000 });
      const hook = page.locator("section#section-alert");
      await hook.scrollIntoViewIfNeeded();
      await hook.getByRole("button", { name: /save tungnath/i }).click({ timeout: 10_000 });
      await hook.getByText(/saved to your shortlist/i).waitFor({ state: "visible", timeout: 8_000 });
      await page.reload({ waitUntil: "domcontentloaded" });
      const saved = await page.evaluate(() => {
        for (const k of ["savedDestinations", "nakshiq_saved"]) {
          try { const v = JSON.parse(localStorage.getItem(k) || "[]"); if (Array.isArray(v) && v.includes("tungnath")) return k; } catch {}
        }
        return null;
      });
      record("save-cta", "save persists in localStorage across reload", saved ? "PASS" : "FAIL", saved ? `key ${saved}` : "not found in either key");
    });

    // ── 6. Community forms — row lands, then deleted ──────────────────────
    await section("forms", async () => {
      const q = await apiFetch(page, "/api/questions", post({
        destination_id: "tungnath", category: "timing", traveler_type: "family",
        question: `${MARKER} — is early May still snow-free on the Tungnath trail for kids?`,
        submitter_email: TEST_EMAIL, hp: "",
      }));
      const { data: qRow } = await db.from("questions").select("id").eq("submitter_email", TEST_EMAIL).limit(1).maybeSingle();
      record("questions", "submit creates row", q.status === 200 && q.json?.ok && qRow ? "PASS" : "FAIL", `status ${q.status}, row ${!!qRow}`);
      const qBad = await apiFetch(page, "/api/questions", post({ destination_id: "tungnath", category: "bogus-cat", question: "x".repeat(40), hp: "" }));
      record("questions", "invalid category rejected", qBad.status === 400 ? "PASS" : "FAIL", `status ${qBad.status}`);

      const rv = await apiFetch(page, "/api/reviews", post({
        destination_id: "tungnath", rating: 5, traveler_type: "family",
        text: `${MARKER} — placeholder review body long enough to clear the fifty character minimum.`,
        reporter_email: TEST_EMAIL, hp: "",
      }));
      const { data: rvRow } = await db.from("reviews").select("id").eq("reporter_email", TEST_EMAIL).limit(1).maybeSingle();
      record("reviews", "submit creates row", rv.status === 200 && rvRow ? "PASS" : "FAIL", `status ${rv.status}, row ${!!rvRow}`);

      const tr = await apiFetch(page, "/api/trip-reports", post({
        destination_id: "tungnath", visited_month: 5, visited_year: 2026, rating: 5,
        summary: `${MARKER} summary`, reporter_email: TEST_EMAIL, hp: "",
        body: `${MARKER} — placeholder trip report body. `.repeat(4),
      }));
      const { data: trRow } = await db.from("trip_reports").select("id").eq("reporter_email", TEST_EMAIL).limit(1).maybeSingle();
      record("trip-reports", "submit creates row", tr.status === 200 && trRow ? "PASS" : "FAIL", `status ${tr.status}, row ${!!trRow}`);

      const sg = await apiFetch(page, "/api/suggestions", post({
        target_table: "contact", target_id: "adversarial-verify",
        message: `${MARKER} — contact-form path check, ignore this note.`,
        submitter_email: TEST_EMAIL, hp: "",
      }));
      const { data: sgRow } = await db.from("user_suggestions").select("id").eq("submitter_email", TEST_EMAIL).limit(1).maybeSingle();
      record("contact/suggestions", "submit creates row", sg.status === 200 && sgRow ? "PASS" : "FAIL", `status ${sg.status}, row ${!!sgRow}`);

      // Honeypot: API must SAY ok but write NOTHING.
      const hp = await apiFetch(page, "/api/suggestions", post({ target_table: "contact", message: HP_MARKER, hp: "gotcha" }));
      const { data: hpRows } = await db.from("user_suggestions").select("id").ilike("message", `%${HP_MARKER}%`);
      record("honeypot", "bot submit: fake ok, no row written", hp.json?.ok && (hpRows ?? []).length === 0 ? "PASS" : "FAIL", `ok ${hp.json?.ok}, rows ${(hpRows ?? []).length}`);

      const mb = await apiFetch(page, "/api/membership", post({ email: TEST_EMAIL, name: "Adversarial Verify", interest: "verification", hp: "" }));
      const { data: mbRow } = await db.from("membership_waitlist").select("id").eq("email", TEST_EMAIL).limit(1).maybeSingle();
      record("membership", "submit creates row", mb.status === 200 && mbRow ? "PASS" : "FAIL", `status ${mb.status}, row ${!!mbRow}`);
    });

    // ── 7. Quiz match ─────────────────────────────────────────────────────
    await section("quiz-match", async () => {
      const qm = await apiFetch(page, "/api/quiz-match", post({ group: "couple", duration: "week", priority: "nature", comfort: "mid", month: 11 }));
      const n = qm.json?.results?.length ?? 0;
      record("quiz-match", `returns matches (${n})`, qm.status === 200 && n > 0 ? "PASS" : "FAIL", `status ${qm.status}`);

      // /api/export-trip was removed 2026-08-23 (orphaned route, zero live
      // consumers) — its checks died with it.
    });
  } finally {
    // ── Cleanup: remove every row this run created (path-scoped) ──────────
    console.log("\n── cleanup ──");
    const targets = [
      ["newsletter_subscribers", "email"],
      ["destination_alerts", "email"],
      ["membership_waitlist", "email"],
      ["questions", "submitter_email"],
      ["reviews", "reporter_email"],
      ["trip_reports", "reporter_email"],
      ["user_suggestions", "submitter_email"],
    ];
    for (const [table, col] of targets) {
      const { error } = await db.from(table).delete().eq(col, TEST_EMAIL);
      const { count } = await db.from(table).select("*", { count: "exact", head: true }).eq(col, TEST_EMAIL);
      if (error || (count ?? 0) > 0) record("cleanup", `${table}`, "FAIL", error?.message || `${count} rows LEFT BEHIND`);
      else console.log(`   cleaned ${table}`);
    }
    // Northstar hygiene double-check: the test address must not remain anywhere.
    const { count: leftover } = await db.from("newsletter_subscribers").select("*", { count: "exact", head: true }).eq("email", TEST_EMAIL);
    record("cleanup", "Northstar uncontaminated (test subscriber removed)", (leftover ?? 0) === 0 ? "PASS" : "FAIL");

    await browser.close();

    // ── Scorecard ─────────────────────────────────────────────────────────
    const fails = results.filter((r) => r.status === "FAIL");
    const flags = results.filter((r) => r.status === "FLAG");
    console.log("\n══════════ SCORECARD ══════════");
    console.log(`PASS ${results.filter((r) => r.status === "PASS").length} · FLAG ${flags.length} · FAIL ${fails.length}`);
    for (const f of [...fails, ...flags]) console.log(` ${f.status === "FAIL" ? "❌" : "🟡"} [${f.surface}] ${f.check} — ${f.note}`);
    process.exit(fails.length > 0 ? 1 : 0);
  }
}

main().catch((e) => { console.error("harness crashed:", e); process.exit(2); });
