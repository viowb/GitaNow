const { test, expect } = require('@playwright/test');
//requirement:go to url, login in and get 1st listed product title

test('Browser Context Playwright test', async ({ browser }) => {
//1st Create context and page
const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://rahulshettyacademy.com/client/#/auth/login"); 
//3rd Validate title
const title = await page.title();
console.log(title);
await expect(page).toHaveTitle("Let's Shop");
//4th Locators
const userName= page.locator("#userEmail");
const password= page.locator("#userPassword");
const signIn= page.locator("#login");

//5th Actions
await userName.fill("viowbank@gmail.com");
await password.fill("T5yhhgdjsdkls;");
await signIn.click();
//await page.waitForLoadState('networkidle'); or use below waitfor method   
await page.locator(".card-body b").first().waitFor();
const productTitles = page.locator(".card-body b");
console.log( await productTitles.nth(2).textContent());
console.log(await productTitles.allTextContents());


//End to End Web Automation Practice Exercise with Playwright
//requirement:go to url, login in and get product name Adidas orignal, Zara coat 5 and iphone 21 on product listing page
//Add them to cart and validate them in cart page
//at checkout, enter voucher and payment details and checkout
//view order hiostory and validate the order exists in order list



})
//run individual test files with npx playwright test <fileName> eg npx playwright test "tests/newLogin.spec.js" or remove test.only from the file you do not want to run