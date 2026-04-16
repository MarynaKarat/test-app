import { test, expect } from '@playwright/test';

test.describe('EPAM - Client Work navigation', () => {
  test('Navigate Services -> Explore Our Client Work and verify Client Work page', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('https://www.epam.com/', { waitUntil: 'domcontentloaded' });

    // Cookie banner (sometimes appears)
    const cookieAccept = page.getByRole('button', { name: /accept|agree/i });
    if (await cookieAccept.first().isVisible().catch(() => false)) {
      await cookieAccept.first().click();
    }

    // Header menu: "Services"
    // EPAM site may render multiple "Services" links (header + hamburger). Pick the top-nav one.
    await page.getByRole('link', { name: 'Services' }).nth(1).click();

    // CTA link
    await page.getByRole('link', { name: /Explore Our Client Work/i }).click();

    // Assertion
    await expect(page.getByRole('heading', { name: /Client Work/i })).toBeVisible();
  });
});
