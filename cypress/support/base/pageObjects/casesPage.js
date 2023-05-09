class casesPage {
  casesTab() {
    return cy.get("[class='material-icons icon-folder']");
  }

  addNewCaseIcon() {
    return cy.get('[class="material-icons icon-add_circle"]');
  }

  newCaseNameField() {
    return cy.get('[placeholder="Give this case a name"]');
  }

  newCaseCategoryDropdown() {
    return this.dropdownButton().eq("0");
  }

  createCaseButton() {
    return cy.get('[value="Create Case"]');
  }

  clearButtonOnAdvancedFilter() {
    return cy.get('[data-cy="cases-adv-filters--clear-filters--button"]');
  }

  advancedFilterDropdowns() {
    return cy.get('[data-cy="cases--adv-filer-panel"]');
  }

  caseTypeDropdown() {
    return cy.get("[placeholder='Case Type']");
  }

  caseOwnerDropdown() {
    return cy.get("[placeholder='Case Owner']");
  }

  resolutionDropdown() {
    return cy.get("[placeholder='Resolution']");
  }

  userTypeAdvancedFilterDropdown() {
    return cy.get("[placeholder='User Type']");
  }

  dropdownValues() {
    return cy.get('[role="option"]');
  }

  selectDropDownValues(value) {
    this.dropdownValues().contains(value).click();
  }

  closeOpenedDropdown() {
    cy.get("[data-cy='aside-panel-title']").click().wait(500);
  }

  selectCaseOwnerValueFromDropdown(value) {
    this.caseOwnerDropdown().click();
    this.selectDropDownValues(value);
    this.closeOpenedDropdown();
  }

  selectCaseCreatedValueFromDropDown(value) {
    this.advancedFilterDropdowns().contains("Case Created").click();
    this.selectDropDownValues(value);
    this.closeOpenedDropdown();
  }

  selectCaseTypeValueFromDropdown(value) {
    this.caseTypeDropdown().click();
    this.selectDropDownValues(value);
    this.closeOpenedDropdown();
  }

  selectResolutionValueFromDropDown(value) {
    this.resolutionDropdown().click();
    this.selectDropDownValues(value);
    this.closeOpenedDropdown();
  }

  selectUserTypeFilterValue(value) {
    this.userTypeAdvancedFilterDropdown().click();
    this.selectDropDownValues(value);
    this.closeOpenedDropdown();
  }

  caseCardLink() {
    return cy.get('[data-cy="case-card-link"] > a > div > span');
  }

  privacyAssessmentText() {
    return cy.get('[data-cy="privacy-assessment-link"]');
  }

  casePageTabs() {
    return cy.get('[data-cy="case-tabs"] > a');
  }

  userAndPatientNameLink() {
    return cy.get('[data-cy="person-info"] > h2 > a >span');
  }

  getUserName() {
    return this.userAndPatientNameLink()
      .eq("0")
      .should("be.visible")
      .invoke("text");
  }

  getPatientName() {
    return this.userAndPatientNameLink()
      .eq("1")
      .should("be.visible")
      .invoke("text");
  }

  caseNameField() {
    return cy.get('[data-cy="case-header"]');
  }

  addToCaseDropdownButton() {
    return cy.get("[data-cy='add-to-case-dropdown'] > div");
  }

  newNoteField() {
    return cy.get('[class="case-event__content"]').eq("0");
  }

  modifyNoteField() {
    return cy.get('[class="case-event__content"] > div > textarea').eq("0");
  }

  caseActionButtons() {
    return cy.get("[role='button']");
  }

  verifyNoteIsVisible(note) {
    cy.wait(2000);
    cy.get('[data-cy="case-event-created"] > div > div > div > div > span')
      .eq("0")
      .should("be.visible")
      .then(($text) => {
        const value = $text.text().trim();
        expect(value).to.include(note);
      });
  }

  verifyNoteIsNotVisible(note) {
    cy.contains(note).should("not.be.visible");
  }

  createTemplateActionButton() {
    return cy.get('[class="template__header"] > ul > li');
  }

  noteTemplateNameField() {
    return cy.get('[data-cy="template-name-input"]');
  }

  noteTemplateBodyField() {
    return cy.get('[data-cy="template-textarea"] > div > textarea');
  }

  succesToast() {
    return cy.get(".Toastify__toast--success > .Toastify__toast-body");
  }

  noteTempDropdown(value) {
    return cy.get('[role="combobox"]').contains(value);
  }

  selectRandomDropdownValue() {
    cy.get('[class="rw-list-option"]').then(($el) => {
      const count = Cypress.$($el).length;
      cy.log("Total available values are " + count);
      const random = Math.floor(Math.random() * count);
      this.dropdownValues().eq(random).click();
    });
  }

  dateUnderAction() {
    return cy.get('[data-cy="date-picker--text-input"]');
  }

  selectFileButton(file) {
    return cy.get('[type="file"]').attachFile(file);
  }

  caseEventHeaderField() {
    return cy.get('[data-cy="case-event-created"]');
  }

  verifyAttachmentIsDownloaded(name) {
    this.caseEventHeaderField()
      .children()
      .contains(name)
      .click({force: true});
    cy.readFile("cypress/downloads/" + name).should("exist");
  }

  emailTemplateNameField() {
    return cy.get('[data-cy="template-name-input"]');
  }

  emailTemplateFields() {
    return cy.get('[data-cy="template-textarea"] > div > textarea');
  }

  emailReceiverField() {
    return cy.get('[class="rw-input-reset"]').eq("0");
  }

  verifyEmailIsSent(data) {
    cy.wait(2000);
    cy.get('[class="ExpandCollapseCard_section__1y6w5"]')
      .children()
      .eq("0")
      .should("include.text", data);
  }

  verifyCaseIsResolved() {
    this.caseEventHeaderField()
      .children()
      .should("include.text", "Case Resolved as")
      .should("include.text", "Reopen Case");
  }

  existingEmailReceiver() {
    return cy.get(".rw-multiselect-tag-btn > span");
  }

  removeExistingEmailReceiver() {
    this.emailReceiverField()
      .invoke("attr", "placeholder")
      .then((text) => {
        if (text == "To") {
        } else {
          this.existingEmailReceiver().then(($el) => {
            const count = Cypress.$($el).length;
            for (var i = 0; i < count; i++) {
              this.existingEmailReceiver().eq(0).click();
              cy.wait(200);
            }
          });
        }
      });
  }

  dropdownButton() {
    return cy.get('[class="rw-input rw-dropdown-list-input"]');
  }

  caseInfoUserTypeDropdown() {
    return this.dropdownButton().eq("6");
  }

  caseInfoUserTypeDropdown() {
    return cy.get('[class="rw-input rw-dropdown-list-input"]').eq("6");
  }

  updateCaseButton() {
    return cy.get('[value="Update Case"]');
  }

  caseInfoCaseTypeDropdown() {
    return cy.get('[data-cy="case-type--dropdown"] > li > div > div > div');
  }

  caseInfoOwnerDropdown() {
    return this.dropdownButton().eq("7");
  }

  assignCaseButton() {
    return cy.get('[value="Assign Case"]');
  }

  createNowRadarButton() {
    return cy.get('[data-cy="integration-create-incident"]');
  }

  caseAsideAllTabs() {
    return cy.get('[data-cy="case-aside-expando"]');
  }

  caseAsideCaseInfoTab() {
    return this.caseAsideAllTabs().eq("0");
  }

  caseAsideUserOtherCaseTab() {
    return this.caseAsideAllTabs().eq("1");
  }

  caseAsideBundlesTab() {
    return this.caseAsideAllTabs().eq("2");
  }

  caseAsideAuthAndPermissionsTab() {
    return this.caseAsideAllTabs().eq("3");
  }

  caseAsideCaseLogTab() {
    return this.caseAsideAllTabs().eq("4");
  }

  caseAsidePrintTab() {
    return this.caseAsideAllTabs().eq("5");
  }

  caseAsideDeleteCaseTab() {
    return this.caseAsideAllTabs().eq("6");
  }

  newCaseDeleteCaseTab() {
    return this.caseAsideAllTabs().eq("4");
  }

  confirmDeleteField() {
    return cy.get('[data-cy="confirm"]');
  }

  deleteReasonField() {
    return cy.get('[placeholder="Reason for Deletion"]');
  }

  deleteCaseButton() {
    return cy.get('[value="Delete Case"]');
  }

  selectRandomUserOtherCase() {
    this.caseAsideUserOtherCaseTab()
      .find('[class="CaseViewUserCases_table__2hciR"] > tbody > tr')
      .then((el) => {
        const count = Cypress.$(el).length;
        cy.log(count);
        const random = Math.floor(Math.random() * count);
        cy.get('[class="CaseViewUserCases_table__2hciR"] > tbody > tr')
          .eq(random)
          .children()
          .eq("0")
          .click();
        cy.wait(2000);
      });
  }

  caseInfoEmrUserName() {
    return cy.get('[data-cy="emr-user-link"]');
  }

  getCaseInfoEmrUserName() {
    return this.caseInfoEmrUserName().invoke("text");
  }

  addToBundleDropdown() {
    return cy.get('[data-cy="bulk-actions--select-bundle--dropdown"]');
  }

  newBundleNameField() {
    return cy.get('[data-cy="new-bundle-name--input"]');
  }

  createBundleButton() {
    return cy.get('[data-cy="submit-bundle-action--button"]');
  }

  caseInfoEMRUserName() {
    return cy.get('[data-cy="emr-user-link"]');
  }

  getEMRUserName() {
    return this.caseInfoEMRUserName().invoke("text");
  }

  accessesTabActivityItem() {
    return cy.get('[class="fixedDataTableRowLayout_rowWrapper"]').eq("1");
  }

  exportIcon() {
    return cy.get('[class="material-icons icon-get_app"]');
  }

  incidentsTabList() {
    return cy.get('[data-cy="incident-card-reason-link"]');
  }

  caseNumber() {
    return cy.get('[data-cy="case-number"]');
  }

  caseLogHeader() {
    return cy.get('[class="log__item-header"]');
  }

  caseLogCommentField() {
    return cy.get('[placeholder="Add a Comment"]');
  }

  caseLogAddedCommentList() {
    return cy.get('[class="log__item-content"]');
  }

  printButton() {
    return cy.get('[data-cy="case-print-button"]');
  }

  printCaseflowDropdown() {
    return this.dropdownButton().eq("9");
  }

  printCustomCaseFlowDropdown() {
    return cy.get('[placeholder="Custom Caseflow Included"]');
  }

  printAssessmentsDropdown() {
    return this.dropdownButton().eq("10");
  }

  printUserDetailsDropdown() {
    return this.dropdownButton().eq("11");
  }

  getCaseNumber() {
    return this.caseNumber().invoke("text");
  }
}
export default casesPage;
