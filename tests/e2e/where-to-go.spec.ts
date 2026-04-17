import { test, expect } from "@playwright/test";

test.describe("Where to Go", () => {
  test("monthly page loads with destinations", async ({ page }) => {
    await page.goto("/en/where-to-go/april");
    await expect(page).toHaveTitle(/April/i);
    // Destinations should be listed
    const destLinks = page.locator("a[href*='/destination/']");
    await expect(destLinks.first()).toBeVisible();
  });

  test("where-to-go root redirects to current month", async ({ page }) => {
    await page.goto("/en/where-to-go");
    // Should redirect to /en/where-to-go/{month}
    await page.waitForURL(/where-to-go\/[a-z]+/);
    expect(page.url()).toMatch(/where-to-go\/(january|february|march|april|may|june|july|august|september|october|november|december)/);
  });

  test("regional where-to-go works", async ({ page }) => {
    await page.goto("/en/where-to-go/himachal-pradesh-in-april");
    await expect(page.getByText(/Himachal Pradesh/i).first()).toBeVisible();
  });
});
