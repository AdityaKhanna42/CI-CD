import { And, Then, When } from "cypress-cucumber-preprocessor/steps";
import casesPage from "../../../base/pageObjects/casesPage";
import authPermissionPage from "../../../base/pageObjects/authPermissionPage";
import incidentsPage from "../../../base/pageObjects/incidentsPage";
const casePageObject = new casesPage();
const authPermissionPageObject = new authPermissionPage();
const incidentsPageObject = new incidentsPage();
const data = require("../../../../fixtures/emailData.json");
const random = Math.floor(Math.random() * 9999 + 1);
const newNote = "This note is added by automation script " + random;
const modifiedNote = "This note is modified by automation script " + random;
const noteTempName = "Testing Template " + random;
const noteTempBody =
  random + " - This template is created for testing purpose ";
const attachment = "image.jpeg";
const emailTempSub = "Testing Email " + random;
const finalAssessment =
  "This is the final assessment added by Automation script " + random;
const bundleName = "Testing Bundle " + random;
const authReason = "This case is authorized by automation script " + random;
const testComment = "Testing comment - " + random;
const newCaseName = "Testing Case - " + random;

When(/^User click on cases tab$/, () => {
  casePageObject.casesTab().click();
});

And(/^User click on Add new case button$/, () => {
  casePageObject.addNewCaseIcon().click();
});

And(/^User creates a new testing case under cases page$/, () => {
  casePageObject.newCaseNameField().type(newCaseName);
  casePageObject.newCaseCategoryDropdown().click();
  casePageObject.selectRandomDropdownValue();
  casePageObject.createCaseButton().click();
});

Then(/^Verify A new case should be created$/, () => {
  //Clear all the existing filters
  casePageObject.clearButtonOnAdvancedFilter().click({ force: true });
  casePageObject.selectCaseCreatedValueFromDropDown("Today");
  casePageObject.selectCaseOwnerValueFromDropdown("01_Automation Test");
  casePageObject.selectCaseTypeValueFromDropdown("Self Access");
  casePageObject.selectResolutionValueFromDropDown("Unresolved");
});

And(/^Verify that email has been received to App User X$/, () => {
  cy.task("gmail:check-messages", {
    options: {
      from: data.sender,
      subject: data.emailSubject,
      max_wait_time_sec: 60,
    },
  }).then(() => {
    cy.task("gmail:get-messages", {
      options: {
        from: data.sender,
        subject: data.emailSubject,
        include_body: true,
      },
    }).then((emails) => {
      assert.isAtLeast(
        emails.length,
        1,
        "Expected to find at least one email, but none were found!"
      );
      const body = emails[0].body.text;
      const email = body.trim();
      assert.equal(email, data.emailBody);
      assert.isTrue(
        body.indexOf(data.emailBody) >= 0,
        "Expected to find correct content of the email body, but incorrect body of the email found"
      );
    });
  });
});

And(
  /^User apply the advanced filter and select "(.*)" as case type under cases page$/,
  (value) => {
    casePageObject.clearButtonOnAdvancedFilter().click({ force: true });
    casePageObject.selectCaseTypeValueFromDropdown(value);
    cy.wait(1000);
  }
);

And(/^User opens the "(.*)" case from the list under cases page$/, () => {
  casePageObject
    .caseCardLink()
    .eq("0")
    .should("be.visible")
    .click({ force: true });
});

Then(
  /^Verify user is able to see the anayltic assessment of that case under cases page$/,
  () => {
    casePageObject.privacyAssessmentText().eq("0").should('exist');
    cy.contains("Assessments and suspicion score generated based on data available:").should('exist')
  }
);

And(/^User click on "(.*)" tab under cases page$/, (option) => {
  casePageObject.casePageTabs().contains(option).should("be.visible").click();
});

Then(
  /^Verify user is able to see the details of the user and the patient under cases page$/,
  () => {
    casePageObject.getUserName().then((userName) => {
      casePageObject.getPatientName().then((patientName) => {
        casePageObject
          .caseNameField()
          .should(
            "include.text",
            userName + " accessed " + patientName + " between"
          );
      });
    });
  }
);

