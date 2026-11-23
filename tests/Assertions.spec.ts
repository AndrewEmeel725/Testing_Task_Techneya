import { test, expect } from "@playwright/test";

test('to be hidden', async ({page})=> {

await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');
await expect(page.locator('[id="finish"]')).toBeHidden(); 
await expect(page.locator('[id="finish"]')).toBeVisible(); 

await page.close;


}
)

test('to be present', async ({page})=> {

await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
await expect(page.locator('[class="added-manually"]')).not.toHaveCount(1);
await page.locator('[onclick="addElement()"]').click();
await expect(page.locator('[class="added-manually"]')).toHaveCount(1);

await page.close;


}
)

test('to be enabled', async ({page})=> {

await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
await expect(page.locator('[type="text"]')).toBeDisabled();
await page.locator('[onclick="swapInput()"]').click();
await expect(page.locator('[type="text"]')).toBeEnabled();

await page.close;


}
)


test('to have text', async ({page})=> {

await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
await expect(page.locator('[onclick="swapInput()"]')).toHaveText("Enable")
await page.locator('[onclick="swapInput()"]').click();
await expect(page.locator('[onclick="swapInput()"]')).toHaveText("Disable")

await page.close;

}
)

test('to have attribute', async ({page})=> {

await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
await expect(page.locator('[onclick="swapInput()"]')).toHaveAttribute('autocomplete','off');
await page.close;

}
)

test('to have URL', async ({page})=> {

await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
//full URL
await expect(page).toHaveURL('https://the-internet.herokuapp.com/dynamic_controls')
//Partial URL
await expect(page).toHaveURL(/the-internet.herokuapp.com/)
await page.close;

}
)

test('to have Title', async ({page})=> {

await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
//full URL
await expect(page).toHaveTitle('The Internet');
//Partial URL
await expect(page).toHaveTitle(/.*Internet/);
await page.close;

}
)

test('to have ss', async ({page})=> {

await page.goto('https://the-internet.herokuapp.com/dynamic_controls');

await expect(page).toHaveScreenshot();
await page.close;

}
)
