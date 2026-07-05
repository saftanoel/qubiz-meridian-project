import { test, expect } from '@playwright/test';

test.describe('Office Explorer', () => {
  test('toggles to 2D and shows kitchen details', async ({ page }) => {
    await page.goto('/office');

    // Verify page loaded
    await expect(page.getByRole('heading', { name: /office explorer/i })).toBeVisible();

    // Verify 2D toggle exists and click it
    const toggle2D = page.getByTestId('office-map-toggle-2d');
    await expect(toggle2D).toBeVisible();
    await toggle2D.click();

    // Click the kitchen pin
    const kitchenPin = page.getByTestId('office-pin-kitchen');
    await expect(kitchenPin).toBeVisible();
    await kitchenPin.click();

    // Verify details panel shows Kitchen info
    const detailsPanel = page.getByTestId('office-details-panel');
    await expect(detailsPanel).toBeVisible();
    await expect(detailsPanel.getByText('Kitchen / Coffee Area')).toBeVisible();
  });
});
