// cypress/support/e2e.js
import './commands'

beforeEach(() => {
  cy.login();
});

// Ignore uncaught exceptions from third-party scripts or app runtime errors
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
