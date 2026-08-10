import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.02 - Cek kolom pada tabel List Progres Kegiatan', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.02: Cek kolom pada tabel List Progres Kegiatan', () => {
    ProgressActivityPage.verifyTableColumns();
  });
});
