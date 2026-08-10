import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.22 - Isi semua field required, klik Simpan', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it.skip('KSW-1.22: Isi semua field required, klik Simpan', () => {
    ProgressActivityPage.createNewProgressActivity("Academy QA Engineer", "Rocky Gibraltar", "Pentas Seni Utama", "Deskripsi Utama");
  });
});
