
import basePage from "../basePage";

export default class loginPage extends basePage{

    private readonly usernameField = this.page.locator('[id="user-name"]');
    private readonly passwordField = this.page.locator('[id="password"]');
    private readonly loginButton = this.page.locator('[id="login-button"]');


    async enterUsername(username:string) {
        await this.enterTextToElement(this.usernameField, username);
    }

    async enterPassword(password : string){
        await this.enterTextToElement(this.passwordField,password);
    }

    async clickOnLoginButton(){
        await this.clickOnElement(this.loginButton);
    }



}