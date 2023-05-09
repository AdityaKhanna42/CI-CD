import { Given } from "cypress-cucumber-preprocessor/steps";
import settingsPage from "../../../base/pageObjects/settingsPage";
const settingsObject = new settingsPage();

Given(/^Case Creation 7-day Limits > 10k$/, () => {
  settingsObject.settingsTab().click();
  settingsObject.setCaseCreationLimit("Self Access");
});

Given(/^Case Creation Assignment to App User X$/, () => {
  settingsObject.assignAppUserToSelfAccessCategory("Self Access");
});

When(/^Raw Clarity files are dropped into S3$/, () => {});
