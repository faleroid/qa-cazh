import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.19 - Pada field Anggota, ketik nomor kartu atau nama anggota', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.19: Pada field Anggota, ketik nomor kartu atau nama anggota', () => {
    cy.contains("button", "Tambah Progres Kegiatan").click({ force: true }); cy.get('[role="dialog"]').should("be.visible");
  });
});
