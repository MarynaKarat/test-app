import { test, expect } from '@playwright/test';

test('EPAM: Services -> Explore Our Client Work shows Client Work page', async ({ page }) => {
  await page.goto('https://www.epam.com/');

  // Cookie banner may appear depending on geo/previous state
  const acceptAll = page.getByRole('button', { name: 'Accept All' });
  if (await acceptAll.isVisible().catch(() => false)) {
    await acceptAll.click();
  }

  const header = page.getByRole('banner');
  await header.getByRole('link', { name: 'Services' }).click();

  const main = page.getByRole('main');
  await main.getByRole('link', { name: 'Explore Our Client Work' }).click();

  await expect(page.getByRole('heading', { name: 'Client Work' })).toBeVisible();
});
