import puppeteer from 'puppeteer';

test('login page success login e2e', async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:3000/login');

  await page.setViewport({ width: 1745, height: 852 });

  await page.waitForSelector('.flex-grow-1 > .d-flex > form > .mb-3:nth-child(2) > .form-control');
  await page.click('.flex-grow-1 > .d-flex > form > .mb-3:nth-child(2) > .form-control');

  await page.type('.flex-grow-1 > .d-flex > form > .mb-3:nth-child(2) > .form-control', 'admin');

  await page.type('.flex-grow-1 > .d-flex > form > .mb-3:nth-child(3) > .form-control', 'admin');

  await page.waitForSelector('.d-flex #login-button');
  await page.click('.d-flex #login-button');

  await page.waitForNavigation({ waitUntil: 'networkidle0' }),

  expect(await page.$eval('#home-link', ((e) => e.innerHTML))).toContain('QCRM');
  expect(await page.$eval('#clients-link', ((e) => e.getAttribute('href')))).toEqual('/?viewType=1');

  await browser.close();
}, 30000);
