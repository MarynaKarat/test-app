import { test, expect } from '@playwright/test';

test('EPAM: Services -> Explore Our Client Work shows Client Work page', async ({ page }) => {
  await page.goto('https://www.epam.com/');

  // Cookie banner may appear depending on geo/previous state
  const acceptAll = page.getByRole('button', { name: 'Accept All' });
  if (await acceptAll.isVisible().catch(() => false)) {
    await acceptAll.click();
  }

  await page.getByRole('link', { name: 'Services' }).click();
  await page.getByRole('link', { name: 'Explore Our Client Work' }).click();

  await expect(page.getByText('Client Work', { exact: true })).toBeVisible();
});
