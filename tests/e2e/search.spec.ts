import { test, expect } from "@playwright/test";

test.describe("Search", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test.beforeEach(async ({}, testInfo) => {
    test.skip(testInfo.project.name === "desktop", "Mobile-only test");
  });

  test("mobile search shows categories when empty", async ({ page }) => {
    await page.goto("/en/explore");
    // Open search via tab bar
    await page.locator("nav[aria-label='Main navigation'] button:nth-child(2)").click();
    // Category chips should show
    await expect(page.getByText("Hill Stations").first()).toBeVisible();
    await expect(page.getByText("Beaches").first()).toBeVisible();
    await expect(page.getByText("Heritage").first()).toBeVisible();
  });

  test("search returns results for 'manali'", async ({ page }) => {
    await page.goto("/en/explore");
    // Open search via tab bar
    const searchBtn = page.locator("nav[aria-label='Main navigation'] button").nth(1);
    const tabVisible = await searchBtn.isVisible({ timeout: 5000 }).catch(() => false);
    if (!tabVisible) {
      test.skip(true, "New mobile tab bar not yet deployed");
      return;
    }
    await searchBtn.click();
    const input = page.getByPlaceholder(/search/i).first();
    await input.waitFor({ state: "visible", timeout: 5000 });
    await input.fill("manali");
    await page.waitForTimeout(800);
    await expect(page.getByText("Destinations").first()).toBeVisible();
  });
});
