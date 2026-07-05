import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test('loads and shows key elements', async ({ page }) => {
    await page.goto('/');

    // Hero welcome text
    await expect(page.getByText('Hi George', { exact: false })).toBeVisible();

    // Progress ring area
    await expect(page.getByTestId('dashboard-progress')).toBeVisible();

    // "Open your Journey" link
    await expect(page.getByRole('link', { name: /open your journey/i })).toBeVisible();
  });
});
