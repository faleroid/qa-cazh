import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.70 - Klik link Download Template Import Riwayat', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.70: Klik link Download Template Import Riwayat', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });
});
