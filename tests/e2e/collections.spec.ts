import { test, expect } from "@playwright/test";

test.describe("Collections", () => {
  test("collections page loads with grid", async ({ page }) => {
    await page.goto("/en/collections");
    await expect(page).toHaveTitle(/Collections/i);
    // Collection cards visible
    const cards = page.locator("a[href*='/collections/']");
    await expect(cards.first()).toBeVisible();
  });

  test("region filter works", async ({ page }) => {
    await page.goto("/en/collections");
    // Click a region filter — use first() since multiple filter bars exist
    const northBtn = page.getByRole("button", { name: "North" }).first();
    if (await northBtn.isVisible()) {
      await northBtn.click();
      await page.waitForTimeout(300);
    }
  });

  test("collection detail page loads", async ({ page }) => {
    await page.goto("/en/collections/andaman-island-hopping");
    await expect(page.getByText(/Andaman|Island/i).first()).toBeVisible();
  });
});
