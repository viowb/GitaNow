const { test, expect } = require('@playwright/test');

test.only('End to End', async ({ page }) => {

  // Test data
  const productsToAdd = ['ADIDAS ORIGINAL', 'ZARA COAT 3', 'IPHONE 13 PRO'];
  const email = 'viowbank@gmail.com';
  const password = 'T5yhhgdjsdkls;';

  // 1. Go to application & login
  await page.goto('https://rahulshettyacademy.com/client/');

  await page.locator('#userEmail').fill(email);
  await page.locator('#userPassword').fill(password);
  await page.locator('#login').click();

  // Wait for products page
  //await page.waitForLoadState('networkidle');
  await page.locator(".card-body b").first().waitFor();

  // 2. Add required products to cart
  const products = page.locator('.card-body');
  const count = await products.count();

  for (let i = 0; i < count; i++) {
    const productName = await products.nth(i).locator('b').textContent();

    if (productsToAdd.includes(productName.trim().toUpperCase())) {
      await products.nth(i).locator('text=Add To Cart').click();
    }
  }

  // 3. Go to Cart
  await page.locator("[routerlink*='cart']").click();

  // 4. Validate products in cart
  for (const product of productsToAdd) {
    await expect(page.locator(`h3:has-text("${product}")`)).toBeVisible();
  }

  // 5. Checkout
  await page.locator('text=Checkout').click();

  // 6. Apply voucher (example)
  //await page.locator('[name="coupon"]').fill('rahulshettyacademy');
  //await page.locator('button[type="submit"]').click();

  // Optional: validate coupon success message
  //await page.waitForTimeout(2000);

  // 7. Select country
  await page.locator('[placeholder="Select Country"]').pressSequentially('ind');
  await page.locator('.ta-results button').first().click();

  // 8. Place order
  await page.locator('.action__submit').click();

  // 9. Validate order confirmation
  await expect(page.locator('.hero-primary')).toHaveText('Thankyou for the order.');

  // Capture order ID
  // Capture ALL order IDs from confirmation page
const orderIds = await page
  .locator('tr td')
  .filter({ hasText: '|' })
  .allTextContents();

const cleanedOrderIds = orderIds
  .join(' ')
  .split('|')
  .map(id => id.trim())
  .filter(id => id.length > 0);

console.log('Order IDs:', cleanedOrderIds);
const orderId = cleanedOrderIds[0]; // Assuming we want the first order ID

  // 10. Go to Order History
  await page.locator("[routerlink*='myorders']").click();

  // 11. Validate order exists in order list
  const rows = page.locator('tbody tr');
  const rowCount = await rows.count();

  let orderFound = false;
  for (let i = 0; i < rowCount; i++) {
    const rowOrderId = await rows.nth(i).locator('th').textContent();
    if (orderId.includes(rowOrderId.trim())) {
      orderFound = true;
      await rows.nth(i).locator('button').first().click();
      break;
    }
  }

  expect(orderFound).toBeTruthy();
  await page.pause();
});
