import { test, expect } from "@playwright/test";

test.describe("Search", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("desktop Cmd+K search works", async ({ page }) => {
    test.skip(true, "Cmd+K is desktop-only, tested separately");
  });

  test("mobile search shows categories when empty", async ({ page }) => {
    await page.goto("/en/explore");
    // Open search via tab bar
    await page.locator("nav[aria-label='Main navigation'] button:nth-child(2)").click();
    // Category chips should show
    await expect(page.getByText("Hill Stations")).toBeVisible();
    await expect(page.getByText("Beaches")).toBeVisible();
    await expect(page.getByText("Heritage")).toBeVisible();
  });

  test("search returns results for 'manali'", async ({ page }) => {
    await page.goto("/en/explore");
    await page.locator("nav[aria-label='Main navigation'] button:nth-child(2)").click();
    await page.getByPlaceholder(/search destinations/i).fill("manali");
    // Wait for results
    await page.waitForTimeout(500);
    await expect(page.getByText("Destinations").first()).toBeVisible();
  });
});
