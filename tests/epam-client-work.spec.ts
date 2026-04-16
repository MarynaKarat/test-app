import { test, expect } from '@playwright/test';

test('EPAM - Services -> Explore Our Client Work shows Client Work text', async ({ page }) => {
  // Navigate to EPAM home page
  await page.goto('https://www.epam.com/');

  // Select "Services" from the header menu
  const servicesLink = page.getByRole('link', { name: 'Services' });
  await servicesLink.click();
  await page.waitForLoadState('networkidle');

  // Click the "Explore Our Client Work" link
  const exploreLink = page.getByRole('link', { name: 'Explore Our Client Work' });
  await exploreLink.click();
  await page.waitForLoadState('networkidle');

  // Verify that the "Client Work" text is visible on the page
  const clientWorkText = page.getByText('Client Work', { exact: false });
  await expect(clientWorkText).toBeVisible();
});