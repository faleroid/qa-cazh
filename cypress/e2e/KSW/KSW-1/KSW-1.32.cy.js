import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.32 - Pada halaman Detail Progres Kegiatan, klik tombol Tambah Riwayat', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.32: Pada halaman Detail Progres Kegiatan, klik tombol Tambah Riwayat', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });
});
