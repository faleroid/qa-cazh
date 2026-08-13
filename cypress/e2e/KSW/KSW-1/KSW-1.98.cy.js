import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.98 - Simulasi seluruh data gagal dihapus (network/server error)', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.98: Simulasi seluruh data gagal dihapus (network/server error)', () => {
    cy.get('button[aria-label="Select all"]').click({ force: true });
  });
});
