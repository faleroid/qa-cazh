import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.59 - Pindah halaman saat selection berasal dari mode Pilih Semua Hasil Filter', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.59: Pindah halaman saat selection berasal dari mode Pilih Semua Hasil Filter', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });
});
