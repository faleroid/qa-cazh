import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.36 - Isi Presentase Pencapaian dengan angka bulat 1-100 (mis. 75)', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.36: Isi Presentase Pencapaian dengan angka bulat 1-100 (mis. 75)', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });
});
