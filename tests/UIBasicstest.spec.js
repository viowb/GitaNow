//existing code... 
///WRAP PLAYWRIGHT CODE INSIDE A TEST WITH CURLY BRACES
const { test, expect } = require('@playwright/test');

test('UI Basics Test', async ({ page }) => {
    await page.goto('https://courses.rahulshettyacademy.com/loginpagePractice/');
    //add assertions or interactions here
});

test('Page pw Test - Google', async ({ page }) => {
    await page.goto('https://google.com/');
    console.log(await page.title('Google'));
    expect(await page.title()).toBe('Google');
});

test('Page pw Test - Housing R Us Ltd. | Property Investment', async ({ page }) => {
    await page.goto('https://www.housingr-us.com/');
    const title = await page.title();
    console.log(title);
    expect(title).toBe ('Housing R Us Ltd. | Property Investment');
});


    test('Page pw Test - Joint Investment Ltd. | UK PROPERTY INVESTMENT', async ({ page }) => {
    await page.goto('https://www.jointinv.com/home');
    const title = await page.title();
    console.log(title);
    expect(title).toBe ('Joint Investment Ltd. | UK PROPERTY INVESTMENT');
    //use test.only to run a single test case
});

test('Browser Context-Validating Error login', async ({browser})=> 
    {
    
    //await browser.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    //await page.locator('#username').fill('rahulshetty');
    //await page.locator("[type='password']").fill('learning');
    //await page.locator('#signInBtn').click();
    //console.log(await page.locator("[style*='block']").textContent());
    //await expect(page.locator("[style*='block']")).toContainText('Incorrect');  
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator("[type='password']").fill('learning');
    await page.locator('#signInBtn').click();
    await page.goto("https://rahulshettyacademy.com/angularpractice/shop");
    const title = await page.title();
    console.log(title);
    expect(title).toBe ("ProtoCommerce");
    //console.log(await page.locator(".card-body a").nth(0).textContent())
    //console.log(await page.locator(".card-body a").nth(1).textContent())
    //<a href="#">iphone X</a> aka getByRole('link', { name: 'iphone X' }) use nth(0) for first item
    //console.log(await page.locator(".card-body a").nth(1).textContent())
    const cardTitles = page.locator(".card-body a");
    console.log(await cardTitles.nth(0).textContent())
    console.log(await cardTitles.nth(1).textContent())
    //to grab titles odf ALL the l;isted items on page, use allTitles
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);

    //handling static drop downs

    {
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        const userName = page.locator('#username');
        //const password = page.locator('#password');
        const signIn = page.locator('#signInBtn');
        const dropdown = page.locator("select.form-control");
        await dropdown.selectOption("consult");
        await page.locator(".radiotextsty").last().click();
        await page.locator("#okayBtn").click();
        console.log(await page.locator(".radiotextsty").last().isChecked());
        await expect(page.locator(".radiotextsty").last()).toBeChecked();
        expect(await page.locator(".radiotextsty").first().isChecked()).toBeFalsy();
    
    };
   
   
});


    //assertions after login
    //playwright uses css selectors by default and can also use xpath selectors
    //await page.locator('css=button').click();
    //await page.locator('xpath=//button[@class="btn btn-primary"]').click();
    //await page.locator('input[name="username"]').fill('rahulshetty');
    //type fill
    //await userName.fill("rahulshettyacademy");
    //await password.fill("learning");
    //await terms.check();
    //await signIn.click();
     //const password = page.locator('#password');
    //const terms = page.locator('#terms');
    //const signIn = page.locator('#signInBtn');
    //const userName = page.locator('#username');