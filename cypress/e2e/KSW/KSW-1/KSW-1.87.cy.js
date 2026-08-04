import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.87 - Centang checkbox pada header tabel', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.87: Centang checkbox pada header tabel', () => {
    cy.get('button[aria-label="Select all"]').click({ force: true });
  });
});
