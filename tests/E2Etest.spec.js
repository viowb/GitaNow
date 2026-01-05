const { test, expect } = require('@playwright/test');
//End to End Web Automation Practice Exercise with Playwright
//requirement:go to, login in and get product name Adidas 
//orignal, Zara coat 3 and iphone 13 Pro on product listing page
//Add them to cart and validate them in cart page
//at checkout, enter voucher and payment details and checkout
//view order history and validate the order exists in order list

test('E2E test', async ({ page }) => {
  const email = "viowbank@gmail.com";
  const productName = "Zara Coat 3";
  const products = page.locator(".card-body");  
  //1st Goto url
  await page.goto("https://rahulshettyacademy.com/client"); 
  //2nd Login
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill("T5yhhgdjsdkls;");
  await page.locator("#login").click();
    //wait for products to load
  await page.locator(".card-body b").first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
  const count = await products.count();
  //iterate the number of items in the array
  for (let i = 0; i < count; i++) {

  const card = products.nth(i);
  const title = await card.locator("b").textContent();

  if (title.trim() === productName) {

    // Wait until Add To Cart button is visible
    await card.locator("button.w-10").waitFor();

    // Click Add To Cart
    await card.locator("button.w-10").click();
    break;

    }
}
await page.pause();
})



//run individual test files with npx playwright test <fileName> eg npx playwright test "tests/E2Etest.spec.js" or remove test.only from the file you do not want to run
  

