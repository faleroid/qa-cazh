import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.17 - Pada halaman List Progres Kegiatan, klik tombol Tambah Progres Kegiatan', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.17: Pada halaman List Progres Kegiatan, klik tombol Tambah Progres Kegiatan', () => {
    cy.contains("button", "Tambah Progres Kegiatan").click({ force: true }); cy.get('[role="dialog"]').should("be.visible");
  });
});
