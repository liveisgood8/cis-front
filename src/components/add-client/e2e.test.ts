import puppeteer from 'puppeteer';

test('add client component e2e', async () => {
  const clientName = `TestClient-${(Math.random() * 1000).toFixed(0)}`;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:3000/login');

  await page.setViewport({ width: 1085, height: 852 });

  await page.waitForSelector('.flex-grow-1 > .d-flex > form > .mb-3:nth-child(2) > .form-control');
  await page.click('.flex-grow-1 > .d-flex > form > .mb-3:nth-child(2) > .form-control');

  await page.type('.flex-grow-1 > .d-flex > form > .mb-3:nth-child(2) > .form-control', 'admin');

  await page.type('.flex-grow-1 > .d-flex > form > .mb-3:nth-child(3) > .form-control', 'admin');

  await page.waitForSelector('.d-flex #login-button');

  await page.click('.d-flex #login-button');
  await page.waitFor(10000);

  expect(await page.$eval('#clients-link', (e) => e.innerHTML)).toContain('Клиенты');

  await page.click('#sidebar #clients-link');
  await page.waitFor(1000); // Wait animation
  await page.click('#sidebar #add-client-link');

  await page.waitForSelector('.wrapper #formBasicName');
  await page.click('.wrapper #formBasicName');

  await page.type('.wrapper #formBasicName', clientName);

  await page.type('.flex-grow-1 #formBasicEmail', 'email@mail.com');

  await page.type('.wrapper #formBasicAddress', 'Address 1');

  await page.type('.wrapper > .flex-grow-1 > .flex-grow-1 > .form-group:nth-child(4) > .form-control', 'Description');

  await page.waitForSelector('#root #add-client-submit-button');
  await page.click('#root #add-client-submit-button');
  await page.waitFor(10000);

  expect(await page.$eval('#entities-list', (e) => e.innerHTML)).toContain(clientName);

  await browser.close();
}, 50000);
