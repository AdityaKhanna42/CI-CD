class loginPage {
  emailIputField() {
    return cy.get("[data-cy='email']");
  }

  passwordInputField() {
    return cy.get("[data-cy='password']");
  }

  loginButton() {
    return cy.get("[type='submit']");
  }

  allNavigationIcons() {
    return cy.get("[data-cy='nav-list--a']").children();
  }

  verifyAllNavigationIconsDisplaying() {
    this.allNavigationIcons().each(($el, i) => {
      this.allNavigationIcons()
        .its("length")
        .then((count) => {
          if (i != count - 2) {
            // data feed dashboard does not have active class due to its path being constructed differently than other nav items
            cy.wrap($el).wait(500).click().should("have.class", "active");
          }
        });
    });
  }
}
export default loginPage;
