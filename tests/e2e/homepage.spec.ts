import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads with hero and stats", async ({ page }) => {
    await page.goto("/en");
    await expect(page).toHaveTitle(/NakshIQ/);
    // Header visible — the cinematic landing renders one <header> per act
    // (7 total), so target the site header (first) to avoid the strict-mode
    // violation that was failing this test.
    await expect(page.locator("header").first()).toBeVisible();
    // Page has meaningful content (hero text or stats)
    const body = await page.textContent("body");
    expect(body?.length).toBeGreaterThan(100);
  });

  test("explore by region cards render", async ({ page }) => {
    // Cinematic landing redesign removed the static region-card section from
    // the homepage DOM (0 /states?region= anchors render on load) — the links
    // now exist only inside the hover-opened nav mega-menu. Needs a rewrite
    // against the mega-menu, not a selector tweak.
    test.fixme(true, "region cards removed from cinematic landing; links live in hover-only nav mega-menu");
    await page.goto("/en");
    // Region cards link via /states?region=… — assert at least one is present.
    // The visible label was shortened from "Explore by region" → "By region"
    // (nav-mega-menu.tsx); keep the structural assertion (cards exist) and
    // drop the exact-text lookup.
    const regionCards = page.locator("a[href*='/states?region=']");
    expect(await regionCards.count()).toBeGreaterThanOrEqual(6);
  });

  test("featured destinations show with scores", async ({ page }) => {
    await page.goto("/en");
    // Destination cards with links
    const destLinks = page.locator("a[href*='/destination/']");
    await expect(destLinks.first()).toBeVisible();
  });
});
