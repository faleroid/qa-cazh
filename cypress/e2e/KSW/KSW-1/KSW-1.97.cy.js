import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.97 - Simulasi sebagian data gagal dihapus (partial fail)', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.97: Simulasi sebagian data gagal dihapus (partial fail)', () => {
    cy.get('button[aria-label="Select all"]').click({ force: true });
  });
});
