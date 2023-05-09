class caseBundlesPage {
  bundleInfoDeleteBundleTab() {
    return cy.get('[data-cy="delete-bundle--bulkAction"]');
  }

  deleteBundleButton() {
    return cy.get('[value="Delete Bundle"]');
  }
}
export default caseBundlesPage;
