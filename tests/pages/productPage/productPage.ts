import basePage from "../basePage";

export default class productPage extends basePage {

    private readonly sauceLabsBackPackAddToCartBtn = this.page.locator('[id="add-to-cart-sauce-labs-backpack"]');
    private readonly shoppingCartBtn = this.page.locator('[id="shopping_cart_container"]');


    async clickOnItem(){
        await this.clickOnElement(this.sauceLabsBackPackAddToCartBtn);
    }




    async clickOnCartBtn(){
        await this.clickOnElement(this.shoppingCartBtn);

    }
    


}