And(/^User click on "Add to Case" dropdown under cases page$/, () => {
  casePageObject.addToCaseDropdownButton().should("be.visible").click();
});

And(
  /^User select "(.*)" value from "Add to case" dropdown under cases page$/,
  (option) => {
    casePageObject.selectDropDownValues(option);
  }
);

And(/^User "(.*)" a note in case under cases page$/, (option) => {
  if (option == "Add") {
    casePageObject.newNoteField().type(newNote);
  } else if (option == "Modifies") {
    casePageObject.modifyNoteField().clear().type(modifiedNote);
  }
});

And(/^User click on "(.*)" action button under cases page$/, (option) => {
  casePageObject.caseActionButtons().contains(option).click();
});

Then(/^Verify note is "(.*)" successfully under case$/, (option) => {
  if (option == "Added") {
    casePageObject.verifyNoteIsVisible(newNote);
  } else if (option == "Modified") {
    casePageObject.verifyNoteIsVisible(modifiedNote);
  } else if (option == "Deleted") {
    casePageObject.verifyNoteIsNotVisible(modifiedNote);
  }
});

And(/^User click on "(.*)" action button under template header$/, (option) => {
  casePageObject.createTemplateActionButton().contains(option).click();
});

And(/^User creates a new template under cases page$/, () => {
  casePageObject.noteTemplateNameField().type(noteTempName);
  casePageObject.noteTemplateBodyField().type(noteTempBody + "{");
  casePageObject.caseActionButtons().contains("Case Number").click();
});

Then(/^Verify user is able to see "(.*)" success message toast$/, (message) => {
  casePageObject
    .succesToast()
    .should("be.visible")
    .should("have.text", message);
});

And(
  /^User selects the newly added template from list under "(.*)" option$/,
  () => {
    casePageObject
      .noteTempDropdown("Select a Template")
      .should("be.visible")
      .click();
    casePageObject.selectDropDownValues(noteTempName);
  }
);

Then(
  /^Verify note from template is "(.*)" successfully under cases page$/,
  (option) => {
    if (option == "Added") {
      casePageObject.verifyNoteIsVisible(noteTempBody);
    } else if (option == "Deleted") {
      casePageObject.verifyNoteIsNotVisible(noteTempBody);
    }
  }
);

And(
  /^User select value from "Select An Action" dropdown under cases page$/,
  () => {
    casePageObject
      .noteTempDropdown("Select an Action")
      .should("be.visible")
      .click();
    casePageObject.selectRandomDropdownValue();
  }
);

Then(/^Verify action is added successfully on case under cases page$/, () => {
  casePageObject.verifyNoteIsVisible(newNote);
});

And(/^User uploads a file under cases page$/, () => {
  casePageObject.selectFileButton(attachment);
  cy.wait(2000);
});

Then(/^Verify file is attached and downloaded successfully under case$/, () => {
  cy.window()
    .document()
    .then(function (doc) {
      doc.addEventListener("click", () => {
        setTimeout(function () {
          doc.location.reload();
        }, 5000);
      });
      casePageObject.verifyAttachmentIsDownloaded(attachment);
    });
});

And(/^User creates a new email template under cases page$/, () => {
  casePageObject
    .emailTemplateNameField()
    .should("be.visible")
    .type(noteTempName);
  casePageObject
    .emailTemplateFields()
    .eq("0")
    .should("be.visible")
    .type(emailTempSub);
  casePageObject
    .emailTemplateFields()
    .eq("1")
    .should("be.visible")
    .type(noteTempBody);
});

And(
  /^User click on "(.*)" actions button under email template header$/,
  (option) => {
    if (option == "Modify Template") {
      casePageObject.createTemplateActionButton().eq("0").click();
      cy.wait(2000);
    } else if (option == "Send Email") {
      casePageObject.createTemplateActionButton().eq("1").click();
      cy.wait(2000);
    }
  }
);

