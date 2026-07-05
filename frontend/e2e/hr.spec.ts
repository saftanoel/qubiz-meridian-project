import { test, expect } from '@playwright/test';

test.describe('HR View', () => {
  test('shows dashboard and resolves an action item', async ({ page }) => {
    await page.goto('/hr');

    // Verify HR Dashboard heading
    await expect(page.getByRole('heading', { name: /hr dashboard/i })).toBeVisible();

    // Verify Action Required section exists
    const actionSection = page.getByTestId('hr-action-required');
    await expect(actionSection).toBeVisible();

    // Click the first action button (if any action items exist)
    const actionButton = page.getByTestId('hr-action-button').first();
    const hasActions = await actionButton.isVisible().catch(() => false);

    if (hasActions) {
      await actionButton.click();

      // Verify a toast appears (toast container is typically outside main content)
      await expect(page.getByText(/action completed/i)).toBeVisible({ timeout: 3000 });
    }
  });
});
