import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  retries: 1,
  workers: 3,
  reporter: [["list"], ["html", { open: "never" }]],
  expect: {
    toHaveScreenshot: {
      // Allow small anti-aliasing differences across OS/GPU
      maxDiffPixelRatio: 0.03,
      // Animations must settle before comparison
      animations: "disabled",
    },
  },
  use: {
    baseURL: process.env.BASE_URL,
    screenshot: "only-on-failure",
    trace: "on-first-retry",
    // Dismiss onboarding quiz + PWA install prompt on all tests
    storageState: {
      cookies: [],
      origins: [{
        origin: process.env.BASE_URL!,
        localStorage: [
          { name: "quizSeen", value: "true" },
          { name: "pwa-install-dismissed", value: "9999999999999" },
        ],
      }],
    },
  },
  projects: [
    {
      name: "mobile",
      use: {
        ...devices["Pixel 5"],  // Chromium-based mobile emulation
      },
    },
    {
      name: "desktop",
      use: { viewport: { width: 1440, height: 900 } },
    },
  ],
});