And(/^User enters the receiver email under cases page$/, () => {
  casePageObject.removeExistingEmailReceiver();
  casePageObject
    .emailReceiverField()
    .should("be.visible")
    .type(data.receiver)
    .type("{enter}");
});

Then(
  /^Verify confirmation email text is visible to user under cases page$/,
  () => {
    casePageObject.verifyEmailIsSent(emailTempSub);
  }
);

And(
  /^User Selects a "(.*)" value from dropdown under cases page$/,
  (option) => {
    if (option == "Resolution") {
      casePageObject
        .noteTempDropdown("Select a Resolution")
        .should("be.visible")
        .click();
      casePageObject.selectRandomDropdownValue();
    } else if (option == "Resolution Description") {
      casePageObject
        .noteTempDropdown("Select a Resolution Description")
        .should("be.visible")
        .click();
      casePageObject.dropdownValues().eq("2").click();
    }
  }
);

Then(/^Verify a case is marked as resolved successfully$/, () => {
  casePageObject.verifyCaseIsResolved();
});

And(/^User reopens the case under cases page$/, () => {
  casePageObject.caseActionButtons().contains("Reopen Case").click();
  casePageObject.caseActionButtons().contains("Confirm Reopen").click();
});

And(/^User adds a final assessment note under cases page$/, () => {
  casePageObject.newNoteField().type(finalAssessment);
});

Then(
  /^Verify a final assessment set is created successfully for that case$/,
  () => {
    cy.wait(1000);
    casePageObject.verifyNoteIsVisible(finalAssessment);
  }
);

And(/^User selects an User type value from dropdown under cases page$/, () => {
  casePageObject.caseInfoUserTypeDropdown().click();
  casePageObject.selectRandomDropdownValue();
});

And(/^User Clicks on "(.*)" button under case page$/, (option) => {
  if (option == "UPDATE CASE") {
    casePageObject.updateCaseButton().should("be.visible").click();
    cy.wait(2000);
  }
});

Then(/^Verify case is assigned to another user successfully$/, () => {
  casePageObject
    .caseInfoOwnerDropdown()
    .children()
    .invoke("attr", "value")
    .then((caseOwner) => {
      casePageObject
        .caseNameField()
        .invoke("text")
        .then((caseName) => {
          casePageObject.casesTab().eq("0").click();
          casePageObject.clearButtonOnAdvancedFilter().click({ force: true });
          casePageObject.selectCaseOwnerValueFromDropdown(caseOwner);
          casePageObject.caseCardLink().eq("0").should("have.text", caseName);
        });
    });
});

And(/^User selects an Owner value from dropdown under cases page$/, () => {
  casePageObject.caseInfoOwnerDropdown().click();
  casePageObject.selectRandomDropdownValue();
  casePageObject
    .caseInfoOwnerDropdown()
    .children()
    .invoke("attr", "value")
    .then((afterVal) => {
      while(afterVal == "Unassigned") {
        casePageObject.caseInfoOwnerDropdown().click();
        casePageObject.selectRandomDropdownValue();
        break;
      }
    });
    casePageObject.assignCaseButton().click();
});

Then(
  /^Verify user is able to see the case using updated user type filter$/,
  () => {
    casePageObject
      .caseInfoUserTypeDropdown()
      .children()
      .invoke("attr", "value")
      .then((userType) => {
        casePageObject
          .caseNameField()
          .invoke("text")
          .then((caseName) => {
            casePageObject.casesTab().eq("0").click();
            casePageObject.clearButtonOnAdvancedFilter().click({ force: true });
            casePageObject.selectUserTypeFilterValue(userType);
            casePageObject.caseCardLink().eq("0").should("have.text", caseName);
          });
      });
  }
);

And(/^User selects a Case type value from dropdown under cases page$/, () => {
  casePageObject.caseInfoCaseTypeDropdown().click();
  casePageObject.selectRandomDropdownValue();
});

