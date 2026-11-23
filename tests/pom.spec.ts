import { expect ,test } from "../fixtures/fixtures";
import loginPage from "./pages/LoginPage/loginPage";
import productPage from "./pages/productPage/productPage";
import * as testData from "./TestData/testData.json";

let page ;
let loginPageObj;
let productPageObj;

test.beforeAll(async()=>{

} )

test.beforeEach(async({browser})=>{
     page = await browser.newPage();
     loginPageObj=  new loginPage(page);
     productPageObj =  new productPage(page);
    await page.goto('https://www.saucedemo.com/');
    
} )

test.afterEach(async({})=>{
     await page.close();
    
} )

test.afterAll(async()=>{
    
} )


test ('E2E@sanity', async({ })=>{

    
     await loginPageObj.enterUsername(testData.username);
     await loginPageObj.enterPassword(testData.password);
     await loginPageObj.takeScreenShot('./test/screenshots/login.png');
     await loginPageObj.clickOnLoginButton();
      await productPageObj.takeScreenShot('./test/screenshots/product.png');
     await productPageObj.clickOnItem();
     await productPageObj.clickOnCartBtn();
     await productPageObj.takeScreenShot('./test/screenshots/cart.png');
    


}

)
