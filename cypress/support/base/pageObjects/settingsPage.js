class settingsPage {
  settingsTab() {
    return cy.get("[class='material-icons icon-settings']");
  }

  categoryRow() {
    return cy.get("[class='fixedDataTableRowLayout_rowWrapper']");
  }

  categorySevenDayLimitField() {
    return cy.get("[data-cy='limit']");
  }

  categoryCheckbox() {
    return cy.get("[role='checkbox']");
  }

  verifyCategoryCheckboxIsEnabledOrNot() {
    this.categoryCheckbox()
      .invoke("attr", "aria-checked")
      .then((value) => {
        cy.log(value);
        if (value == "false") {
          this.categoryCheckbox().should("be.visible").click();
        }
      });
  }

  newCaseAssignmentList() {
    return cy.get("[role='listbox']").eq("0").should("be.visible").click();
  }

  removeExistingAppUser() {
    return cy.get(".rw-multiselect-tag-btn > span");
  }

  selectAppUser() {
    this.newCaseAssignmentList()
      .invoke("attr", "placeholder")
      .then((text) => {
        if (text == "New Self Access cases will be unassigned   ") {
          cy.get("[role='option']").eq("0").click();
        } else {
          this.removeExistingAppUser().then(($el) => {
            const count = Cypress.$($el).length;
            for (var i = 0; i < count; i++) {
              this.removeExistingAppUser().eq(0).click();
              cy.wait(200);
            }
          });
          cy.get("[role='option']").eq("0").click();
        }
      });
  }

  setCaseCreationLimit(categoryName) {
    this.categoryRow().each(($row) => {
      cy.wrap($row).within(() => {
        cy.get("[class='public_fixedDataTableCell_cellContent']").each(
          ($col) => {
            if ($col.text() == categoryName) {
              this.verifyCategoryCheckboxIsEnabledOrNot();
              this.categorySevenDayLimitField().clear().type("10001");
            }
          }
        );
      });
    });
  }

  assignAppUserToSelfAccessCategory(categoryName) {
    this.categoryRow().each(($row) => {
      cy.wrap($row).within(() => {
        cy.get("[class='public_fixedDataTableCell_cellContent']").each(
          ($col) => {
            if ($col.text() == categoryName) {
              this.selectAppUser();
            }
          }
        );
      });
    });
  }
}
export default settingsPage;
