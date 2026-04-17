import { test, expect } from "@playwright/test";

/**
 * Visual regression tests — screenshot comparison against baselines.
 *
 * How it works:
 * 1. First run: captures baseline screenshots → stored in tests/e2e/visual.spec.ts-snapshots/
 * 2. Subsequent runs: compares current screenshot against baseline
 * 3. If diff exceeds threshold → test fails with visual diff image
 *
 * To update baselines after intentional UI changes:
 *   npx playwright test visual --update-snapshots
 */

// ─── Mobile visual tests ─────────────────────────────────────────────

test.describe("Visual — Mobile", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test.beforeEach(async ({}, testInfo) => {
    test.skip(testInfo.project.name === "desktop", "Mobile-only visual test");
  });

  test("homepage above the fold", async ({ page }) => {
    await page.goto("/en");
    await page.waitForLoadState("networkidle");
    // Hide dynamic content that changes between runs
    await hideVolatileElements(page);
    await expect(page).toHaveScreenshot("mobile-homepage.png", {
      maxDiffPixelRatio: 0.03,
      fullPage: false,
    });
  });

  test("tab bar layout", async ({ page }) => {
    await page.goto("/en/explore");
    await page.waitForLoadState("networkidle");
    const tabBar = page.locator("nav[aria-label='Main navigation']");
    await expect(tabBar).toBeVisible();
    await expect(tabBar).toHaveScreenshot("mobile-tab-bar.png", {
      maxDiffPixelRatio: 0.01,
    });
  });

  test("destination detail hero", async ({ page }) => {
    await page.goto("/en/destination/varanasi");
    await page.waitForLoadState("networkidle");
    await hideVolatileElements(page);
    await expect(page).toHaveScreenshot("mobile-destination-hero.png", {
      maxDiffPixelRatio: 0.03,
      fullPage: false,
    });
  });

  test("destination detail bottom CTA bar", async ({ page }) => {
    await page.goto("/en/destination/varanasi");
    await page.waitForLoadState("networkidle");
    // Scroll to trigger the bottom CTA
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.waitForTimeout(600);
    const ctaBar = page.locator("[data-testid='bottom-cta'], .fixed.bottom-0").last();
    if (await ctaBar.isVisible().catch(() => false)) {
      await expect(ctaBar).toHaveScreenshot("mobile-bottom-cta.png", {
        maxDiffPixelRatio: 0.02,
      });
    }
  });

  test("chatbot button not cropped by tab bar", async ({ page }) => {
    await page.goto("/en/explore");
    await page.waitForLoadState("networkidle");
    // Capture the bottom 200px of viewport where chat button + tab bar live
    await expect(page).toHaveScreenshot("mobile-chat-button-area.png", {
      maxDiffPixelRatio: 0.03,
      fullPage: false,
      clip: { x: 0, y: 612, width: 375, height: 200 },
    });
  });

  test("collection detail card layout", async ({ page }) => {
    await page.goto("/en/collections/andaman-island-hopping");
    await page.waitForLoadState("networkidle");
    await hideVolatileElements(page);
    // Capture the first card area
    const firstCard = page.locator("a[href*='/destination/']").first();
    if (await firstCard.isVisible().catch(() => false)) {
      await expect(firstCard).toHaveScreenshot("mobile-collection-card.png", {
        maxDiffPixelRatio: 0.05,
      });
    }
  });

  test("collections grid page", async ({ page }) => {
    await page.goto("/en/collections");
    await page.waitForLoadState("networkidle");
    await hideVolatileElements(page);
    await expect(page).toHaveScreenshot("mobile-collections-grid.png", {
      maxDiffPixelRatio: 0.03,
      fullPage: false,
    });
  });

  test("explore page cards", async ({ page }) => {
    await page.goto("/en/explore");
    await page.waitForLoadState("networkidle");
    await hideVolatileElements(page);
    await expect(page).toHaveScreenshot("mobile-explore.png", {
      maxDiffPixelRatio: 0.03,
      fullPage: false,
    });
  });

  test("where to go page", async ({ page }) => {
    await page.goto("/en/where-to-go/april");
    await page.waitForLoadState("networkidle");
    await hideVolatileElements(page);
    await expect(page).toHaveScreenshot("mobile-where-to-go.png", {
      maxDiffPixelRatio: 0.03,
      fullPage: false,
    });
  });
});

// ─── Desktop visual tests ────────────────────────────────────────────

test.describe("Visual — Desktop", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test.beforeEach(async ({}, testInfo) => {
    test.skip(testInfo.project.name === "mobile", "Desktop-only visual test");
  });

  test("homepage above the fold", async ({ page }) => {
    await page.goto("/en");
    await page.waitForLoadState("networkidle");
    await hideVolatileElements(page);
    await expect(page).toHaveScreenshot("desktop-homepage.png", {
      maxDiffPixelRatio: 0.03,
      fullPage: false,
    });
  });

  test("destination detail page", async ({ page }) => {
    await page.goto("/en/destination/varanasi");
    await page.waitForLoadState("networkidle");
    await hideVolatileElements(page);
    await expect(page).toHaveScreenshot("desktop-destination.png", {
      maxDiffPixelRatio: 0.03,
      fullPage: false,
    });
  });

  test("collections page", async ({ page }) => {
    await page.goto("/en/collections");
    await page.waitForLoadState("networkidle");
    await hideVolatileElements(page);
    await expect(page).toHaveScreenshot("desktop-collections.png", {
      maxDiffPixelRatio: 0.03,
      fullPage: false,
    });
  });

  test("nav bar layout", async ({ page }) => {
    await page.goto("/en");
    await page.waitForLoadState("networkidle");
    const header = page.locator("header");
    await expect(header).toHaveScreenshot("desktop-nav.png", {
      maxDiffPixelRatio: 0.01,
    });
  });
});

// ─── Helpers ─────────────────────────────────────────────────────────

/** Hide elements that change between runs (counters, timestamps, dynamic ads) */
async function hideVolatileElements(page: import("@playwright/test").Page) {
  await page.evaluate(() => {
    // Hide animated counters, live timestamps, random content
    const selectors = [
      "[data-testid='live-counter']",
      "time[datetime]",
      ".animate-pulse",
      ".animate-bounce",
      "[data-random]",
    ];
    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        (el as HTMLElement).style.visibility = "hidden";
      });
    });

    // Freeze all videos to first frame
    document.querySelectorAll("video").forEach((v) => {
      v.pause();
      v.currentTime = 0;
    });
  });
}
