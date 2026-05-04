import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads with hero and stats", async ({ page }) => {
    await page.goto("/en");
    await expect(page).toHaveTitle(/NakshIQ/);
    // Header visible
    await expect(page.locator("header")).toBeVisible();
    // Page has meaningful content (hero text or stats)
    const body = await page.textContent("body");
    expect(body?.length).toBeGreaterThan(100);
  });

  test("explore by region cards render", async ({ page }) => {
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
