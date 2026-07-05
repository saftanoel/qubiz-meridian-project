import { test, expect } from '@playwright/test';

test.describe('Journey', () => {
  test('task status cycles and dashboard still renders', async ({ page }) => {
    await page.goto('/journey');

    // Wait for page load
    await expect(page.getByRole('heading', { name: /meridian journey/i })).toBeVisible();

    // Find the first task status button
    const statusButton = page.getByTestId('task-status-button').first();
    await expect(statusButton).toBeVisible();

    // The status badge is the last <span> sibling inside the same card div
    // Card structure: div > [button, div, span.badge]
    const taskCard = statusButton.locator('..');
    const statusBadge = taskCard.locator('> span').last();
    const textBefore = await statusBadge.textContent();

    // Click to cycle status
    await statusButton.click();

    // Wait for the status badge text to change (API call + re-render)
    await expect(statusBadge).not.toHaveText(textBefore!, { timeout: 5000 });

    // Navigate to Dashboard and verify progress section renders
    await page.goto('/');
    await expect(page.getByTestId('dashboard-progress')).toBeVisible();
  });
});
