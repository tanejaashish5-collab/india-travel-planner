import { test, expect } from "@playwright/test";

test.describe("Destination Detail", () => {
  test("loads with all key sections", async ({ page }) => {
    await page.goto("/en/destination/varanasi");
    await expect(page).toHaveTitle(/Varanasi/);
    // Hero image
    await expect(page.locator("video, img[alt]").first()).toBeVisible();
    // Name and tagline
    await expect(page.getByText("Varanasi").first()).toBeVisible();
    // Monthly scores section
    await expect(page.getByText(/monthly/i).first()).toBeVisible();
  });

  test("confidence cards render", async ({ page }) => {
    await page.goto("/en/destination/varanasi");
    // Network/medical/road infrastructure data
    await expect(page.getByText(/Infrastructure/i).first()).toBeVisible();
  });

  test("SOS section present", async ({ page }) => {
    await page.goto("/en/destination/varanasi");
    await expect(page.getByText(/Emergency|SOS/i).first()).toBeVisible();
  });

  test("state redirect works (goa → /state/goa)", async ({ page }) => {
    const response = await page.goto("/en/destination/goa");
    // Should redirect to /state/goa (301 or 308)
    expect(page.url()).toContain("/state/goa");
  });

  test("new A&N destination loads", async ({ page }) => {
    await page.goto("/en/destination/havelock-island");
    await expect(page).toHaveTitle(/Havelock/);
    await expect(page.getByText("Andaman").first()).toBeVisible();
  });
});
