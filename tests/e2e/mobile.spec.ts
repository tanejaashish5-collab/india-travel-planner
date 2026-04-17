import { test, expect } from "@playwright/test";

test.describe("Mobile Experience", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("destination detail shows bottom CTA bar on scroll", async ({ page }) => {
    await page.goto("/en/destination/varanasi");
    // Scroll down to trigger CTA
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(500);
    // Bottom CTA bar should appear
    await expect(page.getByText("Plan This Trip")).toBeVisible();
  });

  test("destination detail has sticky section tabs on scroll", async ({ page }) => {
    await page.goto("/en/destination/varanasi");
    await page.evaluate(() => window.scrollTo(0, 400));
    await page.waitForTimeout(500);
    // Section tabs should be visible (Overview, Monthly, etc.)
    const tabs = page.locator("[data-section]");
    // At least some section tabs should exist
    const count = await tabs.count();
    expect(count).toBeGreaterThan(0);
  });

  test("explore page loads on mobile", async ({ page }) => {
    await page.goto("/en/explore");
    // Destination cards visible
    const cards = page.locator("a[href*='/destination/']");
    await expect(cards.first()).toBeVisible();
  });

  test("ask nakshiq page loads", async ({ page }) => {
    await page.goto("/en/ask");
    await expect(page).toHaveTitle(/Ask|NakshIQ/i);
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
