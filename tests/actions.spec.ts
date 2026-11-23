import {test,expect} from "@playwright/test"

test ('textbox', async ({page}) => {

await page.goto('https://the-internet.herokuapp.com/login');

await page.locator('[id="username"]').fill('tomsmith');

await page.locator('[id="password"]').pressSequentially('SuperSecretPassword!',{delay:200});

await page.close();


});

test ('mouse', async ({page}) => {

await page.goto('https://play1.automationcamp.ir/mouse_events.html');
await page.locator('[id="click_area"]').click();
await expect(page.locator('[id="click_type"]')).toHaveText('Click');
await page.locator('[id="click_area"]').dblclick();
await expect(page.locator('[id="click_type"]')).toHaveText('Double-Click');
await page.locator('[id="click_area"]').click({button:'right'});
await expect(page.locator('[id="click_type"]')).toHaveText('Right-Click');
await page.close();


});

test ('radio', async ({page}) => {

await page.goto('https://the-internet.herokuapp.com/radio_buttons');
await page.locator('[id="red"]').check();
await expect(page.locator('[id="red"]')).toBeChecked();
await page.locator('[id="green"]').check();
await expect(page.locator('[id="red"]')).not.toBeChecked();

await page.close();


});

test ('checkbox', async ({page}) => {

await page.goto('https://the-internet.herokuapp.com/checkboxes');
await page.locator('(//input[@type="checkbox"])[1]').check();
//check without expect
await page.locator('(//input[@type="checkbox"])[1]').isChecked()
//or with expect 
await expect(page.locator('(//input[@type="checkbox"])[1]'))
await page.locator('(//input[@type="checkbox"])[2]').uncheck();
await expect(page.locator('(//input[@type="checkbox"])[2]')).not.toBeChecked();

await page.close();


});

test ('dropdown', async ({page}) => {

await page.goto('https://the-internet.herokuapp.com/dropdown');
await page.selectOption('[id="dropdown"]',{
    value: "1"

})
await page.pause();
await page.selectOption('[id="dropdown"]',{
    label: "Option 2"

})
await page.pause();
await page.selectOption('[id="dropdown"]',{
    index: 1

})
await page.pause();
await page.close();


});

test ('multidropdown', async ({page}) => {

await page.goto('https://the-internet.herokuapp.com/multiple_dropdown');
await page.selectOption('[id="multiple-dropdown"]',[ {value: "1"},{value:"2"}] ) 
await page.pause();
await page.close();


});

test ('dynamicdropdown', async ({page}) => {

await page.goto('https://demo.automationtesting.in/Register.html');
await page.locator('[class="select2-selection select2-selection--single"]').click();
await page.click('//li[text()="Australia"]');
await page .pause();

await page.close();


});


test ('JSAlert', async ({page}) => {

await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
await page.locator('[onclick="jsAlert()"]').click();
await expect(page.locator('[id="result"]')).toHaveText('You successfully clicked an alert');
await page .pause();
await page.close();


});

test ('JSAlert2', async ({page}) => {

await page.goto('https://the-internet.herokuapp.com/javascript_alerts');


page.on("dialog",async(alert)=>{

    const alertMessage=alert.message();
    
    expect (alertMessage).toEqual('I am a JS Alert');
   
    await alert.accept();
    await expect(page.locator('[id="result"]')).toHaveText('You successfully clicked an alert');
   

})

await page.locator('[onclick="jsAlert()"]').click();



await page .pause();
await page.close();


});


test ('confirmationAlert', async ({page}) => {

await page.goto('https://the-internet.herokuapp.com/javascript_alerts');


page.on("dialog",async(alert)=>{

    const alertMessage=alert.message();
    
    expect (alertMessage).toEqual('I am a JS Confirm');
   
    await alert.accept();
    await expect(page.locator('[id="result"]')).toHaveText('You clicked: Ok');
   

})

await page.locator('[onclick="jsConfirm()"]').click();



await page .pause();
await page.close();


});

test ('cancelAlert', async ({page}) => {

await page.goto('https://the-internet.herokuapp.com/javascript_alerts');


page.on("dialog",async(alert)=>{

    const alertMessage=alert.message();
    
    expect (alertMessage).toEqual('I am a JS Confirm');
   
    await alert.dismiss();
    await expect(page.locator('[id="result"]')).toHaveText('You clicked: Cancel');
   

})

await page.locator('[onclick="jsConfirm()"]').click();



await page .pause();
await page.close();


});


