import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.46 - Validasi Tanggal Kegiatan, Presentase, dan Lampiran pada form Edit Riwayat', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it.skip('KSW-1.46: Validasi Tanggal Kegiatan, Presentase, dan Lampiran pada form Edit Riwayat', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });
});
