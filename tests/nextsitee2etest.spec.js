import { test, expect } from '@playwright/test';

test('Add first 4 women dresses to cart and checkout', async ({ page }) => {
  await page.goto('https://www.next.co.uk', { waitUntil: 'networkidle' });

  // Accept cookies if shown
  const cookieBtn = page.locator('button:has-text("Accept All")');
  if (await cookieBtn.isVisible({ timeout: 3000 })) {
    await cookieBtn.click();
  }

  // WOMEN tab
  await page.locator('a[href="/shop/gender-women"]').first().click();

  // All Dresses
  await page.locator('a[href*="dresses"]').first().click();

  // 🔧 FIX: wait for real product tiles
  await page.waitForSelector('a[href*="/style/"]', { timeout: 30000 });

  const products = page.locator('a[href*="/style/"]');
  const itemNames = [];

  for (let i = 0; i < 4; i++) {
    const product = products.nth(i);

    const name = await product.locator('h2, span').first().innerText();
    itemNames.push(name.trim());

    await product.click();
    await page.waitForLoadState('networkidle');

    // Select first available size if required
    const sizeBtn = page.locator('button:has-text("Size")').first();
    if (await sizeBtn.isVisible({ timeout: 5000 })) {
      await sizeBtn.click();
    }

    // Add to bag
    await page.locator('button:has-text("Add to Bag")').click();

    // Continue shopping
    const continueBtn = page.locator('button:has-text("Continue Shopping")');
    if (await continueBtn.isVisible({ timeout: 5000 })) {
      await continueBtn.click();
    }

    // Return to dresses page
    await page.goBack();
    await page.waitForSelector('a[href*="/style/"]');
  }

  // Open bag
  await page.locator('a[href*="bag"]').click();

  // Validate 4 items in cart
  const bagItems = page.locator('div:has-text("Qty")');
  await expect(bagItems).toHaveCount(4);

  // Validate correct items
  for (const name of itemNames) {
    await expect(page.locator(`text=${name}`)).toBeVisible();
  }

  // Checkout
  await page.locator('button:has-text("Checkout")').click();
  await expect(page).toHaveURL(/checkout/);
});
