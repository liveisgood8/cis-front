import puppeteer from 'puppeteer';

test('register page success e2e', async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/login');

  await page.setViewport({ width: 1745, height: 852 });

  // Go to register page from login
  await page.waitForSelector('.d-flex #register-link');
  await page.click('.d-flex #register-link');

  await page.waitForSelector('.flex-grow-1 > .d-flex > .flex-grow-1 > .mb-3:nth-child(2) > .form-control');
  await page.click('.flex-grow-1 > .d-flex > .flex-grow-1 > .mb-3:nth-child(2) > .form-control');

  await page.type('.flex-grow-1 > .d-flex > .flex-grow-1 > .mb-3:nth-child(2) > .form-control', 
    `test${(Math.random() * 1000).toFixed()}`);

  await page.type('.flex-grow-1 > .d-flex > .flex-grow-1 > .mb-3:nth-child(3) > .form-control', '1');

  await page.type('.flex-grow-1 > .d-flex > .flex-grow-1 > .mb-3:nth-child(4) > .form-control', '1');

  await page.type('.flex-grow-1 > .d-flex > .flex-grow-1 > .mb-3:nth-child(5) > .form-control', 'Name1');

  await page.type('.flex-grow-1 > .d-flex > .flex-grow-1 > .mb-3:nth-child(6) > .form-control', 'Surname2');

  await page.waitForSelector('.d-flex #profile-submit-button');
  await page.click('.d-flex #profile-submit-button');

  await page.waitFor(10000);

  expect(await page.$eval('#login-button', ((e) => e.innerHTML))).toContain('Вход');
  expect(await page.$eval('#register-link', ((e) => e.getAttribute('href')))).toEqual('/registration');

  await browser.close();
}, 40000);
