import { test, expect } from '@playwright/test';

test.describe('Connect', () => {
  test('opens chat popup, sends a message, and closes', async ({ page }) => {
    await page.goto('/connect');

    // Wait for employee cards to load
    await expect(page.getByRole('heading', { name: /meridian connect/i })).toBeVisible();
    await expect(page.getByTestId('connect-start-conversation').first()).toBeVisible();

    // Click first "Start conversation" button
    await page.getByTestId('connect-start-conversation').first().click();

    // Verify chat popup appears
    const popup = page.getByTestId('chat-popup');
    await expect(popup).toBeVisible();

    // Type a message
    const chatInput = page.getByTestId('chat-input');
    await chatInput.fill('Hi, nice to meet you!');

    // Send the message
    await page.getByTestId('chat-send-button').click();

    // Verify the message appears in the popup
    await expect(popup.getByText('Hi, nice to meet you!')).toBeVisible();

    // Close with Escape
    await page.keyboard.press('Escape');
    await expect(popup).not.toBeVisible();
  });
});
