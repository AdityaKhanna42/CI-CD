/* global cy */

export const dcy = (x) => `[data-cy="${x}"]`;
export const getCy = (x) => cy.get(dcy(x));
export const verifyUrl = (x) => cy.url().should("include", `${x}`);
export const verifyText = (y) => cy.contains(`${y}`).should("be.visible");
export const closeAdvancedFilter = () => {
  return cy.get(".advanced-filter-panel").find(".icon-close").click().wait(500);
};
export const openAdvancedFilter = () => {
  return getCy("filterbar").find("li.advFilters").click().wait(500);
};