test.only ('promptAlert', async ({page}) => {

await page.goto('https://the-internet.herokuapp.com/javascript_alerts');


page.on("dialog",async(alert)=>{

    const alertMessage=alert.message();
    
    expect (alertMessage).toEqual('I am a JS prompt');
   
    await alert.accept("Andrew");
    await expect(page.locator('[id="result"]')).toHaveText('You entered: Andrew');
   

})

await page.locator('[onclick="jsPrompt()"]').click();



await page .pause();
await page.close();


});

test.only ('cancelPromptAlert', async ({page}) => {

await page.goto('https://the-internet.herokuapp.com/javascript_alerts');


page.on("dialog",async(alert)=>{

    const alertMessage=alert.message();
    
    expect (alertMessage).toEqual('I am a JS prompt');
   
    await alert.dismiss();
    await expect(page.locator('[id="result"]')).toHaveText('You entered: null');
   

})

await page.locator('[onclick="jsPrompt()"]').click();

await page .pause();
await page.close();

});

test ('frames', async ({page}) => {

await page.goto('https://the-internet.herokuapp.com/nested_frames');
let frameCount =page.frames().length;
console.log('The frame count is ${frameCount}');
let bottomFrame=page.frameLocator('[src="/frame_bottom"]').locator('//body[contains(text(),"BOTTOM")]');
await expect(bottomFrame).toHaveText("BOTTOM");
let topFrame= page.frame('frame-top');
let topFrameChilds= topFrame?.childFrames(); // frames numbers 0 1 2
let middleFrame=topFrameChilds[1];
await expect(middleFrame.locator('[id="content"]')).toHaveText('MIDDLE');


await page .pause();
await page.close();

});

test ('Tabs', async ({page}) => {

await page.goto('https://the-internet.herokuapp.com/windows');
const[browserTabs]= await Promise.all([

    page.waitForEvent('popup'), await page.locator('[href="/windows/new"]').click()
])

await browserTabs.waitForLoadState();
const pages = browserTabs.context().pages();
const defaultTab=pages[0];
await expect(defaultTab.locator('//h3')).toContainText('Opening a new window');
const lastTab= pages [pages.length-1];
await expect (lastTab.locator('//h3')).toContainText('New Window')


await page .pause();
await defaultTab.close();
await lastTab.close();

});

test ('windows', async ({page}) => {

await page.goto('https://demo.automationtesting.in/Windows.html#google_vignette');
await page.locator('[href="#Seperate"]').click();

const[browserWindows]= await Promise.all([

    page.context().waitForEvent('page'), await page.locator('[onclick="newwindow()"]').click()
])

await browserWindows.waitForLoadState();
await browserWindows.locator('[href="/downloads"]').click();
await expect(browserWindows.locator('[class="d-1"]')).toContainText('Downloads');

await page.pause();
await page.close();
await browserWindows.pause();
await browserWindows.close();


});

test ('drag and drop', async ({page}) => {

await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
const boxA = page.locator('[id="column-a"]');
const boxB= page.locator('[id="column-b"]');

await boxA.hover();
await page.mouse.down();
await boxB.hover();
await page.mouse.up();


await page.waitForTimeout(2000);

await boxB.dragTo(boxA);

await page.waitForTimeout(2000);


await page.pause();
await page.close();



});

test ('download', async ({page}) => {

await page.goto('https://the-internet.herokuapp.com/download');

const download = await Promise.all(
    [
        page.waitForEvent('download'), await page.locator('[href="download/Images.txt"]').click()
    ]
)

const downloadFile = download[0];
const downloadFilePath= await downloadFile.path();
const downlaodFileName=downloadFile.suggestedFilename();
await downloadFile.saveAs(downlaodFileName);
console.log('The download file path is ${downloadFilePath} ')



await page.pause();
await page.close();



});

test ('upload', async ({page}) => {

await page.goto('https://the-internet.herokuapp.com/upload');

const upload = await Promise.all(
    [
        page.waitForEvent('filechooser'), await page.locator('[id="file-upload"]').click()
    ]
)

await upload[0].setFiles('./Images.txt');

await page.locator('[id="file-submit"]').click();
await page.waitForTimeout(2000);



await page.pause();
await page.close();



});