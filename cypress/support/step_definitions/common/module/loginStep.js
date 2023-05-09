import loginPage from "../../../base/pageObjects/loginPage";
import { And, Then, When } from "cypress-cucumber-preprocessor/steps";
const userData = require("../../../../fixtures/userConfig.json");
const loginPageObject = new loginPage();

When(/^User provides correct credentials$/, function () {
  loginPageObject.emailIputField().type(userData.userEmail);
  loginPageObject.passwordInputField().type(userData.password);
});

And(/^User clicks on login button$/, function () {
  loginPageObject.loginButton().click();
});

Then(/^User is able to see list of all the navigation icons$/, function () {
  loginPageObject.verifyAllNavigationIconsDisplaying();
});
