
import { test, expect, Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://eservices.canada.ca/fr/reservation');
});

test.describe('New Todo', () => {
  test('should fill the form', async ({ page }) => {
    await Promise.all([
        page.waitForNavigation({ url: 'https://eservices.canada.ca/en/reservation/application/?booking-privacy=true' }),
        page.locator('text=I have read and understand').click()
      ]);

    // Select 564190001
    await page.locator('select[name="ctl00\\$ContentContainer\\$WebFormControl_de5496ccf543ec118c62000d3a09fbc2\\$EntityFormView\\$esdc_languageofservice"]').selectOption('564190001');
    // Select 564190001
    await page.locator('select[name="ctl00\\$ContentContainer\\$WebFormControl_de5496ccf543ec118c62000d3a09fbc2\\$EntityFormView\\$esdc_bookingtype"]').selectOption('564190001');
    // Select 564190003
    await page.locator('select[name="ctl00\\$ContentContainer\\$WebFormControl_de5496ccf543ec118c62000d3a09fbc2\\$EntityFormView\\$esdc_earliesttraveldaterange"]').selectOption('564190003');
    // Click input[name="ctl00\$ContentContainer\$WebFormControl_de5496ccf543ec118c62000d3a09fbc2\$EntityFormView\$esdc_numberofapplicationspassport"]
    await page.locator('input[name="ctl00\\$ContentContainer\\$WebFormControl_de5496ccf543ec118c62000d3a09fbc2\\$EntityFormView\\$esdc_numberofapplicationspassport"]').fill('1');
    // Select 0
    await page.locator('select[name="ctl00\\$ContentContainer\\$WebFormControl_de5496ccf543ec118c62000d3a09fbc2\\$EntityFormView\\$esdc_passportraapplicable"]').selectOption('0');
    // Click input:has-text("Next")
    await Promise.all([
    page.waitForNavigation(/*{ url: 'https://eservices.canada.ca/en/reservation/application/?booking-privacy=true&stepid=7d4fa2a9-f4dd-ec11-bb3d-000d3af4ac86&sessionid=1ba09e13-0ee8-ec11-bb3d-000d3af4ac86' }*/),
    page.locator('input:has-text("Next")').click()
    ]);

    const value = await page.locator('[id="EntityFormView_EntityID"]').getAttribute("value")
    console.log(value)
    // Fill [aria-label="First Name"]
    await page.locator('[aria-label="First Name"]').fill('John');
    // Click [aria-label="Last Name"]
    await page.locator('[aria-label="Last Name"]').click();
    // Fill [aria-label="Last Name"]
    await page.locator('[aria-label="Last Name"]').fill('Doe');
    // Click [placeholder="Provide a telephone number"]
    await page.locator('[placeholder="Provide a telephone number"]').click();
    // Fill [placeholder="Provide a telephone number"]
    await page.locator('[placeholder="Provide a telephone number"]').fill('4381234567');
    // Select 39449f70-37b3-eb11-8236-0022486d8d5f
    await page.locator('select[name="ctl00\\$ContentContainer\\$WebFormControl_de5496ccf543ec118c62000d3a09fbc2\\$EntityFormView\\$esdc_provinceterritorystateid"]').selectOption('39449f70-37b3-eb11-8236-0022486d8d5f');
    // Click text=Next
    await Promise.all([
    page.waitForNavigation(/*{ url: 'https://eservices.canada.ca/en/reservation/application/?booking-privacy=true&stepid=af7e28ec-a74c-ec11-8f8e-000d3a0a00fb&sessionid=1ba09e13-0ee8-ec11-bb3d-000d3af4ac86' }*/),
    page.locator('text=Next').click()
    ]);
    // Click button[role="button"]:has-text("No")
    await page.locator('button[role="button"]:has-text("No")').click();
  });

});
