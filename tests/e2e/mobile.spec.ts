import { test, expect } from "@playwright/test";

test.describe("Mobile Experience", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test.beforeEach(async ({}, testInfo) => {
    test.skip(testInfo.project.name === "desktop", "Mobile-only test");
  });

  test("destination detail shows bottom CTA bar on scroll", async ({ page }) => {
    await page.goto("/en/destination/varanasi");
    // Scroll down to trigger CTA
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(500);
    // Bottom CTA bar should appear — the cinematic dest page replaced the old
    // "Plan This Trip" bar with CinematicMobileActionBar (Plan AI · Save · WA).
    await expect(page.getByText("Plan AI")).toBeVisible();
  });

  test("explore page loads on mobile", async ({ page }) => {
    await page.goto("/en/explore");
    // Destination cards visible
    const cards = page.locator("a[href*='/destination/']");
    await expect(cards.first()).toBeVisible();
  });

  test("states page loads", async ({ page }) => {
    await page.goto("/en/states");
    await expect(page.getByText(/States|Union Territories/i).first()).toBeVisible();
  });

  test("tourist traps page loads", async ({ page }) => {
    await page.goto("/en/tourist-traps");
    await expect(page).toHaveTitle(/Tourist|Traps|Skip|NakshIQ/i);
  });

  test("permits page loads", async ({ page }) => {
    await page.goto("/en/permits");
    await expect(page).toHaveTitle(/Permits|NakshIQ/i);
  });
});
