class authPermissionPage {
  authPermissionsTab() {
    return cy.get('[class="material-icons icon-verified_user"]');
  }

  authorizationReasonField() {
    return cy.get('[data-cy=""]');
  }

  submitButton() {
    return cy.get('[data-cy="submit-patient-emr-auth"]');
  }

  updateAuthorizationButton() {
    return cy.get('[data-cy="update-patient-emr"]');
  }

  revokeAuthorizationButton() {
    return cy.get('[value="Revoke Authorization"]');
  }

  deleteAuthIcon() {
    return cy.get('[data-cy="delete-patient-emr"]');
  }

  deleteAuthorizationButton() {
    return cy.get('[value="Delete Authorization"]');
  }

  authListContent() {
    return cy.get('[class="public_fixedDataTableCell_cellContent"] > span');
  }
}
export default authPermissionPage;
