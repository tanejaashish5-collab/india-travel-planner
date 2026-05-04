import { test, expect } from "@playwright/test";

test.describe("Where to Go", () => {
  test("monthly page loads with destinations", async ({ page }) => {
    await page.goto("/en/where-to-go/april");
    await expect(page).toHaveTitle(/April/i);
    // Destinations should be listed
    const destLinks = page.locator("a[href*='/destination/']");
    await expect(destLinks.first()).toBeVisible();
  });

  test("where-to-go root renders month-picker hub (no auto-redirect)", async ({ page }) => {
    // Product change: was a 307 to /en/where-to-go/{month}; now serves a
    // standalone hub page with all 12 month links. Keep the hub for SEO.
    await page.goto("/en/where-to-go");
    expect(page.url()).toMatch(/\/en\/where-to-go$/);
    await expect(page.getByRole("heading", { name: /Where to Go in India/i })).toBeVisible();
    const monthLinks = page.locator('main a[href*="/en/where-to-go/"]');
    expect(await monthLinks.count()).toBeGreaterThanOrEqual(12);
  });

  test("regional where-to-go works", async ({ page }) => {
    await page.goto("/en/where-to-go/himachal-pradesh-in-april");
    await expect(page.getByText(/Himachal Pradesh/i).first()).toBeVisible();
  });
});