Then(
  /^Verify user is able to see the case using updated case type filter$/,
  () => {
    casePageObject
      .caseInfoCaseTypeDropdown()
      .children()
      .invoke("attr", "value")
      .then((caseType) => {
        casePageObject
          .caseNameField()
          .invoke("text")
          .then((caseName) => {
            casePageObject.casesTab().eq("0").click();
            casePageObject.clearButtonOnAdvancedFilter().click({ force: true });
            casePageObject.selectCaseTypeValueFromDropdown(caseType);
            casePageObject.caseCardLink().eq("0").should("have.text", caseName);
          });
      });
  }
);

And(
  /^User changes the case type to "(.*)" under case information$/,
  (value) => {
    casePageObject
      .caseCardLink()
      .eq("0")
      .should("be.visible")
      .click({ force: true });
    casePageObject.caseInfoCaseTypeDropdown().click();
    casePageObject.selectDropDownValues(value);
  }
);

And(
  /^User click on radar incident "Create Now" button under cases page$/,
  () => {
    casePageObject
      .createNowRadarButton()
      .children()
      .invoke("text")
      .then((text) => {
        if (text != "Create Now") {
          casePageObject.caseAsideUserOtherCaseTab().click();
          cy.wait(1000);
          casePageObject.selectRandomUserOtherCase();
        }
      });
    casePageObject.createNowRadarButton().click("left");
    cy.wait(10000);
  }
);

Then(/^Verify radar incident is created successfully for this case$/, () => {
  casePageObject
    .createNowRadarButton()
    .children()
    .invoke("text")
    .then((value) => {
      casePageObject
        .caseEventHeaderField()
        .eq("0")
        .children()
        .should("include.text", "Incident " + value + " Created in Radar");
    });
});

And(/^User click on "(.*)" case aside tab under cases page$/, (option) => {
  if (option == "CASE INFORMATION") {
    casePageObject.caseAsideCaseInfoTab().click();
    cy.wait(1000);
  } else if (option == "USER'S OTHER CASES") {
    casePageObject.caseAsideUserOtherCaseTab().click();
    cy.wait(1000);
  } else if (option == "BUNDLES") {
    casePageObject.caseAsideBundlesTab().click();
    cy.wait(1000);
  } else if (option == "AUTHORIZATIONS AND PERMISSIONS") {
    casePageObject.caseAsideAuthAndPermissionsTab().click();
    cy.wait(1000);
  } else if (option == "CASE LOG") {
    casePageObject.caseAsideCaseLogTab().click();
    cy.wait(1000);
  } else if (option == "PRINT") {
    casePageObject.caseAsidePrintTab().click();
    cy.wait(1000);
  } else if (option == "DELETE CASE") {
    //// For Existing case
    casePageObject.caseAsideDeleteCaseTab().click();
    cy.wait(1000);
  }
});

Then(/^Verify selected case has the same EMR user name$/, () => {
  casePageObject.getCaseInfoEmrUserName().then((name) => {
    casePageObject
      .caseNameField()
      .invoke("text")
      .then((caseName) => {
        casePageObject.selectRandomUserOtherCase();
        casePageObject.caseInfoEmrUserName().should("have.text", name);
        casePageObject.caseNameField().should("not.have.text", caseName);
      });
  });
});

And(/^User creates a new "Bundle" under cases page$/, () => {
  casePageObject.addToBundleDropdown().contains("Select Bundle").click();
  casePageObject.selectDropDownValues("Create New Bundle");
  casePageObject.newBundleNameField().clear().type(bundleName);
});

And(/^User click on "Create Bundle" button under cases page$/, () => {
  casePageObject.createBundleButton().click();
});

Then(/^Verify case is added successfully to the bundle$/, () => {
  casePageObject
    .caseNumber()
    .invoke("text")
    .then((id) => {
      casePageObject
        .caseAsideBundlesTab()
        .children()
        .contains(bundleName)
        .click();
      const ide = id.trim();
      cy.contains(ide).should("exist");
    });
});

And(/^User click on "Add Authorization" button under cases page$/, () => {
  casePageObject
    .caseAsideAuthAndPermissionsTab()
    .contains("Add Authorization")
    .click();
});

And(/^User enters the authorization details from cases page$/, () => {
  authPermissionPageObject.authorizationReasonField().type(authReason);
});

