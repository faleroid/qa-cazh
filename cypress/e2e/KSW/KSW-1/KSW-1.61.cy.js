import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.61 - Simulasi sebagian data gagal dihapus (partial fail)', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.61: Simulasi sebagian data gagal dihapus (partial fail)', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });
});
