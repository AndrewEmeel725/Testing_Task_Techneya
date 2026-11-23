import {test as baseTest} from '@playwright/test'
import loginPage from '../tests/pages/LoginPage/loginPage'
import productPage from '../tests/pages/productPage/productPage'

type pages = {
    loginPageObj:loginPage;
    productPageObj:productPage;

}

const testPages = baseTest.extend<pages>
({
    loginPageObj: async({page},use)=>{
        await use (new loginPage(page))
    },

    productPageObj: async({page},use)=>{
        await use (new productPage(page))
    }
})

export const test = testPages;
export const expect= testPages.expect;