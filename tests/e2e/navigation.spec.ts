import { test, expect } from "@playwright/test";

test.describe("Mobile Navigation", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test.beforeEach(async ({}, testInfo) => {
    test.skip(testInfo.project.name === "desktop", "Mobile-only test");
  });

  test("bottom tab bar has 5 tabs", async ({ page }) => {
    await page.goto("/en/explore");
    const tabBar = page.locator("nav[aria-label='Main navigation']");
    await expect(tabBar).toBeVisible();
    const buttons = tabBar.locator("button");
    await expect(buttons).toHaveCount(5);
  });

  test("search tab opens search overlay", async ({ page }) => {
    await page.goto("/en/explore");
    // Click search tab
    await page.locator("nav[aria-label='Main navigation'] button:nth-child(2)").click();
    // Search overlay should appear
    await expect(page.getByPlaceholder(/search destinations/i)).toBeVisible();
  });

  test("discover tab opens experiences sheet", async ({ page }) => {
    await page.goto("/en/explore");
    // Click discover tab (3rd)
    await page.locator("nav[aria-label='Main navigation'] button:nth-child(3)").click();
    // Sheet with experiences should appear — use heading text in the sheet
    await expect(page.getByText("Discover").nth(1)).toBeVisible();
    await expect(page.getByText("Curated destination lists")).toBeVisible();
  });
});

test.describe("Desktop Navigation", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("nav bar has main links", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("header")).toBeVisible();
    await expect(page.getByRole("link", { name: "Destinations" }).first()).toBeVisible();
  });
});
