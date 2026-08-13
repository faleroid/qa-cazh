import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.89 - Klik link Pilih Semua pada banner (hasil filter > 50 data)', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.89: Klik link Pilih Semua pada banner (hasil filter > 50 data)', () => {
    cy.get('button[aria-label="Select all"]').click({ force: true });
  });
});
