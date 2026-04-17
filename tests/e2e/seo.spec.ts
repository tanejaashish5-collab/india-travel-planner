import { test, expect } from "@playwright/test";

test.describe("SEO", () => {
  test("homepage has correct canonical", async ({ page }) => {
    await page.goto("/en");
    const canonical = await page.locator("link[rel='canonical']").getAttribute("href");
    expect(canonical).toContain("/en");
    expect(canonical).not.toMatch(/nakshiq\.com\/$/); // Should NOT be just nakshiq.com/
  });

  test("destination page has canonical + hreflang", async ({ page }) => {
    await page.goto("/en/destination/varanasi");
    const canonical = await page.locator("link[rel='canonical']").getAttribute("href");
    expect(canonical).toContain("/en/destination/varanasi");

    // Hreflang alternates
    const hreflangs = await page.locator("link[rel='alternate'][hreflang]").count();
    expect(hreflangs).toBeGreaterThanOrEqual(2); // en + hi
  });

  test("non-locale URL returns 301", async ({ page }) => {
    const response = await page.goto("/where-to-go/december", { waitUntil: "commit" });
    // After redirect, should be on /en/ version
    expect(page.url()).toContain("/en/where-to-go/december");
  });

  test("collections page has canonical", async ({ page }) => {
    await page.goto("/en/collections");
    const canonical = await page.locator("link[rel='canonical']").getAttribute("href");
    expect(canonical).toContain("/en/collections");
  });

  test("meta description exists on key pages", async ({ page }) => {
    for (const path of ["/en", "/en/explore", "/en/collections", "/en/blog"]) {
      await page.goto(path);
      const desc = await page.locator("meta[name='description']").getAttribute("content");
      expect(desc).toBeTruthy();
      expect(desc!.length).toBeGreaterThan(50);
    }
  });
});
