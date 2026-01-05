import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.jointinv.com/home');
  await page.getByRole('link', { name: 'About' }).click();
  await page.getByRole('link', { name: 'What We Do' }).click();
  await page.getByRole('link', { name: 'Complaint Policy' }).click();
  await page.getByRole('link', { name: 'Training' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link').filter({ hasText: /^$/ }).nth(5).click();
  const page1 = await page1Promise;
  await page1.locator('iframe[title="vimeo Video Player"]').contentFrame().locator('.vp-target').click();
});