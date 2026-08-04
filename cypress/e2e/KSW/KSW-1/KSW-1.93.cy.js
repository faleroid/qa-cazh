import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.93 - Coba centang lebih dari 50 data secara manual', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.93: Coba centang lebih dari 50 data secara manual', () => {
    cy.get('button[aria-label="Select all"]').click({ force: true });
  });
});
