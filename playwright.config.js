// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { config } from 'node:process';



/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  //const config is a variable that holds all the test files
//global timeout for each test case 30 seconds.
  testDir: './tests',
  timeout: 30 * 1000,
  //use 'expect' assertion timeout if you want to overide the default 30secs
  //timeout within a test block can be overidden using test.setTimeout
  expect: {
    timeout: 5000,
  },
  reporter: 'html', 
//reporter type can be changed as required

  use: {
        browserName:'chromium',
        headless : false,
        screenshot:'on',
        video : 'on',
        trace : 'retain-on-failure',   
      
    
  },

});
//const config variable ends here and can be made available globally across the project by using 'export default config;
// //export default is sufficient for Playwright; do not assign Node's `process.config`
//module.exports = config
//headless: false is used when you desire browser opening up visibly
//viewport: { width: 1280, height: 720 },
//ignoreHTTPSErrors: true,
//video: 'on-first-retry',
//screenshot: 'only-on-failure',
//change browser as required: 'chromium', 'firefox', 'webkit'
//collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer 