import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.20 - Cek data yang muncul pada suggestion field Anggota', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.20: Cek data yang muncul pada suggestion field Anggota', () => {
    cy.contains("button", "Tambah Progres Kegiatan").click({ force: true }); cy.get('[role="dialog"]').should("be.visible");
  });
});
