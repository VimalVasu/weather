import { test, expect } from '@playwright/test';

test('can load homepage and see title', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle(/Weather/i);
});
