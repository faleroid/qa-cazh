import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.42 - Isi semua field required + lampiran valid, klik Simpan', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it.skip('KSW-1.42: Isi semua field required + lampiran valid, klik Simpan', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });
});
