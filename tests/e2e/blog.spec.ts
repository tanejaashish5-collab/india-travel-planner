import { test, expect } from "@playwright/test";

test.describe("Blog", () => {
  test("blog list page loads", async ({ page }) => {
    await page.goto("/en/blog");
    await expect(page).toHaveTitle(/Blog|NakshIQ/i);
    const articles = page.locator("a[href*='/blog/']");
    await expect(articles.first()).toBeVisible();
  });

  test("routes list page loads", async ({ page }) => {
    await page.goto("/en/routes");
    await expect(page).toHaveTitle(/Routes|NakshIQ/i);
  });

  test("treks list page loads", async ({ page }) => {
    await page.goto("/en/treks");
    await expect(page).toHaveTitle(/Treks|NakshIQ/i);
  });

  test("camping page loads", async ({ page }) => {
    await page.goto("/en/camping");
    await expect(page).toHaveTitle(/Camping|NakshIQ/i);
  });

  test("festivals page loads", async ({ page }) => {
    await page.goto("/en/festivals");
    await expect(page).toHaveTitle(/Festivals|NakshIQ/i);
  });
});
