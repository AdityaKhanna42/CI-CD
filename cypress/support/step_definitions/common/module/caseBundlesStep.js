import { And } from "cypress-cucumber-preprocessor/steps";
import caseBundlesPage from "../../../base/pageObjects/caseBundlesPage";
const caseBundlesPageObject = new caseBundlesPage();

And(/^User expands the "Delete Bundle" tab under case bundles page$/, () => {
  caseBundlesPageObject.bundleInfoDeleteBundleTab().click();
});

And(/^User click on "Delete Bundle" button under case bundles page$/, () => {
  caseBundlesPageObject.deleteBundleButton().click();
});
