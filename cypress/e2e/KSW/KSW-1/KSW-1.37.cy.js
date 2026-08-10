import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.37 - Isi Presentase Pencapaian dengan angka desimal 1.5-95.5 (mis. 87.5)', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.37: Isi Presentase Pencapaian dengan angka desimal 1.5-95.5 (mis. 87.5)', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });
});
