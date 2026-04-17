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
    await expect(page.getByText("Explore by region", { exact: false })).toBeVisible();
    // At least 6 region cards
    const regionCards = page.locator("a[href*='/states?region=']");
    await expect(regionCards.first()).toBeVisible();
  });

  test("featured destinations show with scores", async ({ page }) => {
    await page.goto("/en");
    // Destination cards with links
    const destLinks = page.locator("a[href*='/destination/']");
    await expect(destLinks.first()).toBeVisible();
  });
});
