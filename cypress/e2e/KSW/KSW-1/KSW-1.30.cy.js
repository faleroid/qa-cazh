import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.30 - Buka halaman Detail Progres Kegiatan yang belum memiliki riwayat', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.30: Buka halaman Detail Progres Kegiatan yang belum memiliki riwayat', () => {
    cy.url().should("include", "/student-affairs/progress");
  });
});
