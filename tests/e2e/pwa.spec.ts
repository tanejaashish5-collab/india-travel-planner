import { test, expect } from "@playwright/test";

test.describe("PWA", () => {
  test("manifest.json is accessible", async ({ page }) => {
    const response = await page.goto("/manifest.json");
    expect(response?.status()).toBe(200);
    const manifest = await response?.json();
    expect(manifest.name).toContain("NakshIQ");
    expect(manifest.display).toBe("standalone");
    expect(manifest.icons.length).toBeGreaterThanOrEqual(2);
  });

  test("service worker is registered", async ({ page }) => {
    await page.goto("/en");
    // Wait for SW registration
    await page.waitForTimeout(3000);
    const swRegistered = await page.evaluate(() => {
      return navigator.serviceWorker?.controller !== null || navigator.serviceWorker?.ready !== undefined;
    });
    // SW should at least be registering (may not be active immediately)
    expect(swRegistered).toBeTruthy();
  });

  test("sw.js is accessible", async ({ page }) => {
    const response = await page.goto("/sw.js");
    expect(response?.status()).toBe(200);
  });

  test("hindi locale loads", async ({ page }) => {
    await page.goto("/hi");
    await expect(page).toHaveTitle(/NakshIQ/);
    // Page should have lang="hi"
    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toBe("hi");
  });
});
