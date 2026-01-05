const { test, expect } = require('@playwright/test');

test('E2E test with checkout & voucher', async ({ page }) => {

  const productName = "Zara Coat 3";
  const promoCode = "rahulshettyacademy";

  // 1️⃣ Go to URL
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  // 2️⃣ Login
  await page.locator("#userEmail").fill("viowbank@gmail.com");
  await page.locator("#userPassword").fill("T5yhhgdjsdkls;");
  await page.locator("#login").click();

  // Wait for products
  await page.locator(".card-body").first().waitFor();

  // 3️⃣ Select product & add to cart
  const products = page.locator(".card-body");
  const count = await products.count();

  for (let i = 0; i < count; i++) {
    const title = await products.nth(i).locator("b").textContent();

    if (title.trim() === productName) {
      await products.nth(i).locator("text=Add To Cart").click();
      break;
    }
  }

  // 4️⃣ Go to Cart
  await page.locator("[routerlink*='cart']").click();

  // Validate product in cart
  await page.locator("h3:has-text('Zara Coat 3')").waitFor();
  expect(await page.locator("h3:has-text('Zara Coat 3')").isVisible()).toBeTruthy();

  // 5️⃣ Checkout
  await page.locator("text=Checkout").click();

  // 6️⃣ Apply voucher / promo code
  await page.locator("input[name='coupon']").fill(promoCode);
  await page.locator("button[type='submit']").click();

  // Validate promo applied
  await page.locator(".mt-1").waitFor();
  const promoMessage = await page.locator(".mt-1").textContent();
  console.log("Promo message:", promoMessage);

  // 7️⃣ Select country (payment details)
  await page.locator("[placeholder='Select Country']").type("ind", { delay: 100 });
  await page.locator(".ta-results button").first().click();

  // 8️⃣ Place Order
  await page.locator(".action__submit").click();

  // 9️⃣ Validate order confirmation
  await expect(page.locator(".hero-primary"))
    .toHaveText("THANKYOU FOR THE ORDER.");

});
//run individual test files with npx playwright test <fileName> eg npx playwright test "tests/E2Etest.spec.js" or remove test.only from the file you do not want to run
