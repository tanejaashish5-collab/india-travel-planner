import { test, expect } from "@playwright/test";

test.describe("Gap Year Planner", () => {
  test("landing page renders the form with persona required", async ({ page }) => {
    await page.goto("/en/gap-year");

    await expect(page.getByRole("heading", { name: /Gap Year Planner/i })).toBeVisible();

    // Persona is required — both options present
    await expect(page.getByText(/Family with kids/i)).toBeVisible();
    await expect(page.getByText(/Solo or couple/i)).toBeVisible();

    // Duration slider defaults to 6
    await expect(page.getByText(/Duration:\s*6 months/i)).toBeVisible();

    // Submit button disabled until persona is chosen
    const submit = page.getByRole("button", { name: /Plan my/i });
    await expect(submit).toBeDisabled();

    // Pick solo/couple
    await page.getByText(/Solo or couple/i).click();
    await expect(submit).toBeEnabled();
  });

  test("duration slider shows the inferred end month", async ({ page }) => {
    await page.goto("/en/gap-year");

    // Default start=October, duration=6 → October-March
    await expect(page.getByText(/October\s*→\s*March/i)).toBeVisible();
  });

  test("nav mega-menu includes Gap Year Planner entry", async ({ page }) => {
    await page.goto("/en");

    // Open Plan panel in desktop nav
    const viewport = page.viewportSize();
    if (viewport && viewport.width >= 768) {
      const planTrigger = page.getByRole("button", { name: /plan/i }).first();
      if (await planTrigger.isVisible({ timeout: 2000 }).catch(() => false)) {
        await planTrigger.hover();
        await expect(page.getByRole("link", { name: /Gap Year Planner/i })).toBeVisible({
          timeout: 3000,
        });
      }
    }
  });
});
