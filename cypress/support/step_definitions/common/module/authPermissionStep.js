import { When, And } from "cypress-cucumber-preprocessor/steps";
import authPermissionPage from "../../../base/pageObjects/authPermissionPage";
const authPermissionPageObject = new authPermissionPage();

When(/^User click on Authorization and Permissions tab$/, () => {
  authPermissionPageObject.authPermissionsTab().click();
});

And(/^User click on "(.*)" button under auth permissions page$/, (option) => {
  if (option == "Submit") {
    authPermissionPageObject.submitButton().click();
  } else if (option == "Update Authorization") {
    authPermissionPageObject.updateAuthorizationButton().click();
  } else if (option == "Revoke Authorization") {
    authPermissionPageObject.revokeAuthorizationButton().click();
  } else if (option == "Delete Authorization") {
    authPermissionPageObject.deleteAuthorizationButton().click();
  }
});

And(
  /^User click on "Delete Authorization" icon under auth permissions page$/,
  () => {
    authPermissionPageObject.deleteAuthIcon().click();
  }
);
