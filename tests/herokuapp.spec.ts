import { test, expect } from '@playwright/test';

test('Heroku', async ({ page }) => {
  await page.goto('http://the-internet.herokuapp.com/');
  await expect(page.getByRole('heading', { name: 'Welcome to the-internet1' })).toBeVisible();
  await expect(page.locator('h1')).toContainText('Welcome to the-internet');
  await page.getByRole('link', { name: 'Form Authentication' }).click();
  await expect(page.locator('h2')).toContainText('Login Page');
  await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
  await page.getByText('Skip to content Login Page').click();
  await page.getByRole('textbox', { name: 'Username' }).fill('Username');
  await page.getByRole('textbox', { name: 'Username' }).press('Enter');
  await expect(page.locator('#flash')).toContainText('Your username is invalid! ×');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
  await page.getByRole('button', { name: ' Login' }).click();
  await expect(page.locator('#flash')).toContainText('You logged into a secure area! ×');


});