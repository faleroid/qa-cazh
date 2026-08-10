import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.71 - Upload template dengan salah satu kolom required kosong, klik Simpan', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.71: Upload template dengan salah satu kolom required kosong, klik Simpan', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });
});
