import { test, expect } from '@playwright/test';

test.describe('Ask Meridian', () => {
  test('suggested question reveals an answer', async ({ page }) => {
    await page.goto('/ask');

    // Wait for page load
    await expect(page.getByRole('heading', { name: /the questions no one thinks to ask/i })).toBeVisible();

    // Click the suggested question about lunch
    await page.getByRole('button', { name: /where do i eat lunch/i }).click();

    // Verify the search input now contains the question text
    const searchInput = page.getByPlaceholder('Search questions...');
    await expect(searchInput).toHaveValue(/where do i eat lunch/i);

    // Verify at least one FAQ card with a matching answer is visible
    await expect(page.getByText(/kitchen|café|lunch/i).first()).toBeVisible();
  });
});