Then(
  /^Verify user is able to see added access authorization between the user and patient$/,
  () => {
    authPermissionPageObject.authListContent().eq("0").click();
    authPermissionPageObject
      .authorizationReasonField()
      .should("have.text", authReason);
  }
);

Then(/^Verify user is able to view case log of events related to case$/, () => {
  casePageObject.caseLogHeader().eq("0").should("include.text", newNote);
});

And(/^User enters the comment in case log field under cases page$/, () => {
  casePageObject.caseLogCommentField().type(testComment);
});

And(/^User click on save comment button under case log$/, () => {
  casePageObject.caseAsideCaseLogTab().contains("Save").click();
});

Then(/^Verify a comment is added successfully under case log window$/, () => {
  casePageObject
    .caseLogAddedCommentList()
    .eq("0")
    .should("include.text", testComment);
});

And(/^User click on "Print" button under print tab$/, () => {
  casePageObject.printButton().click();
});

Then(/^Verify user is able to print the case details$/, () => {
  cy.window().then((win) => {
    cy.stub(win, "print").as("printStub");
  });
  casePageObject
    .printButton()
    .click()
    .then(() => {
      cy.window().then((win) => {
        expect(win.print.calledOnce).to.be.true;
      });
    });
});

And(/^User selects the "(.*)" dropdown value under print tab$/, (option) => {
  if (option == "Caseflow") {
    casePageObject.printCaseflowDropdown().click();
    casePageObject.selectDropDownValues("Custom");
    casePageObject
      .printCaseflowDropdown()
      .invoke("text")
      .then((value) => {
        if (value == "Custom") {
          casePageObject.printCustomCaseFlowDropdown().click();
          casePageObject.selectDropDownValues("Emails");
        }
      });
  } else if (option == "Assessments") {
    casePageObject.printAssessmentsDropdown().click();
    casePageObject.selectDropDownValues("None");
  } else if (option == "User Details") {
    casePageObject.printUserDetailsDropdown().click();
    casePageObject.selectDropDownValues("None");
  }
});

And(
  /^User click on "Delete Case" button for newly added case under case page$/,
  () => {
    //// For newly added case
    casePageObject.newCaseDeleteCaseTab().click();
  }
);

And(
  /^User enters "DELETE" under case sensitive confirm deletion field$/,
  () => {
    casePageObject.confirmDeleteField().type("DELETE");
  }
);

And(/^User enters the "Reason" for deletion under cases page$/, () => {
  casePageObject.deleteReasonField().type("Test");
});

And(/^User click on "Delete case" button under delete case tab$/, () => {
  casePageObject.deleteCaseButton().click();
});

Then(/^Verify case is deleted successfully under cases page$/, () => {
  casePageObject.caseCardLink().eq("0").should("not.have.text", newCaseName);
});

Then(/^Verify user is able to view the accesses related to the case$/, () => {
  casePageObject.getEMRUserName().then((text) => {
    casePageObject.accessesTabActivityItem().click();
    incidentsPageObject.personInfoNameField().eq("1").should("have.text", text);
  });
});

And(/^User click on "Export CSV" icon$/, () => {
  cy.window()
    .document()
    .then(function (doc) {
      doc.addEventListener("click", () => {
        setTimeout(function () {
          doc.location.reload();
        }, 5000);
      });
      casePageObject.exportIcon().click();
    });
});

Then(/^Verify user is able to see downloaded csv file$/, () => {
  casePageObject
    .caseNameField()
    .invoke("text")
    .then((text) => {
      casePageObject.getCaseNumber().then((number) => {
        const casename = text.replace(/\//g, "_");
        const fileName =
          "cypress/downloads/Case" +
          number +
          " - (Accesses) " +
          casename +
          ".csv";
        cy.readFile(fileName).should("exist");
      });
    });
});

Then(/^Verify user can view the incidents related to the case$/, () => {
  casePageObject.getEMRUserName().then((text) => {
    casePageObject.incidentsTabList().eq("0").click();
    incidentsPageObject.personInfoNameField().should("have.text", text);
  });
});
